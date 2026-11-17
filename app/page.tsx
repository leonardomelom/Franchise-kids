import type { Metadata } from "next"

import { HomePage } from "@/components/home-page"

export const metadata: Metadata = {
  title: "Franquia Só Crianças | 30 anos de clínica infantil",
  description:
    "A Só Crianças abre unidades franqueadas. Modelo multidisciplinar validado desde 1995, com três unidades próprias em operação no Rio de Janeiro.",
}

export default function Page() {
  return <HomePage />
}
