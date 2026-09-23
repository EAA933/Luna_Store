// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600", "700", "900"],
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUNA — Lentes premium",
  description: "Diseño cuidado. Protección real. LUNA todos los días.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-luna-bg text-luna-fg transition-colors">
        <ThemeProvider>
          {/* Barra de navegación visible en todas las páginas */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          {/* Contenido de cada ruta */}
          <div className="relative">{children}</div>

          {/* Drawer del carrito montado una sola vez a nivel app */}
          <CartDrawer />

          {/* Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
