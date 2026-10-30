"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

const subjects = [
  "Dúvida sobre um produto",
  "Orçamento personalizado",
  "Prazo e entrega",
  "Pedido em andamento",
  "Outro assunto",
];

/**
 * Formulário de contato. Em vez de depender de um back-end de e-mail,
 * ele monta a mensagem e abre a conversa no WhatsApp — o canal onde a
 * consultora realmente atende.
 */
export function ContactForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: subjects[0],
    mensagem: "",
  });

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const message = [
      `Olá, ${site.consultantName}! Vim pelo site.`,
      "",
      `Nome: ${form.nome}`,
      `E-mail: ${form.email}`,
      `Assunto: ${form.assunto}`,
      "",
      form.mensagem,
    ].join("\n");
    window.open(waLink(message), "_blank");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft sm:p-8"
    >
      <h2 className="font-serif text-xl">Mande sua mensagem</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Preencha os campos e, ao enviar, abrimos a conversa já com tudo escrito no WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome">Seu nome</Label>
          <Input
            id="nome"
            value={form.nome}
            onChange={(event) => update("nome", event.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email">Seu e-mail</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            required
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="assunto">Assunto</Label>
        <select
          id="assunto"
          value={form.assunto}
          onChange={(event) => update("assunto", event.target.value)}
          className="mt-1.5 h-11 w-full rounded-full border border-input bg-white/80 px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Label htmlFor="mensagem">Mensagem</Label>
        <textarea
          id="mensagem"
          rows={6}
          value={form.mensagem}
          onChange={(event) => update("mensagem", event.target.value)}
          required
          placeholder="Conte o que você imaginou: a celebração, as cores, a data…"
          className="mt-1.5 w-full rounded-2xl border border-input bg-white/80 p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" size="lg">
          <Send className="h-4 w-4" />
          Enviar mensagem
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`mailto:${site.email}`}>
            <MessageCircle className="h-4 w-4" />
            Prefiro e-mail
          </a>
        </Button>
      </div>
    </form>
  );
}
