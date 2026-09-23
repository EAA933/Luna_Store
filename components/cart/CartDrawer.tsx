// components/cart/CartDrawer.tsx
"use client";

import { useCartStore } from "./useCart";
import Link from "next/link";

export default function CartDrawer() {
  const { open, setOpen, items, remove, updateQty } = useCartStore();
  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <aside
      aria-hidden={!open}
      className={[
        "fixed top-0 right-0 h-full w-[90%] sm:w-[420px] z-[60] bg-[rgb(var(--card))] border-l border-[rgb(var(--stroke))]",
        "transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-full",
      ].join(" ")}
    >
      {/* Encabezado */}
      <div className="p-5 flex items-center justify-between border-b border-[rgb(var(--stroke))]">
        <h3 className="font-display text-2xl">Tu carrito</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-sm underline opacity-80 hover:opacity-100"
        >
          Cerrar
        </button>
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col overflow-y-auto max-h-[calc(100vh-220px)]">
        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center">
            <div>
              <div className="text-6xl mb-2">👜</div>
              <h3 className="font-display text-2xl mb-2">Tu carrito está vacío</h3>
              <p className="text-[rgb(var(--fg))]/70 mb-6">
                Agrega tus LUNA favoritos y vuelve aquí para pagar.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/catalog"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                >
                  Explorar catálogo
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="btn-outline"
                >
                  Seguir viendo
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 border-b border-[rgb(var(--stroke))] pb-4"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{it.name}</h4>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-xs underline opacity-70 hover:opacity-100"
                      >
                        Quitar
                      </button>
                    </div>
                    <p className="text-sm opacity-70">
                      ${it.price.toLocaleString("es-MX")} MXN
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(it.id, Math.max(0, it.qty - 1))}
                        className="w-8 h-8 rounded border border-[rgb(var(--stroke))]"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{it.qty}</span>
                      <button
                        onClick={() => updateQty(it.id, it.qty + 1)}
                        className="w-8 h-8 rounded border border-[rgb(var(--stroke))]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total y CTA */}
            <div className="mt-6 pt-4 border-t border-[rgb(var(--stroke))]">
              <div className="flex items-center justify-between mb-3">
                <span className="opacity-70">Subtotal</span>
                <strong>${subtotal.toLocaleString("es-MX")} MXN</strong>
              </div>
              <p className="text-xs opacity-60 mb-4">
                Impuestos y envío se calculan al finalizar compra.
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn-primary w-full text-center block"
              >
                Ir a pagar
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
