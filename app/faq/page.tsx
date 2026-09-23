
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQPage() {
  return (
    <main>
      <Header />
      <section className="container py-10 prose">
        <h1 className="font-playfair text-3xl text-midnight">FAQ</h1>
        <h3>¿Cuanto tarda el envio?</h3>
        <p>De 2 a 5 dias habiles.</p>
        <h3>¿Tienen garantia?</h3>
        <p>Si, 12 meses contra defectos de fabricacion.</p>
      </section>
      <Footer />
    </main>
  )
}
