import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import {ThemeProvider} from "../components/ui/ThemeProvider.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--background)] text-[var(--foreground)]">
        <Navbar />
        <main className="w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
