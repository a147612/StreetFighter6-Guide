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
  if (value.startsWith('+')) return 'is-plus'
  if (value.startsWith('-') || value.startsWith('−')) return 'is-minus'
  return ''
}

/** Values are stored exactly as UFD writes them, so the prettying is here:
 *  a real minus sign, an ellipsis, and ±0 for a zero that means "even". */
function typeset(value: string): string {
  if (value === '0') return '±0'
  return value.replace(/^-/, '−').replace(/\.\.\./g, '…')
}

function Cell({ value }: { value: string | undefined }) {
  if (!value) return <td className="frames__na">·</td>
  return <td className={`frames__value mono ${polarity(value)}`}>{typeset(value)}</td>
}

export function FrameStrip({ frames }: { frames: MoveFrames[] }) {
  const { t, text } = useT()
  if (frames.length === 0) return null

  return (
    <div className="frames">
      <div className="frames__scroll">
        <table className="frames__table">
          <thead>
            <tr>
              <th scope="col">{t.frames.move}</th>
              <th scope="col">{t.frames.startup}</th>
              <th scope="col">{t.frames.onBlock}</th>
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
                <Cell value={move.onBlock} />
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
