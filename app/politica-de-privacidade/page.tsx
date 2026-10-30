import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como coletamos, usamos e protegemos seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LGPD"
      title="Política de Privacidade"
      intro="Seus dados são tratados com o mesmo cuidado que damos às nossas peças. Aqui explicamos, sem juridiquês, o que coletamos e por quê."
      updatedAt="28 de outubro de 2026"
    >
      <section>
        <h2>1. Quem somos</h2>
        <p>
          O {site.name} é o controlador dos dados pessoais coletados neste site. Para qualquer
          assunto relacionado à privacidade, fale com a gente em{" "}
          <strong>{site.email}</strong>.
        </p>
      </section>

      <section>
        <h2>2. Quais dados coletamos</h2>
        <ul>
          <li>
            <strong>Dados de contato:</strong> nome, e-mail e telefone/WhatsApp, informados por
            você nos formulários.
          </li>
          <li>
            <strong>Dados de entrega e cobrança:</strong> endereço completo e CPF, necessários
            para emitir a nota e enviar o pedido.
          </li>
          <li>
            <strong>Dados do pedido:</strong> peças escolhidas, opções de personalização e
            observações.
          </li>
          <li>
            <strong>Dados de navegação:</strong> páginas visitadas e preferências salvas no seu
            navegador (carrinho e lista de desejos).
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Para que usamos</h2>
        <ul>
          <li>Produzir e entregar o seu pedido personalizado.</li>
          <li>Entrar em contato pelo WhatsApp para alinhar os detalhes da peça.</li>
          <li>Emitir documentos fiscais e cumprir obrigações legais.</li>
          <li>Melhorar a experiência da loja e, com seu consentimento, enviar novidades.</li>
        </ul>
      </section>

      <section>
        <h2>4. Com quem compartilhamos</h2>
        <p>
          Apenas com quem é indispensável para a compra acontecer: meios de pagamento,
          transportadoras e Correios, e serviços de hospedagem do site. Não vendemos nem cedemos
          seus dados para fins publicitários de terceiros.
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Usamos cookies e armazenamento local para lembrar o que você colocou no carrinho e na
          lista de desejos, além de medir o desempenho das páginas. Você pode aceitar apenas os
          essenciais no aviso exibido na primeira visita, ou limpar os dados pelo seu navegador a
          qualquer momento.
        </p>
      </section>

      <section>
        <h2>6. Por quanto tempo guardamos</h2>
        <p>
          Dados de pedidos são mantidos pelo prazo exigido pela legislação fiscal (cinco anos).
          Dados de contato usados apenas para atendimento são apagados quando você pedir.
        </p>
      </section>

      <section>
        <h2>7. Seus direitos</h2>
        <p>
          A LGPD garante a você o direito de confirmar o tratamento, acessar, corrigir,
          anonimizar, portar ou eliminar seus dados, além de revogar o consentimento. Para
          exercer qualquer um deles, escreva para <strong>{site.email}</strong>. Respondemos em
          até 15 dias.
        </p>
      </section>

      <section>
        <h2>8. Segurança</h2>
        <p>
          O site usa conexão criptografada (certificado SSL) e o acesso aos dados é restrito às
          pessoas envolvidas no atendimento e na produção do seu pedido.
        </p>
      </section>

      <section>
        <h2>9. Alterações nesta política</h2>
        <p>
          Se mudarmos algo relevante, atualizamos a data no topo desta página e, quando
          necessário, avisamos pelos nossos canais.
        </p>
      </section>
    </LegalPage>
  );
}
