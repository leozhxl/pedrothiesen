import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { waGeneral } from "@/lib/whatsapp";

/** Botão flutuante fixo de WhatsApp, presente em todas as páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={waGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com ${site.consultantName} no WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-lift transition-all duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        {/* Pulso suave para chamar atenção sem agredir */}
        <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[12rem] sm:max-w-[12rem]">
        Fale com uma consultora
      </span>
    </a>
  );
}
