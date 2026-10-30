"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, MessageCircle, Phone, Search, ShoppingBag, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shop/search-bar";
import { mainNav, site } from "@/lib/site";
import { useStore } from "@/lib/store";
import { waGeneral } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Cabeçalho com logo centralizada, menu, busca e ícones de ação.
 * Mobile-first: no celular o menu e a busca abrem em painéis.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, ready } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-sand/80 bg-brand-cream/95 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/80">
      <div className="container">
        {/* ─── Linha principal ─────────────────────────────────── */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
          {/* Ações da esquerda */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="rounded-full p-2 transition-colors hover:bg-brand-sand/60 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <a
              href={`tel:${site.phoneDisplay.replace(/\D/g, "")}`}
              className="hidden items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-brand-taupe lg:flex"
            >
              <Phone className="h-4 w-4 text-brand-brown" />
              {site.phoneDisplay}
            </a>
          </div>

          {/* Logo centralizada */}
          <Link href="/" className="group mx-auto text-center">
            <span className="block font-script text-2xl leading-none text-brand-taupe transition-colors group-hover:text-brand-brown sm:text-3xl">
              {site.shortName}
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.34em] text-brand-graphite/70 sm:text-[10px]">
              Velas &amp; Personalizados
            </span>
          </Link>

          {/* Ações da direita */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar produtos"
              aria-expanded={searchOpen}
              className="rounded-full p-2 transition-colors hover:bg-brand-sand/60"
            >
              <Search className="h-5 w-5" />
            </button>

            <a
              href={waGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com uma consultora no WhatsApp"
              className="hidden rounded-full p-2 transition-colors hover:bg-brand-sand/60 sm:block"
            >
              <MessageCircle className="h-5 w-5" />
            </a>

            <Link
              href="/conta"
              aria-label="Minha conta"
              className="rounded-full p-2 transition-colors hover:bg-brand-sand/60"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href="/favoritos"
              aria-label="Lista de desejos"
              className="relative rounded-full p-2 transition-colors hover:bg-brand-sand/60"
            >
              <Heart className="h-5 w-5" />
              {ready && wishlist.length > 0 && <CountBubble value={wishlist.length} />}
            </Link>

            <Link
              href="/carrinho"
              aria-label="Carrinho de compras"
              className="relative rounded-full p-2 transition-colors hover:bg-brand-sand/60"
            >
              <ShoppingBag className="h-5 w-5" />
              {ready && cartCount > 0 && <CountBubble value={cartCount} />}
            </Link>
          </div>
        </div>

        {/* ─── Menu desktop ────────────────────────────────────── */}
        <nav aria-label="Menu principal" className="hidden justify-center pb-4 lg:flex">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link uppercase tracking-[0.14em]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ─── Busca expansível ────────────────────────────────── */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            searchOpen ? "max-h-24 pb-4 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <SearchBar onNavigate={() => setSearchOpen(false)} />
        </div>
      </div>

      {/* ─── Menu mobile ───────────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-brand-graphite/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col bg-brand-cream p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="font-script text-2xl text-brand-taupe">{site.shortName}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="rounded-full p-2 hover:bg-brand-sand/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Menu principal" className="mt-8 flex-1">
              <ul className="space-y-1">
                {mainNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-3 font-serif text-lg transition-colors hover:bg-brand-sand/50 hover:text-brand-taupe"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-brand-sand pt-6">
              <Button asChild variant="whatsapp" className="w-full">
                <a href={waGeneral()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Falar com uma consultora
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">{site.openingHours}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/** Contador pequeno sobre os ícones de wishlist e carrinho. */
function CountBubble({ value }: { value: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-taupe px-1 text-[10px] font-medium text-white">
      {value}
    </span>
  );
}
