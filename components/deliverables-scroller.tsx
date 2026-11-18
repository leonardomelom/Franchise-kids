"use client"

import {
  ChartColumn,
  ClipboardList,
  GraduationCap,
  Network,
  Palette,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useRef, useState } from "react"

import { ease } from "@/components/motion"

/** Um ícone por item, na mesma ordem da lista de entregas. */
const ICONS: LucideIcon[] = [Network, ClipboardList, ShieldCheck, GraduationCap, Palette, ChartColumn]

/** Quanto de rolagem (em altura de tela) cada item ocupa enquanto a seção fica parada. */
const STEP_VH = 45

/**
 * Seção "presa" na tela: a página para de andar enquanto a rolagem troca o
 * item em destaque. Cada item entra por baixo e empilha os anteriores atrás,
 * como um baralho. A barra de progresso acompanha a rolagem em tempo real.
 */
export function DeliverablesScroller({ items, note }: { items: string[]; note: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length)))
    setActive((current) => (current === next ? current : next))
  })

  const total = String(items.length).padStart(2, "0")

  return (
    <div ref={ref} className="relative" style={{ height: `calc(100svh + ${items.length * STEP_VH}vh)` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-16 sm:pt-20">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
          {/* Coluna da esquerda: título, contador e a lista com o item ativo em destaque */}
          <div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-ink md:text-5xl">
              O que a franqueada recebe.
            </h2>

            <div className="mt-5 flex items-center gap-4 md:hidden">
              <span className="font-serif text-sm text-brand tabular-nums">
                {String(active + 1).padStart(2, "0")} / {total}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full origin-left rounded-full bg-brand"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>

            {/* No celular a lista fica só para leitor de tela; quem vê usa o contador acima. */}
            <ol className="sr-only md:hidden">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <div className="relative mt-10 hidden md:block">
              <div aria-hidden="true" className="absolute top-1 bottom-1 left-0 w-0.5 rounded-full bg-border" />
              <motion.div
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-0 w-0.5 origin-top rounded-full bg-brand"
                style={{ scaleY: scrollYProgress }}
              />
              <ol className="grid gap-3 pl-6">
                {items.map((item, index) => (
                  <li
                    key={item}
                    aria-current={index === active ? "step" : undefined}
                    className={`flex gap-3 text-sm leading-snug transition-colors duration-500 ${index === active ? "font-semibold text-ink" : index < active ? "text-foreground/60" : "text-muted-foreground/60"}`}
                  >
                    <span className={`font-serif tabular-nums transition-colors duration-500 ${index <= active ? "text-brand" : ""}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Coluna da direita: o baralho de cards */}
          <div>
            <div aria-hidden="true" className="relative mt-8 h-[13.5rem] sm:h-[19rem] md:mt-0">
              {items.map((item, index) => {
                const Icon = ICONS[index % ICONS.length]
                const depth = active - index
                const state =
                  depth < 0
                    ? { y: "35%", scale: 1, opacity: 0 }
                    : depth === 0
                      ? { y: "0%", scale: 1, opacity: 1 }
                      : depth === 1
                        ? { y: "-9%", scale: 0.93, opacity: 0.55 }
                        : depth === 2
                          ? { y: "-18%", scale: 0.86, opacity: 0.25 }
                          : { y: "-26%", scale: 0.8, opacity: 0 }

                return (
                  <motion.div
                    key={item}
                    className="absolute inset-0 origin-top"
                    style={{ zIndex: index }}
                    initial={false}
                    animate={state}
                    transition={{ duration: 0.7, ease }}
                  >
                    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-brand/10 bg-white p-6 shadow-[0_30px_60px_-28px_rgb(2_119_189/0.45)] sm:p-9">
                      <div
                        aria-hidden="true"
                        className="absolute -top-20 -right-20 size-56 rounded-full bg-sky blur-2xl"
                      />
                      <div className="relative flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand sm:size-14 text-white shadow-[0_12px_24px_-10px_rgb(2_119_189/0.7)]">
                          <Icon className="size-6 sm:size-7" aria-hidden="true" />
                        </span>
                        <span className="font-serif text-5xl text-brand/15 tabular-nums sm:text-6xl">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="relative max-w-md font-serif text-xl leading-snug text-ink sm:text-3xl">
                        {item}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:mt-8">{note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
