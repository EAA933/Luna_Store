"use client";

// Muestra en el mapa la dirección que escribe el cliente, para que confirme que
// está bien antes de pagar. Usa OpenStreetMap (sin claves ni costo).
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

type Punto = { lat: number; lon: number; exacto: boolean; label: string };

type Props = { street: string; number: string; colonia: string; city: string; state: string; zip: string };

export default function MapaEntrega({ street, number, colonia, city, state, zip }: Props) {
  const [punto, setPunto] = useState<Punto | null>(null);
  const [buscando, setBuscando] = useState(false);

  const listo = zip.replace(/\D/g, "").length === 5 || (city.trim().length > 2 && state);

  useEffect(() => {
    if (!listo) { setPunto(null); return; }
    // Espera a que el cliente deje de escribir.
    const t = setTimeout(async () => {
      setBuscando(true);
      const qs = new URLSearchParams({ street, number, colonia, city, state, zip }).toString();
      const r = await fetch(`/api/geo?${qs}`).then((x) => x.json()).catch(() => null);
      setPunto(r?.found ? { lat: r.lat, lon: r.lon, exacto: r.exacto, label: r.label } : null);
      setBuscando(false);
    }, 900);
    return () => clearTimeout(t);
  }, [street, number, colonia, city, state, zip, listo]);

  if (!listo) return null;

  const d = punto?.exacto ? 0.004 : 0.015;
  const src = punto
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${punto.lon - d * 1.6},${punto.lat - d},${punto.lon + d * 1.6},${punto.lat + d}&layer=mapnik&marker=${punto.lat},${punto.lon}`
    : null;

  return (
    <div className="sm:col-span-2 space-y-2">
      <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
        {src ? (
          <iframe title="Ubicación de entrega" src={src} className="h-full w-full" loading="lazy" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-[rgb(var(--secondary))]">
            {buscando ? "Buscando tu dirección en el mapa…" : "No encontramos la dirección en el mapa; revisa tu código postal."}
          </div>
        )}
      </div>
      {punto && (
        <p className="flex items-start gap-1.5 text-[11px] text-[rgb(var(--secondary))]">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-px text-[rgb(var(--accent))]" />
          <span>
            {punto.exacto ? "Así ubicamos tu dirección." : "Ubicamos tu colonia; el repartidor usará tu dirección completa."} Si el punto
            no es correcto, revisa calle, número, colonia y código postal.
          </span>
        </p>
      )}
    </div>
  );
}
