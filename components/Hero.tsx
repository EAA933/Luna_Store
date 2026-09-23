// components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full px-10 md:px-20 lg:px-32 py-28 md:py-32 grid md:grid-cols-2 items-center gap-16 overflow-hidden">
      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl ml-auto"
      >
        <p className="uppercase tracking-[0.25em] text-base mb-4 text-[rgb(var(--fg))]/60">
          Nueva colección • 2025
        </p>

        <h1 className="font-display text-6xl md:text-7xl leading-[1.15] mb-6 text-[rgb(var(--fg))]">
          Diseño cuidado.  
          <br />Protección real.  
          <br />
          <span className="text-[rgb(var(--accent))]/90">LUNA</span> todos los días.
        </h1>

        <p className="text-[rgb(var(--fg))]/80 text-lg mb-10 leading-relaxed max-w-xl">
          UV400 en todos los modelos y opción polarizada.  
          Menos logo, más producto. Hechos para usarse todos los días.
        </p>

        <div className="flex gap-5">
          <Link href="/catalog" className="btn-primary text-base px-8 py-4">
            Ver colección
          </Link>
          <a href="#top-ventas" className="btn-outline text-base px-8 py-4">
            Explorar
          </a>
        </div>
      </motion.div>

      {/* Imagen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-[2rem] overflow-hidden shadow-soft w-full"
      >
        <img
          src="images/caratula.png"
          alt="Modelo con lentes"
          className="w-full h-[650px] object-cover"
        />
      </motion.div>
    </section>
  );
}
