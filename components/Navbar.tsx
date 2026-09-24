"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/components/cart/useCart";
import { EASE } from "@/components/ui/Reveal";

const ANUNCIOS = [
  "Envío a todo México",
  "UV400 en todos los modelos · polarizado en la mayoría",
  "12 meses de garantía en cada armazón",
];

const LINKS = [
  { href: "/catalog", label: "Todos" },
  { href: "/catalog?segment=women", label: "Mujer" },
  { href: "/catalog?segment=men", label: "Hombre" },
  { href: "/nosotros", label: "Nosotros" },
];

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ANUNCIOS.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-ink text-white text-[12.5px] h-9 grid place-items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-white"
        >
          {ANUNCIOS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function CartButton() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const setOpen = useCartStore((s) => s.setOpen);
  return (
    <button
      onClick={() => setOpen(true)}
      className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-stone transition-colors"
      aria-label={`Abrir carrito (${count} artículos)`}
    >
      <ShoppingBag className="h-[21px] w-[21px]" strokeWidth={1.6} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-noche px-1 text-[10px] font-bold text-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [oculto, setOculto] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY } = useScroll();

  // Se esconde al bajar y reaparece al subir.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setOculto(y > 160 && y > prev);
  });

  useEffect(() => setMenu(false), [pathname, search]);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const activo = (href: string) => {
    const url = new URL(href, "http://x");
    if (url.pathname !== pathname) return false;
    return (search?.get("segment") || "") === (url.searchParams.get("segment") || "");
  };

  return (
    <>
      <motion.header
        animate={{ y: oculto && !menu ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur"
      >
        <AnnouncementBar />
        <div className="container flex h-16 items-center justify-between border-b border-line">
          <div className="flex items-center gap-10">
            <Link href="/" className="font-display text-[28px] font-semibold leading-none tracking-tight">
              luna
            </Link>
            <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={`link-underline py-1 ${activo(l.href) ? "bg-[length:100%_1px]" : ""}`}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/faq" className="hidden md:inline link-underline mr-4 text-[15px] font-medium">Ayuda</Link>
            <CartButton />
            <button
              className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-stone"
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menu}
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[100px] z-40 bg-white md:hidden"
          >
            <ul className="container pt-8">
              {[...LINKS, { href: "/faq", label: "Ayuda" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-b border-line"
                >
                  <Link href={l.href} className="flex items-center justify-between py-5 font-display text-4xl">
                    {l.label} <span className="text-2xl text-muted">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
