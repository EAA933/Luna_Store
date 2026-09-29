// components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/components/cart/useCart";
import { ArrowRight, Check, Plus, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  material?: string;
  lensColor?: string;
  edition?: string;
  polarized?: boolean;
  shape?: string;
  refCode?: string;
  sustainabilityBadge?: string;
  index?: number;
};

export default function ProductCard({
  id,
  slug,
  name,
  price,
  image,
  material,
  lensColor,
  edition,
  polarized,
  shape,
  refCode,
  sustainabilityBadge,
  index = 0,
}: Props) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Delay progresivo para efecto escalonado estilo Apple al hacer scroll
  const delayMs = (index % 3) * 110;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ id, slug, name, price, image }, 1);
    setJustAdded(true);
    setOpen(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <motion.article
      ref={cardRef as any}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onAnimationEnd={() => setAnimationDone(true)}
      whileHover={{
        scale: 1.025,
        y: -4,
        boxShadow:
          "0 22px 45px -12px rgba(0, 0, 0, 0.18), 0 8px 20px -8px rgba(0, 0, 0, 0.10)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      style={
        !animationDone
          ? isVisible
            ? { animationDelay: `${delayMs}ms` }
            : { opacity: 0, transform: "translateY(24px)" }
          : undefined
      }
      className={`group relative flex flex-col justify-between rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] p-6 sm:p-8 transition-[border-color,background-color] duration-300 hover:border-[rgb(var(--stroke-strong))] cursor-pointer overflow-hidden ${
        isVisible ? (!animationDone ? "apple-fade-in" : "") : "opacity-0"
      }`}
    >
      <div>
        {/* Cabecera sutil: silueta y polarizado sin cajas estridentes */}
        <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] mb-4">
          <span className="font-medium tracking-wide">
            {refCode || `MR-0${id}`}
          </span>
          <span className="text-[11px]">
            {polarized ? "Polarizado · UV400" : "UV400"}
          </span>
        </div>

        {/* Imagen del Producto en el Centro — Protagonista con micro-zoom sutil */}
        <Link
          href={`/product/${slug}`}
          className="relative block aspect-[4/3] w-full my-4 flex items-center justify-center overflow-hidden rounded-2xl bg-[#ECE8E1]"
        >
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
            <Image
              src={image}
              alt={`Lentes de sol MIRAR modelo ${name}`}
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
        </Link>

        {/* Información del Producto: Tipografía pura y jerarquizada */}
        <div className="space-y-1.5 pt-2">
          {shape && (
            <p className="text-[11px] uppercase tracking-wider text-[rgb(var(--secondary))] font-medium">
              {shape}
            </p>
          )}

          <Link href={`/product/${slug}`} className="block">
            <h3 className="font-sans font-semibold text-xl sm:text-2xl text-[rgb(var(--fg))] tracking-tight group-hover:text-[rgb(var(--accent))] transition-colors">
              {name}
            </h3>
          </Link>

          {material && (
            <p className="text-xs text-[rgb(var(--secondary))] line-clamp-1">
              {material}
            </p>
          )}
        </div>
      </div>

      {/* Pie con Precio y CTA en Píldora que se activa al interactuar */}
      <div className="pt-6 mt-4 border-t border-[rgb(var(--stroke))] flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[rgb(var(--secondary))] block leading-none mb-1">
            Precio
          </span>
          <span className="font-sans font-semibold text-base text-[rgb(var(--fg))]">
            ${price.toLocaleString("es-MX")} MXN
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/product/${slug}`}
            className="text-xs text-[rgb(var(--accent))] hover:underline flex items-center gap-0.5 font-medium px-2 py-1"
          >
            <span>Ver más</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleAdd}
            className="btn-apple-primary px-4 py-2 text-xs font-medium rounded-full shadow-sm"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Listo</span>
              </>
            ) : (
              <span>Comprar</span>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
