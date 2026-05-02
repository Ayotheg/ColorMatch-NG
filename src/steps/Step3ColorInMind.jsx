import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, CircleCheck, Sparkles, ChevronRight,
  ChevronDown, Search, Check, X
} from "lucide-react";

import "../index.css";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";
import { emulsionColors } from "../data/colors";

// ─── Color families shown as category tabs ───────────────────────────
const FAMILIES = [
  { id: "all",    label: "Popular" },
  { id: "white",  label: "Whites" },
  { id: "cream",  label: "Creams" },
  { id: "beige",  label: "Beiges" },
  { id: "yellow", label: "Yellows" },
  { id: "pink",   label: "Pinks" },
  { id: "purple", label: "Purples" },
  { id: "brown",  label: "Browns" },
  { id: "red",    label: "Reds" },
  { id: "orange", label: "Oranges" },
  { id: "green",  label: "Greens" },
  { id: "blue",   label: "Blues" },
  { id: "grey",   label: "Greys" },
];

const POPULAR_TAGS = ["popular", "versatile", "classic"];

function getFilteredColors(family, searchQuery) {
  let list =
    family === "all"
      ? emulsionColors.filter((c) => c.tags.some((t) => POPULAR_TAGS.includes(t)))
      : emulsionColors.filter((c) => c.family === family);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = emulsionColors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.family.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q))
    );
  }
  return list;
}

