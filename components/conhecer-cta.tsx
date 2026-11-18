import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

const CTA_LABEL = "Quero conhecer o modelo"

export function ConhecerCta({
  className,
  href = "#conhecer",
}: {
  className?: string
  href?: string
}) {
  return (
    <Button
      nativeButton={false}
      render={<a href={href} />}
      size="cta"
      className={cn(
        "relative w-full overflow-hidden shadow-[0_12px_28px_-10px_rgb(2_119_189/0.7)] hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_18px_36px_-12px_rgb(2_119_189/0.8)] sm:w-auto",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      {CTA_LABEL}
      <ArrowRight
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/button:translate-x-1"
      />
    </Button>
  )
}

export { CTA_LABEL }
