import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  isQualifiedLead,
  qualificationFlags,
  type QualificationFlags,
} from "@/lib/qualification"
import type { LeadInput } from "@/lib/validation"

export type StoredLead = LeadInput & {
  id: string
  createdAt: string
  qualified: boolean
  gtm_event: "lead_qualificado" | null
  qualification: QualificationFlags
}

const filePath = path.join(process.cwd(), "data", "leads.json")

let chain: Promise<void> = Promise.resolve()

export function saveLead(lead: LeadInput & { id: string }): Promise<StoredLead> {
  const qualification = qualificationFlags(lead)
  const qualified = isQualifiedLead(lead)
  const stored: StoredLead = {
    ...lead,
    createdAt: new Date().toISOString(),
    qualification,
    qualified,
    gtm_event: qualified ? "lead_qualificado" : null,
  }

  const job = chain.then(async () => {
    await persist(stored)
    return stored
  })
  chain = job.then(
    () => undefined,
    () => undefined,
  )
  return job
}

async function persist(lead: StoredLead) {
  await mkdir(path.dirname(filePath), { recursive: true })
  let current: StoredLead[] = []
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as unknown
    if (Array.isArray(parsed)) current = parsed as StoredLead[]
  } catch {
    current = []
  }
  current.push(lead)
  await writeFile(filePath, JSON.stringify(current, null, 2))
  console.info("[leads] stored", { id: lead.id, qualified: lead.qualified })
  await sendWebhook(lead)
}

async function sendWebhook(lead: StoredLead) {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url || !/^https?:\/\//.test(url)) return

  const headers: Record<string, string> = {
    "content-type": "application/json",
  }
  if (process.env.LEAD_WEBHOOK_SECRET) {
    headers.authorization = `Bearer ${process.env.LEAD_WEBHOOK_SECRET}`
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) {
      console.error("[leads] webhook failed", { id: lead.id, status: response.status })
    }
  } catch {
    console.error("[leads] webhook failed", { id: lead.id })
  }
}
