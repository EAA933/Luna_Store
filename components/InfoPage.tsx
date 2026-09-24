import type { ReactNode } from "react";

/** Plantilla común para páginas informativas (ayuda y legales). */
export default function InfoPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="container py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-medium leading-[1.02]">{title}</h1>
        </div>
        <div className="space-y-8 text-[17px] leading-relaxed text-ink/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mb-2">
          {children}
        </div>
      </div>
    </main>
  );
}
