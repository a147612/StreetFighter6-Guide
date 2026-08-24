import { GlassPanel } from './glass/GlassPanel'
import { LocaleSelect } from './controls/LocaleSelect'
import { ThemeButton } from './controls/ThemeButton'
import { RefractionSwitch } from './controls/RefractionSwitch'
import { useT } from '~/i18n/useT'

/**
 * One row, three controls, no legends — which is also what makes it usable on a
 * phone: the previous version stacked three labelled radio groups and ate 40%
 * of the viewport, so it could not stay pinned. This one can.
 */
export function Topbar() {
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
          <RefractionSwitch />
          <ThemeButton />
          <LocaleSelect />
        </div>
      </div>
    </GlassPanel>
  )
}
