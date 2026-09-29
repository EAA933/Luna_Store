// app/catalog/page.tsx
"use client";

// Catálogo: búsqueda, orden por precio y rejilla de modelos. Todo sale del
// catálogo en vivo (lo que edites en /admin).
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useProducts } from "@/components/store/ProductsProvider";
import { DIAS_DEVOLUCION, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

type Orden = "destacados" | "precio-asc" | "precio-desc";

const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function CatalogPage() {
  const products = useProducts();
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState<Orden>("destacados");
  const [soloPolarizados, setSoloPolarizados] = useState(false);

  const hayPolarizados = products.some((p) => p.polarized);

  const lista = useMemo(() => {
    const t = normalizar(q.trim());
    const filtrados = products.filter((p) => {
      const texto = normalizar([p.name, p.shape, p.lensColor, p.description].join(" "));
      return (!t || texto.includes(t)) && (!soloPolarizados || p.polarized);
    });
    if (orden === "precio-asc") return [...filtrados].sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") return [...filtrados].sort((a, b) => b.price - a.price);
    return filtrados;
  }, [products, q, orden, soloPolarizados]);

  return (
    <main className="w-full min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] transition-colors">
      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-10 pb-6">
        <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))] block mb-1">
          Lentes de sol
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em]">Todos los modelos.</h1>
        <p className="text-sm text-[rgb(var(--secondary))] mt-2 max-w-xl leading-relaxed">
          Protección UV400 en todos los modelos, {DIAS_DEVOLUCION} días para cambios y envío gratis en compras desde $
          {ENVIO_GRATIS_DESDE.toLocaleString("es-MX")}.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="flex-1 flex items-center gap-2 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-4 py-2.5 text-sm focus-within:border-[rgb(var(--accent))]">
            <Search className="w-4 h-4 text-[rgb(var(--secondary))]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por modelo, forma o color"
              className="flex-1 bg-transparent outline-none"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Borrar búsqueda">
                <X className="w-4 h-4 text-[rgb(var(--secondary))]" />
              </button>
            )}
          </label>

          <div className="flex items-center gap-2">
            {hayPolarizados && (
              <button
                type="button"
                onClick={() => setSoloPolarizados(!soloPolarizados)}
                className={`rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                  soloPolarizados
                    ? "border-[rgb(var(--fg))] bg-[rgb(var(--fg))] text-[rgb(var(--bg))]"
                    : "border-[rgb(var(--stroke))] bg-[rgb(var(--card))]"
                }`}
              >
                Solo polarizados
              </button>
            )}
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-4 py-2.5 text-xs"
              aria-label="Ordenar"
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-16">
        {lista.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-[rgb(var(--stroke))] p-12 text-center text-sm text-[rgb(var(--secondary))]">
            No encontramos modelos con esa búsqueda.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lista.map((p, i) => (
              <ProductCard
                key={p.slug}
                id={p.id}
                slug={p.slug}
                name={p.name}
                price={p.price}
                image={p.image}
                shape={p.shape}
                polarized={p.polarized}
                refCode={p.ref}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
