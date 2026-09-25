// components/cart/useCart.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;     // en MXN
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (v) => set({ open: v }),
      add: (item, qty = 1) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) {
          items[idx].qty += qty;
        } else {
          items.push({ ...item, qty });
        }
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) => {
        if (qty <= 0) return set({ items: get().items.filter((i) => i.id !== id) });
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "mirar-cart-v1" }
  )
);
