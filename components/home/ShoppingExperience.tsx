// components/home/ShoppingExperience.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/components/cart/useCart";
import {
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Package,
  Layers,
} from "lucide-react";

interface ConfigModel {
  id: string;
  slug: string;
  name: string;
  ref: string;
  tagline: string;
  price: number;
  image: string;
  material: string;
  shape: string;
  finishes: { name: string; hex: string }[];
  lenses: { name: string; vlt: string; type: string }[];
}

const CONFIG_MODELS: ConfigModel[] = [
  {
    id: "1",
    slug: "brisa-costera",
    name: "Brisa",
    ref: "MR-01",
    tagline: "Estructura arquitectónica en acero quirúrgico 316L cepillado.",
    price: 1899,
    image: "/images/image1.png",
    material: "Acero Quirúrgico 316L & Bio-Acetato",
    shape: "Geométrico Rectangular",
    finishes: [
      { name: "Titanio Grafito", hex: "#2b2b2b" },
      { name: "Acero Cepillado", hex: "#8c8c8c" },
    ],
    lenses: [
      { name: "Obsidiana Humo", vlt: "11% VLT", type: "Polarizado HD" },
      { name: "Ámbar Atardecer", vlt: "14% VLT", type: "Mineral Cat. 3" },
    ],
  },
  {
    id: "2",
    slug: "duna-ambar",
    name: "Duna",
    ref: "MR-02",
    tagline: "Bio-acetato de celulosa vegetal pulido durante 72 horas.",
    price: 2199,
    image: "/images/image2.png",
    material: "Bio-Acetato de Algodón 8mm",
    shape: "Arco Esculpido Circular",
    finishes: [
      { name: "Carey Botánico", hex: "#7a4b27" },
      { name: "Ámbar Miel", hex: "#c28236" },
    ],
    lenses: [
      { name: "Ámbar Mineral", vlt: "14.5% VLT", type: "Mineral Puro" },
      { name: "Verde Botánico", vlt: "15% VLT", type: "Polarizado" },
    ],
  },
  {
    id: "3",
    slug: "marea-marina",
    name: "Marea",
    ref: "MR-03",
    tagline: "100% polímero marino regenerado. Cero plástico virgen.",
    price: 1699,
    image: "/images/image3.png",
    material: "rePlastic® Circular Marino",
    shape: "Panto Contemporáneo",
    finishes: [
      { name: "Verde Salvia", hex: "#3e5246" },
      { name: "Negro Océano", hex: "#1f2421" },
    ],
    lenses: [
      { name: "Salvia Polarizado", vlt: "12% VLT", type: "Polarizado HD" },
      { name: "Gris Humo", vlt: "10% VLT", type: "Cat. 3 UV400" },
    ],
  },
  {
    id: "4",
    slug: "ocaso-solar",
    name: "Ocaso",
    ref: "MR-04",
    tagline: "Doble puente aviador geométrico con tensor elástico aeroespacial.",
    price: 2399,
    image: "/images/image4.png",
    material: "Cobre & Titanio Grado Aeroespacial",
    shape: "Aviador Contemporáneo",
    finishes: [
      { name: "Cobre Pulido", hex: "#9b5a3f" },
      { name: "Titanio Natural", hex: "#5a5a5c" },
    ],
    lenses: [
      { name: "Azul Ocaso", vlt: "11% VLT", type: "Polarizado Cat. 3" },
      { name: "Humo Espejado", vlt: "9% VLT", type: "Espejado UV400" },
    ],
  },
];

