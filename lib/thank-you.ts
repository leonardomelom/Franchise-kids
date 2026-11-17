const SLA =
  "Em até 1 dia útil, alguém do time comercial chama você no WhatsApp informado."

export type ThankYouContent = {
  title: string
  paragraphs: string[]
}

export function thankYouMessage(input: {
  nome?: string
  interesse?: string
  prazo?: string
  conceito?: string
  qualified?: boolean
} | null): ThankYouContent {
  if (!input) {
    return {
      title: "Nenhum envio nesta sessão.",
      paragraphs: [
        "Se você ainda não respondeu o formulário, volte para a página e conte o que você procura.",
      ],
    }
  }

  const title = input.nome
    ? `${input.nome}, recebemos suas respostas.`
    : "Recebemos suas respostas."

  if (input.qualified) {
    return {
      title,
      paragraphs: [
        SLA,
        "A conversa é sobre abrir uma unidade nova: como a operação funciona, a praça e as condições formais. Nada é assinado nesta etapa.",
      ],
    }
  }

  if (input.interesse === "adquirir_operacao") {
    return {
      title,
      paragraphs: [
        SLA,
        "Você marcou interesse em adquirir uma operação existente. A conversa segue por esse caminho, separado da abertura de uma unidade nova.",
      ],
    }
  }

  if (input.conceito === "nao_ficou_claro") {
    return {
      title,
      paragraphs: [
        SLA,
        "Na conversa, o time percorre o modelo com calma: a criança entra por uma queixa pediátrica e a unidade encaminha, no mesmo endereço, para a terapia.",
      ],
    }
  }

  if (input.prazo === "mais_de_12_meses" || input.prazo === "ainda_avaliando") {
    return {
      title,
      paragraphs: [
        SLA,
        "Seu prazo ainda não está dentro de 12 meses. A conversa serve para você decidir com o modelo na mesa, sem tratar a abertura como imediata.",
      ],
    }
  }

  return {
    title,
    paragraphs: [
      SLA,
      "Você ainda está avaliando o caminho. A conversa organiza se faz sentido abrir uma unidade, adquirir uma operação ou esperar.",
    ],
  }
}
