import { useEffect, useState, useRef } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Blinds, Grid2x2, Armchair, BrickWall, Ban, Pipette, Check, RotateCcw } from "lucide-react";
import Button from "../components/Button";
import { useQuiz } from "../context/QuizContext";

export default function Step4Matching() {
  const { setNavbar } = useNavbar();
  const navigate = useNavigate();
  const { quizState, setAnswer } = useQuiz();
  
  const selectedMatching = quizState.matching || [];
  const selectedColor = quizState.matchingColor || "#d1b390";
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [tempColor, setTempColor] = useState("#b24a03");
  const [handlePos, setHandlePos] = useState({ x: 75, y: 25 }); // Percentage relative to center (50, 50)
  
  const wheelRef = useRef(null);

  // Options for matching
  const selectionTypes = [
    { id: "Curtains", icon: <Blinds size={22} />, label: "Curtains" },
    { id: "Tiles", icon: <Grid2x2 size={22} />, label: "Tiles" },
    { id: "Furniture", icon: <Armchair size={22} />, label: "Furniture" },
    { id: "Wallpaper", icon: <BrickWall size={22} />, label: "Wallpaper" },
  ];

  const toggleSelection = (id) => {
    if (id === "Nothing") {
      setAnswer("matching", ["Nothing"]);
      setAnswer("matchingColor", "");
      return;
    }

    let newMatching = selectedMatching.filter(item => item !== "Nothing");
    if (newMatching.includes(id)) {
      newMatching = newMatching.filter(item => item !== id);
    } else {
      newMatching.push(id);
    }

    if (newMatching.length === 0) {
      setAnswer("matching", ["Nothing"]);
      setAnswer("matchingColor", "");
    } else {
      setAnswer("matching", newMatching);
      if (!quizState.matchingColor) {
        setAnswer("matchingColor", "#d1b390");
      }
    }
  };

  const handleWheelInteraction = (e) => {
    if (!wheelRef.current) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const dx = x - centerX;
    const dy = y - centerY;
    
    const angle = Math.atan2(dy, dx);
    const radius = Math.min(centerX, centerY) * 0.8; // 80% of radius
    
    // Calculate hue (conic-gradient starts at 12 o'clock = -90deg)
    const hue = (angle * 180 / Math.PI + 90 + 360) % 360;
    setTempColor(`hsl(${hue}, 100%, 50%)`);
    
    // Update handle position
    const hX = 50 + (Math.cos(angle) * radius / centerX * 50);
    const hY = 50 + (Math.sin(angle) * radius / centerY * 50);
    setHandlePos({ x: hX, y: hY });
  };

  useEffect(() => {
    if (!isColorPickerOpen) return;

    const handleMove = (e) => {
      if (e.buttons > 0 || e.touches) {
        handleWheelInteraction(e);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [isColorPickerOpen]);

  // Sample colors for the grid
  const colorOptions = [
    "#e5d3c0", "#d1b390", "#f5f5dc", "#bdbdbd",
    "#8b4513", "#deb887", "#fff8dc"
  ];

  useEffect(() => {
    setNavbar({
      left: (
        <button
          onClick={() => navigate("/step3-color-in-mind")}
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

  const hasSelection = selectedMatching.length > 0 && !selectedMatching.includes("Nothing");

  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-32 bg-bg relative">
      {/* Title & Description */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-title text-text leading-[1.1]">
          Do you have <br /> 
          <span className="text-primary">something</span> to <br />
          match?
        </h1>
        <p className="text-text-muted mt-3 text-[15px] font-body leading-relaxed">
          Select any elements in your space that we <br /> should harmonize with.
        </p>
      </div>

      {/* Grid of Selection Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {selectionTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => toggleSelection(type.id)}
            className={`flex flex-col items-start p-5 rounded-2xl transition-all duration-300 border-2 h-28 justify-between relative group cursor-pointer ${
              selectedMatching.includes(type.id)
                ? "bg-white border-primary shadow-sm"
                : "bg-surface-alt border-transparent hover:bg-white/50"
            }`}
          >
            <span className={`${selectedMatching.includes(type.id) ? "text-primary" : "text-primary/60"}`}>
              {type.icon}
            </span>
            <span className={`font-bold font-title text-base ${selectedMatching.includes(type.id) ? "text-text" : "text-text-muted"}`}>
              {type.label}
            </span>
            {selectedMatching.includes(type.id) && (
              <div className="absolute top-4 right-4">
                <Check size={16} className="text-primary" strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nothing to Match Option */}
      <div
        onClick={() => toggleSelection("Nothing")}
        className={`flex items-center gap-3 p-5 rounded-2xl transition-all duration-300 border-2 mb-8 cursor-pointer ${
          selectedMatching.includes("Nothing")
            ? "bg-white border-primary shadow-sm"
            : "bg-surface-alt border-transparent hover:bg-white/50"
        }`}
      >
        <Ban size={20} className={selectedMatching.includes("Nothing") ? "text-primary" : "text-text-muted"} />
        <span className={`font-bold font-title text-base ${selectedMatching.includes("Nothing") ? "text-text" : "text-text-muted"}`}>
          Nothing to match
        </span>
      </div>

      {/* Approximate Color Section */}
      {hasSelection && (
        <div className="bg-surface-alt/60 p-6 rounded-[32px] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="font-bold font-title text-text text-base mb-5">
            Approximate Color
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {colorOptions.map((color) => (
              <div
                key={color}
                onClick={() => setAnswer("matchingColor", color)}
                className={`w-full aspect-square rounded-2xl transition-all duration-200 p-1.5 cursor-pointer ${
                  selectedColor === color ? "ring-2 ring-primary ring-offset-2 bg-white" : "hover:bg-white/40"
                }`}
              >
                <div 
                  className="w-full h-full rounded-xl shadow-sm border border-black/5"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
            
            {/* Custom Color (if selected via wheel and not in default options) */}
            {selectedColor && !colorOptions.includes(selectedColor) && (
              <div
                onClick={() => setIsColorPickerOpen(true)}
                className="w-full aspect-square rounded-2xl transition-all duration-200 p-1.5 cursor-pointer ring-2 ring-primary ring-offset-2 bg-white"
              >
                <div 
                  className="w-full h-full rounded-xl shadow-sm border border-black/5 flex items-center justify-center relative"
                  style={{ backgroundColor: selectedColor }}
                >
                  <Pipette size={14} className="text-white drop-shadow-md" />
                </div>
              </div>
            )}

            {/* Eyedropper Tool (if no custom color or we want to show it always) */}
            {(!selectedColor || colorOptions.includes(selectedColor)) && (
              <div
                onClick={() => setIsColorPickerOpen(true)}
                className="w-full aspect-square rounded-2xl bg-white/40 border border-border flex items-center justify-center hover:bg-white transition-all duration-200 text-text-muted hover:text-primary active:scale-95 shadow-sm cursor-pointer"
              >
                <Pipette size={22} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Bar with Refresh & Continue */}
      <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg via-bg to-transparent pointer-events-none z-50 mt-auto">
        <div className="max-w-2xl mx-auto flex items-center gap-4 pointer-events-auto">
          <div 
            className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center text-text-muted hover:text-primary transition-all duration-300 shadow-sm active:rotate-180 hover:shadow-md cursor-pointer"
            onClick={() => {
              setAnswer("matching", []);
              setAnswer("matchingColor", "");
            }}
          >
            <RotateCcw size={22} />
          </div>
          <div className="flex-1">
            <Button to="/step5-paint-type" label="Continue" disabled={selectedMatching.length === 0} />
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      {isColorPickerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsColorPickerOpen(false)} />
          <div className="bg-white rounded-[32px] sm:rounded-[40px] w-full max-w-sm p-8 sm:p-10 shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold font-title mb-6 sm:mb-8 text-center text-text">Select Color</h2>
            
            <div className="relative aspect-square mb-8 sm:mb-10 rounded-full p-2 bg-white shadow-xl">
               <div 
                 ref={wheelRef}
                 onMouseDown={handleWheelInteraction}
                 onTouchStart={handleWheelInteraction}
                 className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] relative cursor-crosshair"
               >
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
                  {/* Selector handle */}
                  <div 
                    className="absolute w-8 h-8 rounded-full bg-white border-4 shadow-lg ring-4 ring-black/5 pointer-events-none -translate-x-1/2 -translate-y-1/2" 
                    style={{ 
                      left: `${handlePos.x}%`, 
                      top: `${handlePos.y}%`,
                      borderColor: tempColor
                    }}
                  />
               </div>
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => {
                  setAnswer("matchingColor", tempColor);
                  setIsColorPickerOpen(false);
                }}
                className="w-full py-4 sm:py-5 bg-primary text-white rounded-2xl font-bold font-button shadow-lg shadow-primary/30 hover:bg-primary-hover active:scale-[0.98] transition-all text-center cursor-pointer"
                style={{ backgroundColor: tempColor }}
              >
                Apply Color
              </div>
              <div 
                onClick={() => setIsColorPickerOpen(false)}
                className="w-full py-4 sm:py-5 bg-surface-alt text-text-muted rounded-2xl font-bold font-button hover:bg-border transition-all text-center cursor-pointer"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
