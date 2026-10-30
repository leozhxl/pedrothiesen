"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pethi:cookies";

/** Aviso de cookies exigido pela LGPD, com decisão guardada no navegador. */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Navegação privada ou cookies bloqueados: não insiste.
    }
  }, []);

  function decide(choice: "aceito" | "essenciais") {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignora falha de storage */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up border-t border-brand-sand bg-brand-cream/98 p-4 shadow-lift backdrop-blur sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"
    >
      <div className="flex gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-brown" />
        <div>
          <p className="text-sm leading-relaxed text-brand-graphite/90">
            Usamos cookies para melhorar sua experiência no site e lembrar dos itens que
            você escolheu. Saiba mais na nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-brand-taupe underline underline-offset-2"
            >
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide("aceito")}>
              Aceitar todos
            </Button>
            <Button size="sm" variant="outline" onClick={() => decide("essenciais")}>
              Só os essenciais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
