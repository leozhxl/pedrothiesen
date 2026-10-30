# Assets da loja

As imagens que acompanham o projeto são **placeholders em SVG**, gerados para o site
rodar e ficar apresentável antes das fotos reais. Substitua cada arquivo mantendo o
mesmo nome (ou atualize os caminhos em `lib/products.ts`).

## Estrutura

```
public/
├── produtos/   → fotos dos produtos (uma ou mais por peça)
└── banners/    → imagens do carrossel da home e do bloco "Sobre"
```

## Especificações recomendadas

| Uso                        | Proporção | Tamanho sugerido | Formato        |
| -------------------------- | --------- | ---------------- | -------------- |
| Foto de produto            | 4:5       | 1200 × 1500 px   | `.webp` / `.jpg` |
| Banner do carrossel        | 16:9      | 1920 × 1080 px   | `.webp` / `.jpg` |
| Bloco "Sobre o Ateliê"     | 5:4       | 1600 × 1280 px   | `.webp` / `.jpg` |

## Dicas para as fotos

- Luz natural, fundo clean (off-white, linho ou madeira clara).
- Enquadre a peça inteira na primeira foto e os detalhes nas seguintes.
- Mantenha a paleta da marca em cena: creme, rosé e dourado champagne.
- Exporte em `.webp` com qualidade 80 — o `next/image` cuida do resto.
- Peso ideal por foto: até 250 KB.

## Como trocar

1. Salve a nova foto em `public/produtos/` com o nome do slug do produto
   (ex.: `kit-fraldas-luxo.webp`).
2. Atualize o array `images` daquele produto em `lib/products.ts`.
3. Rode `pnpm dev` e confira no navegador.
