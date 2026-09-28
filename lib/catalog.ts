// lib/catalog.ts — lectura del catálogo desde Supabase (con respaldo local)
import { products as localProducts, type StoreProduct, type MirarCollection } from "@/lib/products";

/** Fila de la tabla public.products tal como la guarda Supabase. */
export type ProductRow = {
  id: string;
  slug: string;
  ref: string;
  name: string;
  collection: string;
  edition: string;
  price: number;
  image: string;
  segment: "men" | "women" | "unisex";
  shape: string;
  lens_color: string;
  lens_type: string;
  material: string;
  polarized: boolean;
  caliber: number;
  bridge: number;
  temple: number;
  weight: number;
  sustainability_badge: string;
  description: string;
  craft_note: string;
  coordinates: string;
  stock: number;
  stock_alert: number;
  active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export function rowToProduct(r: ProductRow): StoreProduct {
  const local = localProducts.find((p) => p.slug === r.slug);
  return {
    id: r.id,
    slug: r.slug,
    legacySlugs: local?.legacySlugs,
    ref: r.ref,
    name: r.name,
    collection: r.collection as MirarCollection,
    edition: r.edition,
    price: r.price,
    image: r.image,
    segment: r.segment,
    shape: r.shape,
    lensColor: r.lens_color,
    lensType: r.lens_type,
    material: r.material,
    polarized: r.polarized,
    caliber: r.caliber,
    bridge: r.bridge,
    temple: r.temple,
    weight: r.weight,
    sustainabilityBadge: r.sustainability_badge,
    description: r.description,
    craftNote: r.craft_note,
    coordinates: r.coordinates,
    inStock: r.stock > 0,
    stock: r.stock,
  };
}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Productos activos ordenados. Funciona en servidor y en navegador (REST directo).
 * Si Supabase no está configurado o falla, devuelve el catálogo local.
 */
export async function fetchProducts(opts: { revalidate?: number } = {}): Promise<StoreProduct[]> {
  if (!URL || !KEY) return localProducts;
  try {
    const res = await fetch(`${URL}/rest/v1/products?select=*&active=eq.true&order=sort_order.asc`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
      ...(typeof window === "undefined" ? { next: { revalidate: opts.revalidate ?? 30 } } : { cache: "no-store" }),
    } as RequestInit);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as ProductRow[];
    return rows.length ? rows.map(rowToProduct) : localProducts;
  } catch {
    return localProducts;
  }
}

export async function fetchProduct(slug: string): Promise<StoreProduct | undefined> {
  const list = await fetchProducts();
  return list.find((p) => p.slug === slug || p.legacySlugs?.includes(slug));
}
