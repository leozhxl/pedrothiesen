"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock, MessageCircle, QrCode, Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice, installmentLabel } from "@/lib/format";
import { site } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { waCheckout } from "@/lib/whatsapp";

const paymentMethods = [
  { id: "pix", label: "Pix", icon: QrCode, hint: "Aprovação imediata, com desconto à vista" },
  {
    id: "cartao",
    label: "Cartão de crédito",
    icon: CreditCard,
    hint: `Em até ${site.installments}x sem juros`,
  },
  { id: "boleto", label: "Boleto", icon: Receipt, hint: "Vencimento em 3 dias úteis" },
] as const;

export default function CheckoutPage() {
  const { detailedCart, cartTotal, clearCart, ready } = useStore();
  const [payment, setPayment] = useState<string>("pix");
  const [done, setDone] = useState(false);

  // Resumo em texto, usado no link de WhatsApp.
  const summaryLines = detailedCart.map(
    ({ item, product, lineTotal }) =>
      `• ${item.quantity}x ${product.name} — ${formatPrice(lineTotal)}` +
      (Object.keys(item.options).length
        ? ` (${Object.entries(item.options)
            .map(([label, value]) => `${label}: ${value}`)
            .join(", ")})`
        : ""),
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Demonstração: um gateway real receberia os dados aqui.
    setDone(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="container py-20 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-bronze" />
        <h1 className="mt-6 font-serif text-3xl sm:text-4xl">Pedido recebido com carinho!</h1>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
          Agora começa a parte mais bonita: nossa consultora {site.consultantName} vai te chamar
          no WhatsApp para alinhar cada detalhe da sua peça. Fique de olho no celular 💛
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="whatsapp" size="lg">
            <a
              href={waCheckout(summaryLines, cartTotal)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Adiantar a conversa no WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/loja">Voltar para a loja</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (ready && detailedCart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-3xl">Nada para finalizar ainda</h1>
        <p className="mt-3 text-muted-foreground">
          Escolha suas peças e volte aqui para concluir o pedido.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/loja">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 sm:py-16">
      <h1 className="font-serif text-3xl sm:text-4xl">Finalizar compra</h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="h-4 w-4 text-brand-bronze" />
        Ambiente seguro com certificado SSL
      </p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {/* Dados pessoais */}
          <fieldset className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft">
            <legend className="px-2 font-serif text-xl">Seus dados</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="nome" label="Nome completo" required />
              <Field id="email" label="E-mail" type="email" required />
              <Field id="telefone" label="WhatsApp" type="tel" placeholder="(00) 00000-0000" required />
              <Field id="cpf" label="CPF" placeholder="000.000.000-00" required />
            </div>
          </fieldset>

          {/* Entrega */}
          <fieldset className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft">
            <legend className="px-2 font-serif text-xl">Endereço de entrega</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="cep" label="CEP" placeholder="00000-000" required />
              <Field id="endereco" label="Endereço" required />
              <Field id="numero" label="Número" required />
              <Field id="complemento" label="Complemento" />
              <Field id="bairro" label="Bairro" required />
              <Field id="cidade" label="Cidade" required />
              <Field id="estado" label="Estado" required />
              <Field id="referencia" label="Ponto de referência" />
            </div>
          </fieldset>

          {/* Pagamento */}
          <fieldset className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft">
            <legend className="px-2 font-serif text-xl">Forma de pagamento</legend>
            <div className="mt-4 space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors",
                    payment === method.id
                      ? "border-brand-taupe bg-brand-taupeSoft/25"
                      : "border-brand-sand hover:border-brand-brown",
                  )}
                >
                  <input
                    type="radio"
                    name="pagamento"
                    value={method.id}
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="h-4 w-4 accent-brand-taupe"
                  />
                  <method.icon className="h-5 w-5 text-brand-brown" />
                  <span>
                    <span className="block text-sm text-brand-graphite">{method.label}</span>
                    <span className="block text-xs text-muted-foreground">{method.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Observações da personalização */}
          <fieldset className="rounded-2xl border border-brand-sand bg-white p-6 shadow-soft">
            <legend className="px-2 font-serif text-xl">Detalhes da personalização</legend>
            <p className="mt-2 text-sm text-muted-foreground">
              Conte nomes, datas e inspirações. Nossa consultora confirma tudo com você depois.
            </p>
            <Label htmlFor="observacoes" className="mt-5 block">
              Observações
            </Label>
            <textarea
              id="observacoes"
              name="observacoes"
              rows={4}
              placeholder="Ex.: nome do bebê 'Alice', tons de rosé e dourado, entrega antes de 20/12…"
              className="mt-2 w-full rounded-2xl border border-input bg-white/80 p-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </fieldset>
        </div>

        {/* Resumo */}
        <aside className="h-fit rounded-2xl border border-brand-sand bg-white p-6 shadow-soft lg:sticky lg:top-40">
          <h2 className="font-serif text-xl">Seu pedido</h2>

          <ul className="mt-4 space-y-3 text-sm">
            {detailedCart.map(({ item, product, lineTotal }, index) => (
              <li key={`${product.slug}-${index}`} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {item.quantity}x {product.name}
                </span>
                <span className="shrink-0">{formatPrice(lineTotal)}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-serif text-2xl">{formatPrice(cartTotal)}</span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {installmentLabel(cartTotal)}
          </p>

          <Button type="submit" size="lg" className="mt-6 w-full">
            Concluir pedido
          </Button>
          <Button asChild variant="whatsapp" size="sm" className="mt-2 w-full">
            <a
              href={waCheckout(summaryLines, cartTotal)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Fechar pelo WhatsApp
            </a>
          </Button>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Ao concluir, você concorda com nossa{" "}
            <Link href="/politica-de-privacidade" className="text-brand-taupe underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </aside>
      </form>
    </div>
  );
}

/** Campo de formulário com rótulo acessível. */
function Field({
  id,
  label,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5"
      />
    </div>
  );
}
