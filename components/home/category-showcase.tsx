import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/lib/products";

/** Vitrine das categorias, com foto e chamada visual. */
export function CategoryShowcase() {
  return (
    <section className="container py-16 sm:py-20">
      <p className="section-eyebrow">Nossas linhas</p>
      <h2 className="section-title">Velas, impressão 3D e personalizados</h2>
      <p className="section-subtitle">
        Escolha por onde começar — e deixe o resto com a gente.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-brand-sand shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-graphite/75 via-brand-graphite/10 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/75">
                {category.tagline}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-snug">{category.name}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/90">
                Ver peças
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
