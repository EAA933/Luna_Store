"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aparece con un desplazamiento suave hacia arriba cuando entra en pantalla. */
export function Reveal({
  delay = 0,
  y = 24,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Título que se revela línea por línea, como si saliera de una ranura. */
export function LineReveal({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export { EASE };
