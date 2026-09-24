// app/catalog/page.tsx
"use client";

import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { products, SEGMENTOS } from "@/lib/products";
import { EASE, LineReveal } from "@/components/ui/Reveal";

type Segmento = keyof typeof SEGMENTOS | "";
type Orden = "destacados" | "precio-asc" | "precio-desc";

const unicos = (k: "shape" | "lensColor" | "material") => Array.from(new Set(products.map((p) => p[k]))).sort();

function Filtro({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className={`relative flex h-11 min-w-[150px] items-center border px-4 text-[15px] transition-colors ${value ? "border-ink" : "border-line hover:border-ink/40"}`}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-full w-full appearance-none bg-transparent pr-6 outline-none cursor-pointer">
        <option value="">{label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4" />
    </label>
  );
}

function CatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const segment = (params.get("segment") || "") as Segmento;
  const shape = params.get("shape") || "";

  const [lens, setLens] = useState("");
  const [material, setMaterial] = useState("");
  const [orden, setOrden] = useState<Orden>("destacados");

  // Segmento y forma viven en la URL para poder compartir el enlace.
  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params.toString());
    v ? next.set(k, v) : next.delete(k);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const lista = useMemo(() => {
    const r = products.filter((p) =>
      (!segment || p.segment === segment) &&
      (!shape || p.shape === shape) &&
      (!lens || p.lensColor === lens) &&
      (!material || p.material === material)
    );
    if (orden === "precio-asc") r.sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") r.sort((a, b) => b.price - a.price);
    return r;
  }, [segment, shape, lens, material, orden]);

  const hayFiltros = !!(shape || lens || material);
  const titulo = segment ? `Lentes de sol · ${SEGMENTOS[segment]}` : "Todos los lentes de sol";

  return (
    <main className="container py-12 md:py-16">
      <p className="eyebrow">Catálogo</p>
      <LineReveal key={titulo} as="h1" lines={[titulo]} className="mt-4 text-4xl md:text-6xl font-medium" />
      <p className="mt-4 max-w-xl text-[16px] text-ink/70">
        Todos con protección UV400. Filtra por forma, color de mica o material para encontrar el tuyo.
      </p>

      {/* Segmentos */}
      <div className="mt-10 flex flex-wrap gap-2">
        {([["", "Todos"], ...Object.entries(SEGMENTOS)] as [Segmento, string][]).map(([k, label]) => (
          <button
            key={k || "todos"}
            onClick={() => setParam("segment", k)}
            className={`relative rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${segment === k ? "text-white" : "hover:bg-stone"}`}
          >
            {segment === k && (
              <motion.span layoutId="segmento-activo" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className={`relative ${segment === k ? "text-white" : ""}`}>{label}</span>
          </button>
        ))}
      </div>

      {/* Barra de filtros */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-line py-5">
        <Filtro label="Forma" value={shape} options={unicos("shape")} onChange={(v) => setParam("shape", v)} />
        <Filtro label="Color de mica" value={lens} options={unicos("lensColor")} onChange={setLens} />
        <Filtro label="Material" value={material} options={unicos("material")} onChange={setMaterial} />
        {hayFiltros && (
          <button onClick={() => { setParam("shape", ""); setLens(""); setMaterial(""); }} className="link-underline ml-1 text-[14px] text-muted">
            Limpiar filtros
          </button>
        )}
        <label className="ml-auto flex items-center gap-2 text-[15px]">
          <span className="text-muted">Ordenar:</span>
          <select value={orden} onChange={(e) => setOrden(e.target.value as Orden)} className="cursor-pointer bg-transparent font-semibold outline-none">
            <option value="destacados">Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>

      <p className="mt-8 text-[15px] font-medium">{lista.length} {lista.length === 1 ? "modelo" : "modelos"}</p>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {lista.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <ProductCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {lista.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-3xl">Sin coincidencias</p>
          <p className="mt-2 text-ink/60">Prueba quitando algún filtro.</p>
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
