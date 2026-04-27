import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Blinds } from "lucide-react";
import Button from "../components/Button";

export default function Step5PaintType() {
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
        <h1 className="text-4xl font-bold font-body">Do you have <br /> <span className="text-primary">something</span> to <br />match?</h1>
      <p className="text-gray-500 pt-2">Select any element in your space that we should harmonize with</p>
      </div>
      

      <div className="choice-card py-8 grid grid-cols-2">
        <div className="card block bg-gray-200 py-5 px-5 w-40 h-22 rounded-sm leading-8"> <span className="text-primary"><Blinds /></span>  Curtain</div>
        <div className="card block bg-gray-200 py-5 px-5 w-40 h-22 rounded-sm leading-8"> <span className="text-primary"><Blinds /></span>  Curtain</div>
        <div className="card block bg-gray-200 py-5 px-5 w-40 h-22 rounded-sm leading-8"> <span className="text-primary"><Blinds /></span>  Curtain</div>
        <div className="card block bg-gray-200 py-5 px-5 w-40 h-22 rounded-sm leading-8"> <span className="text-primary"><Blinds /></span>  Curtain</div>
        <div className="card block bg-gray-200 py-5 px-5 w-40 h-22 rounded-sm leading-8"> <span className="text-primary"><Blinds /></span>  Curtain</div>
      </div>
      <Button to="/step6-concerns" label="Continue" fixed />
    </div>
  );
}
