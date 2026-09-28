"use client";

// Panel de administración de MIRAR: acceso con la cuenta de Supabase y
// pestañas de Resumen, Pedidos y Productos. Solo el usuario administrador
// puede entrar (el registro público está cerrado en Supabase).
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { BarChart3, ExternalLink, Glasses, LogOut, Package, RefreshCw } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ProductRow } from "@/lib/catalog";
import Resumen from "./Resumen";
import Pedidos from "./Pedidos";
import Productos from "./Productos";
import type { Order } from "./tipos";

type Tab = "resumen" | "pedidos" | "productos";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    const { error: err } = await getSupabase()!.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError(err.message === "Invalid login credentials" ? "Correo o contraseña incorrectos." : err.message);
    setCargando(false);
  }

  return (
    <main className="min-h-screen grid place-items-center px-5 bg-[rgb(var(--bg))]">
      <form onSubmit={entrar} className="w-full max-w-sm space-y-5 rounded-3xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--secondary))]">MIRAR</p>
          <h1 className="text-2xl font-semibold mt-1">Panel de administrador</h1>
        </div>
        <label className="block text-sm">
          <span className="text-[rgb(var(--secondary))]">Correo</span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-4 py-2.5 outline-none focus:border-[rgb(var(--accent))]" />
        </label>
        <label className="block text-sm">
          <span className="text-[rgb(var(--secondary))]">Contraseña</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-4 py-2.5 outline-none focus:border-[rgb(var(--accent))]" />
        </label>
        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        <button disabled={cargando} className="w-full rounded-full bg-[rgb(var(--accent))] py-3 font-semibold text-[rgb(var(--accent-fg))] disabled:opacity-60">
          {cargando ? "Entrando…" : "Entrar"}
        </button>
        <Link href="/" className="block text-center text-xs text-[rgb(var(--secondary))] hover:underline">← Volver a la tienda</Link>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [tab, setTab] = useState<Tab>("resumen");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [actualizado, setActualizado] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { setSession(null); return; }
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const cargar = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) return;
    const [o, p] = await Promise.all([
      sb.from("orders").select("*").order("created_at", { ascending: false }).limit(500),
      sb.from("products").select("*").order("sort_order", { ascending: true }),
    ]);
    if (o.error || p.error) { setError((o.error || p.error)!.message); return; }
    setError(null);
    setOrders(o.data as Order[]);
    setProducts(p.data as ProductRow[]);
    setActualizado(new Date());
  }, []);

  // Carga inicial y revisión de pedidos nuevos cada 30 s.
  useEffect(() => {
    if (!session) return;
    cargar();
    const t = setInterval(cargar, 30_000);
    return () => clearInterval(t);
  }, [session, cargar]);

  const nuevos = orders.filter((o) => o.status === "nuevo").length;
  useEffect(() => {
    document.title = nuevos > 0 ? `(${nuevos}) Pedidos nuevos · MIRAR Admin` : "MIRAR Admin";
  }, [nuevos]);

  if (!isSupabaseConfigured) {
    return <main className="p-10">Falta configurar Supabase (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY).</main>;
  }
  if (session === undefined) return <main className="min-h-screen grid place-items-center text-[rgb(var(--secondary))]">Cargando…</main>;
  if (!session) return <Login />;

  const tabs: { id: Tab; label: string; icon: typeof BarChart3; badge?: number }[] = [
    { id: "resumen", label: "Resumen", icon: BarChart3 },
    { id: "pedidos", label: "Pedidos", icon: Package, badge: nuevos },
    { id: "productos", label: "Productos", icon: Glasses },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] md:flex">
      <aside className="md:w-60 md:min-h-screen border-b md:border-b-0 md:border-r border-[rgb(var(--stroke))] bg-[rgb(var(--card))] p-4 md:p-5 flex md:flex-col gap-4">
        <div className="flex items-center justify-between md:block">
          <p className="text-lg font-semibold">MIRAR <span className="text-[rgb(var(--accent))]">Admin</span></p>
          <p className="hidden md:block text-xs text-[rgb(var(--secondary))] truncate mt-1">{session.user.email}</p>
        </div>
        <nav className="flex md:flex-col gap-1 flex-1 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition ${tab === t.id ? "bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]" : "hover:bg-[rgb(var(--card-hover))]"}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
              {!!t.badge && <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">{t.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex flex-col gap-1 text-sm">
          <Link href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-[rgb(var(--card-hover))]">
            <ExternalLink className="w-4 h-4" /> Ver tienda
          </Link>
          <button onClick={() => getSupabase()!.auth.signOut()} className="flex items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-[rgb(var(--card-hover))]">
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-8 min-w-0">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold">{tabs.find((t) => t.id === tab)!.label}</h1>
          <button onClick={cargar} className="flex items-center gap-2 rounded-full border border-[rgb(var(--stroke))] px-3.5 py-1.5 text-xs text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]">
            <RefreshCw className="w-3.5 h-3.5" />
            {actualizado ? `Actualizado ${actualizado.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}` : "Actualizar"}
          </button>
        </div>
        {error && <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</p>}
        {tab === "resumen" && <Resumen orders={orders} products={products} irA={setTab} />}
        {tab === "pedidos" && <Pedidos orders={orders} products={products} recargar={cargar} />}
        {tab === "productos" && <Productos products={products} recargar={cargar} />}
        <button onClick={() => getSupabase()!.auth.signOut()} className="md:hidden mt-10 text-sm text-[rgb(var(--secondary))] underline">Cerrar sesión</button>
      </main>
    </div>
  );
}
