"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { getProductBySlug, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist, ready } = useStore();

  const items = wishlist
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));

  if (!ready) {
    return <div className="container py-20 text-center text-muted-foreground">Carregando…</div>;
  }

  return (
    <div className="container py-12 sm:py-16">
      <header className="text-center">
        <p className="section-eyebrow">Suas escolhas</p>
        <h1 className="section-title">Lista de desejos</h1>
        <p className="section-subtitle">
          As peças que tocaram seu coração ficam guardadas aqui, esperando o momento certo.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-brand-taupeSoft" />
          <p className="mt-6 text-muted-foreground">
            Sua lista ainda está vazia. Toque no coração das peças que você amar.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/loja">Explorar a loja</Link>
          </Button>
        </div>
      ) : (
        <ProductGrid products={items} className="mt-12" />
      )}
    </div>
  );
}
