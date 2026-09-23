"use client";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { products } from "@/lib/products";

/**
 * Ajustes rápidos:
 * - SPEED_PX_S: pixeles por segundo (menor = más lento)
 * - CARD_W: ancho de cada tarjeta (rectangular)
 * - IMG_H: alto del área de imagen
 * - GAP_PX: separación entre tarjetas
 */
const SPEED_PX_S = 25;     // 12–35 es “natural”; prueba 20–28 para ultra suave
const CARD_W      = 520;   // rectángulo ancho
const IMG_H       = 220;   // alto horizontal
const GAP_PX      = 24;




export default function BestSellers() {
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40); // fallback

  // Recalcula duración en función del ancho real (para que sea natural)
  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      // Como duplicamos la lista, la “media vuelta” es scrollWidth/2
      const halfWidth = track.scrollWidth / 2;
      const d = halfWidth / SPEED_PX_S; // s = d / v
      setDuration(Math.max(d, 10)); // mínimo de seguridad
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Animación infinita ultra suave
  useEffect(() => {
    let stop = false;
    const loop = async () => {
      while (!stop) {
        await controls.start({ x: `-${50}%`, transition: { duration, ease: "linear" } });
        await controls.start({ x: "0%", transition: { duration: 0 } });
      }
    };
    // Respeta reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) loop();
    return () => { stop = true; };
  }, [controls, duration]);

  return (
    <section id="top-ventas" className="w-full py-24 px-8 md:px-16 lg:px-24">
      <h2 className="font-display text-4xl mb-10">Más vendidos</h2>

      <div
        className="relative w-full overflow-hidden group"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({ x: `-${50}%`, transition: { duration, ease: "linear" } })}
      >
        {/* Fades laterales para elegancia */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[rgb(var(--bg))] to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgb(var(--bg))] to-transparent"></div>

        <motion.div
          ref={trackRef}
          className="flex min-w-max"
          style={{ gap: `${GAP_PX}px` }}
          animate={controls}
        >
          {[...products, ...products].map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="rounded-2xl overflow-hidden bg-[rgb(var(--card))] border border-[color:var(--stroke)] shadow-soft"
              style={{ minWidth: CARD_W }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full object-cover"
                style={{ height: IMG_H }}
              />
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-[rgb(var(--fg))]/70">
                    ${p.price.toLocaleString("es-MX")}.00
                  </p>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <Link href={`/product/${p.slug}`} className="underline text-[rgb(var(--accent))]">
                    Ver más
                  </Link>
                  <AddToCartButton product={p} className="btn-outline text-xs px-3 py-1" label="Agregar" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
