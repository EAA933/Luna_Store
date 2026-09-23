export default function WhyLuna() {
  return (
    <section className="w-full bg-[rgb(var(--card))] py-24">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="section-title">
          ¿Por qué comprar en <span className="text-[rgb(var(--accent))]">LUNA</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-16 px-8 md:px-16 mt-10">
          <div>
            <img src="/icons/shipping.svg" alt="" className="mx-auto mb-6 h-14" />
            <h3 className="text-2xl font-semibold mb-3">Envío gratis</h3>
            <p className="section-text">A todo México, sin mínimo de compra.</p>
          </div>
          <div>
            <img src="/icons/quality.svg" alt="" className="mx-auto mb-6 h-14" />
            <h3 className="text-2xl font-semibold mb-3">Calidad sin etiquetas</h3>
            <p className="section-text">Diseños propios, materiales premium, precio justo.</p>
          </div>
          <div>
            <img src="/icons/exchange.svg" alt="" className="mx-auto mb-6 h-14" />
            <h3 className="text-2xl font-semibold mb-3">30 días de cambio</h3>
            <p className="section-text">Si no te convencen, cámbialos sin problema.</p>
          </div>
        </div>
        <p className="mt-10 text-lg text-[rgb(var(--fg))]/70">
          P.D. No tendrás que vender un riñón por tener unos LUNA 😎
        </p>
      </div>
    </section>
  );
}
