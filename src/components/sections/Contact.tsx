import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  PhoneCall,
} from 'lucide-react'
import { profile } from '../../data/profile'
import SectionHeading from '../ui/SectionHeading'
import ContactForm from './ContactForm'
import { trackAnalyticsEvent } from '../../analytics/analytics'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      trackAnalyticsEvent({
        name: 'contact_email_click',
        params: { placement: 'contact_button' },
      })
      trackAnalyticsEvent({
        name: 'contact_email_draft_open',
        params: { placement: 'contact_button' },
      })
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <section className="contact-section" id="contact">
      <div className="section-wrap content-section">
        <SectionHeading
          eyebrow="YOUR NEXT TEAMMATE?"
          title="Let's Build Something"
          accent="Great Together"
          number="06"
        />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="lead">
              Have a thoughtful product to build? I’d love to hear what you’re
              working on.
            </p>
            <p>
              Reach me by email or phone for roles and project conversations.
            </p>
            <a
              className="email-card"
              href={`mailto:${profile.email}`}
              onClick={() => {
                trackAnalyticsEvent({
                  name: 'contact_email_click',
                  params: { placement: 'contact_card' },
                })
                trackAnalyticsEvent({
                  name: 'contact_email_draft_open',
                  params: { placement: 'contact_card' },
                })
              }}
            >
              <span className="email-icon">
                <Mail size={18} />
              </span>
              <span>
                <small>DROP ME A LINE</small>
                <strong>{profile.email}</strong>
              </span>
              <ArrowUpRight size={17} />
            </a>
            <a
              className="email-card phone-card"
              href={`tel:${profile.phone}`}
              aria-label={`Call Shanjai at ${profile.phoneDisplay}`}
              onClick={() =>
                trackAnalyticsEvent({
                  name: 'contact_phone_click',
                  params: { placement: 'contact_card' },
                })
              }
            >
              <span className="email-icon">
                <PhoneCall size={18} />
              </span>
              <span>
                <small>CALL ME</small>
                <strong>{profile.phoneDisplay}</strong>
              </span>
              <ArrowUpRight size={17} />
            </a>
            <div className="contact-actions">
              <button
                className="button button-secondary"
                onClick={() => {
                  trackAnalyticsEvent({
                    name: 'contact_email_click',
                    params: { placement: 'contact_button' },
                  })
                  trackAnalyticsEvent({
                    name: 'contact_email_draft_open',
                    params: { placement: 'contact_button' },
                  })
                  window.location.href = `mailto:${profile.email}`
                }}
              >
                Email me <ArrowUpRight size={15} />
              </button>
              <a
                className="button button-secondary"
                href={`tel:${profile.phone}`}
                onClick={() =>
                  trackAnalyticsEvent({
                    name: 'contact_phone_click',
                    params: { placement: 'contact_card' },
                  })
                }
              >
                Call me <PhoneCall size={15} />
              </a>
              <button className="button button-quiet" onClick={copyEmail}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="contact-location">
              <MapPin size={15} /> {profile.location}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
