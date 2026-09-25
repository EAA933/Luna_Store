// components/Logo.tsx
"use client";

interface LogoProps {
  className?: string;
  withTag?: boolean;
}

export default function Logo({ className = "h-7", withTag = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
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

      {/* Logotipo MIRAR: tipografía sans-serif limpia con espaciado controlado */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-sans font-semibold text-lg tracking-[-0.03em] text-[rgb(var(--fg))] leading-none">
            MIRAR
          </span>
          <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent))]" />
        </div>
        {withTag && (
          <span className="text-[9px] font-sans tracking-[0.16em] text-[rgb(var(--secondary))] uppercase leading-none mt-1">
            Óptica de Precisión
          </span>
        )}
      </div>
    </div>
  );
}
