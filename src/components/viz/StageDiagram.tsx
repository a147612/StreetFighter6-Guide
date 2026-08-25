import { useT } from '~/i18n/useT'
import type { Distance, Position, Stance } from '~/data/schema'

/**
 * Where the two of you are, drawn.
 *
 * "Cornered, point blank, on the floor" is three facts a reader has to hold in
 * their head from the title; a picture holds them instead. It is deliberately
 * schematic — a bar, two walls, two markers — because the useful information is
 * relative position and nothing else, and anything more detailed would be both
 * wrong and someone else's artwork.
 */

/** Where you stand, as a fraction of stage width. */
const POSITION_X: Record<Position, number> = {
  midscreen: 0.5,
  nearCorner: 0.22,
  cornered: 0.09,
}

/** Gap to the opponent, as a fraction of stage width. */
const GAP: Record<Distance, number> = {
  // Point blank still has to clear both markers, or the two figures overlap
  // and the diagram stops showing which one is which.
  pointBlank: 0.11,
  close: 0.13,
  mid: 0.26,
  long: 0.44,
}

const W = 220
const H = 54
const WALL = 7
const FLOOR = 40

export function StageDiagram({
  position,
  distance = 'pointBlank',
  stance = 'neutral',
}: {
  position: Position[]
  distance?: Distance | undefined
  stance?: Stance | undefined
}) {
  const { t } = useT()
  // Multi-position situations are not about position, so draw the neutral case.
  const spot = position.length === 1 ? position[0]! : 'midscreen'
  const inner = W - 2 * WALL

  const myX = WALL + inner * POSITION_X[spot]
  // They stand between you and the middle, which is what being cornered means.
  // At midscreen either side is equally true, so pick one and keep it — a
  // diagram that flips sides between situations reads as a change that is not
  // happening.
  const facingRight = POSITION_X[spot] <= 0.5
  const theirX = myX + (facingRight ? 1 : -1) * inner * GAP[distance]

  const label = `${t.position[spot]} · ${t.stage[distance]}`

  return (
    <svg
      className="stage"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{label}</title>

      <rect x="0" y="8" width={W} height={H - 8} rx="4" className="stage__ground" />

      {/* Walls. The one you are backed against is the whole point, so it reads
          stronger than the far one. */}
      <rect x="0" y="8" width={WALL} height={H - 8} className="stage__wall" />
      <rect x={W - WALL} y="8" width={WALL} height={H - 8} className="stage__wall" />
      {spot !== 'midscreen' && (
        <rect
          x={facingRight ? 0 : W - WALL}
          y="8"
          width={WALL}
          height={H - 8}
          className="stage__wall stage__wall--live"
        />
      )}

      {/* The gap between them, labelled by the distance token. */}
      <line
        x1={Math.min(myX, theirX)}
        y1={FLOOR + 8}
        x2={Math.max(myX, theirX)}
        y2={FLOOR + 8}
        className="stage__gap"
      />

      <Marker x={myX} down={stance === 'iAmDown'} mine label={t.stage.me} />
      <Marker x={theirX} down={stance === 'theyAreDown'} label={t.stage.them} />
    </svg>
  )
}

function Marker({
  x,
  down,
  mine = false,
  label,
}: {
  x: number
  down: boolean
  mine?: boolean
  label: string
}) {
  const cls = `stage__fig ${mine ? 'stage__fig--mine' : 'stage__fig--theirs'}`
  return (
    <g>
      {down ? (
        // Lying down: the same body, turned on its side.
        <rect x={x - 11} y={FLOOR - 5} width="22" height="8" rx="4" className={cls} />
      ) : (
        <rect x={x - 4} y={FLOOR - 21} width="8" height="24" rx="4" className={cls} />
      )}
      <text x={x} y={down ? FLOOR - 10 : FLOOR - 25} className="stage__label">
        {label}
      </text>
    </g>
  )
}
