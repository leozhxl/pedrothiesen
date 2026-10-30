import Link from "next/link";
import { Clock, Instagram, Lock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { footerNav, site } from "@/lib/site";
import { waGeneral } from "@/lib/whatsapp";

const paymentMethods = ["Pix", "Visa", "Mastercard", "Elo", "Hipercard", "Boleto"];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-brand-sand bg-brand-sand/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <span className="block font-script text-3xl text-brand-taupe">{site.shortName}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-brand-graphite/70">
              Velas &amp; Personalizados
            </span>
            <ul className="mt-5 max-w-xs space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              {site.pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
              <li className="text-brand-graphite/70">{site.city}</li>
            </ul>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Personalização total e envio para todo o Brasil.
            </p>
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-brand-graphite shadow-soft transition-all hover:-translate-y-0.5 hover:text-brand-taupe hover:shadow-lift"
            >
              <Instagram className="h-4 w-4 text-brand-taupe" />@{site.instagram}
            </a>
          </div>

          {/* Loja */}
          <FooterColumn title="Nossa Loja" links={footerNav.loja} />

          {/* Conta */}
          <FooterColumn title="Minha Conta" links={footerNav.conta} />

          {/* Atendimento */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-brand-brown">Atendimento</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <a
                  href={`tel:${site.phoneDisplay.replace(/\D/g, "")}`}
                  className="transition-colors hover:text-brand-taupe"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <a
                  href={waGeneral()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-taupe"
                >
                  Falar com uma consultora
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-brand-taupe"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <span>{site.openingHours}</span>
              </li>
            </ul>

            <h2 className="mt-8 text-xs uppercase tracking-[0.2em] text-brand-brown">
              Institucional
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.institucional.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-brand-taupe"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Pagamentos e segurança */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-brand-brown">
              Formas de pagamento
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method}
                  className="rounded-md border border-brand-sand bg-white px-3 py-1.5 text-xs text-brand-graphite/80"
                >
                  {method}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Em até {site.installments}x sem juros no cartão de crédito.
            </p>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-brand-brown">Site seguro</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-md border border-brand-sand bg-white px-3 py-1.5 text-xs text-brand-graphite/80">
                <Lock className="h-3.5 w-3.5 text-brand-bronze" />
                Certificado SSL
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-brand-sand bg-white px-3 py-1.5 text-xs text-brand-graphite/80">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-bronze" />
                Compra protegida
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assinatura */}
      <div className="border-t border-brand-sand/80 bg-brand-cream">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p className="font-script text-base text-brand-taupe">{site.slogan}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.2em] text-brand-brown">{title}</h2>
      <ul className="mt-5 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-brand-taupe"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
