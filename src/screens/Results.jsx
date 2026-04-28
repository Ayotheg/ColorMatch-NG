import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share, Info, CheckCircle2, ChevronRight, Camera, X, CheckCircle, MapPin } from "lucide-react";
import Button from "../components/Button";

import { useQuiz } from "../context/QuizContext";

export default function Results() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, resetQuiz } = useQuiz();
  const [showToast, setShowToast] = useState(false);

  const dummyData = {
    primary: {
      name: "Sky Blue",
      code: "7003",
      hex: "#87CEEB",
      use: "Main walls"
    },
    pairings: [
      { name: "Off-White", code: "4946", hex: "#F5F0E8", use: "Ceiling" },
      { name: "Cream", code: "3040", hex: "#F5EDDA", use: "Trim & doors" }
    ],
    reason: `Sky Blue creates a calm and airy feel, perfect for your ${quizState.room || 'living room'}. The Off-White ceiling keeps it bright and the Cream trim adds a warm Nigerian home feel.`
  };

  const handleShare = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const findStores = () => {
    const query = "paint shops near me building materials";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
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
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-white rounded-2xl shadow-2xl py-3 px-6 border border-primary/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle size={18} />
            </div>
            <span className="font-bold font-button text-sm text-text">Results Shared!</span>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-3">
          Here's your <br /> <span className="text-primary font-title">perfect match</span> 🎨
        </h1>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#e5f9f0] text-[#54b484] text-[10px] font-bold uppercase tracking-wider font-button shadow-sm">
          Recommended: {quizState.paintType || "Satin"}
        </span>
      </div>

      {/* Main Color Card */}
      <div 
        className="rounded-[40px] p-8 aspect-[4/5] relative overflow-hidden shadow-2xl mb-6 group transition-all duration-700 hover:scale-[1.02] animate-in fade-in zoom-in-95 duration-1000"
        style={{ backgroundColor: dummyData.primary.hex }}
      >
        <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
          <span className="text-[10px] font-bold text-white tracking-widest">SKY-{dummyData.primary.code}</span>
        </div>
        <div className="absolute bottom-10 left-8 right-8">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1 font-button opacity-80">{dummyData.primary.use}</p>
          <h2 className="text-4xl font-bold font-title text-white leading-tight">
            {dummyData.primary.name} — <br /> {dummyData.primary.code}
          </h2>
        </div>
        {/* Abstract patterns */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
      </div>

      {/* Info Box */}
      <div className="bg-surface-alt/50 p-6 rounded-[32px] border border-border flex gap-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1">
          <Info size={14} className="text-white" />
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed font-body italic">
          "{dummyData.reason}"
        </p>
      </div>

      {/* Suggested Pairings */}
      <div className="space-y-6 mb-8">
        <h3 className="font-bold font-title text-xl text-text px-1">Suggested Pairings</h3>
        
        <div className="space-y-4">
          {dummyData.pairings.map((pairing, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 bg-white p-4 rounded-[32px] border border-border shadow-sm hover:shadow-md transition-all duration-300 group animate-in fade-in slide-in-from-right-8"
              style={{ animationDelay: `${500 + index * 200}ms` }}
            >
              <div 
                className="w-20 h-20 rounded-2xl shadow-inner border border-black/5 transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundColor: pairing.hex }}
              />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-text-soft uppercase tracking-widest mb-1 font-button">{pairing.use}</p>
                <h4 className="font-bold font-title text-text text-lg">{pairing.name}</h4>
                <p className="text-xs text-text-soft">Code: {pairing.code}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-text-soft mr-2">
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip Footer */}
      <div className="mt-4 mb-8 bg-surface-alt/30 py-4 px-6 rounded-2xl border border-dashed border-border flex items-center justify-center gap-3 animate-in fade-in duration-1000 delay-1000">
        <Camera size={16} className="text-text-soft" />
        <p className="text-[11px] font-bold text-text-soft font-button">
          Pro tip: Screenshot to save for the shop assistant
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50 flex flex-col gap-3 mt-auto">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Button 
            label="Find Nearest Store" 
            icon={MapPin}
            onClick={findStores} 
          />
          <button 
            onClick={handleStartOver}
            className="w-full py-4 text-text-muted font-bold font-button hover:text-primary transition-all active:scale-95 text-center"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
