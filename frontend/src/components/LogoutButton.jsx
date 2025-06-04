import React from "react";
import {useAuthStore} from "../stores/useAuthStore";
import {ThemeProvider} from "./ui/ThemeProvider.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import {LogOut} from "lucide-react";

const LogoutButton = ({children}) => {
  const {logout} = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  return (
    // <button className="btn btn-primary" onClick={onLogout}>
    // <button className="" onClick={onLogout}>
    //   {children}
    // </button>
    <ThemeProvider>
      <button
        className="w-full flex items-center gap-2 text-sm text-[var(--foreground)] hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-all px-4 pt-2 pb-3 rounded-md  -mb-2"
        type="button"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </ThemeProvider>
  );
};

export default LogoutButton;
