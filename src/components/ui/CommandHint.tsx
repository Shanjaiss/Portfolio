import { Command } from 'lucide-react'

type CommandHintProps = {
  onOpen: () => void
}

export default function CommandHint({ onOpen }: CommandHintProps) {
  return (
    <button
      className="command-hint"
      onClick={onOpen}
      aria-label="Open command palette"
    >
      <Command size={15} />
      <span>Navigate</span>
      <kbd>⌘ K</kbd>
    </button>
  )
}
