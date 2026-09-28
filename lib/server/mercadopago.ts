// lib/server/mercadopago.ts — Mercado Pago Checkout Pro (solo servidor).
//   MP_ACCESS_TOKEN → Access Token de tu cuenta (Tus integraciones → Credenciales).
//                     Usa primero el de prueba (TEST-...) y luego el de producción (APP_USR-...).

const API = "https://api.mercadopago.com";

export const mpConfigurado = () => Boolean(process.env.MP_ACCESS_TOKEN);

async function mp<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Mercado Pago ${res.status}: ${data?.message || "error"}`);
  return data as T;
}

export type LineaPedido = { slug: string; name: string; ref?: string; price: number; qty: number };

/** Crea la preferencia de pago y devuelve la URL a la que se manda al cliente. */
export async function crearPreferencia(opts: {
  folio: string;
  items: LineaPedido[];
  email: string;
  nombre: string;
  origin: string;
}): Promise<string> {
  const https = opts.origin.startsWith("https://");
  const volver = (estado: string) => `${opts.origin}/checkout/resultado?folio=${encodeURIComponent(opts.folio)}&r=${estado}`;

  const pref = await mp<{ init_point: string }>("/checkout/preferences", {
    method: "POST",
    headers: { "X-Idempotency-Key": `pref-${opts.folio}` },
    body: JSON.stringify({
      external_reference: opts.folio,
      items: opts.items.map((i) => ({
        id: i.slug,
        title: `MIRAR ${i.name}${i.ref ? ` (${i.ref})` : ""}`,
        quantity: i.qty,
        unit_price: i.price,
        currency_id: "MXN",
      })),
      payer: { email: opts.email, name: opts.nombre },
      back_urls: { success: volver("ok"), pending: volver("pendiente"), failure: volver("error") },
      // Mercado Pago solo acepta regreso automático y avisos hacia URLs públicas https.
      ...(https ? { auto_return: "approved", notification_url: `${opts.origin}/api/mp/webhook` } : {}),
      statement_descriptor: "MIRAR",
    }),
  });
  return pref.init_point;
}

export type Pago = {
  id: number;
  status: string; // approved | pending | in_process | rejected | cancelled | refunded ...
  status_detail: string;
  external_reference: string | null;
  transaction_amount: number;
  payment_method_id: string;
  payment_type_id: string;
};

export const obtenerPago = (id: string) => mp<Pago>(`/v1/payments/${encodeURIComponent(id)}`);

/** El pago más relevante de un folio: el aprobado si lo hay; si no, el más reciente. */
export async function pagoDeFolio(folio: string): Promise<Pago | null> {
  const r = await mp<{ results: Pago[] }>(
    `/v1/payments/search?external_reference=${encodeURIComponent(folio)}&sort=date_created&criteria=desc`
  );
  const lista = r.results || [];
  return lista.find((p) => p.status === "approved") || lista[0] || null;
}

/** Traduce el estado de Mercado Pago al estado de pago de la tienda. */
export function estadoTienda(status: string | undefined): "pagado" | "pendiente" | "rechazado" | "reembolsado" {
  if (status === "approved") return "pagado";
  if (status === "refunded" || status === "charged_back") return "reembolsado";
  if (status === "rejected" || status === "cancelled") return "rechazado";
  return "pendiente";
}
