import { saveLead } from "@/lib/leads"
import { validateLead } from "@/lib/validation"

const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < windowMs)
  if (recent.length >= 8) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const ip = forwarded || "local"
  if (rateLimited(ip)) {
    return Response.json(
      {
        ok: false,
        message: "Muitas tentativas. Espere alguns minutos e tente de novo.",
      },
      { status: 429, headers: { "cache-control": "no-store" } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { ok: false, message: "Não consegui ler o formulário." },
      { status: 400, headers: { "cache-control": "no-store" } },
    )
  }

  if (
    body &&
    typeof body === "object" &&
    "company_site" in body &&
    String((body as { company_site?: unknown }).company_site ?? "").trim()
  ) {
    return Response.json(
      { ok: true, qualified: false, id: "received" },
      { headers: { "cache-control": "no-store" } },
    )
  }

  const result = validateLead(body)
  if (!result.ok) {
    return Response.json(
      { ok: false, errors: result.errors },
      { status: 422, headers: { "cache-control": "no-store" } },
    )
  }

  try {
    const stored = await saveLead({ ...result.lead, id: crypto.randomUUID() })
    return Response.json(
      { ok: true, id: stored.id, qualified: stored.qualified },
      { headers: { "cache-control": "no-store" } },
    )
  } catch {
    return Response.json(
      {
        ok: false,
        message: "Não consegui registrar agora. Tente de novo em instantes.",
      },
      { status: 500, headers: { "cache-control": "no-store" } },
    )
  }
}
