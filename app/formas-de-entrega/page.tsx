import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Formas de Entrega",
  description:
    "Prazos de produção e envio, transportadoras, rastreio e retirada. Enviamos peças artesanais personalizadas para todo o Brasil.",
  alternates: { canonical: "/formas-de-entrega" },
};

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Entrega"
      title="Formas de Entrega"
      intro="Sua peça é feita à mão e viaja protegida. Entenda como contamos os prazos e quais opções de envio oferecemos."
      updatedAt="28 de outubro de 2026"
    >
      <section>
        <h2>1. Prazo de produção</h2>
        <p>
          Todas as peças são produzidas após a sua compra, sob medida. O prazo de produção é de{" "}
          <strong>{site.productionDays} dias úteis</strong>, contados a partir da confirmação do
          pagamento <em>e</em> do fechamento dos detalhes da personalização com a nossa
          consultora — o que acontecer por último.
        </p>
        <p>
          Quanto mais rápido você responder às perguntas da consultora (nomes, cores, datas),
          mais cedo a produção começa.
        </p>
      </section>

      <section>
        <h2>2. Prazo de entrega</h2>
        <p>
          O tempo de transporte é somado ao prazo de produção e varia conforme a sua região:
        </p>
        <ul>
          <li>
            <strong>Sudeste:</strong> 2 a 5 dias úteis
          </li>
          <li>
            <strong>Sul e Centro-Oeste:</strong> 3 a 7 dias úteis
          </li>
          <li>
            <strong>Nordeste:</strong> 5 a 10 dias úteis
          </li>
          <li>
            <strong>Norte:</strong> 7 a 15 dias úteis
          </li>
        </ul>
        <p>
          O prazo exato aparece no checkout, depois que você informa o CEP.
        </p>
      </section>

      <section>
        <h2>3. Transportadoras</h2>
        <ul>
          <li>
            <strong>Correios (PAC e SEDEX):</strong> cobertura nacional, com rastreio.
          </li>
          <li>
            <strong>Transportadoras parceiras:</strong> usadas para kits de batizado e
            luminárias, que pedem embalagem rígida.
          </li>
          <li>
            <strong>Entrega local e retirada:</strong> combinadas diretamente com a consultora
            para {site.city} e região.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Frete</h2>
        <p>
          O valor é calculado automaticamente no checkout pelo CEP, considerando peso e dimensões
          da embalagem. Em campanhas promocionais, podemos oferecer frete fixo ou grátis — nesses
          casos, a condição aparece na própria página do produto.
        </p>
      </section>

      <section>
        <h2>5. Rastreio</h2>
        <p>
          Assim que o pedido é postado, enviamos o código de rastreio por e-mail e WhatsApp. Você
          também pode consultar o andamento na página de{" "}
          <strong>rastreamento de pedido</strong> do site.
        </p>
      </section>

      <section>
        <h2>6. Embalagem</h2>
        <p>
          Cada peça é conferida item por item, protegida com papel de seda, plástico-bolha e caixa
          rígida. Se o pedido for presente, podemos incluir um cartão escrito à mão — basta pedir
          à consultora.
        </p>
      </section>

      <section>
        <h2>7. Ausência no recebimento</h2>
        <p>
          Se ninguém estiver no endereço, a transportadora tenta a entrega novamente ou deixa o
          aviso para retirada na agência. Depois do prazo de guarda, o pedido retorna ao ateliê e
          um novo frete será necessário para reenvio.
        </p>
      </section>

      <section>
        <h2>8. Datas comemorativas</h2>
        <p>
          Tem uma data marcada? Avise antes de comprar. Nossa consultora confere a agenda do
          ateliê e confirma se dá tempo — às vezes conseguimos encaixar produções urgentes.
        </p>
      </section>
    </LegalPage>
  );
}
