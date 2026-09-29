// components/Footer.tsx
import Link from "next/link";
import Logo from "@/components/Logo";
import { DIAS_DEVOLUCION, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

const enlace = "hover:text-[rgb(var(--fg))] transition-colors";

export default function Footer() {
  return (
    <footer className="w-full bg-[rgb(var(--card))] text-[rgb(var(--secondary))] text-xs border-t border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-10">
        {/* Notas de compra */}
        <div className="pb-5 border-b border-[rgb(var(--stroke))] leading-relaxed space-y-2">
          <p>1. Todos los lentes MIRAR tienen protección UV400 contra rayos UVA y UVB.</p>
          <p>
            2. Tienes {DIAS_DEVOLUCION} días naturales a partir de la entrega para cambios y devoluciones, siempre que el
            producto esté sin uso y en buen estado. Consulta las condiciones completas en{" "}
            <Link href="/devoluciones" className="underline">Cambios y devoluciones</Link>.
          </p>
          <p>
            3. Envío gratis a todo México en compras desde ${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")} MXN; en compras
            menores el costo depende de tu estado y se calcula al pagar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-6 sm:py-8 border-b border-[rgb(var(--stroke))]">
          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Tienda</h4>
            <ul className="space-y-2">
              <li><Link href="/catalog" className={enlace}>Todos los modelos</Link></li>
              <li><Link href="/resenas" className={enlace}>Escribir una reseña</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Ayuda</h4>
            <ul className="space-y-2">
              <li><Link href="/devoluciones" className={enlace}>Cambios y devoluciones</Link></li>
              <li><Link href="/garantia" className={enlace}>Calidad y envíos</Link></li>
              <li><Link href="/faq" className={enlace}>Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">MIRAR</h4>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className={enlace}>Sobre nosotros</Link></li>
              <li><Link href="/privacidad" className={enlace}>Aviso de privacidad</Link></li>
              <li><Link href="/terminos" className={enlace}>Términos y condiciones</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span>Copyright © {new Date().getFullYear()} MIRAR Studio. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:underline">Privacidad</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terminos" className="hover:underline">Términos</Link>
            <span aria-hidden="true">·</span>
            <span>México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
