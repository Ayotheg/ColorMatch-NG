import { buildPrompt } from "./buildPrompt";

const FREE_MODELS = [
  "openrouter/free", // This is the specialized router for free models
  "google/gemma-2-9b-it:free",
  "mistralai/mistral-7b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];

let modelIndex = 0;

/**
 * getColorSuggestion.js
 * Sends the quiz answers to OpenRouter and returns AI color suggestions.
 */
export async function getColorSuggestion(quizState) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "undefined") {
    throw new Error("OpenRouter API key is missing or invalid. Check your .env.local file.");
  }

  const { systemPrompt, userPrompt } = buildPrompt(quizState);

  const maxRetries = 4;
  let lastError = null;

  for (let i = 0; i < maxRetries; i++) {
    const currentModel = FREE_MODELS[modelIndex];
    modelIndex = (modelIndex + 1) % FREE_MODELS.length;

    console.log(`Attempt ${i + 1}: Using model ${currentModel}`);

    try {
      // Add a small delay for retries (exponential backoff)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, i * 1000));
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://colormatch.ng", // Use a placeholder domain for referer
          "X-Title": "ColorMatch NG",
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" } // Force JSON mode if supported
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `Status ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.choices?.[0]?.message?.content;

      if (!rawText) throw new Error("Empty response from AI");

      // Robust JSON cleaning
      const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
      const result = JSON.parse(cleaned);

      if (!result.primary || !result.pairings || !result.reason) {
        throw new Error("Incomplete result structure");
      }

      return result;

    } catch (err) {
      console.warn(`Attempt ${i + 1} (${currentModel}) failed:`, err.message);
      lastError = err;
    }
  }

  throw new Error(`AI Match failed: ${lastError?.message}. Please try again in a moment.`);
}
