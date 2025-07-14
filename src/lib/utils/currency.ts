/**
 * Format price values
 */


  export function formatPrice(price: number, currency: string = "DZD") {

    let currentCurrency = currency.toUpperCase();

    // Format with Intl.NumberFormat, then replace spaces with dots for thousands
    let formatted = new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: currentCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    // Replace spaces (used as thousands separator in fr-DZ) with dots

    // Replace currency code if needed
    return formatted.replace(currentCurrency, currency);
  }
