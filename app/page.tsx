// app/page.tsx
import Hero from "@/components/Hero";
import ShoppingExperience from "@/components/home/ShoppingExperience";
import PorQueMirar from "@/components/home/PorQueMirar";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen transition-colors">
      {/* 1. Hero: Presentación editorial de silueta y puesta de sol */}
      <Hero />

      {/* 2. Elige tu par: modelos y precios en vivo */}
      <div id="experiencia-compra">
        <ShoppingExperience />
      </div>

      {/* 3. Por qué MIRAR: manifiesto + garantías (UV400, 14 días para cambios, envío gratis) */}
      <PorQueMirar />

      {/* 4. Reseñas de clientes reales (solo aparece si hay aprobadas) */}
      <Reviews />

      {/* 5. Footer de Marca */}
      <Footer />
    </main>
  );
}
