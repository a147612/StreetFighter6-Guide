import { useState } from 'react'
import { getCharacter } from '~/data'
import type { OpponentTrait } from '~/data'
import type { OptionDef } from '~/data/schema'
import { useOpponent } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/**
 * What picking an opponent did to this page.
 *
 * Two lines, and both are printed even when one of them is empty-handed. Only
 * four of the twenty-five column ids vary by character, so most matchups
 * subtract nothing — and a filter that silently does nothing is
 * indistinguishable from a filter that is broken. Saying "no difference here"
 * is the difference between a reader trusting the table and a reader wondering
 * whether it ran.
 *
 * The second line is the traits that changed a row below, which is where most
 * of a matchup actually lives: the columns are what they *cannot* do, the
 * traits are what they do differently.
 */
export function MatchupNote({
  removed,
  traits,
}: {
  removed: OptionDef[]
  traits: OpponentTrait[]
}) {
  const { t, text } = useT()
  const opponent = getCharacter(useOpponent())
  // A `title` is a desktop-only affordance, and this line is read on a phone
  // between matches. The chip opens the same sentence in place.
  const [open, setOpen] = useState<string | null>(null)
  if (!opponent) return null
  const opened = traits.find((trait) => trait.id === open)

  return (
    <div className={`matchup ${removed.length > 0 ? 'matchup--cut' : ''}`}>
      <p className="matchup__line small">
        <span className="matchup__who">{text(opponent.name)}</span>
        {removed.length > 0 ? (
          <>
            <span className="matchup__label">{t.matchup.removed}</span>
            {removed.map((def) => (
              <span key={def.id} className="matchup__chip">
                {text(def.short ?? def.name)}
              </span>
            ))}
          </>
        ) : (
          <span className="matchup__same muted">{t.matchup.same}</span>
        )}
      </p>

      {traits.length > 0 && (
        <p className="matchup__line small">
          <span className="matchup__label">{t.matchup.traits}</span>
          {traits.map((trait) => (
            // The chip says which property; the expanded row says what to
            // press about it. This only opens the middle sentence — the
            // mechanic — which is what makes the other two make sense.
            <button
              key={trait.id}
              type="button"
              className={`matchup__trait ${open === trait.id ? 'is-open' : ''}`}
              aria-expanded={open === trait.id}
              onClick={() => setOpen((previous) => (previous === trait.id ? null : trait.id))}
            >
              {text(trait.name)}
            </button>
          ))}
        </p>
      )}

      {opened && (
        <p className="matchup__hint small muted">{text(opened.hint)}</p>
      )}
    </div>
  )
}
