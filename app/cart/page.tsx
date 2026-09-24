import { redirect } from "next/navigation";

// El carrito vive en el panel lateral; esta ruta lleva al resumen de compra.
export default function CartPage() {
  redirect("/checkout");
}
