import {
  Brain,
  Check,
  DoorOpen,
  FileWarning,
  HeartHandshake,
  MapPin,
  ShieldAlert,
  Stethoscope,
  UserMinus,
} from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

import { BrandMark } from "@/components/brand-mark"
import { ConhecerCta } from "@/components/conhecer-cta"
import { LeadForm } from "@/components/lead-form"
import {
  Counter,
  GrowBar,
  Highlight,
  ModelFlow,
  MotionProvider,
  Reveal,
  ScrollHeader,
  Stagger,
  StaggerItem,
} from "@/components/motion"
import { StickyCta } from "@/components/sticky-cta"

const proof: { value: ReactNode; label: string }[] = [
  { value: "Desde 1995", label: "operação própria" },
  { value: <><Counter to={3} /> unidades</>, label: "em operação" },
  { value: <><Counter to={41} /> profissionais</>, label: "na operação atual" },
  { value: <><Counter to={7} /> convênios</>, label: "credenciados" },
]

const insurers = ["Amil", "Unimed", "NotreDame Intermédica", "Bradesco", "SulAmérica", "DIX", "Next"]

const breaks = [
  {
    icon: ShieldAlert,
    title: "Credenciamento que não sai.",
    body: "Operadora não credencia quem não tem histórico, e sem convênio a agenda não enche.",
  },
  {
    icon: FileWarning,
    title: "Glosa.",
    body: "Faturamento mal feito vira dinheiro que você já trabalhou e não vai receber.",
  },
  {
    icon: DoorOpen,
    title: "Sala ociosa.",
    body: "Terapia é ocupação. Sala parada é custo fixo rodando contra você.",
  },
  {
    icon: UserMinus,
    title: "Paciente que some.",
    body: "Sem porta de entrada própria, cada paciente novo custa mídia que o ticket não paga.",
  },
]

const deliverables = [
  "Modelo multidisciplinar estruturado e testado em três unidades",
  "Protocolos de atendimento e de avaliação",
  "Apoio no processo de credenciamento junto às operadoras",
  "Treinamento de equipe clínica e administrativa",
  "Padrão de identidade, ambiente e comunicação",
  "Acompanhamento de indicadores e gestão de ocupação",
]

const units = [
  {
    city: "Duque de Caxias",
    place: "Centro",
    address: "R. Conde de Porto Alegre, 422",
    note: "Em operação desde 1995",
  },
  {
    city: "Nova Iguaçu",
    place: "Centro",
    address: "R. Dr. Barros Júnior, 272, sala 8",
    note: "Em operação",
  },
  {
    city: "São Conrado",
    place: "Rio de Janeiro",
    address: "Estr. da Gávea, 847, loja 113",
    note: "Em operação",
  },
]

const credentials = [
  "Três títulos de especialista",
  "36 anos de Souza Aguiar",
  "Pós em Psiquiatria da Infância pelo Einstein",
]

const profiles = [
  {
    kicker: "Maior aderência",
    title: "Profissional de saúde com consultório próprio",
    body: "Você quer escalar para além do seu horário, sem montar do zero protocolo, convênio e gestão.",
    featured: true,
  },
  {
    kicker: "Operação",
    title: "Médico ou gestor",
    body: "Busca uma operação com receita recorrente, não mais um plantão.",
    featured: false,
  },
  {
    kicker: "Capital",
    title: "Investidor com sócio operador",
    body: "Entra com capital e precisa de alguém da área dentro da operação.",
    featured: false,
  },
]

const market: ReactNode[] = [
  "A cobertura de terapias para TEA é obrigatória por lei desde 2022.",
  <>
    O SUS registrou alta de <span className="text-sun"><Counter to={84} suffix="%" /></span> nos
    atendimentos.
  </>,
  "A oferta não acompanhou: a fila é real em quase toda região metropolitana.",
]

