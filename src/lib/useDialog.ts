import { useEffect, useRef } from 'react'

/**
 * The behaviour `aria-modal="true"` promises.
 *
 * Both dialogs in this app declared it and delivered none of it. Escape was
 * bound to the one element that happened to have focus on open — the search
 * input, the picker's scrim — so the moment a mouse user clicked a result or
 * pressed Tab, Escape stopped working. Tab then walked straight out of the
 * dialog into the page behind it, and closing left focus wherever it had
 * wandered rather than back on the control that opened it.
 *
 * All of that is one hook, used by both:
 *
 * - Escape listens on `document`, so it works wherever focus is.
 * - Tab and Shift+Tab wrap inside the dialog.
 * - The scroll position behind the dialog is frozen, so dismissing does not
 *   land the reader somewhere else on the page.
 * - Focus returns to whatever was focused when the dialog opened.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const container = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return

    const opener = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const root = container.current
      if (!root) return
      // Order matters and `disabled`/hidden elements must not be landed on, so
      // read the live DOM rather than caching a list at open time — the picker's
      // grid changes length on every keystroke in its filter.
      const focusable = [
        ...root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null || el === document.activeElement)
      if (focusable.length === 0) return
      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    // Freezing with `position: fixed` would jump the page to the top; locking
    // overflow keeps the scroll offset exactly where the reader left it.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      // Only take focus back if it is still inside the dialog being torn down;
      // choosing a search hit deliberately moves focus into the page.
      const active = document.activeElement
      if (!active || active === document.body || container.current?.contains(active)) {
        opener?.focus?.()
      }
    }
  }, [open])

  return container
}
