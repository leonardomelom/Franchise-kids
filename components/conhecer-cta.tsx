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
      className={cn("w-full sm:w-auto", className)}
    >
      {CTA_LABEL}
    </Button>
  )
}

export { CTA_LABEL }
