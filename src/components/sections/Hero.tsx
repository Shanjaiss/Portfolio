import { m } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Code2, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import ResumeLink from '../ui/ResumeLink'

type HeroProps = {
  navigateTo: (id: string) => void
  roleTitle: string
  reduceMotion: boolean | null
}

export default function Hero({
  navigateTo,
  roleTitle,
  reduceMotion,
}: HeroProps) {
  return (
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
          {roleTitle}
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
  )
}
