-- ============================================================
-- MIRAR — esquema de Supabase (productos, pedidos, fotos)
-- Pega TODO este archivo en Supabase → SQL Editor → New query → Run.
-- Después pega y corre también seed.generated.sql (tus 6 modelos).
-- ============================================================

-- ── Productos ────────────────────────────────────────────────
create table if not exists public.products (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique,
  ref                  text not null,
  name                 text not null,
  collection           text not null default 'Urban',
  edition              text not null default '',
  price                integer not null check (price >= 0),       -- MXN, sin centavos
  image                text not null default '',
  segment              text not null default 'unisex' check (segment in ('men','women','unisex')),
  shape                text not null default '',
  lens_color           text not null default '',
  lens_type            text not null default '',
  material             text not null default '',
  polarized            boolean not null default false,
  caliber              integer not null default 0,
  bridge               integer not null default 0,
  temple               integer not null default 0,
  weight               integer not null default 0,
  sustainability_badge text not null default '',
  description          text not null default '',
  craft_note           text not null default '',
  coordinates          text not null default '',
  stock                integer not null default 0 check (stock >= 0),
  stock_alert          integer not null default 3,                -- avisa cuando queda esto o menos
  active               boolean not null default true,             -- oculto = no se muestra en la tienda
  sort_order           integer not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ── Pedidos ──────────────────────────────────────────────────
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  folio          text not null unique,
  customer_name  text not null,
  email          text not null,
  phone          text not null default '',
  address        text not null,
  city           text not null,
  zip            text not null,
  items          jsonb not null,          -- [{slug, name, price, qty}] con precios del servidor
  subtotal       integer not null,
  status         text not null default 'nuevo'
                 check (status in ('nuevo','confirmado','enviado','entregado','cancelado')),
  admin_notes    text not null default '',
  payment_method text not null default '',   -- preferencia de pago del cliente
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_orders_created on public.orders (created_at desc);
create index if not exists idx_orders_status  on public.orders (status);

-- updated_at automático
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_products_touch on public.products;
create trigger trg_products_touch before update on public.products
  for each row execute function public.touch_updated_at();
drop trigger if exists trg_orders_touch on public.orders;
create trigger trg_orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- ── Seguridad (RLS) ──────────────────────────────────────────
-- Público: solo puede VER productos activos. No puede ver pedidos.
-- Admin (usuario con sesión iniciada): puede todo.
-- Importante: desactiva los registros públicos en Authentication → Sign In / Providers
-- (Allow new users to sign up = OFF) para que el único usuario seas tú.
alter table public.products enable row level security;
alter table public.orders   enable row level security;

drop policy if exists "productos activos visibles" on public.products;
drop policy if exists "admin productos"           on public.products;
drop policy if exists "admin pedidos"             on public.orders;

create policy "productos activos visibles" on public.products
  for select using (active = true or auth.role() = 'authenticated');
create policy "admin productos" on public.products
  for all to authenticated using (true) with check (true);
create policy "admin pedidos" on public.orders
  for all to authenticated using (true) with check (true);

-- ── Crear pedido (lo llama la tienda) ────────────────────────
-- p_customer: {name, email, phone, address, city, zip, payment}
-- Toma precios y stock DEL SERVIDOR (el navegador solo manda slug y cantidad),
-- descuenta inventario en la misma transacción y devuelve el folio.
create or replace function public.create_order(
  p_customer jsonb,   -- {name, email, phone, address, city, zip}
  p_items    jsonb    -- [{slug, qty}]
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  it        jsonb;
  prod      public.products%rowtype;
  qty       integer;
  lineas    jsonb := '[]'::jsonb;
  total     integer := 0;
  v_folio   text;
begin
  if jsonb_array_length(coalesce(p_items, '[]'::jsonb)) = 0 then
    raise exception 'El pedido está vacío';
  end if;
  if coalesce(trim(p_customer->>'name'), '') = '' or coalesce(trim(p_customer->>'email'), '') = ''
     or coalesce(trim(p_customer->>'address'), '') = '' then
    raise exception 'Faltan datos de envío';
  end if;

  for it in select * from jsonb_array_elements(p_items) loop
    qty := greatest(1, least(10, coalesce((it->>'qty')::int, 1)));
    select * into prod from public.products
      where slug = it->>'slug' and active = true
      for update;
    if not found then
      raise exception 'Modelo no disponible: %', it->>'slug';
    end if;
    if prod.stock < qty then
      raise exception 'Sin inventario suficiente para %', prod.name;
    end if;
    update public.products set stock = stock - qty where id = prod.id;
    lineas := lineas || jsonb_build_object('slug', prod.slug, 'name', prod.name, 'ref', prod.ref,
                                           'price', prod.price, 'qty', qty);
    total := total + prod.price * qty;
  end loop;

  v_folio := 'MR-' || to_char(now() at time zone 'America/Mexico_City', 'YYMMDD') || '-' ||
             upper(substr(md5(random()::text), 1, 4));

  insert into public.orders (folio, customer_name, email, phone, address, city, zip, items, subtotal, payment_method)
  values (v_folio,
          left(trim(p_customer->>'name'), 120),
          left(trim(p_customer->>'email'), 160),
          left(coalesce(trim(p_customer->>'phone'), ''), 30),
          left(trim(p_customer->>'address'), 240),
          left(coalesce(trim(p_customer->>'city'), ''), 120),
          left(coalesce(trim(p_customer->>'zip'), ''), 10),
          lineas, total,
          left(coalesce(trim(p_customer->>'payment'), ''), 40));

  return jsonb_build_object('folio', v_folio, 'items', lineas, 'subtotal', total);
end $$;

grant execute on function public.create_order(jsonb, jsonb) to anon, authenticated;

-- ── Fotos de productos (Storage) ─────────────────────────────
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

drop policy if exists "fotos publicas"      on storage.objects;
drop policy if exists "admin sube fotos"     on storage.objects;
drop policy if exists "admin cambia fotos"   on storage.objects;
drop policy if exists "admin borra fotos"    on storage.objects;

create policy "fotos publicas" on storage.objects
  for select using (bucket_id = 'productos');
create policy "admin sube fotos" on storage.objects
  for insert to authenticated with check (bucket_id = 'productos');
create policy "admin cambia fotos" on storage.objects
  for update to authenticated using (bucket_id = 'productos');
create policy "admin borra fotos" on storage.objects
  for delete to authenticated using (bucket_id = 'productos');
