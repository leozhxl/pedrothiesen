"use client";

import { useState } from "react";
import { MessageCircle, Package, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

/** Etapas pelas quais todo pedido do ateliê passa. */
const stages = [
  { title: "Pedido confirmado", text: "Pagamento aprovado e pedido registrado." },
  { title: "Personalização alinhada", text: "Nossa consultora conversou com você e fechou os detalhes." },
  { title: "Em produção artesanal", text: `Sua peça está sendo feita à mão (${site.productionDays} dias úteis).` },
  { title: "Embalado com carinho", text: "Conferido item por item e embalado para viajar seguro." },
  { title: "Em transporte", text: "Enviado com código de rastreio para o seu endereço." },
];

export default function TrackingPage() {
  const [code, setCode] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Sem integração de transportadora ainda: encaminha para a consultora.
    window.open(
      waLink(
        `Olá! Gostaria de rastrear meu pedido no ${site.name}. Meu número de pedido é: ${code || "(informar)"}`,
      ),
      "_blank",
    );
  }

  return (
    <div className="container py-12 sm:py-16">
      <header className="text-center">
        <p className="section-eyebrow">Acompanhamento</p>
        <h1 className="section-title">Rastrear meu pedido</h1>
        <p className="section-subtitle">
          Informe o número do pedido que enviamos por e-mail e WhatsApp para saber em que etapa
          sua peça está.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-md rounded-2xl border border-brand-sand bg-white p-6 shadow-soft"
      >
        <Label htmlFor="pedido">Número do pedido</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="pedido"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ex.: PTH-2026-0148"
          />
          <Button type="submit" size="icon" aria-label="Consultar pedido">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          A consulta é feita junto da nossa consultora, para você receber a resposta com todos
          os detalhes.
        </p>
      </form>

      {/* Linha do tempo */}
      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-center font-serif text-2xl">Como caminha o seu pedido</h2>
        <ol className="mt-8 space-y-6">
          {stages.map((stage, index) => (
            <li key={stage.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-taupeSoft/50 text-sm text-brand-taupe">
                {index + 1}
              </span>
              <div>
                <h3 className="font-serif text-lg leading-snug">{stage.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-14 text-center">
        <Package className="mx-auto h-8 w-8 text-brand-taupeSoft" />
        <p className="mt-4 text-sm text-muted-foreground">Não encontrou seu pedido?</p>
        <Button asChild variant="whatsapp" className="mt-4">
          <a
            href={waLink(
              `Olá! Preciso de ajuda para localizar meu pedido no ${site.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com uma consultora
          </a>
        </Button>
      </div>
    </div>
  );
}
