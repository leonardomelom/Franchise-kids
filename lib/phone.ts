export function phoneDigits(input: string): string {
  let digits = input.replace(/\D/g, "")
  if (digits.startsWith("55") && digits.length > 11) {
    digits = digits.slice(2)
  }
  return digits.slice(0, 11)
}

export function formatBrazilMobile(input: string): string {
  const digits = phoneDigits(input)
  if (digits.length === 0) return ""
  if (digits.length < 3) return `(${digits}`
  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)
  if (rest.length <= 4) return `(${ddd}) ${rest}`
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
}

export function toE164(input: string): string | null {
  const digits = phoneDigits(input)
  if (digits.length !== 11 || digits[2] !== "9") return null
  const ddd = Number(digits.slice(0, 2))
  if (!Number.isInteger(ddd) || ddd < 11 || ddd > 99) return null
  return `+55${digits}`
}
