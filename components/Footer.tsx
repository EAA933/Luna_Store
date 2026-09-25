import Link from "next/link";

const COLUMNAS = [
  { titulo: "Comprar", links: [["Todos los lentes", "/catalog"], ["Mujer", "/catalog?segment=women"], ["Hombre", "/catalog?segment=men"], ["Unisex", "/catalog?segment=unisex"]] },
  { titulo: "Ayuda", links: [["Preguntas frecuentes", "/faq"], ["Garantía", "/garantia"], ["Devoluciones", "/devoluciones"]] },
  { titulo: "MIRAR", links: [["Nosotros", "/nosotros"], ["Privacidad", "/privacidad"], ["Términos", "/terminos"]] },
];

export default function Footer() {
  return (
    <footer className="bg-stone">
      <div className="container grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-5xl font-semibold tracking-tight">mirar</Link>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/70">
            Lentes de sol con protección UV400, diseñados para usarse todos los días.
          </p>
        </div>
        {COLUMNAS.map((c) => (
          <div key={c.titulo}>
            <p className="eyebrow">{c.titulo}</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="link-underline">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container flex flex-col gap-2 border-t border-line py-6 text-[13px] text-muted md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} MIRAR · Diseñado en México</span>
        <span>Precios en pesos mexicanos (MXN)</span>
      </div>
    </footer>
  );
}
