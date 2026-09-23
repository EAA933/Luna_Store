
# LUNA — Next.js eCommerce (MX)

Premium-accesible storefront for sunglasses. Stack: Next.js App Router, TypeScript, Tailwind, Prisma (Postgres), Stripe, optional Sanity CMS.

## Quick start

```bash
pnpm install
pnpm db:push     # requires a Postgres DATABASE_URL (Neon/Supabase)
pnpm seed        # seeds example products with variants
pnpm dev
```

Open http://localhost:3000

Deploy on Vercel. Copy `.env.example` to `.env` and fill values.

## Pages
- `/` landing with hero, destacados, editorial blocks
- `/catalog` filters (shape, lens, material, price)
- `/product/[slug]` PDP with gallery and details
- `/cart`, `/checkout`
- Legal and CMS-like pages

## Notes
- If no DATABASE_URL is set, site boots with a small in-memory catalog. For production, use Postgres and run seed.
