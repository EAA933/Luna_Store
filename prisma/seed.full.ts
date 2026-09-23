import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

type P = {
  sku: string; slug: string; name: string;
  segment: "men" | "women" | "unisex";
  shape: "square" | "round" | "aviator" | "cat-eye" | "rectangle";
  material: "acetato" | "acero" | "TR90";
  lensColor: "smoke" | "ambar" | "verde" | "azul";
  price: number; width: number; bridge: number; temple: number; weight: number;
  uv400: boolean; polarized: boolean; warrantyMonths: number;
  image: string; collection: "nuevas" | "bestsellers" | "studio" | "clasicos";
  variants: { color: string; image: string; stock: number }[];
};

const U = (w=1200) => (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format`;

const u = U(1600);

const products: P[] = [
  // ——— Bestsellers
  {
    sku: "LUNA-ORION-BLK", slug: "orion", name: "ORION",
    segment: "unisex", shape: "square", material: "acetato", lensColor: "smoke",
    price: 1499, width: 52, bridge: 18, temple: 145, weight: 28,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1520975916090-3105956dac38"), collection: "bestsellers",
    variants: [
      { color: "Negro", image: u("photo-1520975916090-3105956dac38"), stock: 14 },
      { color: "Havana", image: u("photo-1516826961960-2aa7a1d35e1b"), stock: 9 },
    ],
  },
  {
    sku: "LUNA-SELENE-NAV", slug: "selene", name: "SELENE",
    segment: "women", shape: "cat-eye", material: "acetato", lensColor: "ambar",
    price: 1999, width: 50, bridge: 17, temple: 142, weight: 26,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1516826961960-2aa7a1d35e1b"), collection: "nuevas",
    variants: [
      { color: "Negro", image: u("photo-1516826961960-2aa7a1d35e1b"), stock: 6 },
      { color: "Azul", image: u("photo-1520975916090-9f6a56f5d4e9"), stock: 5 },
    ],
  },
  {
    sku: "LUNA-APOLLO-GRN", slug: "apollo", name: "APOLLO",
    segment: "men", shape: "aviator", material: "acero", lensColor: "verde",
    price: 1799, width: 55, bridge: 14, temple: 145, weight: 24,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1503342394120-480a3d714330"), collection: "bestsellers",
    variants: [
      { color: "Acero", image: u("photo-1503342394120-480a3d714330"), stock: 11 },
      { color: "Dorado", image: u("photo-1483985988355-763728e1935b"), stock: 7 },
    ],
  },
  {
    sku: "LUNA-DIANA-CLSC", slug: "diana", name: "DIANA",
    segment: "women", shape: "round", material: "TR90", lensColor: "azul",
    price: 1399, width: 49, bridge: 18, temple: 140, weight: 22,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1503342217505-b0a15cf70489"), collection: "clasicos",
    variants: [
      { color: "Ámbar", image: u("photo-1503342217505-b0a15cf70489"), stock: 12 },
      { color: "Cristal", image: u("photo-1490481651871-ab68de25d43d"), stock: 10 },
    ],
  },
  // ——— Studio (editorial)
  {
    sku: "LUNA-NOVA-SIGN", slug: "nova", name: "NOVA",
    segment: "unisex", shape: "rectangle", material: "acetato", lensColor: "smoke",
    price: 2999, width: 53, bridge: 19, temple: 145, weight: 29,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1520975867598-6e0b87b3b3a0"), collection: "studio",
    variants: [
      { color: "Negro mate", image: u("photo-1520975867598-6e0b87b3b3a0"), stock: 5 },
      { color: "Grafito", image: u("photo-1520975494845-6c2ad1f4a6b8"), stock: 5 },
    ],
  },
  {
    sku: "LUNA-ASTER-SIGN", slug: "aster", name: "ASTER",
    segment: "unisex", shape: "square", material: "acetato", lensColor: "smoke",
    price: 2999, width: 54, bridge: 18, temple: 146, weight: 30,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1542596594-649edbc13630"), collection: "studio",
    variants: [
      { color: "Negro", image: u("photo-1542596594-649edbc13630"), stock: 4 },
      { color: "Verde botella", image: u("photo-1490481651871-ab68de25d43d"), stock: 4 },
    ],
  },
  // ——— Nuevas
  {
    sku: "LUNA-LYRA-GLD", slug: "lyra", name: "LYRA",
    segment: "women", shape: "cat-eye", material: "acetato", lensColor: "ambar",
    price: 1899, width: 51, bridge: 17, temple: 142, weight: 25,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1520975940461-d2a9f03a0f69"), collection: "nuevas",
    variants: [
      { color: "Carey", image: u("photo-1520975940461-d2a9f03a0f69"), stock: 9 },
      { color: "Marfil", image: u("photo-1490481651871-ab68de25d43d"), stock: 7 },
    ],
  },
  {
    sku: "LUNA-CALIA-SMK", slug: "calia", name: "CALIA",
    segment: "women", shape: "round", material: "TR90", lensColor: "smoke",
    price: 1299, width: 50, bridge: 17, temple: 140, weight: 20,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1518544801976-3e1883b08e64"), collection: "nuevas",
    variants: [
      { color: "Rosa", image: u("photo-1518544801976-3e1883b08e64"), stock: 10 },
      { color: "Gris", image: u("photo-1490481651871-ab68de25d43d"), stock: 10 },
    ],
  },
  // ——— Clásicos
  {
    sku: "LUNA-VEGA-BLK", slug: "vega", name: "VEGA",
    segment: "men", shape: "square", material: "acetato", lensColor: "smoke",
    price: 1599, width: 54, bridge: 19, temple: 145, weight: 29,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1490481651871-ab68de25d43d"), collection: "clasicos",
    variants: [
      { color: "Negro", image: u("photo-1490481651871-ab68de25d43d"), stock: 12 },
      { color: "Havana", image: u("photo-1503342217505-b0a15cf70489"), stock: 8 },
    ],
  },
  {
    sku: "LUNA-ALTA-GLD", slug: "alta", name: "ALTA",
    segment: "women", shape: "aviator", material: "acero", lensColor: "ambar",
    price: 1699, width: 55, bridge: 14, temple: 145, weight: 23,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1483985988355-763728e1935b"), collection: "clasicos",
    variants: [
      { color: "Dorado", image: u("photo-1483985988355-763728e1935b"), stock: 10 },
      { color: "Plateado", image: u("photo-1503342394120-480a3d714330"), stock: 8 },
    ],
  },
  // ——— Más bestsellers
  {
    sku: "LUNA-ARCO-NVY", slug: "arco", name: "ARCO",
    segment: "unisex", shape: "rectangle", material: "TR90", lensColor: "azul",
    price: 1199, width: 52, bridge: 18, temple: 143, weight: 21,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1520975916090-9f6a56f5d4e9"), collection: "bestsellers",
    variants: [
      { color: "Azul", image: u("photo-1520975916090-9f6a56f5d4e9"), stock: 15 },
      { color: "Gris", image: u("photo-1490481651871-ab68de25d43d"), stock: 10 },
    ],
  },
  {
    sku: "LUNA-SOLIS-GRN", slug: "solis", name: "SOLIS",
    segment: "men", shape: "round", material: "acetato", lensColor: "verde",
    price: 1499, width: 50, bridge: 18, temple: 145, weight: 27,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1520975867598-6e0b87b3b3a0"), collection: "bestsellers",
    variants: [
      { color: "Verde", image: u("photo-1520975867598-6e0b87b3b3a0"), stock: 9 },
      { color: "Negro", image: u("photo-1520975916090-3105956dac38"), stock: 9 },
    ],
  },
  // ——— Edición Studio extra
  {
    sku: "LUNA-UMBRA-SIL", slug: "umbra", name: "UMBRA",
    segment: "unisex", shape: "square", material: "acero", lensColor: "smoke",
    price: 2499, width: 54, bridge: 18, temple: 146, weight: 24,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1542596594-649edbc13630"), collection: "studio",
    variants: [
      { color: "Acero cepillado", image: u("photo-1542596594-649edbc13630"), stock: 6 },
      { color: "Negro cromado", image: u("photo-1503342394120-480a3d714330"), stock: 6 },
    ],
  },
  {
    sku: "LUNA-QUARZ-SMK", slug: "quarz", name: "QUARZ",
    segment: "unisex", shape: "rectangle", material: "acetato", lensColor: "smoke",
    price: 2199, width: 53, bridge: 18, temple: 145, weight: 27,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1516826961960-2aa7a1d35e1b"), collection: "studio",
    variants: [
      { color: "Gris humo", image: u("photo-1516826961960-2aa7a1d35e1b"), stock: 7 },
      { color: "Negro", image: u("photo-1520975916090-3105956dac38"), stock: 7 },
    ],
  },
  // ——— Clásicos extra
  {
    sku: "LUNA-ORO-AMB", slug: "oro", name: "ORO",
    segment: "women", shape: "square", material: "acetato", lensColor: "ambar",
    price: 1599, width: 51, bridge: 18, temple: 143, weight: 26,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1520975940461-d2a9f03a0f69"), collection: "clasicos",
    variants: [
      { color: "Carey ámbar", image: u("photo-1520975940461-d2a9f03a0f69"), stock: 8 },
      { color: "Champagne", image: u("photo-1490481651871-ab68de25d43d"), stock: 8 },
    ],
  },
  {
    sku: "LUNA-NERO-SMK", slug: "nero", name: "NERO",
    segment: "men", shape: "rectangle", material: "acetato", lensColor: "smoke",
    price: 1699, width: 55, bridge: 18, temple: 148, weight: 30,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1520975494845-6c2ad1f4a6b8"), collection: "clasicos",
    variants: [
      { color: "Negro brillo", image: u("photo-1520975494845-6c2ad1f4a6b8"), stock: 10 },
      { color: "Humo", image: u("photo-1520975867598-6e0b87b3b3a0"), stock: 8 },
    ],
  },
  // ——— Nuevas extra
  {
    sku: "LUNA-AURA-BLU", slug: "aura", name: "AURA",
    segment: "unisex", shape: "round", material: "TR90", lensColor: "azul",
    price: 1299, width: 49, bridge: 18, temple: 142, weight: 20,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1518544801976-3e1883b08e64"), collection: "nuevas",
    variants: [
      { color: "Azul hielo", image: u("photo-1518544801976-3e1883b08e64"), stock: 12 },
      { color: "Niebla", image: u("photo-1490481651871-ab68de25d43d"), stock: 12 },
    ],
  },
  {
    sku: "LUNA-EDEN-GRN", slug: "eden", name: "EDEN",
    segment: "women", shape: "cat-eye", material: "acetato", lensColor: "verde",
    price: 1899, width: 50, bridge: 17, temple: 142, weight: 25,
    uv400: true, polarized: true, warrantyMonths: 12,
    image: u("photo-1503342217505-b0a15cf70489"), collection: "nuevas",
    variants: [
      { color: "Verde botella", image: u("photo-1503342217505-b0a15cf70489"), stock: 7 },
      { color: "Negro", image: u("photo-1520975916090-3105956dac38"), stock: 7 },
    ],
  },
  {
    sku: "LUNA-ROVER-GLD", slug: "rover", name: "ROVER",
    segment: "men", shape: "aviator", material: "acero", lensColor: "smoke",
    price: 1799, width: 56, bridge: 14, temple: 147, weight: 24,
    uv400: true, polarized: false, warrantyMonths: 12,
    image: u("photo-1483985988355-763728e1935b"), collection: "clasicos",
    variants: [
      { color: "Dorado", image: u("photo-1483985988355-763728e1935b"), stock: 10 },
      { color: "Gunmetal", image: u("photo-1503342394120-480a3d714330"), stock: 10 },
    ],
  },
];

async function main() {
  for (const p of products) {
    await db.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        variants: { create: p.variants },
      },
    });
  }
  console.log(`Seed listo: ${products.length} productos`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
