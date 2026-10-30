"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Campo de busca que envia o termo para /loja?busca=… */
export function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    router.push(`/loja?busca=${encodeURIComponent(term)}`);
    onNavigate?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="mx-auto flex max-w-xl gap-2">
      <label htmlFor="busca-produtos" className="sr-only">
        Buscar produtos
      </label>
      <Input
        id="busca-produtos"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busque por vela aromática, luminária com foto…"
      />
      <Button type="submit" size="icon" aria-label="Buscar">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
