import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CircleCheck, Sparkles, ChevronRight } from "lucide-react";

import "../index.css"
import Button from "../components/Button";

export default function Step3ColorInMind() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();

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

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Do you have a color in mind already?</h1>
      <p className="font-body text-base text-gray-500 py-4">Choose from our signature Nigerian Chart or let our AI artist curate your space</p>
      <div className="flex items-center justify-between mt-6 mb-4">
        <h3 className="text-primary font-body font-semibold">Yes, I have a favorite</h3>
        <CircleCheck className="text-primary w-5 h-5" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-3 border border-gray-100">
          <div className="bg-sky-400 aspect-square rounded-xl w-full"></div>
          <div>
            <h4 className="font-semibold text-sm">Sky Blue</h4>
            <p className="text-gray-400 text-xs">7082</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-3 border border-primary/20 ring-1 ring-primary/10 relative">
          <div className="bg-primary aspect-square rounded-xl w-full"></div>
          <div>
            <h4 className="font-semibold text-sm">Rich Brown</h4>
            <p className="text-gray-400 text-xs">3044</p>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-primary rounded-full p-0.5">
              <CircleCheck className="text-white w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-3 border border-gray-100">
          <div className="bg-rose-300 aspect-square rounded-xl w-full"></div>
          <div>
            <h4 className="font-semibold text-sm">Rose</h4>
            <p className="text-gray-400 text-xs">1021</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-3 border border-gray-100">
          <div className="bg-green-500 aspect-square rounded-xl w-full"></div>
          <div>
            <h4 className="font-semibold text-sm">Leaf Green</h4>
            <p className="text-gray-400 text-xs">6071</p>
          </div>
        </div>
      </div>

      <div className="separator-or">OR</div>

      <div className="bg-[#f8f9fa] rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
        <div className="w-12 h-12 rounded-full bg-[#c2f2d9] flex items-center justify-center text-[#2d6a4f]">
          <Sparkles size={22} fill="currentColor" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 text-sm">No - let the app decide</h4>
          <p className="text-gray-500 text-xs">Generate a custom palette based on your vibe</p>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>

      </div>
      
      <Button to="/step4-matching" label="Continue" fixed />
    </div>
  );
}
