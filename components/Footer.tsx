export default function Footer() {
  return (
    <footer>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 grid md:grid-cols-4 gap-10">
        <div>
          <h3>LUNA</h3>
          <p>Diseño cuidado. Protección real.</p>
        </div>
        <div>
          <h3>Compra</h3>
          <ul className="space-y-2">
            <li><a href="/catalog">Catálogo</a></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Garantía</a></li>
          </ul>
        </div>
        <div>
          <h3>Nosotros</h3>
          <ul className="space-y-2">
            <li><a href="#">Nuestra historia</a></li>
            <li><a href="#">Misión</a></li>
          </ul>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>hola@luna.com.mx</p>
        </div>
      </div>
      <div className="text-center mt-10 text-sm opacity-70">
        © 2025 LUNA — Todos los derechos reservados.
      </div>
    </footer>
  );
}
