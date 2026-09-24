// components/cart/CartDrawer.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "./useCart";
import { formatCurrency } from "@/lib/utils";
import { EASE } from "@/components/ui/Reveal";

export default function CartDrawer() {
  const { open, setOpen, items, remove, updateQty } = useCartStore();
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Carrito"
            className="fixed right-0 top-0 z-[61] flex h-full w-full flex-col bg-white sm:w-[440px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h3 className="font-display text-2xl">Tu carrito</h3>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-stone" aria-label="Cerrar carrito">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-3xl">Aún está vacío</p>
                <p className="mt-2 text-ink/60">Encuentra el par que va contigo.</p>
                <Link href="/catalog" onClick={() => setOpen(false)} className="btn-primary mt-8">Ver la colección</Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.li
                        key={it.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex gap-4 py-5"
                      >
                        <Link href={`/product/${it.slug}`} onClick={() => setOpen(false)} className="grid h-24 w-24 shrink-0 place-items-center bg-stone">
                          <img src={it.image} alt={it.name} className="h-full w-full object-contain p-2 mix-blend-multiply" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-display text-lg capitalize">{it.name.toLowerCase()}</p>
                            <p className="tabular-nums">{formatCurrency(it.price * it.qty)}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-line">
                              <button onClick={() => updateQty(it.id, it.qty - 1)} className="grid h-8 w-8 place-items-center" aria-label="Quitar uno"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="w-6 text-center text-sm tabular-nums">{it.qty}</span>
                              <button onClick={() => updateQty(it.id, it.qty + 1)} className="grid h-8 w-8 place-items-center" aria-label="Agregar uno"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                            <button onClick={() => remove(it.id)} className="link-underline text-sm text-muted">Quitar</button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-ink/70">Subtotal</span>
                    <span className="font-display text-2xl tabular-nums">{formatCurrency(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted">El envío se calcula al finalizar.</p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">Continuar</Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
