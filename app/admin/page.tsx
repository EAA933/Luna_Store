// app/admin/page.tsx — panel de administrador (acceso con cuenta de Supabase)
import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = { title: "MIRAR Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminApp />;
}
