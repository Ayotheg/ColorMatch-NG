import { buildPrompt } from "./buildPrompt";

/**
 * getColorSuggestion.js
 * Calls OpenRouter and parses the result with multiple fallback
 * strategies so inconsistent model outputs don't break the app.
 */
export async function getColorSuggestion(quizState) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env file and restart."
    );
  }

  const { systemPrompt, userPrompt } = buildPrompt(quizState);

  console.log("[ColorMatch] Sending to OpenRouter...");

  // ─── FETCH ────────────────────────────────────────────────
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
        max_tokens: 900,
        temperature: 0.3, // lower = more predictable output
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

  console.log("[ColorMatch] Raw response:", rawText);

  // ─── PARSE — multiple strategies ─────────────────────────
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
 * Tries multiple strategies to extract JSON from whatever the model returns.
 * Different models (Llama, DeepSeek, Mistral, Qwen) all format differently.
 */
function parseAIResponse(raw) {
  // Strategy 1: Direct parse — model returned clean JSON
  try {
    const parsed = JSON.parse(raw.trim());
    if (parsed.primary) return parsed;
  } catch { /* continue */ }

  // Strategy 2: Strip markdown fences then parse
  // Handles: ```json { ... } ``` or ``` { ... } ```
  try {
    const stripped = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(stripped);
    if (parsed.primary) return parsed;
  } catch { /* continue */ }

  // Strategy 3: Extract first { ... } block (greedy — gets outermost object)
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const extracted = raw.slice(start, end + 1);
      const parsed = JSON.parse(extracted);
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  // Strategy 4: Regex match for nested JSON object
  try {
    const match = raw.match(/\{[\s\S]*"primary"[\s\S]*"pairings"[\s\S]*"reason"[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  // Strategy 5: Fix common JSON issues and retry
  // Some models use single quotes, trailing commas, or unquoted keys
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      const fixed = raw
        .slice(start, end + 1)
        .replace(/'/g, '"')                          // single → double quotes
        .replace(/,\s*}/g, "}")                      // trailing commas before }
        .replace(/,\s*]/g, "]")                      // trailing commas before ]
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":'); // unquoted keys
      const parsed = JSON.parse(fixed);
      if (parsed.primary) return parsed;
    }
  } catch { /* continue */ }

  // All strategies failed
  return null;
}