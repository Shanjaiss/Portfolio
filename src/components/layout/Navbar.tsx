import { Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'
import { navigationSections } from '../../data/navigation'
import type { Theme } from '../../types'
import { RecruiterToggle } from '../interactive/RecruiterMode'
import ThemeToggle from '../ui/ThemeToggle'

type NavbarProps = {
  activeSection: string
  menuOpen: boolean
  onMenuToggle: () => void
  navigateTo: (id: string) => void
  theme: Theme
  onThemeToggle: () => void
  recruiterMode: boolean
  onRecruiterToggle: () => void
}

export default function Navbar({
  activeSection,
  menuOpen,
  onMenuToggle,
  navigateTo,
  theme,
  onThemeToggle,
  recruiterMode,
  onRecruiterToggle,
}: NavbarProps) {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#home"
        onClick={(event) => {
          event.preventDefault()
          navigateTo('home')
        }}
        aria-label={`${profile.name}, home`}
      >
        <span className="brand-mark">S</span>
        <span className="brand-name">
          shanjai<span>.</span>
        </span>
      </a>
      <nav
        className={`main-nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Main navigation"
      >
        {navigationSections.map(([id, label]) => (
          <a
            href={`#${id}`}
            key={id}
            className={activeSection === id ? 'active' : ''}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={(event) => {
              event.preventDefault()
              navigateTo(id)
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <RecruiterToggle enabled={recruiterMode} onToggle={onRecruiterToggle} />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <button
          className="icon-button mobile-menu-button"
          onClick={onMenuToggle}
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  )
}
