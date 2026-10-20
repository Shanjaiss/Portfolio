import { useEffect, useRef, useState } from 'react'
import { disableAnalytics, enableAnalytics } from '../../analytics/analytics'

const consentStorageKey = 'portfolio-analytics-consent-v1'

type Consent = 'granted' | 'denied' | null

function readConsent(): Consent {
  try {
    const storedChoice = window.localStorage.getItem(consentStorageKey)
    return storedChoice === 'granted' || storedChoice === 'denied'
      ? storedChoice
      : null
  } catch (error) {
    console.error('Unable to read saved analytics consent.', error)
    return null
  }
}

export default function AnalyticsConsent({
  settingsRequested,
  onSettingsClosed,
}: {
  settingsRequested: boolean
  onSettingsClosed: (restoreFocus: boolean) => void
}) {
  const [consent, setConsent] = useState<Consent>(readConsent)
  const panelOpen = consent === null || settingsRequested
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    consent === 'granted',
  )
  const [settingsError, setSettingsError] = useState('')
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (consent === 'granted') {
      enableAnalytics()
    } else {
      disableAnalytics()
    }
  }, [consent])

  useEffect(() => {
    if (!settingsRequested) return
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    panelRef.current?.focus({ preventScroll: true })
  }, [settingsRequested])

  const saveConsent = (nextConsent: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(consentStorageKey, nextConsent)
      setConsent(nextConsent)
      setAnalyticsEnabled(nextConsent === 'granted')
      setSettingsError('')
      onSettingsClosed(settingsRequested)
    } catch (error) {
      console.error('Unable to save analytics consent.', error)
      setSettingsError(
        'Your choice could not be saved. Analytics will remain disabled until consent can be stored.',
      )
      disableAnalytics()
    }
  }

  if (!panelOpen) return null

  return (
    <aside
      className="analytics-consent"
      id="analytics-consent-panel"
      ref={panelRef}
      tabIndex={-1}
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
    >
      <div className="analytics-consent-copy">
        <span className="section-eyebrow">PRIVACY CHOICES</span>
        <h2 id="analytics-consent-title">Your privacy, your choice</h2>
        <p id="analytics-consent-description">
          Optional Google Analytics 4 and Microsoft Clarity help understand
          portfolio visits and interactions, including session recordings.
          Contact-form fields are masked in recordings, and no form contents or
          personal contact details are sent as analytics events. Tracking stays
          off unless you allow it. Change your choice anytime using Privacy
          choices in the footer.
        </p>
      </div>
      <div className="analytics-consent-controls">
        <label className="analytics-consent-toggle">
          <input
            type="checkbox"
            checked={analyticsEnabled}
            onChange={(event) => setAnalyticsEnabled(event.target.checked)}
          />
          <span>Allow optional analytics</span>
        </label>
        <div className="analytics-consent-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={() => saveConsent('granted')}
          >
            Allow analytics
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => saveConsent('denied')}
          >
            Reject optional analytics
          </button>
          <button
            className="button button-quiet"
            type="button"
            onClick={() => saveConsent(analyticsEnabled ? 'granted' : 'denied')}
          >
            Save my choice
          </button>
        </div>
        {settingsError && (
          <p className="analytics-consent-error" role="alert">
            {settingsError}
          </p>
        )}
      </div>
    </aside>
  )
}
