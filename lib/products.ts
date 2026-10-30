/**
 * Catálogo do ateliê, baseado nas linhas de produto reais:
 * velas aromáticas, velas devocionais, impressão 3D, batizado e lembrancinhas.
 *
 * Em produção, troque estes dados por uma consulta ao CMS/banco:
 * as funções abaixo (getProductBySlug, listProducts…) são o único
 * ponto de contato das páginas com a origem dos dados.
 */

export type CategorySlug =
  | "velas-aromaticas"
  | "velas-devocionais"
  | "impressao-3d"
  | "batizado"
  | "lembrancinhas";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Preço cheio (de). */
  price: number;
  /** Preço promocional (por), quando houver. */
  salePrice?: number;
  shortDescription: string;
  description: string[];
  /** Itens que acompanham a peça. */
  includes: string[];
  /** Opções de personalização oferecidas ao cliente. */
  options: { label: string; values: string[] }[];
  images: string[];
  featured?: boolean;
  badge?: string;
};

export const categories: Category[] = [
  {
    slug: "velas-aromaticas",
    name: "Velas Aromáticas",
    tagline: "Aroma que aquece a alma",
    description:
      "Velas artesanais em cera vegetal, com pavio de algodão e aromas selecionados. Rótulo personalizado com o nome, a data ou a mensagem que você quiser.",
    image: "/produtos/vela-aromatica-alecrim.svg",
  },
  {
    slug: "velas-devocionais",
    name: "Velas Devocionais",
    tagline: "Rogai por nós",
    description:
      "Velas de fé com imagem de Nossa Senhora, acabamento em glitter e tampa de madeira. Feitas para rezar, presentear e guardar.",
    image: "/produtos/vela-rogai-por-nos.svg",
  },
  {
    slug: "impressao-3d",
    name: "Impressão 3D & Luminárias",
    tagline: "Eternize momentos",
    description:
      "Luminárias personalizadas que revelam a sua foto quando acesas, porta-retratos iluminados e peças 3D exclusivas — do seu pet ao topo do bolo.",
    image: "/produtos/luminaria-personalizada-foto.svg",
  },
  {
    slug: "batizado",
    name: "Batizado & Celebrações",
    tagline: "O dia que a família não esquece",
    description:
      "Kits de batizado com bandeja do Divino Espírito Santo, vela personalizada com o nome da criança e acabamento em dourado.",
    image: "/produtos/kit-batizado-divino.svg",
  },
  {
    slug: "lembrancinhas",
    name: "Lembrancinhas Personalizadas",
    tagline: "Pequenos detalhes, grande carinho",
    description:
      "Mini velas em potinho com rolha, velas de convite para padrinhos e lembranças corporativas — personalizadas com tag, fita e o nome de cada convidado.",
    image: "/produtos/mini-vela-potinho-rolha.svg",
  },
];

