// components/cart/CartDrawer.tsx
"use client";

import { useCartStore } from "./useCart";
import Link from "next/link";
import { X, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { open, setOpen, items, remove, updateQty } = useCartStore();
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[55] transition-opacity"
        />
      )}

      <aside
        aria-hidden={!open}
        className={[
          "fixed top-0 right-0 h-full w-[92%] sm:w-[440px] z-[60] bg-[rgb(var(--bg))] border-l border-[rgb(var(--stroke))] shadow-2xl",
          "transition-transform duration-300 flex flex-col justify-between",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Encabezado con píldoras */}
        <div className="p-5 flex items-center justify-between border-b border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--accent))] animate-pulse" />
            <h3 className="font-serif font-bold text-lg text-[rgb(var(--fg))]">
              Bolsa de Compra [{items.reduce((a, b) => a + b.qty, 0)}]
            </h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card-warm))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))] transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[rgb(var(--fg))] text-[rgb(var(--accent))] flex items-center justify-center border border-[rgb(var(--fg))] shadow-md mb-4 font-mono font-bold text-lg">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2 text-[rgb(var(--fg))]">
                Tu bolsa está vacía
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))] mb-6 font-sans max-w-xs leading-relaxed">
                Selecciona tus lentes de sol favoritos para iniciar tu pedido con envío gratis.
              </p>
              <Link
                href="/catalog"
                onClick={() => setOpen(false)}
                className="btn-sunset text-xs px-6 py-3 rounded-full"
              >
                Explorar Catálogo de Lentes
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 p-3.5 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl group shadow-sm"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain border border-[rgb(var(--stroke))] rounded-xl bg-[rgb(var(--card-warm))]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-[rgb(var(--fg))] tracking-tight">
                          {it.name}
                        </h4>
                        <button
                          onClick={() => remove(it.id)}
                          className="font-mono text-[10px] uppercase text-[rgb(var(--secondary))] hover:text-rose-600 hover:underline px-2 py-0.5 rounded-full hover:bg-rose-500/10"
                        >
                          Quitar
                        </button>
                      </div>
                      <p className="font-mono text-xs font-bold text-[rgb(var(--accent))] mt-0.5">
                        ${it.price.toLocaleString("es-MX")} MXN
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs mt-2">
                      <button
                        onClick={() => updateQty(it.id, Math.max(0, it.qty - 1))}
                        className="w-7 h-7 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card-warm))] flex items-center justify-center hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))] transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-[rgb(var(--fg))]">{it.qty}</span>
                      <button
                        onClick={() => updateQty(it.id, it.qty + 1)}
                        className="w-7 h-7 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card-warm))] flex items-center justify-center hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Carrito con Píldoras */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
            <div className="flex items-center justify-between mb-2 font-mono text-xs">
              <span className="text-[rgb(var(--secondary))] uppercase">SUBTOTAL NETO</span>
              <strong className="text-lg font-bold text-[rgb(var(--fg))]">
                ${subtotal.toLocaleString("es-MX")} MXN
              </strong>
            </div>

            <p className="text-[10px] font-mono text-[rgb(var(--secondary))] mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
              <span>Envío express gratis a todo México y garantía de por vida.</span>
            </p>

            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="w-full btn-sunset py-3.5 text-xs text-center flex items-center justify-center gap-2 rounded-full font-bold"
            >
              <span>Proceder al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
