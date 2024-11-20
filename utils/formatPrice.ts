export function formatPrice(
  amount: number,
  currency = "USD",
  locale = "en-us"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
