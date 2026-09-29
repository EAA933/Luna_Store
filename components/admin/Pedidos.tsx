"use client";

// Bandeja de pedidos: filtrar, buscar, cambiar estado, notas internas y
// contacto con el cliente. Cancelar un pedido regresa las piezas al inventario.
import { useMemo, useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle, Search } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { ProductRow } from "@/lib/catalog";
import { ESTADOS, PAGOS, fecha, mxn, type Order, type OrderStatus } from "./tipos";

function Estado({ status }: { status: OrderStatus }) {
  const e = ESTADOS.find((x) => x.id === status)!;
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${e.color}`}>{e.label}</span>;
}

function Pago({ o }: { o: Order }) {
  const s = o.payment_status || "pendiente";
  const estilos: Record<string, string> = {
    pagado: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    pendiente: "bg-zinc-500/10 text-[rgb(var(--secondary))] border-[rgb(var(--stroke))]",
    rechazado: "bg-red-500/15 text-red-500 border-red-500/30",
    reembolsado: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };
  const texto = s === "pagado" ? "Pagado ✓" : s === "pendiente" ? "Sin pagar" : s === "rechazado" ? "Pago rechazado" : "Reembolsado";
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${estilos[s]}`}>{texto}</span>;
}

/** Enlace de WhatsApp al cliente (asume lada de México si viene a 10 dígitos). */
function waCliente(o: Order) {
  let d = (o.phone || "").replace(/\D/g, "");
  if (!d) return null;
  if (d.length === 10) d = "52" + d;
  const texto = `Hola ${o.customer_name.split(" ")[0]}, te escribimos de MIRAR por tu pedido ${o.folio}.`;
  return `https://wa.me/${d}?text=${encodeURIComponent(texto)}`;
}

