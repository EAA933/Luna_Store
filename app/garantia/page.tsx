import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, CheckCircle2, RotateCcw, Wrench } from "lucide-react";

export default function GarantiaPage() {
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
            POLÍTICA DE CALIDAD MIRAR
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Garantía Endure Vitalicia
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-6 text-sm text-floema-fg/85 leading-relaxed font-sans mb-8">
          <p>
            Nuestros objetos no están concebidos para caducar. Cada montura MIRAR cuenta con una <strong>Garantía Endure Vitalicia de Reparabilidad</strong> contra defectos de fabricación o ensamblaje estructural.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[rgb(var(--stroke))] font-mono text-xs">
            <div className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))]">
              <span className="text-floema-fg font-bold block mb-1">✓ REAJUSTE MECÁNICO GRATUITO</span>
              <p className="text-floema-fg/70 font-sans text-xs">
                Alineación de varillas y ajuste del puente anatómico en cualquier momento sin costo alguno.
              </p>
            </div>
            <div className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))]">
              <span className="text-floema-fg font-bold block mb-1">✓ SUSTITUCIÓN DE COMPONENTES</span>
              <p className="text-floema-fg/70 font-sans text-xs">
                Disponibilidad garantizada de tornillería, almohadillas y piezas de repuesto durante 10 años.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
