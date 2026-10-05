"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted opacity-50"
        aria-label="Toggle Theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-muted hover:text-foreground transition-colors"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
      aria-label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 hover:text-amber-300 transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-600 hover:text-zinc-900 transition-colors" />
      )}
    </Button>
  );
}
