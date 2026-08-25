import type { I18nText } from '~/data/schema'
import { useT } from '~/i18n/useT'

/**
 * The two halves of a character's name, for a reader who is not reading English.
 *
 * Frame data, opponents in the Battle Hub and every other guide say "Chun-Li";
 * a Traditional Chinese reader thinks 春麗. Showing one of them means the reader
 * translates in their head at exactly the moment they are trying to find a name
 * in a grid of thirty-one.
 *
 * `latin` is null when there is nothing to add: reading in English, or — for
 * most of the post-SF4 cast — because no Chinese or Japanese name is in use and
 * the entry is already the Latin one. Inventing a translation to fill the slot
 * would break the rule the rest of the guide follows, which is that terminology
 * comes from what people say, not from what a dictionary would produce.
 */
export function useCharacterName(
  name: I18nText,
  /** Overrides the English spelling for non-English readers; see `latin` in the
   *  schema. Akuma is Gouki and M. Bison is Vega outside the English release. */
  latinOverride?: string,
): { primary: string; latin: string | null } {
  const { locale, text } = useT()
  const primary = text(name)
  if (locale === 'en') return { primary, latin: null }
  const latin = latinOverride ?? name.en
  return { primary, latin: primary === latin ? null : latin }
}
