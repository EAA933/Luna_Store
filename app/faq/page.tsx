import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FAQPage() {
  return (
    <main className="w-full bg-[rgb(var(--bg))] text-floema-fg min-h-screen">
      <section className="container-floema py-12 max-w-4xl mx-auto">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase mb-8 hover:text-floema-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>

        <FAQ />
      </section>
      <Footer />
    </main>
  );
}
