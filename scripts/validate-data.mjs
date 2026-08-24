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

const { OPTIONS, SITUATIONS } = await import(pathToFileURL(outfile).href)
await rm(workDir, { recursive: true, force: true })

/* ── Options ─────────────────────────────────────────────────────── */

const optionIds = new Set()
for (const option of OPTIONS) {
  if (optionIds.has(option.id)) errors.push(`duplicate option id "${option.id}"`)
  optionIds.add(option.id)
  checkLocales(option.name, `option "${option.id}" name`)
}

/* ── Situations ──────────────────────────────────────────────────── */

const situationIds = new Set()
let evaluationCount = 0
let sourcedCount = 0

for (const situation of SITUATIONS) {
  const where = `situation "${situation.id}"`
  if (situationIds.has(situation.id)) errors.push(`duplicate ${where}`)
  situationIds.add(situation.id)

  for (const field of ['name', 'brief', 'summary']) {
    checkLocales(situation[field], `${where} ${field}`)
  }

  if (situation.evaluations.length === 0) {
    errors.push(`${where} has no evaluations`)
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

    checkLocales(evaluation.onSuccess.text, `${where} / ${evaluation.optionId} onSuccess`)
    checkLocales(evaluation.onFail.text, `${where} / ${evaluation.optionId} onFail`)
    if (evaluation.onFail.positionLoss) {
      checkLocales(evaluation.onFail.positionLoss, `${where} / ${evaluation.optionId} positionLoss`)
    }
    if (evaluation.notes) {
      checkLocales(evaluation.notes, `${where} / ${evaluation.optionId} notes`)
    }

    // counteredBy crosses to the other side of the matrix, so it may point at
    // an option whose own evaluations are not written yet. The *name* must
    // resolve though, or the reader sees a raw id.
    for (const id of evaluation.counteredBy) {
      if (!optionIds.has(id)) {
        errors.push(`${where} / "${evaluation.optionId}" counteredBy unknown "${id}"`)
      }
    }

    if (!evaluation.onFail.hpLoss.match(/\d/)) {
      warnings.push(`${where} / "${evaluation.optionId}" hpLoss has no number`)
    }
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
    `${evaluationCount} evaluations (${sourcedCount} sourced / ${estimated} estimated), ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`,
)

process.exit(errors.length > 0 ? 1 : 0)
