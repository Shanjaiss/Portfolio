import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from 'motion/react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Command,
  Copy,
  Download,
  FileText,
  Filter,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sun,
  Terminal as TerminalIcon,
  X,
} from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { experience } from './data/experience'
import { projects, type Project } from './data/projects'
import { profile } from './data/profile'
import { skillGroups } from './data/skills'

const sections = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['achievements', 'Achievements'],
  ['contact', 'Contact'],
] as const

const achievements = [
  {
    icon: Layers3,
    title: 'Production FinTech',
    text: 'Delivered features across production FinTech and algorithmic trading platforms.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Broker integrations',
    text: 'Contributed to broker integrations and trading workflows.',
  },
  {
    icon: Code2,
    title: 'Operational tooling',
    text: 'Built broker configuration and API credential-management workflows.',
  },
  {
    icon: ArrowRight,
    title: 'State migration',
    text: 'Migrated approximately 70% of applicable Recoil implementations to TanStack Query hooks.',
  },
  {
    icon: FileText,
    title: 'Multilingual support',
    text: 'Implemented i18next localization for multilingual application support.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Team delivery',
    text: 'Participated in code reviews and pair programming.',
  },
]

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  subject: z.string().trim().min(3, 'Please add a subject.').max(150),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a little more detail.')
    .max(3000),
})

type ContactValues = z.infer<typeof contactSchema>
type Theme = 'dark' | 'light'
type ProjectFilter = 'All' | 'FinTech' | 'Frontend' | 'Full Stack' | 'SaaS'

const projectFilters: ProjectFilter[] = [
  'All',
  'FinTech',
  'Frontend',
  'Full Stack',
  'SaaS',
]
const roleTitles = [
  'Full Stack Developer',
  'React.js Developer',
  'TypeScript Developer',
  'Node.js Developer',
  'FinTech Application Developer',
]

