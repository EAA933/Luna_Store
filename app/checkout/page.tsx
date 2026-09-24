// app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <main className="container grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <h1 className="text-5xl font-medium">Tu carrito está vacío</h1>
          <p className="mt-3 text-ink/60">Cuando agregues un par, aparecerá aquí.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/catalog" className="btn-primary">Ver la colección</Link>
            <Link href="/" className="btn-outline">Inicio</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16">
      <p className="eyebrow">Resumen</p>
      <h1 className="mt-4 text-5xl md:text-6xl font-medium">Tu pedido</h1>

      <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-5 py-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center bg-stone">
                <img src={it.image} alt={it.name} className="h-full w-full object-contain p-2 mix-blend-multiply" />
              </div>
              <div className="flex-1">
                <p className="font-display text-xl capitalize">{it.name.toLowerCase()}</p>
                <p className="text-[14px] text-muted">Cantidad: {it.qty}</p>
              </div>
              <p className="tabular-nums">{formatCurrency(it.price * it.qty)}</p>
            </li>
          ))}
        </ul>

        <aside className="h-fit bg-stone p-6">
          <div className="flex justify-between text-[15px]"><span>Subtotal</span><span className="tabular-nums">{formatCurrency(subtotal)}</span></div>
          <div className="mt-2 flex justify-between text-[14px] text-muted"><span>Envío</span><span>Se calcula al pagar</span></div>
          <div className="mt-5 border-t border-line pt-5 flex justify-between font-display text-2xl"><span>Total</span><span className="tabular-nums">{formatCurrency(subtotal)}</span></div>
          <button className="btn-primary mt-6 w-full cursor-not-allowed opacity-60" disabled>
            Pago en línea próximamente
          </button>
          <p className="mt-3 text-[13px] text-muted">
            Estamos habilitando el pago en línea. Muy pronto podrás completar tu compra aquí.
          </p>
        </aside>
      </div>
    </main>
  );
}
