import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// Create context
const ThemeContext = createContext();

// Hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Utility to get system preference
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Main provider
export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("dark");

  // Get initial theme (localStorage or system)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      setTheme(getSystemTheme());
    }
  }, []);

  // Apply theme to <html> tag
  const applyTheme = useCallback(theme => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, []);

  // Watch theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Optional: respond to OS-level changes in real time
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        setTheme(getSystemTheme());
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Optional: sync across tabs
  useEffect(() => {
    const onStorage = e => {
      if (e.key === "theme" && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
