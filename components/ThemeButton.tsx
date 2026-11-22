"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeButton() {
  const [theme, setTheme] = useState<"dark" | "light">();
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let saved;
      try {
        saved = localStorage.getItem("vuthy-theme");
      } catch {}
      const next =
        saved === "light" || saved === "dark"
          ? saved
          : media.matches
            ? "dark"
            : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    }
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("vuthy-theme", next);
    } catch {}
  }
  const label =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  return (
    <button
      className="icon-button theme-button"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Sun className="sun" />
      <Moon className="moon" />
    </button>
  );
}
