/**
 * Numpad + button notation, drawn rather than typed.
 *
 * "6 + LP+LK" is unreadable at a glance in a table of thirty options; an arrow
 * and two coloured pips are not. Directions become rotated arrows, buttons
 * become tinted tokens — punches round, kicks square, so strength and limb are
 * both legible without reading the letters.
 */

const NUMPAD_ANGLE: Record<string, number | null> = {
  '1': 225,
  '2': 180,
  '3': 135,
  '4': 270,
  '5': null, // neutral
  '6': 90,
  '7': 315,
  '8': 0,
  '9': 45,
}

const BUTTONS: Record<string, { strength: 'l' | 'm' | 'h'; limb: 'p' | 'k'; label: string }> = {
  LP: { strength: 'l', limb: 'p', label: 'LP' },
  MP: { strength: 'm', limb: 'p', label: 'MP' },
  HP: { strength: 'h', limb: 'p', label: 'HP' },
  LK: { strength: 'l', limb: 'k', label: 'LK' },
  MK: { strength: 'm', limb: 'k', label: 'MK' },
  HK: { strength: 'h', limb: 'k', label: 'HK' },
  PP: { strength: 'm', limb: 'p', label: 'PP' },
  KK: { strength: 'm', limb: 'k', label: 'KK' },
}

function Arrow({ angle }: { angle: number | null }) {
  return (
    <span className="notation__dir" title={angle === null ? 'neutral' : undefined}>
      {angle === null ? (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true" style={{ rotate: `${angle}deg` }}>
          <path d="M8 2.5 L12.2 9 H9.4 V13.5 H6.6 V9 H3.8 Z" fill="currentColor" />
        </svg>
      )}
    </span>
  )
}

export function InputNotation({ input }: { input: string }) {
  // Tokens separated by whitespace or '+'; the separators carry no meaning
  // beyond "these press together", which the visual grouping already says.
  // A run of digits is a motion, not one token — "623" is three directions, and
  // leaving it whole renders a DP input as an unreadable text blob.
  const tokens = input
    .split(/[\s+]+/)
    .filter(Boolean)
    .flatMap((token) => (/^[1-9]{2,}$/.test(token) ? token.split('') : [token]))

  return (
    <span className="notation" role="img" aria-label={input}>
      {tokens.map((token, i) => {
        const upper = token.toUpperCase()
        if (upper in NUMPAD_ANGLE) {
          return <Arrow key={i} angle={NUMPAD_ANGLE[upper] ?? null} />
        }
        const button = BUTTONS[upper]
        if (button) {
          return (
            <span
              key={i}
              className={`notation__btn notation__btn--${button.strength} notation__btn--${button.limb}`}
            >
              {button.label}
            </span>
          )
        }
        return (
          <span key={i} className="notation__word">
            {token}
          </span>
        )
      })}
    </span>
  )
}
