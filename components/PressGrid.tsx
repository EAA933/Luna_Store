export default function PressGrid() {
  const imgs = [
    "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1600&auto=format",
    "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1600&auto=format",
    "https://images.unsplash.com/photo-1520975867598-6e0b87b3b3a0?q=80&w=1600&auto=format",
    "https://images.unsplash.com/photo-1518544801976-3e1883b08e64?q=80&w=1600&auto=format",
  ];
  return (
    <section className="container mt-20">
      <h2 className="font-display text-3xl mb-6">Editorial</h2>
      <div className="grid md:grid-cols-4 gap-3">
        {imgs.map((src, i) => (
          <figure key={i} className="overflow-hidden rounded-2xl">
            <img src={src} alt={`Editorial ${i + 1}`} className="w-full h-56 md:h-72 object-cover hover:scale-105 transition" />
          </figure>
        ))}
      </div>
    </section>
  );
}
