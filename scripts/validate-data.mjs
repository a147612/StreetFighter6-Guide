#!/usr/bin/env node
/**
 * Referential integrity for the content layer.
 *
 * `tsc` already guarantees the *shape* of every entry — including that all three
 * locales are present, since I18nText is a total Record. What it cannot check is
 * whether the ids entries point at actually exist. That is this script's only
 * job, and it runs in CI before the build.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DATA_DIR = new URL('../src/data/', import.meta.url).pathname
const LOCALES = ['zh-Hant', 'en', 'ja']

const errors = []
const warnings = []

async function jsonFiles(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await jsonFiles(path)))
    else if (entry.name.endsWith('.json')) found.push(path)
  }
  return found
}

/** Walk every object, flagging any that looks like a partial I18nText. */
function checkLocales(value, path, file) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => checkLocales(item, `${path}[${i}]`, file))
    return
  }
  if (value === null || typeof value !== 'object') return

  const keys = Object.keys(value)
  const localeKeys = keys.filter((k) => LOCALES.includes(k))
  if (localeKeys.length > 0 && localeKeys.length < LOCALES.length) {
    const missing = LOCALES.filter((l) => !localeKeys.includes(l))
    errors.push(`${file}: ${path} is missing ${missing.join(', ')}`)
  }
  for (const [key, child] of Object.entries(value)) {
    checkLocales(child, path ? `${path}.${key}` : key, file)
  }
}

const files = await jsonFiles(DATA_DIR).catch(() => [])

if (files.length === 0) {
  console.log(
    'validate-data: no JSON data files yet — the content layer still lives in TypeScript,\n' +
      '               where tsc enforces the shape. Nothing to check.',
  )
  process.exit(0)
}

const optionIds = new Set()
const situations = []
const options = []

for (const file of files) {
  const label = relative(process.cwd(), file)
  let parsed
  try {
    parsed = JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    errors.push(`${label}: not valid JSON — ${error.message}`)
    continue
  }

  checkLocales(parsed, '', label)

  for (const entry of Array.isArray(parsed) ? parsed : [parsed]) {
    if (!entry || typeof entry !== 'object') continue
    if (Array.isArray(entry.counteredBy)) {
      if (optionIds.has(entry.id)) errors.push(`${label}: duplicate option id "${entry.id}"`)
      optionIds.add(entry.id)
      options.push({ ...entry, file: label })
    } else if (Array.isArray(entry.options)) {
      situations.push({ ...entry, file: label })
    }
  }
}

for (const situation of situations) {
  for (const id of situation.options) {
    if (!optionIds.has(id)) {
      errors.push(`${situation.file}: situation "${situation.id}" references unknown option "${id}"`)
    }
  }
}

// counteredBy crosses the offense/defense boundary, so it legitimately dangles
// while one side of the matrix is still being written. Report, do not fail.
for (const option of options) {
  for (const id of option.counteredBy) {
    if (!optionIds.has(id)) {
      warnings.push(`${option.file}: option "${option.id}" is counteredBy unknown "${id}"`)
    }
  }
}

for (const warning of warnings) console.warn(`warn  ${warning}`)
for (const error of errors) console.error(`error ${error}`)

console.log(
  `validate-data: ${files.length} file(s), ${optionIds.size} option(s), ` +
    `${situations.length} situation(s), ${errors.length} error(s), ${warnings.length} warning(s)`,
)

process.exit(errors.length > 0 ? 1 : 0)
