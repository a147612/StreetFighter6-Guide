import type { I18nText, OptionDef, OptionEval, Situation } from './schema'
import { getOption } from './options'
import type { CharacterOverlay } from './schema'
import { GROUP_A } from './situations/a-wakeup'
import { GROUP_B } from './situations/b-blockstring'
import { GROUP_C } from './situations/c-close-quarters'
import { GROUP_D } from './situations/d-burnout'
import { GROUP_E } from './situations/e-neutral'
import { GROUP_F } from './situations/f-anti-air'
import { GROUP_G } from './situations/g-drive-impact'
import { GROUP_H } from './situations/h-life-threshold'
import { GROUP_I } from './situations/i-oki'
import { GROUP_J } from './situations/j-pressure'
import { GROUP_K } from './situations/k-closing-in'

export * from './schema'
export { OPTIONS, getOption } from './options'
export { CHARACTERS, getCharacter } from './characters'

/** A situation's evaluation joined to the option it grades. */
export interface OptionRow {
  def: OptionDef
  evaluation: OptionEval
  /** What this option additionally does — or fails to do — for the picked
   *  character. Rendered under the universal note, attributed to them. */
  characterNote?: I18nText
}

export const SITUATIONS: Situation[] = [
  ...GROUP_A,
  ...GROUP_B,
  ...GROUP_C,
  ...GROUP_D,
  ...GROUP_E,
  ...GROUP_F,
  ...GROUP_G,
  ...GROUP_H,
  ...GROUP_I,
  ...GROUP_J,
  ...GROUP_K,
]

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

/**
 * Apply a character overlay to a situation's rows.
 *
 * Subtraction first: an option the character does not have is removed rather
 * than shown with a bad grade, because a reader planning around a button they
 * cannot press is worse off than one who never saw it.
 */
export function applyOverlay(rows: OptionRow[], character?: CharacterOverlay): OptionRow[] {
  if (!character) return rows
  const removed = new Set(character.removesOptions ?? [])
  return rows
    .filter((row) => !removed.has(row.def.id))
    .map((row) => {
      const override = character.overrides?.[row.def.id]
      if (!override) return row
      return {
        def: row.def,
        evaluation: {
          ...row.evaluation,
          ...(override.risk ? { risk: override.risk } : {}),
          ...(override.reward ? { reward: override.reward } : {}),
          ...(override.mixRatio ? { mixRatio: override.mixRatio } : {}),
        },
        // Kept out of `evaluation` so the universal note survives it.
        ...(override.note ? { characterNote: override.note } : {}),
      }
    })
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
    name: { 'zh-Hant': '防禦中被壓', en: 'Under pressure', ja: 'ガード中' },
  },
  {
    id: 'C',
    side: 'defense' as const,
    name: { 'zh-Hant': '貼身對峙', en: 'Close quarters', ja: '至近距離' },
  },
  {
    id: 'D',
    side: 'defense' as const,
    name: { 'zh-Hant': 'Burnout', en: 'Burnout', ja: 'バーンアウト' },
  },
  {
    id: 'E',
    side: 'defense' as const,
    name: { 'zh-Hant': '立回（間合管理）', en: 'Neutral', ja: '立ち回り' },
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
    name: { 'zh-Hant': '血量門檻', en: 'Life thresholds', ja: '体力ライン' },
  },
  {
    id: 'I',
    side: 'offense' as const,
    name: { 'zh-Hant': '起攻', en: 'Oki', ja: '起き攻め' },
  },
  {
    id: 'J',
    side: 'offense' as const,
    name: { 'zh-Hant': '壓制', en: 'Pressure', ja: '攻め' },
  },
  {
    id: 'K',
    side: 'offense' as const,
    name: { 'zh-Hant': '接近', en: 'Closing in', ja: '接近' },
  },
]

/** Situations written so far, by group — drives the coverage display. */
export function situationsInGroup(groupId: string): Situation[] {
  return SITUATIONS.filter((situation) => situation.group === groupId)
}
