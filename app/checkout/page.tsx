// app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <main className="w-full px-8 md:px-16 lg:px-24 py-12">
      {items.length === 0 ? (
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-[rgb(var(--fg))]/70 mb-8">
            Cuando agregues productos, aparecerán aquí para que puedas pagar.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/catalog" className="btn-primary">Explorar catálogo</Link>
            <Link href="/" className="btn-outline">Volver al inicio</Link>
          </div>
        </section>
      ) : (
        <section className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl mb-2">Checkout</h1>
          <p className="text-[rgb(var(--fg))]/70 mb-8">
            Revisa tu pedido antes de confirmar.
          </p>

          <div className="grid md:grid-cols-[2fr_1fr] gap-8">
            {/* Lista de productos */}
            <div className="space-y-4">
              {items.map((it) => (
                <article key={it.id} className="card p-4 flex gap-4 items-center">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{it.name}</h3>
                    <p className="text-sm text-[rgb(var(--fg))]/70">
                      Cantidad: {it.qty}
                    </p>
                  </div>
                  <div className="text-right font-medium">
                    ${(it.price * it.qty).toLocaleString("es-MX")}
                  </div>
                </article>
              ))}
            </div>

            {/* Resumen */}
            <aside className="card p-5 h-fit space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-MX")}</span>
              </div>
              <div className="flex justify-between text-sm text-[rgb(var(--fg))]/70">
                <span>Envío estimado</span>
                <span>Calculado en checkout</span>
              </div>
              <div className="pt-3">
                <button className="btn-primary w-full opacity-60 cursor-not-allowed" disabled>
                  Pago en línea próximamente
                </button>
              </div>
              <p className="text-xs text-[rgb(var(--fg))]/60">
                Estamos habilitando el pago en línea. Muy pronto podrás completar tu compra aquí.
              </p>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}
