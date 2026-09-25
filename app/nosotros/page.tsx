// app/nosotros/page.tsx
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ChevronRight, ShieldCheck, Recycle, CheckCircle2, Sparkles, Sun } from "lucide-react";

export default function NosotrosPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen transition-colors">
      {/* SECCIÓN PRINCIPAL: EL MANIFIESTO MIRAR */}
      <section className="px-5 sm:px-8 md:px-12 py-20 lg:py-28 border-b border-[rgb(var(--stroke))]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            EL MANIFIESTO MIRAR
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-[rgb(var(--fg))] leading-[1.05]">
            Mirar no es solo ver. <br />
            Es elegir qué entra en tu mundo.
          </h1>

          <p className="text-lg sm:text-2xl text-[rgb(var(--secondary))] font-normal leading-relaxed pt-2 max-w-2xl mx-auto">
            Creemos en una relación pausada, táctil y consciente con los objetos que llevamos a diario. Cada montura es concebida con la solidez de una pieza de arquitectura y la ligereza del aire.
          </p>

          <p className="text-sm sm:text-base text-[rgb(var(--secondary))] max-w-xl mx-auto leading-relaxed pt-1 font-normal">
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

      {/* SECCIÓN DE HISTORIA Y DISCIPLINA */}
      <section className="px-5 sm:px-8 md:px-12 py-20 lg:py-28 border-b border-[rgb(var(--stroke))] bg-[rgb(var(--card))]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
              HISTORIA &amp; DISCIPLINA
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
              El arte de observar la luz.
            </h2>
            <p className="text-sm sm:text-base text-[rgb(var(--secondary))] mt-3 leading-relaxed">
              MIRAR nace de una convicción arquitectónica: los objetos que usamos a diario deben responder a los mismos principios que un buen edificio —estructura sólida, materiales nobles que envejecen con carácter y durabilidad más allá de modas pasajeras.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-3">
              <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))] block">
                01 // ECONOMÍA CIRCULAR
              </span>
              <h3 className="text-xl font-semibold text-[rgb(var(--fg))]">
                100% rePlastic®
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">
                Polímeros regenerados a partir de redes de pesca abandonadas en el mar y bio-acetato de celulosa vegetal sin derivados del petróleo.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-3">
              <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))] block">
                02 // ÓPTICA RIGUROSA
              </span>
              <h3 className="text-xl font-semibold text-[rgb(var(--fg))]">
                Protección UV400
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">
                Micas minerales y polarizadas HD certificadas bajo norma europea EN ISO 12312-1 con tratamiento antirreflejo posterior.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] space-y-3">
              <span className="text-xs uppercase font-medium text-[rgb(var(--secondary))] block">
                03 // GARANTÍA VITALICIA
              </span>
              <h3 className="text-xl font-semibold text-[rgb(var(--fg))]">
                Reparable para Siempre
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">
                Bisagras mecánicas de 7 gavilanes remachadas a mano. Si tu montura sufre un accidente, nuestro taller la restaura sin generar residuos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOTOGRAFÍA EDITORIAL DE ESTILO DE VIDA */}
      <section className="px-5 sm:px-8 md:px-12 py-16 max-w-6xl mx-auto">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-900 border border-[rgb(var(--stroke))] shadow-xl">
          <Image
            src="/images/hero-person-sunset.jpg"
            alt="Persona en la playa con lentes de sol MIRAR"
            fill
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-medium tracking-wider text-white/80 block">
                TALLER INDEPENDIENTE
              </span>
              <h3 className="text-lg sm:text-2xl font-semibold">
                La pureza de la forma al servicio de la mirada.
              </h3>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-medium text-amber-300 hover:underline inline-flex items-center gap-1"
            >
              <span>Ver colección de monturas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
