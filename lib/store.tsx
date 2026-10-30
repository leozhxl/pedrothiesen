"use client";

/**
 * Estado global da loja: carrinho e lista de desejos.
 * Persistido em localStorage para o cliente não perder a seleção
 * ao recarregar — nenhuma dependência externa de state management.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { effectivePrice } from "@/lib/format";
import { getProductBySlug, type Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  quantity: number;
  /** Escolhas de personalização feitas na página do produto. */
  options: Record<string, string>;
};

type StoreContextValue = {
  /** Ainda lendo o localStorage — evita piscar números errados. */
  ready: boolean;
  cart: CartItem[];
  wishlist: string[];
  addToCart: (slug: string, options?: Record<string, string>, quantity?: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWished: (slug: string) => boolean;
  cartCount: number;
  cartTotal: number;
  /** Itens do carrinho já cruzados com o catálogo. */
  detailedCart: { item: CartItem; product: Product; lineTotal: number }[];
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "pethi:cart";
const WISH_KEY = "pethi:wishlist";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Hidrata a partir do navegador apenas depois da montagem.
  useEffect(() => {
    setCart(readStorage<CartItem[]>(CART_KEY, []));
    setWishlist(readStorage<string[]>(WISH_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const addToCart = useCallback(
    (slug: string, options: Record<string, string> = {}, quantity = 1) => {
      setCart((current) => {
        // Mesma peça com a mesma personalização apenas soma a quantidade.
        const signature = JSON.stringify(options);
        const index = current.findIndex(
          (i) => i.slug === slug && JSON.stringify(i.options) === signature,
        );
        if (index >= 0) {
          const next = [...current];
          next[index] = { ...next[index], quantity: next[index].quantity + quantity };
          return next;
        }
        return [...current, { slug, quantity, options }];
      });
    },
    [],
  );

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((_, i) => i !== index)
        : current.map((item, i) => (i === index ? { ...item, quantity } : item)),
    );
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((current) => current.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );
  }, []);

  const detailedCart = useMemo(() => {
    return cart.flatMap((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return [];
      const unit = effectivePrice(product.price, product.salePrice);
      return [{ item, product, lineTotal: unit * item.quantity }];
    });
  }, [cart]);

  const value = useMemo<StoreContextValue>(
    () => ({
      ready,
      cart,
      wishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWished: (slug: string) => wishlist.includes(slug),
      cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: detailedCart.reduce((sum, l) => sum + l.lineTotal, 0),
      detailedCart,
    }),
    [
      ready,
      cart,
      wishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      detailedCart,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore precisa estar dentro de <StoreProvider>.");
  return context;
}
