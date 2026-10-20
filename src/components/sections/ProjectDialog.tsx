import { useEffect, useRef, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import type { Project } from '../../data/projects'

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement
    dialogRef.current?.querySelector('button')?.focus()
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [project])

  if (!project) return null
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <section
        className="project-dialog"
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
          if (event.key === 'Escape') {
            onClose()
            return
          }
          if (event.key !== 'Tab') return
          const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
            'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])',
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
      >
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X size={19} />
        </button>
        <span className="section-eyebrow">
          <span>CASE STUDY</span> {project.company} · {project.type}
        </span>
        <h2 id="project-dialog-title">
          {project.name}
          <em>.</em>
        </h2>
        <p className="dialog-overview">{project.overview}</p>
        <div className="dialog-content-grid">
          <div>
            <h3>Business context</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>Implementation highlights</h3>
            <ul>
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Technical challenges</h3>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dialog-feature-list">
          <h3>Workflow capabilities</h3>
          <div className="tag-list">
            {project.features.map((feature) => (
              <span className="tag" key={feature}>
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="dialog-technologies">
          <span>TECHNOLOGIES</span>
          <div className="tag-list">
            {project.technologies.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="dialog-disclaimer">
          Professional contribution at {project.company}; not an independently
          owned product. Conceptual presentation only.
        </p>
      </section>
    </div>
  )
}

export default ProjectDialog
