import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { effectivePrice } from "@/lib/format";
import {
  getCategory,
  getProductBySlug,
  products,
  relatedProducts,
} from "@/lib/products";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.slice(0, 1),
    },
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = relatedProducts(product);

  /* Dados estruturados para o Google exibir preço e disponibilidade. */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: effectivePrice(product.price, product.salePrice).toFixed(2),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `${site.url}/produto/${product.slug}`,
    },
  };

  return (
    <div className="container py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Trilha de navegação */}
      <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-brand-taupe">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/loja" className="transition-colors hover:text-brand-taupe">
          Loja
        </Link>
        {category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/categoria/${category.slug}`}
              className="transition-colors hover:text-brand-taupe"
            >
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand-graphite">{product.name}</span>
      </nav>

      {/* Galeria + compra */}
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <PurchasePanel product={product} />
      </div>

      {/* Descrição detalhada */}
      <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-serif text-2xl">Sobre esta peça</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-brown">
            O que acompanha
          </h3>
          <ul className="mt-4 space-y-2">
            {product.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-taupe" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dúvidas frequentes */}
        <div>
          <h2 className="font-serif text-2xl">Dúvidas frequentes</h2>
          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="prazo">
              <AccordionTrigger>Qual é o prazo de produção?</AccordionTrigger>
              <AccordionContent>
                {site.productionDays} dias úteis a partir da confirmação dos detalhes da
                personalização, mais o tempo de transporte. Para datas apertadas, fale com a
                consultora antes de comprar — às vezes conseguimos encaixar.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="personalizacao">
              <AccordionTrigger>Como escolho as cores e os nomes?</AccordionTrigger>
              <AccordionContent>
                Você já seleciona as principais opções aqui na página. Depois da compra,
                conversamos pelo WhatsApp para alinhar nomes, datas, tons exatos e qualquer
                pedido especial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="frete">
              <AccordionTrigger>Vocês enviam para todo o Brasil?</AccordionTrigger>
              <AccordionContent>
                Sim. Enviamos por transportadora e Correios, com embalagem reforçada e código de
                rastreio. O valor do frete é calculado no checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pagamento">
              <AccordionTrigger>Quais são as formas de pagamento?</AccordionTrigger>
              <AccordionContent>
                Pix, boleto e cartão de crédito em até {site.installments}x sem juros. No Pix,
                a consultora combina um desconto à vista.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <p className="section-eyebrow">Combina com</p>
          <h2 className="section-title">Você também vai se encantar</h2>
          <ProductGrid products={related} className="mt-12" />
        </section>
      )}
    </div>
  );
}
