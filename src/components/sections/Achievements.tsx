import { m } from 'motion/react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FileText,
  Layers3,
} from 'lucide-react'
import { achievements } from '../../data/achievements'
import Education from './Education'
import SectionHeading from '../ui/SectionHeading'

const icons = {
  layers: Layers3,
  briefcase: BriefcaseBusiness,
  code: Code2,
  arrow: ArrowRight,
  file: FileText,
}
type AchievementsProps = { reduceMotion: boolean | null }

export default function Achievements({ reduceMotion }: AchievementsProps) {
  return (
    <section className="section-wrap content-section" id="achievements">
      <SectionHeading
        eyebrow="MILESTONES & CONTRIBUTIONS"
        title="Progress is made"
        accent="together."
        number="05"
      />
      <div className="achievement-grid">
        {achievements.map(({ icon, title, text }, index) => {
          const Icon = icons[icon]

          return (
            <m.article
              className="achievement-card"
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : index * 0.045,
              }}
            >
              <div className="achievement-icon">
                <Icon size={18} />
              </div>
              <span className="achievement-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </m.article>
          )
        })}
      </div>
      <Education />
    </section>
  )
}
