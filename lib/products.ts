// lib/products.ts — Catálogo MIRAR Estudio Óptico
// Siluetas con nombres naturales inspirados en la luz, tierra y costa

export type MirarCollection = "Urban" | "Nature" | "rePlastic" | "Horizon" | "Details";
export type FloemaCollection = MirarCollection;

export type StoreProduct = {
  id: string;
  slug: string;
  legacySlugs?: string[];
  ref: string;
  name: string;
  collection: MirarCollection;
  edition: string;
  price: number; // MXN
  image: string;
  segment: "men" | "women" | "unisex";
  shape: string;
  lensColor: string;
  lensType: string;
  material: string;
  polarized: boolean;
  caliber: number; // mm
  bridge: number;  // mm
  temple: number;  // mm
  weight: number;  // grams
  sustainabilityBadge: string;
  description: string;
  craftNote: string;
  coordinates: string;
  inStock: boolean;
};

export const products: StoreProduct[] = [
  {
    id: "1",
    slug: "brisa-costera",
    legacySlugs: ["orion-monolith"],
    ref: "MR-01",
    name: "Brisa",
    collection: "Urban",
    edition: "Serie 01 // Brisa & Acero",
    price: 1899,
    image: "/images/image1.png",
    segment: "unisex",
    shape: "Geométrico Rectangular",
    lensColor: "Obsidiana Humo al Atardecer",
    lensType: "Polarizado HD Filtro Cat. 3",
    material: "Acero Quirúrgico 316L Cepillado & Bio-Acetato",
    polarized: true,
    caliber: 54,
    bridge: 18,
    temple: 145,
    weight: 28,
    sustainabilityBadge: "100% Acero Reciclable",
    description: "Inspirada en la pureza del aire costero y las líneas limpias de la arquitectura moderna. Estructura frontal monolítica con tratamiento cepillado y micas polarizadas para neutralizar el resplandor de la costa y los cristales al atardecer.",
    craftNote: "Soldadura micrométrica alemana y almohadillas nasales de elastómero médico hipoalergénico que evitan desplazamientos con el calor.",
    coordinates: "19.4195° N, 99.1618° W // Taller Central",
    inStock: true,
  },
  {
    id: "2",
    slug: "duna-ambar",
    legacySlugs: ["selene-arch"],
    ref: "MR-02",
    name: "Duna",
    collection: "Nature",
    edition: "Serie 02 // Carey & Arena",
    price: 2199,
    image: "/images/image2.png",
    segment: "women",
    shape: "Arco Esculpido Circular",
    lensColor: "Ámbar Miel Mineral",
    lensType: "Cristal Mineral de Alta Densidad",
    material: "Bio-Acetato de Algodón 8mm",
    polarized: false,
    caliber: 51,
    bridge: 21,
    temple: 142,
    weight: 34,
    sustainabilityBadge: "Bio-Acetato 100% Biodegradable",
    description: "Curvas orgánicas inspiradas en las ondulaciones de las dunas al caer la tarde. Bloque grueso de acetato vegetal pulido en seco durante 72 horas para lograr una calidez táctil inigualable.",
    craftNote: "Bisel interior aligerado para reducir el peso en el tabique nasal manteniendo la presencia visual frontal.",
    coordinates: "23.2494° N, 106.4111° W // Mazatlán Costa",
    inStock: true,
  },
  {
    id: "3",
    slug: "marea-marina",
    legacySlugs: ["vega-replastic"],
    ref: "MR-03",
    name: "Marea",
    collection: "rePlastic",
    edition: "Serie 03 // Océano Circular",
    price: 1699,
    image: "/images/image3.png",
    segment: "unisex",
    shape: "Panto Contemporáneo",
    lensColor: "Verde Salvia Profundo",
    lensType: "Mica Polimérica Polarizada HD",
    material: "rePlastic® Marino Circular",
    polarized: true,
    caliber: 49,
    bridge: 20,
    temple: 145,
    weight: 21,
    sustainabilityBadge: "0% Plástico Virgen",
    description: "Moldeada a partir de redes de pesca recuperadas del mar y polímeros post-consumo regenerados. Ultraligera y con memoria elástica para acompañarte en tus viajes sin deformarse.",
    craftNote: "Pigmentación en masa sin disolventes químicos agresivos. Superficie mate de tacto suave.",
    coordinates: "24.1426° N, 110.3128° W // Mar de Cortés",
    inStock: true,
  },
  {
    id: "4",
    slug: "ocaso-solar",
    legacySlugs: ["horizon-pilot"],
    ref: "MR-04",
    name: "Ocaso",
    collection: "Horizon",
    edition: "Serie 04 // Cobre & Atardecer",
    price: 2399,
    image: "/images/image4.png",
    segment: "unisex",
    shape: "Doble Puente Aviador",
    lensColor: "Azul Ocaso Polarizado",
    lensType: "Mica Polarizada con Capa Hidrofóbica",
    material: "Cobre & Titanio Grado Aeroespacial",
    polarized: true,
    caliber: 58,
    bridge: 15,
    temple: 140,
    weight: 24,
    sustainabilityBadge: "Titanio Forjado Durable",
    description: "Reinterpretación geométrica de la silueta aviador. Chasis en aleación de titanio y cobre pulido con doble puente tensor y micas preparadas para navegar a contraluz.",
    craftNote: "Bisagras de flexión integrada con muelle interno de acero inoxidable que no se vencen con el uso diario.",
    coordinates: "20.6534° N, 105.2253° W // Puerto Vallarta",
    inStock: true,
  },
  {
    id: "5",
    slug: "sierra-mineral",
    legacySlugs: ["atlas-structure"],
    ref: "MR-05",
    name: "Sierra",
    collection: "Urban",
    edition: "Serie 01 // Piedra & Mineral",
    price: 2299,
    image: "/images/image5.png",
    segment: "men",
    shape: "Cuadrado Grueso",
    lensColor: "Castaño Cálido Antirreflejo",
    lensType: "Cristal Mineral Templado Cat. 3",
    material: "Bio-Acetato Densificado & Alma de Titanio",
    polarized: false,
    caliber: 53,
    bridge: 19,
    temple: 148,
    weight: 38,
    sustainabilityBadge: "Varilla con Alma de Acero Quirúrgico",
    description: "Un diseño contundente y geométrico inspirado en las formaciones rocosas de la sierra. El alma metálica interior queda a la vista a través del acetato ahumado con grabados de precisión.",
    craftNote: "Bisagras con 7 dientes de engranaje remachadas al chasis con pasadores pasantes pulidos a ras.",
    coordinates: "25.6866° N, 100.3161° W // Sierra Madre",
    inStock: true,
  },
  {
    id: "6",
    slug: "alba-cuarzo",
    legacySlugs: ["lumina-cateye"],
    ref: "MR-06",
    name: "Alba",
    collection: "Nature",
    edition: "Serie 02 // Cuarzo & Primera Luz",
    price: 2199,
    image: "/images/image6.png",
    segment: "women",
    shape: "Cat-Eye Geométrico",
    lensColor: "Rosa Cuarzo al Atardecer",
    lensType: "Mineral Cat. 3 UV400",
    material: "Bio-Acetato Rosa Ahumado & Latón",
    polarized: false,
    caliber: 52,
    bridge: 17,
    temple: 142,
    weight: 31,
    sustainabilityBadge: "Bio-Acetato de Algodón Cured",
    description: "Inspirada en el instante en que amanece sobre la costa. Silueta cat-eye esculpida con facetas afiladas y filtro en tono rosa cuarzo que realza la calidez de la luz natural y protege 100% de la radiación UV.",
    craftNote: "Acabado pulido a mano con cera de carnauba orgánica para un tacto sedoso y brillante que no se raya.",
    coordinates: "20.9674° N, 89.5926° W // Península",
    inStock: true,
  },
];

export function getProduct(slug: string) {
  return products.find(
    (p) => p.slug === slug || p.legacySlugs?.includes(slug)
  );
}

export function getProductsByCollection(collection: MirarCollection) {
  return products.filter((p) => p.collection === collection);
}
