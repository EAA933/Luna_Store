import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacidadPage() {
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
            POLÍTICA DE PRIVACIDAD & PROTECCIÓN DE DATOS
          </span>
        </div>

        <h1 className="font-sans font-black text-4xl sm:text-5xl uppercase tracking-[-0.03em] mb-6">
          Privacidad MIRAR Studio
        </h1>

        <div className="floema-card p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-floema-fg/85 leading-relaxed font-sans">
          <p>
            En MIRAR® Studio tratamos los datos personales de nuestros clientes exclusivamente con el propósito de procesar pedidos, coordinar envíos asegurados y gestionar las garantías Endure de las monturas.
          </p>
          <p>
            No comercializamos ni cedemos información a redes publicitarias de terceros. Toda la comunicación está encriptada bajo estándares SSL/TLS y conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
