import { Mail } from 'lucide-react'

export default function Contact() {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h3 className="text-lg font-semibold tracking-tight text-white">Let’s talk</h3>
        <p className="mt-2 text-sm text-white/70">
          Fastest way: email me. If you want a working form, we can connect it to Formspree / Resend / EmailJS later.
        </p>
        <a
          href="mailto:you@example.com"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white px-4 py-2 text-sm text-black hover:opacity-90 transition"
        >
          <Mail className="h-4 w-4" /> you@example.com
        </a>
      </div>

      <form
        className="md:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        onSubmit={(e) => {
          e.preventDefault()
          // UI-only demo
          alert('This is a UI-only form for now. Connect a form backend when ready.')
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-white/70">Name</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-white/40"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-white/70">Email</span>
            <input
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-white/40"
              placeholder="you@email.com"
            />
          </label>
        </div>
        <label className="mt-4 block space-y-2">
          <span className="text-sm text-white/70">Message</span>
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Tell me what you’re building…"
          />
        </label>

        <button
          className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm text-black hover:opacity-90 transition"
          type="submit"
        >
          Send message
        </button>
      </form>
    </div>
  )
}
