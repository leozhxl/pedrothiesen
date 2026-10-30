import { site } from "@/lib/site";

/** Barra de aviso fixa no topo, com o recado de confiança da marca. */
export function TopBar() {
  return (
    <div className="bg-brand-brown text-white">
      <div className="container flex items-center justify-center gap-6 py-2 text-center">
        <p className="text-[11px] tracking-[0.18em] sm:text-xs">{site.announcement}</p>
        <span className="hidden text-[11px] tracking-[0.18em] text-white/60 lg:inline">
          Parcele em até {site.installments}x sem juros
        </span>
      </div>
    </div>
  );
}
