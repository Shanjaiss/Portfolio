import { useEffect, useState } from 'react'
import type { PortfolioNavigationSection } from '../types'

export default function useScrollProgress(
  sections: readonly PortfolioNavigationSection[],
) {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)

      const current = sections
        .map(([id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => section.getBoundingClientRect().top <= 150)
        .at(-1)

      if (current) setActiveSection(current.id)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [sections])

  return { progress, activeSection }
}
