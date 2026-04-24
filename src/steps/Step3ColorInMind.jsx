import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CircleCheck  } from "lucide-react";

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
      <div className="color-card">
        <h3 className="text-primary font-body font-medium">Yes, I have a favourite <span className="relative left-75 bottom-6" > <CircleCheck /></span> </h3>
      </div>
            <div className="grid grid-cols-2 gap-5 ">
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md  p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="bg-primary w-35 h-25 sm:h-24 md:h-38 rounded-2xl"></div><h4 className="px-1 text-sm">Rich Brown <p className="text-gray-500 font-body pb-5 text-sm">3044</p></h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md  p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="bg-sky-400 w-35 h-25 sm:h-24 md:h-38 rounded-2xl"></div><h4 className="px-1 text-sm">Sky Blue <p className="text-gray-500 font-body pb-5 text-sm">7082</p></h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md  p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="bg-green-500 w-35 h-25 sm:h-24 md:h-38 rounded-2xl"></div><h4 className="px-1 text-sm">Leaf Green <p className="text-gray-500 font-body pb-5 text-sm">6071</p></h4></div>
<div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md  p-2.5 md:p-3 flex flex-col justify-between border border-gray-100 icons-cover"> <div className="bg-rose-300 w-35 h-25 sm:h-24 md:h-38 rounded-2xl"></div><h4 className="px-1 text-sm">Rose <p className="text-gray-500 font-body pb-5 text-sm">1021</p></h4></div>
</div>
      </div>
      
      <Button to="/step4-matching" label="Continue" fixed />
    </div>
  );
}
