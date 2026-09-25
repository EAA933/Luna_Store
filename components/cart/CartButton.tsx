"use client";
import { useCartStore } from "@/components/cart/useCart";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-all text-xs font-mono font-bold uppercase select-none rounded-full group"
      aria-label="Abrir bolsa MIRAR"
    >
      <ShoppingBag className="w-3.5 h-3.5 text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors" />
      <span className="hidden sm:inline">BOLSA</span>
      <span className="bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] px-2 py-0.5 rounded-full border border-[rgb(var(--fg))] text-[10px] shadow-[1px_1px_0px_rgb(var(--fg))]">
        {count}
      </span>
    </button>
  );
}
