import { InputNotation } from './InputNotation'
import { Emphasis } from './Emphasis'
import type { MoveFrames } from '~/data/schema'
import { useT } from '~/i18n/useT'

/**
 * The hard numbers for one option, for one character.
 *
 * Kept visually apart from the tiers above it, because it is a different kind
 * of claim: risk and reward are judgements that survive a balance patch, and
 * "-6 on block" is a measurement that does not. The move names are UFD's own,
 * so a reader who disagrees can find the row each number was read from.
 *
 * A table rather than a strip even for a single move, because the interesting
 * case is several: "meaty" is a choice between buttons, and the columns are the
 * whole difference between them.
 */
function polarity(value: string): string {
  if (/^[+-]?0$/.test(value)) return ''
  if (value.startsWith('+')) return 'is-plus'
  if (value.startsWith('-') || value.startsWith('−')) return 'is-minus'
  return ''
}

/** Values are stored exactly as UFD writes them, so the prettying is here:
 *  a real minus sign, an ellipsis, and ±0 for a zero that means "even". */
function typeset(value: string): string {
  // UFD writes an even trade as `0` for some characters and `+0` for others.
  // Both mean the same thing and neither is a plus, so both become ±0.
  if (/^[+-]?0$/.test(value)) return '±0'
  return value.replace(/^-/, '−').replace(/\.\.\./g, '…')
}

function Cell({ value }: { value: string | undefined }) {
  if (!value) return <td className="frames__na">·</td>
  return <td className={`frames__value mono ${polarity(value)}`}>{typeset(value)}</td>
}

/**
 * What a meaty timed on its last active frame leaves you at.
 *
 * A move's on-block assumes it connected on active frame 1. Meaty it late and
 * every frame of active you skip past is a frame of theirs you eat, so the real
 * number is `onBlock + active - 1`. Derived rather than stored: it is exactly
 * the two columns beside it, and a stored copy could disagree with them.
 */
function meatyLate(move: MoveFrames): string | undefined {
  if (!move.active || !move.onBlock) return undefined
  if (!/^-?\d+$/.test(move.onBlock) || !/^\d+$/.test(move.active)) return undefined
  const value = Number(move.onBlock) + Number(move.active) - 1
  return value > 0 ? `+${value}` : String(value)
}

export function FrameStrip({ frames }: { frames: MoveFrames[] }) {
  const { t, text } = useT()
  if (frames.length === 0) return null
  // Only where it was authored, which is only where meatying is the point.
  const showMeaty = frames.some((move) => move.active)

  return (
    <div className="frames">
      <div className="frames__scroll">
        <table className="frames__table">
          <thead>
            <tr>
              <th scope="col">{t.frames.move}</th>
              <th scope="col">{t.frames.startup}</th>
              {showMeaty && <th scope="col">{t.frames.active}</th>}
              <th scope="col">{t.frames.onBlock}</th>
              {showMeaty && <th scope="col">{t.frames.meatyLate}</th>}
              <th scope="col">{t.frames.onHit}</th>
              <th scope="col">{t.frames.total}</th>
            </tr>
          </thead>
          <tbody>
            {frames.map((move) => (
              <tr key={move.move}>
                <th scope="row" className="frames__move">
                  {move.move}
                  {move.input && <InputNotation input={move.input} />}
                </th>
                <Cell value={move.startup} />
                {showMeaty && <Cell value={move.active} />}
                <Cell value={move.onBlock} />
                {showMeaty && <Cell value={meatyLate(move)} />}
                <Cell value={move.onHit} />
                <Cell value={move.total} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {frames.map(
        (move) =>
          move.note && (
            <p key={move.move} className="frames__note small">
              <span className="frames__note-move">{move.move}</span>
              <Emphasis text={text(move.note)} />
            </p>
          ),
      )}
    </div>
  )
}
