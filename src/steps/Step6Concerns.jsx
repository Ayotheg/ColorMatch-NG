import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Baby, SunDim, Sun, Paintbrush, Check,
  Droplets, Wind, Thermometer, ShieldCheck, Waves, CloudRain,
  Zap, Eye, Sofa, BedDouble, Flame, UtensilsCrossed,
  Volume2, Sunset, TreePine, Users, Briefcase, Lightbulb,
  Heart, Star
} from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

// ─── SHARED (all rooms) ───────────────────────────────────────────────────────
const SHARED_CONCERNS = [
  {
    id: "Need easy-to-clean walls",
    icon: <Paintbrush size={20} />,
    label: "Need easy-to-clean walls",
    description: "Low-texture, wipeable surface",
    color: "bg-[#e5eef9] text-[#547ab4]",
  },
  {
    id: "Working with a tight budget",
    icon: <Star size={20} />,
    label: "Working with a tight budget",
    description: "Want max impact with fewer colors",
    color: "bg-[#f9f3e5] text-[#a87c3a]",
  },
];

// ─── BEDROOM ──────────────────────────────────────────────────────────────────
const BEDROOM_CONCERNS = [
  {
    id: "Kids that may stain walls",
    icon: <Baby size={20} />,
    label: "Kids that may stain walls",
    description: "Deeper tones hide marks better",
    color: "bg-[#f9e5e5] text-[#b45454]",
    group: "People & Usage",
  },
  {
    id: "Shared bedroom for multiple children",
    icon: <Users size={20} />,
    label: "Shared room for multiple kids",
    description: "Playful but easy to maintain",
    color: "bg-[#f0e5f9] text-[#7a54b4]",
    group: "People & Usage",
  },
  {
    id: "Master bedroom — needs a calm feel",
    icon: <BedDouble size={20} />,
    label: "Master bedroom — needs calm feel",
    description: "Relaxing, sleep-friendly tones",
    color: "bg-[#e5f0f9] text-[#547ab4]",
    group: "People & Usage",
  },
  {
    id: "Little light in the room",
    icon: <SunDim size={20} />,
    label: "Little light in the room",
    description: "Light-reflecting shades work better",
    color: "bg-[#e5f9f0] text-[#54b484]",
    group: "Light & Space",
  },
  {
    id: "Very bright room",
    icon: <Sun size={20} />,
    label: "Very bright room",
    description: "Can handle bold or deep tones",
    color: "bg-[#f9eee5] text-[#b47a54]",
    group: "Light & Space",
  },
  {
    id: "Small room — want it to feel bigger",
    icon: <Sunset size={20} />,
    label: "Small room — want it to feel bigger",
    description: "Lighter tones open up a space",
    color: "bg-[#e5f9f9] text-[#3a9aaa]",
    group: "Light & Space",
  },
  {
    id: "Want a warm and cosy feel",
    icon: <Heart size={20} />,
    label: "Want a warm and cosy feel",
    description: "Earthy and amber tones work well",
    color: "bg-[#f9ede5] text-[#b46a3a]",
    group: "Mood & Vibe",
  },
  {
    id: "Prefer cool and refreshing tones",
    icon: <Wind size={20} />,
    label: "Prefer cool and refreshing tones",
    description: "Blues and greens feel airy",
    color: "bg-[#e5eef9] text-[#4a7ab4]",
    group: "Mood & Vibe",
  },
];

