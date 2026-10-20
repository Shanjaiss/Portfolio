import { GraduationCap } from 'lucide-react'
import { education } from '../../data/education'

export default function Education() {
  return (
    <article className="education-card">
      <div className="education-icon">
        <GraduationCap size={22} />
      </div>
      <div className="education-copy">
        <span className="eyebrow-small">EDUCATION · 2023</span>
        <h3>
          {education.degree} <span>({education.abbreviation})</span>
        </h3>
        <p>
          {education.field} · {education.institution}
        </p>
      </div>
      <div className="education-score">
        <strong>{education.cgpa}</strong>
        <span>CGPA</span>
      </div>
      <span className="education-date">
        {education.graduated.toUpperCase()}
      </span>
    </article>
  )
}
