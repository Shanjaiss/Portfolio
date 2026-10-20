import Clarity from '@microsoft/clarity'
import { navigationSections } from '../data/navigation'
import type { ProjectId } from '../data/projects'

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim()
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const gaScriptId = 'portfolio-ga4-google-tag'
const analyticsDiagnosticsEnabled =
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get('analytics_debug') === '1'
const consentSettings = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const
const analyticsCookiePattern = /^_(?:ga(?:_|=)|gid=|gat(?:_|=)|clck=|clsk=)/

export type NavigationSection = (typeof navigationSections)[number][0]

type AnalyticsEvent =
  | {
      name: 'project_case_study_open'
      params: { project_id: ProjectId }
    }
  | {
      name: 'resume_preview_click'
      params: { placement: 'hero' }
    }
  | {
      name: 'resume_download_click'
      params: { placement: 'hero' | 'resume_preview' | 'terminal' }
    }
  | {
      name: 'recruiter_view_activate'
      params: Record<string, never>
    }
  | {
      name: 'contact_email_click'
      params: {
        placement:
          'contact_card' | 'quick_contact' | 'contact_button' | 'contact_form'
      }
    }
  | {
      name: 'contact_phone_click'
      params: { placement: 'contact_card' | 'quick_contact' }
    }
  | {
      name: 'navigation'
      params: { section: NavigationSection }
    }
  | {
      name: 'contact_email_draft_open'
      params: {
        placement:
          'contact_card' | 'quick_contact' | 'contact_button' | 'contact_form'
      }
    }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let consentGranted = false
let clarityInitialized = false
let gaConfigured = false
let pageViewSent = false
let diagnosticsObserver: PerformanceObserver | null = null

function reportAnalyticsDiagnostic(
  event: string,
  details: Record<string, boolean | number | string | null>,
) {
  if (!analyticsDiagnosticsEnabled) return
  console.info('[analytics diagnostics]', { event, ...details })
}

function startDiagnosticsObserver() {
  if (
    !analyticsDiagnosticsEnabled ||
    diagnosticsObserver ||
    typeof PerformanceObserver === 'undefined' ||
    !PerformanceObserver.supportedEntryTypes.includes('resource')
  ) {
    return
  }

  diagnosticsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resource = entry as PerformanceResourceTiming & {
        responseStatus?: number
      }
      const endpoint = new URL(resource.name)
      const provider = endpoint.hostname.endsWith('clarity.ms')
        ? 'clarity'
        : endpoint.hostname.endsWith('google-analytics.com') ||
            endpoint.hostname.endsWith('googletagmanager.com')
          ? 'ga4'
          : null

      if (!provider) continue

      reportAnalyticsDiagnostic('request', {
        provider,
        endpoint: `${endpoint.origin}${endpoint.pathname}`,
        responseStatus:
          typeof resource.responseStatus === 'number' &&
          resource.responseStatus > 0
            ? resource.responseStatus
            : null,
        durationMs: Math.round(resource.duration),
        transferSize: resource.transferSize,
      })
    }
  })
  diagnosticsObserver.observe({ type: 'resource', buffered: false })
}

function stopDiagnosticsObserver() {
  diagnosticsObserver?.disconnect()
  diagnosticsObserver = null
}

function sanitizedPageLocation() {
  const currentUrl = new URL(window.location.href)
  const campaignParams = new URLSearchParams()

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const value = currentUrl.searchParams.get(key)
    if (
      value &&
      !value.includes('@') &&
      !/(?:\+?\d[\s().-]*){7,}/.test(value)
    ) {
      campaignParams.set(key, value.slice(0, 100))
    }
  }

  currentUrl.search = campaignParams.toString()
  currentUrl.hash = ''
  return currentUrl.toString()
}

function sanitizeBrowserLocation() {
  const safeLocation = sanitizedPageLocation()
  if (safeLocation === window.location.href) return true

  try {
    window.history.replaceState(window.history.state, '', safeLocation)
    return true
  } catch (error) {
    console.error(
      'Unable to remove non-campaign URL data before recording.',
      error,
    )
    return false
  }
}

function sanitizedReferrer() {
  if (!document.referrer) return ''
  return new URL(document.referrer).origin
}