// ─── LIVING ROOM ──────────────────────────────────────────────────────────────
const LIVING_ROOM_CONCERNS = [
  {
    id: "Kids that may stain walls",
    icon: <Baby size={20} />,
    label: "Kids that may stain walls",
    description: "Deeper tones hide marks better",
    color: "bg-[#f9e5e5] text-[#b45454]",
    group: "People & Usage",
  },
  {
    id: "Frequent guests and entertaining",
    icon: <Users size={20} />,
    label: "Frequent guests & entertaining",
    description: "Impressive but welcoming tone",
    color: "bg-[#e5f0f9] text-[#547ab4]",
    group: "People & Usage",
  },
  {
    id: "Family lounge — used all day",
    icon: <Sofa size={20} />,
    label: "Family lounge — used all day",
    description: "Durable and comfortable tones",
    color: "bg-[#f0e5f9] text-[#7a54b4]",
    group: "People & Usage",
  },
  {
    id: "Little light in the room",
    icon: <SunDim size={20} />,
    label: "Little light in the room",
    description: "Light-reflecting shades work better",
    color: "bg-[#e5f9f0] text-[#54b484]",
    group: "Light & Space",
  },
  {
    id: "Very bright room",
    icon: <Sun size={20} />,
    label: "Very bright room",
    description: "Can handle bold or deep tones",
    color: "bg-[#f9eee5] text-[#b47a54]",
    group: "Light & Space",
  },
  {
    id: "Open plan — connects to dining or kitchen",
    icon: <Sunset size={20} />,
    label: "Open plan — connects to dining area",
    description: "Colors need to flow between spaces",
    color: "bg-[#e5f9f9] text-[#3a9aaa]",
    group: "Light & Space",
  },
  {
    id: "Want a bold statement wall",
    icon: <Star size={20} />,
    label: "Want a bold statement wall",
    description: "One accent wall, rest stays neutral",
    color: "bg-[#f9ede5] text-[#b46a3a]",
    group: "Mood & Vibe",
  },
  {
    id: "Want a warm and welcoming feel",
    icon: <Heart size={20} />,
    label: "Want a warm and welcoming feel",
    description: "Earthy, amber, and cream tones",
    color: "bg-[#f9f0e5] text-[#b48040]",
    group: "Mood & Vibe",
  },
  {
    id: "Prefer a modern and minimal look",
    icon: <Lightbulb size={20} />,
    label: "Prefer a modern and minimal look",
    description: "Greys, whites, and neutral tones",
    color: "bg-[#f0f0f0] text-[#606060]",
    group: "Mood & Vibe",
  },
];

// ─── KITCHEN ──────────────────────────────────────────────────────────────────
const KITCHEN_CONCERNS = [
  {
    id: "Grease and steam on walls",
    icon: <Flame size={20} />,
    label: "Grease and steam on walls",
    description: "Needs wipeable, grease-resistant finish",
    color: "bg-[#f9ede5] text-[#b46a3a]",
    group: "Kitchen Conditions",
  },
  {
    id: "Strong cooking smells",
    icon: <UtensilsCrossed size={20} />,
    label: "Strong cooking smells linger",
    description: "Breathable, low-VOC finish preferred",
    color: "bg-[#e5f9f0] text-[#3ab470]",
    group: "Kitchen Conditions",
  },
  {
    id: "High moisture and humidity",
    icon: <Droplets size={20} />,
    label: "High moisture and humidity",
    description: "Moisture-resistant finish needed",
    color: "bg-[#e5eef9] text-[#547ab4]",
    group: "Kitchen Conditions",
  },
  {
    id: "Poor ventilation in kitchen",
    icon: <Wind size={20} />,
    label: "Poor ventilation",
    description: "Traps heat and moisture inside",
    color: "bg-[#f9f3e5] text-[#a87c3a]",
    group: "Kitchen Conditions",
  },
  {
    id: "Little light in the kitchen",
    icon: <SunDim size={20} />,
    label: "Little light in the kitchen",
    description: "Light, reflective shades open it up",
    color: "bg-[#e5f9f0] text-[#54b484]",
    group: "Light & Space",
  },
  {
    id: "Small kitchen — want it to feel bigger",
    icon: <Sunset size={20} />,
    label: "Small kitchen — want it to feel bigger",
    description: "Light tones create an open feel",
    color: "bg-[#e5f9f9] text-[#3a9aaa]",
    group: "Light & Space",
  },
  {
    id: "Open kitchen visible from living room",
    icon: <Eye size={20} />,
    label: "Open kitchen visible from living room",
    description: "Colors should complement the living room",
    color: "bg-[#f0e5f9] text-[#7a54b4]",
    group: "Light & Space",
  },
  {
    id: "Want a clean and hygienic feel",
    icon: <ShieldCheck size={20} />,
    label: "Want a clean and hygienic feel",
    description: "Whites and light neutrals feel fresher",
    color: "bg-[#e5f0f9] text-[#3a78b4]",
    group: "Mood & Vibe",
  },
  {
    id: "Want a bold and energetic kitchen",
    icon: <Zap size={20} />,
    label: "Want a bold and energetic kitchen",
    description: "Warm accent colors bring energy",
    color: "bg-[#f9e5e5] text-[#b44444]",
    group: "Mood & Vibe",
  },
];

