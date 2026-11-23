# Franquia Só Crianças

Landing page para quem avalia abrir uma unidade ou adquirir uma operação da Só Crianças. A página apresenta o modelo multidisciplinar em operação desde 1995 e qualifica o contato antes de enviar conversão para mídia.

## Rodar localmente

```bash
npm install
npm run dev
```

A aplicação sobe em [http://127.0.0.1:3847](http://127.0.0.1:3847).

```bash
npm test
npm run lint
```

## O evento de mídia

O formulário grava todo mundo que responde. O Google Tag Manager só recebe conversão quando as duas respostas abaixo são verdadeiras ao mesmo tempo:

1. Prazo para abrir em até 12 meses (`Até 6 meses` ou `De 6 a 12 meses`).
2. A pessoa confirma que entendeu o conceito: a família entra por uma queixa pediátrica e a unidade encaminha, no mesmo endereço, para a terapia recorrente.

O evento se chama `lead_qualificado`. A página não dispara `lead`, `generate_lead` nem o evento padrão de lead do Meta.

A página toda é sobre abrir uma unidade nova, então o formulário não pergunta o tipo de interesse. Quem marca prazo acima de 12 meses, “ainda avaliando” ou “ainda não ficou claro” segue para o comercial, sem evento de mídia. A página de obrigado muda o próximo passo conforme essa resposta.

### Configurar o GTM

1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_GTM_ID` com o container, no formato `GTM-XXXX`.
3. Reinicie o `npm run dev`. Sem o ID, o `dataLayer` ainda recebe o evento, mas nenhuma tag sai.

No container, crie um acionador de evento personalizado com o nome exato `lead_qualificado`. Aponte para ele a conversão do Google Ads e o evento do Meta. Não crie um acionador de envio de formulário nesta página: o formulário `form-franquia-so-criancas` chama a API por conta própria, e um acionador genérico de formulário pode marcar gente que não passou na régua.

Campos úteis no `dataLayer`:

- `event_id` para deduplicar, se depois existir uma API de conversões
- `prazo`, `capital`, `regiao`, `area_atuacao`
- `user_data.phone_number` em E.164, `user_data.email`, `user_data.first_name` e `user_data.last_name`, para conversão avançada. O hash fica na tag do GTM.

## Para onde vai o contato

Cada envio válido fica em `data/leads.json` (pasta ignorada pelo git) e, se `LEAD_WEBHOOK_URL` estiver definido, segue em POST JSON para esse endereço. O corpo inclui `qualified` e `gtm_event` (`lead_qualificado` ou `null`). Se o destino exigir segredo, use `LEAD_WEBHOOK_SECRET`.

Na Vercel o disco é somente leitura, então `data/leads.json` não é gravado. A captação fica com o RD Station (captura automática de formulários); o webhook é opcional.

### RD Station

O script de monitoramento da conta Wings Company é carregado em todas as páginas (`app/layout.tsx`). O formulário tem `id` e `name` `form-franquia-so-criancas`, que é o identificador a usar na conversão do RD. Os campos chegam com estes nomes: `nome`, `email`, `whatsapp` (celular com DDD), `area`, `regiao`, `capital`, `prazo`, `conceito` e `lgpd`.

## Antes de veicular anúncio

A página não publica investimento, taxa, faturamento, payback nem prazo de retorno. Isso fica para a proposta formal. Antes de ligar mídia, confirme:

- se a Circular de Oferta de Franquia já existe, porque sem ela o comercial não avança
- se o credenciamento é apoio ou se a rede de fato acelera o processo. A página fala só em apoio
- se as faixas de capital do formulário combinam com o que o comercial quer ouvir
- quem atende e se o retorno em até 1 dia útil, escrito na página, é o prazo real
