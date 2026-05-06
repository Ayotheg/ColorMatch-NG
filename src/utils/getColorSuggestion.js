import { buildPrompt } from "./buildPrompt";

// Free models to try in order — if one fails, we try the next
const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemma-3-4b-it:free",
];

/**
 * getColorSuggestion.js
 * Sends the quiz answers to OpenRouter and returns AI color suggestions.
 * Tries multiple free models in case one is down or overloaded.
 *
 * @param {Object} quizState - the full state object from QuizContext
 * @returns {Promise<Object>} - the parsed color suggestion result
 */
export async function getColorSuggestion(quizState) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env file."
    );
  }

  const { systemPrompt, userPrompt } = buildPrompt(quizState);

  let lastError = null;

  // Try each model in order until one works
  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying model: ${model}`);

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

      // Catch provider-level errors (model down, overloaded etc.)
      if (!response.ok || data.error) {
        const errMsg = data?.error?.message || `HTTP ${response.status}`;
        console.warn(`Model ${model} failed: ${errMsg}`);
        lastError = new Error(errMsg);
        continue; // try next model
      }

      // Extract text content
      const rawText = data?.choices?.[0]?.message?.content;

      if (!rawText) {
        console.warn(`Model ${model} returned empty content`);
        lastError = new Error("Empty response from AI");
        continue;
      }

      console.log("Raw AI response:", rawText);

      // Parse JSON — strip markdown fences if present
      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // Find the JSON object inside the response even if there's extra text
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn(`Model ${model} returned non-JSON response`);
        lastError = new Error("AI returned unexpected format");
        continue;
      }

      let result;
      try {
        result = JSON.parse(jsonMatch[0]);
      } catch {
        console.warn(`Model ${model} — JSON parse failed`);
        lastError = new Error("Could not parse AI response");
        continue;
      }

      // Validate shape
      if (!result.primary || !result.pairings || !result.reason) {
        console.warn(`Model ${model} — incomplete result shape`, result);
        lastError = new Error("Incomplete color suggestion received");
        continue;
      }

      // Success
      console.log(`Success with model: ${model}`, result);
      return result;

    } catch (err) {
      console.warn(`Model ${model} threw an error:`, err.message);
      lastError = err;
      continue;
    }
  }

  // All models failed — throw the last known error
  throw new Error(
    lastError?.message || "All AI models are currently unavailable. Please try again."
  );
}