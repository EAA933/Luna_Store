// app/api/mp/webhook/route.ts — Mercado Pago avisa aquí cuando cambia un pago.
// No confiamos en lo que llega: consultamos el pago directo a Mercado Pago y,
// si quedó aprobado, te llega un WhatsApp y al cliente su correo de confirmación.
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { obtenerPago, mpConfigurado } from "@/lib/server/mercadopago";
import { avisarWhatsApp, pesos } from "@/lib/server/notificar";
import { correoPagoConfirmado } from "@/lib/server/correo";

export const dynamic = "force-dynamic";

/** Mercado Pago avisa varias veces del mismo pago; solo el primer aviso cuenta. */
async function primerAviso(pagoId: string, folio: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return true;
  const sb = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await sb.rpc("claim_payment_notice", { p_payment_id: pagoId, p_folio: folio });
  return error ? true : Boolean(data);
}

export async function POST(req: NextRequest) {
  if (!mpConfigurado()) return NextResponse.json({ ok: true });

  const q = req.nextUrl.searchParams;
  const body = await req.json().catch(() => ({} as Record<string, any>));
  const tipo = body?.type || body?.topic || q.get("type") || q.get("topic");
  const id = String(body?.data?.id || q.get("data.id") || q.get("id") || "");
  if (tipo !== "payment" || !id) return NextResponse.json({ ok: true });

  try {
    const pago = await obtenerPago(id);
    const folio = pago.external_reference || pago.metadata?.folio || "";
    if (pago.status === "approved" && folio && (await primerAviso(String(pago.id), folio))) {
      await avisarWhatsApp(
        `✅ *Pago aprobado* — pedido ${folio}\n` +
          `${pesos(pago.transaction_amount)} MXN vía Mercado Pago (${pago.payment_method_id})\n` +
          `Operación #${pago.id}. Ya puedes preparar el envío.`
      );
      const email = pago.metadata?.email;
      if (email) {
        await correoPagoConfirmado({
          para: email,
          nombre: pago.metadata?.nombre || "",
          folio,
          lineas: (pago.additional_info?.items || []).map((i) => ({
            titulo: i.title,
            cantidad: Number(i.quantity) || 1,
            precio: Number(i.unit_price) || 0,
          })),
          total: pago.transaction_amount,
          sitio: process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin,
        });
      }
    }
  } catch (e) {
    console.error("[mp] webhook", e);
  }
  return NextResponse.json({ ok: true });
}

export const GET = () => NextResponse.json({ ok: true });
