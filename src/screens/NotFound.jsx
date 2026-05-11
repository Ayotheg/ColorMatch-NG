import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";

export default function NotFound() {
  const navigate = useNavigate();
  const { setNavbar } = useNavbar();

  useEffect(() => {
    setNavbar({
      left: null,
      center: (
        <div className="flex items-center gap-1">
          <span className="font-title font-bold text-primary text-sm tracking-tight">ColorMatch</span>
          <span className="font-title font-bold text-primary text-sm tracking-tight">NG</span>
        </div>
      ),
      right: null,
    });
  }, [setNavbar]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg px-6 relative overflow-hidden min-h-[80vh]">

      {/* Background blobs — matches Welcome screen style */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Paint splash illustration */}
      <div className="relative mb-8 animate-in fade-in zoom-in-75 duration-700">
        {/* Big paint swatch */}
        <div className="w-36 h-36 rounded-[40px] bg-primary/10 flex items-center justify-center relative shadow-inner">
          {/* Inner swatch */}
          <div className="w-20 h-20 rounded-[24px] bg-primary/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-[14px] bg-primary/40" />
          </div>

          {/* Floating mini swatches */}
          <div
            className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl shadow-md animate-bounce"
            style={{ backgroundColor: "#88C0E0", animationDuration: "2s" }}
          />
          <div
            className="absolute -bottom-2 -left-4 w-8 h-8 rounded-xl shadow-md animate-bounce"
            style={{ backgroundColor: "#90C880", animationDuration: "2.4s", animationDelay: "0.3s" }}
          />
          <div
            className="absolute top-2 -left-5 w-6 h-6 rounded-lg shadow-md animate-bounce"
            style={{ backgroundColor: "#F5E6C8", animationDuration: "1.8s", animationDelay: "0.6s" }}
          />
        </div>

        {/* 404 badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white font-title font-bold text-xs px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          404 — Page Not Found
        </div>
      </div>

      {/* Text */}
      <div className="text-center mt-8 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        <h1 className="text-4xl font-bold font-title text-text leading-tight mb-3">
          Wrong wall,<br />
          <span className="text-primary font-title">wrong color.</span>
        </h1>
        <p className="text-text-muted font-body text-[15px] leading-relaxed max-w-[260px] mx-auto">
          This page doesn't exist. Let's get you back to finding your perfect Nigerian paint match.
        </p>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 px-6 bg-primary text-white font-bold font-button rounded-[999px] shadow-lg hover:bg-primary-hover active:scale-95 transition-all duration-200 text-[15px]"
        >
          Go to Home →
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 px-6 bg-surface-alt text-text-muted font-bold font-button rounded-[999px] border border-border hover:text-primary hover:border-primary/30 active:scale-95 transition-all duration-200 text-[15px]"
        >
          Go Back
        </button>
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-8 text-[11px] font-body text-text-soft text-center">
        If you refreshed the page mid-quiz, start fresh from Home.
      </p>
    </div>
  );
}