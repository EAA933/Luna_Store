// app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useCartStore } from "@/components/cart/useCart";
import { useState } from "react";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, Package, Lock, MessageCircle } from "lucide-react";
import { getSupabase, WHATSAPP_NUMBER } from "@/lib/supabase";
import { envioGratis, faltaParaEnvioGratis, ENVIO_GRATIS_DESDE } from "@/lib/tienda";

type Confirmacion = {
  folio: string;
  items: { name: string; ref?: string; price: number; qty: number }[];
  subtotal: number;
  whatsappUrl: string | null;
};

const METODOS: Record<string, string> = {
  card: "Tarjeta de crédito / débito",
  spei: "Transferencia SPEI",
  oxxo: "Efectivo en OXXO",
};

type Datos = { name: string; phone: string; address: string; city: string; zip: string; paymentMethod: string };

function mensajeWhatsApp(c: Omit<Confirmacion, "whatsappUrl">, d: Datos) {
  const lineas = c.items
    .map((i) => `• ${i.name}${i.ref ? ` (${i.ref})` : ""} x${i.qty} — $${(i.price * i.qty).toLocaleString("es-MX")}`)
    .join("\n");
  return [
    `Hola MIRAR, acabo de hacer el pedido *${c.folio}*:`,
    lineas,
    `*Total: $${c.subtotal.toLocaleString("es-MX")} MXN*`,
    envioGratis(c.subtotal) ? "Envío: gratis" : "Envío: por cotizar",
    "",
    `Nombre: ${d.name}`,
    d.phone ? `Teléfono: ${d.phone}` : "",
    `Envío: ${d.address}, ${d.city}, C.P. ${d.zip}`,
    `Pago preferido: ${METODOS[d.paymentMethod] || d.paymentMethod}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  const [ordered, setOrdered] = useState<Confirmacion | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
  });

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setError(null);

    const supabase = getSupabase();
    let conf: Omit<Confirmacion, "whatsappUrl">;
    try {
      if (supabase) {
        // El servidor toma precios y stock de la base; el navegador solo manda slug y cantidad.
        const { data, error: err } = await supabase.rpc("create_order", {
          p_customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
            payment: formData.paymentMethod,
          },
          p_items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        });
        if (err) throw new Error(err.message);
        conf = data as Omit<Confirmacion, "whatsappUrl">;
      } else {
        conf = {
          folio: "MR-" + Date.now().toString(36).toUpperCase(),
          items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
          subtotal,
        };
      }
    } catch (ex) {
      const msg = ex instanceof Error ? ex.message : "";
      setError(
        msg.includes("inventario") || msg.includes("disponible")
          ? `${msg}. Ajusta tu bolsa e inténtalo de nuevo.`
          : "No pudimos registrar tu pedido. Revisa tu conexión e inténtalo de nuevo."
      );
      setEnviando(false);
      return;
    }

    const whatsappUrl = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp(conf, formData))}`
      : null;
    setOrdered({ ...conf, whatsappUrl });
    clear();
    setEnviando(false);
    if (whatsappUrl) window.open(whatsappUrl, "_blank", "noopener");
  }

  if (ordered) {
    return (
      <main className="w-full min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] px-5 py-10 sm:py-12 flex items-center justify-center">
        <div className="max-w-xl w-full p-8 sm:p-10 magazine-frame rounded-3xl shadow-xl text-center bg-[rgb(var(--card))]">
          <div className="w-16 h-16 rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] flex items-center justify-center mx-auto mb-6 border border-[rgb(var(--fg))] shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="editorial-stamp mb-3">{`PEDIDO REGISTRADO // ${ordered.folio}`}</span>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl mt-3 mb-4 text-[rgb(var(--fg))]">
            ¡Gracias por tu Compra en MIRAR!
          </h1>

          <p className="text-xs sm:text-sm text-[rgb(var(--fg))]/80 font-sans leading-relaxed mb-6">
            Hemos recibido tu orden correctamente. Revisaremos tus lentes y los prepararemos para enviarlos a {formData.address || "tu domicilio"}.
          </p>

          <div className="p-4 bg-[rgb(var(--card-warm))]/60 border border-[rgb(var(--stroke))] rounded-2xl font-mono text-xs text-left mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-[rgb(var(--secondary))]">CLIENTE:</span>
              <span className="font-bold">{formData.name || "Invitado"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--secondary))]">DESTINO:</span>
              <span className="font-bold">{formData.city || "México"}, C.P. {formData.zip || "06700"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--secondary))]">ENVÍO:</span>
              <span className="text-[rgb(var(--accent))] font-bold">{envioGratis(ordered.subtotal) ? "GRATIS" : "POR COTIZAR"}</span>
            </div>
          </div>

          {ordered.whatsappUrl && (
            <a
              href={ordered.whatsappUrl}
              target="_blank"
              rel="noopener"
              className="mb-3 w-full py-3.5 text-sm font-bold rounded-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:opacity-90 transition"
            >
              <MessageCircle className="w-4 h-4" />
              Enviar mi pedido por WhatsApp
            </a>
          )}
          <p className="text-[11px] text-[rgb(var(--secondary))] mb-4">
            Te escribiremos para confirmar el pago y el envío. Guarda tu folio {ordered.folio}: con él podrás{" "}
            <Link href={`/resenas?folio=${ordered.folio}`} className="underline">dejar tu reseña</Link> cuando recibas tus lentes.
          </p>
          <Link href="/catalog" className="btn-sunset w-full py-3.5 text-xs rounded-full">
            Volver a la Tienda
          </Link>
        </div>
      </main>
    );
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
                      Calle, número y colonia
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Álvaro Obregón 154, Roma Norte"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[rgb(var(--secondary))] uppercase mb-1">
                      Ciudad / Estado
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ciudad de México"
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
                      placeholder="06700"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
                    />
                  </div>
                </div>
              </div>

              {/* Pago */}
              <div className="pt-6 border-t border-[rgb(var(--stroke))]">
                <span className="magazine-kicker">02 // FORMA DE PAGO</span>
                <h2 className="font-serif font-bold text-xl mt-1 mb-4 text-[rgb(var(--fg))]">
                  Método de Pago Seguro
                </h2>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { id: "card", label: "Tarjeta de Crédito / Débito (Visa, Mastercard, AMEX)" },
                    { id: "spei", label: "Transferencia Bancaria Inmediata (SPEI)" },
                    { id: "oxxo", label: "Pago en Efectivo OXXO Pay" },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-all rounded-2xl ${
                        formData.paymentMethod === pm.id
                          ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] border-[rgb(var(--fg))] font-bold shadow-sm"
                          : "bg-[rgb(var(--bg))] border-[rgb(var(--stroke))] text-[rgb(var(--fg))]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === pm.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className="accent-[rgb(var(--fg))]"
                      />
                      <span>{pm.label}</span>
                    </label>
                  ))}
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
                <span>{enviando ? "Registrando pedido…" : `Confirmar Pedido ($${subtotal.toLocaleString("es-MX")} MXN)`}</span>
              </button>
              <p className="text-[11px] text-[rgb(var(--secondary))] text-center">
                Al confirmar registramos tu pedido y abrimos WhatsApp para coordinar el pago y el envío.
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
                    {envioGratis(subtotal) ? "GRATIS" : "Se cotiza por WhatsApp"}
                  </span>
                </div>
                <div className="flex justify-between text-[rgb(var(--fg))] font-bold text-base pt-2 border-t border-[rgb(var(--stroke))]">
                  <span>Total a Pagar:</span>
                  <span>${subtotal.toLocaleString("es-MX")} MXN</span>
                </div>
              </div>

              <div className="p-3 bg-[rgb(var(--card-warm))]/60 border border-[rgb(var(--stroke))] rounded-2xl text-[11px] font-mono text-[rgb(var(--secondary))] space-y-1">
                <p>✓ Lentes de calidad con 30 días de prueba.</p>
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
