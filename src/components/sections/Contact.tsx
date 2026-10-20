import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import SectionHeading from '../ui/SectionHeading'
import ContactForm from './ContactForm'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
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
              For roles and project conversations, email is the best way to
              reach me.
            </p>
            <a className="email-card" href={`mailto:${profile.email}`}>
              <span className="email-icon">
                <Mail size={18} />
              </span>
              <span>
                <small>DROP ME A LINE</small>
                <strong>{profile.email}</strong>
              </span>
              <ArrowUpRight size={17} />
            </a>
            <div className="contact-actions">
              <button
                className="button button-secondary"
                onClick={() =>
                  (window.location.href = `mailto:${profile.email}`)
                }
              >
                Email me <ArrowUpRight size={15} />
              </button>
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
