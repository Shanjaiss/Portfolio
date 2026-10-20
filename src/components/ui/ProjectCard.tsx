import { m } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'
import ProjectVisual from '../sections/ProjectVisual'

type ProjectCardProps = {
  project: Project
  index: number
  reduceMotion: boolean | null
  onOpen: () => void
}

export default function ProjectCard({
  project,
  index,
  reduceMotion,
  onOpen,
}: ProjectCardProps) {
  return (
    <m.article
      className={`project-card project-${project.visual}`}
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        duration: reduceMotion ? 0 : 0.28,
        delay: reduceMotion ? 0 : index * 0.025,
      }}
    >
      <button
        className="project-open"
        onClick={onOpen}
        aria-label={`Read ${project.name} case study`}
      >
        <ArrowUpRight size={17} />
      </button>
      <ProjectVisual type={project.visual} name={project.name} />
      <div className="project-card-content">
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{project.company}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <div className="tag-list">
          {project.technologies.slice(0, 4).map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-card-footer">
          <span>View case study</span>
          <ArrowRight size={15} />
        </div>
      </div>
    </m.article>
  )
}
