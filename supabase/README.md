# Supabase — MIRAR

La tienda lee productos, precios y stock de Supabase, guarda los pedidos y el panel
`/admin` usa el login de Supabase.

## Variables (archivo `.env.local`, no se sube a git)

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-public-key
NEXT_PUBLIC_WHATSAPP=52XXXXXXXXXX   # número que recibe los pedidos, con lada, solo dígitos
```

La anon key es pública por diseño; la seguridad la dan las reglas RLS de `schema.sql`.
Nunca pongas la `service_role` key en el frontend.

## Montar la base desde cero

1. SQL Editor → corre `schema.sql` (tablas, seguridad, función `create_order`, bucket de fotos).
2. Corre `seed.generated.sql` (los 6 modelos iniciales).
3. Authentication → Users → Add user: tu usuario administrador.
4. Authentication → Sign In / Providers → desactiva "Allow new users to sign up".

Sin estas variables la tienda funciona con el catálogo local (`lib/products.ts`),
pero sin pedidos reales ni panel de administrador.
