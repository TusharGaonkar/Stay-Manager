const { VITE_CURRENCY_LOCALE = 'en-IN', VITE_CURRENCY = 'INR' } = (
  import.meta as ImportMeta & { env: Record<string, string> }
).env;

export default function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat(VITE_CURRENCY_LOCALE, {
    style: 'currency',
    currency: VITE_CURRENCY,
  });
  return formatter.format(amount);
}
