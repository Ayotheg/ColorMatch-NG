import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Sparkles, ChevronRight, Info } from "lucide-react";
import Button from "../components/Button";
import Data from "../data/map";


import { useQuiz } from "../context/QuizContext";

function Step2WhoIsIt() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedWho = quizState.who;

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step1-room")}
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
          <h1 className="text-4xl font-bold font-title text-text">Who is this <br /><span className="text-primary font-title">room</span> for?</h1>
          <p className="font-body text-base text-gray-500 py-4 leading-relaxed">We'll tailor your paint durability and finish recommendations based on the inhabitants.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          {Data.map((item, index) => (
            <div 
              key={index} 
              className="animate-in fade-in slide-in-from-bottom-10 duration-700" 
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card 
                title={item.title}
                body={item.body}
                img={item.img}
                isSelected={selectedWho === item.title}
                onSelect={() => setAnswer("who", item.title)}
              />
            </div>
          ))}
        </div>

        <div className="bg-surface-alt/50 col-span-2 rounded-3xl p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-border mt-8 animate-in fade-in zoom-in-95 duration-1000 delay-700">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Info size={22} />
          </div>
          <div className="flex-1">
            <p className="text-gray-600 text-xs leading-relaxed font-body">Choosing the right inhabitant helps us calculate the paint durability needed for your specific project.</p>
          </div>
          <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button to="/step3-color-in-mind" label="Continue" disabled={!selectedWho} />
        </div>
      </div>
    </div>
  );
}

function Card({title, body, img, isSelected, onSelect}) {
  return (
    <div 
      onClick={onSelect}
      className={`flex flex-col gap-3 p-4 rounded-[24px] border-2 cursor-pointer transition-all duration-500 transform group h-full ${
        isSelected 
          ? 'border-primary bg-white shadow-xl scale-[1.02] -translate-y-1' 
          : 'border-transparent bg-surface-alt/50 hover:bg-white hover:border-primary/20 hover:shadow-md'
      }`}
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
        <img 
          src={img} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col px-1 flex-1">
        <h3 className={`font-bold text-[15px] leading-tight transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{title}</h3>
        <p className="text-[12px] text-gray-500 mt-1 leading-snug">{body}</p>
      </div>
    </div>
  );
}

export default Step2WhoIsIt;
