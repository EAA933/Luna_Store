"use client";

// Productos e inventario: precio y stock editables en la tabla, ocultar/mostrar
// modelos, edición completa con subida de foto y alta de modelos nuevos.
import { useState } from "react";
import { Eye, EyeOff, ImageUp, Minus, Pencil, Plus, X } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import type { ProductRow } from "@/lib/catalog";
import { mxn } from "./tipos";

type Editable = Omit<ProductRow, "id" | "created_at" | "updated_at"> & { id?: string };

const VACIO: Editable = {
  slug: "", ref: "", name: "", collection: "Urban", edition: "", price: 0, image: "", segment: "unisex",
  shape: "", lens_color: "", lens_type: "", material: "", polarized: true, caliber: 0, bridge: 0, temple: 0,
  weight: 0, sustainability_badge: "", description: "", craft_note: "", coordinates: "", stock: 0,
  stock_alert: 3, active: true, sort_order: 99,
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const campo = "mt-1 w-full rounded-xl border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-3 py-2 text-sm outline-none focus:border-[rgb(var(--accent))]";

function Editor({ inicial, cerrar, guardado }: { inicial: Editable; cerrar: () => void; guardado: () => void }) {
  const [p, setP] = useState<Editable>(inicial);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nuevo = !inicial.id;
  const set = <K extends keyof Editable>(k: K, v: Editable[K]) => setP((x) => ({ ...x, [k]: v }));

  async function subirFoto(file: File) {
    setSubiendo(true);
    setError(null);
    const sb = getSupabase()!;
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const ruta = `${p.slug || slugify(p.name) || "modelo"}-${Date.now()}.${ext}`;
    const { error: err } = await sb.storage.from("productos").upload(ruta, file, { contentType: file.type, upsert: false });
    if (err) setError(err.message);
    else set("image", sb.storage.from("productos").getPublicUrl(ruta).data.publicUrl);
    setSubiendo(false);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    const datos = { ...p, slug: p.slug || slugify(p.name) };
    const { id, ...resto } = datos;
    const sb = getSupabase()!;
    const { error: err } = id
      ? await sb.from("products").update(resto).eq("id", id)
      : await sb.from("products").insert(resto);
    setGuardando(false);
    if (err) { setError(err.message.includes("duplicate") ? "Ya existe un modelo con esa URL (slug)." : err.message); return; }
    guardado();
    cerrar();
  }

  const num = (k: keyof Editable) => ({
    type: "number" as const, min: 0, value: p[k] as number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(k, Number(e.target.value) as never),
    className: campo,
  });
  const txt = (k: keyof Editable) => ({
    value: p[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value as never),
    className: campo,
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={cerrar}>
      <form onSubmit={guardar} onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-2xl overflow-y-auto bg-[rgb(var(--bg))] p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{nuevo ? "Nuevo modelo" : `Editar ${inicial.name}`}</h2>
          <button type="button" onClick={cerrar} aria-label="Cerrar"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="h-28 w-36 shrink-0 overflow-hidden rounded-xl bg-[#ECE8E1] border border-[rgb(var(--stroke))]">
            {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[rgb(var(--stroke))] px-4 py-2 text-sm hover:bg-[rgb(var(--card))]">
            <ImageUp className="w-4 h-4" />
            {subiendo ? "Subiendo…" : "Subir foto"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
              onChange={(e) => e.target.files?.[0] && subirFoto(e.target.files[0])} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">Nombre<input required {...txt("name")} onChange={(e) => { set("name", e.target.value); if (nuevo) set("slug", slugify(e.target.value)); }} /></label>
          <label className="text-sm">Referencia (ej. MR-07)<input required {...txt("ref")} /></label>
          <label className="text-sm">Precio (MXN)<input required {...num("price")} /></label>
          <label className="text-sm">Stock (piezas)<input required {...num("stock")} /></label>
          <label className="text-sm">Avisar stock bajo en<input {...num("stock_alert")} /></label>
          <label className="text-sm">Orden en la tienda<input {...num("sort_order")} /></label>
          <label className="text-sm">Colección
            <select value={p.collection} onChange={(e) => set("collection", e.target.value)} className={campo}>
              {["Urban", "Nature", "rePlastic", "Horizon", "Details"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-sm">Para
            <select value={p.segment} onChange={(e) => set("segment", e.target.value as Editable["segment"])} className={campo}>
              <option value="unisex">Unisex</option><option value="women">Mujer</option><option value="men">Hombre</option>
            </select>
          </label>
          <label className="text-sm">Forma<input {...txt("shape")} /></label>
          <label className="text-sm">Color de mica<input {...txt("lens_color")} /></label>
          <label className="text-sm">Tipo de mica<input {...txt("lens_type")} /></label>
          <label className="text-sm">Material<input {...txt("material")} /></label>
          <label className="text-sm">Calibre (mm)<input {...num("caliber")} /></label>
          <label className="text-sm">Puente (mm)<input {...num("bridge")} /></label>
          <label className="text-sm">Varilla (mm)<input {...num("temple")} /></label>
          <label className="text-sm">Peso (g)<input {...num("weight")} /></label>
          <label className="text-sm">Edición / serie<input {...txt("edition")} /></label>
          <label className="text-sm">URL (slug)<input required {...txt("slug")} /></label>
        </div>
        <label className="block text-sm">Descripción<textarea rows={3} {...txt("description")} /></label>
        <label className="block text-sm">Nota de taller<textarea rows={2} {...txt("craft_note")} /></label>
        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={p.polarized} onChange={(e) => set("polarized", e.target.checked)} /> Polarizado</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={p.active} onChange={(e) => set("active", e.target.checked)} /> Visible en la tienda</label>
        </div>

        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button disabled={guardando || subiendo} className="rounded-full bg-[rgb(var(--accent))] px-6 py-2.5 font-semibold text-[rgb(var(--accent-fg))] disabled:opacity-60">
            {guardando ? "Guardando…" : "Guardar"}
          </button>
          <button type="button" onClick={cerrar} className="rounded-full border border-[rgb(var(--stroke))] px-6 py-2.5">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

function Fila({ p, editar, recargar }: { p: ProductRow; editar: () => void; recargar: () => void }) {
  const [precio, setPrecio] = useState(String(p.price));
  const [guardando, setGuardando] = useState(false);

  async function actualizar(cambios: Partial<ProductRow>) {
    setGuardando(true);
    await getSupabase()!.from("products").update(cambios).eq("id", p.id);
    setGuardando(false);
    recargar();
  }

  const bajo = p.stock <= p.stock_alert;
  return (
    <tr className={`border-t border-[rgb(var(--stroke))] ${p.active ? "" : "opacity-50"} ${guardando ? "animate-pulse" : ""}`}>
      <td className="py-3 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[#ECE8E1]">
            {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
          </div>
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-[rgb(var(--secondary))]">{p.ref} · {p.collection}</p>
          </div>
        </div>
      </td>
      <td className="py-3 pr-3">
        <div className="flex items-center gap-1">
          <span className="text-[rgb(var(--secondary))]">$</span>
          <input value={precio} onChange={(e) => setPrecio(e.target.value.replace(/\D/g, ""))}
            onBlur={() => Number(precio) !== p.price && precio && actualizar({ price: Number(precio) })}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-20 rounded-lg border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] px-2 py-1 tabular-nums" aria-label={`Precio de ${p.name}`} />
        </div>
      </td>
      <td className="py-3 pr-3">
        <div className="flex items-center gap-1.5">
          <button onClick={() => p.stock > 0 && actualizar({ stock: p.stock - 1 })} className="grid h-7 w-7 place-items-center rounded-full border border-[rgb(var(--stroke))]" aria-label="Restar una pieza"><Minus className="w-3 h-3" /></button>
          <span className={`w-10 text-center font-semibold tabular-nums ${p.stock === 0 ? "text-red-500" : bajo ? "text-amber-500" : ""}`}>{p.stock}</span>
          <button onClick={() => actualizar({ stock: p.stock + 1 })} className="grid h-7 w-7 place-items-center rounded-full border border-[rgb(var(--stroke))]" aria-label="Sumar una pieza"><Plus className="w-3 h-3" /></button>
        </div>
      </td>
      <td className="py-3 pr-3 text-right tabular-nums text-[rgb(var(--secondary))] hidden md:table-cell">{mxn(p.price * p.stock)}</td>
      <td className="py-3">
        <div className="flex justify-end gap-1">
          <button onClick={() => actualizar({ active: !p.active })} title={p.active ? "Ocultar de la tienda" : "Mostrar en la tienda"}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-[rgb(var(--card-hover))]">
            {p.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button onClick={editar} title="Editar" className="grid h-8 w-8 place-items-center rounded-full hover:bg-[rgb(var(--card-hover))]"><Pencil className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );
}

export default function Productos({ products, recargar }: { products: ProductRow[]; recargar: () => void }) {
  const [editando, setEditando] = useState<Editable | null>(null);
  const activos = products.filter((p) => p.active);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-[rgb(var(--secondary))]">
          {activos.length} modelos visibles · {activos.reduce((a, p) => a + p.stock, 0)} piezas en inventario
        </p>
        <button onClick={() => setEditando({ ...VACIO, sort_order: products.length + 1 })}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent))] px-4 py-2 text-sm font-semibold text-[rgb(var(--accent-fg))]">
          <Plus className="w-4 h-4" /> Nuevo modelo
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[rgb(var(--stroke))] bg-[rgb(var(--card))] px-4">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="text-left text-xs text-[rgb(var(--secondary))]">
            <tr>
              <th className="py-3 font-normal">Modelo</th>
              <th className="py-3 font-normal">Precio</th>
              <th className="py-3 font-normal">Stock</th>
              <th className="py-3 font-normal text-right hidden md:table-cell">Valor en stock</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <Fila key={p.id + p.updated_at} p={p} recargar={recargar} editar={() => setEditando(p)} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[rgb(var(--secondary))]">
        El precio se guarda al salir del campo (o con Enter). Los cambios se ven en la tienda en unos segundos.
      </p>

      {editando && <Editor inicial={editando} cerrar={() => setEditando(null)} guardado={recargar} />}
    </div>
  );
}
