// ============================================================
// colors.js — Nigerian Paint Color Catalog
// Source: Prestige Paint — Gloss & Emulsion chart
//                        — Flex & Textured Finish (Texcoat) chart
// Default ceiling color in Nigerian homes: Brilliant White
// ============================================================

// ─── GLOSS & EMULSION COLORS ────────────────────────────────
export const emulsionColors = [

  // Whites & Neutrals
  { code: "3033", name: "Warm White",      hex: "#F5F0E0", family: "white",  tags: ["neutral", "warm", "ceiling", "popular"] },
  { code: "4046", name: "Off White",       hex: "#F2EDE0", family: "white",  tags: ["neutral", "warm", "ceiling", "classic"] },

  // Creams & Beiges
  { code: "3040", name: "Cream",           hex: "#F5E6C8", family: "cream",  tags: ["warm", "neutral", "classic", "popular"] },
  { code: "3034", name: "Pale Beige",      hex: "#E8D8B8", family: "beige",  tags: ["warm", "neutral", "subtle", "versatile"] },
  { code: "3035", name: "Pale Mushroom",   hex: "#D4C4A8", family: "beige",  tags: ["warm", "neutral", "earthy", "subtle"] },
  { code: "3041", name: "Bluff Buff",      hex: "#DFC99A", family: "beige",  tags: ["warm", "earthy", "natural"] },
  { code: "1027", name: "Cameo",           hex: "#D4B896", family: "beige",  tags: ["warm", "neutral", "subtle"] },
  { code: "1703", name: "Sand",            hex: "#C8A87A", family: "beige",  tags: ["warm", "earthy", "natural"] },
  { code: "3043", name: "Bamboo",          hex: "#C8A464", family: "brown",  tags: ["warm", "earthy", "natural"] },

  // Yellows & Golds
  { code: "4055", name: "Sunflower",       hex: "#F5D020", family: "yellow", tags: ["bold", "bright", "warm", "accent"] },
  { code: "0003", name: "Golden Yellow",   hex: "#E8B800", family: "yellow", tags: ["warm", "bold", "accent"] },
  { code: "4056", name: "Mustard",         hex: "#C89A18", family: "yellow", tags: ["warm", "deep", "earthy"] },

  // Pinks & Purples
  { code: "1021", name: "Rose",            hex: "#F0A898", family: "pink",   tags: ["soft", "warm", "feminine", "bedroom"] },
  { code: "1020", name: "Rose Pink",       hex: "#F2B8C0", family: "pink",   tags: ["soft", "feminine", "kids", "bedroom"] },
  { code: "8090", name: "Lilac Haze",      hex: "#C8A8D8", family: "purple", tags: ["soft", "feminine", "satin", "bedroom"] },

  // Browns & Earthy
  { code: "3044", name: "Rich Brown",      hex: "#7A4828", family: "brown",  tags: ["deep", "warm", "bold", "earthy"] },
  { code: "3045", name: "Chocolate",       hex: "#4A2818", family: "brown",  tags: ["very deep", "bold", "accent"] },
  { code: "1026", name: "Sienna",          hex: "#A05828", family: "brown",  tags: ["warm", "earthy", "deep"] },

  // Reds
  { code: "0006", name: "Post Office Red", hex: "#CC1010", family: "red",    tags: ["bold", "bright", "accent", "schools"] },
  { code: "1710", name: "Laterite Red",    hex: "#B04818", family: "red",    tags: ["deep", "earthy", "bold", "Nigerian"] },
  { code: "1024", name: "Red Oxide",       hex: "#8B1A10", family: "red",    tags: ["very deep", "bold", "accent"] },
  { code: "1023", name: "Tile Red",        hex: "#B03020", family: "red",    tags: ["deep", "bold", "warm"] },

  // Orange
  { code: "0004", name: "Orange",          hex: "#E86010", family: "orange", tags: ["bold", "warm", "bright", "satin"] },

  // Greens
  { code: "0010", name: "National Green",  hex: "#186030", family: "green",  tags: ["deep", "bold", "Nigerian", "schools"] },
  { code: "5063", name: "Green Gage",      hex: "#588048", family: "green",  tags: ["medium", "natural", "earthy"] },
  { code: "6072", name: "Apple Green",     hex: "#70B850", family: "green",  tags: ["fresh", "bright", "natural"] },
  { code: "7079", name: "Aquamarine",      hex: "#48B8B0", family: "green",  tags: ["fresh", "cool", "modern"] },
  { code: "6071", name: "Leaf Green",      hex: "#489848", family: "green",  tags: ["natural", "fresh", "medium"] },
  { code: "6070", name: "Light Green",     hex: "#90C880", family: "green",  tags: ["soft", "fresh", "natural", "kids"] },

  // Blues
  { code: "7082", name: "Sky Blue",        hex: "#88C0E0", family: "blue",   tags: ["calm", "cool", "popular", "versatile"] },
  { code: "7081", name: "Pale Blue",       hex: "#B8D8F0", family: "blue",   tags: ["soft", "cool", "calm", "subtle"] },
  { code: "SS5110", name: "Light Blue",    hex: "#C8E4F8", family: "blue",   tags: ["very soft", "cool", "calm", "ceiling"] },
  { code: "7083", name: "Nursery Blue",    hex: "#60B0D8", family: "blue",   tags: ["medium", "calm", "kids", "bedroom"] },
  { code: "7084", name: "Pacific Blue",    hex: "#2888C0", family: "blue",   tags: ["medium", "cool", "bold"] },
  { code: "0012", name: "Brilliant Blue",  hex: "#1050A8", family: "blue",   tags: ["deep", "bold", "satin", "schools", "popular"] },
  { code: "0013", name: "Midnight Blue",   hex: "#102060", family: "blue",   tags: ["very deep", "bold", "accent"] },

  // Greys
  { code: "8087", name: "Ice Grey",        hex: "#C8D4D8", family: "grey",   tags: ["soft", "cool", "subtle", "modern"] },
  { code: "9096", name: "Ash Grey",        hex: "#808890", family: "grey",   tags: ["medium", "cool", "modern"] },
  { code: "9095", name: "Dove Grey",       hex: "#909898", family: "grey",   tags: ["medium", "neutral", "modern", "satin"] },
  { code: "9097", name: "Dark Grey",       hex: "#484E54", family: "grey",   tags: ["deep", "bold", "modern", "accent"] },
  { code: "9094", name: "Neutral",         hex: "#B8B8B0", family: "grey",   tags: ["neutral", "subtle", "versatile"] },
  { code: "9093", name: "Silver Grey",     hex: "#B0B4B8", family: "grey",   tags: ["neutral", "cool", "modern", "satin"] },
];

