// components/home/AboutUs.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="w-full px-5 sm:px-8 md:px-12 py-24 lg:py-36 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
          EL MANIFIESTO MIRAR
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-[rgb(var(--fg))] leading-[1.05]">
          Mirar no es solo ver. <br />
          Es elegir qué entra en tu mundo.
        </h2>

        <p className="text-lg sm:text-2xl text-[rgb(var(--secondary))] font-normal leading-relaxed pt-2 max-w-2xl mx-auto">
          Creemos en una relación pausada, táctil y consciente con los objetos que llevamos a diario. Cada montura es concebida con la solidez de una pieza de arquitectura y la ligereza del aire.
        </p>

        <p className="text-sm sm:text-base text-[rgb(var(--secondary))] max-w-xl mx-auto leading-relaxed pt-1">
          Sin logotipos gigantescos. Sin plásticos desechables. Solo materia honesta, micas de precisión óptica y un calce perfecto para acompañarte durante décadas.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="btn-apple-primary px-7 py-3 text-sm font-medium rounded-full shadow-sm"
          >
            <span>Explorar catálogo completo</span>
          </Link>

          <Link
            href="/#lightlab"
            className="btn-apple-secondary px-6 py-3 text-sm font-medium rounded-full inline-flex items-center gap-1"
          >
            <span>Probar simulador óptico</span>
            <ChevronRight className="w-4 h-4 text-[rgb(var(--secondary))]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
