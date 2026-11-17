import {
  CAPITAL_OPTIONS,
  CONCEITO_OPTIONS,
  INTERESSE_OPTIONS,
  PRAZO_OPTIONS,
  type Capital,
  type Conceito,
  type Interesse,
  type Prazo,
} from "@/lib/qualification"
import { toE164 } from "@/lib/phone"

export type LeadInput = {
  nome: string
  whatsapp: string
  area: string
  regiao: string
  capital: Capital
  prazo: Prazo
  interesse: Interesse
  conceito: Conceito
  lgpd: true
}

export type LeadErrors = Partial<Record<keyof LeadInput | "form", string>>

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; errors: LeadErrors }

function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max)
}

function isFullName(value: string): boolean {
  const parts = value.split(" ").filter(Boolean)
  if (parts.length < 2 || value.length > 120) return false
  return parts.every((part) => /^[\p{L}][\p{L}'’.-]{0,40}$/u.test(part))
}

function choice<T extends string>(
  options: readonly { value: T }[],
  value: unknown,
): T | null {
  if (typeof value !== "string") return null
  return options.find((item) => item.value === value)?.value ?? null
}

export function validateLead(body: unknown): ValidationResult {
  const source = body && typeof body === "object" ? (body as Record<string, unknown>) : {}
  const errors: LeadErrors = {}

  const nome = cleanText(source.nome, 120)
  const area = cleanText(source.area, 160)
  const regiao = cleanText(source.regiao, 120)
  const whatsapp = toE164(typeof source.whatsapp === "string" ? source.whatsapp : "")
  const capital = choice(CAPITAL_OPTIONS, source.capital)
  const prazo = choice(PRAZO_OPTIONS, source.prazo)
  const interesse = choice(INTERESSE_OPTIONS, source.interesse)
  const conceito = choice(CONCEITO_OPTIONS, source.conceito)
  const lgpd = source.lgpd === true

  if (!isFullName(nome)) errors.nome = "Escreva nome e sobrenome."
  if (!whatsapp) errors.whatsapp = "Informe um celular com DDD. Ex.: (21) 99999-9999."
  if (area.length < 3) errors.area = "Conte sua formação ou a área em que você atua."
  if (regiao.length < 3) errors.regiao = "Informe a cidade ou a região de interesse."
  if (!capital) errors.capital = "Escolha uma faixa de capital."
  if (!prazo) errors.prazo = "Escolha o prazo pretendido para abrir."
  if (!interesse) errors.interesse = "Escolha o que te interessa."
  if (!conceito) errors.conceito = "Marque se o conceito ficou claro."
  if (!lgpd) errors.lgpd = "Precisamos da sua autorização para entrar em contato."

  if (!whatsapp || !capital || !prazo || !interesse || !conceito || !lgpd || Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    lead: {
      nome,
      whatsapp,
      area,
      regiao,
      capital,
      prazo,
      interesse,
      conceito,
      lgpd: true,
    },
  }
}

export function splitName(nome: string): { first_name: string; last_name: string } {
  const parts = nome.trim().split(/\s+/)
  return {
    first_name: parts[0] ?? "",
    last_name: parts.slice(1).join(" "),
  }
}
