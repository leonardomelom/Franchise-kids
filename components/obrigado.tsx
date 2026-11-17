import { BrandMark } from "@/components/brand-mark"
import { ConhecerCta } from "@/components/conhecer-cta"
import {
  INTERESSE_OPTIONS,
  PRAZO_OPTIONS,
  optionLabel,
} from "@/lib/qualification"
import { thankYouMessage } from "@/lib/thank-you"

function one(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] ?? "" : value ?? ""
  return raw.replace(/[<>]/g, "").trim().slice(0, 80)
}

export async function Obrigado({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const nome = one(params.nome)
  const interesse = one(params.interesse)
  const prazo = one(params.prazo)
  const conceito = one(params.conceito)
  const regiao = one(params.regiao)
  const sent = Boolean(interesse || prazo || conceito)

  const content = thankYouMessage(
    sent
      ? {
          nome,
          interesse,
          prazo,
          conceito,
          qualified: params.q === "1",
        }
      : null,
  )

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-sky">
        <div className="mx-auto flex max-w-3xl items-center px-5 py-3">
          <BrandMark priority className="h-12 w-auto" />
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-sm font-medium tracking-wide text-moss">Próximo passo</p>
        <h1 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
          {content.title}
        </h1>
        <div className="mt-6 grid gap-4 text-lg leading-relaxed text-foreground/80">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {sent ? (
          <dl className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Interesse</dt>
              <dd className="mt-1 text-sm">{optionLabel(INTERESSE_OPTIONS, interesse)}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Prazo</dt>
              <dd className="mt-1 text-sm">{optionLabel(PRAZO_OPTIONS, prazo)}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">Região</dt>
              <dd className="mt-1 text-sm">{regiao || "Não informada"}</dd>
            </div>
          </dl>
        ) : (
          <div className="mt-10">
            <ConhecerCta href="/#conhecer" />
          </div>
        )}
      </div>
    </main>
  )
}
