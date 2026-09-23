// components/ProductCard.tsx
"use client";

import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, slug, name, price, image }: Props) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  function handleAdd() {
    add({ id, slug, name, price, image }, 1);
    setOpen(true);
  }

  return (
    <article className="group overflow-hidden rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] shadow-soft">
      <Link href={`/product/${slug}`} className="block">
        <div className="w-full h-[260px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-[rgb(var(--fg))]/70">${price.toLocaleString("es-MX")}</p>
        </div>
        <button onClick={handleAdd} className="btn-outline text-sm px-4 py-2">
          Agregar
        </button>
      </div>
    </article>
  );
}
