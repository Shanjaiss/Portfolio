import { ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'

type FooterProps = {
  navigateTo: (id: string) => void
}

export default function Footer({ navigateTo }: FooterProps) {
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
      <button className="footer-top" onClick={() => navigateTo('home')}>
        BACK TO TOP <ArrowUpRight size={14} />
      </button>
    </footer>
  )
}
