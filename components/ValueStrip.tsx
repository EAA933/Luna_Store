// components/ValueStrip.tsx
import { ShieldCheck, Package, RefreshCw, Sparkles, Award } from "lucide-react";

export default function ValueStrip() {
  const items = [
    {
      icon: ShieldCheck,
      title: "100% Protección UV400",
      text: "Micas ópticas certificadas bajo norma europea EN ISO 12312-1. Filtrado completo contra radiación UV dañina.",
    },
    {
      icon: Package,
      title: "Estuche Rígido Incluido",
      text: "Cada montura incluye estuche de cuero curtido vegetal y paño de microfibra de alta densidad.",
    },
    {
      icon: RefreshCw,
      title: "30 Días de Prueba",
      text: "Pruébalos en casa con luz natural. Si no encajan perfectamente con tu fisonomía, el retorno es gratuito.",
    },
    {
      icon: Award,
      title: "Garantía de por Vida",
      text: "Servicio de ajuste micrométrico de bisagras y reparación vitalicia en nuestro taller independiente.",
    },
  ];

  return (
    <section className="w-full py-20 px-5 sm:px-8 md:px-12 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            COMPROMISO MIRAR
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1">
            La experiencia completa.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="flex flex-col items-start p-8 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--fg))] mb-6 shadow-sm">
                  <Icon className="w-5 h-5 text-[rgb(var(--accent))]" />
                </div>

                <h3 className="font-semibold text-lg text-[rgb(var(--fg))] tracking-tight mb-2">
                  {it.title}
                </h3>

                <p className="text-xs text-[rgb(var(--secondary))] leading-relaxed">
                  {it.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
