
export type Variant = { id: string; color: string; image: string; stock: number; };
export type Product = {
  id: string; slug: string; name: string;
  segment: "men" | "women" | "unisex";
  shape: "square" | "round" | "aviator" | "cat-eye" | "rectangle";
  material: "acetato" | "acero" | "TR90";
  lensColor: "smoke" | "ambar" | "verde" | "azul";
  price: number; width: number; bridge: number; temple: number; weight: number;
  uv400: boolean; polarized: boolean; warrantyMonths: number;
  image: string; variants: Variant[]; collection: "nuevas" | "bestsellers" | "studio" | "clasicos";
};

export const memoryCatalog: Product[] = [
  { id: "1", slug: "orion", name: "ORION", segment: "unisex", shape: "square", material: "acetato", lensColor: "smoke",
    price: 1499, width: 52, bridge: 18, temple: 145, weight: 28, uv400: true, polarized: true, warrantyMonths: 12,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format",
    variants: [
      { id: "1a", color: "Negro", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&auto=format", stock: 12 },
      { id: "1b", color: "Havana", image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&auto=format", stock: 8 }
    ],
    collection: "bestsellers"
  },
  { id: "2", slug: "selene", name: "SELENE", segment: "women", shape: "cat-eye", material: "acetato", lensColor: "ambar",
    price: 1999, width: 50, bridge: 17, temple: 142, weight: 26, uv400: true, polarized: false, warrantyMonths: 12,
    image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&w=1200&auto=format",
    variants: [
      { id: "2a", color: "Negro", image: "https://images.unsplash.com/photo-1516826961960-2aa7a1d35e1b?q=80&auto=format", stock: 6 },
      { id: "2b", color: "Azul", image: "https://images.unsplash.com/photo-1520975916090-9f6a56f5d4e9?q=80&auto=format", stock: 5 }
    ],
    collection: "nuevas"
  }
];
