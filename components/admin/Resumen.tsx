"use client";

// Indicadores de ventas e inventario calculados sobre los pedidos y productos.
import { AlertTriangle, DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";
import type { ProductRow } from "@/lib/catalog";
import { ESTADOS, esVenta, mxn, type Order } from "./tipos";

function Tarjeta({ titulo, valor, detalle, icon: Icon }: { titulo: string; valor: string; detalle?: string; icon: typeof DollarSign }) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5">
      <div className="flex items-center justify-between text-[rgb(var(--secondary))]">
        <span className="text-xs uppercase tracking-wider">{titulo}</span>
        <Icon className="w-4 h-4" />
      </div>
      <p className="mt-3 text-3xl font-semibold tabular-nums">{valor}</p>
      {detalle && <p className="mt-1 text-xs text-[rgb(var(--secondary))]">{detalle}</p>}
    </div>
  );
}

export default function Resumen({ orders, products, irA }: { orders: Order[]; products: ProductRow[]; irA: (t: "pedidos" | "productos") => void }) {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  const ventas = orders.filter(esVenta);
  const delMes = ventas.filter((o) => new Date(o.created_at) >= inicioMes);
  const ingresosMes = delMes.reduce((a, o) => a + o.subtotal, 0);
  const ingresosTotal = ventas.reduce((a, o) => a + o.subtotal, 0);
  const ticket = ventas.length ? ingresosTotal / ventas.length : 0;
  const nuevos = orders.filter((o) => o.status === "nuevo").length;

  // Unidades e ingresos por modelo.
  const porModelo = new Map<string, { name: string; qty: number; ingresos: number }>();
  for (const o of ventas) for (const it of o.items || []) {
    const cur = porModelo.get(it.slug) || { name: it.name, qty: 0, ingresos: 0 };
    cur.qty += it.qty;
    cur.ingresos += it.price * it.qty;
    porModelo.set(it.slug, cur);
  }
  const ranking = Array.from(porModelo.values()).sort((a, b) => b.qty - a.qty);
  const maxQty = Math.max(1, ...ranking.map((r) => r.qty));
  const unidades = ranking.reduce((a, r) => a + r.qty, 0);

  // Ventas de los últimos 14 días.
  const dias = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - 13 + i);
    const sig = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    const total = ventas.filter((o) => { const c = new Date(o.created_at); return c >= d && c < sig; }).reduce((a, o) => a + o.subtotal, 0);
    return { d, total };
  });
  const maxDia = Math.max(1, ...dias.map((x) => x.total));

  const activos = products.filter((p) => p.active);
  const bajos = activos.filter((p) => p.stock <= p.stock_alert).sort((a, b) => a.stock - b.stock);
  const piezas = activos.reduce((a, p) => a + p.stock, 0);
  const valorInventario = activos.reduce((a, p) => a + p.stock * p.price, 0);

  return (
    <div className="space-y-6">
      {nuevos > 0 && (
        <button onClick={() => irA("pedidos")} className="w-full text-left rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-500">
          Tienes {nuevos} {nuevos === 1 ? "pedido nuevo" : "pedidos nuevos"} por confirmar →
        </button>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Tarjeta titulo="Ventas del mes" valor={mxn(ingresosMes)} detalle={`${delMes.length} pedidos este mes`} icon={DollarSign} />
        <Tarjeta titulo="Ventas totales" valor={mxn(ingresosTotal)} detalle={`${ventas.length} pedidos · ${unidades} piezas`} icon={TrendingUp} />
        <Tarjeta titulo="Ticket promedio" valor={mxn(ticket)} detalle="Por pedido (sin cancelados)" icon={ShoppingBag} />
        <Tarjeta titulo="Inventario" valor={`${piezas} pzs`} detalle={`Valor a precio de venta: ${mxn(valorInventario)}`} icon={Package} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5">
          <h2 className="font-semibold">Ventas de los últimos 14 días</h2>
          <div className="mt-5 flex h-40 items-end gap-1.5">
            {dias.map(({ d, total }) => (
              <div key={d.toISOString()} className="group relative flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full rounded-t-md bg-[rgb(var(--accent))]/80 group-hover:bg-[rgb(var(--accent))] transition-all"
                  style={{ height: `${(total / maxDia) * 100}%`, minHeight: total ? 4 : 1 }} />
                <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-[rgb(var(--fg))] px-2 py-0.5 text-[10px] text-[rgb(var(--bg))] opacity-0 group-hover:opacity-100">{mxn(total)}</span>
                <span className="mt-1.5 text-[10px] text-[rgb(var(--secondary))]">{d.getDate()}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5">
          <h2 className="font-semibold">Pedidos por estado</h2>
          <ul className="mt-4 space-y-2.5">
            {ESTADOS.map((e) => {
              const n = orders.filter((o) => o.status === e.id).length;
              return (
                <li key={e.id} className="flex items-center gap-3 text-sm">
                  <span className={`w-28 rounded-full border px-2.5 py-0.5 text-xs text-center ${e.color}`}>{e.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-[rgb(var(--card-warm))] overflow-hidden">
                    <div className="h-full bg-[rgb(var(--accent))]" style={{ width: `${orders.length ? (n / orders.length) * 100 : 0}%` }} />
                  </div>
                  <span className="w-8 text-right tabular-nums">{n}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5">
          <h2 className="font-semibold">Modelos más vendidos</h2>
          {ranking.length === 0 ? (
            <p className="mt-4 text-sm text-[rgb(var(--secondary))]">Aún no hay ventas registradas.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {ranking.map((r) => (
                <li key={r.name} className="text-sm">
                  <div className="flex justify-between"><span className="font-medium">{r.name}</span><span className="tabular-nums text-[rgb(var(--secondary))]">{r.qty} pzs · {mxn(r.ingresos)}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-[rgb(var(--card-warm))] overflow-hidden">
                    <div className="h-full bg-[rgb(var(--accent))]" style={{ width: `${(r.qty / maxQty) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Stock bajo</h2>
            <button onClick={() => irA("productos")} className="text-xs text-[rgb(var(--accent))] hover:underline">Ajustar inventario →</button>
          </div>
          {bajos.length === 0 ? (
            <p className="mt-4 text-sm text-[rgb(var(--secondary))]">Todo en orden: ningún modelo está en su nivel de alerta.</p>
          ) : (
            <ul className="mt-4 divide-y divide-[rgb(var(--stroke))]">
              {bajos.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <AlertTriangle className={`w-4 h-4 ${p.stock === 0 ? "text-red-500" : "text-amber-500"}`} />
                  <span className="flex-1">{p.name} <span className="text-[rgb(var(--secondary))]">({p.ref})</span></span>
                  <span className={`font-semibold tabular-nums ${p.stock === 0 ? "text-red-500" : "text-amber-500"}`}>{p.stock === 0 ? "Agotado" : `${p.stock} pzs`}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
