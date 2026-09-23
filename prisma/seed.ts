
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const products = [
    { slug: "orion", name: "ORION", segment: "unisex", shape: "square", material: "acetato", lensColor: "smoke",
      price: 1499, width: 52, bridge: 18, temple: 145, weight: 28, uv400: true, polarized: true, warrantyMonths: 12,
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format", collection: "bestsellers",
      variants: [{ color: "Negro", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&auto=format", stock: 12 },
                 { color: "Havana", image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&auto=format", stock: 8 }] },
    { slug: "selene", name: "SELENE", segment: "women", shape: "cat-eye", material: "acetato", lensColor: "ambar",
      price: 1999, width: 50, bridge: 17, temple: 142, weight: 26, uv400: true, polarized: false, warrantyMonths: 12,
      image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&w=1200&auto=format", collection: "nuevas",
      variants: [{ color: "Negro", image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&auto=format", stock: 6 },
                 { color: "Azul", image: "https://images.unsplash.com/photo-1520975916090-9f6a56f5d4e9?q=80&auto=format", stock: 5 }] }
  ];
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        sku: `LUNA-${p.slug.toUpperCase()}`, slug: p.slug, name: p.name, segment: p.segment, shape: p.shape, material: p.material, lensColor: p.lensColor,
        price: p.price, width: p.width, bridge: p.bridge, temple: p.temple, weight: p.weight, uv400: p.uv400,
        polarized: p.polarized, warrantyMonths: p.warrantyMonths, image: p.image, collection: p.collection,
        variants: { create: p.variants.map(v => ({ color: v.color, image: v.image, stock: v.stock })) }
      }
    });
  }
  console.log("Seed completed.");
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
