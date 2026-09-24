"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/store/ProductCard";
import { products } from "@/lib/products";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

/* ── Categorías: tres fotos grandes con zoom lento al pasar el mouse ── */
const CATEGORIAS = [
  { href: "/catalog?segment=women", label: "Mujer", img: "/images/cat2.png", nota: "Siluetas redondas y cat-eye" },
  { href: "/catalog?segment=men", label: "Hombre", img: "/images/cat1.png", nota: "Cuadrados, rectangulares y acero" },
  { href: "/catalog?segment=unisex", label: "Unisex", img: "/images/cat3.png", nota: "Para quien sea, donde sea" },
];

export function Categorias() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-4 md:grid-cols-3">
        {CATEGORIAS.map((c, i) => (
          <Reveal key={c.href} delay={i * 0.08}>
            <Link href={c.href} className="group relative block aspect-[4/5] overflow-hidden bg-stone">
              <img
                src={c.img}
                alt={`Lentes para ${c.label.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                <div>
                  <p className="font-display text-4xl text-white">{c.label}</p>
                  <p className="mt-1 text-sm text-white/80">{c.nota}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Los más buscados: rejilla con un bloque editorial intercalado ── */
export function MasBuscados() {
  const [a, b, c, d, e, f] = products;
  return (
    <section className="container pb-20 md:pb-28">
      <div className="mb-10 flex items-end justify-between gap-6 border-t border-line pt-10">
        <LineReveal lines={["Los más buscados"]} className="text-4xl md:text-6xl font-medium" />
        <Link href="/catalog" className="link-underline shrink-0 pb-2 text-[15px] font-medium">
          Ver todos ({products.length}) →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {[a, b, c, d].map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07}><ProductCard p={p} priority={i < 2} /></Reveal>
        ))}

        <Reveal className="col-span-2">
          <Link href="/catalog?segment=unisex" className="group relative block aspect-square md:aspect-auto md:h-full min-h-[320px] overflow-hidden bg-stone">
            <img src="/images/cat1.png" alt="Lentes con mica verde al sol" loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-xs font-display text-3xl md:text-4xl text-white">
              Micas de color, sin perder nitidez.
            </p>
          </Link>
        </Reveal>

        {[e, f].map((p, i) => (
          <Reveal key={p.id} delay={0.1 + i * 0.07}><ProductCard p={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Marquesina con lo que garantiza cada par ── */
const VALORES = ["UV400 en todos los modelos", "Mica polarizada", "Acetato de alto desempeño", "Bisagras metálicas", "12 meses de garantía", "Envío a todo México"];

export function Marquesina() {
  const fila = [...VALORES, ...VALORES];
  return (
    <div className="overflow-hidden border-y border-line bg-white py-5">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {fila.map((v, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl md:text-3xl">
            {v} <span className="text-lg text-noche">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Bloque editorial con parallax ── */
export function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="grid md:grid-cols-2 bg-ink text-white">
      <div className="relative h-[70vh] md:h-auto md:min-h-[88vh] overflow-hidden">
        <motion.img style={{ y }} src="/images/cat2.png" alt="Lentes de acetato color miel sobre fondo arena"
          className="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
        <p className="eyebrow text-white/60">Cómo están hechos</p>
        <LineReveal lines={["Menos logo.", "Más detalle."]} className="mt-5 text-5xl md:text-7xl font-medium text-white" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {[
            ["Acetato de alto desempeño", "Acabado pulido con brillo profundo; se siente firme, no plástico."],
            ["Bisagras metálicas", "Abren suave y aguantan el abrir y cerrar de todos los días."],
            ["Protección UV400", "Bloquea rayos UVA y UVB en toda la línea, con o sin polarizado."],
            ["TR90 flexible", "Ligero y resistente a torceduras, para el uso rudo de todos los días."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <p className="font-display text-2xl text-white">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Guía de formas: útil para elegir y lleva al catálogo filtrado ── */
const FORMAS = [
  { forma: "Redondo", para: "Rostros cuadrados o de facciones marcadas: suaviza ángulos." },
  { forma: "Cuadrado", para: "Rostros redondos u ovalados: añade estructura." },
  { forma: "Cat-eye", para: "Eleva la mirada; favorece rostros de corazón y ovalados." },
  { forma: "Aviador", para: "Versátil; funciona en casi cualquier rostro." },
];

export function GuiaFormas() {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">Guía rápida</p>
          <LineReveal lines={["¿Qué forma", "va contigo?"]} className="mt-4 text-4xl md:text-5xl font-medium" />
          <p className="mt-5 max-w-sm text-ink/70">
            No hay reglas estrictas, pero estas pistas ayudan a empezar.
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FORMAS.map((f, i) => (
            <Reveal key={f.forma} delay={i * 0.06}>
              <Link href={`/catalog?shape=${encodeURIComponent(f.forma)}`}
                className="group flex items-center justify-between gap-6 py-6">
                <div>
                  <p className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-2">{f.forma}</p>
                  <p className="mt-1 text-[15px] text-muted">{f.para}</p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