// ─── SATIN COLORS ──────────────────────────────────────────
// Satin colors are picked from the emulsion range.
// Most commonly available satin options in Nigerian paint shops.
// Ceiling is always Brilliant White — not listed here.
export const satinColors = [
  { code: "3033", name: "Warm White",      hex: "#F5F0E0", family: "white",  tags: ["popular", "satin", "warm"] },
  { code: "4046", name: "Off White",       hex: "#F2EDE0", family: "white",  tags: ["popular", "satin", "classic"] },
  { code: "3040", name: "Cream",           hex: "#F5E6C8", family: "cream",  tags: ["popular", "satin", "warm"] },
  { code: "9095", name: "Dove Grey",       hex: "#909898", family: "grey",   tags: ["popular", "satin", "modern"] },
  { code: "9093", name: "Silver Grey",     hex: "#B0B4B8", family: "grey",   tags: ["satin", "modern", "neutral"] },
  { code: "8087", name: "Ice Grey",        hex: "#C8D4D8", family: "grey",   tags: ["satin", "soft", "modern"] },
  { code: "0012", name: "Brilliant Blue",  hex: "#1050A8", family: "blue",   tags: ["popular", "satin", "bold"] },
  { code: "0004", name: "Orange",          hex: "#E86010", family: "orange", tags: ["satin", "bold", "accent"] },
  { code: "3034", name: "Pale Beige",      hex: "#E8D8B8", family: "beige",  tags: ["popular", "satin", "neutral"] },
  { code: "8090", name: "Lilac Haze",      hex: "#C8A8D8", family: "purple", tags: ["satin", "soft", "feminine"] },
];

