// components/home/CategoriesSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const collections = [
  {
    tag: "COLECCIÓN URBAN",
    title: "Urban Structures",
    desc: "Acero quirúrgico 316L cepillado y líneas rectas depuradas pensadas para habitar los contrastes de la gran ciudad.",
    image: "/images/image1.png",
    link: "/catalog?collection=Urban",
    badge: "Acero Quirúrgico 316L",
  },
  {
    tag: "COLECCIÓN NATURE",
    title: "Botanical & Cellulose",
    desc: "Acetato de celulosa vegetal curado en reposo estático. Pigmentos orgánicos inspirados en cortezas y carey cálido.",
    image: "/images/image2.png",
    link: "/catalog?collection=Nature",
    badge: "Bio-Acetato de Algodón 8mm",
  },
  {
    tag: "INNOVACIÓN CIRCULAR",
    title: "rePlastic® Marine",
    desc: "Polímeros regenerados procedentes de redes de pesca recuperadas del mar. Resistencia elástica y cero plástico virgen.",
    image: "/images/image3.png",
    link: "/catalog?collection=rePlastic",
    badge: "0% Plástico Virgen",
  },
  {
    tag: "COLECCIÓN HORIZON",
    title: "Horizon Optics",
    desc: "Micas minerales polarizadas multicapa con protección UV400 completa para mar abierto y luz rasante.",
    image: "/images/image4.png",
    link: "/catalog?collection=Horizon",
    badge: "Titanio Aeroespacial",
  },
];

export default function Collections() {
  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Editorial Apple */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            ARQUITECTURA DE MATERIALES
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Cuatro líneas. <br />Una obsesión con la luz.
          </h2>
          <p className="text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
            Cada colección responde a una necesidad óptica específica: desde la densidad urbana hasta la navegación en alta mar.
          </p>
        </div>

        {/* Grilla editorial espaciosa y limpia */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.link}
              className="group rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] p-8 sm:p-12 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-[rgb(var(--stroke-strong))]"
            >
              <div>
                <span className="text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] block mb-1">
                  {col.tag}
                </span>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors">
                  {col.title}
                </h3>

                <p className="text-sm text-[rgb(var(--secondary))] mt-2.5 max-w-md leading-relaxed font-normal">
                  {col.desc}
                </p>
              </div>

              {/* Imagen protagonista */}
              <div className="relative aspect-[16/9] w-full my-8 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </div>

              {/* Pie de tarjeta con insignia sutil y enlace */}
              <div className="pt-4 border-t border-[rgb(var(--stroke))] flex items-center justify-between">
                <span className="text-xs text-[rgb(var(--secondary))] font-medium">
                  {col.badge}
                </span>

                <span className="inline-flex items-center gap-1 text-sm font-medium text-[rgb(var(--accent))] group-hover:underline">
                  <span>Explorar colección</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
