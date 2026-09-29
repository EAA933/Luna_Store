import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DIAS_DEVOLUCION, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

export const metadata = { title: "Calidad y envíos — MIRAR" };

export default function GarantiaPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-floema-fg min-h-screen">
      <section className="container-floema py-10 sm:py-12 max-w-3xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase mb-6 hover:text-floema-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <span className="block font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--secondary))] mb-3">
          Nuestro compromiso
        </span>
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Calidad y envíos
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-6 text-sm text-floema-fg/85 leading-relaxed font-sans mb-8">
          <p>
            En MIRAR vendemos lentes de sol de calidad a un precio accesible. Todos nuestros modelos tienen
            <strong> protección UV400</strong> contra rayos UVA y UVB, y revisamos cada par antes de enviarlo.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[rgb(var(--stroke))] font-mono text-xs">
            <div className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))]">
              <span className="text-floema-fg font-bold block mb-1">✓ {DIAS_DEVOLUCION} DÍAS PARA CAMBIOS</span>
              <p className="text-floema-fg/70 font-sans text-xs">
                Cambios y devoluciones con el producto sin uso y en buen estado.{" "}
                <Link href="/devoluciones" className="underline">Ver condiciones</Link>.
              </p>
            </div>
            <div className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))]">
              <span className="text-floema-fg font-bold block mb-1">
                ✓ ENVÍO GRATIS DESDE ${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")}
              </span>
              <p className="text-floema-fg/70 font-sans text-xs">
                Enviamos a todo México. En compras menores, el costo depende de tu estado y lo ves antes de pagar.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
