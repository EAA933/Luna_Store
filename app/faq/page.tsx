import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Preguntas frecuentes — LUNA" };

export default function FAQPage() {
  return (
    <InfoPage eyebrow="Ayuda" title="Preguntas frecuentes">
      <section><h2>¿Cuánto tarda el envío?</h2><p>De 2 a 5 días hábiles.</p></section>
      <section><h2>¿Tienen garantía?</h2><p>Sí, 12 meses contra defectos de fabricación.</p></section>
      <section><h2>¿Puedo devolver mis lentes?</h2><p>Sí, tienes 30 días para devolverlos si no te convencen.</p></section>
    </InfoPage>
  );
}
