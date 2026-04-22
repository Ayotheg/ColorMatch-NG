import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";
import { useNavbar } from "./context/NavbarContext";


function Layout() {
  const { navbarProps } = useNavbar();

  return (
    <>
      <NavBar {...navbarProps} />


      <main className="flex-1 relative pb-24">
        <ProgressBar />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;