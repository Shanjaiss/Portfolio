import { useEffect, useState } from 'react'
import type { Theme } from '../types'

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem('portfolio-theme')
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}
