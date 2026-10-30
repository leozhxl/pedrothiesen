/**
 * Opções de filtro da loja.
 *
 * Fica num módulo neutro (sem "use client") de propósito: estas constantes são
 * lidas tanto pela UI de filtros, no cliente, quanto pela filtragem da página
 * da loja, no servidor.
 */

export const priceRanges = [
  { id: "ate-50", label: "Até R$ 50", min: 0, max: 50 },
  { id: "50-150", label: "R$ 50 a R$ 150", min: 50, max: 150 },
  { id: "150-300", label: "R$ 150 a R$ 300", min: 150, max: 300 },
  { id: "acima-300", label: "Acima de R$ 300", min: 300, max: Infinity },
] as const;

export const sortOptions = [
  { id: "destaques", label: "Destaques" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "nome", label: "Nome (A–Z)" },
] as const;
