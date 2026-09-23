// app/catalog/page.tsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// Ejemplo de datos (usa tu fuente real: Prisma, Sanity, etc.)
type Product = {
  id: string;
  slug: string;
  name: string;
  segment: "men" | "women" | "unisex";
  shape: "square" | "round" | "aviator" | "cat-eye" | "rectangle";
  lensColor: "smoke" | "ambar" | "verde" | "azul";
  material: "acetato" | "acero" | "TR90";
  price: number;
  image: string;
};

const memoryCatalog: Product[] = [
  {
    id: "1",
    slug: "orion",
    name: "ORION",
    segment: "men",
    shape: "rectangle",
    lensColor: "smoke",
    material: "acero",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=1600&q=80",
  },
  {
    id: "2",
    slug: "selene",
    name: "SELENE",
    segment: "women",
    shape: "round",
    lensColor: "ambar",
    material: "acetato",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1533239094043-9e9bbf1b1b35?w=1600&q=80",
  },
  {
    id: "3",
    slug: "vega",
    name: "VEGA",
    segment: "unisex",
    shape: "round",
    lensColor: "azul",
    material: "TR90",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&q=80",
  },
  {
    id: "4",
    slug: "lyra",
    name: "LYRA",
    segment: "women",
    shape: "cat-eye",
    lensColor: "verde",
    material: "acetato",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1606813903087-1635f6a16e90?w=1600&q=80",
  },
];

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const segmentInUrl = (searchParams.get("segment") || "") as
    | "men"
    | "women"
    | "unisex"
    | "";

  // estado UI
  const [q, setQ] = useState("");
  const [segment, setSegment] = useState<typeof segmentInUrl | "">(
    segmentInUrl || ""
  );
  const [shape, setShape] = useState<string>("");
  const [lens, setLens] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [price, setPrice] = useState<number>(3000);
  const dq = useDebounced(q, 250);

  // sincroniza segmento con URL cuando cambie
  useEffect(() => {
    setSegment(segmentInUrl || "");
  }, [segmentInUrl]);

  const filtered = useMemo(() => {
    return memoryCatalog.filter((p) => {
      return (
        (!dq ||
          p.name.toLowerCase().includes(dq.toLowerCase()) ||
          p.slug.toLowerCase().includes(dq.toLowerCase())) &&
        (!segment || p.segment === segment) &&
        (!shape || p.shape === (shape as any)) &&
        (!lens || p.lensColor === (lens as any)) &&
        (!material || p.material === (material as any)) &&
        p.price <= price
      );
    });
  }, [dq, segment, shape, lens, material, price]);

  function handleSegmentChange(val: "" | "men" | "women" | "unisex") {
    setSegment(val);
    const sp = new URLSearchParams(searchParams.toString());
    if (val) sp.set("segment", val);
    else sp.delete("segment");
    router.push(`/catalog?${sp.toString()}`);
  }

  return (
    <main className="w-full px-10 md:px-16 lg:px-24 py-16">
      {/* Título + chips */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display text-4xl md:text-5xl">Catálogo</h1>
          <p className="text-[rgb(var(--fg))]/70 mt-2">
            Explora por segmento, forma, material o color de mica.
          </p>
        </div>

        {/* Chips de segmento */}
        <div className="flex flex-wrap gap-3">
          {[
            { k: "", label: "Todos" },
            { k: "men", label: "Hombre" },
            { k: "women", label: "Mujer" },
            { k: "unisex", label: "Unisex" },
          ].map((s) => (
            <button
              key={s.k}
              onClick={() => handleSegmentChange(s.k as any)}
              className={[
                "px-4 py-2 rounded-full border transition",
                segment === (s.k as any)
                  ? "bg-[rgb(var(--accent))] text-white border-transparent"
                  : "border-[rgb(var(--stroke))] text-[rgb(var(--fg))] hover:bg-black/5 dark:hover:bg-white/10",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de filtros */}
      <section className="card p-5 mb-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar producto…"
            className="w-full rounded-lg border border-[rgb(var(--stroke))] bg-transparent px-3 py-2"
          />

          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="rounded-lg border border-[rgb(var(--stroke))] bg-transparent px-3 py-2"
          >
            <option value="">Forma</option>
            <option value="rectangle">Rectángulo</option>
            <option value="square">Cuadrado</option>
            <option value="round">Redondo</option>
            <option value="aviator">Aviador</option>
            <option value="cat-eye">Cat-eye</option>
          </select>

          <select
            value={lens}
            onChange={(e) => setLens(e.target.value)}
            className="rounded-lg border border-[rgb(var(--stroke))] bg-transparent px-3 py-2"
          >
            <option value="">Mica</option>
            <option value="smoke">Smoke</option>
            <option value="ambar">Ámbar</option>
            <option value="verde">Verde</option>
            <option value="azul">Azul</option>
          </select>

          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="rounded-lg border border-[rgb(var(--stroke))] bg-transparent px-3 py-2"
          >
            <option value="">Material</option>
            <option value="acetato">Acetato</option>
            <option value="acero">Acero</option>
            <option value="TR90">TR90</option>
          </select>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Precio máx.</label>
            <input
              type="range"
              min={1000}
              max={3000}
              step={100}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span className="text-sm mt-1">
              Hasta ${new Intl.NumberFormat("es-MX").format(price)} MXN
            </span>
          </div>
        </div>
      </section>

      {/* Grid WIDE: tarjetas rectangulares */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="group overflow-hidden rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] shadow-soft"
          >
            <Link href={`/product/${p.slug}`} className="block">
              <div className="w-full h-[260px] md:h-[300px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="text-[rgb(var(--fg))]/70 capitalize text-sm">
                    {p.segment} • {p.material}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ${p.price.toLocaleString("es-MX")}
                  </p>
                  <span className="underline text-[rgb(var(--accent))] text-sm">
                    Ver más
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {/* Estado vacío */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-[rgb(var(--fg))]/60">
          No encontramos resultados con esos filtros.
        </div>
      )}
    </main>
  );
}

// useSearchParams requiere un límite de Suspense para el prerender estático.
export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}
