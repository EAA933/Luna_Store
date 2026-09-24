// app/page.tsx
import Hero from "@/components/Hero";
import { Categorias, Editorial, GuiaFormas, Marquesina, MasBuscados } from "@/components/home/Sections";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquesina />
      <Categorias />
      <MasBuscados />
      <Editorial />
      <GuiaFormas />
    </main>
  );
}
