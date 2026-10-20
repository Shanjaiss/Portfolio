type SectionHeadingProps = {
  eyebrow: string
  title: string
  accent: string
  number: string
}

function SectionHeading({
  eyebrow,
  title,
  accent,
  number,
}: SectionHeadingProps) {
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

export default SectionHeading
