import { useEffect, useState } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Baby, SunDim, Sun, Paintbrush, Check } from "lucide-react";
import Button from "../components/Button";

import { useQuiz } from "../context/QuizContext";

export default function Step6Concerns() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedConcerns = quizState.concerns || [];

  const concerns = [
    { 
      id: "Kids that stain walls", 
      icon: <Baby size={20} />, 
      label: "Kids that stain walls", 
      description: "", 
      color: "bg-[#f9e5e5] text-[#b45454]" 
    },
    { 
      id: "Little light", 
      icon: <SunDim size={20} />, 
      label: "Little light", 
      description: "Light-reflecting", 
      color: "bg-[#e5f9f0] text-[#54b484]" 
    },
    { 
      id: "Very bright room", 
      icon: <Sun size={20} />, 
      label: "Very bright room", 
      description: "", 
      color: "bg-[#f9eee5] text-[#b47a54]" 
    },
    { 
      id: "Need easy-to-clean", 
      icon: <Paintbrush size={20} />, 
      label: "Need easy-to-clean", 
      description: "Low-texture surfaces", 
      color: "bg-[#e5eef9] text-[#547ab4]" 
    },
  ];

  const toggleConcern = (id) => {
    let newConcerns = [...selectedConcerns];
    if (newConcerns.includes(id)) {
      newConcerns = newConcerns.filter(item => item !== id);
    } else {
      newConcerns.push(id);
    }
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
    <div className="flex-1 flex flex-col px-6 pt-4 pb-32 bg-bg relative min-h-screen">

      {/* Title & Description */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-4">
          Any special <br /> concerns?
        </h1>
        <p className="text-text-muted text-[15px] font-body leading-relaxed max-w-[280px]">
          Select all that apply to help us calibrate the perfect finish for your environment.
        </p>
      </div>

      {/* Concerns List */}
      <div className="space-y-4 mb-8">
        {concerns.map((concern) => (
          <div
            key={concern.id}
            onClick={() => toggleConcern(concern.id)}
            className={`w-full flex items-center p-6 rounded-[32px] transition-all duration-300 border-2 text-left relative cursor-pointer ${
              selectedConcerns.includes(concern.id)
                ? "bg-white border-primary shadow-sm"
                : "bg-surface-alt/50 border-transparent"
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-5 ${concern.color}`}>
              {concern.icon}
            </div>
            <div className="flex-1 pr-8">
              <h4 className="font-bold font-title text-lg text-text leading-tight">
                {concern.label}
              </h4>
              {concern.description && (
                <p className="text-[12px] text-text-soft mt-1 leading-tight">{concern.description}</p>
              )}
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedConcerns.includes(concern.id) 
                ? "bg-primary border-primary" 
                : "bg-white border-gray-200"
            }`}>
              {selectedConcerns.includes(concern.id) && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-50">
        <div className="max-w-2xl mx-auto">
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
