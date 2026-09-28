// components/home/PorQueMirar.tsx
// Una sola sección de marca: manifiesto + los tres compromisos que sí cumplimos.
// Reemplaza a AtelierCraft, WhyUs, AboutUs y ValueStrip (decían lo mismo cuatro veces).
import Link from "next/link";
import { Sun, ShieldCheck, Truck } from "lucide-react";
import { ENVIO_GRATIS_DESDE, DIAS_PRUEBA } from "@/lib/tienda";

const PILARES = [
  {
    n: "01",
    icon: Sun,
    title: "Protección UV400",
    text: "Todas nuestras micas filtran la radiación ultravioleta para cuidar tu vista en la playa, la carretera o la ciudad.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: `Calidad con ${DIAS_PRUEBA} días de prueba`,
    text: `Revisamos cada par antes de enviarlo. Si en ${DIAS_PRUEBA} días no te convencen, escríbenos y lo resolvemos contigo.`,
  },
  {
    n: "03",
    icon: Truck,
    title: `Envío gratis desde $${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")}`,
    text: "Enviamos a todo México. En compras menores te cotizamos el envío por WhatsApp al confirmar tu pedido.",
  },
];

export default function PorQueMirar() {
  return (
    <section
      id="por-que-mirar"
      className="w-full px-5 sm:px-8 md:px-12 py-14 lg:py-20 bg-[rgb(var(--bg))] border-b border-[rgb(var(--stroke))] transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-end mb-10 lg:mb-14">
          <div>
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))]">
              ¿Por qué elegir MIRAR?
            </span>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-[rgb(var(--fg))] mt-2 leading-[1.05]">
              Mirar no es solo ver.
              <br />
              Es elegir qué entra en tu mundo.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base sm:text-lg text-[rgb(var(--secondary))] leading-relaxed">
              Hacemos lentes de sol sin logotipos gigantes ni promesas infladas: monturas bien hechas, micas que
              protegen y un trato directo contigo desde el pedido hasta que los estrenas.
            </p>
            <Link
              href="/catalog"
              className="btn-apple-primary inline-flex px-7 py-3 text-sm font-medium rounded-full shadow-sm"
            >
              Ver el catálogo
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PILARES.map(({ n, icon: Icon, title, text }) => (
            <div
              key={n}
              className="p-7 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] flex flex-col transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-11 h-11 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[rgb(var(--accent))]" />
                </div>
                <span className="font-mono text-xs text-[rgb(var(--secondary))]">{n}</span>
              </div>
              <h3 className="font-semibold text-xl text-[rgb(var(--fg))] tracking-tight mb-2">{title}</h3>
              <p className="text-sm text-[rgb(var(--secondary))] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