// ─── Component ───────────────────────────────────────────────────────
export default function Step3ColorInMind() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedColor    = quizState.colorInMind;
  const hasColorInMind   = quizState.hasColorInMind;
  const describeText     = quizState.colorDescription || "";

  const [activeFamily, setActiveFamily]     = useState("all");
  const [searchQuery, setSearchQuery]       = useState("");
  const [showSearch, setShowSearch]         = useState(false);
  const [describeMode, setDescribeMode]     = useState(hasColorInMind === "describe");

  const handleBack = () => {
    if (quizState.room === "Bedroom" || quizState.room === "Living Room") {
      navigate("/step2-who-is-it");
    } else {
      navigate("/step1-room");
    }
  };

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={handleBack}
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

  const filteredColors = getFilteredColors(activeFamily, searchQuery);

  // Is Continue enabled?
  const canContinue =
    hasColorInMind === false ||
    (hasColorInMind === true && !!selectedColor) ||
    (hasColorInMind === "describe" && describeText.trim().length > 3);

  const handleColorPick = (colorName) => {
    setDescribeMode(false);
    setAnswer("hasColorInMind", true);
    setAnswer("colorInMind", colorName);
    setAnswer("colorDescription", "");
  };

  const handleNoPreference = () => {
    setDescribeMode(false);
    setAnswer("hasColorInMind", false);
    setAnswer("colorInMind", "No preference");
    setAnswer("colorDescription", "");
  };

  const handleDescribeMode = () => {
    setDescribeMode(true);
    setAnswer("hasColorInMind", "describe");
    setAnswer("colorInMind", "");
  };

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32 overflow-x-hidden">
      {/* Title */}
      <div className="animate-in fade-in slide-in-from-left-6 duration-700 mb-6">
        <h1 className="text-3xl font-bold font-title text-text leading-tight">
          Do you have a <br /><span className="text-primary">color</span> in mind?
        </h1>
        <p className="font-body text-base text-gray-500 mt-3 leading-relaxed">
          Browse our Nigerian paint chart or describe your vibe — our AI will handle the rest.
        </p>
      </div>

      {/* ── Yes, I have a color ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 animate-in fade-in duration-700 delay-100">
        <h3 className="text-primary font-body font-bold text-sm uppercase tracking-wider">
          Yes, I have a favourite
        </h3>
        <CircleCheck className="text-primary w-5 h-5" />
      </div>

      {/* Search + Family tabs row */}
      <div className="flex items-center gap-3 mb-4 animate-in fade-in duration-700 delay-150">
        {/* Search toggle */}
        <button
          onClick={() => { setShowSearch((s) => !s); setSearchQuery(""); }}
          className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 ${
            showSearch ? "bg-primary text-white border-primary" : "bg-white border-border text-text-muted hover:border-primary/40"
          }`}
        >
          <Search size={16} />
        </button>

        {/* Family scroll tabs */}
        {!showSearch && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 flex-1">
            {FAMILIES.map((fam) => (
              <button
                key={fam.id}
                onClick={() => setActiveFamily(fam.id)}
                className={`flex-shrink-0 text-xs font-bold font-button px-4 py-2 rounded-full transition-all duration-300 border-2 ${
                  activeFamily === fam.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text-muted border-border hover:border-primary/30"
                }`}
              >
                {fam.label}
              </button>
            ))}
          </div>
        )}

        {/* Search input */}
        {showSearch && (
          <div className="flex-1 relative animate-in fade-in slide-in-from-right-4 duration-300">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. sky blue, earthy, bold…"
              className="w-full bg-white border-2 border-primary/40 rounded-2xl px-4 py-2 text-sm font-body text-text focus:outline-none focus:border-primary placeholder:text-text-soft"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-soft">
                <X size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Selected color banner */}
      {selectedColor && hasColorInMind === true && (
        <div className="flex items-center gap-3 mb-4 bg-primary/5 border border-primary/20 rounded-2xl px-4 py-3 animate-in fade-in zoom-in-95 duration-300">
          <div
            className="w-8 h-8 rounded-xl border border-black/10 shadow-sm flex-shrink-0"
            style={{ backgroundColor: emulsionColors.find(c => c.name === selectedColor)?.hex || "#ccc" }}
          />
          <span className="font-bold font-title text-sm text-text flex-1">{selectedColor}</span>
          <Check size={16} className="text-primary" strokeWidth={3} />
        </div>
      )}

      {/* Color Grid */}
      <div className="animate-in fade-in duration-500">
        {filteredColors.length === 0 ? (
          <div className="text-center py-10 text-text-muted font-body text-sm">
            No colors found — try a different search or{" "}
            <button onClick={handleDescribeMode} className="text-primary font-bold underline">describe your color</button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {filteredColors.map((item, index) => (
              <div
                key={item.code}
                onClick={() => handleColorPick(item.name)}
                className={`bg-white rounded-[24px] shadow-sm p-3 flex flex-col gap-2 border-2 cursor-pointer transition-all duration-300 transform ${
                  selectedColor === item.name && hasColorInMind === true
                    ? "border-primary shadow-lg scale-[1.04] -translate-y-0.5"
                    : "border-transparent hover:border-primary/20 hover:scale-[1.02]"
                }`}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div
                  className="aspect-square rounded-xl w-full shadow-inner border border-black/5 relative"
                  style={{ backgroundColor: item.hex }}
                >
                  {selectedColor === item.name && hasColorInMind === true && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                        <Check size={12} className="text-primary" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-0.5">
                  <h4 className={`font-bold text-[11px] leading-tight transition-colors truncate ${
                    selectedColor === item.name && hasColorInMind === true ? "text-text" : "text-text-soft"
                  }`}>
                    {item.name}
                  </h4>
                  <p className="text-text-muted text-[9px] font-bold tracking-widest font-button">{item.code}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── OR separator ─────────────────────────────────────────────── */}
      <div className="separator-or py-6 animate-in fade-in duration-700 delay-500">OR</div>

      {/* ── Describe your color ───────────────────────────────────────── */}
      <div
        onClick={handleDescribeMode}
        className={`rounded-[32px] p-5 flex items-center gap-4 cursor-pointer transition-all duration-500 transform mb-4 animate-in fade-in slide-in-from-bottom-6 delay-600 border-2 ${
          describeMode
            ? "border-primary bg-white shadow-xl scale-[1.02] -translate-y-1"
            : "border-transparent bg-surface-alt/50 hover:bg-white hover:border-primary/20 hover:shadow-md"
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
          describeMode ? "bg-primary text-white scale-110" : "bg-[#f4d9c7] text-primary"
        }`}>
          <span className="text-xl">✏️</span>
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-base leading-tight transition-colors ${describeMode ? "text-text" : "text-text-soft"}`}>
            Describe your color
          </h4>
          <p className="text-text-muted text-xs font-body mt-1">
            e.g. "dusty sage", "warm terracotta", "deep moody navy"
          </p>
        </div>
        <ChevronRight size={18} className={describeMode ? "text-primary" : "text-gray-400"} />
      </div>

      {/* Describe input — expands when describeMode is on */}
      {describeMode && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-400 mb-4">
          <textarea
            autoFocus
            rows={3}
            value={describeText}
            onChange={(e) => setAnswer("colorDescription", e.target.value)}
            placeholder="Describe the color or mood you're going for…"
            className="w-full bg-white border-2 border-primary/30 focus:border-primary rounded-[20px] px-5 py-4 text-sm font-body text-text resize-none focus:outline-none placeholder:text-text-soft shadow-sm"
          />
          <p className="text-[11px] text-text-soft font-body mt-2 px-1">
            Our AI will interpret your description and find the closest match in the Nigerian paint chart.
          </p>
        </div>
      )}

      {/* ── Let app decide ───────────────────────────────────────────── */}
      <div
        onClick={handleNoPreference}
        className={`rounded-[32px] p-5 flex items-center gap-4 cursor-pointer transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-8 delay-700 border-2 ${
          hasColorInMind === false
            ? "border-primary bg-white shadow-xl scale-[1.02] -translate-y-1"
            : "border-transparent bg-surface-alt/50 hover:bg-white hover:border-primary/20 hover:shadow-md"
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
          hasColorInMind === false ? "bg-primary text-white scale-110 rotate-12" : "bg-[#c2f2d9] text-[#2d6a4f]"
        }`}>
          <Sparkles size={22} fill={hasColorInMind === false ? "white" : "currentColor"} />
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-base leading-tight transition-colors ${hasColorInMind === false ? "text-text" : "text-text-soft"}`}>
            No — let the app decide
          </h4>
          <p className="text-text-muted text-xs font-body mt-1">
            Generate a custom palette based on your vibe
          </p>
        </div>
        <ChevronRight size={18} className={hasColorInMind === false ? "text-primary" : "text-gray-400"} />
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Button to="/step4-matching" label="Continue" disabled={!canContinue} />
        </div>
      </div>
    </div>
  );
}