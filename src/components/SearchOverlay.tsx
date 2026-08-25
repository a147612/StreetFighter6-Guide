import { useEffect, useMemo, useRef, useState } from 'react'
import { GlassPanel } from './glass/GlassPanel'
import { search, type SearchHit } from '~/lib/search'
import { useT } from '~/i18n/useT'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
  onPick: (hit: SearchHit) => void
}

/**
 * Lookup, not navigation.
 *
 * Reaching a row currently costs three choices — seat, group, situation — which
 * is the wrong shape for something consulted between matches. This turns a
 * remembered phrase into one jump, and a query naming both a place and an
 * option resolves to the exact cell rather than the situation containing it.
 */
export function SearchOverlay({ open, onClose, onPick }: SearchOverlayProps) {
  const { t, locale } = useT()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const hits = useMemo(() => search(query, locale), [query, locale])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // The dialog mounts on this frame; focus after the browser has laid it out.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open) return null

  function choose(hit: SearchHit | undefined): void {
    if (!hit) return
    onPick(hit)
    onClose()
  }

  function onKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Escape') {
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, hits.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      choose(hits[active])
    }
  }

  return (
    <div
      className="liquid-glass-scrim searchscrim"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <GlassPanel
        modal
        className="searchbox"
        role="dialog"
        aria-modal="true"
        aria-label={t.search.label}
      >
        <input
          ref={inputRef}
          type="search"
          className="searchbox__input"
          value={query}
          placeholder={t.search.placeholder}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          aria-controls="search-results"
        />

        {query.trim() === '' ? (
          <p className="searchbox__hint small muted">{t.search.hint}</p>
        ) : hits.length === 0 ? (
          <p className="searchbox__hint small muted">{t.search.empty}</p>
        ) : (
          <ul className="searchbox__results" id="search-results" role="listbox">
            {hits.map((hit, index) => (
              <li key={`${hit.situationId}:${hit.optionId ?? ''}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={`searchhit ${index === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(hit)}
                >
                  <span className="searchhit__kind small">
                    {hit.kind === 'cell' ? t.search.cells : t.search.situations}
                  </span>
                  <span className="searchhit__label">{hit.label}</span>
                  <span className="searchhit__context small muted">{hit.context}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </GlassPanel>
    </div>
  )
}
