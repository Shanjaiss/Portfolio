export type Experience = {
  company: string
  role: string
  location: string
  period: string
  technologies: string[]
  contributions: string[]
}

export const experience: Experience[] = [
  {
    company: 'Finolab Technologies',
    role: 'Software Developer',
    location: 'Bengaluru, India',
    period: 'December 2024 – Present',
    technologies: [
      'AngularJS',
      'React.js',
      'Node.js',
      'Express.js',
      'MySQL',
      'REST APIs',
      'Ant Design',
    ],
    contributions: [
      'Contributed to a multi-tenant SaaS algorithmic trading platform.',
      'Developed automated trading workflows and broker integration features.',
      'Worked on order placement, position management, watchlists, and real-time trade monitoring.',
      'Integrated frontend modules with backend REST APIs.',
      'Developed broker configuration and static IP management interfaces.',
      'Built responsive broker API credential-management interfaces.',
      'Supported authentication, subscription, and trading administration workflows.',
      'Troubleshot production issues and collaborated with engineering teams.',
    ],
  },
  {
    company: 'Sailboat Technologies',
    role: 'Software Developer – Frontend',
    location: 'Bengaluru, India (Remote)',
    period: 'November 2023 – November 2024',
    technologies: [
      'React.js',
      'TypeScript',
      'Recoil',
      'TanStack Query',
      'REST APIs',
      'Ruby',
    ],
    contributions: [
      'Developed reusable React and TypeScript components.',
      'Built vendor onboarding and vendor management workflows.',
      'Integrated REST APIs using TanStack Query.',
      'Managed shared application state using Recoil.',
      'Migrated approximately 70% of applicable Recoil implementations to TanStack Query hooks.',
      'Implemented localization using i18next.',
      'Worked with engineering teams through code reviews and pair programming.',
    ],
  },
]
