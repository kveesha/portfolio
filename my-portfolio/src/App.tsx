import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import Home from "./pages/Home"
import SceneCanvas from "./components/SceneCanvas"
import Cursor from "./components/Cursor"
import ScrollIndicator from "@/components/ScrollIndicator"
import SideMenu from "@/components/SideMenu"
import MenuButton from "@/components/MenuButton"

function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="text-center"
      >
        <div
          style={{ fontFamily: '"Bitcount Single", monospace' }}
          className="text-[44px] md:text-[72px] tracking-[0.18em] text-white"
        >
          KAVEESHA
        </div>

        <div className="mt-5 h-[2px] w-36 overflow-hidden bg-white/15 mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "140%" }}
            transition={{ repeat: Infinity, duration: 1.15, ease: "linear" }}
            className="h-full w-1/2 bg-emerald-400"
          />
        </div>

        <p className="mt-5 text-xs tracking-[0.28em] text-white/55">
          LOADING
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // lock scroll during loader
    document.body.style.overflow = loaded ? "auto" : "hidden"

    // simulate load (feel like reference site)
    if (!loaded) {
      const t = setTimeout(() => setLoaded(true), 1500)
      return () => clearTimeout(t)
    }
  }, [loaded])

  return (
    <>
      <Loader done={loaded} />

      {loaded && (
        <AnimatePresence mode="wait">
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <MenuButton onClick={() => setOpen(true)} />
            <SideMenu open={open} onClose={() => setOpen(false)} />

            <SceneCanvas />
            <Cursor />
            <ScrollIndicator />

            <Home />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