function ensureGoogleTag() {
  if (!gaMeasurementId) return false

  window.dataLayer ??= []
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }

  if (!document.getElementById(gaScriptId)) {
    const script = document.createElement('script')
    script.id = gaScriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`
    script.addEventListener(
      'load',
      () =>
        reportAnalyticsDiagnostic('script_loaded', {
          provider: 'ga4',
          loaded: true,
        }),
      { once: true },
    )
    script.addEventListener(
      'error',
      () =>
        reportAnalyticsDiagnostic('script_loaded', {
          provider: 'ga4',
          loaded: false,
        }),
      { once: true },
    )
    document.head.appendChild(script)
  }

  if (gaConfigured) {
    window.gtag('consent', 'update', {
      ...consentSettings,
      analytics_storage: 'granted',
    })
    return true
  }

  window.gtag('consent', 'default', {
    ...consentSettings,
    analytics_storage: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('consent', 'update', {
    ...consentSettings,
    analytics_storage: 'granted',
  })

  const pageLocation = sanitizedPageLocation()
  const pageReferrer = sanitizedReferrer()
  window.gtag('config', gaMeasurementId, {
    send_page_view: false,
    page_location: pageLocation,
    page_referrer: pageReferrer,
  })
  gaConfigured = true

  if (!pageViewSent) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: pageLocation,
      page_referrer: pageReferrer,
    })
    pageViewSent = true
    reportAnalyticsDiagnostic('event_queued', {
      provider: 'ga4',
      event: 'page_view',
    })
  }
  return true
}

export function enableAnalytics() {
  if (!clarityProjectId || !gaMeasurementId) {
    console.error(
      'Analytics configuration is incomplete. Set VITE_CLARITY_PROJECT_ID and VITE_GA_MEASUREMENT_ID.',
    )
  }
  const wasTrackingEnabled = consentGranted
  consentGranted = Boolean(clarityProjectId || gaMeasurementId)
  startDiagnosticsObserver()
  let clarityReady = false
  let ga4Ready = false

  if (clarityProjectId) {
    try {
      const safeLocation = sanitizeBrowserLocation()
      if (safeLocation && !clarityInitialized) {
        Clarity.init(clarityProjectId)
        clarityInitialized = true
      }
      if (clarityInitialized) {
        Clarity.consentV2({
          ad_Storage: 'denied',
          analytics_Storage: 'granted',
        })
        clarityReady = true
      }
    } catch (error) {
      console.error('Microsoft Clarity could not be initialized.', error)
    }
  }

  try {
    ga4Ready = ensureGoogleTag()
  } catch (error) {
    console.error('Google Analytics could not be initialized.', error)
  }

  if (!wasTrackingEnabled) {
    reportAnalyticsDiagnostic('initialization', {
      consentGranted,
      clarityConfigured: Boolean(clarityProjectId),
      clarityInitialized,
      ga4Configured: Boolean(gaMeasurementId),
      ga4CommandQueued: ga4Ready,
      gaScriptCount: document.querySelectorAll(`#${gaScriptId}`).length,
    })
  }

  return { clarityReady, ga4Ready }
}

export function disableAnalytics() {
  const wasTrackingEnabled = consentGranted
  consentGranted = false
  stopDiagnosticsObserver()

  if (clarityInitialized) {
    try {
      Clarity.consentV2({
        ad_Storage: 'denied',
        analytics_Storage: 'denied',
      })
    } catch (error) {
      console.error('Microsoft Clarity consent could not be withdrawn.', error)
    }
  }

  if (gaConfigured && window.gtag) {
    window.gtag('consent', 'update', {
      ...consentSettings,
      analytics_storage: 'denied',
    })
  }

  try {
    for (const cookie of document.cookie.split(';')) {
      const cookieName = cookie.trim().split('=')[0]
      if (cookieName && analyticsCookiePattern.test(`${cookieName}=`)) {
        document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`
      }
    }
  } catch (error) {
    console.error('Analytics cookies could not be cleared.', error)
  }

  if (wasTrackingEnabled) {
    reportAnalyticsDiagnostic('tracking_disabled', {
      clarityInitialized,
      ga4Configured: gaConfigured,
    })
  }
}

export function trackAnalyticsEvent(event: AnalyticsEvent) {
  if (!consentGranted) return

  if (gaConfigured && window.gtag) {
    try {
      window.gtag('event', event.name, event.params)
      reportAnalyticsDiagnostic('event_queued', {
        provider: 'ga4',
        event: event.name,
      })
    } catch (error) {
      console.error('Google Analytics event could not be queued.', error)
    }
  }
  if (clarityInitialized) {
    try {
      Clarity.event(event.name)
      reportAnalyticsDiagnostic('event_queued', {
        provider: 'clarity',
        event: event.name,
      })
    } catch (error) {
      console.error('Microsoft Clarity event could not be recorded.', error)
    }
  }
}
