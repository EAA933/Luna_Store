// app/api/mp/estado/route.ts — estado del pago de un folio (para la página de
// resultado y para que el panel marque los pedidos como pagados).
import { NextResponse, type NextRequest } from "next/server";
import { estadoTienda, mpConfigurado, pagoDeFolio } from "@/lib/server/mercadopago";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const folio = req.nextUrl.searchParams.get("folio")?.trim();
  if (!folio || !/^MR-[\w-]{4,24}$/i.test(folio)) return NextResponse.json({ error: "Folio inválido" }, { status: 400 });
  if (!mpConfigurado()) return NextResponse.json({ estado: "pendiente", configurado: false });

  try {
    const pago = await pagoDeFolio(folio);
    return NextResponse.json({
      estado: pago ? estadoTienda(pago.status) : "pendiente",
      detalle: pago?.status_detail ?? null,
      metodo: pago?.payment_method_id ?? null,
      pagoId: pago ? String(pago.id) : null,
    });
  } catch (e) {
    console.error("[mp] estado", e);
    return NextResponse.json({ error: "No se pudo consultar Mercado Pago" }, { status: 502 });
  }
}
