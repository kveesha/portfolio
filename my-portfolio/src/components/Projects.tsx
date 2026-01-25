import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {projects.map((p, idx) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
          whileHover={{ y: -4 }}
          className="pb-8 border-b border-white/10"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-white/80 max-w-prose">
                {p.description}
              </p>
            </div>

            <div className="flex gap-2 shrink-0 pt-1">
              {p.github && (
                <motion.a
                  data-cursor="pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-white/80" />
                </motion.a>
              )}

              {p.live && (
                <motion.a
                  data-cursor="pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live demo"
                >
                  <ExternalLink className="h-5 w-5 text-white/80" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
