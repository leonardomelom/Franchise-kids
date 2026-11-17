import type { Metadata } from "next"
import { Suspense } from "react"

import { Obrigado } from "@/components/obrigado"

export const metadata: Metadata = {
  title: "Recebemos suas respostas",
  robots: { index: false, follow: false },
}

export default function Page({ searchParams }: PageProps<"/obrigado">) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-paper" />}>
      <Obrigado searchParams={searchParams} />
    </Suspense>
  )
}
