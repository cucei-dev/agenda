"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  /* Prevent layout shift by rendering a same-size placeholder until mounted */
  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors"
      aria-label={
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
      }
    >
      <MaterialIcon name={isDark ? "light_mode" : "dark_mode"} decorative />
    </button>
  );
}
