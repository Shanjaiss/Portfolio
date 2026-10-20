import { ArrowUpRight } from 'lucide-react'
import type { RefObject } from 'react'
import { profile } from '../../data/profile'
import type { NavigationSection } from '../../analytics/analytics'

type FooterProps = {
  navigateTo: (id: NavigationSection) => void
  onPrivacySettings: () => void
  privacySettingsRef: RefObject<HTMLButtonElement | null>
}

export default function Footer({
  navigateTo,
  onPrivacySettings,
  privacySettingsRef,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <a
        className="brand"
        href="#home"
        onClick={(event) => {
          event.preventDefault()
          navigateTo('home')
        }}
      >
        <span className="brand-mark">S</span>
        <span className="brand-name">Shanjai</span>
      </a>
      <p>
        Designed and built with intent.<span> © {profile.name}</span>
      </p>
      <button
        className="footer-privacy"
        type="button"
        ref={privacySettingsRef}
        onClick={onPrivacySettings}
        aria-label="Manage optional analytics consent"
      >
        Privacy choices
      </button>
      <button className="footer-top" onClick={() => navigateTo('home')}>
        BACK TO TOP <ArrowUpRight size={14} />
      </button>
    </footer>
  )
}