export const products: Product[] = [
  // ─── Velas aromáticas ────────────────────────────────────────────
  {
    slug: "vela-aromatica-alecrim",
    name: "Vela Aromática de Alecrim",
    category: "velas-aromaticas",
    price: 54.9,
    salePrice: 44.9,
    featured: true,
    badge: "Mais vendida",
    shortDescription:
      "Vela em cera vegetal com aroma de alecrim, tampa de madeira e laço de juta com flores secas.",
    description: [
      "O aroma que aquece a alma. Feita em pequenos lotes com cera vegetal e pavio de algodão, para queimar limpo e durar mais.",
      "O laço de juta com flores secas é amarrado à mão, uma vela de cada vez.",
    ],
    includes: [
      "Vela em cera vegetal 180g",
      "Tampa de madeira",
      "Laço de juta com flores secas",
      "Rótulo personalizado",
    ],
    options: [
      { label: "Aroma", values: ["Alecrim", "Lavanda", "Capim-limão", "Flor de laranjeira"] },
      { label: "Tamanho", values: ["120g", "180g", "250g"] },
      { label: "Acabamento", values: ["Juta com flores secas", "Fita de cetim", "Sem laço"] },
    ],
    images: [
      "/produtos/vela-aromatica-alecrim.svg",
      "/produtos/vela-aromatica-alecrim-2.svg",
      "/produtos/vela-aromatica-alecrim-3.svg",
    ],
  },
  {
    slug: "vela-candle-200g",
    name: "Vela Candle 200g Personalizada",
    category: "velas-aromaticas",
    price: 64.9,
    featured: true,
    shortDescription:
      "Pote de vidro branco com rótulo minimalista: escolha o aroma e a mensagem impressa.",
    description: [
      "A clássica da casa. Vidro fosco branco, rótulo limpo e um aroma que ocupa o ambiente sem pesar.",
      "Ideal para presentear: escreva o nome de quem vai receber direto no rótulo.",
    ],
    includes: ["Vela em cera vegetal 200g", "Pote de vidro fosco", "Rótulo com nome ou mensagem"],
    options: [
      { label: "Aroma", values: ["Lavanda", "Baunilha", "Madeira & âmbar", "Algodão"] },
      { label: "Cor do rótulo", values: ["Branco", "Creme", "Preto"] },
    ],
    images: ["/produtos/vela-candle-200g.svg", "/produtos/vela-candle-200g-2.svg"],
  },
  {
    slug: "kit-tres-velas-aromaticas",
    name: "Kit com 3 Velas Aromáticas",
    category: "velas-aromaticas",
    price: 149.9,
    salePrice: 129.9,
    badge: "Promoção",
    shortDescription:
      "Trio de velas em aromas combinados, em caixa de presente pronta para entregar.",
    description: [
      "Três aromas que conversam entre si, escolhidos por você, numa caixa de presente com cartão escrito à mão.",
    ],
    includes: ["3 velas de 120g", "Caixa de presente", "Cartão personalizado"],
    options: [
      {
        label: "Combinação",
        values: ["Relaxar (lavanda, alecrim, camomila)", "Aconchego (baunilha, âmbar, canela)", "Escolher cada aroma"],
      },
      { label: "Cartão", values: ["Com mensagem", "Sem mensagem"] },
    ],
    images: ["/produtos/kit-tres-velas-aromaticas.svg"],
  },

  // ─── Velas devocionais ───────────────────────────────────────────
  {
    slug: "vela-rogai-por-nos",
    name: "Vela Rogai por Nós — Nossa Senhora",
    category: "velas-devocionais",
    price: 79.9,
    salePrice: 69.9,
    featured: true,
    badge: "Mais amada",
    shortDescription:
      "Vela devocional com imagem de Nossa Senhora, glitter azul suspenso e tampa de madeira.",
    description: [
      "Uma vela para rezar. A imagem de Nossa Senhora fica suspensa no gel com glitter, e a inscrição “Rogai por nós” é aplicada à mão.",
      "Acende, reza, e a luz atravessa o brilho — é bonito de ver.",
    ],
    includes: [
      "Vela decorativa em gel com imagem",
      "Tampa de madeira",
      "Laço de cetim",
      "Inscrição “Rogai por nós”",
    ],
    options: [
      { label: "Cor do glitter", values: ["Azul", "Dourado", "Prata", "Branco"] },
      { label: "Imagem", values: ["Nossa Senhora Aparecida", "Nossa Senhora de Fátima", "Sagrado Coração"] },
      { label: "Laço", values: ["Azul", "Dourado", "Branco", "Sem laço"] },
    ],
    images: [
      "/produtos/vela-rogai-por-nos.svg",
      "/produtos/vela-rogai-por-nos-2.svg",
      "/produtos/vela-rogai-por-nos-3.svg",
    ],
  },
  {
    slug: "kit-devocional-nossa-senhora",
    name: "Kit Devocional Nossa Senhora",
    category: "velas-devocionais",
    price: 139.9,
    salePrice: 119.9,
    shortDescription:
      "Bandeja de madeira, imagem de Nossa Senhora em resina e vela devocional personalizada.",
    description: [
      "Um cantinho de oração pronto para montar em casa: bandeja de madeira com nome gravado, imagem em resina e a vela devocional combinando.",
    ],
    includes: [
      "Bandeja de madeira com nome gravado",
      "Imagem de Nossa Senhora em resina",
      "Vela devocional com glitter",
    ],
    options: [
      { label: "Nome na bandeja", values: ["Gravado a laser", "Sem gravação"] },
      { label: "Cor do glitter", values: ["Azul", "Dourado", "Branco"] },
    ],
    images: ["/produtos/kit-devocional-nossa-senhora.svg", "/produtos/kit-devocional-nossa-senhora-2.svg"],
  },
  {
    slug: "vela-devocional-terco",
    name: "Vela Devocional com Terço",
    category: "velas-devocionais",
    price: 94.9,
    shortDescription:
      "Vela devocional acompanhada de terço em um estojo de presente — para primeira comunhão e crisma.",
    description: [
      "Pensada para presentear em primeira comunhão, crisma ou aniversário de quem tem fé. O terço vai num saquinho de organza, ao lado da vela.",
    ],
    includes: ["Vela devocional", "Terço em saquinho de organza", "Caixa de presente", "Cartão"],
    options: [
      { label: "Terço", values: ["Madeira", "Pérola", "Cristal"] },
      { label: "Cor do glitter", values: ["Azul", "Dourado", "Branco"] },
    ],
    images: ["/produtos/vela-devocional-terco.svg"],
  },

  // ─── Impressão 3D ────────────────────────────────────────────────
  {
    slug: "luminaria-personalizada-foto",
    name: "Luminária Personalizada com Foto",
    category: "impressao-3d",
    price: 169.9,
    salePrice: 139.9,
    featured: true,
    badge: "Eternize momentos",
    shortDescription:
      "Sua foto impressa em 3D: apagada parece um quadro branco; acesa, revela a imagem em detalhes.",
    description: [
      "A técnica se chama litofania: imprimimos a sua foto em camadas finíssimas, e a luz atravessa revelando cada detalhe.",
      "Desligada, é um objeto discreto na estante. Ligada, é a sua memória preferida acesa na parede.",
      "Envie a foto pelo WhatsApp depois da compra — quanto melhor a iluminação e o contraste, mais bonito fica o resultado.",
    ],
    includes: [
      "Luminária em impressão 3D com a sua foto",
      "Base com LED e cabo USB",
      "Moldura na cor escolhida",
    ],
    options: [
      { label: "Tamanho", values: ["15x15cm", "20x20cm", "20x25cm"] },
      { label: "Cor da moldura", values: ["Preto", "Branco", "Madeira"] },
      { label: "Luz", values: ["Branco quente", "Branco neutro"] },
    ],
    images: [
      "/produtos/luminaria-personalizada-foto.svg",
      "/produtos/luminaria-personalizada-foto-2.svg",
      "/produtos/luminaria-personalizada-foto-3.svg",
    ],
  },
  {
    slug: "porta-retrato-luminaria",
    name: "Porta-Retrato Luminária",
    category: "impressao-3d",
    price: 129.9,
    featured: true,
    shortDescription:
      "Versão de mesa da luminária, com base inclinada — perfeita para o criado-mudo ou a escrivaninha.",
    description: [
      "Mesmo efeito da luminária de foto, em formato de porta-retrato para apoiar em qualquer cantinho da casa.",
      "Um presente certeiro para Dia das Mães, aniversários e bodas.",
    ],
    includes: ["Porta-retrato em impressão 3D", "Base iluminada com LED", "Cabo USB"],
    options: [
      { label: "Tamanho", values: ["13x18cm", "15x20cm"] },
      { label: "Cor da base", values: ["Preto", "Branco", "Madeira"] },
    ],
    images: ["/produtos/porta-retrato-luminaria.svg", "/produtos/porta-retrato-luminaria-2.svg"],
  },
  {
    slug: "luminaria-3d-pet",
    name: "Luminária 3D do seu Pet",
    category: "impressao-3d",
    price: 159.9,
    shortDescription:
      "Modelamos o seu pet em 3D sobre uma base com o nome dele em relevo.",
    description: [
      "Mandamos o modelo para a sua aprovação antes de imprimir — orelha, focinho, manchinha, tudo conferido.",
      "A base leva o nome do pet em relevo e pode acender, se você quiser.",
    ],
    includes: ["Peça 3D do pet", "Base com nome em relevo", "Iluminação LED opcional"],
    options: [
      { label: "Cor da peça", values: ["Preto", "Branco", "Caramelo", "Cinza"] },
      { label: "Base", values: ["Com luz LED", "Sem luz"] },
      { label: "Tamanho", values: ["12cm", "16cm", "20cm"] },
    ],
    images: ["/produtos/luminaria-3d-pet.svg", "/produtos/luminaria-3d-pet-2.svg"],
  },
  {
    slug: "peca-3d-personalizada",
    name: "Peça 3D Personalizada",
    category: "impressao-3d",
    price: 89.9,
    shortDescription:
      "Topo de bolo, letreiro, troféu ou aquela ideia que só existe na sua cabeça — modelamos e imprimimos.",
    description: [
      "Tem uma ideia que não existe pronta em lugar nenhum? Conte para a gente. Modelamos em 3D, mostramos o preview e imprimimos.",
      "O orçamento final depende do tamanho e da complexidade — a consultora confirma antes de começar.",
    ],
    includes: ["Modelagem 3D com preview para aprovação", "Peça impressa e acabada"],
    options: [
      { label: "Tipo de peça", values: ["Topo de bolo", "Letreiro / nome", "Troféu", "Outro projeto"] },
      { label: "Cor do filamento", values: ["Branco", "Preto", "Dourado", "Rosé", "Combinar"] },
    ],
    images: ["/produtos/peca-3d-personalizada.svg"],
  },

  // ─── Batizado ────────────────────────────────────────────────────
  {
    slug: "kit-batizado-divino",
    name: "Kit Batizado Divino Espírito Santo",
    category: "batizado",
    price: 199.9,
    salePrice: 169.9,
    featured: true,
    badge: "Promoção",
    shortDescription:
      "Bandeja com Divino Espírito Santo em resina, raios dourados e vela com o nome da criança.",
    description: [
      "O kit que leva o nome do seu bebê para o altar. A bandeja é montada peça por peça: o Divino em resina, os raios dourados aplicados um a um e o nome em letra dourada.",
      "A vela personalizada combina com a bandeja e vira lembrança do dia.",
    ],
    includes: [
      "Bandeja decorada com Divino Espírito Santo",
      "Raios em dourado",
      "Nome da criança aplicado",
      "Vela de batizado personalizada",
    ],
    options: [
      { label: "Cor da bandeja", values: ["Branco", "Off-white", "Rosé", "Azul sereno"] },
      { label: "Acabamento", values: ["Dourado", "Prata", "Rosé"] },
      { label: "Fonte do nome", values: ["Script", "Serifada"] },
    ],
    images: [
      "/produtos/kit-batizado-divino.svg",
      "/produtos/kit-batizado-divino-2.svg",
      "/produtos/kit-batizado-divino-3.svg",
    ],
  },
  {
    slug: "vela-batizado-personalizada",
    name: "Vela de Batizado Personalizada",
    category: "batizado",
    price: 49.9,
    shortDescription:
      "Vela com o nome da criança e a data do batizado, com tampa e acabamento dourado.",
    description: [
      "A vela que acende na cerimônia e depois fica guardada na estante, com o nome e a data que ninguém quer esquecer.",
    ],
    includes: ["Vela em cera vegetal", "Nome e data aplicados", "Tampa com acabamento dourado"],
    options: [
      { label: "Acabamento", values: ["Dourado", "Prata", "Rosé"] },
      { label: "Aroma", values: ["Sem aroma", "Algodão", "Baunilha"] },
    ],
    images: ["/produtos/vela-batizado-personalizada.svg"],
  },
  {
    slug: "bandeja-divino-espirito-santo",
    name: "Bandeja Divino Espírito Santo",
    category: "batizado",
    price: 139.9,
    shortDescription:
      "A bandeja decorada vendida separadamente, para quem já tem a vela ou quer montar o próprio kit.",
    description: [
      "Mesma bandeja do kit completo, para você compor com as peças que já tem ou presentear os padrinhos.",
    ],
    includes: ["Bandeja decorada", "Divino Espírito Santo em resina", "Raios dourados", "Nome aplicado"],
    options: [
      { label: "Cor da bandeja", values: ["Branco", "Off-white", "Rosé", "Azul sereno"] },
      { label: "Acabamento", values: ["Dourado", "Prata"] },
    ],
    images: ["/produtos/bandeja-divino-espirito-santo.svg"],
  },

  // ─── Lembrancinhas ───────────────────────────────────────────────
  {
    slug: "mini-vela-potinho-rolha",
    name: "Mini Vela em Potinho com Rolha",
    category: "lembrancinhas",
    price: 14.9,
    salePrice: 11.9,
    featured: true,
    badge: "A partir de 20 un.",
    shortDescription:
      "Potinho de vidro com rolha, flores secas e tag personalizada com o nome de cada convidado.",
    description: [
      "A lembrancinha que todo mundo leva para casa e usa de verdade. Potinho de vidro, rolha de cortiça, flor seca amarrada com juta.",
      "A tag vai com o nome, a data e a mensagem da sua celebração. Pedido mínimo de 20 unidades.",
    ],
    includes: ["Mini vela em potinho de vidro", "Rolha de cortiça", "Flor seca com juta", "Tag personalizada"],
    options: [
      { label: "Ocasião", values: ["Batizado", "Casamento", "Chá de bebê", "Aniversário", "Corporativo"] },
      { label: "Aroma", values: ["Algodão", "Lavanda", "Baunilha", "Sem aroma"] },
      { label: "Quantidade mínima", values: ["20 unidades", "30 unidades", "50 unidades", "100 unidades"] },
    ],
    images: [
      "/produtos/mini-vela-potinho-rolha.svg",
      "/produtos/mini-vela-potinho-rolha-2.svg",
      "/produtos/mini-vela-potinho-rolha-3.svg",
    ],
  },
  {
    slug: "vela-convite-padrinhos",
    name: "Vela Convite de Padrinhos",
    category: "lembrancinhas",
    price: 39.9,
    salePrice: 34.9,
    shortDescription:
      "Vela com a inscrição “Padrinhos”, tampa de madeira e laço de juta — o convite em forma de presente.",
    description: [
      "Em vez de um cartão, uma vela. A inscrição “Padrinhos” vai aplicada na tampa de madeira, com o nome do casal ou da criança.",
    ],
    includes: ["Vela em cera vegetal", "Tampa de madeira com inscrição", "Laço de juta com flor seca"],
    options: [
      { label: "Inscrição", values: ["Padrinhos", "Madrinha", "Padrinho", "Texto personalizado"] },
      { label: "Aroma", values: ["Algodão", "Alecrim", "Baunilha"] },
    ],
    images: ["/produtos/vela-convite-padrinhos.svg", "/produtos/vela-convite-padrinhos-2.svg"],
  },
  {
    slug: "lembrancinha-corporativa",
    name: "Lembrancinha Corporativa Personalizada",
    category: "lembrancinhas",
    price: 17.9,
    shortDescription:
      "Velas com a marca da sua empresa e tag com mensagem — para datas comemorativas e brindes de equipe.",
    description: [
      "Dia do Vendedor, Dia da Mulher, confraternização de fim de ano: montamos o brinde com a identidade da sua empresa.",
      "Aplicamos logo, cores e mensagem na tag. Orçamento por volume — chame a consultora.",
    ],
    includes: ["Mini vela personalizada", "Tag com logo e mensagem", "Embalagem individual"],
    options: [
      { label: "Ocasião", values: ["Dia do Vendedor", "Dia da Mulher", "Fim de ano", "Outra data"] },
      { label: "Quantidade mínima", values: ["30 unidades", "50 unidades", "100 unidades", "200 unidades"] },
    ],
    images: ["/produtos/lembrancinha-corporativa.svg"],
  },
];

// ─── Helpers de consulta ─────────────────────────────────────────────

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function listProducts(category?: string) {
  return category ? products.filter((p) => p.category === category) : products;
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

/** Produtos com preço promocional, para a seção "Promoções imperdíveis". */
export function onSaleProducts() {
  return products.filter((p) => p.salePrice && p.salePrice < p.price);
}

/** Até 4 peças da mesma categoria, excluindo a atual. */
export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export function categoryName(slug: CategorySlug) {
  return getCategory(slug)?.name ?? "";
}

/** Busca simples por nome, descrição curta e categoria. */
export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.shortDescription, categoryName(p.category)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
