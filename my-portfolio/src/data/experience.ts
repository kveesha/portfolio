export type ExperienceItem = {
  role: string
  company: string
  time: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Frontend Developer',
    company: 'Freelance / Personal Projects',
    time: '2024 — Present',
    bullets: [
      'Built responsive React UIs with reusable components.',
      'Implemented motion + micro-interactions for a premium feel.',
      'Focused on performance and accessibility.',
    ],
  },
]
