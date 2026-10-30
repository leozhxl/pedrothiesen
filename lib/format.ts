import { site } from "@/lib/site";

/** Formata um número em reais: 189.9 → "R$ 189,90". */
export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Texto de parcelamento: "ou 3x de R$ 63,30 sem juros". */
export function installmentLabel(value: number, parts = site.installments) {
  return `ou ${parts}x de ${formatPrice(value / parts)} sem juros`;
}

/** Percentual de desconto arredondado entre preço cheio e promocional. */
export function discountPercent(price: number, salePrice?: number) {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

/** Preço que o cliente realmente paga. */
export function effectivePrice(price: number, salePrice?: number) {
  return salePrice && salePrice < price ? salePrice : price;
}
