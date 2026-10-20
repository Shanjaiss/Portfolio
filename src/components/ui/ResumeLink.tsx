import { Download } from 'lucide-react'
import { profile } from '../../data/profile'

function ResumeLink() {
  if (profile.resume) {
    return (
      <a className="button button-quiet" href={profile.resume} download>
        <Download size={15} /> Download resume
      </a>
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
