import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const INTERACTIVE =
  'a,button,[role="button"],input,textarea,select,summary,label,[data-cursor="pointer"]'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function angleLerp(a: number, b: number, t: number) {
  // interpolate angles without snapping across -180/180
  const diff = ((b - a + 540) % 360) - 180
  return a + diff * t
}

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const leftMV = useMotionValue(0)
  const topMV = useMotionValue(0)

  const left = useSpring(leftMV, { stiffness: 780, damping: 62, mass: 0.35 })
  const top = useSpring(topMV, { stiffness: 780, damping: 62, mass: 0.35 })

  const last = useRef({ x: 0, y: 0, t: performance.now() })
  const rot = useRef(0)
  const [angle, setAngle] = useState(0)
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    const reset = () => {
      setVisible(false)
      setIsPointer(false)
      last.current.t = performance.now()
      setSpeed(0)
    }

    const onMove = (e: PointerEvent) => {
      const cx = e.clientX
      const cy = e.clientY

      leftMV.set(cx)
      topMV.set(cy)

      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      setIsPointer(!!target?.closest(INTERACTIVE))

      const now = performance.now()
      let dt = now - last.current.t
      dt = clamp(dt, 16, 60)

      const dx = cx - last.current.x
      const dy = cy - last.current.y
      last.current = { x: cx, y: cy, t: now }

      const s = clamp(Math.hypot(dx, dy) / dt, 0, 1.8)
      setSpeed(s)

      let targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI
      if (!isFinite(targetAngle)) targetAngle = rot.current

      rot.current = angleLerp(rot.current, targetAngle, 0.18)
      setAngle(rot.current)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("blur", reset)

    const onVis = () => {
      if (document.hidden) reset()
    }
    document.addEventListener("visibilitychange", onVis)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("blur", reset)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [leftMV, topMV, visible])

  if (!visible) return null

  const commonPos = {
    left,
    top,
    transform: "translate(-20%, -15%)", // cursor-like offset
  } as const

  const hoverLift = isPointer ? -2 : 0

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* soft shadow */}
      <motion.div
        style={commonPos}
        className="absolute"
        animate={{ opacity: 0.22, filter: "blur(6px)" }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "20px solid rgba(0,0,0,0.9)",
            transformOrigin: "10px 3px",
          }}
          animate={{
            rotate: angle + 90,
            scale: 1 + speed * 0.08,
            y: hoverLift + 2,
          }}
          transition={{ type: "spring", stiffness: 520, damping: 42 }}
        />
      </motion.div>

      {/* main triangle */}
      <motion.div style={commonPos} className="absolute">
        <motion.div
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "20px solid rgba(245,245,245,0.92)",
            transformOrigin: "10px 3px",
          }}
          animate={{
            rotate: angle + 90,
            scale: isPointer ? 0.92 : 1 + speed * 0.08,
            y: hoverLift,
            opacity: isPointer ? 0.98 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 540, damping: 40 }}
        />
      </motion.div>
    </div>
  )
}
