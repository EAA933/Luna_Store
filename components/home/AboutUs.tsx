// components/home/AboutUs.tsx
export default function AboutUs() {
  return (
    <section className="w-full px-10 md:px-16 lg:px-24 py-24 bg-[rgb(var(--card))] border-y border-[rgb(var(--stroke))]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-5xl md:text-6xl mb-6">
          ¿Quiénes somos?
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-[rgb(var(--fg))]/80">
          LUNA nace del deseo de crear lentes que combinen{" "}
          <span className="font-semibold">diseño premium</span> con{" "}
          <span className="font-semibold">precio justo</span>. Usamos materiales
          de alto desempeño y acabados cuidados para que te veas tan bien como
          te sientes — todos los días.
        </p>
      </div>
    </section>
  );
}
