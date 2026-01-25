import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'

export default function Projects() {
  const allTags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return ['All', ...Array.from(set)]
  }, [])

  const [active, setActive] = useState('All')
  const list = active === 'All' ? projects : projects.filter((p) => p.tags.includes(active))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={
              'rounded-2xl border px-3 py-1.5 text-sm transition backdrop-blur ' +
              (active === t
                ? 'border-white/15 bg-white text-black'
                : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10')
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((p, idx) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.04 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-shadow hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                {p.github ? (
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4 text-white/80" />
                  </motion.a>
                ) : null}
                {p.live ? (
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Live demo"
                  >
                    <ExternalLink className="h-4 w-4 text-white/80" />
                  </motion.a>
                ) : null}
              </div>
            </div>

            {/* hover hint */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs text-white/45"
            >
              <span className="opacity-0 group-hover:opacity-100 transition">Open →</span>
            </motion.p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
