"use client";

import { useCartStore } from "@/components/cart/useCart";
import type { StoreProduct } from "@/lib/products";

export default function AddToCartButton({
  product,
  className = "btn-primary",
  label = "Agregar al carrito",
}: {
  product: StoreProduct;
  className?: string;
  label?: string;
}) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image });
        setOpen(true);
      }}
    >
      {label}
    </button>
  );
}
