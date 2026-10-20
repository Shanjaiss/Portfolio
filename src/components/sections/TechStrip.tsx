const technologies = [
  'React.js',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MySQL',
  'MongoDB',
]

export default function TechStrip() {
  return (
    <section className="tech-strip" aria-label="Core technologies">
      <div className="tech-strip-inner">
        <span className="strip-label">WORKING WITH</span>
        {technologies.map((item) => (
          <span className="tech-word" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
