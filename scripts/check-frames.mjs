#!/usr/bin/env node
/**
 * Diff every authored frame number against Ultimate Frame Data.
 *
 * The frame layer is the one part of this guide that goes stale on its own: a
 * balance patch invalidates it and nothing in the repo notices. So the numbers
 * are stored exactly as UFD writes them — ellipses, ranges and all — and this
 * re-reads the site and compares them by string.
 *
 * It exists because the alternative failed. The first pass of this data was
 * transcribed by hand, and `mash-light` was bound to Zangief's *standing* light
 * punch (7f) rather than his fastest light (a 4f crouching light kick). The
 * number was right and the row was wrong, which is exactly the kind of mistake
 * a human re-reading their own table does not catch.
 *
 *   npm run frames            compare, using the cache where it exists
 *   npm run frames -- --fetch re-download every page first
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const CACHE = new URL('../.cache/ufd/', import.meta.url).pathname
const REFETCH = process.argv.includes('--fetch')

/* ── the authored side ───────────────────────────────────────────── */

const workDir = await mkdtemp(join(tmpdir(), 'sf6g-frames-'))
const outfile = join(workDir, 'data.mjs')
await build({
  entryPoints: [new URL('../src/data/index.ts', import.meta.url).pathname],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'silent',
})
const { CHARACTERS } = await import(pathToFileURL(outfile).href)
await rm(workDir, { recursive: true, force: true })

/* ── the source side ─────────────────────────────────────────────── */

await mkdir(CACHE, { recursive: true })
const cached = new Set(await readdir(CACHE).catch(() => []))

/** UFD renders each move as a `.movecontainer` of flat `.field` divs. */
function parse(page) {
  const text = (block, cls) => {
    const m = block.match(new RegExp(`<div class="${cls}">(.*?)</div>`, 's'))
    if (!m) return ''
    return m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim()
  }
  const moves = new Map()
  const blocks = page.split('<div class="movecontainer').slice(1)
  for (const raw of blocks) {
    const block = raw.split(/<h2 class="movecategory|<\/body>/)[0]
    const name = text(block, 'movename')
    if (!name) continue
    moves.set(name, {
      startup: text(block, 'startup'),
      onBlock: text(block, 'onblock'),
      onHit: text(block, 'onhit'),
      total: text(block, 'totalframes'),
    })
  }
  return moves
}

async function pageFor(character) {
  const slug = (character.sources ?? [])
    .map((s) => s.url.match(/ultimateframedata\.com\/sf6\/([a-z0-9.-]+)/)?.[1])
    .find(Boolean)
  if (!slug) return null
  const file = join(CACHE, `${slug}.html`)
  if (!REFETCH && cached.has(`${slug}.html`)) return parse(await readFile(file, 'utf8'))
  const res = await fetch(`https://ultimateframedata.com/sf6/${slug}`, {
    headers: { 'user-agent': 'sf6guide-frame-check' },
  })
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`)
  const body = await res.text()
  await writeFile(file, body)
  return parse(body)
}

/* ── compare ─────────────────────────────────────────────────────── */

const FIELDS = ['startup', 'onBlock', 'onHit', 'total']
const problems = []
let checked = 0
let withFrames = 0

for (const character of CHARACTERS) {
  const frames = character.frames
  if (!frames || Object.keys(frames).length === 0) continue
  withFrames++
  const moves = await pageFor(character)
  if (!moves) {
    problems.push(`${character.id}: no Ultimate Frame Data source to check against`)
    continue
  }
  for (const [optionId, list] of Object.entries(frames)) {
    for (const authored of list) {
      const live = moves.get(authored.move)
      if (!live) {
        problems.push(
          `${character.id} / ${optionId}: UFD has no move named "${authored.move}" — ` +
            `renamed upstream, or a typo here`,
        )
        continue
      }
      checked++
      for (const field of FIELDS) {
        const ours = authored[field]
        if (ours === undefined) continue
        // UFD writes an absent value as "--" or "**"; we omit the field.
        const theirs = live[field] === '--' || live[field] === '**' ? '' : live[field]
        if (ours !== theirs) {
          problems.push(
            `${character.id} / ${optionId} / ${authored.move}: ${field} is ` +
              `"${ours}" here and "${theirs}" on UFD`,
          )
        }
      }
    }
  }
}

for (const problem of problems) console.error(`error  ${problem}`)
console.log(
  `check-frames: ${checked} moves across ${withFrames} characters, ` +
    `${problems.length} mismatch(es)` +
    (REFETCH ? '' : ' — cached pages; pass --fetch to re-download'),
)
process.exit(problems.length > 0 ? 1 : 0)
