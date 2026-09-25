import { LineReveal, Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "Nosotros — MIRAR" };

export default function NosotrosPage() {
  return (
    <main>
      <section className="container grid gap-12 py-16 md:grid-cols-2 md:py-24 md:items-end">
        <div>
          <p className="eyebrow">Nuestra historia</p>
          <LineReveal as="h1" lines={["Materiales honestos,", "diseño sin ruido."]} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.98]" />
        </div>
        <Reveal className="space-y-5 text-[17px] leading-relaxed text-ink/75">
          <p>
            MIRAR nace en un estudio de producto entre Ciudad de México y Monterrey. Nuestro
            enfoque es simple: materiales honestos, fabricación precisa y un diseño que se
            siente todos los días.
          </p>
          <p>
            Mezclamos acetatos de alto desempeño y metales ajustados a tolerancias finas.
            UV400 en toda la línea; opciones polarizadas según el modelo. Menos logo, más producto.
          </p>
        </Reveal>
      </section>

      <Reveal className="container">
        <div className="aspect-[16/7] overflow-hidden bg-stone">
          <img src="/images/caratula.png" alt="Colección MIRAR sobre fondo gris" className="h-full w-full object-cover" />
        </div>
      </Reveal>

      <section className="container grid gap-10 py-20 md:grid-cols-3">
        {[
          ["Materiales", "Acetato de alto desempeño, acero inoxidable y TR90."],
          ["Garantía", "12 meses por defectos de fábrica."],
          ["Proceso", "Ajuste, pulido y control de calidad en cada lote."],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08} className="border-t border-ink pt-5">
            <p className="font-display text-3xl">{t}</p>
            <p className="mt-2 text-ink/70">{d}</p>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
