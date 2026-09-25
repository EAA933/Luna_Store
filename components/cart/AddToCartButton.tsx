"use client";

import { useCartStore } from "@/components/cart/useCart";
import type { StoreProduct } from "@/lib/products";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({
  product,
  className = "btn-sunset rounded-full",
  label = "Añadir a la Bolsa",
}: {
  product: Pick<StoreProduct, "id" | "slug" | "name" | "price" | "image">;
  className?: string;
  label?: string;
}) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        setAdded(true);
        setOpen(true);
        setTimeout(() => setAdded(false), 2000);
      }}
    >
      {added ? (
        <span className="inline-flex items-center gap-1.5 font-bold">
          <Check className="w-3.5 h-3.5" />
          <span>Añadido</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-bold">
          <Plus className="w-3.5 h-3.5" />
          <span>{label}</span>
        </span>
      )}
    </button>
  );
}
