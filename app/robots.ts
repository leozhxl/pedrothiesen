import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Páginas transacionais não precisam ser indexadas.
      disallow: ["/carrinho", "/checkout", "/conta"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
