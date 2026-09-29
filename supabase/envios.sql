-- supabase/envios.sql — Envío por zonas, costo de envío en el pedido y
-- cancelación automática de pedidos sin pagar (48 h).

-- ── Zonas de envío (precios editables en /admin → Envíos) ─────
create table if not exists public.shipping_zones (
  id         text primary key,
  name       text not null,
  price      integer not null check (price >= 0),
  states     text[] not null default '{}',
  sort_order integer not null default 0
);

alter table public.shipping_zones enable row level security;
drop policy if exists "zonas visibles"  on public.shipping_zones;
drop policy if exists "admin zonas"     on public.shipping_zones;
create policy "zonas visibles" on public.shipping_zones for select to anon, authenticated using (true);
create policy "admin zonas"    on public.shipping_zones for all to authenticated using (true) with check (true);

insert into public.shipping_zones (id, name, price, states, sort_order) values
  ('local',  'CDMX y Estado de México', 99,
     array['Ciudad de México','Estado de México'], 1),
  ('centro', 'Centro del país', 149,
     array['Aguascalientes','Colima','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos',
           'Nayarit','Puebla','Querétaro','San Luis Potosí','Tlaxcala','Veracruz','Zacatecas'], 2),
  ('lejana', 'Norte y sureste', 199,
     array['Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Durango',
           'Nuevo León','Oaxaca','Quintana Roo','Sinaloa','Sonora','Tabasco','Tamaulipas','Yucatán'], 3)
on conflict (id) do nothing;

-- ── Pedidos: estado de entrega y envío ────────────────────────
alter table public.orders
  add column if not exists state    text not null default '',
  add column if not exists shipping integer not null default 0,
  add column if not exists total    integer;

update public.orders set total = subtotal + shipping where total is null;

-- ── create_order ahora calcula el envío del lado del servidor ─
create or replace function public.create_order(
  p_customer jsonb,   -- {name, email, phone, address, city, state, zip, payment}
  p_items    jsonb    -- [{slug, qty}]
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  it        jsonb;
  prod      public.products%rowtype;
  zona      public.shipping_zones%rowtype;
  qty       integer;
  lineas    jsonb := '[]'::jsonb;
  total     integer := 0;
  envio     integer := 0;
  v_folio   text;
  v_estado  text := trim(coalesce(p_customer->>'state', ''));
begin
  if jsonb_array_length(coalesce(p_items, '[]'::jsonb)) = 0 then
    raise exception 'El pedido está vacío';
  end if;
  if coalesce(trim(p_customer->>'name'), '') = '' or coalesce(trim(p_customer->>'email'), '') = ''
     or coalesce(trim(p_customer->>'address'), '') = '' then
    raise exception 'Faltan datos de envío';
  end if;

  select * into zona from public.shipping_zones where v_estado = any(states) limit 1;
  if not found then
    raise exception 'Selecciona un estado válido para el envío';
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

  envio := case when total >= 1299 then 0 else zona.price end;

  v_folio := 'MR-' || to_char(now() at time zone 'America/Mexico_City', 'YYMMDD') || '-' ||
             upper(substr(md5(random()::text), 1, 4));

  insert into public.orders (folio, customer_name, email, phone, address, city, state, zip,
                             items, subtotal, shipping, total, payment_method)
  values (v_folio,
          left(trim(p_customer->>'name'), 120),
          left(trim(p_customer->>'email'), 160),
          left(coalesce(trim(p_customer->>'phone'), ''), 30),
          left(trim(p_customer->>'address'), 240),
          left(coalesce(trim(p_customer->>'city'), ''), 120),
          v_estado,
          left(coalesce(trim(p_customer->>'zip'), ''), 10),
          lineas, total, envio, total + envio,
          left(coalesce(trim(p_customer->>'payment'), ''), 40));

  return jsonb_build_object('folio', v_folio, 'items', lineas, 'subtotal', total,
                            'shipping', envio, 'total', total + envio, 'zone', zona.name);
end $$;

grant execute on function public.create_order(jsonb, jsonb) to anon, authenticated;

-- ── Avisos de pago: evita WhatsApp/correos repetidos ──────────
-- Mercado Pago puede avisar varias veces del mismo pago; solo el primero cuenta.
create table if not exists public.payment_notices (
  payment_id text primary key,
  folio      text not null,
  created_at timestamptz not null default now()
);
alter table public.payment_notices enable row level security;

create or replace function public.claim_payment_notice(p_payment_id text, p_folio text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  insert into public.payment_notices (payment_id, folio) values (p_payment_id, p_folio);
  return true;
exception when unique_violation then
  return false;
end $$;
grant execute on function public.claim_payment_notice(text, text) to anon, authenticated;

-- ── Cancelación automática de pedidos sin pagar (48 h) ────────
create or replace function public.cancel_unpaid_orders()
returns integer
language plpgsql security definer set search_path = public as $$
declare
  o   public.orders%rowtype;
  it  jsonb;
  n   integer := 0;
begin
  for o in
    select * from public.orders
     where status = 'nuevo' and payment_status = 'pendiente'
       and created_at < now() - interval '48 hours'
     for update
  loop
    for it in select * from jsonb_array_elements(o.items) loop
      update public.products set stock = stock + coalesce((it->>'qty')::int, 0)
       where slug = it->>'slug';
    end loop;
    update public.orders
       set status = 'cancelado',
           admin_notes = trim(both from admin_notes || E'\nCancelado automáticamente: sin pago en 48 h.')
     where id = o.id;
    n := n + 1;
  end loop;
  return n;
end $$;
revoke all on function public.cancel_unpaid_orders() from public, anon, authenticated;

create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname = 'mirar-cancelar-sin-pagar';
select cron.schedule('mirar-cancelar-sin-pagar', '15 * * * *', $$select public.cancel_unpaid_orders()$$);
