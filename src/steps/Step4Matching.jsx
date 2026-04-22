import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share } from "lucide-react";
import Button from "../components/Button";

export default function Step4Matching() {
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
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
          <Share size={18} className="text-gray-700" />
        </button>
      ),
    });
  }, [setNavbar, navigate]);

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Step 4: Matching</h1>
      </div>
      
      <Button to="/step5-paint-type" label="Continue" fixed />
    </div>
  );
}
