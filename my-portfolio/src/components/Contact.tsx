import { Mail } from 'lucide-react'

export default function Contact() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Let’s work together
        </h3>

        {/* Catchy line */}
        <p className="mt-6 text-lg md:text-xl text-white/80">
          Got an idea, a product, or a problem worth solving?
        </p>

        {/* Email */}
        <a
          href="mailto:kaveeshawijayathilaka219@gmail.com"
          className="mt-10 inline-flex items-center justify-center gap-3 text-xl md:text-2xl font-semibold text-emerald-400 hover:text-emerald-300 transition"
        >
          <Mail className="h-6 w-6" />
          kaveeshawijayathilaka219@gmail.com
        </a>
      </div>
    </section>
  )
}
