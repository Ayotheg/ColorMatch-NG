import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, BedDouble, Sofa, CookingPot, Bath, Building2, Trees } from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

export default function Step1Room() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedRoom = quizState.room;

  const rooms = [
    { id: "Bedroom", label: "Bedroom", icon: <BedDouble />, color: "text-amber-950", bgColor: "bg-white" },
    { id: "Living Room", label: "Living Room", icon: <Sofa />, color: "text-green-800", bgColor: "bg-slate-50" },
    { id: "Kitchen", label: "Kitchen", icon: <CookingPot />, color: "text-blue-600", bgColor: "bg-slate-50" },
    { id: "Bathroom", label: "Bathroom", icon: <Bath />, color: "text-amber-950", bgColor: "bg-white" },
    { id: "Office/ School", label: "Office/ School", icon: <Building2 />, color: "text-gray-700", bgColor: "bg-white", fullWidth: true, subtitle: "Professional Workspaces" },
    { id: "Exterior", label: "Exterior", icon: <Trees />, color: "text-white", bgColor: "bg-white", fullWidth: true, subtitle: "Outdoor Spaces", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop" },
  ];

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/")}
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
    if (selectedRoom === "Bedroom" || selectedRoom === "Living Room") {
      navigate("/step2-who-is-it");
    } else {
      // Clear Step 2 answer if skipping
      setAnswer("who", ""); 
      navigate("/step3-color-in-mind");
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-32 bg-bg relative overflow-x-hidden">
      {/* Title & Description */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-6 duration-700">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-4">
          Which <span className="text-primary font-title">room</span> are <br /> we painting?
        </h1>
        <p className="text-text-muted text-[15px] font-body leading-relaxed max-w-[280px]">
          Every space has its own vibe. Tell us where the magic is happening.
        </p>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {rooms.map((r, index) => (
          <div
            key={r.id}
            onClick={() => setAnswer("room", r.id)}
            className={`cursor-pointer transition-all duration-500 transform rounded-[32px] border-2 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-12 duration-700 ${
              r.fullWidth ? "col-span-2 py-5 px-6 h-36" : "p-5 min-h-[160px]"
            } ${
              selectedRoom === r.id
                ? "border-primary shadow-xl scale-[1.02] -translate-y-1 bg-white"
                : "border-transparent hover:border-primary/20 hover:scale-[1.01] shadow-sm hover:shadow-md " + r.bgColor
            }`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              backgroundImage: r.image ? `url(${r.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay for image rooms */}
            {r.image && <div className={`absolute inset-0 transition-opacity duration-500 ${selectedRoom === r.id ? 'bg-black/40' : 'bg-black/30 group-hover:bg-black/20'}`} />}

            <div className="flex flex-col justify-between h-full relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${r.image ? 'text-white' : (selectedRoom === r.id ? 'bg-primary text-white scale-110' : 'bg-white shadow-sm ' + r.color)}`}>
                {r.icon}
              </div>
              
              <div className="mt-3">
                <h4 className={`font-bold font-title text-base transition-colors ${r.image ? 'text-white' : (selectedRoom === r.id ? 'text-text' : 'text-text-muted')}`}>
                  {r.label}
                </h4>
                {r.subtitle && (
                  <p className={`text-[11px] mt-0.5 ${r.image ? 'text-white/80' : 'text-text-soft'}`}>
                    {r.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Active Indicator */}
            {selectedRoom === r.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-300">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button onClick={handleContinue} label="Continue" disabled={!selectedRoom} />
        </div>
      </div>

    </div>
  );
}