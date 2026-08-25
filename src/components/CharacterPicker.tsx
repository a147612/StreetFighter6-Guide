import { useEffect, useMemo, useRef, useState } from 'react'
import { GlassPanel } from './glass/GlassPanel'
import { useCharacterName } from './CharacterName'
import { CharacterFace } from './viz/CharacterFace'
import { CHARACTERS, getCharacter } from '~/data'
import type { CharacterOverlay, I18nText } from '~/data/schema'
import { characterStore, useCharacter } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/** Localised name first, Latin underneath — see useCharacterName for why. */
function TileName({ name, warn }: { name: I18nText; warn: string | null }) {
  const { primary, latin } = useCharacterName(name)
  return (
    <>
      <span className="chartile__name">
        {primary}
        {warn && (
          <span className="chartile__warn" aria-label={warn}>
            {' '}
            ⚠
          </span>
        )}
      </span>
      {latin && <span className="chartile__latin small faint">{latin}</span>}
    </>
  )
}

/** The same pair, on one line, for the closed picker. */
function TriggerName({ name }: { name: I18nText }) {
  const { primary, latin } = useCharacterName(name)
  return (
    <>
      {primary}
      {latin && <span className="charpick__latin faint">{latin}</span>}
    </>
  )
}

/** A character's tile — icon if there is one, drawn face if not. */
export function CharacterAvatar({
  id,
  name,
  size = 'md',
}: {
  id: string
  name: string
  size?: 'sm' | 'md'
}) {
  return (
    <span className={`avatar avatar--${size}`} aria-hidden="true">
      <CharacterFace id={id} name={name} />
    </span>
  )
}

/** Every locale's spelling plus the id, so ザンギ, Zangief and gief all land. */
function haystack(character: CharacterOverlay): string {
  return [character.id, ...Object.values(character.name)].join(' ').toLowerCase()
}

/**
 * Picking a character, as a grid rather than a dropdown.
 *
 * A thirty-one-entry `<select>` is a scroll through a column of text, which is
 * the slowest way to find a name you already know the look of. The grid also
 * has room for the two facts that actually change the tables underneath —
 * health, and whether there is an OD wakeup escape at all — so the choice can
 * be made on what it does rather than on the name alone.
 */
export function CharacterPicker() {
  const selectedId = useCharacter()
  const { t, text } = useT()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const selected = getCharacter(selectedId)

  /**
   * Sorted by the Latin name in every language, deliberately.
   *
   * Sorting by the localised name looked more correct and was worse: it puts
   * every character with a Chinese name ahead of every character without one,
   * which is not an order anybody can predict, and it moves all thirty-one
   * tiles when the reader changes language. The Latin name is the one thing all
   * three locales share and it is printed under every tile, so the position you
   * learned stays the position it is.
   */
  const sorted = useMemo(() => [...CHARACTERS].sort((a, b) => a.name.en.localeCompare(b.name.en)), [])

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return sorted
    return sorted.filter((character) => haystack(character).includes(needle))
  }, [sorted, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    // The panel mounts this frame; focus once the browser has laid it out.
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  function choose(id: string): void {
    characterStore.set(id)
    setOpen(false)
  }

  return (
    <div className="charpick">
      <span className="segmented__legend" id="charpick-legend">
        {t.character.label}
      </span>
      <button
        type="button"
        className="charpick__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby="charpick-legend charpick-value"
        onClick={() => setOpen(true)}
      >
        {selected && <CharacterAvatar id={selected.id} name={text(selected.name)} size="sm" />}
        <span id="charpick-value" className="charpick__value">
          {selected ? <TriggerName name={selected.name} /> : t.character.universal}
        </span>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="control__chevron">
          <path
            d="M4 6.5 L8 10.5 L12 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="liquid-glass-scrim charpick__scrim"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false)
          }}
        >
          <GlassPanel
            modal
            className="charpick__panel"
            role="dialog"
            aria-modal="true"
            aria-label={t.character.pick}
          >
            <div className="charpick__head">
              <input
                ref={inputRef}
                type="search"
                className="searchbox__input charpick__filter"
                value={query}
                placeholder={t.character.filter}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') return
                  event.preventDefault()
                  const first = matches[0]
                  if (first) choose(first.id)
                }}
                autoComplete="off"
              />
              <button
                type="button"
                className="charpick__close"
                onClick={() => setOpen(false)}
                aria-label={t.character.close}
              >
                ✕
              </button>
            </div>

            <div className="charpick__grid">
              {/* Not a character, but the same kind of choice: leaving the
                  tables universal is a position, not an absence of one. */}
              <button
                type="button"
                className={`chartile ${selectedId === '' ? 'is-active' : ''}`}
                onClick={() => choose('')}
              >
                <span className="avatar avatar--md avatar--none" aria-hidden="true">
                  ✱
                </span>
                <span className="chartile__name">{t.character.universal}</span>
              </button>

              {matches.map((character) => {
                const noReversal = character.removesOptions?.includes('reversal') ?? false
                return (
                  <button
                    key={character.id}
                    type="button"
                    className={`chartile ${selectedId === character.id ? 'is-active' : ''}`}
                    onClick={() => choose(character.id)}
                    title={noReversal ? t.character.noReversal : undefined}
                  >
                    <CharacterAvatar id={character.id} name={text(character.name)} />
                    <TileName name={character.name} warn={noReversal ? t.character.noReversal : null} />
                  </button>
                )
              })}

              {matches.length === 0 && <p className="small muted">{t.character.empty}</p>}
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  )
}
