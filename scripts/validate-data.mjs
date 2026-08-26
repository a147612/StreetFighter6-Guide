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

const { OPTIONS, SITUATIONS, CHARACTERS, OPPONENT_TRAITS } = await import(pathToFileURL(outfile).href)
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

  // The mirror of the noDrive row rule below: when the situation is defined by
  // the opponent having no Drive, a column that spends Drive is a choice they
  // cannot make.
  if (situation.opponentNoDrive) {
    for (const id of columns) {
      const cost = optionsById.get(id)?.cost?.drive ?? 0
      if (cost > 0) {
        errors.push(
          `${where} is flagged opponentNoDrive but offers the column "${id}", ` +
            `which costs ${cost} Drive bar(s)`,
        )
      }
    }
  }

  const seen = new Set()
  for (const evaluation of situation.evaluations) {
    evaluationCount++
    if (evaluation.verified === 'sourced') {
      sourcedCount++
      if (!evaluation.sources || evaluation.sources.length === 0) {
        errors.push(`${where} marks "${evaluation.optionId}" sourced with no sources`)
      }
      for (const source of evaluation.sources ?? []) {
        // `patch` is rendered verbatim next to the link in every locale, so it
        // is the one content field that cannot carry prose. It held
        // "2026-08 查閱" for all 290 sources, which put Chinese in the English
        // and Japanese citation lines; the wording lives in ui.ts now.
        if (!/^[\x20-\x7E]*$/.test(source.patch)) {
          errors.push(
            `${where} / "${evaluation.optionId}" source patch "${source.patch}" ` +
              `is not locale-neutral — it renders as-is in all three languages`,
          )
        }
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

/* ── The default-mix bar draws a proportion, so the numbers must be one ──
   `DefaultMix` divides each share by the situation's total, so the bar always
   fills its width whatever the authored bands add up to. They added up to
   between 93% and 165%, which meant nineteen situations printed "30-40%" beside
   a segment drawn at 21%. The picture and the caption have to agree, and the
   only way to check that is here. */
const midpoint = (value) => {
  const numbers = (value.match(/\d+(?:\.\d+)?/g) ?? []).map(Number)
  return numbers.length ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0
}
for (const situation of SITUATIONS) {
  const axes = { timing: 0, action: 0 }
  for (const evaluation of situation.evaluations) {
    if (!evaluation.mixRatio) continue
    const axis = optionCategory.get(evaluation.optionId) === 'timing' ? 'timing' : 'action'
    axes[axis] += midpoint(evaluation.mixRatio)
  }
  for (const [axis, sum] of Object.entries(axes)) {
    if (sum > 0 && (sum < 92 || sum > 108)) {
      errors.push(
        `situation "${situation.id}" ${axis}-axis mixRatio midpoints sum to ` +
          `${sum.toFixed(0)}%, but the bar draws them as a proportion of 100%`,
      )
    }
  }
}

/* ── Rule 3, across groups ────────────────────────────────────────────
   `counteredBy` keeps one evaluation from contradicting itself. Nothing kept
   the *other* authoring of the same interaction honest: every pairing is
   written once from the defender's seat in A–H and again from the attacker's
   in I–K, and eight of them ended up saying both players win, or both lose.

   Only the sign is checked. Rule 2 says the grade belongs to the situation, so
   `win` here and `even` there is real content — a shimmy is worth more midscreen
   than cornered. Both seats winning is not a judgement call, it is arithmetic.

   Exemption is by the explicit `orderDependent` flag, never by the presence of
   a note. It used to be by note, and that meant explaining a cell switched the
   check off on it: 21% of pairings were exempt, and one of them was hiding a
   flat contradiction — a command grab graded as losing to Drive Impact while
   twelve other cells said a throw beats armour.

   Six cells carry the flag. Drive Impact against Drive Impact (the later one
   wins, so who is "the attacker" flips by situation); Drive Reversal, whose
   blockstun and wakeup versions differ in whether the option exists at all;
   and a neutral jump against either throw, which escapes at even frames and
   does not while you are minus, because the four prejump frames are grounded. */

const sign = (outcome) =>
  outcome === 'bigWin' || outcome === 'win' ? 1 : outcome === 'bigLoss' || outcome === 'loss' ? -1 : 0

const fromOffense = new Map()
const fromDefense = new Map()
for (const situation of SITUATIONS) {
  for (const evaluation of situation.evaluations) {
    for (const entry of evaluation.versus) {
      const attacker = situation.side === 'offense' ? evaluation.optionId : entry.vs
      const defender = situation.side === 'offense' ? entry.vs : evaluation.optionId
      const bag = situation.side === 'offense' ? fromOffense : fromDefense
      const key = `${attacker}|${defender}`
      if (!bag.has(key)) bag.set(key, [])
      bag.get(key).push({
        id: situation.id,
        outcome: entry.outcome,
        excused: entry.orderDependent === true,
      })
    }
  }
}
for (const [key, attacks] of fromOffense) {
  for (const a of attacks) {
    for (const d of fromDefense.get(key) ?? []) {
      if (a.excused || d.excused) continue
      if (sign(a.outcome) !== 0 && sign(a.outcome) === sign(d.outcome)) {
        errors.push(
          `"${key}" is graded from both seats and both win: ` +
            `${a.id} says the attacker gets "${a.outcome}", ` +
            `${d.id} says the defender gets "${d.outcome}"`,
        )
      }
    }
  }
}

/* Every id that is a row somewhere, and every id that is a column somewhere.
   Both the character checks and the matchup checks below turn on these, so
   they are derived once, here, above the first thing that reads them. */
const roster = CHARACTERS ?? []
const columnIds = new Set()
const rowIds = new Set()
for (const situation of SITUATIONS) {
  for (const id of situation.opponentOptions ?? []) columnIds.add(id)
  for (const evaluation of situation.evaluations) rowIds.add(evaluation.optionId)
}

/* ── Characters ──────────────────────────────────────────────────── */

const characterIds = new Set()
let noReversalCount = 0
let frameRows = 0
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
    if (override.note) checkLocales(override.note, `${where} override ${id} note`)
  }

  // Frame data hangs off an option, so it has to be an option this character
  // can actually be shown pressing — and a startup with no digit in it is a
  // string that will render as a number and mean nothing.
  for (const [optionId, list] of Object.entries(character.frames ?? {})) {
    if (!Array.isArray(list) || list.length === 0) {
      errors.push(`${where} frames "${optionId}" is not a non-empty list of moves`)
      continue
    }
    if (!optionIds.has(optionId)) {
      errors.push(`${where} has frame data for unknown option "${optionId}"`)
    } else if (!rowIds.has(optionId)) {
      errors.push(
        `${where} has frame data for "${optionId}", which is never graded as a ` +
          `row — nothing would ever render it`,
      )
    }
    if ((character.removesOptions ?? []).includes(optionId)) {
      errors.push(
        `${where} has frame data for "${optionId}" while also removing it — the ` +
          `overlay says they do not have the move it measures`,
      )
    }
    const seenMoves = new Set()
    for (const move of list) {
      frameRows++
      if (!move.move) {
        errors.push(`${where} frames "${optionId}" has an entry with no move name`)
        continue
      }
      // `move` is the join key for `npm run frames` and the React key here, so
      // a repeat is both an unverifiable row and a dropped one.
      if (seenMoves.has(move.move)) {
        errors.push(`${where} frames "${optionId}" lists "${move.move}" twice`)
      }
      seenMoves.add(move.move)
      if (!/\d/.test(move.startup ?? '')) {
        errors.push(
          `${where} frames "${optionId}" / "${move.move}" startup "${move.startup}" has no number`,
        )
      }
      if (move.name) checkLocales(move.name, `${where} frames ${optionId} "${move.move}" name`)
      if (move.note) checkLocales(move.note, `${where} frames ${optionId} "${move.move}" note`)
      // Every Overdrive move is two Drive bars. Mechanical, so it is checked
      // rather than trusted — the price is what makes the button a choice.
      if (move.move.includes('(Overdrive)') && move.cost?.drive !== 2) {
        errors.push(
          `${where} frames "${optionId}" / "${move.move}" is an Overdrive move ` +
            `costing ${move.cost?.drive ?? 0} Drive bar(s), not 2`,
        )
      }
    }
  }

  for (const reversal of character.reversals ?? []) {
    checkLocales(reversal.invincibility, `${where} reversal "${reversal.move}" invincibility`)
    checkLocales(reversal.cost, `${where} reversal "${reversal.move}" cost`)
  }

  // `move` is the React key for both lists, so a repeat drops a row on render
  // rather than showing it twice — which is how Honda carried the same OD Sumo
  // Smash entry at both ends of his reversals with only a console warning.
  for (const key of ['reversals', 'knockdowns']) {
    const seenMoves = new Set()
    for (const entry of character[key] ?? []) {
      if (seenMoves.has(entry.move)) {
        errors.push(`${where} lists "${entry.move}" twice under ${key}`)
      }
      seenMoves.add(entry.move)
    }
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

/* ── The matchup layer ────────────────────────────────────────────────
   `removesOptions` is read from both seats: as your character it removes rows,
   as the opponent it removes columns. Only four of the twenty-five column ids
   are character-specific, so this is a small surface — and it was silently
   empty. `air-throw` appeared in nobody's list, because for as long as nothing
   filtered columns nothing could tell; the hint named four characters when
   nine have one, and no check could have caught it. These can. */

const removedBy = new Map()
for (const character of roster) {
  for (const id of character.removesOptions ?? []) {
    removedBy.set(id, (removedBy.get(id) ?? 0) + 1)
  }
}

for (const id of columnIds) {
  if (!optionsById.get(id)?.characterSpecific) continue
  const count = removedBy.get(id) ?? 0
  if (count === 0) {
    errors.push(
      `"${id}" is a character-specific column that no character removes — ` +
        `the opponent filter can never fire for it, so the roster claim in its ` +
        `hint is unchecked by anything`,
    )
  } else if (count === roster.length) {
    errors.push(`"${id}" is removed by all ${count} characters, so the column is unreachable`)
  }
}

for (const [id, count] of removedBy) {
  if (!rowIds.has(id) && !columnIds.has(id)) {
    warnings.push(
      `${count} character(s) remove "${id}", which is neither graded as a row ` +
        `nor listed as a column anywhere — the removal does nothing`,
    )
  }
}

/** Matchup pages that actually differ from the universal table. Printed, like
 *  the no-OD-reversal count, because it is a number that must not drift
 *  silently: it is the whole yield of the opponent seat. */
let cutPages = 0
for (const situation of SITUATIONS) {
  for (const character of roster) {
    const gone = new Set(character.removesOptions ?? [])
    if ((situation.opponentOptions ?? []).some((id) => gone.has(id))) cutPages++
  }
}

/* ── Opponent traits ──────────────────────────────────────────────────
   A trait is written once and points at the characters that have it, which is
   the only reason 961 matchups fit in seven paragraphs — and also the only
   place a roster can quietly disagree with the overlay it is describing. The
   derived ones cannot: they read `removesOptions`. These check the rest. */

const traits = OPPONENT_TRAITS ?? []
const traitIds = new Set()
let traitNotes = 0

for (const trait of traits) {
  const where = `trait "${trait.id}"`
  if (traitIds.has(trait.id)) errors.push(`duplicate ${where}`)
  traitIds.add(trait.id)
  checkLocales(trait.name, `${where} name`)
  checkLocales(trait.hint, `${where} hint`)

  if (!trait.sources || trait.sources.length === 0) {
    errors.push(`${where} has no source`)
  }
  for (const source of trait.sources ?? []) {
    if (!/^[\x20-\x7E]*$/.test(source.patch)) {
      errors.push(`${where} source patch "${source.patch}" is not locale-neutral`)
    }
  }

  const members = roster.filter((character) => trait.has(character))
  if (members.length === 0) {
    errors.push(`${where} matches no character, so its notes can never render`)
  } else if (members.length === roster.length) {
    errors.push(
      `${where} matches all ${members.length} characters — a property everybody ` +
        `has is not a matchup fact, it is a rule, and rules belong in the option`,
    )
  }

  for (const [optionId, note] of Object.entries(trait.affects ?? {})) {
    traitNotes++
    checkLocales(note, `${where} affects "${optionId}"`)
    if (!optionIds.has(optionId)) {
      errors.push(`${where} annotates unknown option "${optionId}"`)
    } else if (!rowIds.has(optionId)) {
      // Notes hang off *your* rows. Pointed at a column, the advice is written
      // about a button you never press and nothing renders it.
      errors.push(
        `${where} annotates "${optionId}", which is never graded as a row — ` +
          `trait notes attach to your options, not to the opponent's columns`,
      )
    }
  }
  if (Object.keys(trait.affects ?? {}).length === 0) {
    warnings.push(`${where} changes nothing about any option`)
  }
}

/* The command-grab traits split one roster three ways — unreactable, off a
   setup, and slow enough to see. Three lists that must add up to exactly the
   eleven characters who have the option, with nobody counted twice: a name in
   the wrong bucket is advice that is precisely backwards. */
const grabTraits = traits.filter((trait) => trait.id.endsWith('command-grab'))
const grabbers = new Set(
  roster.filter((c) => !(c.removesOptions ?? []).includes('command-grab')).map((c) => c.id),
)
const claimed = new Map()
for (const trait of grabTraits) {
  for (const character of roster.filter((c) => trait.has(c))) {
    if (claimed.has(character.id)) {
      errors.push(
        `character "${character.id}" is in both "${claimed.get(character.id)}" and ` +
          `"${trait.id}" — the command-grab traits give opposite advice`,
      )
    }
    claimed.set(character.id, trait.id)
    if (!grabbers.has(character.id)) {
      errors.push(
        `trait "${trait.id}" lists "${character.id}", who has no command grab at all`,
      )
    }
  }
}
for (const id of grabbers) {
  if (!claimed.has(id)) {
    errors.push(
      `character "${id}" has a command grab that no trait describes — the reader ` +
        `is told nothing about whether they can react to it`,
    )
  }
}

/* `charge` is listed by hand because no field records it. The per-character
   inputs do though, in UFD's own notation, so the list is checkable. */
const chargeTrait = traits.find((trait) => trait.id === 'charge')
if (chargeTrait) {
  for (const character of roster) {
    const inputs = Object.values(character.overrides ?? {}).map((o) => o.input ?? '')
    const holdsCharge = inputs.some((input) => input.includes('['))
    if (holdsCharge !== chargeTrait.has(character)) {
      errors.push(
        `character "${character.id}" ${holdsCharge ? 'has' : 'has no'} charge input, ` +
          `but the charge trait says ${chargeTrait.has(character) ? 'they do' : 'they do not'}`,
      )
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
    `${characterIds.size} characters (${noReversalCount} with no OD reversal), ` +
    `${evaluationCount} evaluations (${sourcedCount} sourced / ${estimated} estimated), ` +
    `${cutPages}/${SITUATIONS.length * roster.length} matchup pages drop a column, ` +
    `${traitIds.size} opponent traits (${traitNotes} notes), ` +
    `${frameRows} moves with frame data, ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`,
)

process.exit(errors.length > 0 ? 1 : 0)
