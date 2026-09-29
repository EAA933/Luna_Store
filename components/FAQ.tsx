// components/FAQ.tsx
"use client";
import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Los lentes tienen protección UV?",
    a: "Sí. Todos nuestros modelos tienen protección UV400, que filtra los rayos UVA y UVB para cuidar tu vista del sol.",
  },
  {
    q: "¿Son polarizados?",
    a: "Depende del modelo: en cada ficha indicamos si la mica es polarizada o no. Todos, polarizados o no, tienen protección UV400.",
  },
  {
    q: "¿Puedo cambiarlos o devolverlos?",
    a: "Sí. Tienes 14 días naturales desde que los recibes. El producto debe estar sin uso, en buen estado y con su empaque y accesorios. Revisamos cada devolución al recibirla antes de aprobar el cambio o el reembolso. Consulta la política completa en Cambios y devoluciones.",
  },
  {
    q: "¿Cuánto cuesta el envío y a dónde envían?",
    a: "Enviamos a todo México. El envío es gratis en compras desde $1,299 MXN; en compras menores el costo depende de tu estado y lo ves antes de pagar.",
  },
  {
    q: "¿Cómo puedo pagar?",
    a: "Con Mercado Pago: tarjeta de crédito o débito, efectivo en OXXO y otros medios. Si pagas en OXXO, tienes 48 horas para hacerlo; después el pedido se cancela automáticamente.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto my-16">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="w-2 h-2 bg-floema-accent border border-floema-fg" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--secondary))]">
          DUDAS FRECUENTES
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
