// Tipos y utilidades compartidas del panel de administrador.
export type OrderStatus = "nuevo" | "confirmado" | "enviado" | "entregado" | "cancelado";

export type OrderItem = { slug: string; name: string; ref?: string; price: number; qty: number };

export type Order = {
  id: string;
  folio: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  admin_notes: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
};

export const ESTADOS: { id: OrderStatus; label: string; color: string }[] = [
  { id: "nuevo", label: "Nuevo", color: "bg-red-500/15 text-red-500 border-red-500/30" },
  { id: "confirmado", label: "Confirmado", color: "bg-amber-500/15 text-amber-500 border-amber-500/30" },
  { id: "enviado", label: "Enviado", color: "bg-sky-500/15 text-sky-500 border-sky-500/30" },
  { id: "entregado", label: "Entregado", color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" },
  { id: "cancelado", label: "Cancelado", color: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" },
];

export const PAGOS: Record<string, string> = {
  card: "Tarjeta",
  spei: "Transferencia SPEI",
  oxxo: "Efectivo OXXO",
};

export const mxn = (n: number) => `$${Math.round(n).toLocaleString("es-MX")}`;

export const fecha = (iso: string) =>
  new Date(iso).toLocaleString("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

/** Pedidos que cuentan como venta (todo menos cancelados). */
export const esVenta = (o: Order) => o.status !== "cancelado";
