"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useCartStore } from "@/components/cart/useCart";
import { detalle, type StoreProduct } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { EASE } from "@/components/ui/Reveal";

export default function ProductCard({ p, priority = false }: { p: StoreProduct; priority?: boolean }) {
  const add = useCartStore((s) => s.add);
  const [agregado, setAgregado] = useState(false);

  const agregar = (e: React.MouseEvent) => {
    e.preventDefault();
    add({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1600);
  };

  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-stone">
        {p.tag && (
          <span className="absolute left-3 top-3 z-10 border border-ink/80 bg-white/70 px-2 py-0.5 text-[12px] font-medium backdrop-blur">
            {p.tag}
          </span>
        )}
        <img
          src={p.image}
          alt={`Lentes ${p.name}`}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-contain p-[10%] mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
        />
        {/* Agregar rápido: sube desde abajo al pasar el mouse (siempre visible en táctil) */}
        <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 md:translate-y-3 md:opacity-0 transition-all duration-500 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            onClick={agregar}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-[14px] font-semibold shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:bg-ink hover:text-white transition-colors"
            aria-label={`Agregar ${p.name} al carrito`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={agregado ? "ok" : "add"}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                {agregado ? <><Check className="h-4 w-4" /> Agregado</> : <><Plus className="h-4 w-4" /> Agregar</>}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[19px] capitalize">{p.name.toLowerCase()}</h3>
        <span className="text-[15px] tabular-nums">{formatCurrency(p.price).replace(".00", "")}</span>
      </div>
      <p className="mt-0.5 text-[14px] text-muted">{detalle(p)}</p>
    </Link>
  );
}
