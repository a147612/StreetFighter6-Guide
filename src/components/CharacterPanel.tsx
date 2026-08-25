import { CHARACTERS, getCharacter } from '~/data'
import { characterStore, useCharacter } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/** Native select, same reasoning as the locale picker. */
export function CharacterSelect() {
  const id = useCharacter()
  const { t, text } = useT()

  return (
    <label className="control control--select charselect" title={t.character.label}>
      <span className="segmented__legend">{t.character.label}</span>
      <span className="charselect__field">
        <select value={id} onChange={(event) => characterStore.set(event.target.value)}>
          <option value="">{t.character.universal}</option>
          {/* 31 entries: authoring order is meaningless to a reader, so sort by
              the name they are actually looking at. */}
          {[...CHARACTERS]
            .sort((a, b) => text(a.name).localeCompare(text(b.name)))
            .map((character) => (
              <option key={character.id} value={character.id}>
                {text(character.name)}
              </option>
            ))}
        </select>
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
      </span>
    </label>
  )
}

/**
 * What picking this character actually changed.
 *
 * Leads with the reversal situation because that is the fact that most often
 * invalidates a universal recommendation: four of the eight covered characters
 * have no fully invincible OD reversal, and the tables above have already had
 * that row removed for them.
 */
export function CharacterPanel() {
  const id = useCharacter()
  const { t, text } = useT()
  const character = getCharacter(id)
  if (!character) return null

  const hasOdReversal = !character.removesOptions?.includes('reversal')
  const source = character.sources?.[0]

  return (
    <details className="card card--padded charpanel">
      <summary>
        <span className="charpanel__name">{text(character.name)}</span>
        <span className="charpanel__stat mono">
          {t.character.health} {character.health.toLocaleString()}
        </span>
        {!hasOdReversal && <span className="charpanel__warn">{t.character.noReversal}</span>}
      </summary>

      <div className="charpanel__body">
        <section>
          <h4>{t.character.reversals}</h4>
          <ul className="charlist">
            {character.reversals?.map((reversal) => (
              <li key={reversal.move}>
                <span className="charlist__move">{reversal.move}</span>
                <code>{reversal.input}</code>
                <span className="muted">{text(reversal.invincibility)}</span>
                <span className="charlist__cost mono">{text(reversal.cost)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4>{t.character.knockdowns}</h4>
          <ul className="charlist">
            {character.knockdowns?.map((knockdown) => (
              <li key={knockdown.move}>
                <span className="charlist__move">{knockdown.move}</span>
                <span className="charlist__cost mono">{knockdown.advantage}</span>
              </li>
            ))}
          </ul>
        </section>

        {source && (
          <p className="small">
            <a href={source.url} target="_blank" rel="noreferrer noopener">
              Ultimate Frame Data — {text(character.name)}
            </a>
          </p>
        )}
      </div>
    </details>
  )
}
