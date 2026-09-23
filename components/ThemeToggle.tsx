"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
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

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 border border-[color:var(--stroke)] rounded-full px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
    >
      <div className="relative w-7 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!dark ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center"
            >
              {/* Sol amarillo único */}
              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(255,220,100,0.8)]" />
              {/* Rayos */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[6px] bg-yellow-300 rounded"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-8px)`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="glasses"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.5 }}
              className="relative w-7 h-4"
            >
              {/* Lentes de sol blancos */}
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full border border-white bg-white/20 dark:bg-white/70" />
              <div className="absolute left-1/2 top-[7px] w-[6px] h-[1.5px] bg-white rounded -translate-x-1/2" />
              <div className="absolute right-0 top-0 w-3 h-3 rounded-full border border-white bg-white/20 dark:bg-white/70" />
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-t from-white/50 to-transparent rounded-b-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="text-sm font-medium select-none">{dark ? "Oscuro" : "Claro"}</span>
    </button>
  );
}
