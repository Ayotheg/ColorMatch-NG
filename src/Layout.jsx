import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar"; 
import ProgressBar from "./components/ProgressBar";
import Button from "./components/Button";

function Layout() {
  return (
    <>
      <NavBar />
      <main className="flex-1 relative pb-24">
        <ProgressBar />
        <Button />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;