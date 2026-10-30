"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Impressão 3D & Luminárias",
    title: "Eternize momentos com a luminária personalizada",
    text: "Sua foto impressa em 3D: apagada, parece um quadro branco. Acesa, revela a memória inteira.",
    href: "/categoria/impressao-3d",
    cta: "Criar a minha luminária",
    image: "/banners/banner-luminarias.svg",
  },
  {
    eyebrow: "Velas Aromáticas",
    title: "Aroma que aquece a alma",
    text: "Cera vegetal, pavio de algodão e aromas selecionados. Rótulo com o nome de quem vai receber.",
    href: "/categoria/velas-aromaticas",
    cta: "Ver as velas",
    image: "/banners/banner-velas.svg",
  },
  {
    eyebrow: "Batizado & Celebrações",
    title: "O dia que a família não esquece",
    text: "Kits com bandeja do Divino Espírito Santo, raios dourados e vela com o nome da criança.",
    href: "/categoria/batizado",
    cta: "Ver os kits",
    image: "/banners/banner-batizado.svg",
  },
  {
    eyebrow: "Velas Devocionais",
    title: "Rogai por nós",
    text: "Imagem de Nossa Senhora suspensa no brilho, tampa de madeira e laço de cetim. Para rezar e presentear.",
    href: "/categoria/velas-devocionais",
    cta: "Ver devocionais",
    image: "/banners/banner-devocionais.svg",
  },
];

/** Carrossel principal da home, com troca automática e navegação manual. */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback((direction: 1 | -1) => {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }, []);

  // Troca automática suave; pausa não é necessária porque não há vídeo.
  useEffect(() => {
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, [go]);

  return (
    <section aria-label="Destaques do ateliê" className="relative">
      <div className="relative h-[78vw] max-h-[620px] min-h-[420px] w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt={slide.eyebrow}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* Véu claro para o texto respirar sobre a foto */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/95 via-brand-cream/70 to-transparent" />

            <div className="container relative flex h-full items-center">
              <div className="max-w-xl animate-fade-up">
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-brown">
                  {slide.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.08] text-brand-graphite sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-brand-graphite/80 sm:text-lg">
                  {slide.text}
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href={slide.href}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Setas */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Destaque anterior"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-soft transition-all hover:scale-105 hover:bg-white sm:block"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo destaque"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-soft transition-all hover:scale-105 hover:bg-white sm:block"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Indicadores */}
        <ul className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <li key={slide.title}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para o destaque ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-brand-taupe" : "w-3 bg-brand-graphite/25",
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
