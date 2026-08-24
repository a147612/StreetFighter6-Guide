import { useTheme, type ThemeChoice } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/** system -> light -> dark -> system. 'system' stays in the cycle rather than
 *  being buried in a menu: it is the default, and the way back to it. */
const NEXT: Record<ThemeChoice, ThemeChoice> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
}

function Icon({ choice }: { choice: ThemeChoice }) {
  if (choice === 'light') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="3.6" fill="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="10"
            y1="1.8"
            x2="10"
            y2="4.1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${angle} 10 10)`}
          />
        ))}
      </svg>
    )
  }
  if (choice === 'dark') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M13.4 12.9A5.6 5.6 0 0 1 8.1 5a5.8 5.8 0 1 0 7.4 7.6 5.6 5.6 0 0 1-2.1.3Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  // system: a display, i.e. "whatever the machine says"
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect
        x="2.6"
        y="3.6"
        width="14.8"
        height="10"
        rx="1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line x1="7" y1="16.6" x2="13" y2="16.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ThemeButton() {
  const { choice, setChoice } = useTheme()
  const { t } = useT()
  const next = NEXT[choice]

  return (
    <button
      type="button"
      className="control control--icon"
      onClick={() => setChoice(next)}
      // The button both reports the current state and predicts the next, so a
      // screen-reader user is not left guessing what a click will do.
      aria-label={`${t.theme.label}: ${t.theme[choice]} — ${t.theme.clickToSwitch} ${t.theme[next]}`}
      title={`${t.theme.label}: ${t.theme[choice]} · ${t.theme.clickToSwitch} ${t.theme[next]}`}
    >
      <Icon choice={choice} />
    </button>
  )
}
