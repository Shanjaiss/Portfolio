import { Mail, PhoneCall } from 'lucide-react'
import { profile } from '../../data/profile'

export default function QuickContactLinks() {
  return (
    <div className="quick-contact-links" aria-label="Quick contact">
      <a
        className="quick-contact-link"
        href={`mailto:${profile.email}`}
        aria-label={`Email Shanjai at ${profile.email}`}
      >
        <Mail size={15} />
        Email Shanjai
      </a>
      <a
        className="quick-contact-link"
        href={`tel:${profile.phone}`}
        aria-label={`Call Shanjai at ${profile.phoneDisplay}`}
      >
        <PhoneCall size={15} />
        Call Shanjai
      </a>
    </div>
  )
}
