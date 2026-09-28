// app/page.tsx
import Hero from "@/components/Hero";
import BestSellers from "@/components/home/BestsellersSlider";
import Collections from "@/components/home/CategoriesSection";
import SunSimulator from "@/components/home/SunSimulator";
import CaliberFitGuide from "@/components/home/CaliberFitGuide";
import AtelierCraft from "@/components/home/AtelierCraft";
import ShoppingExperience from "@/components/home/ShoppingExperience";
import WhyMirar from "@/components/home/WhyUs";
import AboutUs from "@/components/home/AboutUs";
import ValueStrip from "@/components/ValueStrip";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-[rgb(var(--bg))] text-[rgb(var(--fg))] min-h-screen transition-colors">
      {/* 1. Hero: Presentación editorial de silueta y puesta de sol */}
      <Hero />

      {/* 2. Catálogo Protagonista: Conoce la gama (6 siluetas emblemáticas) */}
      <BestSellers />

      {/* 3. Arquitectura de Materiales: Cuatro líneas (Urban, Nature, rePlastic, Horizon) */}
      <Collections />

      {/* 4. LightLab: Simulador interactivo de micas y tintes al atardecer */}
      <SunSimulator />

      {/* 5. Guía Ergonómica: Calce y proporciones faciales */}
      <CaliberFitGuide />

      {/* 6. Ingeniería & Taller: Tolerancias microscópicas y bio-acetato */}
      <AtelierCraft />

      {/* 7. Experiencia de Compra: Proceso transparente paso a paso */}
      <div id="experiencia-compra">
        <ShoppingExperience />
      </div>

      {/* 8. Pilares de Marca: Por qué MIRAR */}
      <WhyMirar />

      {/* 9. Manifiesto: Visión y filosofía */}
      <AboutUs />

      {/* 10. Compromisos de Envío, Garantía y Devolución */}
      <ValueStrip />

      {/* 11. Reseñas y Experiencias Reales de Clientes */}
      <Reviews />

      {/* 12. Footer de Marca */}
      <Footer />
    </main>
  );
}
