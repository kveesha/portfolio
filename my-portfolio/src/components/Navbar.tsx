import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState<string>('#about')
  const [scrolled, setScrolled] = useState(false)

  const linkIds = useMemo(() => links.map((l) => l.href.replace('#', '')), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = linkIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (v?.target?.id) setActive(`#${v.target.id}`)
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-20% 0px -65% 0px' }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [linkIds])

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      className={
        'sticky top-0 z-50 border-b border-white/10 backdrop-blur ' +
        (scrolled ? 'bg-black/45 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]' : 'bg-black/20')
      }
    >
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
        <a href="#" className="font-semibold tracking-tight text-white">
          YourName<span className="text-white/50">.dev</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-sm relative">
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <a
                key={l.href}
                href={l.href}
                className={
                  'relative px-3 py-2 rounded-xl transition-colors ' +
                  (isActive ? 'text-white' : 'text-white/70 hover:text-white')
                }
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}

                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="inline-block"
                >
                  {l.label}
                </motion.span>
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <IconBtn href="mailto:you@example.com" label="Email" icon={<Mail className="h-4 w-4" />} />
          <IconBtn href="#" label="GitHub" icon={<Github className="h-4 w-4" />} />
          <IconBtn href="#" label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
        </div>
      </div>
    </motion.header>
  )
}

function IconBtn({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
    >
      <span className="text-white/80">{icon}</span>
    </motion.a>
  )
}
