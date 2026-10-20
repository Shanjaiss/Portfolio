import { ArrowRight, Code2, Layers3 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

type AboutProps = {
  navigateTo: (id: string) => void
}

export default function About({ navigateTo }: AboutProps) {
  return (
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
            I build <span>reliable products</span> where thoughtful interfaces
            meet dependable systems.
          </p>
          <p>
            I’m Shanjai Senthil, a Full Stack Developer based in Bengaluru,
            India. I have nearly three years of experience developing and
            maintaining production web applications.
          </p>
          <p>
            My expertise includes React.js, TypeScript, JavaScript, Node.js,
            Express.js, REST APIs, MySQL, and MongoDB. I have worked extensively
            on FinTech and algorithmic trading platforms, developing broker
            integrations, trading workflows, authentication systems, API
            integrations, and data-driven applications.
          </p>
          <p>
            I enjoy building reliable, scalable solutions, collaborating with
            engineering teams, and turning complex requirements into intuitive
            user experiences.
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
  )
}
