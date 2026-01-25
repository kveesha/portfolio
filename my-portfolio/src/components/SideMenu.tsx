import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

type SideMenuProps = {
  open: boolean
  onClose: () => void
}

const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" }
  
]

const menu = [
  { label: "Home", href: "#", dot: "bg-yellow-400" },
  { label: "About Me", href: "#about", dot: "bg-blue-500" },
  { label: "Experience", href: "#experience", dot: "bg-emerald-400" },
  { label: "Projects", href: "#projects", dot: "bg-indigo-400" },
  { label: "Contact", href: "#contact", dot: "bg-pink-400" },
]

export default function SideMenu({ open, onClose }: SideMenuProps) {
  // lock scroll when open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const go = (href: string) => {
    onClose()
    // smooth scroll to anchor
    if (href.startsWith("#")) {
      const el = href === "#" ? document.body : document.querySelector(href)
      ;(el as HTMLElement | null)?.scrollIntoView?.({ behavior: "smooth" })
    } else {
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.aside
            className="fixed right-0 top-0 z-[90] h-dvh w-[360px] max-w-[88vw]
                       border-l border-white/10 bg-zinc-900/90 backdrop-blur-md"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* close */}
            <button

              data-cursor="pointer"
              aria-label="Close menu"
              className="absolute right-5 top-5 text-white/70 hover:text-white"
            >
              <span className="text-3xl leading-none">×</span>
            </button>

            <div className="h-full px-10 py-20 flex flex-col justify-between">
              {/* main content */}
              <div className="grid grid-cols-2 gap-10">
                {/* socials */}
                <div>
                  <p className="text-xs tracking-[0.28em] text-white/50">SOCIAL</p>
                  <div className="mt-8 space-y-4 text-white/80">
                    {socials.map((s) => (
                      <button
                        data-cursor="pointer"
                        key={s.label}
                        onClick={() => go(s.href)}
                        className="block text-left hover:text-white transition"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* menu */}
                <div>
                  <p className="text-xs tracking-[0.28em] text-white/50">MENU</p>
                  <div className="mt-8 space-y-4">
                    {menu.map((m) => (
                      <button
                        data-cursor="pointer"
                        key={m.label}
                        onClick={() => go(m.href)}
                        className="flex items-center gap-3 text-left text-white/80 hover:text-white transition"
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${m.dot}`} />
                        <span className="text-[15px]">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="pt-10">
                <p className="text-xs tracking-[0.28em] text-white/40">GET IN TOUCH</p>
                <a
                  href="mailto:you@example.com"
                  className="mt-3 block text-white/75 hover:text-white transition"
                >
                  you@example.com
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
