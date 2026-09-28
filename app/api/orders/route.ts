// app/api/orders/route.ts — registra el pedido, te avisa por WhatsApp y,
// si el cliente eligió Mercado Pago, crea el link de pago.
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { avisarWhatsApp, pesos } from "@/lib/server/notificar";
import { crearPreferencia, mpConfigurado, type LineaPedido } from "@/lib/server/mercadopago";
import { envioGratis } from "@/lib/tienda";

export const dynamic = "force-dynamic";

type Body = {
  customer: { name: string; email: string; phone: string; address: string; city: string; zip: string; payment: string };
  items: { slug: string; qty: number }[];
};

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "Tienda sin base de datos configurada." }, { status: 503 });

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Solo se cobra con Mercado Pago.
  if (!mpConfigurado()) return NextResponse.json({ error: "Los pagos no están disponibles en este momento." }, { status: 503 });
  const customer = { ...body.customer, payment: "mercadopago" };

  // Precios y stock los decide la base (create_order), nunca el navegador.
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await sb.rpc("create_order", { p_customer: customer, p_items: body.items });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const pedido = data as { folio: string; items: LineaPedido[]; subtotal: number };

  let pagoUrl: string | null = null;
  try {
    pagoUrl = await crearPreferencia({
      folio: pedido.folio,
      items: pedido.items,
      email: customer.email,
      nombre: customer.name,
      origin: process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin,
    });
  } catch (e) {
    console.error("[mp] preferencia", e);
  }

  const lineas = pedido.items.map((i) => `• ${i.name} x${i.qty} — ${pesos(i.price * i.qty)}`).join("\n");
  await avisarWhatsApp(
    [
      `🛍️ *Nuevo pedido ${pedido.folio}*`,
      lineas,
      `*Total: ${pesos(pedido.subtotal)} MXN* (${envioGratis(pedido.subtotal) ? "envío gratis" : "envío por cotizar"})`,
      "",
      `👤 ${customer.name}`,
      customer.phone ? `📱 ${customer.phone}` : "",
      `✉️ ${customer.email}`,
      `📍 ${customer.address}, ${customer.city}, C.P. ${customer.zip}`,
      pagoUrl ? "💳 Mercado Pago — esperando pago" : "⚠️ No se pudo generar el link de Mercado Pago; cancela este pedido en /admin.",
    ]
      .filter(Boolean)
      .join("\n")
  );

  if (!pagoUrl) return NextResponse.json({ error: "No pudimos conectar con Mercado Pago. Inténtalo de nuevo." }, { status: 502 });
  return NextResponse.json({ ...pedido, pagoUrl });
}
