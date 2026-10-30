import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/** Bloco emocional "Sobre o Ateliê" na home. */
export function AboutBlock() {
  return (
    <section className="container py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-brand-sand shadow-soft">
          <Image
            src="/banners/atelie-mesa-de-trabalho.svg"
            alt="Mesa de trabalho do ateliê, com fitas, linhas e peças em montagem"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand-brown">
            Sobre o Ateliê
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Cada peça nasce de uma história de família
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A Pethi começou pequena, em Sombrio/SC, com uma panela de cera e vontade de
              acertar. A primeira vela foi feita para presentear uma amiga — e ela guardou o
              potinho vazio. Desde então, é esse o nosso termômetro.
            </p>
            <p>
              Hoje somos velas, impressão 3D e personalizados: derretemos, perfumamos, modelamos
              e imprimimos pensando em quem vai receber. Nada sai em série. Quando a sua peça sai
              daqui, ela já tem nome, data e um pedacinho de história dentro.
            </p>
            <p className="font-script text-2xl text-brand-taupe">{site.slogan}</p>
          </div>

          <Button asChild variant="outline" size="lg" className="mt-8">
            <Link href="/sobre">Saiba mais</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
