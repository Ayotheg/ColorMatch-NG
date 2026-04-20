import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar"; 

function Layout() {
  return (
    <>
      <NavBar />
      <main className="flex-1 relative pb-24">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;