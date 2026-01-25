import { motion } from "framer-motion"

export default function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div
          style={{ fontFamily: '"Bitcount Single", monospace' }}
          className="text-[48px] md:text-[72px] tracking-[0.15em] text-white"
        >
          KAVEESHA
        </div>

        <div className="mt-4 h-[2px] w-32 overflow-hidden bg-white/20 mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="h-full w-1/2 bg-emerald-400"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
