"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, setOpen } = useCartStore();

  return (
    <main className="w-full bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen">
      <section className="container-floema py-16 max-w-4xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase mb-8 hover:text-[rgb(var(--accent))] transition-colors px-4 py-2 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 bg-[rgb(var(--accent))]/10 border border-[rgb(var(--accent))]/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent))] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--accent))] font-bold">
            TIENDA OFICIAL MIRAR // BOLSA DE COMPRA
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl tracking-tight mb-8 text-[rgb(var(--fg))]">
          Tu Bolsa de Compra [{items.reduce((a, b) => a + b.qty, 0)}]
        </h1>

        <div className="magazine-frame rounded-3xl p-8 sm:p-12 text-center bg-[rgb(var(--card))]">
          <div className="w-16 h-16 rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] flex items-center justify-center mx-auto mb-5 border border-[rgb(var(--fg))] shadow-md">
            <ShoppingBag className="w-7 h-7" />
          </div>

          <p className="text-sm text-[rgb(var(--fg))]/80 font-sans mb-8 max-w-md mx-auto leading-relaxed">
            Puedes gestionar tus productos, modificar cantidades y proceder al pago seguro de forma instantánea a través del cajón lateral interactivo.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="btn-sunset text-xs px-7 py-3.5 rounded-full"
            >
              Abrir Bolsa Lateral
            </button>
            <Link href="/catalog" className="btn-editorial-outline text-xs px-7 py-3.5 rounded-full font-mono">
              Ver Catálogo de Lentes
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
