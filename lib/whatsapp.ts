import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

/** Monta um link wa.me com a mensagem já escrita. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** CTA genérico do botão flutuante e do cabeçalho. */
export function waGeneral() {
  return waLink(
    `Olá! Vim pelo site do ${site.name} e gostaria de falar com uma consultora sobre uma peça personalizada. 💛`,
  );
}

/** CTA "Comprar no WhatsApp com uma Consultora" na página/card do produto. */
export function waProduct(product: Product) {
  const price = product.salePrice ?? product.price;
  return waLink(
    `Olá, ${site.consultantName}! Me encantei pelo "${product.name}" (${formatPrice(price)}) no site e quero personalizar com você. Pode me ajudar? 💍`,
  );
}

/** CTA do checkout: envia o resumo do pedido para finalizar os detalhes. */
export function waCheckout(lines: string[], total: number) {
  return waLink(
    [
      `Olá, ${site.consultantName}! Acabei de montar meu pedido no site do ${site.name}:`,
      "",
      ...lines,
      "",
      `Total: ${formatPrice(total)}`,
      "",
      "Quero finalizar a personalização com você. 💛",
    ].join("\n"),
  );
}
