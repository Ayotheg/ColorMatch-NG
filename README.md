# 🎨 ColorMatch NG

> **Your Vision. Perfectly Mixed.**  
> A one-time use, AI-powered paint color suggestion tool built for Nigerian paint shops. No login. No account. Just walk in, answer a few questions, and walk out with your perfect color match.

---

## 📸 Preview

<!-- Add screenshots here after first build -->
> _Screenshots coming soon — replace this section with exported frames from Figma._

---

## 🧠 The Problem It Solves

Customers walk into a paint shop knowing they want to repaint — but they don't know what colors to pick or what pairs well together. They might have a tile color, a curtain, a wallpaper, or just a vibe in mind. This app guides them through a simple quiz and returns AI-powered color suggestions mapped to **real Finecoat/Shield paint codes** available in the shop.

---

## ✨ Features

- 🪄 **AI Color Suggestions** — Powered by OpenRouter (free tier) using Llama 3.3 70B
- 🎯 **Nigerian Paint Catalog** — Colors mapped directly to Finecoat/Shield emulsion codes
- 📱 **Mobile First** — Designed for use on a phone or shop tablet in a bright retail environment
- 🧩 **Step-by-step Quiz** — Guides customers through room type, who it's for, paint finish, and more
- 🏠 **Context-Aware** — Considers tile color, curtain color, wallpaper, and furniture matching
- 🧒 **Family-Aware** — Recommends deeper shades for homes with young children
- 🖌️ **All Paint Types** — Covers Emulsion, Satin, Texcoat, and Gloss
- 🔒 **Zero Data Stored** — One-time use, nothing is saved, no accounts needed
- ⚡ **Instant Results** — No waiting, no sign-up friction

---

## 🗂️ Project Structure

