import { buildColorListForPrompt } from "../data/colors";

/**
 * buildPrompt.js
 * Turns the quiz answers from QuizContext into a structured AI prompt
 * that OpenRouter can understand and respond to correctly.
 *
 * @param {Object} quizState - the full state object from QuizContext
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
export function buildPrompt(quizState) {
  const { room, who, colorInMind, hasColorInMind, matching, matchingColor, paintType, concerns } = quizState;

  // Build the available colors list based on what paint type they chose
  // so the AI only suggests colors actually available in the shop
  const normalizedPaintType = (paintType || "emulsion").toLowerCase();
  const availableColors = buildColorListForPrompt(normalizedPaintType);


  // ─── SYSTEM PROMPT ───────────────────────────────────────────
  // This tells the AI who it is and how to behave
  const systemPrompt = `You are a friendly and knowledgeable Nigerian paint shop color expert. 
You have deep knowledge of the Prestige Paint Gloss & Emulsion range and the Prestige Flex & Textured Finish (Texcoat) range sold in Nigerian paint shops.

You understand Nigerian home aesthetics, the Nigerian climate, and everyday Nigerian lifestyles.
You always suggest colors that are realistic, practical, and actually available in Nigerian paint shops.

IMPORTANT RULES YOU MUST FOLLOW:
- The ceiling color in Nigerian homes is ALWAYS Brilliant White — never suggest any other ceiling color.
- Only suggest colors from the available color list provided in the user message.
- Always return your response as a valid JSON object — no extra text, no markdown, no explanation outside the JSON.
- Your reason should be warm, simple, and easy for a non-designer Nigerian customer to understand.
- If the paint type is Texcoat, it is used for exterior walls only and in one color — do not suggest pairings for different walls, just suggest complementary trim or gate colors.
- If the paint type is Gloss, it is typically used in two colors — suggest one base and one bold accent color.`;

  // ─── USER PROMPT ─────────────────────────────────────────────
  // This is the actual customer data sent to the AI
  const userPrompt = `A customer in a Nigerian paint shop needs color advice. Here are their details:

ROOM TYPE: ${room || "Not specified"}
THIS ROOM IS FOR: ${who || "Not specified"}
PAINT FINISH THEY WANT: ${paintType ? paintType.toUpperCase() : "Emulsion"}
COLOR IN MIND: ${hasColorInMind ? colorInMind : "No preference — please suggest based on their other answers"}
NEEDS TO MATCH: ${matching.length > 0 ? matching.join(", ") : "Nothing specific"}
${matchingColor ? `COLOR OF WHAT THEY ARE MATCHING (as hex): ${matchingColor}` : ""}
SPECIAL CONCERNS: ${concerns.length > 0 ? concerns.join(", ") : "None"}

AVAILABLE COLORS IN THE SHOP FOR ${(paintType || "emulsion").toUpperCase()}:
${availableColors}

Based on all of the above, please respond with ONLY a valid JSON object in exactly this format:

{
  "primary": {
    "name": "Color Name",
    "code": "Color Code",
    "hex": "#hexcode",
    "use": "Where to use this color e.g. Main walls"
  },
  "pairings": [
    {
      "name": "Color Name",
      "code": "Color Code",
      "hex": "#hexcode",
      "use": "Where to use this color e.g. Ceiling"
    },
    {
      "name": "Color Name",
      "code": "Color Code",
      "hex": "#hexcode",
      "use": "Where to use this color e.g. Trim and doors"
    }
  ],
  "reason": "A warm, friendly 2-3 sentence explanation of why these colors work for this customer. Written in plain English that any Nigerian customer can understand."
}

REMINDER: Ceiling is always Brilliant White. Only use colors from the available list above.`;

  return { systemPrompt, userPrompt };
}