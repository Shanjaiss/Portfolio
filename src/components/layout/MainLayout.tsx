import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import { profile } from '../../data/profile'
import { navigationSections } from '../../data/navigation'
import useTheme from '../../hooks/useTheme'
import useScrollProgress from '../../hooks/useScrollProgress'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from '../ui/ScrollProgress'
import RecruiterMode from '../interactive/RecruiterMode'
import CommandPalette from '../interactive/CommandPalette'
import Hero from '../sections/Hero'
import TechStrip from '../sections/TechStrip'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Achievements from '../sections/Achievements'
import Contact from '../sections/Contact'
import DeveloperTerminal from '../interactive/DeveloperTerminal'

export default function MainLayout() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useTheme()
  const { progress, activeSection } = useScrollProgress(navigationSections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % profile.roleTitles.length),
      3000,
    )
    return () => window.clearInterval(interval)
  }, [reduceMotion])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigateTo = (id: string) => {
    setPaletteOpen(false)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`site-shell${recruiterMode ? ' recruiter-mode' : ''}`}>
        <ScrollProgress progress={progress} />
        <Navbar
          activeSection={activeSection}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          navigateTo={navigateTo}
          theme={theme}
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          recruiterMode={recruiterMode}
          onRecruiterToggle={() => setRecruiterMode((mode) => !mode)}
        />
        <RecruiterMode enabled={recruiterMode} />
        <main>
          <Hero
            navigateTo={navigateTo}
            roleTitle={profile.roleTitles[roleIndex] ?? profile.title}
            reduceMotion={reduceMotion}
          />
          <TechStrip />
          <About navigateTo={navigateTo} />
          <Experience reduceMotion={reduceMotion} />
          <Skills reduceMotion={reduceMotion} />
          <Projects reduceMotion={reduceMotion} />
          <Achievements reduceMotion={reduceMotion} />
          <DeveloperTerminal navigateTo={navigateTo} />
          <Contact />
        </main>
        <Footer navigateTo={navigateTo} />
        <CommandPalette
          key={paletteOpen ? 'open' : 'closed'}
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          navigateTo={navigateTo}
        />
      </div>
    </LazyMotion>
  )
}
