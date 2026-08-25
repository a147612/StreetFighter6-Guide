/**
 * Visual identity for the character picker.
 *
 * No CAPCOM assets, ever — the policy permits self-made derivative art and
 * forbids redistributing extracted in-game elements, so there are no official
 * portraits here and there never will be. What a picker actually has to do is
 * let you find one of thirty-one names at a glance, and a stable colour plus a
 * monogram does that: the tile you learned last week is in the same place, the
 * same colour, this week.
 *
 * A colour is not an asset. These follow each character's costume closely
 * enough to be recognisable and are spread far enough apart in hue to stay
 * distinguishable at tile size.
 */

/** Signature colour, mid-saturation so it reads on both themes. */
const COLORS: Record<string, string> = {
  ryu: '#8f99a8',
  ken: '#e4562a',
  chunli: '#3f7ad6',
  guile: '#7d8f42',
  cammy: '#4f9c6b',
  akuma: '#6b3fa8',
  luke: '#e0b23a',
  jamie: '#2f8fbf',
  kimberly: '#a855c9',
  juri: '#c73b96',
  marisa: '#b03535',
  lily: '#cf7a45',
  jp: '#4a4f75',
  manon: '#d96fa0',
  zangief: '#a8452f',
  dhalsim: '#d98a2f',
  blanka: '#4fb84a',
  ehonda: '#3f5fae',
  deejay: '#d8c22e',
  rashid: '#43b6c4',
  aki: '#8e3a6e',
  ed: '#566a92',
  sagat: '#8a6a38',
  terry: '#d4403a',
  mai: '#cc3f5c',
  elena: '#2fa89a',
  alex: '#7a94b5',
  cviper: '#a33a52',
  mbison: '#9e3336',
  ingrid: '#d4b04f',
  yasmine: '#6f9c8a',
}

/**
 * Two letters, taken from the Latin name rather than the localised one: the
 * tile must not change shape when the reader changes language, or the position
 * they learned stops being worth anything. Hand-picked because the obvious
 * first-two-letters rule collides three ways (Mai / Manon / Marisa).
 */
const MONOGRAMS: Record<string, string> = {
  ryu: 'RY',
  ken: 'KN',
  chunli: 'CL',
  guile: 'GU',
  cammy: 'CM',
  akuma: 'AK',
  luke: 'LK',
  jamie: 'JM',
  kimberly: 'KB',
  juri: 'JR',
  marisa: 'MR',
  lily: 'LY',
  jp: 'JP',
  manon: 'MN',
  zangief: 'ZG',
  dhalsim: 'DS',
  blanka: 'BL',
  ehonda: 'EH',
  deejay: 'DJ',
  rashid: 'RD',
  aki: 'AI',
  ed: 'ED',
  sagat: 'SG',
  terry: 'TR',
  mai: 'MI',
  elena: 'EL',
  alex: 'AX',
  cviper: 'CV',
  mbison: 'MB',
  ingrid: 'IG',
  yasmine: 'YS',
}

/**
 * Ids with an owner-supplied portrait at `public/portraits/<id>.webp`.
 *
 * Empty, and it stays empty unless the owner puts their own captures there —
 * Capcom's policy covers your own gameplay footage, not extracted art. Adding
 * an id here is the whole opt-in; the tile falls back to the monogram for every
 * id that is not listed, so a half-filled folder degrades cleanly.
 */
export const OWN_PORTRAITS: readonly string[] = []

/** Stable hue from the id, so a character added later still gets its own tile
 *  without anyone having to remember to author one. */
function fallbackColor(id: string): string {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return `hsl(${hash % 360} 42% 48%)`
}

export function characterColor(id: string): string {
  return COLORS[id] ?? fallbackColor(id)
}

export function characterMonogram(id: string, name: string): string {
  const authored = MONOGRAMS[id]
  if (authored) return authored
  const derived = name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()
  return derived || '??'
}
