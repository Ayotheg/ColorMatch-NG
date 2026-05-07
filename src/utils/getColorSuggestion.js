import { buildPrompt } from "./buildPrompt";

/**
 * getColorSuggestion.js
 * Sends quiz answers to OpenRouter and returns AI color suggestions.
 *
 * Uses "openrouter/free" — OpenRouter's own smart router that
 * automatically picks whichever free model is currently available.
 * This means no more "No endpoints found" errors from dead model IDs.
 *
 * @param {Object} quizState - full state object from QuizContext
 * @returns {Promise<Object>} - parsed color suggestion result
 */
export async function getColorSuggestion(quizState) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env file and restart the dev server."
    );
  }

  const { systemPrompt, userPrompt } = buildPrompt(quizState);

  console.log("[ColorMatch] Sending request to OpenRouter...");

  let response;
  let data;

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
        model: "openrouter/free", // Let OpenRouter pick any working free model
        max_tokens: 800,
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt   },
        ],
      }),
    });

    data = await response.json();
  } catch (networkError) {
    throw new Error(
      "Network error — check your internet connection and try again."
    );
  }

  // ─── Handle API-level errors ──────────────────────────────────────────
  if (data?.error) {
    const msg = data.error?.message || JSON.stringify(data.error);
    console.error("[ColorMatch] OpenRouter error:", msg);
    throw new Error(`AI error: ${msg}`);
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}. Please try again.`);
  }

  // ─── Extract text content ─────────────────────────────────────────────
  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error("No response from AI. Please try again.");
  }

  console.log("[ColorMatch] Raw AI response:", rawText);

  // ─── Clean and parse JSON ─────────────────────────────────────────────
  // Strip markdown fences the AI might add despite instructions
  const cleaned = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Pull the JSON object out even if there's extra text around it
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("[ColorMatch] No JSON found in:", cleaned);
    throw new Error("AI returned an unexpected format. Please try again.");
  }

  let result;
  try {
    result = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error("Could not read AI response. Please try again.");
  }

  // ─── Validate result shape ────────────────────────────────────────────
  if (!result.primary || !result.pairings || !result.reason) {
    console.error("[ColorMatch] Incomplete result:", result);
    throw new Error("AI returned an incomplete suggestion. Please try again.");
  }

  console.log("[ColorMatch] ✅ Success:", result);
  return result;
}