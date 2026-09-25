// components/home/BestsellersSlider.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCartStore } from "@/components/cart/useCart";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function BestSellers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  function scroll(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  function handleQuickBuy(p: (typeof products)[0]) {
    add(
      {
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
      },
      1
    );
    setAddedId(p.id);
    setOpen(true);
    setTimeout(() => setAddedId(null), 2000);
  }

  return (
    <section id="top-ventas" className="w-full py-20 lg:py-28 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="container-floema mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            LÍNEA PRINCIPAL
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Conoce la gama.
          </h2>
          <p className="text-sm sm:text-base text-[rgb(var(--secondary))] mt-2 max-w-lg font-normal">
            Seis siluetas concebidas para interactuar con la luz del día y la arquitectura del rostro.
          </p>
        </div>

        {/* Controles discretos de desplazamiento horizontal estilo Apple */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Desplazar hacia la izquierda"
            className="w-10 h-10 rounded-full border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Desplazar hacia la derecha"
            className="w-10 h-10 rounded-full border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carrusel horizontal fluido con snap scroll */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto flex gap-6 px-5 sm:px-8 md:px-12 scroll-smooth no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((p) => {
          const isAdded = addedId === p.id;
          return (
            <div
              key={p.id}
              className="flex-shrink-0 w-[300px] sm:w-[380px] rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] p-7 flex flex-col justify-between group transition-all duration-500 hover:shadow-xl"
              style={{ scrollSnapAlign: "start" }}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] mb-2">
                  <span>{p.ref}</span>
                  <span>{p.polarized ? "Polarizado HD" : "Mineral UV400"}</span>
                </div>

                <Link href={`/product/${p.slug}`} className="block">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[rgb(var(--secondary))] mt-1 line-clamp-1">
                    {p.shape} · {p.material}
                  </p>
                </Link>

                <Link
                  href={`/product/${p.slug}`}
                  className="relative aspect-[4/3] w-full my-6 flex items-center justify-center overflow-hidden block"
                >
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                </Link>
              </div>

              <div className="pt-4 border-t border-[rgb(var(--stroke))] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[rgb(var(--secondary))] block">Desde</span>
                  <span className="text-sm font-semibold text-[rgb(var(--fg))]">
                    ${p.price.toLocaleString("es-MX")} MXN
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${p.slug}`}
                    className="text-xs text-[rgb(var(--accent))] hover:underline font-medium"
                  >
                    Ver detalles
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleQuickBuy(p)}
                    className="btn-apple-primary px-3.5 py-1.5 text-xs font-medium rounded-full"
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : "Comprar"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
