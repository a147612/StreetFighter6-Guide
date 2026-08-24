import { useT } from '~/i18n/useT'
import type { Category } from '~/data/schema'
import type { OptionRow } from '~/data'

/**
 * The recommended mix as a bar — the "so what do I actually do" answer.
 *
 * Split by decision axis rather than pooled: when to get up and what to do once
 * you are up are two separate choices, each summing to its own hundred percent.
 * Putting them in one bar would imply a trade-off between them that does not
 * exist.
 *
 * Widths come from the midpoint of each authored band and are normalised, so
 * the bar shows proportion; the legend keeps the authored range, which is the
 * honest number.
 */
const CATEGORY_COLOR: Partial<Record<Category, string>> = {
  timing: 'var(--accent)',
  block: 'var(--reward-low)',
  tech: 'var(--reward-medium)',
  drive: 'var(--reward-high)',
  movement: 'var(--risk-medium)',
  contest: 'var(--risk-high)',
}

/** Midpoint of "30-40%" is 35; "5%" is 5. */
function share(value: string): number {
  const numbers = value.match(/\d+(?:\.\d+)?/g)
  if (!numbers || numbers.length === 0) return 0
  const values = numbers.map(Number)
  return values.reduce((sum, n) => sum + n, 0) / values.length
}

interface Segment {
  id: string
  name: string
  range: string
  weight: number
  color: string
  category: Category
}

function Bar({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.weight, 0)
  if (total <= 0) return null
  return (
    <div className="mix">
      <div className="mix__bar">
        {segments.map((segment) => (
          <span
            key={segment.id}
            className="mix__seg"
            style={{ width: `${(segment.weight / total) * 100}%`, background: segment.color }}
            title={`${segment.name} ${segment.range}`}
          />
        ))}
      </div>
      <ul className="mix__legend small">
        {segments.map((segment) => (
          <li key={segment.id}>
            <span className="mix__dot" style={{ background: segment.color }} aria-hidden="true" />
            {segment.name}
            <span className="mono faint">{segment.range}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DefaultMix({ rows }: { rows: OptionRow[] }) {
  const { t, text } = useT()

  const toSegments = (subset: OptionRow[]): Segment[] =>
    subset
      .filter((row) => row.evaluation.mixRatio)
      .map((row) => ({
        id: row.def.id,
        name: text(row.def.name),
        range: row.evaluation.mixRatio!,
        weight: share(row.evaluation.mixRatio!),
        color: CATEGORY_COLOR[row.def.category] ?? 'var(--text-faint)',
        category: row.def.category,
      }))
      .filter((segment) => segment.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      // Hue carries the category, so several options from one category would
      // otherwise be indistinguishable in the bar. Step the lightness for each
      // repeat: same family, still separable.
      .map((segment, index, all) => {
        const seen = all.slice(0, index).filter((s) => s.category === segment.category).length
        return seen === 0
          ? segment
          : {
              ...segment,
              color: `color-mix(in srgb, ${segment.color} ${Math.max(35, 100 - seen * 26)}%, var(--surface))`,
            }
      })

  const timing = toSegments(rows.filter((row) => row.def.category === 'timing'))
  const actions = toSegments(rows.filter((row) => row.def.category !== 'timing'))

  if (timing.length === 0 && actions.length === 0) return null

  return (
    <section className="mixblock" aria-label={t.mix.heading}>
      <div className="mixblock__head">
        <h3>{t.mix.heading}</h3>
        <p className="small faint">{t.mix.note}</p>
      </div>
      {timing.length > 0 && (
        <div className="mixblock__axis">
          <span className="mixblock__axislabel small">{t.category.timing}</span>
          <Bar segments={timing} />
        </div>
      )}
      {actions.length > 0 && (
        <div className="mixblock__axis">
          <span className="mixblock__axislabel small">{t.table.option}</span>
          <Bar segments={actions} />
        </div>
      )}
    </section>
  )
}
