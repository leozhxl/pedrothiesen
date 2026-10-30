"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Heart, Minus, MessageCircle, Plus, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { discountPercent, effectivePrice, formatPrice, installmentLabel } from "@/lib/format";
import type { Product } from "@/lib/products";
import { site } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { waProduct } from "@/lib/whatsapp";

/**
 * Painel de compra da página de produto: preço, personalização,
 * quantidade e os dois caminhos de conversão (carrinho e WhatsApp).
 */
export function PurchasePanel({ product }: { product: Product }) {
  // Pré-seleciona a primeira opção de cada grupo, como numa vitrine montada.
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((group) => [group.label, group.values[0]])),
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart, toggleWishlist, isWished, ready } = useStore();
  const price = effectivePrice(product.price, product.salePrice);
  const discount = discountPercent(product.price, product.salePrice);
  const wished = ready && isWished(product.slug);

  function handleAdd() {
    addToCart(product.slug, options, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-brand-brown">
        Feito à mão · Peça única
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{product.name}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {product.shortDescription}
      </p>

      {/* Preço */}
      <div className="mt-7 rounded-2xl border border-brand-sand bg-white/70 p-5">
        <div className="flex flex-wrap items-end gap-3">
          {product.salePrice && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="font-serif text-4xl text-brand-graphite">{formatPrice(price)}</span>
          {discount > 0 && <Badge variant="default">-{discount}%</Badge>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{installmentLabel(price)}</p>
        <p className="mt-1 text-sm text-brand-bronze">
          À vista no Pix com desconto combinado pela consultora.
        </p>
      </div>

      {/* Personalização */}
      {product.options.length > 0 && (
        <div className="mt-8 space-y-6">
          <h2 className="font-serif text-xl">Personalize do seu jeito</h2>
          {product.options.map((group) => (
            <fieldset key={group.label}>
              <Label asChild>
                <legend>{group.label}</legend>
              </Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.values.map((value) => {
                  const selected = options[group.label] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        setOptions((current) => ({ ...current, [group.label]: value }))
                      }
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-all",
                        selected
                          ? "border-brand-taupe bg-brand-taupeSoft/40 text-brand-graphite"
                          : "border-brand-sand bg-white text-muted-foreground hover:border-brand-brown hover:text-brand-graphite",
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      )}

      {/* Quantidade + ações */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-full border border-brand-sand bg-white p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="rounded-full p-2 transition-colors hover:bg-brand-sand/60"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="rounded-full p-2 transition-colors hover:bg-brand-sand/60"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          className="inline-flex items-center gap-2 rounded-full border border-brand-sand bg-white px-4 py-2.5 text-sm transition-colors hover:border-brand-taupe"
        >
          <Heart
            className={cn("h-4 w-4", wished ? "fill-brand-taupe text-brand-taupe" : "text-brand-graphite/60")}
          />
          {wished ? "Na lista de desejos" : "Salvar na lista"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <Button size="lg" className="w-full" onClick={handleAdd}>
          {added ? (
            <>
              <Check className="h-5 w-5" />
              Adicionado ao carrinho
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Adicionar ao carrinho
            </>
          )}
        </Button>

        <Button asChild size="lg" variant="whatsapp" className="w-full">
          <a href={waProduct(product)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            Comprar no WhatsApp com uma Consultora
          </a>
        </Button>

        {added && (
          <Link
            href="/carrinho"
            className="block text-center text-sm text-brand-taupe underline underline-offset-4"
          >
            Ir para o carrinho
          </Link>
        )}
      </div>

      <Separator className="my-8" />

      {/* Avisos de produção e frete */}
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown" />
          <span>
            <strong className="font-medium text-brand-graphite">
              Prazo de produção: {site.productionDays} dias úteis.
            </strong>{" "}
            Cada peça é feita à mão, exclusivamente para você, depois da confirmação dos
            detalhes.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown" />
          <span>
            Enviamos para <strong className="font-medium text-brand-graphite">todo o Brasil</strong>,
            com embalagem reforçada e código de rastreio.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown" />
          <span>
            Depois da compra, nossa consultora entra em contato pelo WhatsApp para alinhar
            cores, nomes e cada detalhe.
          </span>
        </li>
      </ul>
    </div>
  );
}
