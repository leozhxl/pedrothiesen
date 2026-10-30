import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trocas e Devoluções",
  description:
    "Política de trocas e devoluções de produtos artesanais personalizados: prazos, condições e como solicitar.",
  alternates: { canonical: "/trocas-e-devolucoes" },
};

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="Garantia"
      title="Trocas e Devoluções"
      intro="Queremos que você receba sua peça e se encante. Se algo não saiu como combinado, a gente resolve."
      updatedAt="28 de outubro de 2026"
    >
      <section>
        <h2>1. Direito de arrependimento</h2>
        <p>
          Conforme o Código de Defesa do Consumidor (art. 49), você pode desistir da compra em
          até <strong>7 dias corridos</strong> após o recebimento.
        </p>
        <p>
          Atenção a um ponto importante: peças <strong>personalizadas</strong> — com nome, data,
          bordado, cores escolhidas por você ou qualquer customização exclusiva — são produzidas
          sob medida e, por isso, não podem ser revendidas. Nesses casos, o cancelamento após o
          início da produção pode gerar retenção dos custos de material e mão de obra já
          empregados. A consultora informa o valor exato antes de qualquer decisão.
        </p>
      </section>

      <section>
        <h2>2. Produto com defeito ou avaria</h2>
        <p>
          Se a peça chegar danificada ou com algum defeito de fabricação, avise em até{" "}
          <strong>7 dias</strong> do recebimento, com fotos. Nós assumimos o frete e:
        </p>
        <ul>
          <li>consertamos a peça, quando possível;</li>
          <li>refazemos a peça do zero; ou</li>
          <li>devolvemos integralmente o valor pago, se você preferir.</li>
        </ul>
      </section>

      <section>
        <h2>3. Peça diferente do combinado</h2>
        <p>
          Se recebemos um nome errado, uma cor trocada ou qualquer divergência em relação ao que
          foi aprovado na conversa com a consultora, refazemos sem custo nenhum para você. Toda a
          personalização é confirmada por escrito no WhatsApp justamente para isso.
        </p>
      </section>

      <section>
        <h2>4. O que não aceitamos</h2>
        <ul>
          <li>Peças usadas, lavadas, montadas em cerimônia ou com marcas de uso.</li>
          <li>
            Pequenas variações naturais de tom, textura ou acabamento. Produto artesanal nunca é
            idêntico a outro — é exatamente isso que o torna único.
          </li>
          <li>Divergências de cor causadas pela calibração da tela do seu dispositivo.</li>
          <li>Solicitações feitas após 7 dias do recebimento, salvo defeito oculto.</li>
        </ul>
      </section>

      <section>
        <h2>5. Como solicitar</h2>
        <ul>
          <li>
            Chame a consultora no WhatsApp ou escreva para <strong>{site.email}</strong>.
          </li>
          <li>Informe o número do pedido e descreva o que aconteceu.</li>
          <li>Anexe fotos do produto e da embalagem, se houver avaria.</li>
          <li>
            Aguarde nossa análise em até <strong>2 dias úteis</strong>: respondemos com as
            instruções de postagem ou com a solução proposta.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Reembolso</h2>
        <p>
          Aprovada a devolução e recebida a peça no ateliê, o reembolso é processado em até{" "}
          <strong>10 dias úteis</strong>. No Pix e no boleto, devolvemos na conta indicada por
          você. No cartão de crédito, o estorno aparece na fatura conforme o prazo da
          administradora.
        </p>
      </section>

      <section>
        <h2>7. Uma conversa antes de tudo</h2>
        <p>
          Antes de qualquer processo formal, fale com a gente. Na grande maioria dos casos
          resolvemos na conversa — com um ajuste, um reenvio ou um detalhe refeito à mão.
        </p>
      </section>
    </LegalPage>
  );
}
