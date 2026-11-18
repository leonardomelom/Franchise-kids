"use client"

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

export const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const viewport = { once: true, margin: "-80px" } as const

/** Respeita "reduzir movimento" do sistema operacional em toda a página. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/** Entra de baixo para cima quando aparece na tela. */
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const staggerTags = { div: motion.div, ul: motion.ul, ol: motion.ol, dl: motion.dl }
const itemTags = { div: motion.div, li: motion.li, article: motion.article }

/** Container que revela os filhos (StaggerItem) em cascata. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: keyof typeof staggerTags
}) {
  const Tag = staggerTags[as]
  return (
    <Tag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: keyof typeof itemTags
}) {
  const Tag = itemTags[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}

/**
 * Conta de `from` até `to` quando entra na tela. O HTML do servidor já traz o
 * número final, então quem lê sem JavaScript (ou com movimento reduzido) vê o
 * valor certo.
 */
export function Counter({
  to,
  from = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  to: number
  from?: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(from, to, {
      duration,
      ease,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, from, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

/**
 * Elementos que começam com scale 0 não têm área, e o IntersectionObserver
 * não os vê entrar na tela. Por isso observamos o contêiner, que não escala.
 */

/** Marca-texto amarelo que se desenha por trás da frase. */
export function Highlight({ children, delay = 0.2 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, viewport)
  return (
    <span ref={ref} className="relative isolate inline-block whitespace-nowrap">
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[-0.15em] bottom-[0.06em] -z-10 h-[0.42em] origin-left rounded-full bg-sun/80"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.9, ease, delay }}
      />
      {children}
    </span>
  )
}

/** Faixa colorida que cresce da esquerda para a direita. */
export function GrowBar({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, viewport)
  return (
    <div ref={ref} aria-hidden="true" className="h-full w-full">
      <motion.div
        className={`origin-left ${className ?? ""}`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1, ease, delay }}
      />
    </div>
  )
}

/** Os três passos do modelo, ligados por uma linha que se desenha em sequência. */
export function ModelFlow({
  steps,
}: {
  steps: { title: string; body: string; tone: "brand" | "cyan" | "sun" }[]
}) {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })
  const tone = {
    brand: "bg-brand text-white",
    cyan: "bg-cyan text-white",
    sun: "bg-sun text-ink",
  }

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
      {/* trilho: vertical no celular, horizontal no desktop */}
      <div aria-hidden="true" className="absolute top-6 bottom-12 left-6 w-0.5 bg-border md:top-6 md:right-[16%] md:bottom-auto md:left-[16%] md:h-0.5 md:w-auto" />
      <motion.div
        aria-hidden="true"
        className="absolute top-6 bottom-12 left-6 w-0.5 origin-top bg-gradient-to-b from-brand via-cyan to-sun md:hidden"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-6 right-[16%] left-[16%] hidden h-0.5 origin-left bg-gradient-to-r from-brand via-cyan to-sun md:block"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          className="relative grid content-start grid-cols-[3rem_1fr] gap-4 md:grid-cols-1 md:justify-items-center md:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease, delay: 0.2 + index * 0.5 }}
        >
          <motion.span
            className={`relative z-10 flex size-12 items-center justify-center rounded-full text-lg font-extrabold shadow-lg ring-8 ring-white ${tone[step.tone]}`}
            initial={{ scale: 0.4 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 + index * 0.5 }}
          >
            {index + 1}
          </motion.span>
          <div>
            <p className="font-serif text-2xl text-ink">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-[16rem]">
              {step.body}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

/** Cabeçalho que ganha fundo e sombra depois que a página rola. */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 border-b border-transparent bg-white/0 transition-all duration-500 data-[scrolled=true]:border-sky data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-[0_8px_30px_-12px_rgb(2_119_189/0.25)] data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  )
}
