import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import Button from "../components/Button";

export default function Results() {
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
          <Share2 size={18} className="text-gray-700" />
        </button>
      ),
    });
  }, [setNavbar, navigate]);

  return (
    <div className="flex-1 flex flex-col relative px-6 pt-4 pb-32">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Results</h1>
      </div>
      
      <Button to="/" label="Find a Store" fixed />
    </div>
  );
}
