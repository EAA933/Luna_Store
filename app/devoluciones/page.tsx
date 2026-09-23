
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DevolucionesPage() {
  return (
    <main>
      <Header />
      <section className="container py-10 prose">
        <h1 className="font-playfair text-3xl text-midnight">Devoluciones (30 dias)</h1>
        <p>Si no estas satisfecho, puedes devolver tu producto dentro de 30 dias.</p>
      </section>
      <Footer />
    </main>
  )
}
