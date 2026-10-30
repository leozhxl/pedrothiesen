"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice, installmentLabel } from "@/lib/format";
import { site } from "@/lib/site";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { detailedCart, cartTotal, updateQuantity, removeFromCart, clearCart, ready } =
    useStore();

  if (!ready) {
    return <div className="container py-20 text-center text-muted-foreground">Carregando…</div>;
  }

  if (detailedCart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-brand-taupeSoft" />
        <h1 className="mt-6 font-serif text-3xl">Seu carrinho está vazinho</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Que tal começar pelas peças mais amadas do ateliê? Estamos à sua espera.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/loja">Ver todos os produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl">Seu carrinho</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Confira as peças escolhidas. A personalização é combinada depois, pelo WhatsApp.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Itens */}
        <ul className="space-y-4">
          {detailedCart.map(({ item, product, lineTotal }, index) => (
            <li
              key={`${product.slug}-${index}`}
              className="flex gap-4 rounded-2xl border border-brand-sand bg-white p-4 shadow-soft"
            >
              <Link
                href={`/produto/${product.slug}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-sand/40"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </Link>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-serif text-base leading-snug">
                    <Link
                      href={`/produto/${product.slug}`}
                      className="transition-colors hover:text-brand-taupe"
                    >
                      {product.name}
                    </Link>
                  </h2>
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    aria-label={`Remover ${product.name} do carrinho`}
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-brand-sand/60 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Personalização escolhida */}
                {Object.keys(item.options).length > 0 && (
                  <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {Object.entries(item.options).map(([label, value]) => (
                      <li key={label}>
                        <span className="text-brand-graphite/60">{label}:</span> {value}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 rounded-full border border-brand-sand p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      aria-label="Diminuir quantidade"
                      className="rounded-full p-1.5 transition-colors hover:bg-brand-sand/60"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                      className="rounded-full p-1.5 transition-colors hover:bg-brand-sand/60"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="font-serif text-lg">{formatPrice(lineTotal)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumo */}
        <aside className="h-fit rounded-2xl border border-brand-sand bg-white p-6 shadow-soft lg:sticky lg:top-40">
          <h2 className="font-serif text-xl">Resumo do pedido</h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd className="text-muted-foreground">Calculado no checkout</dd>
            </div>
          </dl>

          <Separator className="my-5" />

          <div className="flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-serif text-2xl">{formatPrice(cartTotal)}</span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {installmentLabel(cartTotal)}
          </p>

          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/checkout">Finalizar compra</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full">
            <Link href="/loja">Continuar comprando</Link>
          </Button>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 w-full text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-destructive"
          >
            Esvaziar carrinho
          </button>

          <p className="mt-6 rounded-xl bg-brand-sand/50 p-4 text-xs leading-relaxed text-muted-foreground">
            Prazo de produção de {site.productionDays} dias úteis. Após a compra, nossa
            consultora entra em contato pelo WhatsApp para finalizar a personalização.
          </p>
        </aside>
      </div>
    </div>
  );
}
