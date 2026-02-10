import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

// Finds the element that is actually scrolling.
// 1) If document scrolls => use documentElement
// 2) Else, try common app containers (#root, main, body children) that have overflow + scrollable height
function getScrollElement(): HTMLElement {
  const doc = document.documentElement

  // If the document can scroll, use it
  const docMax = doc.scrollHeight - doc.clientHeight
  if (docMax > 2) return doc

  // Otherwise, try to find a scroll container (common in SPA layouts)
  const candidates: (HTMLElement | null)[] = [
    document.querySelector("#app-scroll") as HTMLElement | null,
    document.querySelector("main") as HTMLElement | null,
    document.querySelector("#root") as HTMLElement | null,
    document.body,
  ]

  for (const el of candidates) {
    if (!el) continue
    const style = getComputedStyle(el)
    const overflowY = style.overflowY
    const canScroll = el.scrollHeight - el.clientHeight > 2
    const isScrollable =
      overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay"

    if (canScroll && isScrollable) return el
  }

  // Fallback
  return doc
}

export default function ScrollIndicator() {
  const progress = useMotionValue(0)
  const smooth = useSpring(progress, { stiffness: 220, damping: 40, mass: 0.6 })

  useEffect(() => {
    let el = getScrollElement()

    const getMaxScroll = () => Math.max(1, el.scrollHeight - el.clientHeight)

    const update = () => {
      const y = el === document.documentElement ? document.documentElement.scrollTop : el.scrollTop
      const max = getMaxScroll()
      progress.set(clamp01(y / max))
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    // Initial
    update()

    // Listen on the correct element
    el.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    // If layout changes and scroll element changes (menu/loader), re-detect once after paint
    const t = window.setTimeout(() => {
      const next = getScrollElement()
      if (next !== el) {
        el.removeEventListener("scroll", onScroll)
        el = next
        el.addEventListener("scroll", onScroll, { passive: true })
        onScroll()
      }
    }, 0)

    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [progress])

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-[60] hidden h-[220px] -translate-y-1/2 md:block">
      <div className="relative h-full w-[2px] overflow-hidden rounded-full bg-white/15">
        <motion.div
          style={{ scaleY: smooth, transformOrigin: "top" }}
          className="absolute inset-0 rounded-full bg-emerald-400/90"
        />
      </div>
    </div>
  )
}
