import { motion, type Variants } from 'framer-motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-14 overflow-x-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-12"
      >
        {/* HERO TEXT */}
        <motion.div variants={item} className="md:col-span-8">
          <motion.h1 variants={item} className="leading-[0.95]">
            <span
              style={{ fontFamily: '"Bitcount Single", monospace' }}
              className="
                block
                text-[40px] sm:text-[56px] md:text-[90px]
                text-emerald-400
                tracking-[0.06em] sm:tracking-[0.10em] md:tracking-[0.12em]
                whitespace-nowrap
              "
            >
              FRONTEND
            </span>

            <span
              style={{ fontFamily: '"Bitcount Single", monospace' }}
              className="
                block
                text-[40px] sm:text-[56px] md:text-[90px]
                text-white
                tracking-[0.06em] sm:tracking-[0.10em] md:tracking-[0.12em]
                whitespace-nowrap
              "
            >
              DEVELOPER
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base sm:text-lg font-medium text-white/85"
          >
            Focused on performance, accessibility, and scalable UI systems — with
            real business outcomes.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
