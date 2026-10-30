import { Clock, Lock, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/lib/site";

const badges = [
  {
    icon: Truck,
    title: "Enviamos para todo o Brasil",
    text: "Embalagem reforçada e código de rastreio",
  },
  {
    icon: Lock,
    title: "Compra segura",
    text: "Certificado SSL e dados protegidos",
  },
  {
    icon: ShieldCheck,
    title: "Garantia nos produtos",
    text: "Peças conferidas uma a uma antes do envio",
  },
  {
    icon: Clock,
    title: `Produção em ${site.productionDays} dias úteis`,
    text: "Tempo de quem faz à mão, com carinho",
  },
];

/** Faixa de confiança logo abaixo do banner principal. */
export function TrustBadges() {
  return (
    <section aria-label="Nossos compromissos" className="border-y border-brand-sand bg-white/70">
      <div className="container grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-start gap-3">
            <badge.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-brown" />
            <div>
              <p className="text-sm font-medium leading-snug text-brand-graphite">
                {badge.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{badge.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
