export type AchievementIcon = 'layers' | 'briefcase' | 'code' | 'arrow' | 'file'
export type Achievement = { icon: AchievementIcon; title: string; text: string }

export const achievements: Achievement[] = [
  {
    icon: 'layers',
    title: 'Production FinTech',
    text: 'Delivered features across production FinTech and algorithmic trading platforms.',
  },
  {
    icon: 'briefcase',
    title: 'Broker integrations',
    text: 'Contributed to broker integrations and trading workflows.',
  },
  {
    icon: 'code',
    title: 'Operational tooling',
    text: 'Built broker configuration and API credential-management workflows.',
  },
  {
    icon: 'arrow',
    title: 'State migration',
    text: 'Migrated approximately 70% of applicable Recoil implementations to TanStack Query hooks.',
  },
  {
    icon: 'file',
    title: 'Multilingual support',
    text: 'Implemented i18next localization for multilingual application support.',
  },
  {
    icon: 'briefcase',
    title: 'Team delivery',
    text: 'Participated in code reviews and pair programming.',
  },
]
