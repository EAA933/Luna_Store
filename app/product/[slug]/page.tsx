// app/product/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/store/ProductDetail";
import ProductCard from "@/components/store/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  return p ? { title: `${p.name} — MIRAR`, description: p.description } : {};
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  // Relacionados: primero los del mismo segmento, luego el resto.
  const relacionados = products
    .filter((x) => x.id !== p.id)
    .sort((a, b) => Number(b.segment === p.segment) - Number(a.segment === p.segment))
    .slice(0, 4);

  return (
    <main>
      <ProductDetail p={p} />
      <section className="container border-t border-line py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-medium">También te pueden gustar</h2>
          <Link href="/catalog" className="link-underline text-[15px] font-medium">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {relacionados.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}><ProductCard p={r} /></Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
