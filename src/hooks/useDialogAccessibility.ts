import { useEffect, useRef, type RefObject } from 'react'

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function useDialogAccessibility<T extends HTMLElement>(
  dialogRef: RefObject<T | null>,
  onClose: () => void,
  active = true,
) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!active) return
    const dialog = dialogRef.current
    if (!dialog) return

    const appRoot = document.getElementById('root')
    const previousFocus = document.activeElement
    const previousRootOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPaddingRight = document.body.style.paddingRight
    const previousRootInert = appRoot?.inert ?? false
    const previousRootAriaHidden = appRoot
      ? appRoot.getAttribute('aria-hidden')
      : null
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    if (appRoot) {
      appRoot.inert = true
      appRoot.setAttribute('aria-hidden', 'true')
    }

    const focusables = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true')

    const initialFocus = focusables()[0]
    ;(initialFocus ?? dialog).focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const elements = focusables()
      const first = elements[0]
      const last = elements.at(-1)
      if (!first || !last) {
        event.preventDefault()
        dialog.focus()
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.documentElement.style.overflow = previousRootOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.paddingRight = previousBodyPaddingRight
      if (appRoot) {
        appRoot.inert = previousRootInert
        if (previousRootAriaHidden === null) {
          appRoot.removeAttribute('aria-hidden')
        } else {
          appRoot.setAttribute('aria-hidden', previousRootAriaHidden)
        }
      }
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [active, dialogRef])
}
