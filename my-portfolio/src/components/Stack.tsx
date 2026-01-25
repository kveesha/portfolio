import {
  SiReact,
  SiVuedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
  SiCss3,
  SiHtml5,
} from "react-icons/si"

type Item = {
  label: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

type Group = {
  title: string
  items: Item[]
}

const groups: Group[] = [
  {
    title: "FRONTEND",
    items: [
      { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Vue", Icon: SiVuedotjs, color: "#42B883" },
      { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { label: "Framer Motion", Icon: SiFramer, color: "#E879F9" },
      { label: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
      { label: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { label: "CSS", Icon: SiCss3, color: "#1572B6" },
    ],
  },
  {
    title: "BACKEND",
    items: [
      { label: "Node.js", Icon: SiNodedotjs, color: "#3C873A" },
      { label: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
    ],
  },
  {
    title: "DATABASE",
    items: [
      { label: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { label: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { label: "Git", Icon: SiGit, color: "#F05032" },
      { label: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
      { label: "Figma", Icon: SiFigma, color: "#F24E1E" },
    ],
  },
]

export default function Stack() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3 text-white/70">
        <span className="text-lg">✳</span>
        <p className="text-sm uppercase tracking-[0.22em]">My Stack</p>
      </div>

      <div className="space-y-12">
        {groups.map((g) => (
          <div
            key={g.title}
            className="grid gap-6 md:grid-cols-12 items-start"
          >
            {/* Left big category */}
            <div className="md:col-span-4">
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-white/35">
                {g.title}
              </p>
            </div>

            {/* Right icons list */}
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                {g.items.map(({ label, Icon, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon
                      className="h-7 w-7"
                      style={{
                        color,
                        filter:
                          "drop-shadow(0 0 10px rgba(255,255,255,0.10))",
                      }}
                    />
                    <span className="text-base text-white/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
