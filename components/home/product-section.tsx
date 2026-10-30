import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Seção reaproveitada na home para "produtos em destaque"
 * e "promoções imperdíveis".
 */
export function ProductSection({
  eyebrow,
  title,
  subtitle,
  products,
  cta,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  cta?: { label: string; href: string };
  tone?: "light" | "soft";
}) {
  return (
    <section className={cn("py-16 sm:py-20", tone === "soft" && "bg-brand-taupeSoft/20")}>
      <div className="container">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <ProductGrid products={products} className="mt-12" />

        {cta && (
          <div className="mt-12 text-center">
            <Button asChild variant="gold" size="lg">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
