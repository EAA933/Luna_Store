"use client";
import { useState } from "react";

const faqs = [
  { q: "¿Son polarizados?", a: "Muchos modelos sí. Revisa la ficha: ‘Polarizado: sí/no’." },
  { q: "Garantía", a: "12 meses por defectos de fábrica. Cambios/devoluciones en 30 días." },
  { q: "¿Envío a todo México?", a: "Sí. $99 MXN o gratis en pedidos desde $1,999 MXN." },
  { q: "Medidas", a: "Publicamos ancho/puente/varilla en cada PDP." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container mt-20 mb-24">
      <h2 className="font-display text-3xl mb-6">Preguntas frecuentes</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((f, i) => (
          <details key={i} open={open === i} onClick={() => setOpen(open === i ? null : i)} className="card p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
