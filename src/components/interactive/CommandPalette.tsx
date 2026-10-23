import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowRight, Code2, Command } from 'lucide-react'
import { navigationSections as sections } from '../../data/navigation'
import useDialogAccessibility from '../../hooks/useDialogAccessibility'
import type { NavigationSection } from '../../analytics/analytics'

export default function CommandPalette({
  open,
  onClose,
  navigateTo,
}: {
  open: boolean
  onClose: () => void
  navigateTo: (id: NavigationSection) => void
}) {
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  useDialogAccessibility(paletteRef, onClose, open, false)
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement
    const focusTimer = window.setTimeout(() => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        paletteRef.current?.focus({ preventScroll: true })
      } else {
        inputRef.current?.focus({ preventScroll: true })
      }
    }, 20)
    return () => {
      window.clearTimeout(focusTimer)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open])
  const matches = sections.filter(([, label]) =>
    label.toLowerCase().includes(query.toLowerCase()),
  )
  return createPortal(
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
            className="command-palette clarity-mask"
            ref={paletteRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Navigate portfolio"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            onKeyDown={(event) => {
              if (event.key !== 'Tab') return
              const focusable =
                paletteRef.current?.querySelectorAll<HTMLElement>(
                  'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
                )
              if (!focusable?.length) return
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
    </AnimatePresence>,
    document.body,
  )
}
