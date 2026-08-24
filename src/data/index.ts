import type { OptionDef, OptionEval, Situation } from './schema'
import { getOption } from './options'
import { GROUP_A } from './situations/a-wakeup'

export * from './schema'
export { OPTIONS, getOption } from './options'

/** A situation's evaluation joined to the option it grades. */
export interface OptionRow {
  def: OptionDef
  evaluation: OptionEval
}

export const SITUATIONS: Situation[] = [...GROUP_A]

const SITUATIONS_BY_ID = new Map(SITUATIONS.map((situation) => [situation.id, situation]))

export function getSituation(id: string): Situation | undefined {
  return SITUATIONS_BY_ID.get(id)
}

/**
 * Join a situation's evaluations to their option definitions.
 *
 * A dangling id is dropped rather than rendered as a hole. `npm run validate`
 * fails the build on one, so this path should be unreachable in a shipped
 * build; it exists so a typo during authoring degrades to a missing row instead
 * of a blank screen.
 */
export function resolveRows(situation: Situation): OptionRow[] {
  const rows: OptionRow[] = []
  for (const evaluation of situation.evaluations) {
    const def = getOption(evaluation.optionId)
    if (def) rows.push({ def, evaluation })
  }
  return rows
}

/** Group letters, in reading order. A–H defend, I–K attack. */
export const GROUPS = [
  {
    id: 'A',
    side: 'defense' as const,
    name: { 'zh-Hant': '倒地起身', en: 'Waking up', ja: '起き上がり' },
  },
  {
    id: 'B',
    side: 'defense' as const,
    name: { 'zh-Hant': '防禦中被壓', en: 'Under a blockstring', ja: '連係をガード中' },
  },
  {
    id: 'C',
    side: 'defense' as const,
    name: { 'zh-Hant': '投擲距離', en: 'Throw range', ja: '投げ間合い' },
  },
  {
    id: 'D',
    side: 'defense' as const,
    name: { 'zh-Hant': 'Burnout', en: 'Burnout', ja: 'バーンアウト' },
  },
  {
    id: 'E',
    side: 'defense' as const,
    name: { 'zh-Hant': '中距離', en: 'Neutral', ja: '中距離' },
  },
  {
    id: 'F',
    side: 'defense' as const,
    name: { 'zh-Hant': '對空', en: 'Anti-air', ja: '対空' },
  },
  {
    id: 'G',
    side: 'defense' as const,
    name: { 'zh-Hant': 'Drive Impact 攻防', en: 'Drive Impact', ja: 'ドライブインパクト' },
  },
  {
    id: 'H',
    side: 'defense' as const,
    name: { 'zh-Hant': '逆轉判斷', en: 'Comeback reads', ja: '逆転判断' },
  },
  {
    id: 'I',
    side: 'offense' as const,
    name: { 'zh-Hant': '起攻', en: 'Oki', ja: '起き攻め' },
  },
  {
    id: 'J',
    side: 'offense' as const,
    name: { 'zh-Hant': '壓制節奏', en: 'Pressure pacing', ja: '攻めの緩急' },
  },
  {
    id: 'K',
    side: 'offense' as const,
    name: { 'zh-Hant': '連段抉擇', en: 'Combo choices', ja: 'コンボ選択' },
  },
]

/** Situations written so far, by group — drives the coverage display. */
export function situationsInGroup(groupId: string): Situation[] {
  return SITUATIONS.filter((situation) => situation.group === groupId)
}
