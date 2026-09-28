"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/components/cart/useCart";
import { ArrowRight, Plus, Check, Trash2, Eye } from "lucide-react";

export type RecentProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  ref?: string;
  collection?: string;
  shape?: string;
  polarized?: boolean;
};

const STORAGE_KEY = "mirar_recently_viewed";

export default function RecentlyViewed({
  currentProduct,
}: {
  currentProduct: RecentProduct;
}) {
  const [recentItems, setRecentItems] = useState<RecentProduct[]>([]);
  const [mounted, setMounted] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed: RecentProduct[] = stored ? JSON.parse(stored) : [];

      // Filtrar elemento actual si ya existía y colocarlo al principio, máximo 4
      const filtered = parsed.filter(
        (item) => item.slug !== currentProduct.slug && item.id !== currentProduct.id
      );
      const updated = [currentProduct, ...filtered].slice(0, 4);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecentItems(updated);
    } catch (e) {
      console.warn("No se pudo acceder a localStorage para recientemente vistos:", e);
    }
  }, [currentProduct]);

  function handleClear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentItems([currentProduct]);
    } catch (e) {
      console.warn(e);
    }
  }

  function handleQuickAdd(e: React.MouseEvent, item: RecentProduct) {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAddedId(item.id);
    setOpen(true);
    setTimeout(() => setAddedId(null), 2000);
  }

  // Prevenir desajuste de hidratación SSR
  if (!mounted || recentItems.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[rgb(var(--stroke))]">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
            HISTORIAL DE VISITAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Recientemente vistos
          </h2>
          <p className="text-xs sm:text-sm text-[rgb(var(--secondary))] mt-1">
            Últimos modelos que has explorado en el taller (hasta 4 en memoria).
          </p>
        </div>

        {recentItems.length > 1 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-[rgb(var(--secondary))] hover:text-red-500 transition-colors inline-flex items-center gap-1 py-1 px-2.5 rounded-full hover:bg-[rgb(var(--card))]"
            title="Limpiar historial"
          >
            <Trash2 className="w-3 h-3" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Tira horizontal con scroll suave en pantallas pequeñas y cuadrícula en escritorio */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {recentItems.map((item) => {
          const isCurrent = item.slug === currentProduct.slug;

          return (
            <div
              key={item.slug}
              className={`group relative flex-shrink-0 w-[240px] sm:w-auto flex flex-col justify-between rounded-3xl bg-[rgb(var(--card))] border transition-all duration-300 p-5 ${
                isCurrent
                  ? "border-[rgb(var(--accent))]/40 ring-1 ring-[rgb(var(--accent))]/20 shadow-md"
                  : "border-[rgb(var(--stroke))] hover:border-[rgb(var(--stroke-strong))] hover:shadow-lg"
              }`}
            >
              <div>
                {/* Cabecera de la tarjeta */}
                <div className="flex items-center justify-between text-[11px] text-[rgb(var(--secondary))] mb-2">
                  <span className="font-mono">{item.ref || "MIRAR"}</span>
                  {isCurrent ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20">
                      Viendo ahora
                    </span>
                  ) : item.polarized ? (
                    <span className="text-[10px] font-medium text-[rgb(var(--secondary))]">
                      Polarizado
                    </span>
                  ) : null}
                </div>

                {/* Imagen del modelo */}
                <Link
                  href={`/product/${item.slug}`}
                  className="block relative aspect-[4/3] w-full rounded-2xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] overflow-hidden p-3 my-2"
                >
                  <Image
                    src={item.image}
                    alt={`Lentes ${item.name}`}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                  />
                </Link>

                {/* Nombre y colección */}
                <div className="mt-3">
                  <Link
                    href={`/product/${item.slug}`}
                    className="block group-hover:text-[rgb(var(--accent))] transition-colors"
                  >
                    <h3 className="font-semibold text-base text-[rgb(var(--fg))] tracking-tight">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[rgb(var(--secondary))] truncate mt-0.5">
                    {item.collection || item.shape || "Colección Central"}
                  </p>
                </div>
              </div>

              {/* Pie de tarjeta con precio y acción rápida */}
              <div className="pt-4 mt-3 border-t border-[rgb(var(--stroke))] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[rgb(var(--secondary))] block text-[10px]">
                    Precio
                  </span>
                  <span className="font-semibold text-sm text-[rgb(var(--fg))]">
                    {formatCurrency(item.price)}
                  </span>
                </div>

                {isCurrent ? (
                  <span className="text-[11px] text-[rgb(var(--secondary))] font-medium">
                    En pantalla
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, item)}
                      aria-label={`Añadir ${item.name} a la bolsa`}
                      className="w-8 h-8 rounded-full border border-[rgb(var(--stroke))] hover:border-[rgb(var(--fg))] flex items-center justify-center text-[rgb(var(--fg))] transition-all bg-[rgb(var(--bg))]"
                      title="Añadir a la bolsa"
                    >
                      {addedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <Link
                      href={`/product/${item.slug}`}
                      className="p-1.5 rounded-full hover:bg-[rgb(var(--bg))] text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] transition-colors"
                      title="Ver modelo"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
