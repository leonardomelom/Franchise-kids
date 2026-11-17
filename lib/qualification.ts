export const PRAZO_OPTIONS = [
  { value: "ate_6_meses", label: "Até 6 meses", within12Months: true },
  { value: "de_6_a_12_meses", label: "De 6 a 12 meses", within12Months: true },
  { value: "mais_de_12_meses", label: "Mais de 12 meses", within12Months: false },
  { value: "ainda_avaliando", label: "Ainda avaliando", within12Months: false },
] as const

export const INTERESSE_OPTIONS = [
  {
    value: "abrir_unidade",
    label: "Abrir uma unidade nova",
    hint: "Começar uma franquia Só Crianças.",
    franchise: true,
  },
  {
    value: "adquirir_operacao",
    label: "Adquirir uma operação existente",
    hint: "Conversar sobre uma unidade que já opera.",
    franchise: false,
  },
  {
    value: "ainda_avaliando",
    label: "Ainda estou avaliando",
    hint: "Quero entender o modelo antes de escolher o caminho.",
    franchise: false,
  },
] as const

export const CONCEITO_OPTIONS = [
  { value: "entendi", label: "Sim, entendi", understood: true },
  { value: "nao_ficou_claro", label: "Ainda não ficou claro", understood: false },
] as const

export const CAPITAL_OPTIONS = [
  { value: "ate_250", label: "Até R$ 250 mil" },
  { value: "de_250_a_500", label: "De R$ 250 mil a R$ 500 mil" },
  { value: "de_500_a_1mi", label: "De R$ 500 mil a R$ 1 milhão" },
  { value: "acima_1mi", label: "Acima de R$ 1 milhão" },
  { value: "prefiro_na_conversa", label: "Prefiro tratar na conversa" },
] as const

export const CONCEPT_STATEMENT =
  "Na Só Crianças, a família entra por uma queixa pediátrica e encontra, no mesmo endereço, a neurologia, a nutrição e a equipe de terapia. O pediatra identifica, encaminha internamente, e a unidade transforma atendimento pontual em acompanhamento semanal. A unidade gera o próprio paciente."

export type Prazo = (typeof PRAZO_OPTIONS)[number]["value"]
export type Interesse = (typeof INTERESSE_OPTIONS)[number]["value"]
export type Conceito = (typeof CONCEITO_OPTIONS)[number]["value"]
export type Capital = (typeof CAPITAL_OPTIONS)[number]["value"]

export type QualificationAnswers = {
  prazo: string
  interesse: string
  conceito: string
}

export type QualificationFlags = {
  dentroDe12Meses: boolean
  interesseEmFranquia: boolean
  entendeuConceito: boolean
}

export function qualificationFlags(input: QualificationAnswers): QualificationFlags {
  const prazo = PRAZO_OPTIONS.find((item) => item.value === input.prazo)
  const interesse = INTERESSE_OPTIONS.find((item) => item.value === input.interesse)
  const conceito = CONCEITO_OPTIONS.find((item) => item.value === input.conceito)

  return {
    dentroDe12Meses: prazo?.within12Months ?? false,
    interesseEmFranquia: interesse?.franchise ?? false,
    entendeuConceito: conceito?.understood ?? false,
  }
}

/**
 * Lead qualificado para mídia: interesse em abrir franquia nos próximos
 * 12 meses e confirmação de que entendeu o conceito da Só Crianças.
 * Aquisição de operação existente não entra nesse evento.
 */
export function isQualifiedLead(input: QualificationAnswers): boolean {
  const flags = qualificationFlags(input)
  return flags.dentroDe12Meses && flags.interesseEmFranquia && flags.entendeuConceito
}

export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((item) => item.value === value)?.label ?? value
}
