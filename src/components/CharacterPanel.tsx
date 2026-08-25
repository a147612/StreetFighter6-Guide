import { useCharacterName } from './CharacterName'
import { InputNotation } from './viz/InputNotation'
import { getCharacter } from '~/data'
import type { CharacterOverlay } from '~/data/schema'
import { useCharacter, useOpponent } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/**
 * What picking this character actually changed.
 *
 * Leads with the reversal situation because that is the fact that most often
 * invalidates a universal recommendation: eleven of the thirty-one have no
 * fully invincible OD reversal, and the tables above have already had that row
 * removed for them. They are not left with nothing — a wakeup Drive Reversal is
 * universal — but it costs two bars and deals white damage, which is a
 * different option, not the same one.
 */
export function CharacterPanel({ seat = 'me' }: { seat?: 'me' | 'them' }) {
  // Both hooks every render — see CharacterPicker for the black screen that
  // taught this component the rule.
  const mineId = useCharacter()
  const theirsId = useOpponent()
  const character = getCharacter(seat === 'them' ? theirsId : mineId)
  // The "no character picked" case is a whole-component absence, so it is a
  // separate component rather than an early return inside one. An early return
  // above a hook is a crash the moment anything below it needs state, which is
  // exactly what happened when the name became bilingual: two hooks on
  // Universal, three on a character, and React unmounted the page on the switch.
  if (!character) return null
  return <CharacterCard character={character} seat={seat} />
}

function CharacterCard({ character, seat }: { character: CharacterOverlay; seat: 'me' | 'them' }) {
  const { t, text } = useT()
  const { primary, latin } = useCharacterName(character.name, character.latin)
  const hasOdReversal = !character.removesOptions?.includes('reversal')
  const source = character.sources?.[0]
  const theirs = seat === 'them'

  return (
    <details className={`card card--padded charpanel ${theirs ? 'charpanel--them' : ''}`}>
      <summary>
        <span className="charpanel__seat small">
          {theirs ? t.character.theirs : t.character.mine}
        </span>
        <span className="charpanel__name">
          {primary}
          {latin && <span className="charpanel__latin faint">{latin}</span>}
        </span>
        <span className="charpanel__stat mono">
          {t.character.health} {character.health.toLocaleString()}
        </span>
        {!hasOdReversal && (
          <span className={`charpanel__warn ${theirs ? 'charpanel__warn--theirs' : ''}`}>
            {t.character.noReversal}
          </span>
        )}
      </summary>

      <div className="charpanel__body">
        <section>
          <h4>{t.character.reversals}</h4>
          <ul className="charlist">
            {character.reversals?.map((reversal) => (
              <li key={reversal.move}>
                <span className="charlist__move">{reversal.move}</span>
                {/* The universal option rows print no notation, because there
                    is no universal one. Here there is: this motion is this
                    character's, so draw it the way the rest of the guide does. */}
                <InputNotation input={reversal.input} />
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
