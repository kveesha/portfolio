export type Project = {
  title: string
  description: string
  tags: string[]
  live?: string
  github?: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio (This site)',
    description: 'A clean, animated portfolio built with React + Tailwind.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    live: '#',
    github: '#',
  },
]
