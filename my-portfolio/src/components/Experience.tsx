import { motion } from 'framer-motion'
import { experience } from '@/data/experience'

export default function Experience() {
  return (
    <div className="space-y-4">
      {experience.map((e, idx) => (
        <motion.div
          key={e.role + e.company}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.05 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-white font-semibold tracking-tight">{e.role}</p>
              <p className="text-white/70">{e.company}</p>
            </div>
            <p className="text-sm text-white/55">{e.time}</p>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
