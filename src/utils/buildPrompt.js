import { buildColorListForPrompt } from "../data/colors";

/**
 * buildPrompt.js
 * Builds the AI prompt from quiz answers.
 * The system prompt is very strict about JSON-only output
 * so any model — Llama, DeepSeek, Mistral, Qwen — returns
 * the same consistent shape.
 */
export function buildPrompt(quizState) {
  const {
    room,
    who,
    colorInMind,
    hasColorInMind,
    matching,
    matchingColor,
    paintType,
    concerns,
  } = quizState;

  const type = (paintType || "emulsion").toLowerCase();
  const availableColors = buildColorListForPrompt(type);

  // ─── SYSTEM PROMPT ────────────────────────────────────────
  // Extremely strict — JSON only, no exceptions
  const systemPrompt = `You are a Nigerian paint shop color expert. You know the Prestige Paint Gloss & Emulsion range and the Prestige Flex & Textured Finish (Texcoat) range sold in Nigerian paint shops.

YOUR ONLY JOB: Return a single valid JSON object. Nothing else.
- Do NOT write any text before the JSON
- Do NOT write any text after the JSON
- Do NOT use markdown, code blocks, or backticks
- Do NOT explain anything outside the JSON
- Start your response with { and end with }

RULES:
- Ceiling in Nigerian homes is ALWAYS Brilliant White — never suggest otherwise
- Only suggest colors from the list the user provides
- Keep the reason warm, simple, and in plain English any Nigerian customer understands
- Maximum 2 pairings`;

  // ─── USER PROMPT ──────────────────────────────────────────
  const userPrompt = `Nigerian paint shop customer details:
Room: ${room || "Not specified"}
For: ${who || "Not specified"}  
Paint type: ${paintType || "Emulsion"}
Color in mind: ${hasColorInMind ? colorInMind : "No preference"}
Needs to match: ${matching?.length > 0 ? matching.join(", ") : "Nothing"}
${matchingColor ? `Match color (hex): ${matchingColor}` : ""}
Concerns: ${concerns?.length > 0 ? concerns.join(", ") : "None"}

Available colors: ${availableColors}

Return ONLY this JSON, nothing else, no markdown:
{
  "primary": {
    "name": "exact color name from list",
    "code": "exact code from list",
    "hex": "#hexcode",
    "use": "Main walls"
  },
  "pairings": [
    {
      "name": "exact color name",
      "code": "exact code",
      "hex": "#hexcode",
      "use": "Ceiling"
    },
    {
      "name": "exact color name",
      "code": "exact code",
      "hex": "#hexcode",
      "use": "Accent wall"
    }
  ],
  "reason": "2 sentence warm explanation for a Nigerian customer"
}`;

  return { systemPrompt, userPrompt };
}