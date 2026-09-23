// app/page.tsx
import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import Reviews from "@/components/Reviews";
import AboutUs from "@/components/home/AboutUs";
import BestSellers from "@/components/home/BestsellersSlider";
import Collections from "@/components/home/CategoriesSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-luna-bg text-luna-fg">
      {/* Hero editorial grande */}
      <Hero />

      {/* Más vendidos — carrusel (auto-scroll suave) */}
      <BestSellers />

      {/* Razones para comprar (tiras de valor) */}
      <ValueStrip />

      {/* Colecciones con tarjetas editoriales */}
      <Collections />

      {/* Reseñas */}
      <Reviews />

      {/* Quiénes somos (editorial XL) */}
      <AboutUs />
      <Footer/>
    </main>
  );
}