// ─── OFFICE / SCHOOL ──────────────────────────────────────────────────────────
const OFFICE_CONCERNS = [
  {
    id: "Professional environment — needs to look serious",
    icon: <Briefcase size={20} />,
    label: "Professional — needs to look serious",
    description: "Neutral, credible tones",
    color: "bg-[#e5eef9] text-[#3a5a8a]",
    group: "Environment",
  },
  {
    id: "School or classroom — needs to be bright",
    icon: <Users size={20} />,
    label: "School or classroom",
    description: "Bright, stimulating colors for learning",
    color: "bg-[#e5f9e5] text-[#3a8a4a]",
    group: "Environment",
  },
  {
    id: "High traffic — walls get scuffed often",
    icon: <Waves size={20} />,
    label: "High traffic — walls get scuffed",
    description: "Durable, darker tones hide wear",
    color: "bg-[#f9f3e5] text-[#a87c3a]",
    group: "Environment",
  },
  {
    id: "Needs to feel calm and focused",
    icon: <BedDouble size={20} />,
    label: "Needs to feel calm and focused",
    description: "Cool blues and greens aid concentration",
    color: "bg-[#e5eef9] text-[#547ab4]",
    group: "Mood & Productivity",
  },
  {
    id: "Needs to feel energetic and creative",
    icon: <Zap size={20} />,
    label: "Needs to feel energetic and creative",
    description: "Warm accent tones boost energy",
    color: "bg-[#f9ede5] text-[#b46a3a]",
    group: "Mood & Productivity",
  },
  {
    id: "Little light in the room",
    icon: <SunDim size={20} />,
    label: "Little light in the room",
    description: "Light-reflecting tones help a lot here",
    color: "bg-[#e5f9f0] text-[#54b484]",
    group: "Light & Space",
  },
  {
    id: "Want to use brand or school colors",
    icon: <Star size={20} />,
    label: "Want to use brand or school colors",
    description: "Match to your identity palette",
    color: "bg-[#f0e5f9] text-[#7a54b4]",
    group: "Light & Space",
  },
];

// ─── BATHROOM ─────────────────────────────────────────────────────────────────
const BATHROOM_CONCERNS = [
  {
    id: "High moisture and steam",
    icon: <Droplets size={20} />,
    label: "High moisture and steam",
    description: "Needs moisture-resistant finish",
    color: "bg-[#e5f3f9] text-[#3a85a8]",
    group: "Bathroom Conditions",
  },
  {
    id: "Mold and mildew risk",
    icon: <ShieldCheck size={20} />,
    label: "Mold and mildew risk",
    description: "Anti-fungal protection needed",
    color: "bg-[#eaf9e5] text-[#4a9954]",
    group: "Bathroom Conditions",
  },
  {
    id: "Poor ventilation",
    icon: <Wind size={20} />,
    label: "Poor ventilation",
    description: "Traps humidity inside",
    color: "bg-[#f9f3e5] text-[#a87c3a]",
    group: "Bathroom Conditions",
  },
  {
    id: "Little light in the bathroom",
    icon: <SunDim size={20} />,
    label: "Little light in the bathroom",
    description: "Light-reflecting shades work better",
    color: "bg-[#e5f9f0] text-[#54b484]",
    group: "Light & Space",
  },
  {
    id: "Small bathroom — want it to feel bigger",
    icon: <Sunset size={20} />,
    label: "Small bathroom — want it to feel bigger",
    description: "Lighter tones open up the space",
    color: "bg-[#e5f9f9] text-[#3a9aaa]",
    group: "Light & Space",
  },
  {
    id: "Want a spa and luxurious feel",
    icon: <Heart size={20} />,
    label: "Want a spa and luxurious feel",
    description: "Calm neutrals and soft greens",
    color: "bg-[#f0e5f9] text-[#7a54b4]",
    group: "Mood & Vibe",
  },
  {
    id: "Want clean and clinical feel",
    icon: <Eye size={20} />,
    label: "Want a clean and clinical feel",
    description: "Crisp whites and cool tones",
    color: "bg-[#e5eef9] text-[#4a6aaa]",
    group: "Mood & Vibe",
  },
];

