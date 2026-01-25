export type Project = {
  title: string
  description: string
  live?: string
  github?: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A modern, motion-focused personal portfolio built with React and Tailwind CSS, designed to showcase projects, experience, and interaction design with strong performance and accessibility in mind.',
    live: '#',
    github: '#',
  },
  {
    title: 'Excela Education Website',
    description:
      'A production-grade education consultancy website built with React, Vite, and Tailwind CSS, integrated with a headless WordPress CMS to enable flexible content management and future scalability.',
    live: '#',
    github: '#',
  },
  {
    title: 'Mobile Store Frontend',
    description:
      'A responsive frontend application for a retail mobile store, focused on clean layouts, usability, and mobile-first design using React and Tailwind CSS.',
      live: '#',
    github: '#',
  },
  {
    title: 'Shani Residence Website',
    description:
      'A full-stack residential website developed to present property information and inquiries, using HTML, CSS, JavaScript, PHP, and MySQL.',
      live: '#',
    github: '#',
  },
  {
    title: 'Mahaweli Villa Website',
    description:
      'A business website created for a hospitality property, featuring service details and property information using a custom PHP and MySQL backend.',
      live: '#',
    github: '#',
  },
]
