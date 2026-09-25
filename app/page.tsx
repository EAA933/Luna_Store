// app/page.tsx
import Hero from "@/components/Hero";
import ShoppingExperience from "@/components/home/ShoppingExperience";
import ValueStrip from "@/components/ValueStrip";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-floema-bg text-floema-fg min-h-screen">
      {/* 1. Hero: Presentación editorial de producto con persona en la playa al atardecer y escala refinada */}
      <Hero />

      {/* 2. Las Experiencias: La experiencia de comprar personalizada */}
      <div id="experiencia-compra">
        <ShoppingExperience />
      </div>

      {/* 3. Compromisos y Garantía */}
      <ValueStrip />

      {/* 4. Reseñas y Experiencias Reales */}
      <Reviews />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
