import type { ReactNode } from "react";

/** Moldura comum das páginas institucionais, com tipografia legível. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="container py-12 sm:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle">{intro}</p>
        <p className="mt-4 text-xs text-muted-foreground">Atualizado em {updatedAt}</p>
      </header>

      <article className="mx-auto mt-12 max-w-3xl space-y-8 text-base leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-brand-graphite [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-brand-graphite [&_li]:ml-1 [&_strong]:font-medium [&_strong]:text-brand-graphite [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </article>
    </div>
  );
}
