// components/Reviews.tsx
"use client";

// Reseñas de clientes reales (aprobadas en /admin). Si todavía no hay ninguna,
// la sección no se muestra.
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { useProducts } from "@/components/store/ProductsProvider";

export type Review = {
  id: string;
  created_at: string;
  order_folio: string;
  product_slug: string | null;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
};

export function Estrellas({ n, size = "w-4 h-4" }: { n: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} ${i <= n ? "fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" : "text-[rgb(var(--stroke))]"}`} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const productos = useProducts();

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(12)
      .then(({ data }) => data && setReviews(data as Review[]));
  }, []);

  if (reviews.length === 0) return null;

  const promedio = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <section className="w-full py-14 lg:py-20 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
              Opiniones de clientes
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] mt-1">Lo que dicen quienes ya los usan.</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-[rgb(var(--secondary))]">
              <Estrellas n={Math.round(promedio)} /> {promedio.toFixed(1)} de 5 · {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
            </p>
          </div>
          <Link href="/resenas" className="btn-apple-secondary px-5 py-2.5 text-sm rounded-full">
            Escribir una reseña
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => {
            const modelo = productos.find((p) => p.slug === r.product_slug)?.name;
            return (
              <figure key={r.id} className="p-6 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex flex-col">
                <Estrellas n={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed flex-1">“{r.comment}”</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[rgb(var(--stroke))] text-xs text-[rgb(var(--secondary))]">
                  <span className="font-semibold text-[rgb(var(--fg))]">{r.name}</span>
                  {modelo && <> · compró {modelo}</>} · Compra verificada
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