const questions = [
  {
    q: "Quanto preciso investir?",
    a: "O valor de investimento e a taxa de franquia não aparecem nesta página. As faixas do formulário só indicam o capital de quem se apresenta. Os números oficiais entram na etapa de proposta, em documento formal, antes de qualquer assinatura.",
  },
  {
    q: "Preciso ser da área da saúde?",
    a: "O modelo funciona melhor para quem já conhece clínica: profissional de saúde com consultório, médico ou gestor, ou investidor com sócio operador na área. Se o seu caso for outro, o formulário registra mesmo assim e o time avalia na conversa.",
  },
  {
    q: "Quanto tempo leva para abrir?",
    a: "Depende do ponto, da obra e do credenciamento. Não publicamos um prazo único. O cronograma é alinhado na conversa, a partir do que as três unidades próprias já operam.",
  },
  {
    q: "Como funciona o credenciamento?",
    a: "A rede apoia o processo junto às operadoras. Credenciamento não é automático: cada operadora analisa a unidade. O que a operação própria já tem é histórico com sete convênios, e esse aprendizado entra no apoio.",
  },
  {
    q: "Quais regiões estão disponíveis?",
    a: "As unidades próprias estão em Duque de Caxias, Nova Iguaçu e São Conrado, no Rio de Janeiro. A disponibilidade de uma unidade nova é confirmada na conversa. O formulário registra a região de interesse.",
  },
  {
    q: "Qual o suporte da rede?",
    a: "Modelo multidisciplinar testado nas três unidades, protocolos de atendimento e de avaliação, apoio no credenciamento, treinamento da equipe clínica e administrativa, padrão de identidade, ambiente e comunicação, e acompanhamento de indicadores e de ocupação.",
  },
  {
    q: "Em quanto tempo a unidade se paga?",
    a: "Isso não é respondido aqui. Prazo de retorno é assunto da etapa de proposta, com documentação formal.",
  },
]

