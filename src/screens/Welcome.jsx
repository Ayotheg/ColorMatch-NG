import { useEffect, useState } from "react";
import "../index.css";
import Button from "../components/Button";
import { useNavbar } from "../context/NavbarContext";
import { Menu, X, HelpCircle, Sparkles } from "lucide-react";

export default function Welcome() {
  const { setNavbar } = useNavbar();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    setNavbar({
      left: (
        <div className="flex items-center gap-1">
          <span className="font-title font-bold text-primary text-sm tracking-tight">ColorMatch</span>
          <span className="font-title font-bold text-primary text-sm tracking-tight">NG</span>
        </div>
      ),
      right: (
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
          <Menu size={20} className="text-gray-700" />
        </button>
      ),
    });
  }, [setNavbar]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden h-full">
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
        <span className="font-button text-gray-700 text-[10px] md:text-xs bg-[#cbe0ea] rounded-lg py-1.5 px-3 font-bold w-max mb-6 tracking-wide shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
          NIGERIAN CRAFTMANSHIP
        </span>
        
        {/* Header content */}
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-none text-gray-900 drop-shadow-sm font-heading">
            Pure<span className="text-primary font-title"> Tone.</span>
          </h1>
          
          <p className="font-heading text-gray-600 text-base md:text-xl font-medium max-w-xs md:max-w-md mb-8 md:mb-12 leading-relaxed">
            Find your perfect paint color <br className="hidden sm:block" /> in seconds.
          </p>
        </div>

        {/* Color Cards */}
        <div className="flex flex-row items-center gap-8 sm:gap-6 md:gap-20 mb-8 flex-wrap animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg transition-all p-2.5 md:p-3 flex flex-col justify-between transform -rotate-3 hover:rotate-0 hover:-translate-y-2 cursor-pointer border border-gray-100">
            <div className="bg-primary w-full h-30 sm:h-24 md:h-38 rounded-2xl shadow-inner"></div>
            <h4 className="font-button text-[9px] sm:text-[10px] md:text-xs text-center text-gray-500 font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">RICH BROWN</h4>
          </div>
          <div className="ml-auto mt-[-50px]">
            <div className="bg-white w-42 h-42 sm:w-36 sm:h-36 md:w-55 md:h-55 rounded-3xl shadow-md hover:shadow-lg transition-all p-2.5 md:p-3 flex flex-col justify-between mt-8 sm:mt-12 md:mt-16 transform rotate-3 hover:rotate-0 hover:-translate-y-2 cursor-pointer border border-gray-100">
              <div className="bg-[#11412e] w-full h-30 sm:h-24 md:h-38 rounded-2xl shadow-inner"></div>
              <h4 className="font-button text-[9px] sm:text-[10px] md:text-xs text-center text-gray-500 font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">NATIONAL GREEN</h4>
            </div>
          </div>
        </div>
      </div>
      

      {/* Fixed CTA at bottom */}
      <div className="absolute bottom-28 left-0 right-0 flex justify-center z-40 animate-in fade-in duration-1000 delay-700">
        <div 
          onClick={() => setIsHelpOpen(true)}
          className="text-gray-500 text-sm font-bold font-button cursor-pointer hover:text-primary transition-all py-2 px-6 bg-white/40 backdrop-blur-sm rounded-full border border-white/50 shadow-sm flex items-center gap-2 group"
        >
          <HelpCircle size={16} className="text-primary group-hover:scale-110 transition-transform" />
          Need Help?
        </div>
      </div>
      <Button to="/step1-room" label="Match my Color" fixed />

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsHelpOpen(false)} />
          <div className="bg-white rounded-t-[40px] sm:rounded-[40px] w-full max-w-sm p-8 sm:p-10 shadow-2xl relative z-10 animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-light to-secondary" />
            
            <div className="flex justify-between items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles size={24} />
              </div>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-text-muted hover:bg-border transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-3xl font-bold font-title mb-4 text-text leading-tight">Find your vibe in <span className="text-primary">seconds.</span></h2>
            <p className="font-body text-text-muted text-base leading-relaxed mb-8">
              Just answer a few quick questions about your space and preferences. 
              Our AI artist will then curate the perfect Nigerian-tailored paint match for your project!
            </p>

            <div className="space-y-4">
              <div 
                onClick={() => setIsHelpOpen(false)}
                className="w-full py-5 bg-primary text-white rounded-2xl font-bold font-button shadow-lg shadow-primary/30 hover:bg-primary-hover active:scale-[0.98] transition-all text-center cursor-pointer"
              >
                Let's Start!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
