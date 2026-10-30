import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductGrid } from "@/components/product/product-grid";
import { SearchBar } from "@/components/shop/search-bar";
import { ShopFilters } from "@/components/shop/shop-filters";
import { priceRanges } from "@/lib/filters";
import { effectivePrice } from "@/lib/format";
import { products, searchProducts, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "Loja — velas, impressão 3D e personalizados",
  description:
    "Todas as peças do ateliê: velas aromáticas e devocionais, luminárias personalizadas com foto, kits de batizado e lembrancinhas. Filtre por categoria e faixa de preço.",
  alternates: { canonical: "/loja" },
};

type SearchParams = {
  categoria?: string;
  preco?: string;
  ordem?: string;
  busca?: string;
};

/** Aplica categoria, faixa de preço, busca e ordenação na mesma ordem da UI. */
function filterProducts(params: SearchParams): Product[] {
  let result: Product[] = params.busca ? searchProducts(params.busca) : [...products];

  if (params.categoria) {
    result = result.filter((p) => p.category === params.categoria);
  }

  const range = priceRanges.find((r) => r.id === params.preco);
  if (range) {
    result = result.filter((p) => {
      const price = effectivePrice(p.price, p.salePrice);
      return price >= range.min && price <= range.max;
    });
  }

  switch (params.ordem) {
    case "menor-preco":
      result.sort(
        (a, b) => effectivePrice(a.price, a.salePrice) - effectivePrice(b.price, b.salePrice),
      );
      break;
    case "maior-preco":
      result.sort(
        (a, b) => effectivePrice(b.price, b.salePrice) - effectivePrice(a.price, a.salePrice),
      );
      break;
    case "nome":
      result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      break;
    default:
      // Destaques primeiro, mantendo a ordem curada do catálogo.
      result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return result;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const results = filterProducts(searchParams);

  return (
    <div className="container py-12 sm:py-16">
      <header className="text-center">
        <p className="section-eyebrow">Nossa loja</p>
        <h1 className="section-title">
          {searchParams.busca ? `Resultados para "${searchParams.busca}"` : "Todas as peças"}
        </h1>
        <p className="section-subtitle">
          Cada item é feito à mão, sob medida, com personalização de aroma, cor, nome e
          acabamento.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[250px_1fr]">
        <Suspense fallback={null}>
          <ShopFilters />
        </Suspense>

        <div>
          <p className="mb-6 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "peça encontrada" : "peças encontradas"}
          </p>
          <ProductGrid products={results} className="lg:grid-cols-2 xl:grid-cols-3" />
        </div>
      </div>
    </div>
  );
}
