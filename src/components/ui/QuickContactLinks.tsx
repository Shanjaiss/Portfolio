import { Mail, PhoneCall } from 'lucide-react'
import { profile } from '../../data/profile'
import { trackAnalyticsEvent } from '../../analytics/analytics'

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
        <a
          href={`mailto:${profile.email}`}
          onClick={() => {
            trackAnalyticsEvent({
              name: 'contact_email_click',
              params: { placement: 'quick_contact' },
            })
            trackAnalyticsEvent({
              name: 'contact_email_draft_open',
              params: { placement: 'quick_contact' },
            })
          }}
        >
          <Mail size={15} />
          Email Shanjai
        </a>
        <a
          href={`tel:${profile.phone}`}
          onClick={() =>
            trackAnalyticsEvent({
              name: 'contact_phone_click',
              params: { placement: 'quick_contact' },
            })
          }
        >
          <PhoneCall size={15} />
          Call Shanjai
        </a>
      </div>
    </details>
  )
}