// ─── TEXCOAT — FLEX & TEXTURED FINISH COLORS ───────────────
// Used for exterior/outdoor walls. One color per application.
export const texcoatColors = [
  { code: "PPT 17-00", name: "Brilliant White",  hex: "#F8F8F4", family: "white",  tags: ["exterior", "clean", "classic", "popular"] },
  { code: "PPT 17-04", name: "Off White",         hex: "#F0EAD8", family: "white",  tags: ["exterior", "warm", "subtle"] },
  { code: "PPT 17-01", name: "Magnolia",          hex: "#EEE4C4", family: "cream",  tags: ["exterior", "warm", "soft"] },
  { code: "PPT 17-02", name: "Cream",             hex: "#C8D890", family: "green",  tags: ["exterior", "fresh", "soft"] },
  { code: "PPT 17-07", name: "Butter Cream",      hex: "#E8D070", family: "yellow", tags: ["exterior", "warm", "bright"] },
  { code: "PPT 17-09", name: "Bamboo",            hex: "#C8A464", family: "brown",  tags: ["exterior", "earthy", "natural"] },
  { code: "PPT 17-03", name: "Sand",              hex: "#D4884A", family: "orange", tags: ["exterior", "earthy", "warm"] },
  { code: "PPT 17-12", name: "Gossamer",          hex: "#B8D490", family: "green",  tags: ["exterior", "soft", "fresh"] },
  { code: "PPT 17-06", name: "Delta Green",       hex: "#607848", family: "green",  tags: ["exterior", "natural", "deep"] },
  { code: "PPT 17-15", name: "Casuarina",         hex: "#90A870", family: "green",  tags: ["exterior", "natural", "medium"] },
  { code: "PPT 17-25", name: "Oka-Maize",         hex: "#C0C848", family: "green",  tags: ["exterior", "bold", "bright"] },
  { code: "PPT 17-13", name: "Brick Red",         hex: "#983020", family: "red",    tags: ["exterior", "bold", "classic"] },
  { code: "PPT 17-10", name: "Laterite Red",      hex: "#A03818", family: "red",    tags: ["exterior", "earthy", "Nigerian"] },
  { code: "PPT 17-28", name: "Coral Red",         hex: "#B84830", family: "red",    tags: ["exterior", "warm", "bold"] },
  { code: "PPT 17-18", name: "Salmon Brown",      hex: "#C07858", family: "brown",  tags: ["exterior", "warm", "earthy"] },
  { code: "PPT 17-11", name: "Coconut Brown",     hex: "#804828", family: "brown",  tags: ["exterior", "earthy", "deep"] },
  { code: "PPT 17-05", name: "Chocolate",         hex: "#502010", family: "brown",  tags: ["exterior", "very deep", "bold"] },
  { code: "PPT 17-17", name: "Bitter Chocolate",  hex: "#381408", family: "brown",  tags: ["exterior", "very deep", "bold"] },
  { code: "PPT 17-16", name: "Abuja Brown",       hex: "#906040", family: "brown",  tags: ["exterior", "earthy", "warm"] },
  { code: "PPT 17-08", name: "Harmattan Grey",    hex: "#909090", family: "grey",   tags: ["exterior", "neutral", "modern"] },
  { code: "PPT 17-29", name: "Concorde Grey",     hex: "#708090", family: "grey",   tags: ["exterior", "cool", "modern"] },
  { code: "PPT 17-27", name: "Rock Grey",         hex: "#585E64", family: "grey",   tags: ["exterior", "deep", "modern"] },
  { code: "PPT 17-14", name: "Tarqua Grey",       hex: "#384048", family: "grey",   tags: ["exterior", "very deep", "bold"] },
  { code: "PPT 17-30", name: "Pale Beige",        hex: "#D8C8A0", family: "beige",  tags: ["exterior", "warm", "neutral"] },
];

