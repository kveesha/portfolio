export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-white/55 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p className="text-white/45">Built with React + Vite + Tailwind + Three.js.</p>
      </div>
    </footer>
  )
}
