import { MessageCircle, PackageCheck, Palette, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { waGeneral } from "@/lib/whatsapp";

const steps = [
  {
    icon: ShoppingBag,
    title: "1. Escolha a sua peça",
    text: "Navegue pelas categorias e finalize a compra no site, com pagamento em até 3x sem juros.",
  },
  {
    icon: MessageCircle,
    title: "2. Nossa consultora te chama",
    text: `Logo após a compra, ${site.consultantName} entra em contato pelo WhatsApp para começar a personalização.`,
  },
  {
    icon: Palette,
    title: "3. Ajustamos cada detalhe",
    text: "Aromas, cores, nomes, fitas e acabamentos. Nas peças 3D, você ainda aprova o preview antes da impressão.",
  },
  {
    icon: PackageCheck,
    title: "4. Feito à mão e enviado",
    text: `Produzimos em até ${site.productionDays} dias úteis e enviamos com rastreio para todo o Brasil.`,
  },
];

/** Passo a passo que tira a dúvida "como funciona a personalização?". */
export function HowToPersonalize() {
  return (
    <section className="bg-brand-sand/40 py-16 sm:py-20">
      <div className="container">
        <p className="section-eyebrow">Como funciona</p>
        <h2 className="section-title">Personalizar é fácil</h2>
        <p className="section-subtitle">
          Você não escolhe sozinha. Depois da compra, conversamos pelo WhatsApp e montamos a sua
          peça juntas — da escolha do aroma ao envio da foto que vai virar luminária.
        </p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-taupeSoft/50">
                <step.icon className="h-5 w-5 text-brand-taupe" />
              </span>
              <h3 className="mt-5 font-serif text-lg leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Button asChild variant="whatsapp" size="lg">
            <a href={waGeneral()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Tirar uma dúvida agora
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
