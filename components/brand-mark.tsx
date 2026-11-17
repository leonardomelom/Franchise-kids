import Image from "next/image"

export function BrandMark({
  className = "h-12 w-auto sm:h-14",
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/logo-so-criancas.png"
      alt="Só Crianças, clínica de saúde infantil"
      width={1772}
      height={591}
      priority={priority}
      className={className}
    />
  )
}
