import { useT } from '~/i18n/useT'
import type { Outcome } from '~/data/schema'

/**
 * One cell of the relation matrix: what happens to you when this option meets
 * that opponent choice.
 *
 * Marked with signs rather than colour alone — ++ / + / = / − / −− survives
 * greyscale and colour blindness, and reads as a magnitude without a legend.
 * Colour is the second channel, not the only one.
 */
const GLYPH: Record<Outcome, string> = {
  bigWin: '++',
  win: '+',
  even: '=',
  loss: '−',
  bigLoss: '−−',
}

export function OutcomeCell({
  outcome,
  opponentName,
}: {
  outcome: Outcome | undefined
  opponentName: string
}) {
  const { t } = useT()

  // Ungraded is a real state, not a zero: some opponent choices simply do not
  // interact with some options, and rendering that as "even" would be a claim.
  if (!outcome) {
    return (
      <span className="oc oc--na" title={`${opponentName}: ${t.outcome.notApplicable}`}>
        <span aria-hidden="true">·</span>
        <span className="visually-hidden">{t.outcome.notApplicable}</span>
      </span>
    )
  }

  return (
    <span className={`oc oc--${outcome}`} title={`${opponentName}: ${t.outcome[outcome]}`}>
      <span aria-hidden="true">{GLYPH[outcome]}</span>
      <span className="visually-hidden">
        {opponentName}: {t.outcome[outcome]}
      </span>
    </span>
  )
}

/** Legend for the glyph scale, shown above the table. */
export function OutcomeLegend() {
  const { t } = useT()
  const order: Outcome[] = ['bigWin', 'win', 'even', 'loss', 'bigLoss']
  return (
    <div className="oc-legend small">
      <span className="faint">{t.outcome.legend}</span>
      {order.map((outcome) => (
        <span key={outcome} className="oc-legend__item">
          <span className={`oc oc--${outcome}`} aria-hidden="true">
            {GLYPH[outcome]}
          </span>
          {t.outcome[outcome]}
        </span>
      ))}
    </div>
  )
}
