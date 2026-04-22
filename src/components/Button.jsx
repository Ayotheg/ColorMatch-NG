import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Reusable CTA Button
 *
 * Props:
 *  - to       : route to navigate to (uses Link). If omitted, renders a <button>.
 *  - label    : button text (default: "Continue")
 *  - icon     : lucide icon component to render on the right (default: ArrowRight)
 *  - fixed    : if true, positions the button fixed at the bottom of the screen (for Welcome-style usage)
 *  - onClick  : optional click handler (used when `to` is not provided)
 *  - disabled : disables the button
 */
function Button({
  to,
  label = "Continue",
  icon: Icon = ArrowRight,
  fixed = false,
  onClick,
  disabled = false,
}) {
  const baseClass = `group flex items-center justify-center gap-3 bg-primary text-white 
    hover:bg-primary-hover active:scale-95 transition-all duration-300 ease-in-out 
    rounded-full py-4 px-8 font-button font-medium w-full shadow-lg hover:shadow-xl 
    md:text-lg overflow-hidden relative
    ${disabled ? "opacity-50 pointer-events-none" : ""}`;

  const wrapperClass = fixed
    ? "absolute bottom-8 left-0 right-0 px-6 sm:px-10 z-50 pointer-events-auto"
    : "w-full pointer-events-auto";

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {label}
        {Icon && (
          <Icon
            size={20}
            className="stroke-2 group-hover:translate-x-1 transition-transform"
          />
        )}
      </span>
      {/* Hover shimmer overlay */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
    </>
  );

  return (
    <div className={wrapperClass}>
      {to ? (
        <Link to={to} className={baseClass}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} disabled={disabled} className={baseClass}>
          {content}
        </button>
      )}
    </div>
  );
}

export default Button;
