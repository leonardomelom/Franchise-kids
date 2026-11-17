"use client"

import { useRef, useState, type FormEvent, type ReactNode } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { pushLeadQualificado, type LeadQualificadoPayload } from "@/lib/gtm"
import { formatBrazilMobile } from "@/lib/phone"
import {
  CAPITAL_OPTIONS,
  CONCEPT_STATEMENT,
  CONCEITO_OPTIONS,
  INTERESSE_OPTIONS,
  PRAZO_OPTIONS,
  isQualifiedLead,
} from "@/lib/qualification"
import { splitName, validateLead, type LeadErrors } from "@/lib/validation"
import { cn } from "cn"

type FormState = {
  nome: string
  whatsapp: string
  area: string
  regiao: string
  capital: string
  prazo: string
  interesse: string
  conceito: string
  lgpd: boolean
  company_site: string
}

const initialState: FormState = {
  nome: "",
  whatsapp: "",
  area: "",
  regiao: "",
  capital: "",
  prazo: "",
  interesse: "",
  conceito: "",
  lgpd: false,
  company_site: "",
}

export function LeadForm() {
  const router = useRouter()
  const lock = useRef(false)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (lock.current) return

    const local = validateLead(form)
    if (!local.ok) {
      setErrors(local.errors)
      setMessage("Faltam respostas para enviar.")
      window.setTimeout(() => {
        document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
      }, 0)
      return
    }

    lock.current = true
    setSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = (await response.json()) as {
        ok?: boolean
        id?: string
        qualified?: boolean
        message?: string
        errors?: LeadErrors
      }

      if (!response.ok || !data.ok || !data.id) {
        setErrors(data.errors ?? {})
        setMessage(data.message || "Não consegui enviar agora. Tente de novo em instantes.")
        lock.current = false
        setSubmitting(false)
        return
      }

      const qualified = data.qualified === true && isQualifiedLead(local.lead)
      const names = splitName(local.lead.nome)
      let payload: LeadQualificadoPayload | undefined

      if (qualified && (local.lead.prazo === "ate_6_meses" || local.lead.prazo === "de_6_a_12_meses")) {
        payload = {
          event_id: data.id,
          form_id: "franquia_so_criancas",
          lead_status: "qualificado",
          prazo: local.lead.prazo,
          interesse: "abrir_unidade",
          entendeu_conceito: true,
          capital: local.lead.capital,
          regiao: local.lead.regiao,
          area_atuacao: local.lead.area,
          user_data: {
            first_name: names.first_name,
            last_name: names.last_name,
            phone_number: local.lead.whatsapp,
          },
        }
        pushLeadQualificado(payload)
      }

      const receipt = new URLSearchParams({
        nome: names.first_name,
        interesse: local.lead.interesse,
        prazo: local.lead.prazo,
        conceito: local.lead.conceito,
        regiao: local.lead.regiao,
        q: qualified ? "1" : "0",
      })
      router.push(`/obrigado?${receipt.toString()}`)
    } catch {
      setMessage("Não consegui enviar agora. Tente de novo em instantes.")
      lock.current = false
      setSubmitting(false)
    }
  }

  return (
    <form id="qualificador-franquia" className="grid gap-7" onSubmit={onSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Site
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.company_site}
            onChange={(event) => update("company_site", event.target.value)}
            name="company_site"
          />
        </label>
      </div>

      <Field id="nome" label="Nome e sobrenome" error={errors.nome}>
        <Input
          id="nome"
          name="nome"
          autoComplete="name"
          placeholder="Nome e sobrenome"
          value={form.nome}
          aria-invalid={Boolean(errors.nome)}
          onChange={(event) => update("nome", event.target.value)}
        />
      </Field>

      <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp}>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(21) 99999-9999"
          value={form.whatsapp}
          aria-invalid={Boolean(errors.whatsapp)}
          onChange={(event) => update("whatsapp", formatBrazilMobile(event.target.value))}
        />
      </Field>

      <Field
        id="area"
        label="Formação ou área de atuação"
        error={errors.area}
      >
        <Input
          id="area"
          name="area"
          placeholder="Ex.: fonoaudióloga com consultório, pediatra, gestora"
          value={form.area}
          aria-invalid={Boolean(errors.area)}
          onChange={(event) => update("area", event.target.value)}
        />
      </Field>

      <Field id="regiao" label="Região de interesse" error={errors.regiao}>
        <Input
          id="regiao"
          name="regiao"
          placeholder="Cidade ou região"
          value={form.regiao}
          aria-invalid={Boolean(errors.regiao)}
          onChange={(event) => update("regiao", event.target.value)}
        />
      </Field>

      <ChoiceField
        legend="Capital disponível para investimento"
        name="capital"
        value={form.capital}
        error={errors.capital}
        options={CAPITAL_OPTIONS}
        onChange={(value) => update("capital", value)}
      />

      <ChoiceField
        legend="Prazo pretendido para abrir"
        name="prazo"
        value={form.prazo}
        error={errors.prazo}
        options={PRAZO_OPTIONS}
        onChange={(value) => update("prazo", value)}
      />

      <ChoiceField
        legend="O que te interessa?"
        name="interesse"
        value={form.interesse}
        error={errors.interesse}
        options={INTERESSE_OPTIONS}
        onChange={(value) => update("interesse", value)}
      />

      <fieldset className="grid gap-3" data-invalid={errors.conceito ? "true" : undefined}>
        <legend className="text-sm font-medium">Você entendeu esse conceito?</legend>
        <blockquote className="border-l-2 border-clay py-1 pl-4 text-sm leading-relaxed text-foreground">
          {CONCEPT_STATEMENT}
        </blockquote>
        <RadioGroup
          name="conceito"
          value={form.conceito}
          onValueChange={(value) => update("conceito", value)}
          className="grid gap-2 sm:grid-cols-2"
          aria-invalid={Boolean(errors.conceito)}
        >
          {CONCEITO_OPTIONS.map((option) => (
            <ChoiceCard key={option.value} selected={form.conceito === option.value}>
              <RadioGroupItem value={option.value} />
              <span className="text-sm font-medium">{option.label}</span>
            </ChoiceCard>
          ))}
        </RadioGroup>
        {errors.conceito ? <FieldError>{errors.conceito}</FieldError> : null}
      </fieldset>

      <div className="grid gap-2" data-invalid={errors.lgpd ? "true" : undefined}>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <Checkbox
            checked={form.lgpd}
            onCheckedChange={(checked) => update("lgpd", checked)}
            aria-invalid={Boolean(errors.lgpd)}
            className="mt-0.5"
          />
          <span>
            Autorizo a Só Crianças a usar meu nome e meu WhatsApp para falar sobre franquia ou
            aquisição de operação.
          </span>
        </label>
        {errors.lgpd ? <FieldError>{errors.lgpd}</FieldError> : null}
      </div>

      {message ? (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      ) : null}

      <Button type="submit" size="cta" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Enviando…" : "Quero conhecer o modelo"}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Sem compromisso de assinatura. Condições de investimento entram na etapa de proposta, em
        documento formal.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
}

