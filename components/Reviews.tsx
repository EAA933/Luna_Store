// components/Reviews.tsx
import { Star, CheckCircle } from "lucide-react";

const reviews = [
  {
    quote: "Paso horas supervisando proyectos bajo sol cenital. El chasis en acero 316L corta los reflejos de las fachadas de vidrio sin alterar la lectura cromática de los materiales.",
    author: "Santiago Morales",
    role: "Arquitecto",
    model: "Orion Monolith",
  },
  {
    quote: "Llevo el modelo Vega en salidas a mar abierto. El polímero de redes recuperadas tiene una flexibilidad asombrosa y pesa apenas 21 gramos en el tabique.",
    author: "Elena Larrea",
    role: "Bióloga Marina",
    model: "Vega rePlastic®",
  },
  {
    quote: "Es el primer diseño óptico en años que no se siente como un accesorio de plástico genérico. Los biseles están tallados con precisión impecable.",
    author: "Mateo Valenzuela",
    role: "Diseñador Industrial",
    model: "Atlas Structure",
  },
  {
    quote: "El tinte de la mica ámbar mineral enriquece los tonos del atardecer con nitidez cristalina. El tacto del bio-acetato de 8mm es de otro nivel.",
    author: "Valeria Fondevila",
    role: "Fotógrafa",
    model: "Selene Arch",
  },
];

export default function Reviews() {
  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            EXPERIENCIAS REALES
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            Diseñados para la vida real.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[rgb(var(--secondary))]">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 de satisfacción general</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div
              key={r.author}
              className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <p className="text-sm text-[rgb(var(--fg))] leading-relaxed font-normal mb-8">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-[rgb(var(--stroke))] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[rgb(var(--fg))]">
                    {r.author}
                  </span>
                  <CheckCircle className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                </div>
                <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))]">
                  <span>{r.role}</span>
                  <span>{r.model}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
