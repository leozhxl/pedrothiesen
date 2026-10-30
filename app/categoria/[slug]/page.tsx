import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { ProductGrid } from "@/components/product/product-grid";
import { categories, getCategory, listProducts } from "@/lib/products";

type Params = { params: { slug: string } };

/** Gera as rotas estáticas das categorias no build. */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: `${category.name} — feitos à mão`,
    description: category.description,
    alternates: { canonical: `/categoria/${category.slug}` },
  };
}

export default function CategoryPage({ params }: Params) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = listProducts(category.slug);

  return (
    <div className="container py-12 sm:py-16">
      {/* Trilha de navegação */}
      <nav aria-label="Você está em" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-brand-taupe">
          Início
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/loja" className="transition-colors hover:text-brand-taupe">
          Loja
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand-graphite">{category.name}</span>
      </nav>

      <header className="mt-10 text-center">
        <p className="section-eyebrow">{category.tagline}</p>
        <h1 className="section-title">{category.name}</h1>
        <p className="section-subtitle">{category.description}</p>
      </header>

      <ProductGrid products={items} className="mt-14" />

      {/* Navegação entre categorias */}
      <section className="mt-20 border-t border-brand-sand pt-10">
        <h2 className="text-center text-xs uppercase tracking-[0.2em] text-brand-brown">
          Veja também
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/categoria/${other.slug}`}
                  className="inline-block rounded-full border border-brand-sand bg-white px-5 py-2.5 text-sm transition-colors hover:border-brand-taupe hover:text-brand-taupe"
                >
                  {other.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
