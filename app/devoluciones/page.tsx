import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

export default function DevolucionesPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-floema-fg min-h-screen">
      <section className="container-floema py-16 max-w-4xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase mb-8 hover:text-floema-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-floema-accent border border-floema-fg" />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--secondary))]">
            ENSAYO EN ROSTRO // PRUEBA SIN RIESGO
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Prueba de 30 Días en Rostro
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-6 text-sm text-floema-fg/85 leading-relaxed font-sans mb-8">
          <p>
            Sabemos que una montura debe dialogar con tu fisonomía, el arco de tus cejas y el puente nasal. Por eso cuentas con <strong>30 días naturales</strong> desde la recepción para probar tu pieza MIRAR con luz natural.
          </p>

          <p>
            Si sientes que la proporción o el tinte óptico no se ajustan a tu rostro, te proporcionamos una guía de retorno prepagada para cambio de modelo o reembolso íntegro inmediato.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
