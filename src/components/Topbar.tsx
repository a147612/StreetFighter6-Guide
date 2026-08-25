import { GlassPanel } from './glass/GlassPanel'
import { LocaleSelect } from './controls/LocaleSelect'
import { ThemeButton } from './controls/ThemeButton'
import { RefractionSwitch } from './controls/RefractionSwitch'
import { useT } from '~/i18n/useT'

export function Topbar({ onSearch }: { onSearch: () => void }) {
  const { t } = useT()

  return (
    <GlassPanel as="header" className="topbar">
      <div className="topbar__inner shell">
        <a className="topbar__brand" href="#top">
          <span className="topbar__mark" aria-hidden="true">
            🥋
          </span>
          <span className="topbar__name">{t.appName}</span>
        </a>

        <div className="topbar__controls">
          <button type="button" className="control control--search" onClick={onSearch}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <line
                x1="10.4"
                y1="10.4"
                x2="14"
                y2="14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span className="control__text">{t.search.open}</span>
            <kbd className="control__kbd">/</kbd>
          </button>
          <RefractionSwitch />
          <ThemeButton />
          <LocaleSelect />
        </div>
      </div>
    </GlassPanel>
  )
}
