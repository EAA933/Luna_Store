// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MIRAR — Lentes de sol",
  description: "Lentes de sol con protección UV400 y opción polarizada. Acetato y acero, envío a todo México.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen">
        {/* useSearchParams del Navbar requiere Suspense para el prerender */}
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        <CartDrawer />
        <Analytics />
      </body>
    </html>
  );
}
