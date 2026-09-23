export default function ValueStrip() {
  const items = [
    { title: "Protección real", text: "UV400 en todos los modelos. Polarizado disponible." },
    { title: "Materiales confiables", text: "Acetato/PC de alto impacto con bisagras metálicas." },
    { title: "Precio honesto", text: "Directo del studio a tus manos." },
  ];
  return (
    <section className="container mt-16 card p-8">
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((it) => (
          <div key={it.title}>
            <h3 className="font-display text-2xl">{it.title}</h3>
            <p className="text-sm text-black/60 dark:text-white/70 mt-2">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
