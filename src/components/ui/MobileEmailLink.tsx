import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'

export default function MobileEmailLink() {
  return (
    <a
      className="mobile-email-quick"
      href={`mailto:${profile.email}`}
      aria-label={`Email Shanjai at ${profile.email}`}
    >
      <Mail size={15} />
      Email Shanjai
    </a>
  )
}
