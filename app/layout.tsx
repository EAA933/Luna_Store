// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
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
    "MIRAR es una tienda independiente de lentes de sol y diseño óptico. Monturas en bio-acetato curado de 8mm, acero quirúrgico 316L y micas minerales UV400 polarizadas. Envío gratis a todo México.",
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
            __html: `(function(){try{var w=typeof window!=="undefined"?window:typeof self!=="undefined"?self:globalThis;if(!w)return;var d=Object.getOwnPropertyDescriptor(w,"fetch")||(w.Window&&Object.getOwnPropertyDescriptor(w.Window.prototype,"fetch"));if(d&&d.get&&!d.set){var orig=d.get,val=undefined;Object.defineProperty(w,"fetch",{get:function(){return val||orig.call(this);},set:function(v){val=v;},configurable:true,enumerable:true});}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] font-sans antialiased transition-colors"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Barra de navegación de la tienda */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          {/* Contenido de la tienda */}
          <div className="relative">{children}</div>

          {/* Cajón del carrito de compras */}
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
