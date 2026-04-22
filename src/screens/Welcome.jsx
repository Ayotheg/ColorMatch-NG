import "../index.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Welcome() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden h-[calc(100vh-100px)]">
      {/* Background Elements */}
      <div className="bg-gradient-blob"></div>
      
      <div className="pillars-container opacity-60 md:opacity-100">
        <div className="pillar pillar-left"></div>
        <div className="pillar pillar-middle"></div>
        <div className="pillar pillar-right"></div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col z-10 px-6 sm:px-10 lg:px-20 pt-8 pb-32 relative w-full h-full justify-start overflow-y-auto">
        
        {/* Badge */}
        <span className="font-button text-gray-700 text-[10px] md:text-xs bg-[#cbe0ea] rounded-lg py-1.5 px-3 font-bold w-max mb-6 tracking-wide shadow-sm">
          NIGERIAN CRAFTMANSHIP
        </span>
        
        {/* Header content */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-none text-gray-900 drop-shadow-sm">
          Pure<span className="text-primary font-title"> Tone.</span>
        </h1>
        
        <p className="font-heading text-gray-600 text-base md:text-xl font-medium max-w-xs md:max-w-md mb-8 md:mb-12 leading-relaxed">
          Find your perfect paint color <br className="hidden sm:block" /> in seconds.
        </p>

        {/* Color Cards */}
        <div className="flex flex-row items-center gap-8 sm:gap-6 md:gap-20 mb-8 flex-wrap">
          <div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg transition-all p-2.5 md:p-3 flex flex-col justify-between transform -rotate-3 hover:rotate-0 hover:-translate-y-2 cursor-pointer border border-gray-100">
            <div className="bg-primary w-full h-30 sm:h-24 md:h-38 rounded-2xl shadow-inner"></div>
            <h4 className="font-button text-[9px] sm:text-[10px] md:text-xs text-center text-gray-500 font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">CLAY EARTH</h4>
          </div>
          <div className="ml-auto mt-[-50px]">
            <div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg transition-all p-2.5 md:p-3 flex flex-col justify-between mt-8 sm:mt-12 md:mt-16 transform rotate-3 hover:rotate-0 hover:-translate-y-2 cursor-pointer border border-gray-100">
              <div className="bg-[#4d6a5f] w-full h-30 sm:h-24 md:h-38 rounded-2xl shadow-inner"></div>
              <h4 className="font-button text-[9px] sm:text-[10px] md:text-xs text-center text-gray-500 font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">SAVANNAH GREEN</h4>
            </div>
              </div>
        </div>
      </div>
      

    
    </div>
  );
}
