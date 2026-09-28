import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TerminosPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-floema-fg min-h-screen">
      <section className="container-floema py-10 sm:py-12 max-w-4xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase mb-6 hover:text-floema-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-floema-accent border border-floema-fg" />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--secondary))]">
            CONDICIONES DE CONTRATACIÓN & SERVICIO
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Términos de Servicio
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-floema-fg/85 leading-relaxed font-sans">
          <p>
            Al comprar en MIRAR aceptas estas condiciones: tienes 30 días naturales de prueba a partir de la entrega y el envío es gratis a todo México en compras desde $1,299 MXN (en compras menores se cotiza al confirmar el pedido).
          </p>
          <p>
            Todos los precios están expresados en pesos mexicanos (MXN) e incluyen impuestos. Los modelos están sujetos a disponibilidad de inventario; el pago y el envío se coordinan por WhatsApp al confirmar tu pedido.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
