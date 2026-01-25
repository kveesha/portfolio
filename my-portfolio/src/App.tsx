import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import SceneCanvas from './components/SceneCanvas'
import Cursor from './components/Cursor'
import ScrollIndicator from "@/components/ScrollIndicator"
import SideMenu from "@/components/SideMenu"
import MenuButton from "@/components/MenuButton"
import { useState } from "react"


export default function App() {
  const [open, setOpen] = useState(false)
  return (

    
    <AnimatePresence mode="wait">
      <motion.div
        key="home"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <MenuButton onClick={() => setOpen(true)} />
        <SideMenu open={open} onClose={() => setOpen(false)} />
        <SceneCanvas />
        <Cursor />
        <ScrollIndicator />
        <Home />
      </motion.div>
    </AnimatePresence>
  )
}
