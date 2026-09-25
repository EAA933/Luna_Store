// components/home/AtelierCraft.tsx
import { ShieldCheck, Recycle, Layers, Sliders, CheckCircle2 } from "lucide-react";

export default function AtelierCraft() {
  const craftSteps = [
    {
      step: "01",
      title: "100% rePlastic® Marino",
      desc: "Redes de pesca recuperadas del mar y polímeros post-consumo regenerados molecularmente. Cero plástico virgen y memoria elástica absoluta.",
      metric: "0% Virgen",
    },
    {
      step: "02",
      title: "Bio-Acetato de Algodón",
      desc: "Bloques de celulosa vegetal sin solventes derivados del petróleo. Curado durante 120 días en cámara climática para eliminar micro-tensiones.",
      metric: "120 Días",
    },
    {
      step: "03",
      title: "Bisagras de 7 Gavilanes",
      desc: "Chasis reforzado con pernos pasantes remachados a mano. Diseñadas para soportar más de 50,000 ciclos mecánicos de apertura.",
      metric: "50,000 Ciclos",
    },
    {
      step: "04",
      title: "Garantía de por Vida",
      desc: "Si tu montura sufre un accidente, nuestro taller la desmonta, repara y reacondiciona. Diseñado para nunca terminar en un vertedero.",
      metric: "Vitalicia",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-32 px-5 sm:px-8 md:px-12 bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
            INGENIERÍA &amp; MATERIA
          </span>
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))] mt-1 leading-[1.05]">
            Materia noble. <br />Tolerancias microscópicas.
          </h2>
          <p className="text-base sm:text-lg text-[rgb(var(--secondary))] mt-4 leading-relaxed font-normal">
            En un mercado saturado de monturas plásticas desechables, en MIRAR concebimos cada pieza como una obra de ingeniería duradera, reparable y respetuosa con el entorno.
          </p>
        </div>

        {/* 4 Pilares de Construcción */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {craftSteps.map((s) => (
            <div
              key={s.step}
              className="p-8 rounded-3xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[rgb(var(--stroke-strong))]"
            >
              <div>
                <span className="text-3xl font-semibold text-[rgb(var(--fg))] block mb-4 tracking-tight">
                  {s.metric}
                </span>

                <h3 className="text-lg font-semibold text-[rgb(var(--fg))] tracking-tight mb-2">
                  {s.title}
                </h3>

                <p className="text-sm text-[rgb(var(--secondary))] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgb(var(--stroke))] text-xs text-[rgb(var(--secondary))] font-medium flex items-center justify-between">
                <span>Paso {s.step}</span>
                <CheckCircle2 className="w-4 h-4 text-[rgb(var(--accent))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
