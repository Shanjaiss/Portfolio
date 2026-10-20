import { m } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { Experience as ExperienceData } from '../../data/experience'

type ExperienceCardProps = {
  job: ExperienceData
  index: number
  expanded: boolean
  reduceMotion: boolean | null
  onToggle: () => void
}

export default function ExperienceCard({
  job,
  index,
  expanded,
  reduceMotion,
  onToggle,
}: ExperienceCardProps) {
  return (
    <m.article
      className="experience-card"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
    >
      <div className="timeline-marker">
        <span>0{index + 1}</span>
      </div>
      <button
        className="experience-card-head"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`experience-details-${index}`}
      >
        <span className="experience-heading-group">
          <span className="experience-period">{job.period}</span>
          <span className="experience-title" role="heading" aria-level={3}>
            {job.role}
          </span>
          <span className="company-name">
            {job.company}
            <span> · {job.location}</span>
          </span>
        </span>
        <ChevronDown
          className={`experience-chevron${expanded ? ' is-open' : ''}`}
          size={19}
        />
      </button>
      <div
        className="experience-details"
        id={`experience-details-${index}`}
        hidden={!expanded}
      >
        <ul>
          {job.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="tag-list">
          {job.technologies.map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </m.article>
  )
}
