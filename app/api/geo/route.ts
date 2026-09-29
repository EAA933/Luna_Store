// app/api/geo/route.ts — ubica una dirección en el mapa (OpenStreetMap / Nominatim).
// Pasa por el servidor para no exponer la IP del cliente y cumplir las reglas de
// uso de Nominatim (identificarse y pocas consultas).
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const partes = {
    street: q.get("street")?.slice(0, 160) || "",
    city: q.get("city")?.slice(0, 80) || "",
    state: q.get("state")?.slice(0, 40) || "",
    postalcode: q.get("zip")?.replace(/\D/g, "").slice(0, 5) || "",
  };
  if (!partes.postalcode && !partes.city) return NextResponse.json({ found: false });

  const buscar = async (params: Record<string, string>) => {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.search = new URLSearchParams({ format: "jsonv2", limit: "1", countrycodes: "mx", ...params }).toString();
    const res = await fetch(url, {
      headers: { "User-Agent": "MIRAR-tienda/1.0 (https://mirar-lentes.vercel.app)", "Accept-Language": "es" },
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 86400 },
    });
    const data = (await res.json().catch(() => [])) as { lat: string; lon: string; display_name: string }[];
    return data[0] || null;
  };

  try {
    // Primero la dirección completa; si no la encuentra, al menos el código postal y la ciudad.
    const conCalle = Object.fromEntries(Object.entries(partes).filter(([, v]) => v));
    let r = partes.street ? await buscar(conCalle) : null;
    let exacto = Boolean(r);
    if (!r) {
      const { street: _omit, ...sinCalle } = conCalle;
      r = await buscar(sinCalle);
      exacto = false;
    }
    if (!r) return NextResponse.json({ found: false });
    return NextResponse.json({ found: true, exacto, lat: Number(r.lat), lon: Number(r.lon), label: r.display_name });
  } catch {
    return NextResponse.json({ found: false });
  }
}
