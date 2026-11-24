"use client"

import { Cookie } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { ease } from "@/components/motion"

const STORAGE_KEY = "sc-cookies-ok"
const ONE_YEAR = 60 * 60 * 24 * 365

function alreadyAccepted(): boolean {
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") return true
  } catch {
    // navegação privada ou armazenamento bloqueado: confere o cookie abaixo
  }
  return document.cookie.split("; ").some((item) => item.startsWith("cookieconsent_status="))
}

function remember() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1")
  } catch {
    // sem armazenamento local, o cookie abaixo basta
  }
  // Mesmo cookie que o aviso do RD Station (biblioteca cookieconsent) usa.
  // Assim o RD também considera o aviso aceito e não tenta mostrar o dele.
  document.cookie = `cookieconsent_status=dismiss; path=/; max-age=${ONE_YEAR}; SameSite=Lax`
}

/**
 * Aviso de cookies no visual da Só Crianças. Substitui o aviso padrão do RD
 * Station, que fica escondido pelo CSS em globals.css (.cc-window).
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alreadyAccepted()) return
    // Espera um instante para não disputar atenção com a entrada do topo da página.
    const timer = window.setTimeout(() => setVisible(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  function accept() {
    remember()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="cookie-notice"
          role="region"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-xl"
        >
          <div className="flex flex-col gap-4 rounded-3xl border border-brand/10 bg-white/95 p-5 text-ink shadow-[0_24px_48px_-16px_rgb(2_119_189/0.45)] backdrop-blur sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Cookie className="size-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-foreground/80">
                Usamos cookies para melhorar sua experiência e entender como o site é usado. Ao
                continuar navegando, você concorda com o uso de cookies.
              </p>
            </div>
            <button
              type="button"
              onClick={accept}
              className="h-10 shrink-0 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-[0_10px_22px_-10px_rgb(2_119_189/0.8)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Ok, entendi
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
