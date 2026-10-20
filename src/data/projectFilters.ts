export const projectFilters = [
  'All',
  'FinTech',
  'Frontend',
  'Full Stack',
  'SaaS',
] as const

export type ProjectFilterValue = (typeof projectFilters)[number]
