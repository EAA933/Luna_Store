// components/Navbar.tsx
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[rgb(var(--bg))]/90 backdrop-blur border-b border-[rgb(var(--stroke))]">
      <div className="flex items-center justify-between px-10 py-5 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-display tracking-tight">
          LUNA
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-8 text-[rgb(var(--fg))]/90 text-[1.05rem] font-medium">
          <Link href="#">Hombre</Link>
          <Link href="#">Mujer</Link>
          <Link href="/catalog">Catálogo</Link>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <button className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Carrito</span>
          </button>
        </div>
      </div>
    </header>
  );
}