// ─── EXTERIOR ─────────────────────────────────────────────────────────────────
const EXTERIOR_CONCERNS = [
  {
    id: "Harsh sun and UV fading",
    icon: <Sun size={20} />,
    label: "Harsh sun and UV fading",
    description: "UV-resistant formula needed",
    color: "bg-[#fff3e0] text-[#b45a00]",
    group: "Weather & Climate",
  },
  {
    id: "Heavy rain and moisture",
    icon: <CloudRain size={20} />,
    label: "Heavy rain and moisture",
    description: "Waterproof and weather-resistant",
    color: "bg-[#e5eef9] text-[#547ab4]",
    group: "Weather & Climate",
  },
  {
    id: "Heat and cracking walls",
    icon: <Thermometer size={20} />,
    label: "Heat and cracking walls",
    description: "Flexible, crack-bridging finish",
    color: "bg-[#fce5e5] text-[#b44444]",
    group: "Weather & Climate",
  },
  {
    id: "Harmattan dust and dirt build-up",
    icon: <Waves size={20} />,
    label: "Harmattan dust and dirt build-up",
    description: "Easy-clean exterior surface",
    color: "bg-[#f3f0e5] text-[#8a7a44]",
    group: "Weather & Climate",
  },
  {
    id: "Efflorescence and salt stains",
    icon: <Zap size={20} />,
    label: "Efflorescence and salt stains",
    description: "Common on Nigerian block walls",
    color: "bg-[#f0e5f9] text-[#7a4ab4]",
    group: "Wall Condition",
  },
  {
    id: "Old wall with cracks and rough surface",
    icon: <TreePine size={20} />,
    label: "Old wall — cracks and rough surface",
    description: "Texcoat fills and covers well",
    color: "bg-[#e5f0e8] text-[#4a7a54]",
    group: "Wall Condition",
  },
  {
    id: "New build — first coat",
    icon: <ShieldCheck size={20} />,
    label: "New build — first coat",
    description: "Needs good primer and adhesion",
    color: "bg-[#e5f9f0] text-[#3ab484]",
    group: "Wall Condition",
  },
  {
    id: "High visibility and kerb appeal",
    icon: <Eye size={20} />,
    label: "High visibility and kerb appeal",
    description: "Bold, lasting colour payoff",
    color: "bg-[#e5f9f3] text-[#3a9978]",
    group: "Appearance",
  },
  {
    id: "Want to match compound or fence",
    icon: <Volume2 size={20} />,
    label: "Want to match compound or fence",
    description: "Consistent look across the property",
    color: "bg-[#f9f0e5] text-[#aa7a3a]",
    group: "Appearance",
  },
];

// ─── Room → concern set mapping ───────────────────────────────────────────────
function getConcernsForRoom(room) {
  switch (room) {
    case "Bathroom":    return [...BATHROOM_CONCERNS, ...SHARED_CONCERNS];
    case "Exterior":    return [...EXTERIOR_CONCERNS];
    case "Kitchen":     return [...KITCHEN_CONCERNS, ...SHARED_CONCERNS];
    case "Office":      return [...OFFICE_CONCERNS, ...SHARED_CONCERNS];
    case "Bedroom":     return [...BEDROOM_CONCERNS, ...SHARED_CONCERNS];
    case "Living Room": return [...LIVING_ROOM_CONCERNS, ...SHARED_CONCERNS];
    default:            return [...BEDROOM_CONCERNS, ...SHARED_CONCERNS];
  }
}

function getRoomBanner(room) {
  const banners = {
    "Bathroom":    { emoji: "🚿", hint: "Bathrooms need moisture and mold-resistant finishes." },
    "Exterior":    { emoji: "🏠", hint: "Exterior walls face sun, rain, heat, and Nigerian harmattan." },
    "Kitchen":     { emoji: "🍳", hint: "Kitchens deal with grease, steam, and strong cooking smells." },
    "Office":      { emoji: "💼", hint: "Office and school spaces need durable, purposeful colors." },
    "Bedroom":     { emoji: "🛏️", hint: "Bedrooms are personal — your comfort and mood matter most." },
    "Living Room": { emoji: "🛋️", hint: "Living rooms set the tone for your entire home." },
  };
  return banners[room] || null;
}

