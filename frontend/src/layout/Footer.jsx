import React from "react";
import {Heart} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--muted-foreground)] text-sm">
            &copy; {currentYear} CodeVue. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-[var(--muted-foreground)] text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by
              &nbsp;<span className="text-[var(--primary)]"> Mohd Ujaid</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
