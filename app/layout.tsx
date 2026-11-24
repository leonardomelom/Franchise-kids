import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import Script from "next/script"

import { CookieNotice } from "@/components/cookie-notice"

import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Franquia Só Crianças | 30 anos de clínica infantil",
    template: "%s | Só Crianças",
  },
  description:
    "A Só Crianças abre unidades franqueadas. Modelo multidisciplinar validado desde 1995, com três unidades próprias em operação no Rio de Janeiro.",
  openGraph: {
    title: "Você já sabe atender. O que falta é a clínica em volta de você.",
    description:
      "Modelo multidisciplinar validado desde 1995, com três unidades próprias em operação no Rio de Janeiro.",
    locale: "pt_BR",
    type: "website",
  },
}

function gtmId(): string {
  const value = process.env.NEXT_PUBLIC_GTM_ID ?? ""
  return /^GTM-[A-Z0-9]+$/.test(value) ? value : ""
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const id = gtmId()

  return (
    <html lang="pt-BR" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        {id ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {children}
        <CookieNotice />
        <Script id="datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];`}
        </Script>
        {id ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
          </Script>
        ) : null}
        {/* RD Station (conta Wings Company): monitoramento e captura automática do
            formulário "form-franquia-so-criancas". */}
        <Script
          id="rd-station-loader"
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/56230167-5941-403e-bf48-cfe35af9f53a-loader.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
