import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { ArrowRight, Terminal as TerminalIcon } from 'lucide-react'
import { profile } from '../../data/profile'

export default function DeveloperTerminal({
  navigateTo,
}: {
  navigateTo: (id: string) => void
}) {
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
