import { skillGroups } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import SkillCard from '../ui/SkillCard'

type SkillsProps = { reduceMotion: boolean | null }

export default function Skills({ reduceMotion }: SkillsProps) {
  return (
    <section className="section-wrap content-section" id="skills">
      <SectionHeading
        eyebrow="MY TOOLKIT"
        title="Tools for thoughtful"
        accent="engineering."
        number="03"
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <SkillCard
            key={group.name}
            group={group}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </section>
  )
}
