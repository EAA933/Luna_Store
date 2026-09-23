export default function Reviews() {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 text-center">
      <h2 className="section-title">Reseñas de nuestros clientes</h2>
      <p className="section-text mb-12">
        4.9 ★★★★★ basado en 250+ reseñas verificadas
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <article className="card p-6 text-left">
          <p className="section-text">“Ligeros, cómodos y se ven premium. Llegaron rapidísimo.”</p>
          <span className="block mt-4 text-[rgb(var(--fg))]/70">— Ana P.</span>
        </article>
        <article className="card p-6 text-left">
          <p className="section-text">“Excelente relación calidad-precio. Los uso diario.”</p>
          <span className="block mt-4 text-[rgb(var(--fg))]/70">— Luis R.</span>
        </article>
        <article className="card p-6 text-left">
          <p className="section-text">“Polarizados cómodos, no cansan la vista.”</p>
          <span className="block mt-4 text-[rgb(var(--fg))]/70">— Sofía G.</span>
        </article>
      </div>
    </section>
  );
}
