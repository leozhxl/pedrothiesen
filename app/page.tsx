import type { Metadata } from "next";

import { HeroCarousel } from "@/components/home/hero-carousel";
import { TrustBadges } from "@/components/home/trust-badges";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ProductSection } from "@/components/home/product-section";
import { HowToPersonalize } from "@/components/home/how-to-personalize";
import { AboutBlock } from "@/components/home/about-block";
import { featuredProducts, onSaleProducts } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.slogan}`,
  description:
    "Velas artesanais aromáticas e devocionais, luminárias personalizadas com foto em impressão 3D, kits de batizado e lembrancinhas. Feito com carinho em cada detalhe, em Sombrio/SC, com envio para todo o Brasil.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 3 — Banner principal (carrossel) */}
      <HeroCarousel />

      {/* 4 — Faixa de confiança */}
      <TrustBadges />

      {/* Vitrine das categorias */}
      <CategoryShowcase />

      {/* 5 e 6 — Destaques + "Ver todos os produtos" */}
      <ProductSection
        eyebrow="Feito com carinho em cada detalhe"
        title="Criamos presentes com propósito"
        subtitle="As peças mais pedidas do ateliê — todas personalizáveis em aroma, cor, nome e acabamento."
        products={featuredProducts()}
        cta={{ label: "Ver todos os produtos", href: "/loja" }}
      />

      {/* 7 — Passo a passo da personalização */}
      <HowToPersonalize />

      {/* 8 — Promoções */}
      <ProductSection
        eyebrow="Por tempo limitado"
        title="Promoções imperdíveis"
        subtitle="Peças selecionadas com preço especial, com a mesma dedicação de sempre."
        products={onSaleProducts()}
        tone="soft"
      />

      {/* 9 — Sobre o Ateliê */}
      <AboutBlock />
    </>
  );
}