function ChoiceField({
  legend,
  name,
  value,
  error,
  options,
  onChange,
}: {
  legend: string
  name: string
  value: string
  error?: string
  options: readonly { value: string; label: string; hint?: string }[]
  onChange: (value: string) => void
}) {
  return (
    <fieldset className="grid gap-3" data-invalid={error ? "true" : undefined}>
      <legend className="text-sm font-medium">{legend}</legend>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className="grid gap-2"
        aria-invalid={Boolean(error)}
      >
        {options.map((option) => (
          <ChoiceCard key={option.value} selected={value === option.value}>
            <RadioGroupItem value={option.value} />
            <span>
              <span className="block text-sm font-medium">{option.label}</span>
              {option.hint ? (
                <span className="mt-0.5 block text-sm text-muted-foreground">{option.hint}</span>
              ) : null}
            </span>
          </ChoiceCard>
        ))}
      </RadioGroup>
      {error ? <FieldError>{error}</FieldError> : null}
    </fieldset>
  )
}

function ChoiceCard({
  selected,
  children,
}: {
  selected: boolean
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border bg-card px-3 py-3 transition-colors",
        selected ? "border-brand bg-sky" : "border-border hover:border-brand/40",
      )}
    >
      {children}
    </label>
  )
}

function FieldError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm text-destructive">
      {children}
    </p>
  )
}
