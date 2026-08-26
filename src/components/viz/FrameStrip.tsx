import { Emphasis } from './Emphasis'
import { InputNotation } from './InputNotation'
import type { MoveFrames } from '~/data/schema'
import { useT } from '~/i18n/useT'

/**
 * The hard numbers for one option, for one character.
 *
 * Kept visually apart from the tiers above it, because it is a different kind
 * of claim: risk and reward are judgements that survive a balance patch, and
 * "-6 on block" is a measurement that does not. The move name is UFD's own, so
 * a reader who disagrees can find the row it was read from.
 *
 * A leading minus is rendered as a real minus sign — a hyphen next to a plus
 * sign reads as a hyphen, and these two columns are the whole point.
 */
function polarity(value: string): string {
  if (value.startsWith('+')) return 'is-plus'
  if (value.startsWith('-') || value.startsWith('−')) return 'is-minus'
  return ''
}

function typeset(value: string): string {
  return value.startsWith('-') ? `−${value.slice(1)}` : value
}

export function FrameStrip({ frames }: { frames: MoveFrames }) {
  const { t, text } = useT()
  const cells: Array<[string, string]> = []
  if (frames.startup) cells.push([t.frames.startup, frames.startup])
  if (frames.onBlock) cells.push([t.frames.onBlock, frames.onBlock])
  if (frames.onHit) cells.push([t.frames.onHit, frames.onHit])
  if (frames.whiff) cells.push([t.frames.whiff, frames.whiff])

  return (
    <div className="frames" title={t.frames.hint}>
      <span className="frames__move">
        {frames.move}
        {frames.input && <InputNotation input={frames.input} />}
      </span>
      <span className="frames__cells">
        {cells.map(([label, value]) => (
          <span key={label} className="frames__cell">
            <span className="frames__label">{label}</span>
            <span className={`frames__value mono ${polarity(value)}`}>{typeset(value)}</span>
          </span>
        ))}
      </span>
      {frames.note && (
        <p className="frames__note small">
          <Emphasis text={text(frames.note)} />
        </p>
      )}
    </div>
  )
}
