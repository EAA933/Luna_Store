"use client";

// Navbar y carrito solo en la tienda; el panel /admin tiene su propia interfaz.
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function StoreChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
