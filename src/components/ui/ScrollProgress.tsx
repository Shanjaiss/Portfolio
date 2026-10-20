type ScrollProgressProps = {
  progress: number
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
