// lib/supabase.ts — cliente de Supabase (tienda y panel de administrador)
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Cliente único. Devuelve null si faltan las variables (la tienda usa el catálogo local). */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "mirar-admin" },
    });
  }
  return client;
}

/** Número de WhatsApp (solo dígitos, con lada) al que llegan los pedidos. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, "");
