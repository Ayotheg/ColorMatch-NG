import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import { Trees, Armchair, Waves, Car, Sun } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

import "../index.css";

const EXTERIOR_TYPES = [
  { id: "Garden/Yard",        icon: <Trees />,    bgClass: "bg-white",      iconClass: "text-green-700",  iconBg: "icons" },
  { id: "Patio",              icon: <Sun />,      bgClass: "bg-slate-100",  iconClass: "text-orange-700", iconBg: "icons icon" },
  { id: "Pool/Spa",           icon: <Waves />,    bgClass: "bg-slate-100",  iconClass: "text-blue-400",   iconBg: "icons icon-2" },
  { id: "Garage",             icon: <Car />,      bgClass: "bg-white",      iconClass: "text-gray-700",   iconBg: "icons" },
];

export default function Exterior() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { setAnswer, quizState } = useQuiz();

  const selectedType = quizState.exteriorType || "";

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate(-1)}
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

  const handleContinue = () => {
    // Exterior always skips Step2 (Who Is It) — go straight to Step3
    setAnswer("who", ""); // clear any stale answer
    navigate("/step3-color-in-mind");
  };

  const handleSelect = (id) => {
    setAnswer("exteriorType", id);
  };

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
        <h1 className="text-4xl font-bold font-title text-text leading-tight">
          What are you <br />
          <span className="text-primary">painting?</span>
        </h1>
        <p className="text-text-muted text-[15px] font-body leading-relaxed mt-3 max-w-[280px]">
          Pick the exterior space so we can recommend the right weather-resistant finish.
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-4">
        {EXTERIOR_TYPES.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`${item.bgClass} rounded-[32px] shadow-sm border-2 p-5 flex flex-col gap-4 cursor-pointer transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-8 ${
              selectedType === item.id
                ? "border-primary shadow-xl scale-[1.03] -translate-y-1"
                : "border-transparent hover:border-primary/20 hover:scale-[1.01] hover:shadow-md"
            }`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={`${item.iconBg} ${item.iconClass} w-max`}>
              {item.icon}
            </div>
            <h4 className={`font-bold font-title text-base transition-colors ${selectedType === item.id ? "text-text" : "text-text-soft"}`}>
              {item.id}
            </h4>
          </div>
        ))}
      </div>

      {/* Full-width Outdoor Furniture card */}
      <div
        onClick={() => handleSelect("Outdoor Furniture")}
        className={`mt-4 bg-white rounded-[32px] shadow-sm border-2 p-5 flex items-center gap-5 cursor-pointer transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-8 ${
          selectedType === "Outdoor Furniture"
            ? "border-primary shadow-xl scale-[1.02] -translate-y-1"
            : "border-transparent hover:border-primary/20 hover:scale-[1.01] hover:shadow-md"
        }`}
        style={{ animationDelay: "320ms" }}
      >
        <div className="icons-column shrink-0">
          <Armchair className="text-green-700" />
        </div>
        <div>
          <h4 className={`font-bold font-title text-base transition-colors ${selectedType === "Outdoor Furniture" ? "text-text" : "text-text-soft"}`}>
            Outdoor Furniture
          </h4>
          <p className="text-text-muted text-sm font-body mt-0.5">Seating &amp; Decor</p>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto">
          <Button onClick={handleContinue} label="Continue" disabled={!selectedType} />
        </div>
      </div>
    </div>
  );
}