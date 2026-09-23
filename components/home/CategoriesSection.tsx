// components/Collections.tsx
"use client";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Lentes Carey",
    desc: "Clásicos con textura y un toque vintage.",
    image: "images/cat2.png",
  },
  {
    title: "Lentes Polarizados",
    desc: "Para días brillantes y viajes sin reflejos.",
    image: "images/cat1.png",
  },
  {
    title: "Lentes para Fiesta",
    desc: "Dale estilo a cada momento con un toque atrevido.",
    image: "images/cat3.png",
  },
];

export default function Collections() {
  return (
    <section className="w-full py-20 bg-[rgb(var(--bg))]">
      <h2 className="font-display text-3xl text-center mb-12">Colecciones</h2>
      <div className="grid md:grid-cols-3 gap-8 px-8 md:px-16 lg:px-24">
        {collections.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl overflow-hidden shadow-soft group"
          >
            <img src={c.image} alt={c.title} className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-white/90">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
