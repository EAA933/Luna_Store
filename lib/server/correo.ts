// lib/server/correo.ts — correo de confirmación al cliente con Resend (solo servidor).
//   RESEND_API_KEY → clave de tu cuenta de Resend
//   MAIL_FROM      → remitente de TU dominio verificado, ej. "MIRAR <pedidos@mirar.mx>"
// Sin dominio propio Resend solo deja escribirte a ti mismo, así que sin estas
// variables no se envía nada.
import { DIAS_DEVOLUCION } from "@/lib/tienda";

export const correoConfigurado = () => Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-MX")}`;

export async function correoPagoConfirmado(opts: {
  para: string;
  nombre: string;
  folio: string;
  lineas: { titulo: string; cantidad: number; precio: number }[];
  total: number;
  sitio: string;
}): Promise<boolean> {
  if (!correoConfigurado()) return false;

  const filas = opts.lineas
    .map(
      (l) =>
        `<tr><td style="padding:6px 0">${esc(l.titulo)} × ${l.cantidad}</td>` +
        `<td style="padding:6px 0;text-align:right">${pesos(l.precio * l.cantidad)}</td></tr>`
    )
    .join("");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px;margin:auto;color:#1d1d1f">
    <h1 style="font-size:22px;margin:0 0 4px">¡Gracias por tu compra, ${esc(opts.nombre.split(" ")[0] || "")}!</h1>
    <p style="color:#6e6e73;margin:0 0 20px">Recibimos tu pago. Tu pedido <b>${esc(opts.folio)}</b> está confirmado.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5">
      ${filas}
      <tr><td style="padding:10px 0;font-weight:600">Total pagado</td>
          <td style="padding:10px 0;text-align:right;font-weight:600">${pesos(opts.total)} MXN</td></tr>
    </table>
    <p style="font-size:14px;margin:20px 0 8px">Te avisaremos cuando tus lentes vayan en camino.</p>
    <p style="font-size:12px;color:#6e6e73;margin:0 0 20px">
      Tienes ${DIAS_DEVOLUCION} días a partir de la entrega para cambios y devoluciones (producto sin uso y en buen estado).
      <a href="${opts.sitio}/devoluciones" style="color:#1d1d1f">Ver condiciones</a>.
    </p>
    <p style="font-size:12px;color:#6e6e73">Guarda tu folio: con él podrás
      <a href="${opts.sitio}/resenas?folio=${encodeURIComponent(opts.folio)}" style="color:#1d1d1f">dejar tu reseña</a>.</p>
    <p style="font-size:12px;color:#6e6e73;margin-top:24px">MIRAR · Lentes de sol</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [opts.para],
        subject: `Tu pedido MIRAR ${opts.folio} está confirmado`,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
