import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      const isDark = stored === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      setDark(isDark);
      return;
    }

    // Default to dark to match the intended visual tone.
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setDark(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-xl glass-card
        hover:scale-105 active:scale-95 transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? (
        <Sun className="w-4 h-4 text-foreground" strokeWidth={1.5} />
      ) : (
        <Moon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
      )}
    </button>
  );
}
