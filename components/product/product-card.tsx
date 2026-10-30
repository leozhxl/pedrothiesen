"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { discountPercent, effectivePrice, formatPrice, installmentLabel } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { waProduct } from "@/lib/whatsapp";

/** Card de produto usado na home, na loja e nas categorias. */
export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished, ready } = useStore();
  const price = effectivePrice(product.price, product.salePrice);
  const discount = discountPercent(product.price, product.salePrice);
  const wished = ready && isWished(product.slug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-sand bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Foto */}
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-sand/40">
        <Link href={`/produto/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Selos */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 && <Badge variant="default">-{discount}%</Badge>}
          {product.badge && <Badge variant="gold">{product.badge}</Badge>}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wished ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
          aria-pressed={wished}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-soft transition-all hover:scale-110"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              wished ? "fill-brand-taupe text-brand-taupe" : "text-brand-graphite/60",
            )}
          />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-brown">Feito à mão</p>

        <h3 className="mt-2 font-serif text-lg leading-snug">
          <Link href={`/produto/${product.slug}`} className="transition-colors hover:text-brand-taupe">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        {/* Preços */}
        <div className="mt-4">
          {product.salePrice && (
            <span className="mr-2 text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="font-serif text-2xl text-brand-graphite">{formatPrice(price)}</span>
          <p className="mt-1 text-xs text-muted-foreground">{installmentLabel(price)}</p>
        </div>

        {/* Ações */}
        <div className="mt-5 space-y-2">
          <Button className="w-full" onClick={() => addToCart(product.slug)}>
            <ShoppingBag className="h-4 w-4" />
            Comprar
          </Button>
          <Button asChild variant="whatsapp" size="sm" className="w-full">
            <a href={waProduct(product)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Comprar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
