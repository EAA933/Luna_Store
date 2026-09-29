// components/Logo.tsx
"use client";

interface LogoProps {
  className?: string;
  /** Muestra "STUDIO" en pequeño debajo de MIRAR. */
  withTag?: boolean;
}

export default function Logo({ className = "h-7", withTag = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`} aria-label="MIRAR Studio">
      {/* Glifo geométrico óptico minimalista */}
      <div className="w-7 h-7 rounded-full bg-[rgb(var(--fg))] text-[rgb(var(--bg))] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
        >
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* MIRAR grande y "STUDIO" pequeño con espaciado amplio, alineado al ancho de la palabra */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1">
          <span className="font-sans font-semibold text-lg tracking-[-0.03em] text-[rgb(var(--fg))] leading-none">
            MIRAR
          </span>
          <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent))]" />
        </div>
        {withTag && (
          <span className="text-[8px] font-sans font-medium tracking-[0.42em] text-[rgb(var(--secondary))] uppercase leading-none mt-[3px] pl-[1px]">
            Studio
          </span>
        )}
      </div>
    </div>
  );
}
