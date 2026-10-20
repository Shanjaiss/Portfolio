import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  settingsRequestId,
  onSettingsClosed,
}: {
  settingsRequestId: number
  onSettingsClosed: (restoreFocus: boolean) => void
}) {
  const [consent, setConsent] = useState<Consent>(readConsent)
  const [dismissed, setDismissed] = useState(false)
  const [closedSettingsRequestId, setClosedSettingsRequestId] = useState(0)
  const settingsOpen = settingsRequestId > closedSettingsRequestId
  const panelOpen = settingsOpen || (consent === null && !dismissed)
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
    if (!settingsOpen) return
    panelRef.current?.focus({ preventScroll: true })
  }, [settingsOpen])

  const closeSettings = () => {
    if (consent === null) setDismissed(true)
    setClosedSettingsRequestId(settingsRequestId)
    onSettingsClosed(true)
  }

  const saveConsent = (nextConsent: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(consentStorageKey, nextConsent)
      if (nextConsent === 'granted') {
        enableAnalytics()
      } else {
        disableAnalytics()
      }
      setConsent(nextConsent)
      setDismissed(false)
      setClosedSettingsRequestId(settingsRequestId)
      setSettingsError('')
      onSettingsClosed(settingsOpen)
    } catch (error) {
      console.error('Unable to save analytics consent.', error)
      setSettingsError(
        'Your choice could not be saved. Analytics will remain disabled until consent can be stored.',
      )
      disableAnalytics()
    }
  }

  if (!panelOpen) return null

  return createPortal(
    <aside
      className="analytics-consent"
      id="analytics-consent-panel"
      ref={panelRef}
      tabIndex={-1}
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      role="region"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && settingsOpen) {
          event.preventDefault()
          closeSettings()
        }
      }}
    >
      <div className="analytics-consent-copy">
        <h2 id="analytics-consent-title">Optional analytics</h2>
        <p id="analytics-consent-description">
          Google Analytics and Microsoft Clarity measure visits and engagement.
          They stay off unless you accept. Contact-form values are not sent, and
          sensitive form areas are masked in recordings. You can change this
          choice anytime in the footer.
          {consent &&
            ` Current choice: ${consent === 'granted' ? 'accepted' : 'rejected'}.`}
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => saveConsent('granted')}
        >
          Accept
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => saveConsent('denied')}
        >
          Reject
        </button>
        {consent === null && !settingsOpen && (
          <button
            className="button button-quiet"
            type="button"
            onClick={() => setDismissed(true)}
          >
            Not now
          </button>
        )}
        {settingsOpen && (
          <button
            className="button button-quiet"
            type="button"
            onClick={closeSettings}
          >
            Close
          </button>
        )}
        {settingsError && (
          <p className="analytics-consent-error" role="alert">
            {settingsError}
          </p>
        )}
      </div>
    </aside>,
    document.body,
  )
}
