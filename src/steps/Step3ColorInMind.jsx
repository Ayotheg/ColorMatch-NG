import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CircleCheck, Sparkles, ChevronRight } from "lucide-react";

import "../index.css"
import Button from "../components/Button";

import { useQuiz } from "../context/QuizContext";

export default function Step3ColorInMind() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedColor = quizState.colorInMind;
  const hasColorInMind = quizState.hasColorInMind;

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step2-who-is-it")}
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
      <div className="flex-1">
        <div className="animate-in fade-in slide-in-from-left-6 duration-700">
          <h1 className="text-3xl font-bold font-title text-text leading-tight">Do you have a <br /><span className="text-primary">color</span> in mind?</h1>
          <p className="font-body text-base text-gray-500 py-4 leading-relaxed">Choose from our signature Nigerian Chart or let our AI artist curate your space</p>
        </div>
        
        <div className="flex items-center justify-between mt-6 mb-4 animate-in fade-in duration-1000 delay-300">
          <h3 className="text-primary font-body font-bold text-sm uppercase tracking-wider">Yes, I have a favorite</h3>
          <CircleCheck className="text-primary w-5 h-5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { id: "Sky Blue", code: "7082", bg: "bg-sky-400" },
            { id: "Rich Brown", code: "3044", bg: "bg-primary" },
            { id: "Rose", code: "1021", bg: "bg-rose-300" },
            { id: "Leaf Green", code: "6071", bg: "bg-green-500" }
          ].map((item, index) => (
            <div 
              key={item.id}
              onClick={() => {
                setAnswer("hasColorInMind", true);
                setAnswer("colorInMind", item.id);
              }}
              className={`bg-white rounded-[32px] shadow-sm p-4 flex flex-col gap-3 border-2 cursor-pointer transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-8 ${
                selectedColor === item.id 
                  ? "border-primary shadow-xl scale-[1.05] -translate-y-1" 
                  : "border-transparent hover:border-primary/20 hover:scale-[1.02]"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${item.bg} aspect-square rounded-2xl w-full shadow-inner`}></div>
              <div className="px-1">
                <h4 className={`font-bold text-sm transition-colors ${selectedColor === item.id ? 'text-text' : 'text-text-soft'}`}>{item.id}</h4>
                <p className="text-text-muted text-[10px] font-bold tracking-widest">{item.code}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="separator-or py-10 animate-in fade-in duration-1000 delay-500">OR</div>

        <div 
          onClick={() => {
            setAnswer("hasColorInMind", false);
            setAnswer("colorInMind", "No preference");
          }}
          className={`rounded-[32px] p-6 flex items-center gap-5 cursor-pointer transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-10 delay-700 ${
            hasColorInMind === false 
              ? "border-2 border-primary bg-white shadow-xl scale-[1.02] -translate-y-1" 
              : "border-2 border-transparent bg-surface-alt/50 hover:bg-white hover:border-primary/20 hover:shadow-md"
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${hasColorInMind === false ? 'bg-primary text-white scale-110 rotate-12' : 'bg-[#c2f2d9] text-[#2d6a4f]'}`}>
            <Sparkles size={24} fill={hasColorInMind === false ? "white" : "currentColor"} />
          </div>
          <div className="flex-1">
            <h4 className={`font-bold text-lg leading-tight transition-colors ${hasColorInMind === false ? 'text-text' : 'text-text-soft'}`}>No - let the app decide</h4>
            <p className="text-text-muted text-xs font-body mt-1">Generate a custom palette based on your vibe</p>
          </div>
          <ChevronRight size={20} className={hasColorInMind === false ? "text-primary" : "text-gray-400"} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
          <Button to="/step4-matching" label="Continue" disabled={hasColorInMind === null} />
        </div>
      </div>
    </div>
  );
}
