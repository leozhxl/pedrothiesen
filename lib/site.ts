/**
 * Configuração central da marca.
 * Os valores caem para um padrão de exemplo quando a env não existe,
 * então o site roda mesmo antes de preencher o .env.local.
 */
export const site = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Pethi | Velas & Personalizados",
  shortName: "Pethi",
  tagline: "Velas • Impressão 3D • Personalizados",
  slogan: "Criamos presentes com propósito.",
  description:
    "Ateliê de velas artesanais, impressão 3D e presentes personalizados em Sombrio/SC. Velas aromáticas e devocionais, luminárias com foto, kits de batizado e lembrancinhas. Feito com carinho em cada detalhe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pethiatelie.com.br",

  // ─── Atendimento ───────────────────────────────────────────────
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5500000000000",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(00) 00000-0000",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contato@pethiatelie.com.br",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "pethiatelie",
  city: "Sombrio/SC",
  openingHours: "Segunda a sexta, 9h às 18h · Sábado, 9h às 13h",
  consultantName: "Pethi",

  // ─── Regras comerciais ─────────────────────────────────────────
  productionDays: 15, // dias úteis
  installments: 3, // parcelas sem juros
  announcement:
    "Presentes com propósito, feitos à mão ❤️ Enviamos para todo o Brasil",

  /** Os três pilares que aparecem na bio do Instagram. */
  pillars: [
    "Criamos presentes com propósito",
    "Velas • Impressão 3D • Personalizados",
    "Feito com carinho em cada detalhe",
  ],
} as const;

/** Links do menu principal. */
export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/loja" },
  { label: "Velas", href: "/categoria/velas-aromaticas" },
  { label: "Devocionais", href: "/categoria/velas-devocionais" },
  { label: "Impressão 3D", href: "/categoria/impressao-3d" },
  { label: "Batizado", href: "/categoria/batizado" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

/** Links institucionais e de apoio exibidos no rodapé. */
export const footerNav = {
  loja: [
    { label: "Todos os produtos", href: "/loja" },
    { label: "Velas Aromáticas", href: "/categoria/velas-aromaticas" },
    { label: "Velas Devocionais", href: "/categoria/velas-devocionais" },
    { label: "Impressão 3D & Luminárias", href: "/categoria/impressao-3d" },
    { label: "Batizado & Celebrações", href: "/categoria/batizado" },
    { label: "Lembrancinhas", href: "/categoria/lembrancinhas" },
  ],
  conta: [
    { label: "Minha conta", href: "/conta" },
    { label: "Lista de desejos", href: "/favoritos" },
    { label: "Carrinho", href: "/carrinho" },
    { label: "Rastrear meu pedido", href: "/rastreio" },
  ],
  institucional: [
    { label: "Sobre o Ateliê", href: "/sobre" },
    { label: "Fale Conosco", href: "/contato" },
    { label: "Formas de Entrega", href: "/formas-de-entrega" },
    { label: "Trocas e Devoluções", href: "/trocas-e-devolucoes" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  ],
} as const;
