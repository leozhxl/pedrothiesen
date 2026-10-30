import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

/** Sitemap gerado a partir do catálogo, para indexação no Google. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/loja",
    "/sobre",
    "/contato",
    "/rastreio",
    "/favoritos",
    "/conta",
    "/politica-de-privacidade",
    "/formas-de-entrega",
    "/trocas-e-devolucoes",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/categoria/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${site.url}/produto/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
