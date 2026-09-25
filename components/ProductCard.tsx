// components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/components/cart/useCart";
import { ArrowRight, Check, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";

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
}: Props) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ id, slug, name, price, image }, 1);
    setJustAdded(true);
    setOpen(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] p-6 sm:p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:border-[rgb(var(--stroke-strong))] overflow-hidden"
    >
      <div>
        {/* Cabecera sutil: silueta y polarizado sin cajas estridentes */}
        <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] mb-4">
          <span className="font-medium tracking-wide">
            {refCode || `MR-0${id}`}
          </span>
          <span className="text-[11px]">
            {polarized ? "Polarizado HD" : "Mineral UV400"}
          </span>
        </div>

        {/* Imagen del Producto en el Centro — Protagonista con micro-zoom sutil */}
        <Link
          href={`/product/${slug}`}
          className="relative block aspect-[4/3] w-full my-4 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
            <Image
              src={image}
              alt={`Lentes de sol MIRAR modelo ${name}`}
              fill
              referrerPolicy="no-referrer"
              className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_12px_30px_rgba(255,255,255,0.04)]"
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
    </article>
  );
}
