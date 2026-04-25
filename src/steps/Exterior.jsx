import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import { Trees } from "lucide-react";
import { Armchair } from "lucide-react";
import { Waves } from "lucide-react";
import { Car } from "lucide-react";
import { Sun } from "lucide-react";

import "../index.css";

export default function Exterior() {
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
      
     <div className="grid grid-cols-2 gap-5 ">
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons text-green-700"><Trees /> </div><h4>Garden/Yard</h4></div>
<div className="bg-slate-100 w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons icon text-orange-700"><Sun /> </div><h4>Patio</h4></div>
<div className="bg-slate-100 w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons icon-2 text-blue-400"><Waves /> </div><h4>Pool/Spa</h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="icons text-gray-700"><Car /> </div><h4>Garage</h4></div>
<div className="bg-white w-87 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover-column"> <div className="icons-column"><Armchair /> </div><span className="mt-[-18px] ps-16 group"><h4>Outdoor Furniture</h4><p>Seating & Decor</p></span></div>



     </div>
      <Button to="/step2-who-is-it" label="Continue" fixed />
    </div>
  );
}
