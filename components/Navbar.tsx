// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import CartButton from "@/components/cart/CartButton";
import ThemeToggle from "@/components/ThemeToggle";
import { Search, Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Brisa", href: "/product/brisa-costera" },
  { name: "Duna", href: "/product/duna-ambar" },
  { name: "Marea", href: "/product/marea-marina" },
  { name: "Ocaso", href: "/product/ocaso-solar" },
  { name: "Tecnología Óptica", href: "/#lightlab" },
  { name: "Catálogo", href: "/catalog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCollection = searchParams.get("collection");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Cinta superior minimalista al estilo de anuncios de Apple */}
      <div className="w-full bg-[rgb(var(--card))] border-b border-[rgb(var(--stroke))] px-4 py-1.5 text-center text-xs text-[rgb(var(--secondary))] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Envío express de cortesía en todas las órdenes. 30 días de prueba en casa.</span>
          <Link
            href="/catalog"
            className="text-[rgb(var(--accent))] hover:underline inline-flex items-center gap-0.5 font-medium ml-1"
          >
            <span>Ver modelos</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Barra de Navegación Principal con cristal esmerilado */}
      <nav className="w-full backdrop-blur-xl bg-[rgb(var(--bg))]/80 border-b border-[rgb(var(--stroke))] transition-colors">
        <div className="container-floema h-12 md:h-14 flex items-center justify-between">
          {/* Logotipo */}
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <Logo withTag={false} />
          </Link>

          {/* Enlaces de navegación de escritorio estilo Apple */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] font-normal text-[rgb(var(--fg))]/80">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors hover:text-[rgb(var(--fg))] ${
                    isActive ? "text-[rgb(var(--fg))] font-medium" : "text-[rgb(var(--secondary))]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Acciones del extremo derecho: Buscar, Carrito, Modo Oscuro */}
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              aria-label="Buscar lentes"
              className="p-1.5 text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] transition-colors rounded-full hover:bg-[rgb(var(--card))]"
            >
              <Search className="w-4 h-4" />
            </Link>

            <ThemeToggle />

            <CartButton />

            {/* Menú hamburguesa móvil */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] transition-colors rounded-full"
              aria-label="Alternar menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable estilo Apple */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[rgb(var(--stroke))] bg-[rgb(var(--bg))]/98 backdrop-blur-2xl px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-[rgb(var(--fg))] hover:text-[rgb(var(--accent))] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[rgb(var(--secondary))]" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgb(var(--stroke))] flex items-center justify-between text-xs text-[rgb(var(--secondary))]">
              <span>Garantía de por vida en todas las monturas</span>
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[rgb(var(--accent))] font-medium hover:underline"
              >
                Comprar →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
