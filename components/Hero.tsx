"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, LineReveal } from "@/components/ui/Reveal";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: la foto se desplaza más lento que la página y se acerca un poco.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section ref={ref} className="grid md:grid-cols-[5fr_7fr] md:min-h-[calc(100svh-100px)] bg-stone">
      <div className="container md:!px-16 flex flex-col justify-end pb-12 pt-10 md:py-20 order-2 md:order-1">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Colección 2025 · Lentes de sol
        </motion.p>
        <LineReveal
          as="h1"
          lines={["Ver claro,", "incluso a", "mediodía."]}
          className="mt-5 text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] font-medium"
          delay={0.25}
        />
        <motion.p
          className="mt-7 max-w-md text-[17px] leading-relaxed text-ink/75"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
        >
          Armazones de acetato y acero con protección UV400. Pocos modelos,
          bien hechos, pensados para el sol de todos los días.
        </motion.p>
        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
        >
          <Link href="/catalog" className="btn-primary">Ver la colección</Link>
          <Link href="/catalog?segment=women" className="btn-outline">Mujer</Link>
          <Link href="/catalog?segment=men" className="btn-outline">Hombre</Link>
        </motion.div>
      </div>

      <div className="relative h-[44vh] md:h-auto overflow-hidden order-1 md:order-2">
        <motion.img
          src="/images/caratula.png"
          alt="Siete modelos de lentes MIRAR sobre fondo gris"
          style={{ y, scale }}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.3, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