export default function ShoppingExperience() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedLens, setSelectedLens] = useState(0);
  const [added, setAdded] = useState(false);

  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  const current = CONFIG_MODELS[selectedIdx];

  function handleAddToCart() {
    add(
      {
        id: current.id,
        slug: current.slug,
        name: `${current.name} (${current.finishes[selectedFinish]?.name || ""})`,
        price: current.price,
        image: current.image,
      },
      1
    );
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Editorial Apple */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            CONFIGURADOR DE ESTUDIO
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            La experiencia de comprar.
          </h2>
          <p className="text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
            Personaliza tu montura en tiempo real. Cada pieza se prepara a mano en nuestro taller antes de ser enviada con envío express prioritario.
          </p>
        </div>

        {/* Tablero interactivo de experiencia de compra */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Lado Izquierdo: Visualizador del Producto Flotante sin fondo */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-14 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] relative overflow-hidden group min-h-[420px] sm:min-h-[500px]">
            {/* Insignia de referencia */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--secondary))]">
                {current.ref}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border border-[rgb(var(--accent))]/20">
                Serie Limitada
              </span>
            </div>

            {/* Imagen del Lente Flotando sin ningún fondo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center my-6"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </AnimatePresence>

            {/* Información al pie del visor */}
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-semibold text-[rgb(var(--fg))] tracking-tight">
                {current.name}
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))]">
                {current.material} · {current.shape}
              </p>
            </div>
          </div>

          {/* Lado Derecho: Controles de Personalización y Compra Inmediata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Paso 1: Selección de Silueta */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block">
                1. Selecciona tu montura
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONFIG_MODELS.map((m, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedIdx(idx);
                        setSelectedFinish(0);
                        setSelectedLens(0);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                          : "bg-[rgb(var(--bg))]/60 border-[rgb(var(--stroke))] hover:bg-[rgb(var(--bg))]"
                      }`}
                    >
                      <div className="text-xs font-semibold text-[rgb(var(--fg))]">
                        {m.name}
                      </div>
                      <div className="text-[11px] text-[rgb(var(--secondary))] mt-0.5">
                        ${m.price.toLocaleString("es-MX")} MXN
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paso 2: Acabado del Chasis */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block">
                2. Acabado del chasis
              </label>
              <div className="flex flex-wrap gap-2">
                {current.finishes.map((f, i) => {
                  const isSelected = selectedFinish === i;
                  return (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setSelectedFinish(i)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-[rgb(var(--bg))] border-[rgb(var(--fg))] text-[rgb(var(--fg))] shadow-sm"
                          : "bg-[rgb(var(--bg))]/60 border-[rgb(var(--stroke))] text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: f.hex }}
                      />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paso 3: Micas Ópticas */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block">
                3. Mica de protección UV400
              </label>
              <div className="flex flex-wrap gap-2">
                {current.lenses.map((l, i) => {
                  const isSelected = selectedLens === i;
                  return (
                    <button
                      key={l.name}
                      type="button"
                      onClick={() => setSelectedLens(i)}
                      className={`px-4 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-[rgb(var(--bg))] border-[rgb(var(--fg))] text-[rgb(var(--fg))] shadow-sm"
                          : "bg-[rgb(var(--bg))]/60 border-[rgb(var(--stroke))] text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="text-[10px] text-[rgb(var(--secondary))]">
                        ({l.vlt})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resumen de Compra y Botón de Acción Inmediato */}
            <div className="p-6 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[rgb(var(--secondary))] block">Total estimado</span>
                  <span className="text-2xl font-semibold text-[rgb(var(--fg))]">
                    ${current.price.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <div className="text-right text-xs text-[rgb(var(--secondary))]">
                  <span>Envío Express incluido</span>
                  <span className="block text-[11px] text-[rgb(var(--accent))]">30 días de prueba</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full btn-apple-primary py-3.5 text-sm font-medium rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Agregado a tu bolsa</span>
                    </>
                  ) : (
                    <span>Añadir a la bolsa — {current.name}</span>
                  )}
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="w-full btn-apple-secondary py-2.5 text-xs font-medium rounded-full flex items-center justify-center gap-1"
                >
                  <span>Ver ficha técnica detallada</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Beneficios de compra de lujo */}
              <div className="pt-3 border-t border-[rgb(var(--stroke))] grid grid-cols-2 gap-2 text-[11px] text-[rgb(var(--secondary))]">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[rgb(var(--fg))]" />
                  <span>Estuche de cuero incluido</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                  <span>Garantía de por vida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
