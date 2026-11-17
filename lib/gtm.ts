export const LEAD_QUALIFICADO_EVENT = "lead_qualificado" as const

export type LeadQualificadoPayload = {
  event_id: string
  form_id: "franquia_so_criancas"
  lead_status: "qualificado"
  prazo: "ate_6_meses" | "de_6_a_12_meses"
  interesse: "abrir_unidade"
  entendeu_conceito: true
  capital: string
  regiao: string
  area_atuacao: string
  user_data: {
    first_name: string
    last_name: string
    phone_number: string
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Único evento de conversão desta página.
 * O GTM deve mapear este nome para Meta e Google.
 * Não usar o nome padrão de conversão de formulário.
 */
export function pushLeadQualificado(payload: LeadQualificadoPayload) {
  if (typeof window === "undefined") return
  const eventName = LEAD_QUALIFICADO_EVENT
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...payload,
  })
}
