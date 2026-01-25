import { motion, type Variants } from 'framer-motion'

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function Section({
  id,
  title,
  children,
}: {
  id?: string
  title?: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto max-w-6xl px-5 py-16"
    >
      {title ? (
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      ) : null}
      <div className={title ? 'mt-8' : ''}>{children}</div>
    </motion.section>
  )
}
