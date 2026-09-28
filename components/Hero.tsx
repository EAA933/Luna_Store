// components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/components/cart/useCart";
import { Check, ChevronRight, Sun } from "lucide-react";

interface ModelHero {
  id: string;
  slug: string;
  name: string;
  ref: string;
  tagline: string;
  material: string;
  finish: string;
  price: number;
  image: string;
  bgImage: string;
  bgFallback: string;
  bgAlt: string;
  atmosphere: string;
  colorDot: string;
  caliber: string;
  weight: string;
  lensSpec: string;
}

const HERO_MODELS: ModelHero[] = [
  {
    id: "1",
    slug: "brisa-costera",
    name: "Brisa",
    ref: "MR-01",
    tagline:
      "Forjado en acero quirúrgico 316L y bio-acetato curado. Una silueta limpia inspirada en la frescura del viento costero.",
    material: "Acero Quirúrgico 316L & Micas Obsidiana",
    finish: "Titanio Grafito",
    price: 1899,
    image: "/images/image1.png",
    bgImage: "/images/hero-person-sunset.jpg",
    bgFallback: "/images/hero-person-sunset.jpg",
    bgAlt: "Persona sintiendo la brisa marina al atardecer con lentes de sol Brisa",
    atmosphere: "Brisa marina al atardecer · 14.5% VLT",
    colorDot: "bg-slate-300",
    caliber: "54 mm",
    weight: "28 g",
    lensSpec: "Obsidiana Polarizada",
  },
  {
    id: "2",
    slug: "duna-ambar",
    name: "Duna",
    ref: "MR-02",
    tagline:
      "Bio-acetato vegetal pulido en seco durante 72 horas. Calidez táctil e iluminación dorada como las dunas del desierto.",
    material: "Bio-Acetato de Algodón 8mm",
    finish: "Carey Ámbar Miel",
    price: 2199,
    image: "/images/image2.png",
    bgImage: "/images/Gemini_Generated_Image_uze0o2uze0o2uze0.jpg",
    bgFallback: "/images/hero-sunset.jpg",
    bgAlt: "Lentes Duna en bio-acetato carey ámbar sobre dunas doradas al atardecer",
    atmosphere: "Sol poniente y arena dorada · Mineral Cat. 3",
    colorDot: "bg-amber-400",
    caliber: "51 mm",
    weight: "34 g",
    lensSpec: "Ámbar Mineral HD",
  },
  {
    id: "3",
    slug: "marea-marina",
    name: "Marea",
    ref: "MR-03",
    tagline:
      "Polímero circular extraído de redes recuperadas del océano. Memoria elástica, ligereza total y protección polarizada.",
    material: "rePlastic® Marino Circular",
    finish: "Verde Salvia Profundo",
    price: 1699,
    image: "/images/image3.png",
    bgImage: "/images/Gemini_Generated_Image_edgigwedgigwedgi.jpg",
    bgFallback: "/images/hero-ocean.jpg",
    bgAlt: "Lentes Marea en polímero marino frente al oleaje y costa abierta",
    atmosphere: "Marea alta y reflejos acuáticos · Polarizado HD",
    colorDot: "bg-emerald-400",
    caliber: "49 mm",
    weight: "21 g",
    lensSpec: "Salvia Polarizado HD",
  },
  {
    id: "4",
    slug: "ocaso-solar",
    name: "Ocaso",
    ref: "MR-04",
    tagline:
      "Doble puente aviador contemporáneo de cobre y titanio con lentes degradadas para contemplar la caída del sol.",
    material: "Cobre & Titanio Grado Aeroespacial",
    finish: "Cobre Pulido al Ocaso",
    price: 2399,
    image: "/images/image4.png",
    bgImage: "/images/Gemini_Generated_Image_aofjj1aofjj1aofj.jpg",
    bgFallback: "/images/hero-lifestyle.jpg",
    bgAlt: "Lentes aviador Ocaso contemplando el horizonte crepuscular de atardecer",
    atmosphere: "Hora dorada en el horizonte · Doble filtro UV400",
    colorDot: "bg-orange-400",
    caliber: "58 mm",
    weight: "26 g",
    lensSpec: "Azul Ocaso Gradiente",
  },
];

