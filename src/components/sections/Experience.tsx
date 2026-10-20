import { useState } from 'react'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import ExperienceCard from '../ui/ExperienceCard'

type ExperienceSectionProps = { reduceMotion: boolean | null }

export default function Experience({ reduceMotion }: ExperienceSectionProps) {
  const [openExperience, setOpenExperience] = useState(0)
  return (
    <section className="experience-section" id="experience">
      <div className="section-wrap content-section">
        <SectionHeading
          eyebrow="WHERE I’VE WORKED"
          title="Experience that ships"
          accent="to production."
          number="02"
        />
        <div className="timeline">
          <div className="timeline-line" aria-hidden="true">
            <span />
          </div>
          {experience.map((job, index) => (
            <ExperienceCard
              key={job.company}
              job={job}
              index={index}
              expanded={openExperience === index}
              reduceMotion={reduceMotion}
              onToggle={() =>
                setOpenExperience((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
