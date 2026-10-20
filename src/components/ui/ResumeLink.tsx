import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Download, ExternalLink, Eye, X } from 'lucide-react'
import { profile } from '../../data/profile'
import useDialogAccessibility from '../../hooks/useDialogAccessibility'
import { trackAnalyticsEvent } from '../../analytics/analytics'

function ResumePreviewDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null)
  const [previewState, setPreviewState] = useState<
    'loading' | 'ready' | 'error'
  >('loading')

  useDialogAccessibility(dialogRef, onClose)

  useEffect(() => {
    if (!profile.resume) return
    const controller = new AbortController()
    fetch(profile.resume, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get('content-type') ?? ''
        if (!response.ok || !contentType.includes('application/pdf')) {
          throw new Error('The resume PDF could not be loaded.')
        }
        setPreviewState('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error('Unable to load the resume preview.', error)
        setPreviewState('error')
      })
    return () => controller.abort()
  }, [])

  if (!profile.resume) return null

  return createPortal(
    <div
      className="dialog-backdrop resume-preview-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="resume-preview-dialog"
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        aria-describedby="resume-preview-status"
      >
        <header className="resume-preview-header">
          <div>
            <span className="section-eyebrow">CURRICULUM VITAE</span>
            <h2 id="resume-preview-title">Resume preview</h2>
          </div>
          <div className="resume-preview-actions">
            <a
              className="button button-secondary"
              href={profile.resume}
              download="Shanjai-Senthil-Resume.pdf"
              onClick={() =>
                trackAnalyticsEvent({
                  name: 'resume_download_click',
                  params: { placement: 'resume_preview' },
                })
              }
            >
              <Download size={15} /> Download PDF
            </a>
            <a
              className="button button-secondary resume-open-link"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} /> Open PDF
            </a>
            <button
              className="icon-button"
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
            >
              <X size={18} />
            </button>
          </div>
        </header>
        <div className="resume-preview-body">
          {previewState !== 'error' && (
            <iframe
              className="resume-preview-frame"
              src={profile.resume}
              title="Shanjai Senthil resume PDF"
              tabIndex={-1}
              onError={() => setPreviewState('error')}
              aria-describedby="resume-preview-status"
            />
          )}
          <p
            className={`resume-preview-status${previewState === 'ready' ? ' is-hidden' : ''}`}
            id="resume-preview-status"
            role={previewState === 'error' ? 'alert' : 'status'}
          >
            {previewState === 'loading'
              ? 'Loading resume PDF…'
              : previewState === 'error'
                ? 'The PDF preview could not be loaded. Use Download PDF to open the resume.'
                : 'Resume PDF preview loaded.'}
          </p>
        </div>
      </section>
    </div>,
    document.body,
  )
}

function ResumeLink() {
  const [previewOpen, setPreviewOpen] = useState(false)

  if (profile.resume) {
    return (
      <>
        <a
          className="button button-quiet"
          href={profile.resume}
          download="Shanjai-Senthil-Resume.pdf"
          onClick={() =>
            trackAnalyticsEvent({
              name: 'resume_download_click',
              params: { placement: 'hero' },
            })
          }
        >
          <Download size={15} /> Download resume
        </a>
        <button
          className="button button-quiet"
          type="button"
          onClick={() => {
            trackAnalyticsEvent({
              name: 'resume_preview_click',
              params: { placement: 'hero' },
            })
            setPreviewOpen(true)
          }}
        >
          <Eye size={15} /> Preview resume
        </button>
        {previewOpen && (
          <ResumePreviewDialog onClose={() => setPreviewOpen(false)} />
        )}
      </>
    )
  }
  return (
    <button
      className="button button-quiet resume-unavailable"
      type="button"
      disabled
      title="Resume PDF has not been provided yet"
      aria-label="Resume download unavailable: add public/resume.pdf"
    >
      <Download size={15} /> Resume PDF unavailable
    </button>
  )
}

export default ResumeLink
