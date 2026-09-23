// app/product/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { getProduct, products } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  return p ? { title: `${p.name} — LUNA`, description: p.description } : {};
}

const SEGMENTO = { men: "Hombre", women: "Mujer", unisex: "Unisex" } as const;

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const specs = [
    ["Forma", p.shape],
    ["Material", p.material],
    ["Mica", p.lensColor],
    ["Protección", p.polarized ? "UV400 · Polarizado" : "UV400"],
    ["Segmento", SEGMENTO[p.segment]],
  ];

  return (
    <main className="w-full px-8 md:px-16 lg:px-24 py-12">
      <Link href="/catalog" className="text-sm text-[rgb(var(--fg))]/70 hover:text-[rgb(var(--accent))]">
        ← Volver al catálogo
      </Link>

      <section className="mt-6 grid md:grid-cols-2 gap-10 items-start max-w-6xl">
        <img
          src={p.image}
          alt={`Lentes ${p.name}`}
          className="w-full aspect-[4/3] object-cover rounded-2xl"
        />

        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[rgb(var(--fg))]/60">
            {SEGMENTO[p.segment]}
          </p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">{p.name}</h1>
          <p className="text-2xl mt-4">{formatCurrency(p.price)}</p>
          <p className="mt-6 text-[rgb(var(--fg))]/80 leading-relaxed">{p.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {specs.map(([k, v]) => (
              <div key={k} className="border-b border-[rgb(var(--stroke))] pb-2">
                <dt className="text-[rgb(var(--fg))]/60">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex gap-3">
            <AddToCartButton product={p} />
            <Link href="/checkout" className="btn-outline">Ir a pagar</Link>
          </div>
          <p className="mt-4 text-xs text-[rgb(var(--fg))]/60">
            Envío a todo México · 12 meses de garantía
          </p>
        </div>
      </section>
    </main>
  );
}
