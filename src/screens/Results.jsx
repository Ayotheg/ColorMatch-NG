import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, Share, Info, ChevronRight,
  Camera, X, CheckCircle, MapPin, Palette,
  Home, Layers
} from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

// ─── Smart label mapper ───────────────────────────────────────────────────────
// Instead of generic "Trim & doors", map to what Nigerians actually say
function getSmartUseLabel(use, index, paintType) {
  if (!use) return null;

  const u = use.toLowerCase();

  // Ceiling is universal and always relevant
  if (u.includes("ceiling")) return { label: "Ceiling", show: true };

  // For Texcoat (exterior) — relevant labels
  if (paintType === "Texcoat") {
    if (u.includes("gate") || u.includes("fence")) return { label: "Gate / Fence", show: true };
    if (u.includes("accent") || u.includes("border")) return { label: "Border / Accent Band", show: true };
    if (u.includes("second") || u.includes("lower")) return { label: "Lower Band", show: true };
    return { label: null, show: false };
  }

  // For Gloss — relevant since it's used for 2 colors
  if (paintType === "Gloss") {
    if (u.includes("base") || u.includes("lower") || index === 0) return { label: "Lower Half", show: true };
    if (u.includes("upper") || u.includes("top") || index === 1) return { label: "Upper Half", show: true };
    return { label: "Second Color", show: true };
  }

  // For Emulsion/Satin — only show ceiling, accent wall
  if (u.includes("accent") || u.includes("feature")) return { label: "Accent Wall", show: true };
  if (u.includes("ceiling")) return { label: "Ceiling", show: true };

  // Hide everything else — trim, doors etc. not relevant for Nigerian customers
  return { label: null, show: false };
}

// ─── Smart section heading per paint type ────────────────────────────────────
function getPairingsHeading(paintType) {
  switch (paintType) {
    case "Texcoat":  return "Exterior Combinations";
    case "Gloss":    return "Two-Color Combination";
    case "Satin":    return "Ceiling & Accent Pairing";
    default:         return "Ceiling & Wall Pairings";
  }
}

