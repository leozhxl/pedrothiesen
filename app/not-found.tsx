import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="font-script text-5xl text-brand-taupeSoft">404</p>
      <h1 className="mt-6 font-serif text-3xl sm:text-4xl">
        Essa página não está no nosso ateliê
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        Talvez o link tenha mudado de lugar. Que tal voltar e ver as peças feitas à mão?
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/loja">Ver todos os produtos</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}
