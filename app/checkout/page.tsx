// app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { envioGratis, faltaParaEnvioGratis, ENVIO_GRATIS_DESDE, DIAS_DEVOLUCION, ESTADOS_MX, type ZonaEnvio } from "@/lib/tienda";
import { getSupabase } from "@/lib/supabase";
import MapaEntrega from "@/components/checkout/MapaEntrega";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zonas, setZonas] = useState<ZonaEnvio[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    extNum: "",
    intNum: "",
    colonia: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "mercadopago",
  });

  // Zonas de envío (precios que editas en /admin). El servidor recalcula el envío al pagar.
  useEffect(() => {
    getSupabase()?.from("shipping_zones").select("*").order("sort_order")
      .then(({ data }) => data && setZonas(data as ZonaEnvio[]));
  }, []);
  const zona = zonas.find((z) => z.states.includes(formData.state));
  const envio = envioGratis(subtotal) ? 0 : zona ? zona.price : null;

  // Dirección completa tal como se guarda en el pedido y la ves en /admin.
  const direccion = [
    `${formData.street.trim()} ${formData.extNum.trim()}${formData.intNum.trim() ? `, Int. ${formData.intNum.trim()}` : ""}`,
    formData.colonia.trim() ? `Col. ${formData.colonia.trim()}` : "",
  ].filter(Boolean).join(", ");

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setError(null);

    try {
      // El servidor toma precios y stock de la base; el navegador solo manda slug y cantidad.
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: direccion,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            payment: formData.paymentMethod,
          },
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "error");
      // Mandamos al cliente a pagar a Mercado Pago; regresa a /checkout/resultado.
      if (!data.pagoUrl) throw new Error("sin-link");
      window.location.href = data.pagoUrl;
      return;
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : "";
      setError(
        msg.includes("inventario") || msg.includes("disponible")
          ? `${msg}. Ajusta tu bolsa e inténtalo de nuevo.`
          : "No pudimos registrar tu pedido. Revisa tu conexión e inténtalo de nuevo."
      );
      setEnviando(false);
    }
  }

  return (
    <main className="w-full min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] px-5 sm:px-8 md:px-12 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 pb-4 border-b border-[rgb(var(--stroke))] flex items-center justify-between">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[rgb(var(--fg))] hover:text-[rgb(var(--accent))] transition-colors px-3.5 py-1.5 rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--card))]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </Link>
          <span className="font-mono text-xs text-[rgb(var(--secondary))] uppercase">
            TIENDA MIRAR // PAGO SEGURO ENCRIPTADO
          </span>
        </div>

        {items.length === 0 ? (
          <section className="max-w-xl mx-auto text-center py-10 magazine-frame rounded-3xl p-8 bg-[rgb(var(--card))]">
            <h1 className="font-serif font-bold text-2xl mb-3 text-[rgb(var(--fg))]">
              Tu bolsa de compra está vacía
            </h1>
            <p className="text-xs text-[rgb(var(--secondary))] mb-6 font-sans">
              No tienes lentes de sol agregados para comprar.
            </p>
            <Link href="/catalog" className="btn-sunset text-xs px-6 py-3 rounded-full">
              Explorar Catálogo de Lentes
            </Link>
          </section>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Formulario de envío y pago */}
            <form onSubmit={handleOrder} className="lg:col-span-7 magazine-frame rounded-3xl p-6 sm:p-8 space-y-6 bg-[rgb(var(--card))]">
              <div>
                <span className="magazine-kicker">01 // DATOS DE ENTREGA</span>
                <h2 className="font-serif font-bold text-xl mt-1 mb-4 text-[rgb(var(--fg))]">
                  Dirección de envío
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Nombre completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Andrés Varela"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Correo electrónico de confirmación
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="andres@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      WhatsApp / teléfono
                    </label>
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      placeholder="55 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Calle
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Av. Álvaro Obregón"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:col-span-2">
                    <div>
                      <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                        Número exterior
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={12}
                        placeholder="154"
                        value={formData.extNum}
                        onChange={(e) => setFormData({ ...formData, extNum: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                        Núm. interior (opcional)
                      </label>
                      <input
                        type="text"
                        maxLength={20}
                        placeholder="Depto. 3B"
                        value={formData.intNum}
                        onChange={(e) => setFormData({ ...formData, intNum: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Colonia
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Roma Norte"
                      value={formData.colonia}
                      onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Estado
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    >
                      <option value="">Selecciona tu estado</option>
                      {ESTADOS_MX.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Ciudad o municipio
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Cuauhtémoc"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Código Postal
                    </label>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="06700"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value.replace(/\D/g, "") })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <MapaEntrega street={formData.street} number={formData.extNum} colonia={formData.colonia} city={formData.city} state={formData.state} zip={formData.zip} />
                </div>
              </div>

              {/* Pago */}
              <div className="pt-6 border-t border-[rgb(var(--stroke))]">
                <span className="magazine-kicker">02 // FORMA DE PAGO</span>
                <h2 className="font-serif font-bold text-xl mt-1 mb-4 text-[rgb(var(--fg))]">
                  Método de Pago Seguro
                </h2>

                <div className="flex items-center gap-3 p-4 border rounded-2xl bg-[rgb(var(--bg))] border-[rgb(var(--stroke))] text-sm">
                  <Lock className="w-4 h-4 text-[rgb(var(--accent))] shrink-0" />
                  <div>
                    <p className="font-semibold text-[rgb(var(--fg))]">Mercado Pago</p>
                    <p className="text-xs text-[rgb(var(--secondary))]">
                      Tarjeta de crédito o débito, efectivo en OXXO y más. Pagas en la página segura de Mercado Pago.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={enviando}
                className="btn-sunset w-full py-4 text-sm font-bold flex items-center justify-center gap-2 rounded-full disabled:opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {enviando
                    ? "Conectando con Mercado Pago…"
                    : `Pagar con Mercado Pago ($${(subtotal + (envio ?? 0)).toLocaleString("es-MX")} MXN)`}
                </span>
              </button>
              <p className="text-[11px] text-[rgb(var(--secondary))] text-center">
                Te llevamos a Mercado Pago para pagar de forma segura. MIRAR nunca ve los datos de tu tarjeta.
              </p>
            </form>

            {/* Resumen de la Orden */}
            <aside className="lg:col-span-5 magazine-frame rounded-3xl p-6 sm:p-8 bg-[rgb(var(--card))] space-y-6">
              <h3 className="font-serif font-bold text-lg text-[rgb(var(--fg))] pb-3 border-b border-[rgb(var(--stroke))]">
                Resumen de tu Pedido
              </h3>

              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center gap-3 pb-3 border-b border-[rgb(var(--stroke))]">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[rgb(var(--stroke))] bg-[#ECE8E1]"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-serif font-bold text-[rgb(var(--fg))]">{it.name}</h4>
                      <span className="font-mono text-[10px] text-[rgb(var(--secondary))]">Cant: {it.qty}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[rgb(var(--fg))]">
                      ${(it.price * it.qty).toLocaleString("es-MX")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 font-mono text-xs pt-2">
                <div className="flex justify-between text-[rgb(var(--secondary))]">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString("es-MX")} MXN</span>
                </div>
                <div className="flex justify-between text-[rgb(var(--accent))] font-bold">
                  <span>Envío a Domicilio:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[rgb(var(--accent))]/10 border border-[rgb(var(--accent))]/30">
                    {envioGratis(subtotal) ? "GRATIS" : envio === null ? "Elige tu estado" : `$${envio.toLocaleString("es-MX")}`}
                  </span>
                </div>
                <div className="flex justify-between text-[rgb(var(--fg))] font-bold text-base pt-2 border-t border-[rgb(var(--stroke))]">
                  <span>Total a Pagar:</span>
                  <span>${(subtotal + (envio ?? 0)).toLocaleString("es-MX")} MXN</span>
                </div>
              </div>

              <div className="p-3 bg-[rgb(var(--card-warm))]/60 border border-[rgb(var(--stroke))] rounded-2xl text-[11px] font-mono text-[rgb(var(--secondary))] space-y-1">
                <p>✓ Protección UV400 y {DIAS_DEVOLUCION} días para cambios.</p>
                <p>
                  {envioGratis(subtotal)
                    ? "✓ Tu pedido tiene envío gratis."
                    : `✓ Te faltan $${faltaParaEnvioGratis(subtotal).toLocaleString("es-MX")} para envío gratis (desde $${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")}).`}
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
