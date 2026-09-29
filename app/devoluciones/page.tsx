import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DIAS_DEVOLUCION } from "@/lib/tienda";

export const metadata = { title: "Cambios y devoluciones — MIRAR" };

export default function DevolucionesPage() {
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
          Política de cambios y devoluciones
        </span>
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          {DIAS_DEVOLUCION} días para cambios y devoluciones
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-6 text-sm text-floema-fg/85 leading-relaxed font-sans mb-8">
          <p>
            Queremos que estés contento con tus lentes. Tienes <strong>{DIAS_DEVOLUCION} días naturales a partir de
            que recibes tu pedido</strong> para solicitar un cambio de modelo o la devolución de tu dinero.
          </p>

          <div>
            <h2 className="font-bold text-base mb-2">Condiciones</h2>
            <p className="mb-2">Para que un cambio o devolución proceda, el producto debe:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Estar <strong>sin uso</strong> y en buen estado: sin rayones, golpes, marcas ni piezas dañadas.</li>
              <li>Regresar con su <strong>empaque original</strong> y todos sus accesorios (estuche, paño, etiquetas).</li>
              <li>Acompañarse del <strong>folio de tu pedido</strong> (empieza con MR-).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-base mb-2">Revisión del producto</h2>
            <p>
              Todos los productos devueltos se revisan al llegar a MIRAR. Si el producto cumple las condiciones,
              hacemos el cambio o el reembolso. Si llega usado, dañado o incompleto, la devolución no procede y te
              lo regresamos. Te avisamos el resultado de la revisión en un máximo de 5 días hábiles después de
              recibirlo.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-base mb-2">Cómo solicitarlo</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Escríbenos dentro de los {DIAS_DEVOLUCION} días con tu folio y el motivo.</li>
              <li>Te enviamos las instrucciones y la dirección para el envío de regreso.</li>
              <li>Revisamos el producto al recibirlo y te confirmamos el cambio o el reembolso.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-bold text-base mb-2">Reembolsos y costos de envío</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>El reembolso se hace al mismo medio con el que pagaste, a través de Mercado Pago. El tiempo en que
                se refleja depende de tu banco.</li>
              <li>Si el producto llegó con defecto de fábrica o no es el que pediste, MIRAR cubre el envío de regreso.</li>
              <li>En cualquier otro caso (por ejemplo, si cambiaste de opinión), el envío de regreso corre por cuenta
                del cliente.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
