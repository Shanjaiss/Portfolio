import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { projects, type Project } from '../../data/projects'
import type { ProjectFilterValue } from '../../data/projectFilters'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import ProjectDialog from './ProjectDialog'
import ProjectFilter from '../interactive/ProjectFilter'
import { trackAnalyticsEvent } from '../../analytics/analytics'
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
            Engineering projects and professional contributions. Conceptual
            illustrations — not proprietary application screenshots.
          </p>
          <div className="projects-toolbar">
            <ProjectFilter value={filter} onChange={setFilter} />
            <span className="project-count">
              {filteredProjects.length < 10
                ? `0${filteredProjects.length}`
                : filteredProjects.length}{' '}
              PROJECTS
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
                  onOpen={() => {
                    trackAnalyticsEvent({
                      name: 'project_case_study_open',
                      params: { project_id: project.id },
                    })
                    setSelectedProject(project)
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
          <p className="project-disclaimer">
            <span /> Independent project source code available on GitHub. Client
            and employer contributions represent professional work.
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
