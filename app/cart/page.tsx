
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
  return (
    <main>
      <Header />
      <section className="container py-10">
        <h1 className="font-playfair text-3xl text-midnight">Carrito</h1>
        <p className="text-brand-muted mt-2">Tu carrito esta vacio (demo).</p>
      </section>
      <Footer />
    </main>
  )
}
