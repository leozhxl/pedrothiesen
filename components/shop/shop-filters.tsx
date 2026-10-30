"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { priceRanges, sortOptions } from "@/lib/filters";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Filtros por categoria, faixa de preço e ordenação.
 * O estado vive na URL, então o filtro é compartilhável e indexável.
 */
export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = {
    categoria: params.get("categoria") ?? "",
    preco: params.get("preco") ?? "",
    ordem: params.get("ordem") ?? "destaques",
    busca: params.get("busca") ?? "",
  };

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const hasFilters = Boolean(current.categoria || current.preco || current.busca);

  return (
    <aside aria-label="Filtros" className="lg:sticky lg:top-40">
      <div className="flex items-center gap-2 text-brand-brown">
        <SlidersHorizontal className="h-4 w-4" />
        <h2 className="text-xs uppercase tracking-[0.2em]">Filtrar</h2>
      </div>

      {hasFilters && (
        <Link
          href={pathname}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-taupe underline underline-offset-4"
        >
          <X className="h-3.5 w-3.5" />
          Limpar filtros
        </Link>
      )}

      {/* Categoria */}
      <div className="mt-6">
        <Label asChild>
          <h3>Categoria</h3>
        </Label>
        <ul className="mt-3 space-y-1">
          <FilterItem
            label="Todas as peças"
            active={!current.categoria}
            onClick={() => setParam("categoria", "")}
          />
          {categories.map((category) => (
            <FilterItem
              key={category.slug}
              label={category.name}
              active={current.categoria === category.slug}
              onClick={() => setParam("categoria", category.slug)}
            />
          ))}
        </ul>
      </div>

      <Separator className="my-6" />

      {/* Faixa de preço */}
      <div>
        <Label asChild>
          <h3>Faixa de preço</h3>
        </Label>
        <ul className="mt-3 space-y-1">
          <FilterItem
            label="Todos os preços"
            active={!current.preco}
            onClick={() => setParam("preco", "")}
          />
          {priceRanges.map((range) => (
            <FilterItem
              key={range.id}
              label={range.label}
              active={current.preco === range.id}
              onClick={() => setParam("preco", range.id)}
            />
          ))}
        </ul>
      </div>

      <Separator className="my-6" />

      {/* Ordenação */}
      <div>
        <Label asChild>
          <h3>Ordenar por</h3>
        </Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              type="button"
              size="sm"
              variant={current.ordem === option.id ? "default" : "outline"}
              onClick={() => setParam("ordem", option.id)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
          active
            ? "bg-brand-taupeSoft/40 text-brand-graphite"
            : "text-muted-foreground hover:bg-brand-sand/50 hover:text-brand-graphite",
        )}
      >
        {label}
      </button>
    </li>
  );
}
