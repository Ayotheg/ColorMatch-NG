import { buildPrompt } from "./buildPrompt";

export async function getColorSuggestion(quizState) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env file and restart."
    );
  }

  const { systemPrompt, userPrompt } = buildPrompt(quizState);

  console.log("[ColorMatch] Sending to OpenRouter...");

  let response, data;
  try {
    response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "ColorMatch NG",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        max_tokens: 1500, // increased — previous 900 was cutting off the JSON
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt   },
        ],
      }),
    });
    data = await response.json();
  } catch {
    throw new Error("Network error — check your connection and try again.");
  }

  console.log("[ColorMatch] FULL DATA:", JSON.stringify(data, null, 2));

  // ─── API ERROR CHECK ──────────────────────────────────────
  if (data?.error) {
    const msg = data.error?.message || JSON.stringify(data.error);
    console.error("[ColorMatch] API error:", msg);
    throw new Error(`AI service error: ${msg}`);
  }

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`);
  }

  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error("No response from AI. Please try again.");
  }

  // ─── TRUNCATION CHECK ─────────────────────────────────────
  // Detect if the response was cut off before JSON closed
  const finishReason = data?.choices?.[0]?.finish_reason;
  if (finishReason === "length") {
    console.warn("[ColorMatch] Response was truncated — trying to recover...");
    // Try to recover by completing the truncated JSON
    const recovered = recoverTruncatedJSON(rawText);
    if (recovered) {
      console.log("[ColorMatch] ✅ Recovered truncated JSON");
      return recovered;
    }
    throw new Error("AI response was cut off. Please try again.");
  }

  console.log("[ColorMatch] Raw response:", rawText);

  // ─── PARSE ────────────────────────────────────────────────
  const result = parseAIResponse(rawText);

  if (!result) {
    console.error("[ColorMatch] All parse strategies failed for:", rawText);
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  // ─── VALIDATE ─────────────────────────────────────────────
  if (!result.primary?.name || !Array.isArray(result.pairings) || !result.reason) {
    console.error("[ColorMatch] Invalid result shape:", result);
    throw new Error("Incomplete suggestion from AI. Please try again.");
  }

  console.log("[ColorMatch] ✅ Result:", result);
  return result;
}

/**
 * parseAIResponse
 * Multiple strategies to handle different model output formats.
 */
function parseAIResponse(raw) {
  // Strategy 1: Direct parse
  try {
    const parsed = JSON.parse(raw.trim());
    if (parsed.primary) return parsed;
  } catch { /* continue */ }

  // Strategy 2: Strip markdown fences
  try {
    const stripped = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(stripped);
    if (parsed.primary) return parsed;
  } catch { /* continue */ }

  // Strategy 3: Extract outermost { ... }
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const parsed = JSON.parse(raw.slice(start, end + 1));
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  // Strategy 4: Regex for full object with required keys
  try {
    const match = raw.match(/\{[\s\S]*?"primary"[\s\S]*?"pairings"[\s\S]*?"reason"[\s\S]*?\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  // Strategy 5: Fix common JSON mistakes
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      const fixed = raw
        .slice(start, end + 1)
        .replace(/'/g, '"')
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');
      const parsed = JSON.parse(fixed);
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  return null;
}

/**
 * recoverTruncatedJSON
 * When the AI runs out of tokens mid-response, try to salvage
 * whatever was returned and fill in missing fields with defaults.
 */
function recoverTruncatedJSON(raw) {
  try {
    // Extract whatever partial data we have
    const nameMatch  = raw.match(/"name"\s*:\s*"([^"]+)"/);
    const codeMatch  = raw.match(/"code"\s*:\s*"([^"]+)"/);
    const hexMatch   = raw.match(/"hex"\s*:\s*"([^"]+)"/);
    const reasonMatch = raw.match(/"reason"\s*:\s*"([^"]+)"/);

    if (!nameMatch) return null; // nothing useful to salvage

    return {
      primary: {
        name: nameMatch[1],
        code: codeMatch?.[1] || "—",
        hex:  hexMatch?.[1]  || "#cccccc",
        use:  "Main walls",
      },
      pairings: [
        { name: "Brilliant White", code: "BW", hex: "#FFFFFF", use: "Ceiling" },
      ],
      reason: reasonMatch?.[1] || "This color suits your space beautifully.",
    };
  } catch {
    return null;
  }
}