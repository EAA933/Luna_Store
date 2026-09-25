import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Garantía y cuidado — MIRAR" };

export default function GarantiaPage() {
  return (
    <InfoPage eyebrow="Ayuda" title="Garantía y cuidado">
      <section><h2>12 meses de garantía</h2><p>Cubre defectos de fabricación en armazón y micas.</p></section>
      <section><h2>Cuidado diario</h2><p>Usa el estuche y el paño MIRAR para guardarlos y limpiarlos; evita dejarlos al sol dentro del auto.</p></section>
    </InfoPage>
  );
}
