// lib/products.ts — catálogo en memoria (fuente única para "Más vendidos" y la página de producto)
export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  price: number; // MXN
  image: string;
  segment: "men" | "women" | "unisex";
  shape: string;
  lensColor: string;
  material: string;
  polarized: boolean;
  description: string;
};

export const products: StoreProduct[] = [
  { id: "1", slug: "orion", name: "ORION", price: 1499, image: "/images/Image1.jpg", segment: "men", shape: "Rectangular", lensColor: "Humo", material: "Acero", polarized: true,
    description: "Armazón metálico ligero con mica humo polarizada. Para manejar y días de mucho sol." },
  { id: "2", slug: "selene", name: "SELENE", price: 1999, image: "/images/image2.jpg", segment: "women", shape: "Redondo", lensColor: "Ámbar", material: "Acetato", polarized: false,
    description: "Acetato pulido a mano con mica ámbar que realza el contraste. Un clásico con carácter." },
  { id: "3", slug: "vega", name: "VEGA", price: 1799, image: "/images/image3.jpg", segment: "unisex", shape: "Redondo", lensColor: "Azul", material: "TR90", polarized: true,
    description: "TR90 flexible y resistente, pensado para el uso diario sin preocuparte por golpes." },
  { id: "4", slug: "lyra", name: "LYRA", price: 1599, image: "/images/image4.jpg", segment: "women", shape: "Cat-eye", lensColor: "Verde", material: "Acetato", polarized: false,
    description: "Silueta cat-eye con mica verde clásica. Ligero, cómodo y con protección UV400." },
  { id: "5", slug: "atlas", name: "ATLAS", price: 1699, image: "/images/image5.jpg", segment: "men", shape: "Cuadrado", lensColor: "Humo", material: "Acetato", polarized: true,
    description: "Formato cuadrado de acetato grueso con mica polarizada. Presencia sin exagerar." },
  { id: "6", slug: "luna-x", name: "LUNA X", price: 1899, image: "/images/image6.jpg", segment: "unisex", shape: "Aviador", lensColor: "Ámbar", material: "Acero", polarized: true,
    description: "Nuestra versión del aviador: doble puente de acero y mica ámbar polarizada." },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
