
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
export function formatCurrency(n: number, locale = "es-MX", currency = "MXN") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
}
