import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Baby, SunDim, Sun, Paintbrush, Check,
  Droplets, Wind, Thermometer, ShieldCheck, Waves, CloudRain,
  Zap, Eye
} from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

// ─── Concern definitions ──────────────────────────────────────────────────────

const SHARED_CONCERNS = [
  {
    id: "Need easy-to-clean",
    icon: <Paintbrush size={20} />,
    label: "Need easy-to-clean",
    description: "Low-texture surfaces",
    color: "bg-[#e5eef9] text-[#547ab4]",
  },
];

const INTERIOR_CONCERNS = [
  {
    id: "Kids that stain walls",
    icon: <Baby size={20} />,
    label: "Kids that stain walls",
    description: "",
    color: "bg-[#f9e5e5] text-[#b45454]",
  },
  {
    id: "Little light",
    icon: <SunDim size={20} />,
    label: "Little light",
    description: "Light-reflecting",
    color: "bg-[#e5f9f0] text-[#54b484]",
  },
  {
    id: "Very bright room",
    icon: <Sun size={20} />,
    label: "Very bright room",
    description: "",
    color: "bg-[#f9eee5] text-[#b47a54]",
  },
];

const BATHROOM_CONCERNS = [
  {
    id: "High moisture & steam",
    icon: <Droplets size={20} />,
    label: "High moisture & steam",
    description: "Needs moisture-resistant finish",
    color: "bg-[#e5f3f9] text-[#3a85a8]",
  },
  {
    id: "Mold & mildew risk",
    icon: <ShieldCheck size={20} />,
    label: "Mold & mildew risk",
    description: "Anti-fungal protection needed",
    color: "bg-[#eaf9e5] text-[#4a9954]",
  },
  {
    id: "Poor ventilation",
    icon: <Wind size={20} />,
    label: "Poor ventilation",
    description: "Traps humidity inside",
    color: "bg-[#f9f3e5] text-[#a87c3a]",
  },
  {
    id: "Little light",
    icon: <SunDim size={20} />,
    label: "Little light",
    description: "Light-reflecting",
    color: "bg-[#e5f9f0] text-[#54b484]",
  },
];

const EXTERIOR_CONCERNS = [
  {
    id: "Harsh sun & UV fading",
    icon: <Sun size={20} />,
    label: "Harsh sun & UV fading",
    description: "UV-resistant formula needed",
    color: "bg-[#fff3e0] text-[#b45a00]",
  },
  {
    id: "Heavy rain & moisture",
    icon: <CloudRain size={20} />,
    label: "Heavy rain & moisture",
    description: "Waterproof & weather-resistant",
    color: "bg-[#e5eef9] text-[#547ab4]",
  },
  {
    id: "Heat & cracking",
    icon: <Thermometer size={20} />,
    label: "Heat & cracking",
    description: "Flexible, crack-bridging finish",
    color: "bg-[#fce5e5] text-[#b44444]",
  },
  {
    id: "Dust & dirt build-up",
    icon: <Waves size={20} />,
    label: "Dust & dirt build-up",
    description: "Easy-clean exterior surface",
    color: "bg-[#f3f0e5] text-[#8a7a44]",
  },
  {
    id: "Efflorescence / salt stains",
    icon: <Zap size={20} />,
    label: "Efflorescence / salt stains",
    description: "Common on Nigerian block walls",
    color: "bg-[#f0e5f9] text-[#7a4ab4]",
  },
  {
    id: "High visibility / kerb appeal",
    icon: <Eye size={20} />,
    label: "High visibility / kerb appeal",
    description: "Bold, lasting colour payoff",
    color: "bg-[#e5f9f3] text-[#3a9978]",
  },
];

// ─── Room → concern set mapping ───────────────────────────────────────────────
function getConcernsForRoom(room) {
  if (room === "Bathroom") {
    return [...BATHROOM_CONCERNS, ...SHARED_CONCERNS];
  }
  if (room === "Exterior") {
    return [...EXTERIOR_CONCERNS, ...SHARED_CONCERNS];
  }
  // All other rooms (Bedroom, Living Room, Kitchen, Office/School)
  return [...INTERIOR_CONCERNS, ...SHARED_CONCERNS];
}

function getRoomLabel(room) {
  if (room === "Bathroom")  return { emoji: "🚿", hint: "Bathrooms need moisture & mold-resistant finishes." };
  if (room === "Exterior")  return { emoji: "🏠", hint: "Exterior walls face sun, rain, heat, and Nigerian harmattan." };
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Step6Concerns() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedConcerns = quizState.concerns || [];
  const room = quizState.room || "";

  const concerns = getConcernsForRoom(room);
  const roomHint = getRoomLabel(room);

  // Clear stale concerns that don't belong to the current room's set
  useEffect(() => {
    const validIds = concerns.map((c) => c.id);
    const cleaned = selectedConcerns.filter((id) => validIds.includes(id));
    if (cleaned.length !== selectedConcerns.length) {
      setAnswer("concerns", cleaned);
    }
  }, [room]);

  const toggleConcern = (id) => {
    const newConcerns = selectedConcerns.includes(id)
      ? selectedConcerns.filter((item) => item !== id)
      : [...selectedConcerns, id];
    setAnswer("concerns", newConcerns);
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
          Any special <br /><span className="text-primary font-title">concerns</span>?
        </h1>
        <p className="text-text-muted text-[15px] font-body leading-relaxed max-w-[280px]">
          Select all that apply to help us calibrate the perfect finish for your environment.
        </p>
      </div>

      {/* Context hint banner for Bathroom / Exterior */}
      {roomHint && (
        <div className="flex items-center gap-3 bg-primary/5 border border-primary/15 rounded-[20px] px-5 py-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
          <span className="text-2xl">{roomHint.emoji}</span>
          <p className="text-[13px] font-body text-text-muted leading-snug flex-1">
            {roomHint.hint}
          </p>
        </div>
      )}

      {/* Concerns list */}
      <div className="space-y-4 mb-8">
        {concerns.map((concern, index) => (
          <div
            key={concern.id}
            onClick={() => toggleConcern(concern.id)}
            className={`w-full flex items-center p-5 rounded-[32px] transition-all duration-500 transform border-2 relative cursor-pointer group animate-in fade-in slide-in-from-bottom-10 ${
              selectedConcerns.includes(concern.id)
                ? "bg-white border-primary shadow-xl scale-[1.02] -translate-y-1"
                : "bg-surface-alt/50 border-transparent hover:border-primary/20 hover:scale-[1.01]"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-500 group-hover:scale-110 ${concern.color}`}
            >
              {concern.icon}
            </div>

            {/* Text */}
            <div className="flex-1 pr-6">
              <h4
                className={`font-bold font-title text-base leading-tight transition-colors ${
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

      {/* CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50 mt-auto">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button
            to="/loading"
            label="Get Results"
            disabled={selectedConcerns.length === 0}
          />
        </div>
      </div>
    </div>
  );
}