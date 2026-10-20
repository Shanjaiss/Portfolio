type RecruiterModeProps = {
  enabled: boolean
  onToggle: () => void
}

export function RecruiterToggle({ enabled, onToggle }: RecruiterModeProps) {
  return (
    <button
      className={`recruiter-toggle${enabled ? ' is-active' : ''}`}
      onClick={onToggle}
      aria-pressed={enabled}
      title="Toggle recruiter view"
    >
      <span className="toggle-dot" />
      Recruiter View
    </button>
  )
}

export default function RecruiterMode({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <div className="recruiter-banner">
      <span className="status-dot" />
      Recruiter view is on — concise overview, experience, and contact details
      highlighted.
    </div>
  )
}
