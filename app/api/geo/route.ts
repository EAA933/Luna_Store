// app/api/geo/route.ts — ubica una dirección en el mapa (OpenStreetMap / Nominatim).
// Pasa por el servidor para no exponer la IP del cliente y cumplir las reglas de
// uso de Nominatim (identificarse y pocas consultas).
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type Resultado = { lat: string; lon: string; display_name: string; address?: Record<string, string> };

const normalizar = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

async function buscar(params: Record<string, string>): Promise<Resultado | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({ format: "jsonv2", limit: "3", addressdetails: "1", countrycodes: "mx", ...params }).toString();
  const res = await fetch(url, {
    headers: { "User-Agent": "MIRAR-tienda/1.0 (https://mirar-lentes.vercel.app)", "Accept-Language": "es" },
    signal: AbortSignal.timeout(6000),
    next: { revalidate: 86400 },
  });
  const data = (await res.json().catch(() => [])) as Resultado[];
  return data[0] || null;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const calle = q.get("street")?.trim().slice(0, 120) || "";
  const numero = q.get("number")?.trim().slice(0, 12) || "";
  const colonia = q.get("colonia")?.trim().slice(0, 80) || "";
  const ciudad = q.get("city")?.trim().slice(0, 80) || "";
  const estado = q.get("state")?.trim().slice(0, 40) || "";
  const cp = q.get("zip")?.replace(/\D/g, "").slice(0, 5) || "";
  if (!cp && !ciudad) return NextResponse.json({ found: false });

  // Descarta resultados de otro estado (Nominatim a veces encuentra una calle homónima lejos).
  const enEstado = (r: Resultado | null) =>
    r && (!estado || normalizar(r.display_name).includes(normalizar(estado).replace(/^estado de /, "")));

  // Palabra más distintiva de la calle (sin "Av.", "Calle"…) para confirmar que Nominatim
  // encontró esa calle y no otra de la misma colonia.
  const clave = normalizar(calle)
    .replace(/\b(av|avenida|calle|c|blvd|boulevard|bulevar|calz|calzada|prol|prolongacion|priv|privada|cerrada|andador|circuito|carretera|de|del|la|las|los|el)\b\.?/g, " ")
    .split(/[^a-z0-9]+/)
    .sort((a, b) => b.length - a.length)[0] || "";
  const esLaCalle = (r: Resultado) => !clave || normalizar(r.display_name).includes(clave);

  const calleNum = [numero, calle].filter(Boolean).join(" ");
  const intentos: { params: Record<string, string>; exacto: boolean }[] = [];
  if (calle) {
    // 1) Calle y número con código postal, ciudad y estado.
    intentos.push({ params: { street: calleNum, ...(ciudad && { city: ciudad }), ...(estado && { state: estado }), ...(cp && { postalcode: cp }) }, exacto: true });
    // 2) Texto libre con la colonia (OSM no tiene campo de colonia).
    intentos.push({ params: { q: [`${calle} ${numero}`.trim(), colonia, cp, ciudad, estado].filter(Boolean).join(", ") }, exacto: true });
    // 3) Calle sin código postal (a veces el CP en OSM está incompleto).
    intentos.push({ params: { street: calleNum, ...(ciudad && { city: ciudad }), ...(estado && { state: estado }) }, exacto: true });
  }
  // 4) Solo la colonia; 5) solo el código postal.
  if (colonia) intentos.push({ params: { q: [colonia, cp, ciudad, estado].filter(Boolean).join(", ") }, exacto: false });
  if (cp) intentos.push({ params: { postalcode: cp }, exacto: false });
  // 6) Al menos la ciudad.
  if (ciudad) intentos.push({ params: { q: [ciudad, estado].filter(Boolean).join(", ") }, exacto: false });

  try {
    for (const intento of intentos) {
      const r = await buscar(intento.params);
      if (enEstado(r) && (!intento.exacto || esLaCalle(r!))) {
        return NextResponse.json({ found: true, exacto: intento.exacto, lat: Number(r!.lat), lon: Number(r!.lon), label: r!.display_name });
      }
    }
    return NextResponse.json({ found: false });
  } catch {
    return NextResponse.json({ found: false });
  }
}
