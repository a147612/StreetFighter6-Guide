import { getCharacter } from '~/data'
import type { OptionDef } from '~/data/schema'
import { useOpponent } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/**
 * What picking an opponent did to the matrix.
 *
 * Both outcomes are printed, and that is the point. Only four of the
 * twenty-five column ids vary by character, so most matchups subtract nothing —
 * and a filter that silently does nothing is indistinguishable from a filter
 * that is broken. Saying "no difference here" is the difference between a
 * reader trusting the table and a reader wondering whether it ran.
 *
 * It is also the honest boundary of this layer: columns are removed, never
 * re-graded. The grades that remain are the universal ones.
 */
export function MatchupNote({ removed }: { removed: OptionDef[] }) {
  const { t, text } = useT()
  const opponent = getCharacter(useOpponent())
  if (!opponent) return null

  return (
    <p className={`matchup small ${removed.length > 0 ? 'matchup--cut' : ''}`}>
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
  )
}
