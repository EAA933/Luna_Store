-- supabase/pagos.sql — estado de pago de cada pedido (Mercado Pago o transferencia).
alter table public.orders
  add column if not exists payment_status text not null default 'pendiente',
  add column if not exists mp_payment_id  text;

alter table public.orders drop constraint if exists orders_payment_status_check;
alter table public.orders add constraint orders_payment_status_check
  check (payment_status in ('pendiente','pagado','rechazado','reembolsado'));
