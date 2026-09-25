// app/product/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { getProduct, products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Sun,
  Package,
  ChevronRight,
} from "lucide-react";

export function generateStaticParams() {
  const list: { slug: string }[] = [];
  products.forEach((p) => {
    list.push({ slug: p.slug });
    if (p.legacySlugs) {
      p.legacySlugs.forEach((leg) => list.push({ slug: leg }));
    }
  });
  return list;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p
    ? {
        title: `${p.name} — Lentes de Sol | Tienda MIRAR`,
        description: p.description,
      }
    : {};
}

const SEGMENTO = {
  men: "Línea Masculina",
  women: "Línea Femenina",
  unisex: "Diseño Universal",
} as const;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  return (
    <main className="w-full bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen pb-24 transition-colors">
      {/* Barra de retorno minimalista Apple-style */}
      <div className="border-b border-[rgb(var(--stroke))] bg-[rgb(var(--bg))]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-3 flex items-center justify-between text-xs text-[rgb(var(--secondary))]">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo</span>
          </Link>
          <div className="flex items-center gap-3">
            <span>{p.ref}</span>
            <span aria-hidden="true">·</span>
            <span>{p.collection}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-10 sm:pt-16">
        <section className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna Izquierda: Imagen Protagonista en Escenario Limpio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative rounded-3xl overflow-hidden bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] aspect-[4/3] flex items-center justify-center p-8 sm:p-12">
              <div className="relative w-full h-full">
                <Image
                  src={p.image}
                  alt={`Lentes de sol MIRAR modelo ${p.name}`}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.1)]"
                />
              </div>

              {/* Insignia sutil de polarizado */}
              <div className="absolute top-6 right-6">
                <span className="text-xs px-3 py-1 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] text-[rgb(var(--secondary))] font-medium shadow-sm">
                  {p.polarized ? "Polarizado HD" : "Mineral UV400"}
                </span>
              </div>
            </div>

            {/* Ficha de fabricación y notas de taller */}
            <div className="p-8 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))]">
              <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))] block mb-2">
                NOTAS DE TALLER &amp; INGENIERÍA
              </span>
              <p className="text-sm text-[rgb(var(--fg))] leading-relaxed mb-4">
                {p.craftNote}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[rgb(var(--stroke))] text-xs text-[rgb(var(--secondary))] font-medium">
                <span>Norma europea EN ISO 12312-1</span>
                <span className="text-[rgb(var(--accent))]">Garantía vitalicia incluida</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ficha Técnica & Compra */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="pb-8 border-b border-[rgb(var(--stroke))] space-y-3">
              <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
                {p.edition} · {SEGMENTO[p.segment]}
              </span>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))]">
                {p.name}
              </h1>

              <div className="pt-2">
                <span className="text-3xl font-semibold text-[rgb(var(--fg))] block">
                  {formatCurrency(p.price)}
                </span>
                <span className="text-xs text-[rgb(var(--secondary))] block mt-1">
                  Incluye impuestos y envío express de cortesía a todo México.
                </span>
              </div>

              <p className="text-sm sm:text-base text-[rgb(var(--secondary))] leading-relaxed pt-2 font-normal">
                {p.description}
              </p>
            </div>

            {/* Dimensiones y Calibre */}
            <div className="py-8 border-b border-[rgb(var(--stroke))]">
              <h3 className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] mb-4">
                DIMENSIONES ÓPTICAS [MM]
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl">
                  <span className="text-[rgb(var(--secondary))] block text-[11px]">CALIBRE MICA</span>
                  <span className="font-semibold text-[rgb(var(--fg))] text-sm mt-0.5 block">{p.caliber} mm</span>
                </div>
                <div className="p-4 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl">
                  <span className="text-[rgb(var(--secondary))] block text-[11px]">PUENTE NASAL</span>
                  <span className="font-semibold text-[rgb(var(--fg))] text-sm mt-0.5 block">{p.bridge} mm</span>
                </div>
                <div className="p-4 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl">
                  <span className="text-[rgb(var(--secondary))] block text-[11px]">VARILLA</span>
                  <span className="font-semibold text-[rgb(var(--fg))] text-sm mt-0.5 block">{p.temple} mm</span>
                </div>
                <div className="p-4 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl">
                  <span className="text-[rgb(var(--secondary))] block text-[11px]">PESO CHASIS</span>
                  <span className="font-semibold text-[rgb(var(--fg))] text-sm mt-0.5 block">{p.weight} gramos</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-2xl text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[rgb(var(--secondary))]">Material de montura:</span>
                  <span className="font-medium text-[rgb(var(--fg))] text-right">{p.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[rgb(var(--secondary))]">Mica solar:</span>
                  <span className="font-medium text-[rgb(var(--fg))]">{p.lensColor}</span>
                </div>
              </div>
            </div>

            {/* Acciones de Compra estilo Apple */}
            <div className="py-8 border-b border-[rgb(var(--stroke))] space-y-3">
              <AddToCartButton
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  image: p.image,
                }}
                className="w-full btn-apple-primary py-3.5 text-sm font-medium rounded-full shadow-md"
              />

              <Link
                href="/#lightlab"
                className="w-full btn-apple-secondary py-3 text-xs flex items-center justify-center gap-1.5 rounded-full"
              >
                <Sun className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                <span>Simular lente en LightLab</span>
              </Link>
            </div>

            {/* Beneficios Incluidos */}
            <div className="pt-8 space-y-4 text-xs text-[rgb(var(--secondary))]">
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 text-[rgb(var(--fg))] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[rgb(var(--fg))] font-medium">Estuche rígido de cuero vegetal:</strong> Incluido con paño de microfibra de alta densidad.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[rgb(var(--fg))] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[rgb(var(--fg))] font-medium">Envío Express Gratis:</strong> Entrega prioritaria a todo México con seguimiento en tiempo real.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[rgb(var(--fg))] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[rgb(var(--fg))] font-medium">30 Días de Prueba &amp; Garantía Vitalicia:</strong> Retorno sin preguntas si no encajan con tu rostro.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
