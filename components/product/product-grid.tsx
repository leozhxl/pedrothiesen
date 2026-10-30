import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Grade responsiva de produtos: 2 colunas no celular, até 4 no desktop. */
export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        Nenhuma peça encontrada com esses filtros. Que tal falar com uma consultora e criarmos
        algo sob medida para você?
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
