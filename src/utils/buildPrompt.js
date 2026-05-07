import { getColorsByType } from "../data/colors";

/**
 * buildPrompt.js
 * Builds a SHORT but effective AI prompt from quiz answers.
 * Key fix: we stopped sending the full color list (too many tokens).
 * Instead we send only the colors relevant to the customer's context.
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

  // ─── Send only a SHORT relevant color list ────────────────
  // Full list is ~2000 tokens. Instead, filter to 15-20 most
  // relevant colors based on context to keep the prompt small.
  const allColors = getColorsByType(type);
  const relevantColors = getRelevantColors(allColors, quizState);
  const colorList = relevantColors
    .map((c) => `${c.name} (${c.code})`)
    .join(", ");

  // ─── SYSTEM PROMPT ────────────────────────────────────────
  const systemPrompt = `You are a Nigerian paint shop color expert. Suggest colors from the Prestige Paint range.
STRICT RULES:
- Reply with ONLY a JSON object. No text before or after. No markdown. No backticks.
- Start with { and end with }
- Ceiling in Nigerian homes is ALWAYS Brilliant White
- Use only colors from the list provided`;

  // ─── USER PROMPT ──────────────────────────────────────────
  const userPrompt = `Customer details:
Room: ${room || "Living Room"}
For: ${who || "Family"}
Paint type: ${paintType || "Emulsion"}
Color preference: ${hasColorInMind && colorInMind ? colorInMind : "No preference"}
Matching: ${matching?.length > 0 ? matching.join(", ") : "Nothing"}${matchingColor ? ` (color: ${matchingColor})` : ""}
Concerns: ${concerns?.length > 0 ? concerns.join(", ") : "None"}

Available colors: ${colorList}

Reply with ONLY this JSON:
{"primary":{"name":"","code":"","hex":"","use":"Main walls"},"pairings":[{"name":"","code":"","hex":"","use":"Ceiling"},{"name":"","code":"","hex":"","use":"Accent wall"}],"reason":""}`;

  return { systemPrompt, userPrompt };
}

/**
 * getRelevantColors
 * Returns a filtered subset of colors relevant to the customer's context.
 * Keeps the prompt short so the AI has enough tokens to complete its response.
 */
function getRelevantColors(colors, quizState) {
  const { room, concerns, colorInMind, hasColorInMind } = quizState;

  // Always include whites/neutrals — used for ceiling and trim
  const neutralFamilies = ["white", "cream", "beige"];
  const neutrals = colors.filter((c) => neutralFamilies.includes(c.family));

  // If customer has a color in mind, include that color family + related
  let preferredFamily = [];
  if (hasColorInMind && colorInMind) {
    const keyword = colorInMind.toLowerCase();
    preferredFamily = colors.filter(
      (c) =>
        c.name.toLowerCase().includes(keyword) ||
        c.family.toLowerCase().includes(keyword) ||
        c.tags?.some((t) => t.includes(keyword))
    );
  }

  // Room-based relevant families
  const roomFamilyMap = {
    "Bedroom":     ["blue", "pink", "purple", "green"],
    "Living Room": ["beige", "cream", "green", "blue", "grey"],
    "Kitchen":     ["white", "cream", "green", "yellow"],
    "Bathroom":    ["blue", "green", "grey", "white"],
    "Office":      ["grey", "blue", "white", "green"],
    "Exterior":    ["white", "beige", "brown", "grey", "red"],
  };
  const targetFamilies = roomFamilyMap[room] || ["blue", "green", "beige"];
  const roomColors = colors.filter((c) => targetFamilies.includes(c.family));

  // Concern-based additions
  let concernColors = [];
  if (concerns?.includes("Kids that may stain walls")) {
    concernColors = colors.filter((c) =>
      ["brown", "grey", "green"].includes(c.family)
    );
  }
  if (concerns?.includes("Little light in the room")) {
    concernColors = [
      ...concernColors,
      ...colors.filter((c) => c.tags?.includes("lighter") || c.family === "white"),
    ];
  }

  // Merge all, deduplicate, limit to 20
  const merged = [
    ...neutrals,
    ...preferredFamily,
    ...roomColors,
    ...concernColors,
  ];

  const seen = new Set();
  const unique = merged.filter((c) => {
    if (seen.has(c.code)) return false;
    seen.add(c.code);
    return true;
  });

  // Return max 20 colors so the prompt stays short
  return unique.slice(0, 20);
}