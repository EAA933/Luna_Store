"use client";

// Reparte el catálogo a toda la tienda. Arranca con el catálogo local (sin
// parpadeos ni pantallas vacías) y lo reemplaza con los datos de Supabase:
// precios, stock y modelos activos que edites en /admin.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products as localProducts, type StoreProduct } from "@/lib/products";
import { fetchProducts } from "@/lib/catalog";

const ProductsContext = createContext<StoreProduct[]>(localProducts);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoreProduct[]>(localProducts);
  useEffect(() => {
    let vivo = true;
    fetchProducts().then((list) => vivo && setItems(list));
    return () => { vivo = false; };
  }, []);
  return <ProductsContext.Provider value={items}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function useProduct(slug: string) {
  return useProducts().find((p) => p.slug === slug || p.legacySlugs?.includes(slug));
}
