// components/home/ShoppingExperience.tsx
"use client";

// Vitrina rápida: eliges modelo y lo agregas a la bolsa. Precio, foto, stock y
// modelos activos salen del catálogo en vivo (lo que edites en /admin).
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/components/cart/useCart";
import { useProducts } from "@/components/store/ProductsProvider";
import { Check, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import { ENVIO_GRATIS_DESDE, DIAS_DEVOLUCION } from "@/lib/tienda";

export default function ShoppingExperience() {
  const modelos = useProducts();
  const [slug, setSlug] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  const current = modelos.find((m) => m.slug === slug) ?? modelos[0];
  if (!current) return null;
  const agotado = !current.inStock || current.stock === 0;

  function handleAddToCart() {
    if (agotado) return;
    add({ id: current.id, slug: current.slug, name: current.name, price: current.price, image: current.image }, 1);
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="w-full py-10 lg:py-14 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            ELIGE TU PAR
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            La experiencia de comprar.
          </h2>
          <p className="text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
            Escoge tu modelo, agrégalo a la bolsa y paga seguro con Mercado Pago.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visor del modelo */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-14 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] relative overflow-hidden group min-h-[420px] sm:min-h-[500px]">
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--secondary))]">
                {current.ref}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center my-6 overflow-hidden rounded-2xl bg-[#ECE8E1] shadow-lg"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </AnimatePresence>

            <div className="text-center space-y-1">
              <h3 className="text-2xl font-semibold text-[rgb(var(--fg))] tracking-tight">{current.name}</h3>
              <p className="text-xs text-[rgb(var(--secondary))]">
                {current.shape} · Mica {current.lensColor.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Selección y compra */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block">
                Selecciona tu modelo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {modelos.map((m) => {
                  const isSelected = m.slug === current.slug;
                  const sinStock = !m.inStock || m.stock === 0;
                  return (
                    <button
                      key={m.slug}
                      type="button"
                      onClick={() => setSlug(m.slug)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                          : "bg-[rgb(var(--bg))]/60 border-[rgb(var(--stroke))] hover:bg-[rgb(var(--bg))]"
                      }`}
                    >
                      <div className="text-xs font-semibold text-[rgb(var(--fg))]">{m.name}</div>
                      <div className="text-[11px] text-[rgb(var(--secondary))] mt-0.5">
                        {sinStock ? "Agotado" : `$${m.price.toLocaleString("es-MX")} MXN`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-4">
              <div>
                <span className="text-xs text-[rgb(var(--secondary))] block">Precio</span>
                <span className="text-2xl font-semibold text-[rgb(var(--fg))]">
                  ${current.price.toLocaleString("es-MX")} MXN
                </span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={agotado}
                  className="w-full btn-apple-primary py-3.5 text-sm font-medium rounded-full shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {agotado ? (
                    <span>Agotado por ahora</span>
                  ) : added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado a tu bolsa</span>
                    </>
                  ) : (
                    <span>Añadir a la bolsa — {current.name}</span>
                  )}
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="w-full btn-apple-secondary py-2.5 text-xs font-medium rounded-full flex items-center justify-center gap-1"
                >
                  <span>Ver ficha del modelo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-3 border-t border-[rgb(var(--stroke))] grid grid-cols-2 gap-2 text-[11px] text-[rgb(var(--secondary))]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                  <span>{DIAS_DEVOLUCION} días para cambios</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[rgb(var(--fg))]" />
                  <span>Envío gratis desde ${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
