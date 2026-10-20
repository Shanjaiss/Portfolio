import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects, type Project } from '../../data/projects'
import type { ProjectFilterValue } from '../../data/projectFilters'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import ProjectDialog from './ProjectDialog'
import ProjectFilter from '../interactive/ProjectFilter'
type ProjectsProps = { reduceMotion: boolean | null }

export default function Projects({ reduceMotion }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilterValue>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category.includes(filter))
  return (
    <>
      <section className="projects-section" id="projects">
        <div className="section-wrap content-section">
          <SectionHeading
            eyebrow="SELECTED CONTRIBUTIONS"
            title="Work with"
            accent="real-world edges."
            number="04"
          />
          <p className="section-intro">
            Product work contributed to as part of engineering teams. These are
            conceptual illustrations — not proprietary application screenshots.
          </p>
          <div className="projects-toolbar">
            <ProjectFilter value={filter} onChange={setFilter} />
            <span className="project-count">
              0{filteredProjects.length} PROJECTS
            </span>
          </div>
          <div className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  reduceMotion={reduceMotion}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>
          <p className="project-disclaimer">
            <span /> Professional contributions; not independently owned
            products. No live demos or repositories are published.
          </p>
        </div>
      </section>
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
