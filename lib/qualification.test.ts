import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { formatBrazilMobile, toE164 } from "./phone"
import {
  CONCEITO_OPTIONS,
  INTERESSE_OPTIONS,
  PRAZO_OPTIONS,
  isQualifiedLead,
} from "./qualification"
import { thankYouMessage } from "./thank-you"
import { validateLead } from "./validation"

const qualifiedBase = {
  nome: "Ana Lima",
  whatsapp: "(21) 98888-7777",
  area: "Fonoaudiologia",
  regiao: "Niterói",
  capital: "de_250_a_500",
  prazo: "ate_6_meses",
  interesse: "abrir_unidade",
  conceito: "entendi",
  lgpd: true,
}

test("só qualifica franquia dentro de 12 meses com conceito entendido", () => {
  let qualified = 0
  for (const prazo of PRAZO_OPTIONS) {
    for (const interesse of INTERESSE_OPTIONS) {
      for (const conceito of CONCEITO_OPTIONS) {
        const passed = isQualifiedLead({
          prazo: prazo.value,
          interesse: interesse.value,
          conceito: conceito.value,
        })
        if (passed) qualified += 1
        const expected =
          prazo.within12Months && interesse.franchise && conceito.understood
        assert.equal(passed, expected)
      }
    }
  }
  assert.equal(qualified, 2)
})

test("resposta incompleta ou fora da régua não qualifica", () => {
  assert.equal(isQualifiedLead({ prazo: "", interesse: "abrir_unidade", conceito: "entendi" }), false)
  assert.equal(
    isQualifiedLead({
      prazo: "ate_6_meses",
      interesse: "adquirir_operacao",
      conceito: "entendi",
    }),
    false,
  )
  assert.equal(
    isQualifiedLead({
      prazo: "mais_de_12_meses",
      interesse: "abrir_unidade",
      conceito: "entendi",
    }),
    false,
  )
  assert.equal(
    isQualifiedLead({
      prazo: "de_6_a_12_meses",
      interesse: "abrir_unidade",
      conceito: "nao_ficou_claro",
    }),
    false,
  )
})

test("celular brasileiro vira E.164", () => {
  assert.equal(toE164("(21) 98888-7777"), "+5521988887777")
  assert.equal(toE164("21988887777"), "+5521988887777")
  assert.equal(toE164("+55 21 98888-7777"), "+5521988887777")
  assert.equal(toE164("2133334444"), null)
  assert.equal(toE164("988887777"), null)
  assert.equal(formatBrazilMobile("21988887777"), "(21) 98888-7777")
})

test("validação exige nome, whatsapp, escolhas e autorização", () => {
  const valid = validateLead(qualifiedBase)
  assert.equal(valid.ok, true)
  if (valid.ok) {
    assert.equal(valid.lead.whatsapp, "+5521988887777")
    assert.equal(isQualifiedLead(valid.lead), true)
  }

  const missing = validateLead({ ...qualifiedBase, lgpd: false, nome: "Ana" })
  assert.equal(missing.ok, false)
  if (!missing.ok) {
    assert.match(missing.errors.nome ?? "", /sobrenome/)
    assert.match(missing.errors.lgpd ?? "", /autorização/)
  }
})

test("página de obrigado não chama ninguém de desqualificado", () => {
  const qualified = thankYouMessage({
    nome: "Marina",
    qualified: true,
    interesse: "abrir_unidade",
    prazo: "ate_6_meses",
    conceito: "entendi",
  })
  assert.match(qualified.title, /Marina/)
  assert.match(qualified.paragraphs.join(" "), /1 dia útil/)
  assert.match(qualified.paragraphs.join(" "), /unidade nova/)

  const acquisition = thankYouMessage({
    nome: "Paulo",
    qualified: false,
    interesse: "adquirir_operacao",
    prazo: "ate_6_meses",
    conceito: "entendi",
  })
  assert.match(acquisition.paragraphs.join(" "), /operação existente/)
  assert.doesNotMatch(acquisition.paragraphs.join(" ").toLowerCase(), /desqualific/)

  const empty = thankYouMessage(null)
  assert.match(empty.title, /Nenhum envio/)
})

test("o módulo do GTM não declara o evento padrão de lead", () => {
  const source = readFileSync(new URL("./gtm.ts", import.meta.url), "utf8")
  assert.match(source, /LEAD_QUALIFICADO_EVENT = "lead_qualificado"/)
  assert.doesNotMatch(source, /generate_lead|fbq\(|gtag\(|["']lead["']/)
})
