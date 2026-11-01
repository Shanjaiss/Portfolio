export const projectFilters = [
  'All',
  'AI',
  'FinTech',
  'Frontend',
  'Full Stack',
  'SaaS',
] as const

export type ProjectFilterValue = (typeof projectFilters)[number]
