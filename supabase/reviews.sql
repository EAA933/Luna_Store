-- supabase/reviews.sql — Reseñas de clientes reales.
-- Solo puede opinar quien tiene un pedido (folio + correo) que no esté cancelado,
-- una reseña por pedido. Las reseñas llegan ocultas y tú las apruebas en /admin.

create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  order_folio  text not null unique references public.orders (folio) on delete cascade,
  product_slug text,
  name         text not null check (char_length(name) between 2 and 60),
  rating       int  not null check (rating between 1 and 5),
  comment      text not null check (char_length(comment) between 10 and 800),
  approved     boolean not null default false
);

create index if not exists idx_reviews_approved on public.reviews (approved, created_at desc);

alter table public.reviews enable row level security;

drop policy if exists "resenas aprobadas visibles" on public.reviews;
drop policy if exists "admin resenas"              on public.reviews;

create policy "resenas aprobadas visibles" on public.reviews
  for select to anon, authenticated using (approved = true);
create policy "admin resenas" on public.reviews
  for all to authenticated using (true) with check (true);

-- Enviar una reseña: valida el pedido del lado del servidor.
create or replace function public.submit_review(
  p_folio text, p_email text, p_name text, p_rating int, p_comment text
) returns text
language plpgsql security definer set search_path = public as $$
declare
  o public.orders;
  slug text;
begin
  select * into o from public.orders
   where upper(folio) = upper(trim(p_folio))
     and lower(email) = lower(trim(p_email));
  if not found then
    raise exception 'No encontramos un pedido con ese folio y correo.';
  end if;
  if o.status = 'cancelado' then
    raise exception 'Ese pedido fue cancelado.';
  end if;
  if exists (select 1 from public.reviews where order_folio = o.folio) then
    raise exception 'Ya recibimos una reseña de este pedido. ¡Gracias!';
  end if;

  slug := o.items -> 0 ->> 'slug';
  insert into public.reviews (order_folio, product_slug, name, rating, comment)
  values (o.folio, slug, trim(p_name), p_rating, trim(p_comment));
  return o.folio;
end $$;

revoke all on function public.submit_review(text, text, text, int, text) from public;
grant execute on function public.submit_review(text, text, text, int, text) to anon, authenticated;
