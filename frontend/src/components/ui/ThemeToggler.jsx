import React from "react";
import {Sun, Moon} from "lucide-react";
import {useTheme} from "./ThemeProvider";
import Button from "../ui/Button"; // Replace with your actual button component

const ThemeToggle = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="flex items-center gap-2"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      icon={
        theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )
      }
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};

export default ThemeToggle;
