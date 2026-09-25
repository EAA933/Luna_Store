// components/Footer.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <footer className="w-full bg-[rgb(var(--card))] text-[rgb(var(--secondary))] text-xs border-t border-[rgb(var(--stroke))] transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-16">
        {/* Aviso legal sutil al estilo Apple */}
        <div className="pb-8 border-b border-[rgb(var(--stroke))] leading-relaxed space-y-2">
          <p>
            1. Todas las monturas MIRAR incluyen micas polarizadas o minerales certificadas con filtro UV400 conforme a la norma europea EN ISO 12312-1.
          </p>
          <p>
            2. El periodo de prueba en casa sin compromiso es válido durante 30 días naturales posteriores a la entrega. Los gastos de devolución corren por cuenta de MIRAR en todo el territorio nacional.
          </p>
          <p>
            3. La garantía vitalicia cubre defectos de fabricación en soldaduras y chasis mecánicos. Los repuestos de micas por desgaste natural están sujetos a disponibilidad de taller.
          </p>
        </div>

        {/* Columnas de navegación del Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 border-b border-[rgb(var(--stroke))]">
          {/* Columna 1: Colecciones */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Colecciones</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog?collection=Urban" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Urban Structures
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Nature" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Botanical &amp; Cellulose
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=rePlastic" className="hover:text-[rgb(var(--fg))] transition-colors">
                  rePlastic® Circular
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Horizon" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Horizon Optics
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Todos los Modelos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Tecnología Óptica */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Tecnología</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#lightlab" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Simulador LightLab
                </Link>
              </li>
              <li>
                <span className="hover:text-[rgb(var(--fg))] cursor-default">
                  Filtros Polarizados HD
                </span>
              </li>
              <li>
                <span className="hover:text-[rgb(var(--fg))] cursor-default">
                  Cristal Mineral Natural
                </span>
              </li>
              <li>
                <span className="hover:text-[rgb(var(--fg))] cursor-default">
                  Bio-Acetato de Algodón
                </span>
              </li>
              <li>
                <span className="hover:text-[rgb(var(--fg))] cursor-default">
                  Acero Quirúrgico 316L
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios & Soporte */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/garantia" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Garantía Vitalicia
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Envíos y Retornos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/#caliber-guide" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Guía de Calibres
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Estudio MIRAR */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Estudio</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[rgb(var(--fg))] transition-colors">
                  Términos Legales
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 5: Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h4 className="font-semibold text-[rgb(var(--fg))]">Novedades</h4>
            <p className="leading-relaxed">
              Recibe anuncios sobre nuevos tirajes y series limitadas.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-2xl bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] text-xs text-[rgb(var(--accent))] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Te has suscrito con éxito.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full px-4 py-2 pr-9 text-xs text-[rgb(var(--fg))] focus:outline-none focus:border-[rgb(var(--accent))]"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse"
                  className="absolute right-2 top-2 p-1 text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Barra de copyright y país inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo withTag={false} />
            <span className="text-[rgb(var(--secondary))]">
              Copyright © {new Date().getFullYear()} MIRAR Inc. Todos los derechos reservados.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[rgb(var(--secondary))]">
            <Link href="/privacidad" className="hover:underline">
              Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terminos" className="hover:underline">
              Ventas y Reembolsos
            </Link>
            <span aria-hidden="true">·</span>
            <span>México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
