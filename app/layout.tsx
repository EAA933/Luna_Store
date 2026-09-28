// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import StoreChrome from "@/components/site/StoreChrome";
import { ProductsProvider } from "@/components/store/ProductsProvider";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const editorialSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const editorialSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const editorialMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MIRAR — Tienda de Lentes de Sol & Estudio Óptico",
  description:
    "MIRAR es una tienda independiente de lentes de sol y diseño óptico. Monturas de acetato y acero con micas UV400. 30 días de prueba y envío gratis en compras desde $1,299.",
  openGraph: {
    title: "MIRAR — Tienda Oficial de Lentes de Sol",
    description:
      "Gafas de sol de alta gama concebidas para la luz real. Colección Atardecer con bio-acetato curado y lentes polarizados HD.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${editorialSerif.variable} ${editorialSans.variable} ${editorialMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof self!=="undefined"?self:null;if(!r)return;var patch=function(obj){if(!obj)return;var d=Object.getOwnPropertyDescriptor(obj,"fetch");if(d&&d.get&&!d.set){Object.defineProperty(obj,"fetch",{get:d.get,set:function(v){Object.defineProperty(this,"fetch",{value:v,writable:true,configurable:true,enumerable:true});},configurable:true,enumerable:true});}};patch(r);if(r.Window)patch(r.Window.prototype);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] font-sans antialiased transition-colors"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ProductsProvider>
            {/* Barra de navegación de la tienda (se oculta en /admin) */}
            <StoreChrome>
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>
            </StoreChrome>

            {/* Contenido de la tienda */}
            <div className="relative">{children}</div>

            {/* Cajón del carrito de compras */}
            <StoreChrome>
              <CartDrawer />
            </StoreChrome>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
