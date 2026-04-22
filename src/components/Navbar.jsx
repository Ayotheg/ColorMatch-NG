import "../index.css";

/**
 * Reusable Navbar — purely presentational, driven by props.
 *
 * Props:
 *  - left   : JSX to render on the left side
 *  - center : JSX to render in the center (absolutely positioned)
 *  - right  : JSX to render on the right side
 */
function NavBar({ left, center, right }) {
  return (
    <div className="bg-transparent py-5 px-5 flex items-center justify-between relative pointer-events-auto">
      <div className="flex items-center">{left}</div>

      {center && (
        <div className="absolute left-1/2 -translate-x-1/2">
          {center}
        </div>
      )}

      <div className="flex items-center">{right}</div>
    </div>
  );
}

export default NavBar;