// ─── Context summary line ─────────────────────────────────────────────────────
function getContextSummary(quizState) {
  const parts = [];
  if (quizState.room)      parts.push(quizState.room);
  if (quizState.who)       parts.push(quizState.who);
  if (quizState.paintType) parts.push(quizState.paintType);
  return parts.join(" · ");
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Results() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { quizState, resetQuiz } = useQuiz();
  const [showToast, setShowToast] = useState(false);

  const paintType = quizState.paintType || "Emulsion";

  // ─── Error state ─────────────────────────────────────────────
  if (location.state?.error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-bg px-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <X size={32} />
        </div>
        <h1 className="text-2xl font-bold font-title text-text mb-2">Something went wrong</h1>
        <p className="text-text-muted mb-8 max-w-[280px]">{location.state.error}</p>
        <Button label="Try Again" onClick={() => navigate("/step6-concerns")} />
      </div>
    );
  }

  // ─── Result data ─────────────────────────────────────────────
  const data = location.state?.result || {
    primary: {
      name: "Sky Blue",
      code: "7082",
      hex: "#88C0E0",
      use: "Main walls"
    },
    pairings: [
      { name: "Brilliant White", code: "BW", hex: "#FFFFFF",  use: "Ceiling" },
      { name: "Cream",           code: "3040", hex: "#F5E6C8", use: "Accent wall" },
    ],
    reason: "Sky Blue creates a calm and airy feel — perfect for a Nigerian living room. The Brilliant White ceiling keeps the space bright, while the Cream accent wall adds warmth without being heavy."
  };

  // Filter pairings — only show ones with a relevant Nigerian label
  const smartPairings = data.pairings
    .map((pairing, index) => {
      const smart = getSmartUseLabel(pairing.use, index, paintType);
      return { ...pairing, smartLabel: smart?.label, show: smart?.show };
    })
    .filter((p) => p.show);

  // Always ensure Brilliant White ceiling is first if present
  const ceilingFirst = [
    ...smartPairings.filter((p) => p.smartLabel === "Ceiling"),
    ...smartPairings.filter((p) => p.smartLabel !== "Ceiling"),
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My ColorMatch NG Result",
        text: `My perfect paint color: ${data.primary.name} (${data.primary.code}). Matched with ${data.pairings.map(p => p.name).join(" & ")}.`,
      }).catch(() => {});
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const findStores = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("paint shop building materials near me")}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step6-concerns")}
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
        <button
          onClick={handleShare}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <Share size={18} className="text-gray-700" />
        </button>
      ),
    });
  }, [setNavbar, navigate]);

  const handleStartOver = () => {
    resetQuiz();
    navigate("/");
  };

  return (
    <div className="flex-1 flex flex-col bg-bg px-6 pt-6 pb-40 overflow-x-hidden relative">

      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-white rounded-2xl shadow-2xl py-3 px-6 border border-primary/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle size={18} />
            </div>
            <span className="font-bold font-button text-sm text-text">Screenshot to save!</span>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="mb-6 animate-in fade-in slide-in-from-top-6 duration-700">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-3">
          Here's your <br />
          <span className="text-primary font-title">perfect match</span> 🎨
        </h1>

        {/* Context pill row */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider font-button">
            <Layers size={11} />
            {paintType}
          </span>
          {quizState.room && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-alt text-text-muted text-[10px] font-bold uppercase tracking-wider font-button border border-border">
              <Home size={11} />
              {quizState.room}
            </span>
          )}
          {quizState.who && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-alt text-text-muted text-[10px] font-bold uppercase tracking-wider font-button border border-border">
              {quizState.who}
            </span>
          )}
        </div>
      </div>

      {/* Main Color Card */}
      <div
        className="rounded-[40px] p-8 aspect-[4/5] relative overflow-hidden shadow-2xl mb-6 group transition-all duration-700 hover:scale-[1.02] animate-in fade-in zoom-in-95 duration-1000"
        style={{ backgroundColor: data.primary.hex }}
      >
        {/* Code badge */}
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl">
          <span className="text-[10px] font-bold text-white tracking-widest font-button">
            Code: {data.primary.code}
          </span>
        </div>

        {/* Palette icon top left */}
        <div className="absolute top-8 left-8 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
          <Palette size={18} className="text-white" />
        </div>

        {/* Color name bottom */}
        <div className="absolute bottom-10 left-8 right-8">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-2 font-button">
            Primary Wall Color
          </p>
          <h2 className="text-4xl font-bold font-title text-white leading-tight">
            {data.primary.name}
          </h2>
          <p className="text-white/60 text-sm font-body mt-1">
            {data.primary.hex?.toUpperCase()}
          </p>
        </div>

        {/* Abstract blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
      </div>

      {/* AI Reason Box */}
      <div className="bg-surface-alt/50 p-5 rounded-[28px] border border-border flex gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
          <Info size={14} className="text-white" />
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed font-body">
          {data.reason}
        </p>
      </div>

      {/* Ceiling reminder — always shown, always Brilliant White */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-[28px] border-2 border-dashed border-border mb-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
        <div
          className="w-16 h-16 rounded-2xl shadow-inner border border-black/10 flex-shrink-0"
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <div className="flex-1">
          <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-0.5 font-button">
            Ceiling — Standard
          </p>
          <h4 className="font-bold font-title text-text text-lg">Brilliant White</h4>
          <p className="text-[11px] text-text-soft font-body mt-0.5">
            All Nigerian ceilings use Brilliant White
          </p>
        </div>
        <div className="w-6 h-6 rounded-full bg-[#e5f9f0] flex items-center justify-center flex-shrink-0 mr-1">
          <ChevronRight size={14} className="text-[#54b484]" />
        </div>
      </div>

      {/* Smart Pairings — only shown if there are relevant ones */}
      {ceilingFirst.length > 0 && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <h3 className="font-bold font-title text-lg text-text px-1 mb-4">
            {getPairingsHeading(paintType)}
          </h3>

          <div className="space-y-3">
            {ceilingFirst
              .filter((p) => p.smartLabel !== "Ceiling") // ceiling already shown above
              .map((pairing, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-4 rounded-[28px] border border-border shadow-sm hover:shadow-md transition-all duration-300 group animate-in fade-in slide-in-from-right-8"
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl shadow-inner border border-black/5 flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: pairing.hex }}
                  />
                  <div className="flex-1">
                    {pairing.smartLabel && (
                      <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-0.5 font-button">
                        {pairing.smartLabel}
                      </p>
                    )}
                    <h4 className="font-bold font-title text-text text-lg">{pairing.name}</h4>
                    <p className="text-[11px] text-text-soft font-body">Code: {pairing.code}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-text-soft mr-1">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* What to tell the shop assistant */}
      <div className="bg-primary/5 border border-primary/15 rounded-[28px] p-5 mb-6 animate-in fade-in duration-700 delay-700">
        <p className="text-[11px] font-bold font-button uppercase tracking-widest text-primary mb-3">
          What to tell the shop assistant
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            <p className="text-[13px] font-body text-text-muted leading-relaxed">
              <span className="font-bold text-text">{paintType}</span> paint —{" "}
              <span className="font-bold text-text">{data.primary.name}</span> (Code: {data.primary.code}) for the walls
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
            <p className="text-[13px] font-body text-text-muted leading-relaxed">
              <span className="font-bold text-text">Brilliant White</span> for the ceiling
            </p>
          </div>
          {ceilingFirst
            .filter((p) => p.smartLabel !== "Ceiling")
            .map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-[13px] font-body text-text-muted leading-relaxed">
                  <span className="font-bold text-text">{p.name}</span> (Code: {p.code}){p.smartLabel ? ` — ${p.smartLabel}` : ""}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Screenshot tip */}
      <div className="mb-8 bg-surface-alt/30 py-4 px-6 rounded-2xl border border-dashed border-border flex items-center justify-center gap-3 animate-in fade-in duration-1000 delay-800">
        <Camera size={16} className="text-text-soft" />
        <p className="text-[11px] font-bold text-text-soft font-button">
          Screenshot this page to show the shop assistant
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50 flex flex-col gap-3 mt-auto">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Button
            label="Find Nearest Paint Shop"
            icon={MapPin}
            onClick={findStores}
          />
          <button
            onClick={handleStartOver}
            className="w-full py-4 text-text-muted font-bold font-button hover:text-primary transition-all active:scale-95 text-center text-sm"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}