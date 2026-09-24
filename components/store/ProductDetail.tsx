"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/components/cart/useCart";
import { detalle, SEGMENTOS, type StoreProduct } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { EASE } from "@/components/ui/Reveal";

/** Foto con zoom que sigue al cursor. */
function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [origen, setOrigen] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative aspect-square overflow-hidden bg-stone md:cursor-zoom-in"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setOrigen(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ transformOrigin: origen }}
        className={`absolute inset-0 h-full w-full object-contain p-[8%] mix-blend-multiply transition-transform duration-500 ease-out ${zoom ? "md:scale-[1.8]" : ""}`}
      />
    </motion.div>
  );
}

function Acordeon({ titulo, children, abierto = false }: { titulo: string; children: React.ReactNode; abierto?: boolean }) {
  const [open, setOpen] = useState(abierto);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left text-[16px] font-semibold" aria-expanded={open}>
        {titulo}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="h-5 w-5" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[15px] leading-relaxed text-ink/75">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail({ p }: { p: StoreProduct }) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);
  const [agregado, setAgregado] = useState(false);

  const agregar = () => {
    add({ id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image });
    setAgregado(true);
    setTimeout(() => { setAgregado(false); setOpen(true); }, 700);
  };

  const specs = [
    ["Forma", p.shape],
    ["Material", p.material],
    ["Mica", p.lensColor],
    ["Protección", p.polarized ? "UV400 · Polarizada" : "UV400"],
    ["Para", SEGMENTOS[p.segment]],
  ];

  return (
    <section className="container grid gap-10 py-8 md:grid-cols-[3fr_2fr] md:gap-16 md:py-12">
      <ZoomImage src={p.image} alt={`Lentes ${p.name}`} />

      <div className="md:sticky md:top-28 md:self-start">
        <nav className="text-[13px] text-muted">
          <Link href="/catalog" className="link-underline">Catálogo</Link>
          <span className="mx-2">/</span>
          <Link href={`/catalog?segment=${p.segment}`} className="link-underline">{SEGMENTOS[p.segment]}</Link>
        </nav>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>
          {p.tag && <span className="mt-6 inline-block border border-ink/80 px-2 py-0.5 text-[12px] font-medium">{p.tag}</span>}
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h1 className="text-5xl md:text-6xl font-medium capitalize">{p.name.toLowerCase()}</h1>
            <p className="text-2xl tabular-nums">{formatCurrency(p.price).replace(".00", "")}</p>
          </div>
          <p className="mt-1 text-muted">{detalle(p)}</p>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/80">{p.description}</p>

          <button onClick={agregar} className="btn-primary mt-8 w-full py-4 text-[16px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={agregado ? "ok" : "add"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 text-white"
              >
                {agregado ? <><Check className="h-5 w-5" /> Agregado</> : "Agregar al carrito"}
              </motion.span>
            </AnimatePresence>
          </button>

          <ul className="mt-6 space-y-2.5 text-[14px] text-ink/75">
            <li className="flex items-center gap-3"><Truck className="h-4 w-4" strokeWidth={1.6} /> Envío a todo México en 2 a 5 días hábiles</li>
            <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" strokeWidth={1.6} /> 12 meses de garantía</li>
            <li className="flex items-center gap-3"><RotateCcw className="h-4 w-4" strokeWidth={1.6} /> 30 días para devolverlos</li>
          </ul>

          <div className="mt-8 border-t border-line">
            <Acordeon titulo="Especificaciones" abierto>
              <dl className="grid grid-cols-2 gap-y-3">
                {specs.map(([k, v]) => (<Fragment key={k}><dt className="text-muted">{k}</dt><dd className="font-medium text-ink">{v}</dd></Fragment>))}
              </dl>
            </Acordeon>
            <Acordeon titulo="Cuidado">
              Guárdalos en su estuche y límpialos con el paño incluido. Evita dejarlos al sol dentro del auto
              y no uses alcohol ni limpiadores abrasivos en las micas.
            </Acordeon>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
