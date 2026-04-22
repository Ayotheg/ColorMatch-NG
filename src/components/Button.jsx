import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Button() {
    return ( 
        <>          {/* FIXED Call to action at bottom of screen */}
      <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-10 lg:px-20 z-50 pointer-events-auto">
        <Link 
          to="../step1-room" 
          className="group flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all duration-300 ease-in-out rounded-full py-4 px-8 md:px-12 font-button font-medium w-full shadow-lg hover:shadow-xl md:text-lg overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            Match my Color <ArrowRight size={20} className="stroke-2 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
        </Link>
      </div>
</>

     );
}

export default Button;
