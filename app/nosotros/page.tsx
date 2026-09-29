// app/nosotros/page.tsx
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { DIAS_DEVOLUCION, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

export const metadata = { title: "Sobre nosotros — MIRAR" };

const PILARES = [
  {
    n: "01 // PROTECCIÓN",
    title: "UV400 en todos los modelos",
    text: "Todas nuestras micas filtran los rayos UVA y UVB para cuidar tu vista en la playa, la carretera o la ciudad.",
  },
  {
    n: "02 // PRECIO JUSTO",
    title: "Calidad que sí se nota",
    text: "Elegimos monturas ligeras y resistentes, y revisamos cada par antes de enviarlo. Sin sobreprecio por una marca.",
  },
  {
    n: "03 // COMPRA SIN RIESGO",
    title: `${DIAS_DEVOLUCION} días para cambios`,
    text: `Si no te convencen, tienes ${DIAS_DEVOLUCION} días para cambiarlos o devolverlos sin uso. Y desde $${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")} el envío es gratis.`,
  },
];

export default function NosotrosPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen transition-colors">
      <section className="px-5 sm:px-8 md:px-12 py-12 lg:py-16 border-b border-[rgb(var(--stroke))]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            SOBRE MIRAR
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.05]">
            Mirar no es solo ver. <br />
            Es elegir qué entra en tu mundo.
          </h1>
          <p className="text-lg sm:text-2xl text-[rgb(var(--secondary))] leading-relaxed pt-2 max-w-2xl mx-auto">
            MIRAR es una tienda mexicana de lentes de sol. Creemos que unos buenos lentes no tienen por qué costar
            una fortuna: buscamos modelos bien hechos, con protección real, a un precio accesible.
          </p>
          <div className="pt-6">
            <Link href="/catalog" className="btn-apple-primary px-7 py-3 text-sm font-medium rounded-full shadow-sm">
              Ver el catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-12 lg:py-16 border-b border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
              LO QUE NOS IMPORTA
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] mt-1">Calidad por precio.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PILARES.map((p) => (
              <div key={p.n} className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-3">
                <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))] block">{p.n}</span>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-10 lg:py-12 max-w-6xl mx-auto">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-900 border border-[rgb(var(--stroke))] shadow-xl">
          <Image src="/images/hero-brisa.jpg" alt="Lentes de sol MIRAR en la playa al atardecer" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h3 className="text-lg sm:text-2xl font-semibold">Lentes para todos los días.</h3>
            <Link href="/catalog" className="text-xs font-medium text-amber-300 hover:underline inline-flex items-center gap-1">
              <span>Ver modelos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
