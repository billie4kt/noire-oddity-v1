"use client"

import { useEffect, useState } from "react"

export function useCappedParallax(maxOffset = 28, multiplier = 0.08) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const next = Math.max(-maxOffset, Math.min(maxOffset, window.scrollY * multiplier))
      setOffset(next)
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [maxOffset, multiplier])

  return offset
}
