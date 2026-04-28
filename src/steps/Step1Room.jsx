import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import {BedDouble } from "lucide-react";
import {Sofa} from "lucide-react";
import {CookingPot} from "lucide-react";
import {Bath } from "lucide-react";
import {Building2 } from "lucide-react";
import {Trees } from "lucide-react";

import "../index.css";

import { useQuiz } from "../context/QuizContext";

export default function Step1Room() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();

  const selectedRoom = quizState.room;

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

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-2xl font-bold font-title text-4xl">What are you <br /> <span className="text-primary gap-3 ">painting?</span></h1>
      </div>
      
      <div className="grid grid-cols-2 gap-5">
        <div 
          onClick={() => setAnswer("room", "Bedroom")}
          className={`cursor-pointer transition-all bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Bedroom" ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} icons-cover`}
        > 
          <div className="icons text-amber-950"><BedDouble /> </div>
          <h4>Bedroom</h4>
        </div>

        <div 
          onClick={() => setAnswer("room", "Living Room")}
          className={`cursor-pointer transition-all bg-slate-100 w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Living Room" ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} icons-cover`}
        > 
          <div className="icons icon text-green-800"><Sofa /> </div>
          <h4>Living Room</h4>
        </div>

        <div 
          onClick={() => setAnswer("room", "Kitchen")}
          className={`cursor-pointer transition-all bg-slate-100 w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Kitchen" ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} icons-cover`}
        > 
          <div className="icons icon-2 text-blue-600"><CookingPot /> </div>
          <h4>Kitchen</h4>
        </div>

        <div 
          onClick={() => setAnswer("room", "Bathroom")}
          className={`cursor-pointer transition-all bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Bathroom" ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} icons-cover`}
        > 
          <div className="icons text-amber-950"><Bath /> </div>
          <h4>Bathroom</h4>
        </div>

        <div 
          onClick={() => setAnswer("room", "Office/ School")}
          className={`cursor-pointer transition-all col-span-2 bg-white w-full h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Office/ School" ? "border-primary ring-2 ring-primary/20" : "border-gray-100"} icons-cover-column`}
        > 
          <div className="icons-column"><Building2 /> </div>
          <span className="mt-[-18px] ps-16 group">
            <h4>Office/ School</h4>
            <p>Professional Workspaces</p>
          </span>
        </div>

        <div 
          onClick={() => setAnswer("room", "Exterior")}
          className={`cursor-pointer transition-all col-span-2 h-42 sm:h-36 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border ${selectedRoom === "Exterior" ? "border-white ring-4 ring-primary" : "border-gray-100"} icons-cover-column relative overflow-hidden`} 
          style={{backgroundImage: 'url(https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}
        > 
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 top-13">
            <span className="text-white">
              <h4>Exterior</h4>
              <p>Outdoor Spaces</p>
            </span>
          </div>
        </div>
      </div>
      <Button to="/step2-who-is-it" label="Continue" fixed disabled={!selectedRoom} />
    </div>
  );
}