function TarjetaPedido({ o, products, recargar }: { o: Order; products: ProductRow[]; recargar: () => void }) {
  const [abierto, setAbierto] = useState(o.status === "nuevo");
  const [notas, setNotas] = useState(o.admin_notes || "");
  const [guardando, setGuardando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  async function ajustarStock(signo: 1 | -1) {
    const sb = getSupabase()!;
    for (const it of o.items || []) {
      const p = products.find((x) => x.slug === it.slug);
      if (!p) continue;
      const nuevo = p.stock + signo * it.qty;
      if (nuevo < 0) throw new Error(`No hay stock suficiente de ${p.name} para reactivar el pedido.`);
      const { error } = await sb.from("products").update({ stock: nuevo }).eq("id", p.id);
      if (error) throw error;
    }
  }

  async function cambiarEstado(status: OrderStatus) {
    if (status === o.status) return;
    if (status === "cancelado" && !confirm(`¿Cancelar el pedido ${o.folio}? Las piezas regresarán al inventario.`)) return;
    setGuardando(true);
    setAviso(null);
    try {
      if (status === "cancelado") await ajustarStock(1);
      if (o.status === "cancelado") await ajustarStock(-1);
      const { error } = await getSupabase()!.from("orders").update({ status }).eq("id", o.id);
      if (error) throw error;
      recargar();
    } catch (e) {
      setAviso(e instanceof Error ? e.message : "No se pudo actualizar el pedido.");
    }
    setGuardando(false);
  }

  async function marcarPagado() {
    setGuardando(true);
    const cambios = { payment_status: "pagado", ...(o.status === "nuevo" ? { status: "confirmado" } : {}) };
    const { error } = await getSupabase()!.from("orders").update(cambios).eq("id", o.id);
    setGuardando(false);
    if (error) setAviso(error.message); else recargar();
  }

  async function guardarNotas() {
    setGuardando(true);
    const { error } = await getSupabase()!.from("orders").update({ admin_notes: notas }).eq("id", o.id);
    setAviso(error ? error.message : "Notas guardadas.");
    setGuardando(false);
    if (!error) recargar();
  }

  const wa = waCliente(o);
  const piezas = (o.items || []).reduce((a, i) => a + i.qty, 0);

  return (
    <li className={`rounded-2xl border bg-[rgb(var(--card))] ${o.status === "nuevo" ? "border-red-500/40" : "border-[rgb(var(--stroke))]"}`}>
      <button onClick={() => setAbierto(!abierto)} className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 p-4 text-left">
        <span className="font-mono text-sm font-semibold">{o.folio}</span>
        <Estado status={o.status} />
        <Pago o={o} />
        <span className="text-sm">{o.customer_name}</span>
        <span className="text-xs text-[rgb(var(--secondary))]">{fecha(o.created_at)}</span>
        <span className="ml-auto text-sm font-semibold tabular-nums">{mxn(o.total ?? o.subtotal)} <span className="font-normal text-[rgb(var(--secondary))]">· {piezas} pzs</span></span>
        <ChevronDown className={`w-4 h-4 transition ${abierto ? "rotate-180" : ""}`} />
      </button>

      {abierto && (
        <div className="grid gap-5 border-t border-[rgb(var(--stroke))] p-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-[rgb(var(--secondary))]">
                <tr><th className="pb-2 font-normal">Modelo</th><th className="pb-2 font-normal text-right">Cant.</th><th className="pb-2 font-normal text-right">Precio</th><th className="pb-2 font-normal text-right">Importe</th></tr>
              </thead>
              <tbody>
                {(o.items || []).map((it) => (
                  <tr key={it.slug} className="border-t border-[rgb(var(--stroke))]">
                    <td className="py-2">{it.name} {it.ref && <span className="text-[rgb(var(--secondary))]">({it.ref})</span>}</td>
                    <td className="py-2 text-right tabular-nums">{it.qty}</td>
                    <td className="py-2 text-right tabular-nums">{mxn(it.price)}</td>
                    <td className="py-2 text-right tabular-nums">{mxn(it.price * it.qty)}</td>
                  </tr>
                ))}
                <tr className="border-t border-[rgb(var(--stroke))]"><td className="pt-2" colSpan={3}>Envío</td><td className="pt-2 text-right tabular-nums">{o.shipping ? mxn(o.shipping) : "Gratis"}</td></tr>
                <tr className="font-semibold"><td className="pt-1" colSpan={3}>Total</td><td className="pt-1 text-right tabular-nums">{mxn(o.total ?? o.subtotal + (o.shipping || 0))}</td></tr>
              </tbody>
            </table>

            <label className="block text-sm">
              <span className="text-xs text-[rgb(var(--secondary))]">Notas internas (solo tú las ves)</span>
              <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={2}
                placeholder="Ej. Pagó por SPEI, guía de envío 123456…"
                className="mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-3 py-2 outline-none focus:border-[rgb(var(--accent))]" />
            </label>
            {notas !== (o.admin_notes || "") && (
              <button onClick={guardarNotas} disabled={guardando} className="rounded-full bg-[rgb(var(--accent))] px-4 py-1.5 text-xs font-semibold text-[rgb(var(--accent-fg))]">Guardar notas</button>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <label className="block">
              <span className="text-xs text-[rgb(var(--secondary))]">Estado del pedido</span>
              <select value={o.status} disabled={guardando} onChange={(e) => cambiarEstado(e.target.value as OrderStatus)}
                className="mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-3 py-2">
                {ESTADOS.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
              </select>
            </label>
            <div className="rounded-xl bg-[rgb(var(--bg))] p-3 space-y-1.5">
              <p className="font-medium">{o.customer_name}</p>
              <p className="flex items-start gap-2 text-[rgb(var(--secondary))]"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />{o.address}, {o.city}{o.state ? `, ${o.state}` : ""}, C.P. {o.zip}</p>
              {o.phone && <p className="text-[rgb(var(--secondary))]">Tel. {o.phone}</p>}
              <p className="text-[rgb(var(--secondary))]">Pago: {PAGOS[o.payment_method] || o.payment_method || "—"}</p>
              {o.mp_payment_id && <p className="text-[rgb(var(--secondary))]">Operación Mercado Pago #{o.mp_payment_id}</p>}
              {o.payment_method !== "mercadopago" && o.payment_status !== "pagado" && (
                <button onClick={() => marcarPagado()} disabled={guardando} className="mt-1 rounded-full border border-emerald-500/40 px-3 py-1 text-xs text-emerald-500">
                  Marcar como pagado
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {wa && (
                <a href={wa} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-semibold text-white">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              )}
              <a href={`mailto:${o.email}?subject=${encodeURIComponent(`Tu pedido MIRAR ${o.folio}`)}`} className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--stroke))] px-3.5 py-1.5 text-xs">
                <Mail className="w-3.5 h-3.5" /> {o.email}
              </a>
            </div>
            {aviso && <p className="text-xs text-[rgb(var(--secondary))]">{aviso}</p>}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Pedidos({ orders, products, recargar }: { orders: Order[]; products: ProductRow[]; recargar: () => void }) {
  const [filtro, setFiltro] = useState<OrderStatus | "todos">("todos");
  const [q, setQ] = useState("");

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return orders.filter((o) =>
      (filtro === "todos" || o.status === filtro) &&
      (!t || o.folio.toLowerCase().includes(t) || o.customer_name.toLowerCase().includes(t) || o.email.toLowerCase().includes(t))
    );
  }, [orders, filtro, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {[{ id: "todos" as const, label: "Todos" }, ...ESTADOS].map((e) => {
          const n = e.id === "todos" ? orders.length : orders.filter((o) => o.status === e.id).length;
          return (
            <button key={e.id} onClick={() => setFiltro(e.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${filtro === e.id ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]" : "border-[rgb(var(--stroke))] hover:bg-[rgb(var(--card))]"}`}>
              {e.label} · {n}
            </button>
          );
        })}
        <label className="ml-auto flex items-center gap-2 rounded-full border border-[rgb(var(--stroke))] px-3.5 py-1.5 text-sm">
          <Search className="w-3.5 h-3.5 text-[rgb(var(--secondary))]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Folio, cliente o correo" className="w-48 bg-transparent outline-none" />
        </label>
      </div>

      {lista.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[rgb(var(--stroke))] p-10 text-center text-sm text-[rgb(var(--secondary))]">
          {orders.length === 0 ? "Todavía no hay pedidos. Cuando alguien compre, aparecerá aquí y te llegará por WhatsApp." : "No hay pedidos con ese filtro."}
        </p>
      ) : (
        <ul className="space-y-3">{lista.map((o) => <TarjetaPedido key={o.id + o.updated_at} o={o} products={products} recargar={recargar} />)}</ul>
      )}
    </div>
  );
}