function App() {
  const reduceMotion = useReducedMotion()
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('portfolio-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })
  const [activeSection, setActiveSection] = useState('home')
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [openExperience, setOpenExperience] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % roleTitles.length),
      3000,
    )
    return () => window.clearInterval(interval)
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
      const current = sections
        .map(([id]) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => section.getBoundingClientRect().top <= 150)
        .at(-1)
      if (current) setActiveSection(current.id)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setSelectedProject(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigateTo = (id: string) => {
    setPaletteOpen(false)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category.includes(filter))

  return (
    <LazyMotion features={domAnimation}>
      <div className={`site-shell${recruiterMode ? ' recruiter-mode' : ''}`}>
        <div
          aria-hidden="true"
          className="scroll-progress"
          style={{ transform: `scaleX(${progress})` }}
        />
        <header className="site-header">
          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('home')
            }}
            aria-label="Shanjai Senthil, home"
          >
            <span className="brand-mark">S</span>
            <span className="brand-name">
              shanjai<span>.</span>
            </span>
          </a>
          <nav
            className={`main-nav${menuOpen ? ' is-open' : ''}`}
            aria-label="Main navigation"
          >
            {sections.map(([id, label]) => (
              <a
                href={`#${id}`}
                key={id}
                className={activeSection === id ? 'active' : ''}
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  navigateTo(id)
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className={`recruiter-toggle${recruiterMode ? ' is-active' : ''}`}
              onClick={() => setRecruiterMode((mode) => !mode)}
              aria-pressed={recruiterMode}
              title="Toggle recruiter view"
            >
              <span className="toggle-dot" />
              Recruiter View
            </button>
            <button
              className="icon-button theme-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title="Switch theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </header>

        <main>
          {recruiterMode && (
            <div className="recruiter-banner">
              <span className="status-dot" />
              Recruiter view is on — concise overview, experience, and contact
              details highlighted.
            </div>
          )}
          <section className="hero section-wrap" id="home">
            <div className="hero-copy">
              <m.div
                className="eyebrow"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="status-dot" />
                FULL STACK ENGINEERING · FINTECH
              </m.div>
              <m.h1
                aria-label="Shanjai Senthil"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08 }}
              >
                SHANJAI
                <br />
                <span>SENTHIL</span>
                <i className="hero-period">.</i>
              </m.h1>
              <m.p
                className="hero-title"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
              >
                {roleTitles[roleIndex]}
                <span className="title-divider">/</span>
                <span className="hero-role">React · TypeScript · Node.js</span>
              </m.p>
              <p className="hero-headline">{profile.headline}</p>
              <p className="hero-description">{profile.introduction}</p>
              <div className="hero-ctas">
                <button
                  className="button button-primary"
                  onClick={() => navigateTo('projects')}
                >
                  Explore my work <ArrowDownRight size={16} />
                </button>
                <ResumeLink />
                <button
                  className="button button-quiet"
                  onClick={() => navigateTo('contact')}
                >
                  Contact me <ArrowUpRight size={15} />
                </button>
              </div>
              <div className="hero-meta">
                <span>
                  <MapPin size={14} /> Bengaluru, India
                </span>
                <span className="meta-divider" />
                <span>Nearly 3 years in production</span>
              </div>
            </div>
            <m.div
              className="hero-art"
              initial={reduceMotion ? false : { opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-glow" />
              <div className="terminal-window">
                <div className="terminal-top">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>shanjai.ts</span>
                  <Code2 size={14} />
                </div>
                <div className="terminal-content">
                  <div className="code-line">
                    <span className="line-number">01</span>
                    <span>
                      <b>const</b> developer = {'{'}
                    </span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">02</span>
                    <span>
                      <em>name</em>: <strong>'Shanjai Senthil'</strong>,
                    </span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">03</span>
                    <span>
                      <em>role</em>: <strong>'Full Stack Developer'</strong>,
                    </span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">04</span>
                    <span>
                      <em>location</em>: <strong>'Bengaluru, IN'</strong>,
                    </span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">05</span>
                    <span>
                      <em>focus</em>: [
                    </span>
                  </div>
                  <div className="code-line indent-more">
                    <span className="line-number">06</span>
                    <span>
                      <strong>'React'</strong>, <strong>'TypeScript'</strong>,
                    </span>
                  </div>
                  <div className="code-line indent-more">
                    <span className="line-number">07</span>
                    <span>
                      <strong>'Node.js'</strong>, <strong>'FinTech'</strong>
                    </span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">08</span>
                    <span>],</span>
                  </div>
                  <div className="code-line indent">
                    <span className="line-number">09</span>
                    <span>
                      <em>experience</em>: <strong>~3 years</strong>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">10</span>
                    <span>
                      {'}'}
                      <span className="cursor-block" />
                    </span>
                  </div>
                </div>
                <div className="terminal-bottom">
                  <span className="terminal-live" /> BUILDING FOR THE REAL WORLD{' '}
                  <span>UTF-8</span>
                </div>
              </div>
              <div className="floating-chip chip-top">
                <span className="chip-icon react-chip">⚛</span> React.js
              </div>
              <div className="floating-chip chip-bottom">
                <span className="chip-icon node-chip">N</span> Node.js{' '}
                <span className="chip-online" />
              </div>
            </m.div>
            <div className="hero-scroll">
              <span /> SCROLL TO EXPLORE
            </div>
          </section>

          <section className="tech-strip" aria-label="Core technologies">
            <div className="tech-strip-inner">
              <span className="strip-label">WORKING WITH</span>
              {[
                'React.js',
                'TypeScript',
                'Node.js',
                'Express.js',
                'MySQL',
                'MongoDB',
              ].map((item) => (
                <span className="tech-word" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="section-wrap content-section" id="about">
            <SectionHeading
              eyebrow="A LITTLE ABOUT ME"
              title="Good software starts with"
              accent="curiosity."
              number="01"
            />
            <div className="about-layout">
              <div className="about-intro">
                <p className="lead">
                  I build <span>reliable products</span> where thoughtful
                  interfaces meet dependable systems.
                </p>
                <p>
                  I’m Shanjai Senthil, a Full Stack Developer based in
                  Bengaluru, India. I have nearly three years of experience
                  developing and maintaining production web applications.
                </p>
                <p>
                  My expertise includes React.js, TypeScript, JavaScript,
                  Node.js, Express.js, REST APIs, MySQL, and MongoDB. I have
                  worked extensively on FinTech and algorithmic trading
                  platforms, developing broker integrations, trading workflows,
                  authentication systems, API integrations, and data-driven
                  applications.
                </p>
                <p>
                  I enjoy building reliable, scalable solutions, collaborating
                  with engineering teams, and turning complex requirements into
                  intuitive user experiences.
                </p>
                <button
                  className="text-link"
                  onClick={() => navigateTo('experience')}
                >
                  Get to know my experience <ArrowRight size={15} />
                </button>
              </div>
              <div className="about-grid">
                <div className="about-card about-card-main">
                  <span className="card-index">01 / EXPERIENCE</span>
                  <strong>
                    Nearly <em>3</em> years
                  </strong>
                  <p>building and maintaining production applications</p>
                  <div className="card-sparkline" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="about-card">
                  <span className="card-index">02 / SPECIALTY</span>
                  <strong>FinTech</strong>
                  <p>Trading workflows & broker integrations</p>
                  <Layers3 className="about-card-icon" size={22} />
                </div>
                <div className="about-card">
                  <span className="card-index">03 / APPROACH</span>
                  <strong>Full stack</strong>
                  <p>From React interfaces to REST APIs</p>
                  <Code2 className="about-card-icon" size={22} />
                </div>
                <div className="about-card about-card-wide">
                  <span className="card-index">04 / HOW I WORK</span>
                  <strong>Built to work together.</strong>
                  <p>Agile teams · Code reviews · Pair programming</p>
                  <div className="collab-avatars" aria-hidden="true">
                    <span>S</span>
                    <span>{'{}'}</span>
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                  <m.article
                    className="experience-card"
                    key={job.company}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
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
                      onClick={() =>
                        setOpenExperience((current) =>
                          current === index ? -1 : index,
                        )
                      }
                      aria-expanded={openExperience === index}
                      aria-controls={`experience-details-${index}`}
                    >
                      <span className="experience-heading-group">
                        <span className="experience-period">{job.period}</span>
                        <span
                          className="experience-title"
                          role="heading"
                          aria-level={3}
                        >
                          {job.role}
                        </span>
                        <span className="company-name">
                          {job.company}
                          <span> · {job.location}</span>
                        </span>
                      </span>
                      <ChevronDown
                        className={`experience-chevron${openExperience === index ? ' is-open' : ''}`}
                        size={19}
                      />
                    </button>
                    <div
                      className="experience-details"
                      id={`experience-details-${index}`}
                      hidden={openExperience !== index}
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
                ))}
              </div>
            </div>
          </section>

          <section className="section-wrap content-section" id="skills">
            <SectionHeading
              eyebrow="MY TOOLKIT"
              title="Tools for thoughtful"
              accent="engineering."
              number="03"
            />
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <m.article
                  className="skill-card"
                  key={group.name}
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
              ))}
            </div>
          </section>

          <section className="projects-section" id="projects">
            <div className="section-wrap content-section">
              <SectionHeading
                eyebrow="SELECTED CONTRIBUTIONS"
                title="Work with"
                accent="real-world edges."
                number="04"
              />
              <p className="section-intro">
                Product work contributed to as part of engineering teams. These
                are conceptual illustrations — not proprietary application
                screenshots.
              </p>
              <div className="projects-toolbar">
                <div className="filter-label">
                  <Filter size={14} /> FILTER
                </div>
                <div
                  className="filter-list"
                  role="group"
                  aria-label="Filter projects"
                >
                  {projectFilters.map((item) => (
                    <button
                      key={item}
                      className={`filter-chip${filter === item ? ' active' : ''}`}
                      onClick={() => setFilter(item)}
                      aria-pressed={filter === item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <span className="project-count">
                  0{filteredProjects.length} PROJECTS
                </span>
              </div>
              <div className="projects-grid">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <m.article
                      className={`project-card project-${project.visual}`}
                      key={project.id}
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
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Read ${project.name} case study`}
                      >
                        <ArrowUpRight size={17} />
                      </button>
                      <ProjectVisual
                        type={project.visual}
                        name={project.name}
                      />
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
                  ))}
                </AnimatePresence>
              </div>
              <p className="project-disclaimer">
                <span /> Professional contributions; not independently owned
                products. No live demos or repositories are published.
              </p>
            </div>
          </section>

          <section className="section-wrap content-section" id="achievements">
            <SectionHeading
              eyebrow="MILESTONES & CONTRIBUTIONS"
              title="Progress is made"
              accent="together."
              number="05"
            />
            <div className="achievement-grid">
              {achievements.map(({ icon: Icon, title, text }, index) => (
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
              ))}
            </div>
            <article className="education-card">
              <div className="education-icon">
                <GraduationCap size={22} />
              </div>
              <div className="education-copy">
                <span className="eyebrow-small">EDUCATION · 2023</span>
                <h3>
                  Bachelor of Engineering <span>(B.E.)</span>
                </h3>
                <p>
                  Computer Science and Engineering · Adhiyamaan College of
                  Engineering, Hosur
                </p>
              </div>
              <div className="education-score">
                <strong>8.20</strong>
                <span>CGPA</span>
              </div>
              <span className="education-date">MAY 2023</span>
            </article>
          </section>

          <TerminalWidget navigateTo={navigateTo} />

          <section className="contact-section" id="contact">
            <div className="section-wrap content-section">
              <SectionHeading
                eyebrow="YOUR NEXT TEAMMATE?"
                title="Let's Build Something"
                accent="Great Together"
                number="06"
              />
              <div className="contact-layout">
                <div className="contact-copy">
                  <p className="lead">
                    Have a thoughtful product to build? I’d love to hear what
                    you’re working on.
                  </p>
                  <p>
                    For roles and project conversations, email is the best way
                    to reach me.
                  </p>
                  <a className="email-card" href={`mailto:${profile.email}`}>
                    <span className="email-icon">
                      <Mail size={18} />
                    </span>
                    <span>
                      <small>DROP ME A LINE</small>
                      <strong>{profile.email}</strong>
                    </span>
                    <ArrowUpRight size={17} />
                  </a>
                  <div className="contact-actions">
                    <button
                      className="button button-secondary"
                      onClick={() =>
                        (window.location.href = `mailto:${profile.email}`)
                      }
                    >
                      Email me <ArrowUpRight size={15} />
                    </button>
                    <button className="button button-quiet" onClick={copyEmail}>
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? 'Copied' : 'Copy email'}
                    </button>
                  </div>
                  <div className="contact-location">
                    <MapPin size={15} /> {profile.location}
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a
            className="brand"
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('home')
            }}
          >
            <span className="brand-mark">S</span>
            <span className="brand-name">
              shanjai<span>.</span>
            </span>
          </a>
          <p>
            Designed and built with intent.<span> © Shanjai Senthil</span>
          </p>
          <button className="footer-top" onClick={() => navigateTo('home')}>
            BACK TO TOP <ArrowUpRight size={14} />
          </button>
        </footer>

        <button
          className="command-hint"
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
        >
          <Command size={15} />
          <span>Navigate</span>
          <kbd>⌘ K</kbd>
        </button>
        <CommandPalette
          key={paletteOpen ? 'open' : 'closed'}
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          navigateTo={navigateTo}
        />
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </LazyMotion>
  )
}

function SectionHeading({
  eyebrow,
  title,
  accent,
  number,
}: {
  eyebrow: string
  title: string
  accent: string
  number: string
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-eyebrow">
          <span>{number}</span> {eyebrow}
        </div>
        <h2>
          {title} <em>{accent}</em>
        </h2>
      </div>
      <span className="heading-decoration" aria-hidden="true">
        ✳
      </span>
    </div>
  )
}

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

function ProjectVisual({
  type,
  name,
}: {
  type: Project['visual']
  name: string
}) {
  return (
    <div
      className={`project-visual visual-${type}`}
      role="img"
      aria-label={`${name} conceptual illustration, not a proprietary application screenshot`}
    >
      <div className="visual-window">
        <div className="visual-window-top">
          <span />
          <span />
          <span />
          <i>CONCEPTUAL UI</i>
        </div>
        {type === 'trading' && (
          <div className="trading-ui">
            <div className="visual-sidebar">
              <b />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="trading-main">
              <div className="visual-heading">
                <span>MARKET OVERVIEW</span>
                <i>SAMPLE UI</i>
              </div>
              <div className="market-metrics">
                <span>
                  PORTFOLIO VALUE<strong>— SAMPLE</strong>
                </span>
                <span>
                  OPEN POSITIONS
                  <strong>
                    — <em>SAMPLE</em>
                  </strong>
                </span>
                <span>
                  DAY P&amp;L<strong className="green-text">— SAMPLE</strong>
                </span>
              </div>
              <div className="chart-area">
                <div className="chart-lines" />
                <svg
                  viewBox="0 0 420 100"
                  role="img"
                  aria-label="Illustrative market activity chart"
                >
                  <path d="M0 80 C25 72 30 84 52 62 S80 72 101 49 S130 57 151 44 S170 58 198 31 S223 48 246 39 S273 54 299 22 S324 38 352 30 S379 42 420 8" />
                </svg>
              </div>
              <div className="visual-table">
                <span>INSTRUMENT</span>
                <span>POSITION</span>
                <span>STATUS</span>
                <b>SYMBOL A</b>
                <b>—</b>
                <em>ACTIVE</em>
                <b>SYMBOL B</b>
                <b>—</b>
                <em>MONITORING</em>
              </div>
            </div>
          </div>
        )}
        {type === 'config' && (
          <div className="config-ui">
            <div className="config-title">
              <span>Broker connections</span>
              <i>+ Add broker</i>
            </div>
            {['Broker A', 'Broker B', 'Broker C'].map((broker, index) => (
              <div className="broker-row" key={broker}>
                <span className={`broker-logo broker-${index}`}>
                  {broker.slice(0, 1)}
                </span>
                <span>
                  <b>{broker}</b>
                  <small>
                    {index === 1
                      ? 'Static IP configured'
                      : 'Configuration active'}
                  </small>
                </span>
                <em>{index === 2 ? 'REVIEW' : 'CONNECTED'}</em>
                <ArrowUpRight size={13} />
              </div>
            ))}
            <div className="config-footer">
              <span>STATIC IP</span>
              <strong>••••••••</strong>
              <i>VALIDATED</i>
            </div>
          </div>
        )}
        {type === 'credentials' && (
          <div className="credentials-ui">
            <div className="credential-header">
              <span>API connections</span>
              <i>SECURE AREA</i>
            </div>
            <div className="credential-card">
              <span className="credential-logo">API</span>
              <span>
                <b>Broker integration</b>
                <small>Authentication settings</small>
              </span>
              <em>CONNECTED</em>
            </div>
            <div className="credential-form">
              <label>
                API KEY <span>••••••••••••••••</span>
              </label>
              <label>
                SECRET <span>••••••••••••••••</span>
              </label>
              <div className="credential-save">
                Configuration validated <Check size={13} />
              </div>
            </div>
          </div>
        )}
        {type === 'vendor' && (
          <div className="vendor-ui">
            <div className="vendor-heading">
              <span>
                Vendors <small>/ Directory</small>
              </span>
              <i>+ Add vendor</i>
            </div>
            <div className="vendor-stats">
              <span>
                TOTAL VENDORS<strong>—</strong>
              </span>
              <span>
                ONBOARDING<strong>—</strong>
              </span>
            </div>
            <div className="vendor-table">
              <span>VENDOR</span>
              <span>STATUS</span>
              <span>UPDATED</span>
              <b>
                <i>01</i> Vendor 001
              </b>
              <em>ACTIVE</em>
              <small>Today</small>
              <b>
                <i>02</i> Vendor 002
              </b>
              <em className="pending">REVIEW</em>
              <small>Yesterday</small>
              <b>
                <i>03</i> Vendor 003
              </b>
              <em>ACTIVE</em>
              <small>Recently</small>
            </div>
          </div>
        )}
      </div>
      <span className="visual-caption">
        Illustrative concept · No proprietary product imagery
      </span>
    </div>
  )
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement
    dialogRef.current?.querySelector('button')?.focus()
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [project])

  if (!project) return null
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <section
        className="project-dialog"
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
          if (event.key !== 'Tab') return
          const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
            'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])',
          )
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
      >
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close case study"
        >
          <X size={19} />
        </button>
        <span className="section-eyebrow">
          <span>CASE STUDY</span> {project.company} · {project.type}
        </span>
        <h2 id="project-dialog-title">
          {project.name}
          <em>.</em>
        </h2>
        <p className="dialog-overview">{project.overview}</p>
        <div className="dialog-content-grid">
          <div>
            <h3>Business context</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>Implementation highlights</h3>
            <ul>
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Technical challenges</h3>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dialog-feature-list">
          <h3>Workflow capabilities</h3>
          <div className="tag-list">
            {project.features.map((feature) => (
              <span className="tag" key={feature}>
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="dialog-technologies">
          <span>TECHNOLOGIES</span>
          <div className="tag-list">
            {project.technologies.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="dialog-disclaimer">
          Professional contribution at {project.company}; not an independently
          owned product. Conceptual presentation only.
        </p>
      </section>
    </div>
  )
}

function CommandPalette({
  open,
  onClose,
  navigateTo,
}: {
  open: boolean
  onClose: () => void
  navigateTo: (id: string) => void
}) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])
  const matches = sections.filter(([, label]) =>
    label.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.16 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <m.div
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Navigate portfolio"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
          >
            <div className="palette-search">
              <Command size={17} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Where would you like to go?"
                aria-label="Search sections"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="palette-label">JUMP TO</div>
            {matches.length ? (
              matches.map(([id, label], index) => (
                <button
                  className="palette-option"
                  key={id}
                  onClick={() => navigateTo(id)}
                >
                  <span className="palette-option-icon">
                    {index === 0 ? (
                      <Code2 size={16} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </span>
                  {label}
                  <span className="palette-shortcut">↵</span>
                </button>
              ))
            ) : (
              <p className="palette-empty">No sections match “{query}”.</p>
            )}
            <div className="palette-footer">
              TIP{' '}
              <span>
                Use <kbd>⌘</kbd>
                <kbd>K</kbd> to open anytime
              </span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function TerminalWidget({ navigateTo }: { navigateTo: (id: string) => void }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([
    'Welcome to shanjai.dev — type “help” to explore.',
  ])
  const terminalRef = useRef<HTMLDivElement>(null)
  const commands: Record<string, { output: string; section?: string }> = {
    help: {
      output:
        'Available: about · skills · experience · projects · contact · resume',
    },
    about: {
      output:
        'Full Stack Developer in Bengaluru with nearly 3 years of experience.',
      section: 'about',
    },
    skills: {
      output: 'React.js · TypeScript · Node.js · Express.js · MySQL · MongoDB',
      section: 'skills',
    },
    experience: {
      output: 'Finolab Technologies · Sailboat Technologies',
      section: 'experience',
    },
    projects: {
      output: 'Browse four professional contribution case studies.',
      section: 'projects',
    },
    contact: { output: profile.email, section: 'contact' },
    resume: {
      output: 'Resume PDF unavailable — please request a copy by email.',
      section: 'contact',
    },
  }
  const runCommand = (value: string) => {
    const command = value.trim().toLowerCase()
    const response = commands[command]
    setOutput((previous) => [
      ...previous.slice(-4),
      `› ${value}`,
      response?.output ??
        `Unknown command: ${command || '(empty)'}. Type “help” for available commands.`,
    ])
    setInput('')
    if (response?.section)
      window.setTimeout(() => navigateTo(response.section!), 220)
  }
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(input)
  }
  const onTerminalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setInput('help')
    }
  }
  return (
    <section className="terminal-section">
      <div className="section-wrap terminal-wrap">
        <div className="terminal-section-copy">
          <div className="section-eyebrow">
            <span>TRY IT YOURSELF</span> A TINY DEVELOPER TERMINAL
          </div>
          <h2>
            Curiosity has <br />
            <em>a command.</em>
          </h2>
          <p>
            Type a command to explore the portfolio. Safe, predefined commands
            only — no shell execution.
          </p>
        </div>
        <div className="interactive-terminal" ref={terminalRef}>
          <div className="interactive-terminal-top">
            <span className="terminal-icon">
              <TerminalIcon size={15} />
            </span>
            <span>visitor@shanjai.dev: ~</span>
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="terminal-output" aria-live="polite">
            {output.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className={line.startsWith('›') ? 'command-line' : ''}
              >
                {line}
              </p>
            ))}
          </div>
          <form className="terminal-input-row" onSubmit={onSubmit}>
            <span>
              visitor@portfolio <b>~</b> $
            </span>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onTerminalKeyDown}
              aria-label="Enter a portfolio terminal command"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" aria-label="Run command">
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="terminal-commands">
            {['help', 'about', 'skills', 'projects'].map((command) => (
              <button key={command} onClick={() => runCommand(command)}>
                {command}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [mailtoOpened, setMailtoOpened] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = (values: ContactValues) => {
    const subject = encodeURIComponent(values.subject)
    const body = encodeURIComponent(
      `From: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    )
    setMailtoOpened(true)
    window.location.assign(
      `mailto:${profile.email}?subject=${subject}&body=${body}`,
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-heading">
        <span>CONTACT FORM</span>
        <span>
          <span className="status-dot" /> EMAIL APP FALLBACK
        </span>
      </div>
      <div className="form-row">
        <label>
          Full name
          <input
            {...register('name')}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <small className="field-error" id="name-error">
              {errors.name.message}
            </small>
          )}
        </label>
        <label>
          Email address
          <input
            {...register('email')}
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <small className="field-error" id="email-error">
              {errors.email.message}
            </small>
          )}
        </label>
      </div>
      <label>
        Subject
        <input
          {...register('subject')}
          placeholder="What's on your mind?"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <small className="field-error" id="subject-error">
            {errors.subject.message}
          </small>
        )}
      </label>
      <label>
        Message
        <textarea
          {...register('message')}
          rows={4}
          placeholder="A little about the opportunity or project..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <small className="field-error" id="message-error">
            {errors.message.message}
          </small>
        )}
      </label>
      <button className="button button-primary form-submit" type="submit">
        Open email draft <Send size={15} />
      </button>
      <p className="form-note" role="status">
        {mailtoOpened
          ? 'Your email app should open with a draft. The message is not sent until you send it.'
          : 'Your email app will open with your message ready. Nothing is sent from this site.'}
      </p>
    </form>
  )
}

export default App