// ─── GLOSS COLORS ──────────────────────────────────────────
// Gloss is typically used in TWO colors (e.g. schools: white + a bold color)
export const glossColors = [
  { code: "3033", name: "Warm White",      hex: "#F5F0E0", family: "white",  tags: ["gloss", "trim", "schools", "popular"] },
  { code: "4046", name: "Off White",       hex: "#F2EDE0", family: "white",  tags: ["gloss", "trim", "schools", "popular"] },
  { code: "0012", name: "Brilliant Blue",  hex: "#1050A8", family: "blue",   tags: ["gloss", "schools", "bold"] },
  { code: "0010", name: "National Green",  hex: "#186030", family: "green",  tags: ["gloss", "schools", "Nigerian", "bold"] },
  { code: "0006", name: "Post Office Red", hex: "#CC1010", family: "red",    tags: ["gloss", "bold", "schools"] },
  { code: "4055", name: "Sunflower",       hex: "#F5D020", family: "yellow", tags: ["gloss", "bold", "schools"] },
  { code: "0004", name: "Orange",          hex: "#E86010", family: "orange", tags: ["gloss", "bold", "accent"] },
  { code: "0013", name: "Midnight Blue",   hex: "#102060", family: "blue",   tags: ["gloss", "deep", "bold"] },
  { code: "6071", name: "Leaf Green",      hex: "#489848", family: "green",  tags: ["gloss", "schools", "bold"] },
  { code: "1023", name: "Tile Red",        hex: "#B03020", family: "red",    tags: ["gloss", "bold", "classic"] },
];

// ─── CEILING ───────────────────────────────────────────────
// In Nigerian homes the ceiling is ALWAYS Brilliant White
export const ceilingColor = {
  name: "Brilliant White",
  hex: "#FFFFFF",
  note: "Standard ceiling color across all Nigerian homes and buildings.",
};

// ─── COLOR PAIRING RULES ───────────────────────────────────
export const pairingRules = {
  "Sky Blue":        { ceiling: "Brilliant White", trim: "Off White",   accent: "Leaf Green" },
  "Pale Blue":       { ceiling: "Brilliant White", trim: "Warm White",  accent: "Silver Grey" },
  "Nursery Blue":    { ceiling: "Brilliant White", trim: "Off White",   accent: "Light Green" },
  "Brilliant Blue":  { ceiling: "Brilliant White", trim: "Off White",   accent: "Silver Grey" },
  "Cream":           { ceiling: "Brilliant White", trim: "Off White",   accent: "Bamboo" },
  "Pale Beige":      { ceiling: "Brilliant White", trim: "Warm White",  accent: "Sand" },
  "Warm White":      { ceiling: "Brilliant White", trim: "Off White",   accent: "Pale Beige" },
  "Off White":       { ceiling: "Brilliant White", trim: "Warm White",  accent: "Cream" },
  "Pale Mushroom":   { ceiling: "Brilliant White", trim: "Off White",   accent: "Cameo" },
  "Apple Green":     { ceiling: "Brilliant White", trim: "Off White",   accent: "Cream" },
  "Leaf Green":      { ceiling: "Brilliant White", trim: "Warm White",  accent: "Sand" },
  "Light Green":     { ceiling: "Brilliant White", trim: "Off White",   accent: "Pale Beige" },
  "Aquamarine":      { ceiling: "Brilliant White", trim: "Off White",   accent: "Sky Blue" },
  "Orange":          { ceiling: "Brilliant White", trim: "Off White",   accent: "Midnight Blue" },
  "Lilac Haze":      { ceiling: "Brilliant White", trim: "Warm White",  accent: "Pale Beige" },
  "Rose Pink":       { ceiling: "Brilliant White", trim: "Off White",   accent: "Lilac Haze" },
  "Rose":            { ceiling: "Brilliant White", trim: "Warm White",  accent: "Cream" },
  "Mustard":         { ceiling: "Brilliant White", trim: "Cream",       accent: "Leaf Green" },
  "Sand":            { ceiling: "Brilliant White", trim: "Off White",   accent: "Warm White" },
  "Silver Grey":     { ceiling: "Brilliant White", trim: "Off White",   accent: "Sky Blue" },
  "Dove Grey":       { ceiling: "Brilliant White", trim: "Off White",   accent: "Pale Blue" },
  "Ice Grey":        { ceiling: "Brilliant White", trim: "Warm White",  accent: "Sky Blue" },
  "Sunflower":       { ceiling: "Brilliant White", trim: "Off White",   accent: "National Green" },
  "National Green":  { ceiling: "Brilliant White", trim: "Off White",   accent: "Sunflower" },
};

