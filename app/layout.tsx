import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { TopBar } from "@/components/layout/top-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { StoreProvider } from "@/lib/store";
import { site } from "@/lib/site";

/* ─── Tipografia ────────────────────────────────────────────────────
   Títulos: serifada elegante · Corpo: sans-serif limpa
   Script: apenas para a assinatura da marca

   Fontes auto-hospedadas em app/fonts (subset latin, baixadas do
   Google Fonts). Evita o download em tempo de build, que falhava
   de forma intermitente e derrubava o deploy.                      */
const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/cormorant-garamond-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const body = localFont({
  src: [
    { path: "./fonts/jost-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/jost-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jost-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const script = localFont({
  src: [{ path: "./fonts/parisienne-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-script",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "velas personalizadas",
    "vela aromática artesanal",
    "vela devocional Nossa Senhora",
    "luminária personalizada com foto",
    "litofania impressão 3D",
    "kit de batizado personalizado",
    "lembrancinhas de batizado",
    "presentes personalizados Sombrio SC",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#855B3F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Atalho de acessibilidade para leitores de tela / teclado */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-taupe focus:px-4 focus:py-2 focus:text-white"
        >
          Ir para o conteúdo
        </a>

        <StoreProvider>
          <TopBar />
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppFloat />
          <CookieBanner />
        </StoreProvider>
      </body>
    </html>
  );
}
