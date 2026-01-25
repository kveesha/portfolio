import { motion, type Variants } from 'framer-motion'

const page: Variants = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -14, filter: 'blur(10px)' },
}

export default function PageEnter({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={page}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
