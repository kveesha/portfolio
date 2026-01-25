import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const p = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(p)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="fixed right-3 top-1/2 z-[55] h-40 -translate-y-1/2">
      {/* track */}
      <div className="relative h-full w-[3px] rounded-full bg-white/10">
        {/* progress */}
        <motion.div
          className="absolute bottom-0 w-full rounded-full bg-emerald-400"
          style={{ height: `${Math.max(progress * 100, 3)}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
