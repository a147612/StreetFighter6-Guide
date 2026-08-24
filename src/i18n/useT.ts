import { useLocale } from '~/lib/prefs'
import { UI, type UiStrings } from './ui'
import type { I18nText, Locale } from '~/data/schema'

/** Interface strings for the active locale, plus a reader for content strings. */
export function useT(): {
  t: UiStrings
  locale: Locale
  /** Pull one locale out of a content entry's embedded translations. */
  text: (value: I18nText) => string
} {
  const { locale } = useLocale()
  return {
    t: UI[locale],
    locale,
    text: (value: I18nText) => value[locale],
  }
}
