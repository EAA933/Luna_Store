"use client";

// Tarifas de envío por zona. El precio se guarda al salir del campo y la tienda
// lo usa de inmediato (el servidor lo vuelve a calcular al crear el pedido).
import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { ENVIO_GRATIS_DESDE, ESTADOS_MX, type ZonaEnvio } from "@/lib/tienda";
import { mxn } from "./tipos";

function Zona({ z, zonas, recargar }: { z: ZonaEnvio; zonas: ZonaEnvio[]; recargar: () => void }) {
  const [precio, setPrecio] = useState(String(z.price));
  const [aviso, setAviso] = useState<string | null>(null);

  async function guardarPrecio() {
    const n = Math.round(Number(precio));
    if (!Number.isFinite(n) || n < 0) { setPrecio(String(z.price)); return; }
    if (n === z.price) return;
    const { error } = await getSupabase()!.from("shipping_zones").update({ price: n }).eq("id", z.id);
    setAviso(error ? error.message : "Guardado");
    if (!error) recargar();
  }

  /** Pasa un estado de otra zona a esta. */
  async function moverAqui(estado: string) {
    const sb = getSupabase()!;
    const origen = zonas.find((o) => o.states.includes(estado));
    if (origen) {
      const { error } = await sb.from("shipping_zones").update({ states: origen.states.filter((s) => s !== estado) }).eq("id", origen.id);
      if (error) return setAviso(error.message);
    }
    const { error } = await sb.from("shipping_zones").update({ states: [...z.states, estado] }).eq("id", z.id);
    setAviso(error ? error.message : null);
    recargar();
  }

  const otros = ESTADOS_MX.filter((e) => !z.states.includes(e));

  return (
    <li className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="font-semibold">{z.name}</h3>
        <label className="ml-auto flex items-center gap-2 text-sm">
          Costo
          <span className="flex items-center rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-3 py-1.5">
            $<input value={precio} onChange={(e) => setPrecio(e.target.value.replace(/[^\d]/g, ""))} onBlur={guardarPrecio}
              inputMode="numeric" className="w-16 bg-transparent text-right outline-none tabular-nums" />
          </span>
        </label>
        {aviso && <span className="text-xs text-[rgb(var(--secondary))]">{aviso}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {z.states.map((s) => (
          <span key={s} className="rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-2.5 py-1 text-xs">{s}</span>
        ))}
      </div>
      <label className="block text-xs text-[rgb(var(--secondary))]">
        Pasar un estado a esta zona:{" "}
        <select value="" onChange={(e) => e.target.value && moverAqui(e.target.value)}
          className="ml-1 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-3 py-1 text-xs">
          <option value="">Elegir…</option>
          {otros.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
      </label>
    </li>
  );
}

export default function Envios() {
  const [zonas, setZonas] = useState<ZonaEnvio[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const { data, error } = await getSupabase()!.from("shipping_zones").select("*").order("sort_order");
    if (error) setError(error.message); else setZonas(data as ZonaEnvio[]);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!zonas) return <p className="text-sm text-[rgb(var(--secondary))]">Cargando…</p>;

  const sinZona = ESTADOS_MX.filter((e) => !zonas.some((z) => z.states.includes(e)));

  return (
    <div className="space-y-4">
      <p className="text-sm text-[rgb(var(--secondary))]">
        El cliente elige su estado al pagar y se le cobra el costo de su zona. Las compras desde {mxn(ENVIO_GRATIS_DESDE)} tienen
        envío gratis.
      </p>
      {sinZona.length > 0 && (
        <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-600">
          Estos estados no tienen zona y no podrán comprar: {sinZona.join(", ")}.
        </p>
      )}
      <ul className="space-y-3">
        {zonas.map((z) => <Zona key={z.id + z.price + z.states.length} z={z} zonas={zonas} recargar={cargar} />)}
      </ul>
    </div>
  );
}
