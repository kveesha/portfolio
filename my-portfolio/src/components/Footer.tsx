import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-24 border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        {/* Saying */}
        <p className="text-base md:text-lg font-medium text-white/80">
          Designed & built by{' '}
          <span className="text-white font-semibold">Kaveesha</span>
        </p>

        {/* Copyright */}
        <p className="mt-4 text-sm text-white/45">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
