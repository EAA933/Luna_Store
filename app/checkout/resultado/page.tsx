// app/checkout/resultado/page.tsx — a donde regresa el cliente después de Mercado Pago.
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useCartStore } from "@/components/cart/useCart";

type Estado = "cargando" | "pagado" | "pendiente" | "rechazado" | "reembolsado";

function Resultado() {
  const params = useSearchParams();
  const folio = params?.get("folio") || "";
  const [estado, setEstado] = useState<Estado>("cargando");
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
    if (!folio) return setEstado("pendiente");
    let intentos = 0;
    let vivo = true;
    // Mercado Pago puede tardar unos segundos en registrar el pago.
    const consultar = async () => {
      const r = await fetch(`/api/mp/estado?folio=${encodeURIComponent(folio)}`).then((x) => x.json()).catch(() => null);
      if (!vivo) return;
      const e: Estado = r?.estado || "pendiente";
      setEstado(e);
      if (e === "pendiente" && ++intentos < 5) setTimeout(consultar, 3000);
    };
    consultar();
    return () => { vivo = false; };
  }, [folio, clear]);

  const vistas: Record<Estado, { icon: typeof Clock; titulo: string; texto: string; color: string }> = {
    cargando: { icon: Clock, titulo: "Confirmando tu pago…", texto: "Esto toma solo unos segundos.", color: "text-[rgb(var(--secondary))]" },
    pagado: { icon: CheckCircle2, titulo: "¡Pago recibido!", texto: "Tu pedido está confirmado. Te avisaremos cuando tus lentes vayan en camino.", color: "text-emerald-500" },
    pendiente: { icon: Clock, titulo: "Pago en proceso", texto: "Si pagaste en efectivo (OXXO), se confirmará automáticamente cuando se acredite.", color: "text-amber-500" },
    rechazado: { icon: XCircle, titulo: "El pago no se completó", texto: "No se hizo ningún cargo. Puedes volver a intentarlo desde tu bolsa.", color: "text-red-500" },
    reembolsado: { icon: XCircle, titulo: "Pago reembolsado", texto: "Este pago fue devuelto a tu medio de pago.", color: "text-[rgb(var(--secondary))]" },
  };
  const v = vistas[estado];
  const Icon = v.icon;

  return (
    <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl shadow-xl text-center bg-[rgb(var(--card))] border border-[rgb(var(--stroke))]">
      <Icon className={`w-14 h-14 mx-auto mb-5 ${v.color}`} />
      <p className="font-mono text-xs text-[rgb(var(--secondary))] mb-2">PEDIDO {folio}</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-3">{v.titulo}</h1>
      <p className="text-sm text-[rgb(var(--secondary))] mb-6">{v.texto}</p>
      <div className="space-y-3">
        <Link href="/catalog" className="btn-apple-secondary w-full py-3 text-sm rounded-full inline-flex justify-center">
          Volver a la tienda
        </Link>
      </div>
      {estado === "pagado" && (
        <p className="mt-5 text-[11px] text-[rgb(var(--secondary))]">
          Cuando recibas tus lentes, puedes <Link href={`/resenas?folio=${folio}`} className="underline">dejar tu reseña</Link> con este folio.
        </p>
      )}
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <main className="w-full min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] px-5 py-12 flex items-center justify-center">
      <Suspense>
        <Resultado />
      </Suspense>
    </main>
  );
}
