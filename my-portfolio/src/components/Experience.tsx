import { motion } from 'framer-motion'
import { experience } from '@/data/experience'

export default function Experience() {
  return (
    <div className="space-y-10">
      {experience.map((e, idx) => (
        <motion.div
          key={e.role + e.company}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
          whileHover={{ y: -4 }}
          className="pb-8 border-b border-white/10"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {e.role}
              </p>
              <p className="mt-1 text-base md:text-lg text-white/75">
                {e.company}
              </p>
            </div>

            <p className="text-sm md:text-base text-white/55">
              {e.time}
            </p>
          </div>

          {/* Bullets */}
          <ul className="mt-5 space-y-3">
            {e.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-base md:text-lg leading-relaxed text-white/85"
              >
                <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald-400/80" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
