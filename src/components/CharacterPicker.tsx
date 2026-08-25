import { useEffect, useMemo, useRef, useState } from 'react'
import { GlassPanel } from './glass/GlassPanel'
import { useCharacterName } from './CharacterName'
import { CharacterFace } from './viz/CharacterFace'
import { CHARACTERS, getCharacter } from '~/data'
import type { CharacterOverlay, I18nText } from '~/data/schema'
import { characterStore, opponentStore, useCharacter, useOpponent } from '~/lib/prefs'
import { useDialog } from '~/lib/useDialog'
import { useT } from '~/i18n/useT'

/**
 * Localised name first, Latin underneath — see useCharacterName for why.
 *
 * No warning mark. It flagged "no OD wakeup escape", which is real but is not
 * what you are doing here: picking a character is not the moment to be told one
 * of their rows is missing, and a bare ⚠ next to eleven names reads as "this
 * character is worse" rather than as the specific, conditional fact it is. The
 * panel under the table says it in full, where there is room to say what they
 * have instead.
 */
function TileName({ name, latin: latinOverride }: { name: I18nText; latin?: string | undefined }) {
  const { primary, latin } = useCharacterName(name, latinOverride)
  return (
    <>
      <span className="chartile__name">{primary}</span>
      {latin && <span className="chartile__latin small faint">{latin}</span>}
    </>
  )
}

/** The same pair, on one line, for the closed picker. */
function TriggerName({ name, latin: latinOverride }: { name: I18nText; latin?: string | undefined }) {
  const { primary, latin } = useCharacterName(name, latinOverride)
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
 * the slowest way to find a name you already know the look of.
 *
 * One component, two seats. `me` picks whose options the rows are; `them` picks
 * whose options the columns are. They read different stores and say different
 * things, but a second copy of the grid would have been a second copy of the
 * search, the focus trap and the tile — so the difference is four strings.
 */
export function CharacterPicker({ seat = 'me' }: { seat?: 'me' | 'them' }) {
  // Both hooks, unconditionally: one of them is the answer and the other costs
  // a subscription. Choosing which hook to call would be the rules-of-hooks bug
  // that black-screened the page the last time this component grew a branch.
  const mineId = useCharacter()
  const theirsId = useOpponent()
  const opponentSeat = seat === 'them'
  const selectedId = opponentSeat ? theirsId : mineId
  const store = opponentSeat ? opponentStore : characterStore
  const legendId = `charpick-legend-${seat}`
  const valueId = `charpick-value-${seat}`
  const { t, text } = useT()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dialog = useDialog(open, () => setOpen(false))
  const selected = getCharacter(selectedId)
  const noneLabel = opponentSeat ? t.character.anyOpponent : t.character.universal

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
    store.set(id)
    setOpen(false)
  }

  return (
    <div className={`charpick ${opponentSeat ? 'charpick--them' : ''}`}>
      <span className="segmented__legend" id={legendId}>
        {opponentSeat ? t.character.theirs : t.character.mine}
      </span>
      <button
        type="button"
        className="charpick__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={`${legendId} ${valueId}`}
        onClick={() => setOpen(true)}
      >
        {selected && <CharacterAvatar id={selected.id} name={text(selected.name)} size="sm" />}
        <span id={valueId} className="charpick__value">
          {selected ? <TriggerName name={selected.name} latin={selected.latin} /> : noneLabel}
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
        >
          <GlassPanel
            modal
            panelRef={dialog}
            className="charpick__panel"
            role="dialog"
            aria-modal="true"
            aria-label={opponentSeat ? t.character.pickOpponent : t.character.pick}
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
                  tables universal is a position, not an absence of one. On the
                  opponent seat it is the stronger one — every column standing
                  is the table you should be able to beat anybody with. */}
              <button
                type="button"
                className={`chartile ${selectedId === '' ? 'is-active' : ''}`}
                onClick={() => choose('')}
              >
                <span className="avatar avatar--md avatar--none" aria-hidden="true">
                  ✱
                </span>
                <span className="chartile__name">{noneLabel}</span>
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
                    <TileName name={character.name} latin={character.latin} />
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
