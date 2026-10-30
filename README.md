# Pethi | Velas & Personalizados — Loja Virtual

> _Criamos presentes com propósito._

Loja virtual completa para o ateliê **@pethiatelie** (Sombrio/SC): velas aromáticas e
devocionais, impressão 3D e luminárias personalizadas, kits de batizado e
lembrancinhas. Estética de luxo delicado (creme, rosé e dourado champagne),
mobile-first e com integração forte com WhatsApp.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3** com paleta e tipografia da marca
- **shadcn/ui** (Radix UI + CVA) para os componentes base
- **lucide-react** para ícones
- **pnpm** como gerenciador de pacotes

---

## Como rodar

```bash
# 1. Instale as dependências
pnpm install

# 2. Copie as variáveis de ambiente e preencha seus dados
cp .env.example .env.local

# 3. Suba o servidor de desenvolvimento
pnpm dev
```

Abra **http://localhost:3000**.

> O site funciona mesmo sem o `.env.local`: `lib/site.ts` tem valores de exemplo para
> todos os campos. Mas preencha antes de publicar — é de lá que saem os links de
> WhatsApp, telefone e e-mail.

### Outros comandos

| Comando          | O que faz                                 |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Servidor de desenvolvimento               |
| `pnpm build`     | Build de produção                         |
| `pnpm start`     | Roda o build de produção                  |
| `pnpm lint`      | ESLint (regras do Next)                   |
| `pnpm typecheck` | Checagem de tipos sem gerar build         |

---

## Preencher os dados da marca

Edite o `.env.local` (criado a partir do `.env.example`):

```env
NEXT_PUBLIC_BRAND_NAME="Pethi | Velas & Personalizados"
NEXT_PUBLIC_WHATSAPP="5511999999999"     # só dígitos, com DDI 55
NEXT_PUBLIC_PHONE_DISPLAY="(11) 99999-9999"
NEXT_PUBLIC_EMAIL="contato@pethiatelie.com.br"
NEXT_PUBLIC_INSTAGRAM="pethiatelie"
NEXT_PUBLIC_SITE_URL="https://pethiatelie.com.br"
```

O que **não** vem de env (cidade, horário de atendimento, prazo de produção,
parcelamento, slogan, pilares da bio, aviso da barra do topo) fica em [`lib/site.ts`](lib/site.ts) — tudo em um
único objeto, fácil de ajustar.

---

## Estrutura do projeto

```
app/
├── layout.tsx                  → layout raiz, fontes, SEO e providers
├── globals.css                 → tokens de cor e classes da marca
├── page.tsx                    → Home
├── loja/                       → catálogo com filtros (estado na URL)
├── categoria/[slug]/           → páginas de categoria
├── produto/[slug]/             → página de produto + JSON-LD
├── carrinho/ · checkout/       → compra
├── favoritos/                  → lista de desejos
├── conta/ · rastreio/          → área do cliente
├── sobre/ · contato/           → institucional
├── politica-de-privacidade/
├── formas-de-entrega/
├── trocas-e-devolucoes/
├── sitemap.ts · robots.ts      → SEO técnico
└── not-found.tsx

components/
├── ui/        → shadcn (button, card, input, label, badge, separator, accordion)
├── layout/    → top-bar, header, footer, whatsapp flutuante, cookies, legal, contato
├── home/      → carrossel, selos, categorias, seções de produto, passo a passo, sobre
├── product/   → card, grade, galeria, painel de compra
└── shop/      → busca e filtros

lib/
├── site.ts     → dados da marca e menus
├── filters.ts  → faixas de preço e ordenação (lido no servidor e no cliente)
├── products.ts → catálogo + helpers de consulta
├── format.ts   → preço em BRL, parcelamento, desconto
├── whatsapp.ts → geração das mensagens de wa.me
├── store.tsx   → carrinho e wishlist (Context + localStorage)
└── utils.ts    → cn() e slugify()

public/
├── produtos/   → fotos dos produtos
└── banners/    → banners da home
```

---

## Decisões que valem saber

**Catálogo em arquivo.** Os produtos vivem em `lib/products.ts`. Toda a aplicação
consulta esses dados pelas funções `getProductBySlug`, `listProducts`,
`featuredProducts`, `onSaleProducts` e `searchProducts` — então, para plugar um CMS ou
banco de dados, basta reescrever essas funções sem tocar nas páginas.

**Carrinho e wishlist no navegador.** `lib/store.tsx` é um Context que persiste em
`localStorage`, sem dependência externa. A mesma peça com personalizações diferentes
conta como item separado no carrinho.

**Filtros na URL.** `/loja?categoria=…&preco=…&ordem=…&busca=…` — o filtro é
compartilhável, indexável e sobrevive ao recarregamento.

**Checkout é front-end.** O formulário valida e confirma o pedido na tela, mas não há
gateway conectado. Para integrar (Mercado Pago, Pagar.me, Stripe), crie uma rota em
`app/api/` e chame-a no `handleSubmit` de [`app/checkout/page.tsx`](app/checkout/page.tsx).
Os campos de ambiente já estão comentados no `.env.example`.

**Área do cliente é front-end.** `app/conta/page.tsx` tem as telas de login e cadastro
prontas; o `handleSubmit` espera a sua autenticação (NextAuth, Clerk, Supabase…).

**WhatsApp em todo lugar.** `lib/whatsapp.ts` centraliza as mensagens: CTA geral, CTA de
produto (já com nome e preço) e resumo do carrinho no checkout.

---

## SEO

- Títulos e descrições por página, com template no `layout.tsx`.
- Palavras-chave trabalhadas no texto: _velas personalizadas_, _luminária personalizada
  com foto_, _vela devocional Nossa Senhora_, _kit de batizado personalizado_,
  _lembrancinhas de batizado_.
- `sitemap.xml` e `robots.txt` gerados a partir do catálogo.
- JSON-LD de `Product` (preço, moeda e disponibilidade) na página de produto.
- Open Graph configurado para compartilhamento no Instagram e WhatsApp.

---

## Acessibilidade

- Link "Ir para o conteúdo" no topo.
- Todos os botões de ícone têm `aria-label`; filtros e abas usam `aria-pressed` /
  `aria-selected`.
- Contraste de texto em cinza-grafite (`#3A3537`), nunca preto puro.
- `prefers-reduced-motion` respeitado no `globals.css`.

---

## Antes de publicar

- [ ] Preencher o `.env.local` com WhatsApp, telefone, e-mail e Instagram reais
- [ ] Substituir os placeholders de `public/` pelas fotos reais (veja [`public/README.md`](public/README.md))
- [ ] Revisar preços, prazos e textos em `lib/products.ts` e `lib/site.ts`
- [ ] Integrar o gateway de pagamento e a autenticação
- [ ] Conferir as páginas institucionais com o seu contador/jurídico
- [ ] Rodar `pnpm build` e validar com o Lighthouse no mobile

---

## Deploy

O caminho mais curto é a [Vercel](https://vercel.com): importe o repositório, cadastre
as variáveis `NEXT_PUBLIC_*` em _Settings → Environment Variables_ e publique. O
projeto também roda em qualquer host com Node 18+ via `pnpm build && pnpm start`.
