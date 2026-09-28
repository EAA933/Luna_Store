// lib/server/notificar.ts — avisos automáticos a tu WhatsApp (solo servidor).
// Usa CallMeBot: activas tu número una vez y te da una apikey.
//   CALLMEBOT_APIKEY  → la clave que te manda CallMeBot
//   CALLMEBOT_PHONE   → tu número con lada (opcional; por defecto NEXT_PUBLIC_WHATSAPP)
// Si no están configuradas, simplemente no se envía nada.

export async function avisarWhatsApp(texto: string): Promise<boolean> {
  const apikey = process.env.CALLMEBOT_APIKEY;
  const phone = (process.env.CALLMEBOT_PHONE || process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, "");
  if (!apikey || !phone) return false;

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=%2B${phone}` +
    `&text=${encodeURIComponent(texto)}&apikey=${encodeURIComponent(apikey)}`;
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    return res.ok;
  } catch {
    return false;
  }
}

export const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-MX")}`;
