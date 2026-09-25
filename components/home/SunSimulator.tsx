// components/home/SunSimulator.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Check, Sparkles, Eye, ShieldCheck } from "lucide-react";

interface LensPreset {
  id: string;
  name: string;
  category: string;
  vlt: string;
  polarization: string;
  description: string;
  idealFor: string;
  tintColor: string;
  overlayStyle: {
    backgroundColor: string;
    mixBlendMode: any;
    backdropFilter?: string;
  };
}

const LENS_PRESETS: LensPreset[] = [
  {
    id: "amber-mineral",
    name: "Ámbar Mineral",
    category: "Categoría 3 Mineral",
    vlt: "14.5% VLT",
    polarization: "Atenuación Luz Azul 88%",
    description: "Atenúa selectivamente la luz azul dispersa, aumentando el contraste y dotando al paisaje de una calidez nítida al atardecer.",
    idealFor: "Sol poniente, conducción de tarde, costa abierta",
    tintColor: "#e67e22",
    overlayStyle: {
      backgroundColor: "rgba(230, 126, 34, 0.28)",
      mixBlendMode: "multiply",
      backdropFilter: "contrast(120%) saturate(140%)",
    },
  },
  {
    id: "smoke-hd",
    name: "Obsidiana Humo",
    category: "Categoría 3 Polarizado HD",
    vlt: "11.2% VLT",
    polarization: "99.8% Eficiencia Polar",
    description: "Filtro polarizador multicapa que elimina por completo el resplandor cegador de superficies metálicas, asfalto y cristales.",
    idealFor: "Luz cenital intensa, conducción urbana, arquitectura reflectante",
    tintColor: "#2c3e50",
    overlayStyle: {
      backgroundColor: "rgba(44, 62, 80, 0.35)",
      mixBlendMode: "multiply",
      backdropFilter: "contrast(115%) brightness(90%)",
    },
  },
  {
    id: "terracotta-glow",
    name: "Terracota Ocaso",
    category: "Categoría 3 Filtro Crepuscular",
    vlt: "13.0% VLT",
    polarization: "Polarizado 99.5%",
    description: "Equilibrio cromático desarrollado para la hora dorada. Transmite los tonos cálidos naturales sin provocar fatiga visual.",
    idealFor: "Atardeceres, terrazas, paseos en el horizonte",
    tintColor: "#d35400",
    overlayStyle: {
      backgroundColor: "rgba(211, 84, 0, 0.26)",
      mixBlendMode: "multiply",
      backdropFilter: "contrast(118%) saturate(130%)",
    },
  },
  {
    id: "botanical-green",
    name: "Verde Salvia",
    category: "Categoría 3 Descanso Óptico",
    vlt: "15.0% VLT",
    polarization: "Transmisión Neutra Real",
    description: "Curva espectral ajustada a la sensibilidad de la retina humana. Máximo descanso ocular en exteriores luminosos.",
    idealFor: "Naturaleza, alta montaña, descanso prolongado",
    tintColor: "#27ae60",
    overlayStyle: {
      backgroundColor: "rgba(39, 174, 96, 0.25)",
      mixBlendMode: "multiply",
      backdropFilter: "contrast(110%) saturate(120%)",
    },
  },
];

export default function SunSimulator() {
  const [selectedLens, setSelectedLens] = useState<LensPreset>(LENS_PRESETS[0]);
  const [filterActive, setFilterActive] = useState(true);

  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            SIMULADOR ÓPTICO // LIGHTLAB
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Tecnología Óptica. <br />Mira a través de la precisión.
          </h2>
          <p className="text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
            Experimenta en tiempo real cómo interactúa cada espectro de mica con la radiación solar y los reflejos urbanos.
          </p>
        </div>

        {/* Selector de Lentes en Píldoras Segmentadas Apple-style */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-full w-fit">
          {LENS_PRESETS.map((lens) => {
            const isSelected = selectedLens.id === lens.id;
            return (
              <button
                key={lens.id}
                type="button"
                onClick={() => {
                  setSelectedLens(lens);
                  setFilterActive(true);
                }}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-[rgb(var(--bg))] text-[rgb(var(--fg))] shadow-sm"
                    : "text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: lens.tintColor }}
                />
                <span>{lens.name}</span>
              </button>
            );
          })}
        </div>

        {/* Visor Interactivo de Simulación */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Escena Visual con Simulación Óptica */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-900 border border-[rgb(var(--stroke))] shadow-xl">
            {/* Fondo simulado de atardecer de alta fidelidad */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 70% 30%, #f39c12 0%, #d35400 35%, #8e44ad 70%, #2c3e50 100%)",
              }}
            >
              {/* Resplandor del sol simulado */}
              <div className="absolute top-[25%] right-[28%] w-48 h-48 rounded-full bg-amber-200/90 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-900/80 to-transparent pointer-events-none" />

              {/* Silueta urbana de horizonte */}
              <svg
                viewBox="0 0 1000 400"
                className="absolute bottom-0 inset-x-0 w-full h-auto text-stone-950/80 fill-current pointer-events-none"
              >
                <polygon points="0,400 0,320 80,320 80,280 140,280 140,320 220,320 260,240 320,240 340,320 480,320 520,200 580,200 600,320 720,320 760,260 820,260 850,320 1000,320 1000,400" />
              </svg>
            </div>

            {/* Capa de Mica Óptica Filtrante */}
            <AnimatePresence>
              {filterActive && (
                <motion.div
                  key={selectedLens.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                  style={selectedLens.overlayStyle}
                />
              )}
            </AnimatePresence>

            {/* Controles en el visor */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>Simulación {filterActive ? "Con Filtro Activo" : "Sin Filtro (Luz Cruda)"}</span>
              </div>

              <button
                type="button"
                onClick={() => setFilterActive(!filterActive)}
                className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors shadow-lg"
              >
                {filterActive ? "Ver luz sin filtro" : "Aplicar filtro óptico"}
              </button>
            </div>
          </div>

          {/* Ficha técnica minimalista estilo especificaciones Apple */}
          <div className="lg:col-span-4 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))]">
                  {selectedLens.category}
                </span>
                <h3 className="text-2xl font-semibold text-[rgb(var(--fg))] mt-1">
                  {selectedLens.name}
                </h3>
                <p className="text-sm text-[rgb(var(--secondary))] mt-2 leading-relaxed">
                  {selectedLens.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgb(var(--stroke))] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Transmisión de luz (VLT):</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{selectedLens.vlt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Protección ultravioleta:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">100% UV400 (hasta 400 nm)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Eficiencia de polarizado:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{selectedLens.polarization}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Uso recomendado:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{selectedLens.idealFor}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgb(var(--stroke))] flex items-center gap-2 text-xs text-[rgb(var(--secondary))]">
              <ShieldCheck className="w-4 h-4 text-[rgb(var(--accent))]" />
              <span>Certificación óptica europea EN ISO 12312-1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
