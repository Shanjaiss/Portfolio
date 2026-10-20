export type Theme = 'dark' | 'light'

export type PortfolioNavigationSection = readonly [id: string, label: string]

export type NavigateTo = (id: string) => void
