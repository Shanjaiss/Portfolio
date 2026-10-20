import { useEffect, useRef, useState } from 'react'
import { Download, Eye, X } from 'lucide-react'
import { profile } from '../../data/profile'

function ResumeLink() {
  const [previewOpen, setPreviewOpen] = useState(false)
  const previewButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!previewOpen) return

    const previousFocus = document.activeElement
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    previewButtonRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [previewOpen])

  if (profile.resume) {
    return (
      <>
        <a className="button button-quiet" href={profile.resume} download>
          <Download size={15} /> Download resume
        </a>
        <button
          className="button button-quiet"
          type="button"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye size={15} /> Preview resume
        </button>
        {previewOpen && (
          <div
            className="dialog-backdrop resume-preview-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPreviewOpen(false)
            }}
          >
            <section
              className="resume-preview-dialog"
              onKeyDown={(event) => {
                if (event.key !== 'Tab') return
                const focusable =
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    'a[href], button, iframe',
                  )
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault()
                  last?.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault()
                  first?.focus()
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-preview-title"
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
                    download
                  >
                    <Download size={15} /> Download PDF
                  </a>
                  <button
                    ref={previewButtonRef}
                    className="icon-button"
                    type="button"
                    onClick={() => setPreviewOpen(false)}
                    aria-label="Close resume preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>
              <iframe
                className="resume-preview-frame"
                src={profile.resume}
                title="Shanjai Senthil resume PDF"
              />
            </section>
          </div>
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
