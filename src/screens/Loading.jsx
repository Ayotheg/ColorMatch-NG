import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "../context/NavbarContext";

export default function Loading() {
  const navigate = useNavigate();
  const { setNavbar } = useNavbar();

  useEffect(() => {
    // Hide navbar elements during loading
    setNavbar({ left: null, center: null, right: null });

    const timer = setTimeout(() => {
      navigate("/results");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, setNavbar]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg relative overflow-hidden">
      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold font-title text-text">AI is Thinking...</h1>
          <p className="text-text-muted font-body text-sm max-w-[240px]">
            We're analyzing your preferences to find your perfect Nigerian paint match.
          </p>
        </div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
