"use client"

import { useEffect, useState } from "react"

import { ConhecerCta } from "@/components/conhecer-cta"

export function StickyCta() {
  const [covered, setCovered] = useState(true)

  useEffect(() => {
    const nodes = ["hero-cta", "conhecer"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (nodes.length === 0) return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setCovered(visible.size > 0)
      },
      { threshold: 0.5 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (covered) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper/95 p-3 backdrop-blur md:hidden">
      <ConhecerCta />
    </div>
  )
}
