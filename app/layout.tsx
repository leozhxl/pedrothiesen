import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Parisienne } from "next/font/google";
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
   Script: apenas para a assinatura da marca                        */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
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
