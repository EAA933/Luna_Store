import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DIAS_DEVOLUCION, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

export const metadata = { title: "Términos y condiciones — MIRAR" };

export default function TerminosPage() {
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
          Condiciones de compra
        </span>
        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Términos y condiciones
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-5 text-sm text-floema-fg/85 leading-relaxed font-sans">
          <div>
            <h2 className="font-bold text-base mb-1">1. Precios y pagos</h2>
            <p>
              Los precios están en pesos mexicanos (MXN) e incluyen impuestos. Los pagos se procesan de forma segura
              a través de Mercado Pago; MIRAR no ve ni guarda los datos de tu tarjeta. Tu pedido se confirma cuando
              Mercado Pago aprueba el pago.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base mb-1">2. Pedidos sin pagar</h2>
            <p>
              Al iniciar tu pago apartamos las piezas de tu pedido. Si el pago no se completa en 48 horas (por
              ejemplo, una ficha de OXXO sin pagar), el pedido se cancela automáticamente y las piezas vuelven a estar
              disponibles.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base mb-1">3. Envíos</h2>
            <p>
              Enviamos a todo México. El envío es gratis en compras desde ${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")} MXN;
              en compras menores el costo depende del estado de entrega y se muestra antes de pagar.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base mb-1">4. Cambios y devoluciones</h2>
            <p>
              Tienes {DIAS_DEVOLUCION} días naturales a partir de la entrega para solicitar un cambio o devolución.
              El producto debe estar sin uso, en buen estado y con su empaque y accesorios originales. Todos los
              productos devueltos se revisan al llegar a MIRAR antes de aprobar el cambio o el reembolso. Consulta la{" "}
              <Link href="/devoluciones" className="underline">política completa de cambios y devoluciones</Link>.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base mb-1">5. Disponibilidad</h2>
            <p>
              Los modelos están sujetos a disponibilidad de inventario. Las fotos son ilustrativas; el color puede
              variar ligeramente según tu pantalla.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
