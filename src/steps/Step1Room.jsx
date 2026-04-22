import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import {BedDouble } from "lucide-react";
import {Sofa} from "lucide-react";
import {CookingPot} from "lucide-react";
import {Bath } from "lucide-react";

import "../index.css";

export default function Step1Room() {
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
        <h1 className="text-2xl font-bold font-title text-4xl">What are you <br /> <span className="text-primary gap-3 ">painting?</span></h1>
      </div>
      
     <div class="grid grid-cols-2 gap-1">
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons"><BedDouble /> </div><h4>Bedroom</h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons"><Sofa /> </div><h4>Living Room</h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons"><CookingPot /> </div><h4>Kitchen</h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons"><Bath /> </div><h4>Bathroom</h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover-column"> <div className="icons-column"><BedDouble /> </div><h4>Office/ School</h4><p>Professional Workspaces</p></div>



     </div>
      <Button to="/step2-who-is-it" label="Continue" fixed />
    </div>
  );
}
