import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Sparkle, LayoutGrid, Sparkles, Waves } from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

export default function Step5PaintType() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedPaintType = quizState.paintType;

  const paintTypes = [
    {
      id: "Emulsion",
      title: "Emulsion",
      subtitle: "Standard/Matte Finish",
      description: "Perfect for living rooms and bedrooms. Hides walls imperfection beautifully",
      icon: <Waves />,
      color: "text-amber-900",
      bgColor: "bg-white",
    },
    {
      id: "Satin",
      title: "Satin",
      subtitle: "Smooth/Wipeable",
      description: "Durability with a soft glow. Great for kitchens and high traffic corridors",
      icon: <Sparkles />,
      color: "text-emerald-700",
      bgColor: "bg-gray-200",
    },
    {
      id: "Texcoat",
      title: "Texcoat",
      subtitle: "Textured Outdoor",
      description: "Rugged and weather-resistant. Ideal for Nigerian exterior facades",
      icon: <LayoutGrid />,
      color: "text-stone-800",
      bgColor: "bg-white",
    },
    {
      id: "Gloss",
      title: "Gloss",
      subtitle: "Shiny / Bold",
      description: "High-reflectivity finish. Best for wood, metal, and feature details.",
      icon: <Sparkle />,
      color: "text-blue-600",
      bgColor: "bg-gray-200",
    },
  ];

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step4-matching")}
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
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32 overflow-x-hidden">
      <div className="flex-1 animate-in fade-in slide-in-from-left-8 duration-700">
        <h1 className="text-5xl font-heading font-semibold px-1 leading-tight text-text">
          What type of <br /> 
          <span className="text-primary font-title">paint finish</span> do <br /> 
          you want?
        </h1>
        <p className="text-gray-500 text-base py-4 px-2 font-body">
          Choose the texture and sheen that best <br />
          fits your environment and lifestyle
        </p>
      </div>

      <div className="space-y-5 mt-4">
        {paintTypes.map((type, index) => (
          <div 
            key={type.id}
            onClick={() => setAnswer("paintType", type.id)}
            className={`cursor-pointer transition-all duration-500 transform ${type.bgColor} px-6 py-5 leading-6 font-button rounded-[32px] border-2 group relative overflow-hidden ${
              selectedPaintType === type.id 
                ? "border-primary shadow-xl scale-[1.02] -translate-y-1" 
                : "border-transparent hover:border-primary/20 hover:scale-[1.01] shadow-sm hover:shadow-md"
            } animate-in fade-in slide-in-from-bottom-12 duration-700`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/0 via-white/5 to-white/20`} />
            
            <div className="flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedPaintType === type.id ? 'bg-primary text-white scale-110' : 'bg-white shadow-sm ' + type.color}`}>
                  {type.icon}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${selectedPaintType === type.id ? 'bg-primary border-primary rotate-0' : 'border-gray-200 rotate-90'}`}>
                  {selectedPaintType === type.id && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
              </div>
              
              <h1 className="font-bold text-2xl font-title text-text mb-0.5"> 
                {type.title}
              </h1>
              <h2 className={`font-semibold font-heading text-sm uppercase tracking-wider mb-2 ${type.color}`}>{type.subtitle}</h2>
              <p className="font-body text-gray-500 text-[13px] leading-relaxed opacity-90">{type.description}</p>
            </div>

            {/* Selection Indicator bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 ${selectedPaintType === type.id ? 'bg-primary' : 'bg-transparent'}`} />
          </div>
        ))}
      </div>
      
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent pointer-events-none z-50 mt-auto">
        <div className="max-w-2xl mx-auto pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button to="/step6-concerns" label="Continue" disabled={!selectedPaintType} />
        </div>
      </div>
    </div>
  );
}
