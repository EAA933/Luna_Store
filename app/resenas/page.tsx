// app/resenas/page.tsx
"use client";

// Formulario para que clientes con pedido real dejen su reseña.
// El folio + correo se validan en Supabase (función submit_review).
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, CheckCircle2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

const campo =
  "mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-4 py-3 text-sm outline-none focus:border-[rgb(var(--accent))]";

function Formulario() {
  const params = useSearchParams();
  const [folio, setFolio] = useState(params?.get("folio") || "");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (comment.trim().length < 10) return setError("Cuéntanos un poco más (mínimo 10 caracteres).");
    const sb = getSupabase();
    if (!sb) return setError("Las reseñas no están disponibles en este momento.");
    setEnviando(true);
    const { error } = await sb.rpc("submit_review", {
      p_folio: folio,
      p_email: email,
      p_name: name,
      p_rating: rating,
      p_comment: comment,
    });
    setEnviando(false);
    if (error) return setError(error.message);
    setListo(true);
  }

  if (listo) {
    return (
      <div className="text-center space-y-4 py-10">
        <CheckCircle2 className="w-12 h-12 mx-auto text-[rgb(var(--accent))]" />
        <h1 className="text-3xl font-semibold tracking-tight">¡Gracias por tu reseña!</h1>
        <p className="text-[rgb(var(--secondary))]">La revisaremos y aparecerá en la tienda en cuanto la publiquemos.</p>
        <Link href="/" className="btn-apple-primary inline-flex px-6 py-3 text-sm rounded-full">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-5">
      <div>
        <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">Reseñas</span>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] mt-1">Cuéntanos qué tal tus MIRAR.</h1>
        <p className="mt-2 text-sm text-[rgb(var(--secondary))]">
          Solo pueden opinar clientes con un pedido real: usa el folio que recibiste al comprar y el correo con el que lo hiciste.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          Folio del pedido
          <input required value={folio} onChange={(e) => setFolio(e.target.value)} placeholder="MR-XXXXXX" className={campo} />
        </label>
        <label className="block text-sm">
          Correo de la compra
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={campo} />
        </label>
      </div>

      <label className="block text-sm">
        Tu nombre (así aparecerá)
        <input required minLength={2} maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Ana G." className={campo} />
      </label>

      <div className="text-sm">
        Calificación
        <div className="mt-1 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} type="button" onClick={() => setRating(i)} onMouseEnter={() => setHover(i)} aria-label={`${i} estrellas`}>
              <Star className={`w-8 h-8 transition ${i <= (hover || rating) ? "fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" : "text-[rgb(var(--stroke))]"}`} />
            </button>
          ))}
        </div>
      </div>

      <label className="block text-sm">
        Tu opinión
        <textarea required rows={5} maxLength={800} value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder="¿Cómo te quedaron? ¿Qué tal la calidad y el envío?" className={campo} />
        <span className="text-xs text-[rgb(var(--secondary))]">{comment.length}/800</span>
      </label>

      {error && <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-500">{error}</p>}

      <button disabled={enviando} className="btn-apple-primary w-full py-3.5 text-sm font-medium rounded-full disabled:opacity-60">
        {enviando ? "Enviando…" : "Publicar reseña"}
      </button>
    </form>
  );
}

export default function ResenasPage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] px-5 sm:px-8 py-16">
      <div className="max-w-xl mx-auto">
        <Suspense>
          <Formulario />
        </Suspense>
      </div>
    </main>
  );
}
