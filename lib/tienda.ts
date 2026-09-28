// lib/tienda.ts — políticas de la tienda en un solo lugar.
// Garantías vigentes: lentes de calidad con 30 días de prueba y envío gratis
// en compras desde $1,299 MXN.

export const ENVIO_GRATIS_DESDE = 1299; // MXN
export const DIAS_PRUEBA = 30;

export const envioGratis = (subtotal: number) => subtotal >= ENVIO_GRATIS_DESDE;

/** Cuánto le falta al cliente para el envío gratis (0 si ya lo tiene). */
export const faltaParaEnvioGratis = (subtotal: number) => Math.max(0, ENVIO_GRATIS_DESDE - subtotal);

export const TEXTO_ENVIO = `Envío gratis en compras desde $${ENVIO_GRATIS_DESDE.toLocaleString("es-MX")} MXN`;
export const TEXTO_PRUEBA = `Lentes de calidad con ${DIAS_PRUEBA} días de prueba`;
