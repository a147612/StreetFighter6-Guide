#!/usr/bin/env node
/**
 * Referential integrity for the content layer.
 *
 * `tsc` already guarantees the shape of every entry, including that all three
 * locales are present — I18nText is a total Record, so a missing translation is
 * a compile error. What it cannot check is whether the ids entries point at
 * actually exist, and that is this script's job.
 *
 * The data lives in TypeScript (for exactly that locale guarantee), so it is
 * bundled with esbuild — already present as a Vite dependency — and imported.
 * Checking the real module beats regexing the source.
 */
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const ENTRY = new URL('../src/data/index.ts', import.meta.url).pathname
const LOCALES = ['zh-Hant', 'en', 'ja']

const errors = []
const warnings = []

const workDir = await mkdtemp(join(tmpdir(), 'sf6g-validate-'))
const outfile = join(workDir, 'data.mjs')

try {
  await build({
    entryPoints: [ENTRY],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  })
} catch (error) {
  console.error('error  data failed to bundle:\n' + error.message)
  await rm(workDir, { recursive: true, force: true })
  process.exit(1)
}

const { OPTIONS, SITUATIONS, CHARACTERS } = await import(pathToFileURL(outfile).href)
await rm(workDir, { recursive: true, force: true })

/* ── Options ─────────────────────────────────────────────────────── */

const optionIds = new Set()
const optionCategory = new Map()
const optionsById = new Map()
for (const option of OPTIONS) {
  if (optionIds.has(option.id)) errors.push(`duplicate option id "${option.id}"`)
  optionIds.add(option.id)
  optionCategory.set(option.id, option.category)
  optionsById.set(option.id, option)
  checkLocales(option.name, `option "${option.id}" name`)
  if (!option.category) errors.push(`option "${option.id}" has no category`)
}

/* ── Situations ──────────────────────────────────────────────────── */

const situationIds = new Set()
let evaluationCount = 0
let sourcedCount = 0

for (const situation of SITUATIONS) {
  const where = `situation "${situation.id}"`
  if (situationIds.has(situation.id)) errors.push(`duplicate ${where}`)
  situationIds.add(situation.id)

  checkLocales(situation.name, `${where} name`)

  if (situation.evaluations.length === 0) {
    errors.push(`${where} has no evaluations`)
  }

  const columns = new Set(situation.opponentOptions ?? [])
  if (columns.size === 0) errors.push(`${where} declares no opponentOptions`)
  for (const id of columns) {
    if (!optionIds.has(id)) errors.push(`${where} opponentOptions has unknown "${id}"`)
  }

  const seen = new Set()
  for (const evaluation of situation.evaluations) {
    evaluationCount++
    if (evaluation.verified === 'sourced') {
      sourcedCount++
      if (!evaluation.sources || evaluation.sources.length === 0) {
        errors.push(`${where} marks "${evaluation.optionId}" sourced with no sources`)
      }
    }

    if (seen.has(evaluation.optionId)) {
      errors.push(`${where} grades "${evaluation.optionId}" twice`)
    }
    seen.add(evaluation.optionId)

    if (!optionIds.has(evaluation.optionId)) {
      errors.push(`${where} references unknown option "${evaluation.optionId}"`)
    }

    // Burnout: the Drive Gauge is empty, so nothing that spends it is an option
    // here. An OD reversal was authored into both Burnout tables and graded as
    // the last thing that could turn the round around — two bars of a gauge
    // that is at zero. Nothing about the row looked wrong; only the arithmetic
    // did, so the arithmetic is what checks it.
    if (situation.noDrive) {
      const def = optionsById.get(evaluation.optionId)
      const cost = def?.cost?.drive ?? 0
      if (cost > 0) {
        errors.push(
          `${where} is flagged noDrive but grades "${evaluation.optionId}", ` +
            `which costs ${cost} Drive bar(s)`,
        )
      }
    }

    checkLocales(evaluation.onSuccess.text, `${where} / ${evaluation.optionId} onSuccess`)
    checkLocales(evaluation.onFail.text, `${where} / ${evaluation.optionId} onFail`)
    if (evaluation.onFail.positionLoss) {
      checkLocales(evaluation.onFail.positionLoss, `${where} / ${evaluation.optionId} positionLoss`)
    }
    if (evaluation.notes) {
      checkLocales(evaluation.notes, `${where} / ${evaluation.optionId} notes`)
    }

    // Matrix row: every graded opponent must be one of the situation's
    // columns, or the outcome is authored into a cell that never renders.
    const graded = new Set()
    for (const entry of evaluation.versus) {
      if (!optionIds.has(entry.vs)) {
        errors.push(`${where} / "${evaluation.optionId}" grades unknown option "${entry.vs}"`)
      } else if (!columns.has(entry.vs)) {
        errors.push(
          `${where} / "${evaluation.optionId}" grades "${entry.vs}", ` +
            `which is not one of this situation's opponentOptions`,
        )
      }
      if (graded.has(entry.vs)) {
        errors.push(`${where} / "${evaluation.optionId}" grades "${entry.vs}" twice`)
      }
      graded.add(entry.vs)
      if (entry.note) checkLocales(entry.note, `${where} / ${evaluation.optionId} vs ${entry.vs}`)
    }
    if (graded.size === 0) {
      warnings.push(`${where} / "${evaluation.optionId}" grades no opponent option`)
    }

    if (!optionCategory.has(evaluation.optionId)) {
      // Already reported as an unknown option above.
    } else if (!evaluation.onFail.hpLoss.match(/\d/)) {
      warnings.push(`${where} / "${evaluation.optionId}" hpLoss has no number`)
    }
  }
}

