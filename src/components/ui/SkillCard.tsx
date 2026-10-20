import { m } from 'motion/react'
import { Code2 } from 'lucide-react'
import type { skillGroups } from '../../data/skills'

type SkillCardProps = {
  group: (typeof skillGroups)[number]
  index: number
  reduceMotion: boolean | null
}

export default function SkillCard({
  group,
  index,
  reduceMotion,
}: SkillCardProps) {
  return (
    <m.article
      className="skill-card"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
    >
      <div className="skill-card-top">
        <span className="skill-number">0{index + 1}</span>
        <Code2 size={17} />
      </div>
      <h3>{group.name}</h3>
      <p>{group.description}</p>
      <div className="tag-list">
        {group.skills.map((skill) => (
          <span className="tag" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </m.article>
  )
}
