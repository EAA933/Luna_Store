// components/FitHelpModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, Ruler, Check, ChevronRight, Sparkles } from "lucide-react";

type FaceType = "narrow" | "medium" | "wide";

const FIT_DATA: Record<
  FaceType,
  {
    title: string;
    sub: string;
    description: string;
    recommendedCaliber: string;
    recommendedBridge: string;
    recommendedWidth: string;
    models: { name: string; ref: string; caliber: string; slug: string; img: string }[];
  }
> = {
  narrow: {
    title: "Fisonomía Estrecha",
    sub: "Distancia pupilar 58-62 mm",
    description: "Monturas con calibres inferiores a 51 mm concebidas para descansar con ligereza sin sobrepasar las sienes.",
    recommendedCaliber: "48 - 50 mm",
    recommendedBridge: "19 - 21 mm",
    recommendedWidth: "134 - 138 mm",
    models: [
      { name: "Marea", ref: "MR-03", caliber: "49▪20-145", slug: "marea-marina", img: "/images/image3.png" },
      { name: "Duna", ref: "MR-02", caliber: "51▪21-142", slug: "duna-ambar", img: "/images/image2.png" },
    ],
  },
  medium: {
    title: "Fisonomía Universal",
    sub: "Distancia pupilar 62-66 mm",
    description: "La proporción áurea. Calibres entre 51 y 53 mm con puente medio adaptado al perfil nasal de la mayoría de rostros.",
    recommendedCaliber: "51 - 53 mm",
    recommendedBridge: "18 - 20 mm",
    recommendedWidth: "139 - 144 mm",
    models: [
      { name: "Alba", ref: "MR-06", caliber: "52▪17-142", slug: "alba-cuarzo", img: "/images/image6.png" },
      { name: "Sierra", ref: "MR-05", caliber: "53▪19-148", slug: "sierra-mineral", img: "/images/image5.png" },
    ],
  },
  wide: {
    title: "Fisonomía Amplia",
    sub: "Distancia pupilar 66-72 mm",
    description: "Siluetas de 54 mm en adelante con varillas ergonómicas que eliminan cualquier punto de presión en las sienes.",
    recommendedCaliber: "54 - 58 mm",
    recommendedBridge: "15 - 18 mm",
    recommendedWidth: "145 - 152 mm",
    models: [
      { name: "Brisa", ref: "MR-01", caliber: "54▪18-145", slug: "brisa-costera", img: "/images/image1.png" },
      { name: "Ocaso", ref: "MR-04", caliber: "58▪15-140", slug: "ocaso-solar", img: "/images/image4.png" },
    ],
  },
};

interface FitHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FitHelpModal({ isOpen, onClose }: FitHelpModalProps) {
  const [activeTab, setActiveTab] = useState<FaceType>("medium");
  const data = FIT_DATA[activeTab];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Fondo difuminado estilo Apple */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
          />

          {/* Tarjeta Modal flotante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] shadow-2xl p-6 sm:p-10 z-10 text-[rgb(var(--fg))]"
          >
            {/* Cabecera del modal */}
            <div className="flex items-start justify-between pb-6 border-b border-[rgb(var(--stroke))]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-xs font-medium text-[rgb(var(--secondary))] mb-2">
                  <Ruler className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                  <span>GUÍA ANATÓMICA DE CALIBRE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">
                  ¿Necesitas ayuda con tu calce?
                </h2>
                <p className="text-xs sm:text-sm text-[rgb(var(--secondary))] mt-1">
                  Encuentra la montura que armoniza milímetro a milímetro con las proporciones de tu rostro.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="p-2 rounded-full border border-[rgb(var(--stroke))] hover:bg-[rgb(var(--card))] transition-colors text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de fisonomía */}
            <div className="py-6">
              <span className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block mb-3">
                Selecciona la forma de tu rostro:
              </span>
              <div className="flex items-center gap-2 p-1.5 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-full w-fit">
                {(["narrow", "medium", "wide"] as FaceType[]).map((type) => {
                  const isSelected = activeTab === type;
                  const labels: Record<FaceType, string> = {
                    narrow: "Estrecha (58-62 mm)",
                    medium: "Universal (62-66 mm)",
                    wide: "Amplia (66-72 mm)",
                  };
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveTab(type)}
                      className={`px-4 sm:px-6 py-2 text-xs font-medium rounded-full transition-all ${
                        isSelected
                          ? "bg-[rgb(var(--bg))] text-[rgb(var(--fg))] shadow-sm"
                          : "text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                      }`}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel de detalles anatómicos */}
            <div className="grid md:grid-cols-12 gap-6 items-stretch">
              {/* Medidas sugeridas */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))]">
                      {data.sub}
                    </span>
                    <h3 className="text-xl font-semibold text-[rgb(var(--fg))] mt-0.5">
                      {data.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">
                    {data.description}
                  </p>

                  <div className="pt-4 border-t border-[rgb(var(--stroke))] space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--secondary))]">Calibre de mica:</span>
                      <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedCaliber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--secondary))]">Puente nasal:</span>
                      <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedBridge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--secondary))]">Ancho de chasis:</span>
                      <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedWidth}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[rgb(var(--stroke))] text-[11px] text-[rgb(var(--secondary))]">
                  Recuerda: dispones de <strong>30 días de prueba en casa</strong> con cambios sin costo.
                </div>
              </div>

              {/* Modelos recomendados */}
              <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
                {data.models.map((mod) => (
                  <Link
                    key={mod.slug}
                    href={`/product/${mod.slug}`}
                    onClick={onClose}
                    className="group p-5 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] flex flex-col justify-between hover:shadow-lg transition-all hover:border-[rgb(var(--stroke-strong))]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] mb-1">
                        <span>{mod.ref}</span>
                        <span className="font-mono text-[10px]">{mod.caliber}</span>
                      </div>
                      <h4 className="text-base font-semibold text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors">
                        {mod.name}
                      </h4>

                      <div className="relative aspect-[4/3] w-full my-4 flex items-center justify-center">
                        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src={mod.img}
                            alt={mod.name}
                            fill
                            referrerPolicy="no-referrer"
                            className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[rgb(var(--stroke))] flex items-center justify-between text-xs font-medium text-[rgb(var(--accent))] group-hover:underline">
                      <span>Ver modelo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pie del modal */}
            <div className="mt-8 pt-6 border-t border-[rgb(var(--stroke))] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[rgb(var(--secondary))]">
                ¿Aún tienes dudas sobre tu graduación o medidas? Nuestro taller te asesora de forma personalizada.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="btn-apple-primary px-6 py-2 text-xs font-medium rounded-full"
              >
                Entendido, ver modelos
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