```
colormatch-ng/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   └── logo.svg
│   │
│   ├── components/              # Reusable UI pieces
│   │   ├── ProgressBar.jsx      # Step progress indicator
│   │   ├── OptionCard.jsx       # Tappable quiz answer card
│   │   ├── ColorSwatch.jsx      # Paint color display card
│   │   └── NavBar.jsx           # Top navigation bar
│   │
│   ├── screens/                 # Full page screens
│   │   ├── Welcome.jsx          # Landing / hero screen
│   │   ├── Results.jsx          # AI color suggestions screen
│   │   └── Loading.jsx          # Thinking / loading animation
│   │
│   ├── steps/                   # Quiz steps (one file per question)
│   │   ├── Step1Room.jsx        # What are you painting?
│   │   ├── Step2WhoIsIt.jsx     # Who is this room for?
│   │   ├── Step3ColorInMind.jsx # Do you have a color in mind?
│   │   ├── Step4Matching.jsx    # Do you have something to match?
│   │   ├── Step5PaintType.jsx   # What paint finish?
│   │   └── Step6Concerns.jsx    # Any special concerns?
│   │
│   ├── data/
│   │   └── colors.js            # Full Finecoat/Shield color catalog
│   │
│   ├── hooks/
│   │   └── useQuiz.js           # Quiz state & step navigation logic
│   │
│   ├── utils/
│   │   └── buildPrompt.js       # Builds AI prompt from quiz answers
│   │
│   ├── App.jsx                  # Root component & routing
│   ├── main.jsx
│   └── index.css
│
├── .env                         # API key (never commit this)
├── .env.example                 # Safe template for other devs
├── .gitignore
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React (Vite) | Fast, component-based, great for quiz flows |
| **Styling** | Tailwind CSS | Utility-first, matches the design system perfectly |
| **Routing** | React Router DOM | Navigate between Welcome → Steps → Results |
| **AI Model** | OpenRouter (Llama 3.3 70B `:free`) | Free tier, no credit card, GPT-4 level quality |
| **Fonts** | Plus Jakarta Sans + Inter | Editorial headlines + clean body text |
| **Deployment** | Vercel | Free hosting, auto-deploys from GitHub |

---

## 🎨 Design System

This app uses **"The Earthen Digital Atelier"** design language — inspired by Nigerian landscapes. Key design rules:

- **Primary color:** Terracotta `#973100` → `#c04000` (gradient)
- **Secondary color:** Forest Green `#3B6751`
- **No hard borders** — sections are separated by background color shifts only
- **Minimum tap target:** 48×48px for shop environment usability
- **Fonts:** Plus Jakarta Sans (headlines) + Inter (body)
- **No pure black** — use `#1a1c1c` for all text

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A free [OpenRouter](https://openrouter.ai) account and API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/colormatch-ng.git

# 2. Navigate into the project
cd colormatch-ng

# 3. Install dependencies
npm install

# 4. Set up your environment variables
cp .env.example .env
# Then open .env and add your OpenRouter API key

# 5. Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.

---

## 🧩 How the Quiz Flow Works

```
Customer opens app
        ↓
Welcome Screen → "Match My Color"
        ↓
Step 1: What room? (Bedroom / Living Room / Kitchen / etc.)
        ↓
Step 2: Who is it for? (Family with kids / Adults / Commercial)
        ↓
Step 3: Color in mind? (Pick from Nigerian paint chart or let AI decide)
        ↓
Step 4: Something to match? (Tiles / Curtains / Furniture / Wallpaper)
        ↓
Step 5: Paint finish? (Emulsion / Satin / Texcoat / Gloss)
        ↓
Step 6: Special concerns? (Kids that stain / Low light / Need easy-clean)
        ↓
AI generates suggestion using Finecoat/Shield color codes
        ↓
Results Screen → Primary color + 2–3 pairings + reason why
        ↓
Customer screenshots result and shows it to the shopkeeper
```

---

## 🖌️ Paint Types Covered

| Type | Description | Common Use |
|---|---|---|
| **Emulsion** | Standard matte wall paint | Bedrooms, living rooms, general interior |
| **Satin** | Slight sheen, wipeable, doesn't cause heat | Busy homes, kitchens, children's rooms |
| **Texcoat** | Textured, weather-resistant | Exterior/outdoor walls, one color |
| **Gloss** | High shine finish | Schools (2 colors), trims, doors |

### Common Satin Colors Available In-Store
Off-white, Brilliant White, Cream, Grey family, Brilliant Blue, Orange, Pale Beige, Lilac Haze

---

## 🤖 AI Integration (Phase 2)

The AI call is a single `fetch()` to OpenRouter — no SDK needed:

```javascript
// src/utils/buildPrompt.js
export const buildPrompt = (answers) => {
  return `You are a Nigerian paint shop color expert with deep knowledge 
of the Finecoat and Shield emulsion paint range. 

A customer has provided the following information:
- Room type: ${answers.room}
- This room is for: ${answers.who}
- Color preference: ${answers.colorInMind || "No preference — suggest based on context"}
- Needs to match: ${answers.matching}
- Paint finish: ${answers.paintType}
- Special concerns: ${answers.concerns.join(", ")}

Suggest 1 primary paint color and 2–3 complementary pairing colors 
from the Finecoat/Shield Nigerian paint range. 

For each color include:
- Color name and reference code (e.g. Sky Blue — 7003)
- Where to use it (primary wall / ceiling / trim / accent)
- One sentence explaining why it works for this customer's situation

Keep your response warm, simple, and easy for a non-designer to understand.`
}
```

---

## 📱 Deployment

This app deploys to Vercel in under 2 minutes:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts — add your VITE_OPENROUTER_API_KEY 
# as an environment variable in the Vercel dashboard
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 🗺️ Roadmap

- [x] UI/UX Design (Figma — Earthen Digital Atelier)
- [ ] Phase 1: React frontend with all quiz screens
- [ ] Phase 2: OpenRouter AI integration
- [ ] Phase 3: Finecoat/Shield color catalog data entry
- [ ] Phase 4: Deploy to Vercel
- [ ] Phase 5 (Future): Camera color capture — point phone at tile/curtain to extract color
- [ ] Phase 5 (Future): Multi-shop support / multiple branch locations
- [ ] Phase 5 (Future): WhatsApp share button for results

---

## 🙏 Credits & Acknowledgements

- Paint color data sourced from **Finecoat/Shield Emulsion & Gloss Enamel** catalog
- AI inference powered by [OpenRouter](https://openrouter.ai) — free tier
- Design system: **The Earthen Digital Atelier** — rooted in Nigerian landscape colors
- Built with ❤️ for a Nigerian family paint business

---

## 📄 License

MIT License — feel free to fork and adapt for your own paint shop.

---

> _"Your Vision. Perfectly Mixed."_