// ─── Group concerns by their group label ─────────────────────────────────────
function groupConcerns(concerns) {
  const groups = {};
  concerns.forEach((concern) => {
    const key = concern.group || "General";
    if (!groups[key]) groups[key] = [];
    groups[key].push(concern);
  });
  return groups;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Step6Concerns() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedConcerns = quizState.concerns || [];
  const room = quizState.room || "";

  const concerns = getConcernsForRoom(room);
  const groupedConcerns = groupConcerns(concerns);
  const banner = getRoomBanner(room);

  // Clear stale concerns that no longer belong to the current room
  useEffect(() => {
    const validIds = concerns.map((c) => c.id);
    const cleaned = selectedConcerns.filter((id) => validIds.includes(id));
    if (cleaned.length !== selectedConcerns.length) {
      setAnswer("concerns", cleaned);
    }
  }, [room]);

  const toggleConcern = (id) => {
    const updated = selectedConcerns.includes(id)
      ? selectedConcerns.filter((item) => item !== id)
      : [...selectedConcerns, id];
    setAnswer("concerns", updated);
  };

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step5-paint-type")}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      ),
      center: (
        <div className="flex items-center gap-1">
          <span className="font-title font-bold text-primary text-sm tracking-tight">ColorMatch</span>
          <span className="font-title font-bold text-primary text-sm tracking-tight">NG</span>
        </div>
      ),
      right: (
        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      ),
    });
  }, [setNavbar, navigate]);

  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-32 bg-bg relative overflow-x-hidden">

      {/* Title */}
      <div className="mb-6 animate-in fade-in slide-in-from-top-6 duration-700">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-3">
          Any special <br />
          <span className="text-primary font-title">concerns</span>?
        </h1>
        <p className="text-text-muted text-[15px] font-body leading-relaxed max-w-[280px]">
          Select all that apply — this helps us get your color match just right.
        </p>
      </div>

      {/* Room context banner */}
      {banner && (
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/15 rounded-[20px] px-5 py-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          <span className="text-2xl">{banner.emoji}</span>
          <p className="text-[13px] font-body text-text-muted leading-snug flex-1">
            {banner.hint}
          </p>
        </div>
      )}

      {/* Skip hint */}
      <p className="text-[12px] text-text-soft font-body mb-6 -mt-2">
        You can skip this step if none apply — just tap Get Results.
      </p>

      {/* Grouped concerns */}
      <div className="space-y-8 mb-8">
        {Object.entries(groupedConcerns).map(([groupName, items], groupIndex) => (
          <div key={groupName}>
            {/* Group label */}
            <p className="text-[11px] font-button font-bold uppercase tracking-widest text-text-soft mb-3 px-1">
              {groupName}
            </p>

            <div className="space-y-3">
              {items.map((concern, index) => (
                <div
                  key={concern.id}
                  onClick={() => toggleConcern(concern.id)}
                  className={`w-full flex items-center p-5 rounded-[28px] transition-all duration-500 transform border-2 relative cursor-pointer group animate-in fade-in slide-in-from-bottom-8 ${
                    selectedConcerns.includes(concern.id)
                      ? "bg-white border-primary shadow-xl scale-[1.02] -translate-y-1"
                      : "bg-surface-alt/50 border-transparent hover:border-primary/20 hover:scale-[1.01]"
                  }`}
                  style={{ animationDelay: `${(groupIndex * 100) + (index * 60)}ms` }}
                >
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-500 group-hover:scale-110 ${concern.color}`}
                  >
                    {concern.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 pr-4">
                    <h4
                      className={`font-bold font-title text-[15px] leading-tight transition-colors ${
                        selectedConcerns.includes(concern.id) ? "text-text" : "text-text-soft"
                      }`}
                    >
                      {concern.label}
                    </h4>
                    {concern.description && (
                      <p className="text-[12px] text-text-soft mt-0.5 leading-tight font-body">
                        {concern.description}
                      </p>
                    )}
                  </div>

                  {/* Check circle */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      selectedConcerns.includes(concern.id)
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {selectedConcerns.includes(concern.id) && (
                      <Check size={14} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected count pill */}
      {selectedConcerns.length > 0 && (
        <div className="flex justify-center mb-4 animate-in fade-in duration-300">
          <div className="bg-primary/10 text-primary text-[12px] font-button font-bold px-4 py-1.5 rounded-full">
            {selectedConcerns.length} concern{selectedConcerns.length > 1 ? "s" : ""} selected
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50 mt-auto">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button
            to="/loading"
            label={selectedConcerns.length === 0 ? "Skip & Get Results" : "Get Results"}
          />
        </div>
      </div>
    </div>
  );
}
