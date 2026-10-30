import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Flower2, HandHeart, Scissors, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Ateliê",
  description:
    "Conheça a história da Pethi, ateliê de velas artesanais, impressão 3D e presentes personalizados em Sombrio/SC. Feito com carinho em cada detalhe.",
  alternates: { canonical: "/sobre" },
};

const values = [
  {
    icon: HandHeart,
    title: "Presentes com propósito",
    text: "Cada peça existe para marcar um momento. Nada sai daqui só para encher prateleira.",
  },
  {
    icon: Sparkles,
    title: "Sob medida para você",
    text: "Aromas, cores, nomes, fitas e acabamentos: tudo escolhido junto com você.",
  },
  {
    icon: Scissors,
    title: "Materiais escolhidos a dedo",
    text: "Cera vegetal, pavio de algodão, madeira, flores secas e filamento de boa procedência.",
  },
  {
    icon: Flower2,
    title: "Atendimento humano",
    text: "Você conversa com uma consultora de verdade, do primeiro oi até a peça chegar.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-8">
      {/* Abertura */}
      <section className="container py-14 text-center sm:py-20">
        <p className="section-eyebrow">Nossa história</p>
        <h1 className="section-title">Um ateliê que nasceu de um presente</h1>
        <p className="section-subtitle">
          Velas, impressão 3D e personalizados em {site.city} — e até hoje tratamos cada pedido
          como se fosse para alguém da família.
        </p>
      </section>

      {/* Foto + texto */}
      <section className="container">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-brand-sand shadow-soft">
          <Image
            src="/banners/atelie-mesa-de-trabalho.svg"
            alt="Mesa do ateliê com fitas, flores e peças em montagem"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Tudo começou com uma vela feita para uma amiga, numa cozinha em {site.city}. Ela
            usou até o fim e guardou o potinho vazio. Naquele momento entendemos que não
            estávamos vendendo um objeto — estávamos entregando uma memória.
          </p>
          <p>
            De lá para cá vieram as velas devocionais, os kits de batizado e, mais tarde, a
            impressão 3D. Já colocamos imagem de Nossa Senhora dentro de uma vela, transformamos
            foto de casamento em luminária, modelamos cachorro em 3D a partir de três fotos e
            refizemos um laço três vezes porque o tom de juta não estava certo.
          </p>
          <p>
            Trabalhamos devagar de propósito. Uma peça leva até{" "}
            <strong className="font-medium text-brand-graphite">
              {site.productionDays} dias úteis
            </strong>{" "}
            porque é o tempo de derreter, perfumar, curar, modelar, imprimir, conferir e embalar
            com cuidado. É o tempo de fazer bonito.
          </p>
          <p className="text-center font-script text-3xl text-brand-taupe">{site.slogan}</p>
        </div>
      </section>

      {/* Valores */}
      <section className="mt-20 bg-brand-sand/40 py-16 sm:py-20">
        <div className="container">
          <h2 className="section-title">No que acreditamos</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-taupeSoft/50">
                  <value.icon className="h-5 w-5 text-brand-taupe" />
                </span>
                <h3 className="mt-5 font-serif text-lg leading-snug">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section className="container py-16 text-center sm:py-20">
        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
          Vamos criar a sua obra-prima?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Conte o que você imaginou. A gente cuida do resto, com todo o carinho.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/loja">Ver todos os produtos</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contato">Fale conosco</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
