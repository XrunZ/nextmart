"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "nextmart_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine initial theme from localStorage or system preference
    let initialTheme: Theme = "light";
    try {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        initialTheme = savedTheme;
      } else if (
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        initialTheme = "dark";
      }
    } catch (e) {
      console.error("Failed to read theme preference", e);
    }

    setThemeState(initialTheme);
    applyThemeToDocument(initialTheme);
    setMounted(true);
  }, []);

  const applyThemeToDocument = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDocument(newTheme);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  function darkThemeOrLight(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
