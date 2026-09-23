"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlassesOverlay() {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      setShow(true);
      const t = setTimeout(() => setShow(false), 1400);
      return () => clearTimeout(t);
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -120, rotate: -10, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="absolute inset-0 pointer-events-none grid place-items-center"
        >
          {/* Gafas SVG simples, puedes cambiar por un PNG propio */}
          <svg width="220" height="80" viewBox="0 0 220 80" className="drop-shadow-xl">
            <g fill="currentColor" className="text-black/70 dark:text-white/90">
              <rect x="5" y="20" rx="12" ry="12" width="80" height="50"></rect>
              <rect x="135" y="20" rx="12" ry="12" width="80" height="50"></rect>
              <rect x="85" y="32" width="50" height="6" rx="3"></rect>
              <rect x="0" y="36" width="5" height="4" rx="2"></rect>
              <rect x="215" y="36" width="5" height="4" rx="2"></rect>
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