export default function Hero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const [customBgs, setCustomBgs] = useState<Record<string, string>>({});

  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);

  const current = HERO_MODELS[selectedIdx];

  useEffect(() => {
    fetch("/api/upload-hero")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          const updated: Record<string, string> = {};
          if (data.status.duna)
            updated["2"] = `/images/Gemini_Generated_Image_uze0o2uze0o2uze0.jpg?v=${Date.now()}`;
          if (data.status.marea)
            updated["3"] = `/images/Gemini_Generated_Image_edgigwedgigwedgi.jpg?v=${Date.now()}`;
          if (data.status.ocaso)
            updated["4"] = `/images/Gemini_Generated_Image_aofjj1aofjj1aofj.jpg?v=${Date.now()}`;
          setCustomBgs(updated);
        }
      })
      .catch(() => {});
  }, []);

  const handleUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", current.slug);

    try {
      const res = await fetch("/api/upload-hero", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.path) {
        setCustomBgs((prev) => ({ ...prev, [current.id]: data.path }));
        setUploadToast(`Fondo aplicado a ${current.name}`);
        setTimeout(() => setUploadToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  const activeBg =
    customBgs[current.id] ||
    (imgErrors[current.id] ? current.bgFallback : current.bgImage);

  function handleBuy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add(
      {
        id: current.id,
        slug: current.slug,
        name: `${current.name.toUpperCase()}`,
        price: current.price,
        image: current.image,
      },
      1
    );
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="relative w-full bg-[rgb(var(--bg))] pt-3 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 md:px-10 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* LIENZO HERO PRINCIPAL MINIMALISTA CON FONDO DINÁMICO */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="relative w-full min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden border border-[rgb(var(--stroke))] shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all"
        >
          {/* OVERLAY DE ARRASTRE SUTIL */}
          {isDragging && (
            <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm border-2 border-dashed border-amber-400 rounded-3xl flex items-center justify-center pointer-events-none transition-all">
              <div className="text-center p-6 bg-stone-900/90 rounded-2xl border border-white/10 shadow-2xl">
                <p className="text-base font-medium text-white">
                  Suelta la imagen para {current.name}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Se guardará como fondo oficial de este modelo
                </p>
              </div>
            </div>
          )}

          {/* NOTIFICACIÓN DISCRETA DE FONDO ACTUALIZADO */}
          {uploadToast && (
            <div className="absolute top-6 right-6 z-40 px-4 py-2 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs shadow-xl animate-in fade-in slide-in-from-top-2">
              ✓ {uploadToast}
            </div>
          )}
          
          {/* 1. FONDO FOTOGRÁFICO DINÁMICO QUE CAMBIA CON CADA MODELO REFLEJANDO SU NOMBRE */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.id}-${activeBg}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeBg}
                  alt={current.bgAlt}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                  onError={() => {
                    setImgErrors((prev) => ({ ...prev, [current.id]: true }));
                  }}
                />
                {/* Degradados sutiles para legibilidad y elegancia visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/70 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. ARRIBA A LA IZQUIERDA: IDENTIDAD, SELECTOR MINIMALISTA Y ESPECIFICACIONES */}
          <div className="relative z-10 max-w-xl text-left space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/90 shadow-sm"
              >
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>{current.atmosphere}</span>
              </motion.div>
            </AnimatePresence>

            {/* Título arriba a la izquierda */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.05] drop-shadow-md">
              Óptica de precisión.
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-xs sm:text-sm md:text-base text-white/80 max-w-md font-normal leading-relaxed drop-shadow-sm min-h-[44px]"
              >
                {current.tagline}
              </motion.p>
            </AnimatePresence>

            {/* SELECTOR DE SILUETAS LIMPIO Y MINIMALISTA (BRISA, DUNA, MAREA, OCASO) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 block mr-1 font-medium">
                Modelo:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                {HERO_MODELS.map((m, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      className={`px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-white text-black shadow-md scale-105 font-semibold"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${m.colorDot} flex-shrink-0`} />
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ficha técnica flotante del modelo seleccionado */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] text-white/90"
              >
                <span className="font-semibold text-white">Calibre {current.caliber}</span>
                <span className="text-white/40">•</span>
                <span>{current.lensSpec}</span>
                <span className="text-white/40">•</span>
                <span>{current.weight}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. ESPACIO CENTRAL LIMPIO Y NEGATIVO PARA APRECIAR LA FOTOGRAFÍA */}
          <div className="flex-1 min-h-[60px] sm:min-h-[100px]" />

          {/* 4. ABAJO: PRECIO A LA IZQUIERDA Y BOTONES A LA DERECHA */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-white/15">
            {/* Especificaciones sutiles a la izquierda abajo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-white/90 text-xs space-y-0.5 drop-shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{current.name}</span>
                  <span className="text-white/60">({current.ref})</span>
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span className="text-amber-300 font-semibold text-sm">
                    ${current.price.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <p className="text-white/70 text-[11px]">
                  {current.finish} · {current.material}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* BOTONES A LA DERECHA ABAJO: COMPRAR Y CONOCER MÁS */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-end">
              <button
                type="button"
                onClick={handleBuy}
                className="px-6 py-2.5 text-xs sm:text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Listo en la bolsa</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key={current.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      Comprar {current.name} — ${current.price.toLocaleString("es-MX")} MXN
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href={`/product/${current.slug}`}
                className="px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full bg-black/40 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-1"
              >
                <span>Conocer más</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
