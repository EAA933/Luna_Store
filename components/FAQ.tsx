// components/FAQ.tsx
"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Qué es el material rePlastic® y cómo se regenera?",
    a: "rePlastic® es nuestro polímero circular patentado. Se fabrica recuperando redes de pesca de aguas marinas y residuos plásticos urbanos seleccionados. Pasan por despolimerización molecular para obtener una resina con pureza óptica y resistencia indestructible.",
  },
  {
    q: "¿Todas las micas MIRAR cuentan con protección UV400?",
    a: "Absolutamente sí. El 100% de nuestras micas minerales y de policarbonato CR-39 bloquean longitudes de onda hasta 400 nanómetros (rayos UVA, UVB y UVC), cumpliendo la estricta normativa europea ISO 12312-1.",
  },
  {
    q: "¿En qué consiste la Garantía Endure Vitalicia?",
    a: "Cubre cualquier defecto de fabricación, fatiga de material en bisagras remachadas o ensamblaje de por vida. Además, incluye servicio de alineación, limpieza ultrasónica y calibrado de presión gratuito.",
  },
  {
    q: "¿Tiempos de envío y cobertura?",
    a: "Enviamos a todo México (de 2 a 4 días hábiles vía DHL Express) y cobertura internacional asegurada. Cada pieza viaja en embalaje de cartón mineral protegido contra impactos.",
  },
  {
    q: "¿Cómo funciona el programa de reciclaje rePlastic® Trade-In?",
    a: "Si después de años deseas renovar tu montura, nos envías la pieza antigua. La desensamblamos para recircular el polímero y te otorgamos un 25% de crédito para tu siguiente objeto MIRAR.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto my-16">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="w-2 h-2 bg-floema-accent border border-floema-fg" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--secondary))]">
          RESOLUCIÓN DE DUDAS TÉCNICAS
        </span>
      </div>

      <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight mb-8">
        Preguntas Frecuentes
      </h2>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="floema-card overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-5 text-left font-sans font-black uppercase text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-[rgb(var(--bg))]/50 transition-colors"
            >
              <span>{f.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-floema-fg flex-shrink-0 transition-transform duration-300 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-floema-fg/80 font-sans leading-relaxed border-t border-[rgb(var(--stroke))]">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
