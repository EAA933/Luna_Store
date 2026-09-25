// components/home/CaliberFitGuide.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

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

export default function CaliberFitGuide() {
  const [activeTab, setActiveTab] = useState<FaceType>("medium");
  const data = FIT_DATA[activeTab];

  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            ERGONOMÍA FACIAL
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Tu calce ideal. <br />Milímetro a milímetro.
          </h2>
          <p className="text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
            Una montura excepcional no solo debe proteger tus ojos; debe sentirse invisible al llevarla puesta durante todo el día.
          </p>
        </div>

        {/* Selector Segmentado Apple-style */}
        <div className="flex items-center gap-1.5 p-1 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full w-fit mb-12">
          {(["narrow", "medium", "wide"] as FaceType[]).map((type) => {
            const isSelected = activeTab === type;
            const labels: Record<FaceType, string> = {
              narrow: "Estrecha",
              medium: "Universal",
              wide: "Amplia",
            };
            return (
              <button
                key={type}
                type="button"
                onClick={() => setActiveTab(type)}
                className={`px-5 py-2 text-xs font-medium rounded-full transition-all ${
                  isSelected
                    ? "bg-[rgb(var(--card))] text-[rgb(var(--fg))] shadow-sm"
                    : "text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                }`}
              >
                <span>{labels[type]}</span>
              </button>
            );
          })}
        </div>

        {/* Panel de Contenido con Modelos Recomendados */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Métricas y Datos del Calce */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))]">
                {data.sub}
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--fg))] tracking-tight">
                {data.title}
              </h3>
              <p className="text-sm text-[rgb(var(--secondary))] leading-relaxed">
                {data.description}
              </p>

              <div className="pt-6 border-t border-[rgb(var(--stroke))] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Calibre de lente sugerido:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedCaliber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Ancho de puente nasal:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedBridge}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[rgb(var(--secondary))]">Ancho total del chasis:</span>
                  <span className="font-semibold text-[rgb(var(--fg))]">{data.recommendedWidth}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[rgb(var(--secondary))] pt-6 mt-6 border-t border-[rgb(var(--stroke))]">
              Incluye prueba en casa de 30 días sin costo de envío.
            </p>
          </div>

          {/* Modelos Recomendados */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {data.models.map((mod) => (
              <Link
                key={mod.slug}
                href={`/product/${mod.slug}`}
                className="group p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[rgb(var(--stroke-strong))]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] mb-2">
                    <span>{mod.ref}</span>
                    <span className="font-mono text-[11px]">{mod.caliber}</span>
                  </div>

                  <h4 className="text-xl font-semibold text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors">
                    {mod.name}
                  </h4>

                  <div className="relative aspect-[4/3] w-full my-6 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                      <Image
                        src={mod.img}
                        alt={mod.name}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.06)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgb(var(--stroke))] flex items-center justify-between text-xs font-medium text-[rgb(var(--accent))] group-hover:underline">
                  <span>Explorar modelo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
