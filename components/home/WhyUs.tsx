export default function WhyMirar() {
  return (
    <section className="w-full bg-[rgb(var(--card))] py-16 lg:py-20 border-b border-[rgb(var(--stroke))]">
      <div className="max-w-[1400px] mx-auto text-center px-6">
        <span className="floema-kicker mb-2">COMPROMISO CONSTRUCTIVO</span>
        <h2 className="font-sans font-black text-3xl md:text-4xl uppercase mt-2">
          ¿Por qué elegir <span className="text-floema-accent bg-floema-fg px-2.5 py-0.5">MIRAR</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 floema-card text-left">
            <span className="font-mono text-[10px] text-[rgb(var(--secondary))] uppercase block mb-1">Pilar 01</span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">100% Circular rePlastic®</h3>
            <p className="text-xs text-floema-fg/75 font-sans leading-relaxed">
              Polímeros marinos regenerados sin plástico virgen. Durabilidad indestructible y memoria elástica garantizada.
            </p>
          </div>
          <div className="p-6 floema-card text-left">
            <span className="font-mono text-[10px] text-[rgb(var(--secondary))] uppercase block mb-1">Pilar 02</span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">Óptica Mineral UV400</h3>
            <p className="text-xs text-floema-fg/75 font-sans leading-relaxed">
              Filtro espectral total con micas minerales polarizadas de alta pureza óptica testeadas en laboratorio.
            </p>
          </div>
          <div className="p-6 floema-card text-left">
            <span className="font-mono text-[10px] text-[rgb(var(--secondary))] uppercase block mb-1">Pilar 03</span>
            <h3 className="font-sans font-black text-lg uppercase mb-2">Garantía Endure Vitalicia</h3>
            <p className="text-xs text-floema-fg/75 font-sans leading-relaxed">
              Servicio de calibración, reajuste anatómico y reparación de por vida en nuestro taller.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
