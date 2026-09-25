// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Glasses, Sparkles } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored === "dark" || (!stored && prefersDark);
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="w-28 h-8 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={dark ? "Desactivar filtro solar (Modo Claro)" : "Activar filtro de lentes de sol (Modo Polarizado)"}
      className={`relative inline-flex items-center gap-2 border rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
        dark
          ? "border-amber-500/40 bg-stone-900 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          : "border-[rgb(var(--stroke))] bg-[rgb(var(--card))] text-[rgb(var(--fg))] hover:border-[rgb(var(--stroke-strong))]"
      }`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!dark ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </motion.div>
          ) : (
            <motion.div
              key="glasses"
              initial={{ opacity: 0, y: -4, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Glasses className="w-4 h-4 text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="select-none tracking-tight">
        {dark ? "Filtro Solar" : "Luz Natural"}
      </span>
    </button>
  );
}
