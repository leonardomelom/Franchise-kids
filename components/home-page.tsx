import { BrandMark } from "@/components/brand-mark"
import { ConhecerCta } from "@/components/conhecer-cta"
import { LeadForm } from "@/components/lead-form"
import { StickyCta } from "@/components/sticky-cta"

const proof = [
  { value: "Desde 1995", label: "operação própria" },
  { value: "3 unidades", label: "em operação" },
  { value: "41 profissionais", label: "na operação atual" },
  { value: "7 convênios", label: "credenciados" },
]

const breaks = [
  {
    title: "Credenciamento que não sai.",
    body: "Operadora não credencia quem não tem histórico, e sem convênio a agenda não enche.",
  },
  {
    title: "Glosa.",
    body: "Faturamento mal feito vira dinheiro que você já trabalhou e não vai receber.",
  },
  {
    title: "Sala ociosa.",
    body: "Terapia é ocupação. Sala parada é custo fixo rodando contra você.",
  },
  {
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

const profiles = [
  {
    kicker: "Maior aderência",
    title: "Profissional de saúde com consultório próprio",
    body: "Você quer escalar para além do seu horário, sem montar do zero protocolo, convênio e gestão.",
  },
  {
    kicker: "Operação",
    title: "Médico ou gestor",
    body: "Busca uma operação com receita recorrente, não mais um plantão.",
  },
  {
    kicker: "Capital",
    title: "Investidor com sócio operador",
    body: "Entra com capital e precisa de alguém da área dentro da operação.",
  },
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

export function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sky bg-white/95 backdrop-blur">
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
      </header>

      <main className="pb-24 md:pb-0">
        <section className="relative overflow-hidden bg-sky/60">
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="flex gap-2" aria-hidden="true">
                <span className="size-5 rounded-md bg-brand" />
                <span className="size-5 rounded-md bg-sun" />
                <span className="size-5 rounded-md bg-pop" />
              </div>
              <p className="mt-4 text-sm font-extrabold tracking-wide text-brand uppercase">
                Clínica infantil multidisciplinar · Rio de Janeiro
              </p>
              <h1 className="mt-4 max-w-3xl text-[2.55rem] leading-[1.05] text-brand sm:text-6xl sm:leading-[1.02]">
                Você já sabe operar uma clínica.
                <span className="mt-3 block">O que falta é não começar do zero.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
                A Só Crianças abre unidades franqueadas. Modelo multidisciplinar validado desde
                1995, com três unidades próprias em operação no Rio de Janeiro.
              </p>
              <div id="hero-cta" className="mt-8">
                <ConhecerCta />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Leva cerca de dois minutos. Retorno em até 1 dia útil, no WhatsApp.
              </p>
            </div>
            <aside className="rounded-3xl border border-white bg-white p-6 shadow-sm">
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                O que já está de pé
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug text-ink">
                Três endereços. Um funil dentro da própria unidade.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A família entra pela queixa pediátrica e encontra, no mesmo lugar, neurologia,
                nutrição e a equipe de terapia.
              </p>
            </aside>
          </div>
        </section>

        <section aria-label="Prova de operação" className="bg-moss text-paper">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {proof.map((item) => (
              <div key={item.value} className="border-paper/15 px-5 py-6 md:border-l md:first:border-l-0">
                <dt className="font-serif text-2xl tracking-tight sm:text-3xl">{item.value}</dt>
                <dd className="mt-1 text-sm text-paper/75">{item.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto max-w-6xl px-5 pb-6 text-sm text-paper/70">
            Amil · Unimed · NotreDame Intermédica · Bradesco · SulAmérica · DIX · Next
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2 md:py-28">
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            Consultório cheio não é o mesmo que negócio.
          </h2>
          <div className="text-lg leading-relaxed text-foreground/80">
            <p>
              Você atende bem. A agenda está cheia. E mesmo assim o mês fecha apertado, porque
              consultório tem teto: o seu próprio tempo. Para crescer, você precisaria contratar,
              credenciar, montar faturamento, estruturar protocolo e aprender gestão.
            </p>
            <p className="mt-4">
              Cada uma dessas coisas levou anos para a gente acertar, e algumas a gente acertou
              errando.
            </p>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              O que quebra clínica de terapia no primeiro ano.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {breaks.map((item, index) => (
                <article key={item.title} className="overflow-hidden rounded-3xl border border-sky bg-white shadow-sm">
                  <div className={["h-1.5 bg-brand", "h-1.5 bg-sun", "h-1.5 bg-pop", "h-1.5 bg-brand"][index]} />
                  <div className="p-6">
                  <p className="font-serif text-sm text-brand">0{index + 1}</p>
                  <h3 className="mt-3 font-serif text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/80">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-sm font-medium tracking-wide text-moss">O modelo</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
            A criança chega pelo médico e fica pela terapia.
          </h2>
          <div className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
            <p>
              Esse é o modelo Só Crianças. A família procura a clínica por uma queixa pediátrica, e
              encontra no mesmo endereço a neurologia, a nutrição e a equipe de terapia. O
              pediatra identifica, encaminha internamente, e a unidade transforma atendimento
              pontual em acompanhamento semanal.
            </p>
            <p className="mt-4">
              É por isso que a clínica cresceu de uma psicóloga, em 2011, para 37 terapeutas, sem
              nunca ter dependido de anúncio para encher agenda.
            </p>
            <p className="mt-4 text-ink">
              Para quem está abrindo, isso significa uma coisa só: a unidade gera o próprio
              paciente.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["1", "A família entra", "por uma queixa pediátrica."],
              ["2", "A casa encaminha", "neurologia, nutrição e terapia, no mesmo endereço."],
              ["3", "A terapia fica", "consulta pontual vira acompanhamento semanal."],
            ].map(([step, title, body]) => (
              <li key={step} className="border-t border-clay pt-4">
                <p className="font-serif text-sm text-clay">{step}</p>
                <p className="mt-2 font-serif text-2xl text-ink">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink">
              O que a franqueada recebe.
            </h2>
            <div>
              <ul className="grid gap-4">
                {deliverables.map((item) => (
                  <li key={item} className="border-b border-border pb-4 text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Condição comercial, taxa e investimento não estão nesta lista. Entram na proposta,
                em documento formal.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-sky">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Antes de franquear, a gente operou por trinta anos.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
              A clínica nasceu de uma sala alugada em Caxias, cresceu quando a demanda empurrou, e
              hoje é a maior clínica infantil multidisciplinar de Duque de Caxias.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {units.map((unit) => (
                <article key={unit.city} className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs font-extrabold tracking-[0.14em] text-brand uppercase">{unit.note}</p>
                  <h3 className="mt-4 font-serif text-3xl text-ink">{unit.city}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{unit.place}</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/80">{unit.address}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Hoje são 37 terapeutas e 4 médicos. Psicologia, fonoaudiologia, terapia ocupacional,
              psicomotricidade e psicopedagogia convivem com pediatria, cirurgia pediátrica,
              neurologia, nutrição e audiometria.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
          <div>
            <p className="text-sm font-medium tracking-wide text-moss">A fundadora</p>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Dra. Ana Teresa Vacchiano
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Cirurgiã pediátrica · CRM-RJ 382028
            </p>
          </div>
          <div className="text-lg leading-relaxed text-foreground/80">
            <p>
              Fundou a Só Crianças em Duque de Caxias. Três títulos de especialista, 36 anos de
              Souza Aguiar e pós em Psiquiatria da Infância pelo Einstein.
            </p>
            <p className="mt-4">
              A sucessão clínica está dentro de casa. A operação não depende de uma única pessoa na
              cadeira de fundadora.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              É com ela, de par para par, que o perfil médico costuma se reconhecer.
            </p>
          </div>
        </section>

        <section className="bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              Esse modelo funciona melhor para quem já conhece o terreno.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {profiles.map((profile) => (
                <article key={profile.title} className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs tracking-[0.16em] text-clay uppercase">{profile.kicker}</p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug text-ink">{profile.title}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/80">{profile.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <h2 className="font-serif text-4xl tracking-tight text-ink">O mercado, em três linhas.</h2>
          <ol className="mt-10 grid gap-8">
            {[
              "A cobertura de terapias para TEA é obrigatória por lei desde 2022.",
              "O SUS registrou alta de 84% nos atendimentos.",
              "A oferta não acompanhou: a fila é real em quase toda região metropolitana.",
            ].map((line, index) => (
              <li key={line} className="grid gap-3 border-t border-border pt-6 md:grid-cols-[4rem_1fr]">
                <span className="font-serif text-clay">0{index + 1}</span>
                <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">{line}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
            <h2 className="font-serif text-4xl tracking-tight text-ink">Perguntas frequentes.</h2>
            <div className="mt-8">
              {questions.map((item) => (
                <details key={item.q} className="group border-b border-border py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="font-serif text-xl text-clay transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pt-3 pr-8 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="conhecer" className="bg-sky">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-brand md:text-5xl">
                O modelo levou trinta anos para ficar pronto. A sua unidade não precisa levar.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                Se você já pensou em abrir, esse é o jeito de não começar sozinha. A próxima
                conversa é sobre o modelo, a praça e as condições formais.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 text-ink shadow-sm sm:p-8">
              <h3 className="font-serif text-3xl tracking-tight">Para conhecer o modelo, responda isto.</h3>
              <p className="mt-3 mb-8 text-sm leading-relaxed text-muted-foreground">
                Não é um pedido de proposta e não gera compromisso. São as respostas para saber se
                faz sentido conversar.
              </p>
              <LeadForm />
            </div>
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
    </>
  )
}