/* ── Characters ──────────────────────────────────────────────────── */

const characterIds = new Set()
let noReversalCount = 0
for (const character of CHARACTERS ?? []) {
  const where = `character "${character.id}"`
  if (characterIds.has(character.id)) errors.push(`duplicate ${where}`)
  characterIds.add(character.id)
  checkLocales(character.name, `${where} name`)

  if (!(character.health > 0)) errors.push(`${where} has no health`)

  for (const id of character.removesOptions ?? []) {
    if (!optionIds.has(id)) errors.push(`${where} removes unknown option "${id}"`)
  }
  if (character.removesOptions?.includes('reversal')) noReversalCount++

  for (const [id, override] of Object.entries(character.overrides ?? {})) {
    if (!optionIds.has(id)) errors.push(`${where} overrides unknown option "${id}"`)
    if (override.notes) checkLocales(override.notes, `${where} override ${id} notes`)
  }

  for (const reversal of character.reversals ?? []) {
    checkLocales(reversal.invincibility, `${where} reversal "${reversal.move}" invincibility`)
    checkLocales(reversal.cost, `${where} reversal "${reversal.move}" cost`)
  }

  // An overlay that neither removes anything nor lists a reversal is a stub
  // pretending to be data.
  if ((character.reversals ?? []).length === 0) {
    warnings.push(`${where} lists no invincible options`)
  }
  if (!character.sources || character.sources.length === 0) {
    errors.push(`${where} has no source`)
  }
}

function checkLocales(value, where) {
  if (!value || typeof value !== 'object') {
    errors.push(`${where} is not a localised string`)
    return
  }
  const missing = LOCALES.filter((locale) => !value[locale] || !value[locale].trim())
  if (missing.length > 0) errors.push(`${where} is missing ${missing.join(', ')}`)
}

for (const warning of warnings) console.warn(`warn   ${warning}`)
for (const error of errors) console.error(`error  ${error}`)

const estimated = evaluationCount - sourcedCount
console.log(
  `validate-data: ${OPTIONS.length} options, ${SITUATIONS.length} situations, ` +
    `${characterIds.size} characters (${noReversalCount} with no OD reversal), ` +
    `${evaluationCount} evaluations (${sourcedCount} sourced / ${estimated} estimated), ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`,
)

process.exit(errors.length > 0 ? 1 : 0)
