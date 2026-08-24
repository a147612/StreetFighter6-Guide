import { useLocale, type Locale } from '~/lib/prefs'
import { useT } from '~/i18n/useT'

/** Endonyms: someone looking for their own language recognises it written in
 *  that language, not translated into the one currently showing. */
const LOCALE_NAMES: Record<Locale, string> = {
  'zh-Hant': '繁體中文',
  en: 'English',
  ja: '日本語',
}

/**
 * A native <select>. Mobile gets the OS picker, keyboard and screen readers
 * work with no help, and there is no popup to position — none of which a
 * hand-rolled listbox gets for free.
 *
 * Painted as text plus a chevron rather than a filled control: it sits inside
 * the glass topbar, where an opaque fill would cover the refracted backdrop.
 */
export function LocaleSelect() {
  const { locale, setLocale } = useLocale()
  const { t } = useT()

  return (
    <label className="control control--select" title={t.localeLabel}>
      <span className="visually-hidden">{t.localeLabel}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
        {(Object.keys(LOCALE_NAMES) as Locale[]).map((value) => (
          <option key={value} value={value}>
            {LOCALE_NAMES[value]}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" aria-hidden="true" className="control__chevron">
        <path
          d="M4 6.5 L8 10.5 L12 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  )
}
