"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/components/cart/useCart";

export default function CartButton() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="inline-flex items-center gap-2 text-lg font-medium text-black dark:text-white hover:text-[rgb(var(--accent))] transition"
      aria-label="Abrir carrito"
    >
      <ShoppingCart className="w-6 h-6" />
      <span>Carrito</span>
      {count > 0 && (
        <span className="ml-1 text-sm text-[rgb(var(--accent))] font-semibold">
          ({count})
        </span>
      )}
    </button>
  );
}
