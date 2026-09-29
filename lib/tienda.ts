// lib/tienda.ts — políticas de la tienda en un solo lugar.
// Vigentes: lentes de calidad con protección UV400, 14 días para cambios y
// devoluciones (producto sin uso y en buen estado) y envío gratis desde $1,299 MXN.

export const ENVIO_GRATIS_DESDE = 1299; // MXN
export const DIAS_DEVOLUCION = 14;

export const envioGratis = (subtotal: number) => subtotal >= ENVIO_GRATIS_DESDE;

/** Cuánto le falta al cliente para el envío gratis (0 si ya lo tiene). */
export const faltaParaEnvioGratis = (subtotal: number) => Math.max(0, ENVIO_GRATIS_DESDE - subtotal);

/** Los 32 estados, con el nombre exacto que usan las zonas de envío en la base. */
export const ESTADOS_MX = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
  "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
  "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro",
  "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
  "Yucatán", "Zacatecas",
] as const;

export type ZonaEnvio = { id: string; name: string; price: number; states: string[]; sort_order: number };
