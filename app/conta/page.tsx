"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, LogIn, Package, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Tab = "login" | "cadastro";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("login");

  /**
   * Front-end da área do cliente. Ao integrar a autenticação
   * (NextAuth, Clerk, Supabase…), troque este handler pela chamada real.
   */
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    alert(
      "Área do cliente em implantação. Enquanto isso, fale com nossa consultora pelo WhatsApp 💛",
    );
  }

  return (
    <div className="container py-12 sm:py-16">
      <header className="text-center">
        <p className="section-eyebrow">Área do cliente</p>
        <h1 className="section-title">Minha conta</h1>
        <p className="section-subtitle">
          Acompanhe seus pedidos, salve suas peças favoritas e agilize as próximas compras.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-md">
        {/* Abas */}
        <div
          role="tablist"
          aria-label="Entrar ou criar conta"
          className="flex rounded-full border border-brand-sand bg-white p-1"
        >
          {(
            [
              { id: "login", label: "Entrar", icon: LogIn },
              { id: "cadastro", label: "Criar conta", icon: UserPlus },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={tab === option.id}
              onClick={() => setTab(option.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm transition-colors",
                tab === option.id
                  ? "bg-brand-taupe text-white"
                  : "text-muted-foreground hover:text-brand-graphite",
              )}
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-2xl border border-brand-sand bg-white p-6 shadow-soft"
        >
          {tab === "cadastro" && (
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" required className="mt-1.5" />
            </div>
          )}

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" required className="mt-1.5" />
          </div>

          {tab === "cadastro" && (
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="(00) 00000-0000"
                required
                className="mt-1.5"
              />
            </div>
          )}

          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              name="senha"
              type="password"
              required
              minLength={6}
              className="mt-1.5"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            {tab === "login" ? "Entrar" : "Criar minha conta"}
          </Button>

          {tab === "login" && (
            <p className="text-center text-xs text-muted-foreground">
              Esqueceu a senha?{" "}
              <Link href="/contato" className="text-brand-taupe underline underline-offset-4">
                Fale com a gente
              </Link>
            </p>
          )}
        </form>

        {/* Atalhos */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href="/favoritos"
            className="flex flex-col items-center gap-2 rounded-2xl border border-brand-sand bg-white p-5 text-center text-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Heart className="h-5 w-5 text-brand-taupe" />
            Lista de desejos
          </Link>
          <Link
            href="/rastreio"
            className="flex flex-col items-center gap-2 rounded-2xl border border-brand-sand bg-white p-5 text-center text-sm transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Package className="h-5 w-5 text-brand-taupe" />
            Rastrear pedido
          </Link>
        </div>
      </div>
    </div>
  );
}
