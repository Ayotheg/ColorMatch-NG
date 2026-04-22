import { createContext, useContext, useState, useCallback } from "react";

const NavbarContext = createContext(null);

export function NavbarProvider({ children }) {
  const [navbarProps, setNavbarProps] = useState({});

  const setNavbar = useCallback((props) => {
    setNavbarProps(props);
  }, []);

  return (
    <NavbarContext.Provider value={{ navbarProps, setNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
