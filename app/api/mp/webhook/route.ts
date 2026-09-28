// app/api/mp/webhook/route.ts — Mercado Pago avisa aquí cuando cambia un pago.
// No confiamos en lo que llega: consultamos el pago directo a Mercado Pago y,
// si quedó aprobado, te llega un WhatsApp.
import { NextResponse, type NextRequest } from "next/server";
import { obtenerPago, mpConfigurado } from "@/lib/server/mercadopago";
import { avisarWhatsApp, pesos } from "@/lib/server/notificar";

export const dynamic = "force-dynamic";

const avisados = new Set<string>(); // evita avisos repetidos mientras la función siga viva

export async function POST(req: NextRequest) {
  if (!mpConfigurado()) return NextResponse.json({ ok: true });

  const q = req.nextUrl.searchParams;
  const body = await req.json().catch(() => ({} as Record<string, any>));
  const tipo = body?.type || body?.topic || q.get("type") || q.get("topic");
  const id = String(body?.data?.id || q.get("data.id") || q.get("id") || "");
  if (tipo !== "payment" || !id) return NextResponse.json({ ok: true });

  try {
    const pago = await obtenerPago(id);
    if (pago.status === "approved" && !avisados.has(id)) {
      avisados.add(id);
      await avisarWhatsApp(
        `✅ *Pago aprobado* — pedido ${pago.external_reference}\n` +
          `${pesos(pago.transaction_amount)} MXN vía Mercado Pago (${pago.payment_method_id})\n` +
          `Operación #${pago.id}. Ya puedes preparar el envío.`
      );
    }
  } catch (e) {
    console.error("[mp] webhook", e);
  }
  return NextResponse.json({ ok: true });
}

export const GET = () => NextResponse.json({ ok: true });
