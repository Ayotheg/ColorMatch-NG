import { buildPrompt } from "./buildPrompt";

// Model list — openrouter/free auto-picks any available free model.
// The specific models below are confirmed working free models as of May 2026.
// Order matters — first one that works wins.
const FREE_MODELS = [
  "openrouter/free",                              // Auto-picks best available free model
  "meta-llama/llama-3.3-70b-instruct:free",       // Llama 3.3 — very capable
  "deepseek/deepseek-chat-v3-0324:free",          // DeepSeek V3 — strong reasoning
  "mistralai/mistral-small-3.1-24b-instruct:free",// Mistral Small 3.1
  "qwen/qwen3-8b:free",                           // Qwen3 8B — lightweight fallback
];

/**
 * getColorSuggestion.js
 * Sends quiz answers to OpenRouter and returns AI color suggestions.
 * Tries multiple free models in order until one succeeds.
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

  let lastError = null;

  for (const model of FREE_MODELS) {
    try {
      console.log(`[ColorMatch] Trying model: ${model}`);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "ColorMatch NG",
        },
        body: JSON.stringify({
          model,
          max_tokens: 800,
          temperature: 0.4,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user",   content: userPrompt   },
          ],
        }),
      });

      const data = await response.json();

      // OpenRouter sometimes returns 200 but with an error inside data
      if (data.error) {
        const msg = data.error?.message || JSON.stringify(data.error);
        console.warn(`[ColorMatch] Model ${model} error: ${msg}`);
        lastError = new Error(msg);
        continue;
      }

      if (!response.ok) {
        console.warn(`[ColorMatch] Model ${model} HTTP ${response.status}`);
        lastError = new Error(`HTTP ${response.status}`);
        continue;
      }

      // Extract content
      const rawText = data?.choices?.[0]?.message?.content;
      if (!rawText) {
        console.warn(`[ColorMatch] Model ${model} returned empty content`);
        lastError = new Error("Empty response from AI");
        continue;
      }

      console.log(`[ColorMatch] Raw response from ${model}:`, rawText);

      // Strip markdown fences if AI added them despite instructions
      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // Extract the JSON object even if the model added extra text around it
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn(`[ColorMatch] Model ${model} — no JSON found in response`);
        lastError = new Error("AI returned unexpected format. Please try again.");
        continue;
      }

      let result;
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch {
        console.warn(`[ColorMatch] Model ${model} — JSON parse failed`);
        lastError = new Error("Could not read AI response. Please try again.");
        continue;
      }

      // Validate the shape we need
      if (!result.primary || !result.pairings || !result.reason) {
        console.warn(`[ColorMatch] Model ${model} — missing fields in result`, result);
        lastError = new Error("Incomplete suggestion from AI. Please try again.");
        continue;
      }

      // All good
      console.log(`[ColorMatch] ✅ Success with model: ${model}`);
      return result;

    } catch (err) {
      console.warn(`[ColorMatch] Model ${model} threw:`, err.message);
      lastError = err;
      continue;
    }
  }

  // Every model failed
  throw new Error(
    lastError?.message || "Could not get a color suggestion right now. Please check your internet and try again."
  );
}