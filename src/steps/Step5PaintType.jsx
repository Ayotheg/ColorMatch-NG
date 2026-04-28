import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Circle, Sparkle, LayoutGrid, Sparkles, Waves } from "lucide-react";
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
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-5xl font-heading font-semibold px-1 leading-tight">
          What type of <br /> 
          <span className="text-primary font-title">paint finish</span> do <br /> 
          you want?
        </h1>
        <p className="text-gray-500 text-base py-4 px-2">
          Choose the texture and sheen that best <br />
          fits your environment and lifestyle
        </p>
      </div>

      <div className="space-y-6 mt-4">
        {paintTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => setAnswer("paintType", type.id)}
            className={`cursor-pointer transition-all ${type.bgColor} px-5 py-4 leading-6 font-button rounded-[32px] border-2 ${selectedPaintType === type.id ? "border-primary shadow-md" : "border-transparent"}`}
          >
            <div className="flex flex-col relative">
              <span className={`absolute right-0 top-1 ${selectedPaintType === type.id ? "text-primary" : "text-gray-300"}`}>
                <Circle fill={selectedPaintType === type.id ? "currentColor" : "none"} />
              </span>
              <h1 className="font-bold mb-1 text-xl flex gap-2 items-center"> 
                <span className={type.color}>{type.icon}</span>
                {type.title}
              </h1>
              <h2 className={`font-medium font-heading ${type.color}`}>{type.subtitle}</h2>
              <p className="font-body text-gray-500 text-sm mt-1">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button to="/step6-concerns" label="Continue" fixed disabled={!selectedPaintType} />
    </div>
  );
}
