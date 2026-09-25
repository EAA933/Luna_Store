# LUNA — Tienda de lentes (Next.js)

Storefront de lentes de sol para México. Stack: Next.js 14 (App Router), TypeScript, Tailwind y Zustand.

En vivo: https://luna-store-wheat.vercel.app

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Páginas
- `/` landing con hero, más vendidos, colecciones y reseñas
- `/catalog` filtros (segmento, forma, mica, material, precio)
- `/product/[slug]` ficha de producto
- `/cart`, `/checkout` (el pago en línea aún no está habilitado)
- Páginas legales e informativas

## Notas
- Sin base de datos: el catálogo vive en `lib/products.ts` y el carrito se guarda en el navegador (localStorage).
- Solo necesita `NEXT_PUBLIC_SITE_URL` (ver `.env.example`).
