import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Safe localStorage access with try-catch
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const stored = localStorage.getItem("rymdix-theme");
        if (stored === "dark" || stored === "light") {
          return stored as Theme;
        }
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
    }
    return "dark";
  });

  useEffect(() => {
    // Safe DOM and localStorage access
    try {
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
      }
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("rymdix-theme", theme);
      }
    } catch (error) {
      console.warn("Failed to update theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