function Blobs({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark"
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -top-32 -left-32 size-[28rem] animate-blob rounded-full blur-3xl bg-cyan/25`}
      />
      <div
        className={`absolute top-10 -right-40 size-[30rem] animate-blob rounded-full blur-3xl [animation-delay:-7s] ${dark ? "bg-sun/15" : "bg-sun/30"}`}
      />
      <div
        className={`absolute -bottom-40 left-1/3 size-[26rem] animate-blob rounded-full blur-3xl [animation-delay:-13s] ${dark ? "bg-brand/40" : "bg-brand/15"}`}
      />
      <div
        className={`absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] ${dark ? "text-white opacity-[0.06]" : "text-brand opacity-[0.08]"}`}
      />
    </div>
  )
}

function FloatingChip({
  className,
  delay,
  value,
  label,
  dot,
}: {
  className: string
  delay: string
  value: string
  label: string
  dot: string
}) {
  return (
    <div className={`absolute z-10 animate-pop-in ${className}`} style={{ animationDelay: delay }}>
      <div className="flex animate-float items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-[0_20px_40px_-16px_rgb(2_119_189/0.45)] backdrop-blur">
        <span className={`size-2.5 rounded-full ${dot}`} />
        <div>
          <p className="text-lg leading-none font-extrabold text-ink">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}

function HeroVisual() {
  const steps = [
    {
      icon: Stethoscope,
      title: "Pediatria",
      body: "A família entra por uma queixa pediátrica.",
      tone: "bg-brand text-white",
    },
    {
      icon: Brain,
      title: "Neurologia e nutrição",
      body: "Encaminhamento interno, no mesmo endereço.",
      tone: "bg-cyan text-white",
    },
    {
      icon: HeartHandshake,
      title: "Equipe de terapia",
      body: "Atendimento pontual vira acompanhamento semanal.",
      tone: "bg-sun text-ink",
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:250ms] lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan/30 via-sun/25 to-brand/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/90 p-6 shadow-[0_30px_60px_-24px_rgb(2_119_189/0.45)] backdrop-blur sm:p-7">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">O que já está de pé</p>
        <p className="mt-3 font-serif text-2xl leading-snug text-ink">
          Três endereços. Um funil dentro da própria unidade.
        </p>

        <ol className="relative mt-7 grid gap-5">
          <div
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[1.3rem] w-0.5 bg-gradient-to-b from-brand via-cyan to-sun opacity-40"
          />
          <div aria-hidden="true" className="absolute top-5 bottom-5 left-[1.3rem] w-0.5">
            <span className="absolute -left-[4px] size-2.5 animate-travel rounded-full bg-brand ring-4 ring-brand/20" />
          </div>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative grid animate-rise grid-cols-[2.75rem_1fr] items-center gap-4"
              style={{ animationDelay: `${550 + index * 180}ms` }}
            >
              <span className={`flex size-11 items-center justify-center rounded-2xl shadow-md ${step.tone}`}>
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-extrabold text-ink">{step.title}</p>
                <p className="text-sm leading-snug text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <FloatingChip
        className="-top-6 -right-2 sm:-right-8"
        delay="1.1s"
        value="37 terapeutas"
        label="na operação atual"
        dot="bg-sun"
      />
      <FloatingChip
        className="-bottom-12 -left-2 sm:-left-8"
        delay="1.3s"
        value="7 convênios"
        label="credenciados"
        dot="bg-cyan"
      />
    </div>
  )
}

export function HomePage() {
  return (
    <MotionProvider>
      <ScrollHeader>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <BrandMark priority />
            <span className="rounded-full bg-sun px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-brand uppercase">
              Franquias
            </span>
          </div>
          <div className="hidden md:block">
            <ConhecerCta />
          </div>
        </div>
      </ScrollHeader>

      <main className="pb-24 md:pb-0">
        {/* 1. Hero */}
        <section className="relative -mt-[4.5rem] overflow-hidden bg-gradient-to-b from-sky via-sky/40 to-white pt-[4.5rem] sm:-mt-20 sm:pt-20">
          <Blobs />
          <div className="relative mx-auto grid max-w-6xl gap-16 px-5 pt-12 pb-20 md:pt-16 md:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
            <div>
              <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-brand/15 bg-white/80 px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-brand uppercase shadow-sm backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan" />
                  <span className="relative size-2 rounded-full bg-cyan" />
                </span>
                Clínica infantil multidisciplinar · Rio de Janeiro
              </p>
              <h1 className="mt-6 max-w-3xl text-[2.55rem] leading-[1.05] text-brand sm:text-6xl sm:leading-[1.02]">
                <span className="block animate-rise [animation-delay:100ms]">
                  Você já sabe operar uma clínica.
                </span>
                <span className="mt-3 block animate-rise text-ink [animation-delay:220ms]">
                  O que falta é não{" "}
                  <span className="relative isolate inline-block whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.1em] bottom-[0.04em] -z-10 h-[0.36em] origin-left animate-draw rounded-full bg-sun [animation-delay:900ms]"
                    />
                    começar do zero.
                  </span>
                </span>
              </h1>
              <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-foreground/80 [animation-delay:340ms]">
                A Só Crianças abre unidades franqueadas. Modelo multidisciplinar validado desde
                1995, com três unidades próprias em operação no Rio de Janeiro.
              </p>
              <div id="hero-cta" className="mt-8 animate-rise [animation-delay:460ms]">
                <ConhecerCta />
              </div>
              <p className="mt-4 animate-rise text-sm text-muted-foreground [animation-delay:560ms]">
                Leva cerca de dois minutos. Retorno em até 1 dia útil, no WhatsApp.
              </p>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* 2. Barra de prova */}
        <section aria-label="Prova de operação" className="relative overflow-hidden bg-brand text-paper">
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 size-72 animate-blob rounded-full bg-cyan/40 blur-3xl"
          />
          <Stagger as="dl" className="relative mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {proof.map((item) => (
              <StaggerItem
                key={item.label}
                className="border-paper/15 px-5 py-7 md:border-l md:first:border-l-0"
              >
                <dt className="font-serif text-2xl tracking-tight sm:text-3xl">{item.value}</dt>
                <dd className="mt-1 text-sm text-paper/75">{item.label}</dd>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="relative border-t border-paper/15 py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            {/* Duas metades idênticas, cada uma com a lista repetida até cobrir telas largas:
                a animação anda exatamente uma metade (-50%) e emenda o fim no começo. */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[0, 1].map((half) => (
                <div key={half} aria-hidden={half === 1 || undefined} className="flex">
                  {[0, 1, 2, 3, 4, 5].map((repeat) => (
                    <ul
                      key={repeat}
                      aria-hidden={(half === 0 && repeat > 0) || undefined}
                      className="flex"
                    >
                      {insurers.map((name) => (
                        <li
                          key={name}
                          className="mr-3 rounded-full border border-paper/20 bg-paper/10 px-4 py-1.5 text-sm font-semibold whitespace-nowrap text-paper/90"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. O problema */}
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Consultório cheio não é o mesmo que negócio.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="text-lg leading-relaxed text-foreground/80">
            <p>
              Você atende bem. A agenda está cheia. E mesmo assim o mês fecha apertado, porque
              consultório tem teto: <Highlight>o seu próprio tempo.</Highlight> Para crescer, você
              precisaria contratar, credenciar, montar faturamento, estruturar protocolo e aprender
              gestão.
            </p>
            <p className="mt-4">
              Cada uma dessas coisas levou anos para a gente acertar, e algumas a gente acertou
              errando.
            </p>
          </Reveal>
        </section>

        {/* 4. Agitação */}
        <section className="bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <Reveal>
              <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
                O que quebra clínica de terapia no primeiro ano.
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
              {breaks.map((item, index) => (
                <StaggerItem
                  key={item.title}
                  as="article"
                  className="group overflow-hidden rounded-3xl border border-sky bg-white shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgb(2_119_189/0.35)]"
                >
                  <GrowBar className="h-1.5 bg-brand" delay={0.2 + index * 0.1} />
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className="flex size-11 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      >
                        <item.icon className="size-5" aria-hidden="true" />
                      </span>
                      <p className="font-serif text-sm text-brand/60">0{index + 1}</p>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-ink">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-foreground/80">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 5. A solução */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-moss">O modelo</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              A criança chega pelo encaminhamento e fica pela terapia.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal delay={0.1} className="max-w-2xl text-lg leading-relaxed text-foreground/80">
              <p>
                Esse é o modelo Só Crianças. A família procura a clínica por uma queixa pediátrica,
                e encontra no mesmo endereço a neurologia, a nutrição e a equipe de terapia. O
                pediatra identifica, encaminha internamente, e a unidade transforma atendimento
                pontual em acompanhamento semanal.
              </p>
              <p className="mt-4">
                É por isso que a clínica cresceu de uma psicóloga, em 2011, para 37 terapeutas, sem
                nunca ter dependido de anúncio para encher agenda.
              </p>
              <p className="mt-4 text-ink">
                Para quem está abrindo, isso significa uma coisa só:{" "}
                <Highlight>a unidade gera o próprio paciente.</Highlight>
              </p>
            </Reveal>
            <Reveal delay={0.2} x={30} y={0}>
              <div className="relative overflow-hidden rounded-3xl bg-ink p-7 text-paper shadow-[0_30px_60px_-24px_rgb(22_50_74/0.6)]">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-48 animate-blob rounded-full bg-cyan/40 blur-3xl"
                />
                <p className="relative text-xs tracking-[0.16em] text-paper/60 uppercase">
                  Equipe de terapia
                </p>
                <div className="relative mt-6 grid gap-5">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-paper/70">2011</span>
                      <span className="font-serif text-2xl">1 psicóloga</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-paper/10">
                      <GrowBar
                        className="h-full w-[3%] rounded-full bg-paper/60"
                        wrapperClassName="h-full"
                        delay={0.3}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-paper/70">Hoje</span>
                      <span className="font-serif text-4xl text-sun">
                        <Counter from={1} to={37} duration={2} /> terapeutas
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-paper/10">
                      <GrowBar
                        className="h-full w-full rounded-full bg-gradient-to-r from-cyan to-sun"
                        wrapperClassName="h-full"
                        delay={0.5}
                      />
                    </div>
                  </div>
                </div>
                <p className="relative mt-6 text-sm leading-relaxed text-paper/70">
                  Sem investimento de aquisição: o paciente chega pela pediatria da casa.
                </p>
              </div>
            </Reveal>
          </div>
          <ModelFlow
            steps={[
              { title: "A família entra", body: "por uma queixa pediátrica.", tone: "brand" },
              {
                title: "A casa encaminha",
                body: "neurologia, nutrição e terapia, no mesmo endereço.",
                tone: "cyan",
              },
              {
                title: "A terapia fica",
                body: "consulta pontual vira acompanhamento semanal.",
                tone: "sun",
              },
            ]}
          />
        </section>

        {/* 6. O que a franqueada recebe */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
            <Reveal>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:sticky md:top-28">
                O que a franqueada recebe.
              </h2>
            </Reveal>
            <div>
              <Stagger as="ul" className="grid gap-3">
                {deliverables.map((item) => (
                  <StaggerItem
                    key={item}
                    as="li"
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-4 text-base leading-relaxed transition-colors duration-300 hover:border-brand/30 hover:bg-sky/50"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-110">
                      <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.2}>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Condição comercial, taxa e investimento não estão nesta lista. Entram na proposta,
                  em documento formal.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7. Prova de operação */}
        <section className="relative overflow-hidden bg-sky">
          <Blobs />
          <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
            <Reveal>
              <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
                Antes de franquear, a gente operou por <Highlight>trinta anos.</Highlight>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
                A clínica nasceu de uma sala alugada em Caxias, cresceu quando a demanda empurrou,
                e hoje é a maior clínica infantil multidisciplinar de Duque de Caxias.
              </p>
            </Reveal>
            <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
              {units.map((unit) => (
                <StaggerItem
                  key={unit.city}
                  as="article"
                  className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-20px_rgb(2_119_189/0.4)]"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-brand" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold tracking-[0.14em] text-brand uppercase">
                      {unit.note}
                    </p>
                    <MapPin
                      className="size-5 text-cyan transition-transform duration-500 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl text-ink">{unit.city}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{unit.place}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">{unit.address}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Hoje são 37 terapeutas e 4 médicos. Psicologia, fonoaudiologia, terapia
                ocupacional, psicomotricidade e psicopedagogia convivem com pediatria, cirurgia
                pediátrica, neurologia, nutrição e audiometria.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 8. A fundadora */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[0.72fr_1.28fr] md:gap-12 md:py-28">
          <Reveal x={-30} y={0} className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-5 -z-10 animate-blob rounded-[2.5rem] bg-gradient-to-br from-cyan/30 via-sun/30 to-brand/20 blur-2xl"
            />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-24px_rgb(22_50_74/0.5)]">
              <Image
                src="/dra-ana-teresa-vacchiano.webp"
                alt="Dra. Ana Teresa Vacchiano, de jaleco branco, trabalhando no consultório"
                width={941}
                height={1672}
                sizes="(min-width: 768px) 440px, 90vw"
                className="aspect-[4/5] w-full object-cover object-[50%_38%] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent"
              />
            </div>
            <div className="absolute -right-3 -bottom-5 animate-float rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-[0_20px_40px_-16px_rgb(2_119_189/0.45)] backdrop-blur sm:-right-6">
              <p className="text-lg leading-none font-extrabold text-ink">Desde 1995</p>
              <p className="mt-1 text-xs text-muted-foreground">fundadora da Só Crianças</p>
            </div>
          </Reveal>
          <Reveal x={30} y={0} delay={0.1}>
            <p className="text-sm font-medium tracking-wide text-moss">A fundadora</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Dra. Ana Teresa Vacchiano
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Cirurgiã pediátrica · CRM-RJ 382028</p>
            <Stagger as="ul" className="mt-6 flex flex-wrap gap-1.5">
              {credentials.map((item) => (
                <StaggerItem
                  key={item}
                  as="li"
                  className="rounded-full border border-brand/15 bg-sky px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap text-brand"
                >
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-8 text-lg leading-relaxed text-foreground/80">
              <p>
                Fundou a Só Crianças em Duque de Caxias. Três títulos de especialista, 36 anos de
                Souza Aguiar e pós em Psiquiatria da Infância pelo Einstein.
              </p>
              <p className="mt-4">
                A sucessão clínica está dentro de casa. A operação não depende de uma única pessoa
                na cadeira de fundadora.
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                É com ela, de par para par, que o perfil médico costuma se reconhecer.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 9. Perfil */}
        <section className="bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <Reveal>
              <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
                Esse modelo funciona melhor para quem já conhece o terreno.
              </h2>
            </Reveal>
            <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
              {profiles.map((profile) => (
                <StaggerItem
                  key={profile.title}
                  as="article"
                  className={`rounded-3xl bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgb(2_119_189/0.35)] ${profile.featured ? "ring-2 ring-sun" : ""}`}
                >
                  <p
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-[0.12em] uppercase ${profile.featured ? "bg-sun text-ink" : "bg-sky text-brand"}`}
                  >
                    {profile.kicker}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-ink">{profile.title}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/80">{profile.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 10. Mercado */}
        <section className="relative overflow-hidden bg-ink text-paper">
          <Blobs tone="dark" />
          <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
            <Reveal>
              <h2 className="font-serif text-4xl tracking-tight">O mercado, em três linhas.</h2>
            </Reveal>
            <Stagger as="ol" className="mt-10 grid gap-8">
              {market.map((line, index) => (
                <StaggerItem
                  key={index}
                  as="li"
                  className="grid gap-3 border-t border-paper/15 pt-6 md:grid-cols-[4rem_1fr]"
                >
                  <span className="font-serif text-cyan">0{index + 1}</span>
                  <p className="font-serif text-2xl leading-snug md:text-3xl">{line}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <Reveal>
              <h2 className="font-serif text-4xl tracking-tight text-ink">Perguntas frequentes.</h2>
            </Reveal>
            <Stagger className="mt-8">
              {questions.map((item) => (
                <StaggerItem key={item.q}>
                  <details className="faq group border-b border-border py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sky font-serif text-lg text-brand transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-sun">
                        +
                      </span>
                    </summary>
                    <p className="pt-3 pr-8 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </details>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 12. Fechamento + formulário */}
        <section id="conhecer" className="relative overflow-hidden bg-sky">
          <Blobs />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-brand md:text-5xl">
                O modelo levou trinta anos para ficar pronto. A sua unidade não precisa levar.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                Se você já pensou em abrir, esse é o jeito de não começar sozinha. A próxima
                conversa é sobre o modelo, a praça e as condições formais.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white p-5 text-ink shadow-[0_30px_60px_-24px_rgb(2_119_189/0.4)] sm:p-8">
                <h3 className="font-serif text-3xl tracking-tight">
                  Para conhecer o modelo, responda isto.
                </h3>
                <p className="mt-3 mb-8 text-sm leading-relaxed text-muted-foreground">
                  Não é um pedido de proposta e não gera compromisso. São as respostas para saber se
                  faz sentido conversar.
                </p>
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 text-sm leading-relaxed text-muted-foreground md:grid-cols-[1fr_1.4fr]">
          <BrandMark className="h-10 w-auto" />
          <p>
            Esta página apresenta o modelo de negócio. Não promete resultado clínico, faturamento
            ou prazo de retorno. Condições de investimento são apresentadas na etapa de proposta,
            em documento formal, antes de qualquer assinatura. O atendimento a famílias continua
            nas unidades de Duque de Caxias, Nova Iguaçu e São Conrado.
          </p>
        </div>
      </footer>
      <StickyCta />
    </MotionProvider>
  )
}
