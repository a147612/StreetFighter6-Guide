import { GlassPanel } from './glass/GlassPanel'
import { Segmented } from './Segmented'
import { isRefractionSupported } from './glass/refraction'
import { useT } from '~/i18n/useT'
import {
  refractionStore,
  useLocale,
  useRefractionEnabled,
  useTheme,
  type Locale,
  type ThemeChoice,
} from '~/lib/prefs'

const LOCALE_LABELS: Record<Locale, string> = {
  'zh-Hant': '繁中',
  en: 'EN',
  ja: '日本語',
}

export function Topbar() {
  const { t } = useT()
  const { locale, setLocale } = useLocale()
  const { choice, setChoice } = useTheme()
  const refraction = useRefractionEnabled()
  const supported = isRefractionSupported()

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
          <Segmented<Locale>
            label={t.localeLabel}
            value={locale}
            onChange={setLocale}
            options={[
              { value: 'zh-Hant', label: LOCALE_LABELS['zh-Hant'] },
              { value: 'en', label: LOCALE_LABELS.en },
              { value: 'ja', label: LOCALE_LABELS.ja },
            ]}
          />

          <Segmented<ThemeChoice>
            label={t.theme.label}
            value={choice}
            onChange={setChoice}
            options={[
              { value: 'system', label: t.theme.system },
              { value: 'light', label: t.theme.light },
              { value: 'dark', label: t.theme.dark },
            ]}
          />

          <Segmented<'on' | 'off'>
            label={t.refraction.label}
            value={refraction && supported ? 'on' : 'off'}
            onChange={(next) => refractionStore.set(next === 'on')}
            options={[
              {
                value: 'on',
                label: t.refraction.on,
                ...(supported ? {} : { title: t.refraction.unsupported }),
              },
              { value: 'off', label: t.refraction.off },
            ]}
          />
        </div>
      </div>
    </GlassPanel>
  )
}
