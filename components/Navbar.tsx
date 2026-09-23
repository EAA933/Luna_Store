// components/Navbar.tsx
"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ShoppingCart } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import CartButton from "@/components/cart/CartButton";
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const search = useSearchParams();
  const isActive = useMemo(() => {
    // activa cuando estás en /catalog y coincide el segmento del link (si aplica)
    if (!pathname?.startsWith("/catalog")) return pathname === href;
    const linkUrl = new URL(href, "http://dummy");
    const seg = linkUrl.searchParams.get("segment");
    if (!seg) return false;
    return search?.get("segment") === seg;
  }, [pathname, search, href]);

  return (
    <Link
      href={href}
      className={[
        "px-2 py-1 rounded-md transition",
        "hover:text-[rgb(var(--accent))] hover:bg-white/5",
        isActive ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--fg))]/90",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[rgb(var(--bg))]/90 backdrop-blur border-b border-[rgb(var(--stroke))]">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto px-12 py-6">
        {/* Logo grande */}
        <Link
          href="/"
          className="text-4xl md:text-5xl font-display tracking-tight leading-none"
        >
          LUNA
        </Link>

        {/* Links grandes */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
          <NavLink href="/catalog?segment=men">Hombre</NavLink>
          <NavLink href="/catalog?segment=women">Mujer</NavLink>
          <NavLink href="/catalog">Catálogo</NavLink>
        </nav>


<div className="flex items-center gap-5">
  <ThemeToggle />
  <CartButton />   {/* <= AQUÍ */}
</div>

      </div>
    </header>
  );
}
