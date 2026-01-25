export default function About() {
  return (
    <div className="grid gap-8 md:grid-cols-12">
      {/* Main paragraph */}
      <div className="md:col-span-8">
        <p className="text-lg md:text-xl font-semibold leading-relaxed text-white">
          I’m <span className="font-bold">Kaveesha</span>, a frontend developer who
          builds clean interfaces, smooth motion, and systems that stay maintainable
          over time. I care deeply about performance, accessibility, and shipping
          features that genuinely help users.
        </p>
      </div>

      {/* Meta info */}
      <div className="md:col-span-4">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">
          Location
        </p>
        <p className="mt-3 text-white font-semibold">
          Sri Lanka — remote friendly
        </p>
      </div>
    </div>
  )
}
