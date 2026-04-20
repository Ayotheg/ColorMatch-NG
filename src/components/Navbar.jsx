import "../index.css";
import { Menu } from "lucide-react";

function NavBar() {
  return (
    <div className="bg-transparent py-5 px-5 flex items-center justify-between pointer-events-auto">
      <h1 className="text-primary font-heading text-lg font-bold tracking-tight">ColorMatchNG</h1>
      <button className="text-text hover:opacity-70 transition-opacity">
        <Menu size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default NavBar;