// ─── CONCERN-BASED COLOR STRATEGY ──────────────────────────
export const concernRecommendations = {
  "children":   "deeper",   // Deeper tones hide stains better
  "low-light":  "lighter",  // Lighter shades reflect more light
  "bright":     "bold",     // Room can handle bold or saturated colors
  "cleanable":  "satin",    // Satin finish is wipeable and easy to clean
};

// ─── ROOM DEFAULTS ─────────────────────────────────────────
// Suggested colors per room when customer has no color preference
export const roomDefaults = {
  "bedroom":      ["Pale Beige", "Sky Blue", "Cream", "Lilac Haze", "Warm White", "Rose Pink"],
  "living-room":  ["Warm White", "Cream", "Pale Beige", "Sky Blue", "Sand", "Apple Green"],
  "kitchen":      ["Off White", "Cream", "Warm White", "Light Green", "Sky Blue"],
  "bathroom":     ["Sky Blue", "Off White", "Aquamarine", "Light Blue", "Ice Grey"],
  "office":       ["Off White", "Silver Grey", "Sky Blue", "Cream", "Pale Beige", "Dove Grey"],
  "exterior":     ["Brilliant White", "Cream", "Magnolia", "Sand", "Off White"],
  "school":       ["Warm White", "Brilliant Blue", "National Green", "Orange", "Post Office Red"],
};

// ─── PAINT TYPE INFO ───────────────────────────────────────
export const paintTypeInfo = {
  emulsion: {
    label: "Emulsion",
    description: "Standard matte wall paint. Best for interior walls and ceilings.",
    finishType: "Matte",
    bestFor: ["bedrooms", "living rooms", "offices", "general interior"],
    colorSource: emulsionColors,
  },
  satin: {
    label: "Satin",
    description: "Smooth finish with a slight sheen. Wipeable and easy to clean. Does not cause heat. Great for busy homes with children.",
    finishType: "Slight sheen",
    bestFor: ["kitchens", "children's rooms", "busy homes", "areas that need cleaning"],
    colorSource: satinColors,
  },
  texcoat: {
    label: "Texcoat",
    description: "Heavy duty acrylic textured finish for exterior and outdoor walls. Applied in one color.",
    finishType: "Textured",
    bestFor: ["exterior walls", "outdoor surfaces", "compound walls", "fences"],
    colorSource: texcoatColors,
  },
  gloss: {
    label: "Gloss",
    description: "High-shine finish. Typically used in two contrasting colors. Popular for schools, offices, and trims.",
    finishType: "High gloss",
    bestFor: ["schools", "offices", "trims", "doors", "accent walls"],
    colorSource: glossColors,
  },
};

// ─── HELPER FUNCTIONS ──────────────────────────────────────

/** Find a color by name (case-insensitive) */
export const findColorByName = (name, type = "emulsion") => {
  const source = paintTypeInfo[type]?.colorSource || emulsionColors;
  return source.find((c) => c.name.toLowerCase() === name.toLowerCase());
};

/** Find a color by its paint code */
export const findColorByCode = (code, type = "emulsion") => {
  const source = paintTypeInfo[type]?.colorSource || emulsionColors;
  return source.find((c) => c.code === code);
};

/** Get all colors for a given color family e.g. "blue", "green" */
export const getColorsByFamily = (family, type = "emulsion") => {
  const source = paintTypeInfo[type]?.colorSource || emulsionColors;
  return source.filter((c) => c.family === family);
};

/** Get all colors for a given paint type */
export const getColorsByType = (type = "emulsion") => {
  return paintTypeInfo[type]?.colorSource || emulsionColors;
};

/**
 * Build a plain text color list to inject into the AI prompt
 * so the model knows exactly what colors are available in the shop
 */
export const buildColorListForPrompt = (type = "emulsion") => {
  const colors = getColorsByType(type);
  return colors.map((c) => `${c.name} (Code: ${c.code})`).join(", ");
};