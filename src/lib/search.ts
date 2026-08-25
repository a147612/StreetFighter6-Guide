import { GROUPS, SITUATIONS, getOption } from '~/data'
import type { Locale } from '~/data/schema'

/**
 * The lookup index.
 *
 * Two kinds of hit, because two kinds of question get asked. "What is the
 * corner wakeup situation" wants a situation; "what does throw tech do in the
 * corner" wants one row inside one — so a cell is indexed as its own entry and
 * a multi-word query like "角落 解摔" resolves straight to it rather than
 * leaving the reader to find the row themselves.
 */
export interface SearchHit {
  kind: 'situation' | 'cell'
  situationId: string
  optionId?: string
  /** Display label, already localised. */
  label: string
  context: string
  /** Lower sorts first. */
  rank: number
}

interface Entry {
  kind: 'situation' | 'cell'
  situationId: string
  optionId?: string
  label: string
  context: string
  /**
   * Fields are weighted, not concatenated. Matching "解摔" inside another
   * option's explanation of what beats it is a real match but a weak one, and
   * flattening everything into one string made those outrank the option
   * actually called 解摔.
   */
  fields: { text: string; weight: number }[]
}

/** Words a reader would actually type for each position. */
const POSITION_WORDS: Record<Locale, Record<string, string>> = {
  'zh-Hant': { midscreen: '場中 中央', nearCorner: '靠角', cornered: '角落 完全角落' },
  en: { midscreen: 'midscreen', nearCorner: 'near corner', cornered: 'corner cornered' },
  ja: { midscreen: '画面中央 中央', nearCorner: '端寄り', cornered: '画面端 端' },
}

const cache = new Map<Locale, Entry[]>()

function buildIndex(locale: Locale): Entry[] {
  const cached = cache.get(locale)
  if (cached) return cached

  const entries: Entry[] = []
  for (const situation of SITUATIONS) {
    const group = GROUPS.find((g) => g.id === situation.group)
    const groupName = group ? group.name[locale] : ''
    // A situation listing every position is not *about* position, so indexing
    // its position words would make "corner" match half the guide.
    const positions =
      situation.position.length === 1
        ? (POSITION_WORDS[locale][situation.position[0]!] ?? '')
        : ''
    const situationName = situation.name[locale]
    const context = `${situation.group} · ${groupName}`

    entries.push({
      kind: 'situation',
      situationId: situation.id,
      label: situationName,
      context,
      fields: [
        { text: situationName, weight: 0 },
        { text: `${positions} ${groupName} ${situation.group} ${situation.id}`, weight: 1 },
      ],
    })

    for (const evaluation of situation.evaluations) {
      const def = getOption(evaluation.optionId)
      if (!def) continue
      const aka = def.aka?.[locale]?.join(' ') ?? ''
      entries.push({
        kind: 'cell',
        situationId: situation.id,
        optionId: def.id,
        label: def.name[locale],
        context: `${situationName} · ${groupName}`,
        fields: [
          {
            text: `${def.name[locale]} ${def.short?.[locale] ?? ''} ${aka} ${def.origin ?? ''}`,
            weight: 0,
          },
          { text: `${situationName} ${positions} ${groupName}`, weight: 0 },
          { text: def.hint?.[locale] ?? '', weight: 4 },
        ],
      })
    }
  }

  cache.set(locale, entries)
  return entries
}

/**
 * Every whitespace-separated token must appear somewhere in the entry. Plain
 * substring matching rather than fuzzy: the vocabulary here is short, exact and
 * often CJK, where fuzzy edit distance mostly produces noise.
 */
export function search(query: string, locale: Locale, limit = 12): SearchHit[] {
  const normalised = query.trim().toLowerCase()
  const tokens = normalised.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []

  const hits: SearchHit[] = []
  for (const entry of buildIndex(locale)) {
    let total = 0
    let matchedAll = true
    for (const token of tokens) {
      // Best (lowest) weight among the fields this token appears in.
      let best = Number.POSITIVE_INFINITY
      for (const field of entry.fields) {
        if (field.text.toLowerCase().includes(token)) best = Math.min(best, field.weight)
      }
      if (best === Number.POSITIVE_INFINITY) {
        matchedAll = false
        break
      }
      total += best
    }
    if (!matchedAll) continue

    const label = entry.label.toLowerCase()
    // Naming both a place and an option means the exact cell was wanted; a
    // single word is more often "take me to that situation".
    const shape =
      tokens.length > 1
        ? entry.kind === 'cell'
          ? -1
          : 0
        : entry.kind === 'situation'
          ? -0.5
          : 0
    // "解摔" should reach 解摔 before 延遲解摔, which merely contains it.
    const exact = label === normalised ? -2 : label.startsWith(tokens[0]!) ? -0.5 : 0

    hits.push({
      kind: entry.kind,
      situationId: entry.situationId,
      ...(entry.optionId ? { optionId: entry.optionId } : {}),
      label: entry.label,
      context: entry.context,
      rank: total + shape + exact,
    })
  }

  return hits
    .sort(
      (a, b) =>
        a.rank - b.rank || a.label.length - b.label.length || a.label.localeCompare(b.label),
    )
    .slice(0, limit)
}
