import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { trackAnalyticsEvent } from '../../analytics/analytics'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  subject: z.string().trim().min(3, 'Please add a subject.').max(150),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a little more detail.')
    .max(3000),
})
type ContactValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [mailtoOpened, setMailtoOpened] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = (values: ContactValues) => {
    const subject = encodeURIComponent(values.subject)
    const body = encodeURIComponent(
      `From: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    )
    setMailtoOpened(true)
    trackAnalyticsEvent({
      name: 'contact_email_click',
      params: { placement: 'contact_form' },
    })
    trackAnalyticsEvent({
      name: 'contact_email_draft_open',
      params: { placement: 'contact_form' },
    })
    window.location.assign(
      `mailto:${profile.email}?subject=${subject}&body=${body}`,
    )
  }

  return (
    <form
      className="contact-form clarity-mask"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form-heading">
        <span>CONTACT FORM</span>
        <span>
          <span className="status-dot" /> EMAIL APP FALLBACK
        </span>
      </div>
      <div className="form-row">
        <label>
          Full name
          <input
            {...register('name')}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <small className="field-error" id="name-error">
              {errors.name.message}
            </small>
          )}
        </label>
        <label>
          Email address
          <input
            {...register('email')}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <small className="field-error" id="email-error">
              {errors.email.message}
            </small>
          )}
        </label>
      </div>
      <label>
        Subject
        <input
          {...register('subject')}
          placeholder="What's on your mind?"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <small className="field-error" id="subject-error">
            {errors.subject.message}
          </small>
        )}
      </label>
      <label>
        Message
        <textarea
          {...register('message')}
          rows={4}
          placeholder="A little about the opportunity or project..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <small className="field-error" id="message-error">
            {errors.message.message}
          </small>
        )}
      </label>
      <button className="button button-primary form-submit" type="submit">
        Open email draft <Send size={15} />
      </button>
      <p className="form-note" role="status">
        {mailtoOpened
          ? 'Your email app should open with a draft. The message is not sent until you send it.'
          : 'Your email app will open with your message ready. Nothing is sent from this site.'}
      </p>
    </form>
  )
}
