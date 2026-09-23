import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NosotrosPage() {
  return (
    <main className="page-gradient">
      <Header />
      <section className="container py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="font-display text-5xl leading-tight">Nuestra historia</h1>
          <p className="mt-4 text-black/70 dark:text-white/70">
            LUNA nace en un estudio de producto entre Ciudad de México y Monterrey.
            Nuestro enfoque es simple: materiales honestos, fabricación precisa y un diseño
            que se siente todos los días —sin ruido.
          </p>
          <p className="mt-4 text-black/70 dark:text-white/70">
            Mezclamos acetatos de alto desempeño y metales ajustados a tolerancias finas.
            UV400 en toda la línea; opciones polarizadas según colección. Menos logo, más producto.
          </p>
        </div>
        <div className="card overflow-hidden">
          <img
            alt="Studio LUNA"
            src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1600&auto=format"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section className="container pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6"><h3 className="font-medium">Materiales</h3><p className="text-sm mt-2 text-black/70 dark:text-white/70">Acetato premium, acero inoxidable y TR90.</p></div>
          <div className="card p-6"><h3 className="font-medium">Garantía</h3><p className="text-sm mt-2 text-black/70 dark:text-white/70">12 meses por defectos de fábrica.</p></div>
          <div className="card p-6"><h3 className="font-medium">Proceso</h3><p className="text-sm mt-2 text-black/70 dark:text-white/70">Ajuste, pulido y control de calidad en cada lote.</p></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
