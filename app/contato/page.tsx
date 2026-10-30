import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Truck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/layout/contact-form";
import { site } from "@/lib/site";
import { waGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Atendimento humano por WhatsApp, e-mail e telefone. Tire dúvidas sobre personalização, prazos e envio para todo o Brasil.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <div className="container py-12 sm:py-16">
      <header className="text-center">
        <p className="section-eyebrow">Atendimento</p>
        <h1 className="section-title">Fale conosco</h1>
        <p className="section-subtitle">
          Nada de robô: aqui você conversa com uma consultora de verdade, que entende de
          personalização e vai te ajudar a escolher.
        </p>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Formulário */}
        <ContactForm />

        {/* Canais */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft">
            <h2 className="font-serif text-xl">Canais diretos</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">WhatsApp</p>
                  <a
                    href={waGeneral()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-brand-taupe"
                  >
                    Conversar com {site.consultantName}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">Telefone</p>
                  <a
                    href={`tel:${site.phoneDisplay.replace(/\D/g, "")}`}
                    className="text-muted-foreground transition-colors hover:text-brand-taupe"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">E-mail</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-muted-foreground transition-colors hover:text-brand-taupe"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">Instagram</p>
                  <a
                    href={`https://instagram.com/${site.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-brand-taupe"
                  >
                    @{site.instagram}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">Horário de atendimento</p>
                  <p className="text-muted-foreground">{site.openingHours}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">Onde estamos</p>
                  <p className="text-muted-foreground">
                    {site.city} — atendimento online e retirada combinada.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand-taupe" />
                <div>
                  <p className="text-brand-graphite">Envios</p>
                  <p className="text-muted-foreground">
                    Para todo o Brasil, com código de rastreio.
                  </p>
                </div>
              </li>
            </ul>

            <Button asChild variant="whatsapp" className="mt-6 w-full">
              <a href={waGeneral()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </aside>
      </div>

      {/* Dúvidas */}
      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="section-title">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="prazo">
            <AccordionTrigger>Em quanto tempo minha peça fica pronta?</AccordionTrigger>
            <AccordionContent>
              O prazo de produção é de {site.productionDays} dias úteis, contados da
              confirmação dos detalhes da personalização. O frete entra depois disso.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="urgencia">
            <AccordionTrigger>Tenho uma data apertada. Dá para antecipar?</AccordionTrigger>
            <AccordionContent>
              Muitas vezes sim. Chame a consultora no WhatsApp com a data da sua celebração que
              verificamos a agenda do ateliê.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="quantidade">
            <AccordionTrigger>Qual a quantidade mínima de lembrancinhas?</AccordionTrigger>
            <AccordionContent>
              Em geral, 20 unidades por modelo. Para kits e caixas luxo não há mínimo.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pagamento">
            <AccordionTrigger>Como posso pagar?</AccordionTrigger>
            <AccordionContent>
              Pix, boleto ou cartão de crédito em até {site.installments}x sem juros.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
