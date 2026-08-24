import { useT } from '~/i18n/useT'
import type { Verification } from '~/data/schema'

/**
 * Marks whether an entry's numbers were verified against a source.
 *
 * Deliberately prominent rather than a footnote: the difference between "this
 * is roughly how the interaction feels" and "this was read off frame data at
 * patch X" changes how much weight a reader should put on it, and that call
 * belongs to the reader.
 */
export function VerifiedTag({ verified }: { verified: Verification }) {
  const { t } = useT()
  const sourced = verified === 'sourced'
  return (
    <span
      className={`verified verified--${verified}`}
      title={sourced ? t.verified.sourcedHint : t.verified.estimatedHint}
    >
      <span aria-hidden="true">{sourced ? '✓' : '≈'}</span>
      {sourced ? t.verified.sourced : t.verified.estimated}
    </span>
  )
}
