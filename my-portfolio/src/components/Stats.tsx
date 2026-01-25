import { motion } from 'framer-motion'

const stats = [
  { label: 'Projects shipped', value: '7+' },
  { label: 'Years learning/building', value: '2+' },
  { label: 'Hours Worked', value: '5K+' },
]

export default function Stats() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.06 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <p className="text-3xl font-semibold tracking-tight text-emerald-400">{s.value}</p>
          <p className="mt-2 text-sm text-white/60">{s.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
