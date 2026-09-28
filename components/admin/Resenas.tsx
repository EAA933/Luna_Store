"use client";

// Moderación de reseñas: llegan ocultas; aquí las publicas, ocultas o borras.
import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { ProductRow } from "@/lib/catalog";
import { Estrellas, type Review } from "@/components/Reviews";
import { fecha } from "./tipos";

export default function Resenas({ products, onPendientes }: { products: ProductRow[]; onPendientes: (n: number) => void }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const { data, error } = await getSupabase()!.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) return setError(error.message);
    const lista = data as Review[];
    setReviews(lista);
    onPendientes(lista.filter((r) => !r.approved).length);
  }, [onPendientes]);

  useEffect(() => { cargar(); }, [cargar]);

  async function aprobar(r: Review, approved: boolean) {
    const { error } = await getSupabase()!.from("reviews").update({ approved }).eq("id", r.id);
    if (error) setError(error.message); else cargar();
  }

  async function borrar(r: Review) {
    if (!confirm(`¿Borrar la reseña de ${r.name}? No se puede deshacer.`)) return;
    const { error } = await getSupabase()!.from("reviews").delete().eq("id", r.id);
    if (error) setError(error.message); else cargar();
  }

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!reviews) return <p className="text-sm text-[rgb(var(--secondary))]">Cargando…</p>;
  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[rgb(var(--stroke))] p-10 text-center text-sm text-[rgb(var(--secondary))]">
        Todavía no hay reseñas. Tus clientes pueden dejarla en /resenas con su folio y correo.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {reviews.map((r) => (
        <li key={r.id} className={`rounded-2xl border bg-[rgb(var(--card))] p-4 ${r.approved ? "border-[rgb(var(--stroke))]" : "border-amber-500/40"}`}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Estrellas n={r.rating} />
            <span className="text-sm font-semibold">{r.name}</span>
            <span className="font-mono text-xs text-[rgb(var(--secondary))]">{r.order_folio}</span>
            <span className="text-xs text-[rgb(var(--secondary))]">
              {products.find((p) => p.slug === r.product_slug)?.name || r.product_slug} · {fecha(r.created_at)}
            </span>
            <span className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-medium ${r.approved ? "border-emerald-500/40 text-emerald-500" : "border-amber-500/40 text-amber-500"}`}>
              {r.approved ? "Publicada" : "Pendiente"}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{r.comment}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => aprobar(r, !r.approved)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--accent))] px-3.5 py-1.5 text-xs font-semibold text-[rgb(var(--accent-fg))]">
              {r.approved ? <><EyeOff className="w-3.5 h-3.5" /> Ocultar</> : <><Eye className="w-3.5 h-3.5" /> Publicar</>}
            </button>
            <button onClick={() => borrar(r)} className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--stroke))] px-3.5 py-1.5 text-xs">
              <Trash2 className="w-3.5 h-3.5" /> Borrar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
