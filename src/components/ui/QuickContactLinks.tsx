import { Mail, PhoneCall } from 'lucide-react'
import { profile } from '../../data/profile'

export default function QuickContactLinks() {
  return (
    <details
      className="quick-contact-launcher"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.preventDefault()
          event.currentTarget.open = false
          event.currentTarget.querySelector('summary')?.focus()
        }
      }}
    >
      <summary aria-label="Quick contact options">
        <Mail size={15} />
        <span>Contact</span>
      </summary>
      <div className="quick-contact-menu" aria-label="Quick contact options">
        <a href={`mailto:${profile.email}`}>
          <Mail size={15} />
          Email Shanjai
        </a>
        <a href={`tel:${profile.phone}`}>
          <PhoneCall size={15} />
          Call Shanjai
        </a>
      </div>
    </details>
  )
}
