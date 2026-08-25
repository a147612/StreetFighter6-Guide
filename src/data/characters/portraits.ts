/**
 * Portrait and colour identity for the character picker.
 *
 * The icons in `public/characters/` are the owner's own files, placed there
 * deliberately; they are official character-select art and they ship with this
 * repo because he decided they should. Nothing here fetches them from anywhere.
 * A character with no icon falls back to the drawn face in
 * components/viz/CharacterFace.tsx, and then to a monogram — so a roster
 * addition never renders as a hole.
 *
 * The colours below are the ground the drawn faces sit on, and the fallback
 * identity for anyone with neither icon nor drawing. A colour is not an asset:
 * they follow each character's costume closely enough to be recognisable and
 * are spread far enough apart in hue to stay distinguishable at tile size.
 */

/**
 * Character id to icon basename in `public/characters/`.
 *
 * Two characters ship with the name burned into the art in two languages, so
 * they carry a Japanese variant: Akuma is GOUKI in Japanese, and M. Bison is
 * VEGA. `iconA23a*` is the hooded pre-reveal Bison and is deliberately unused —
 * a picker wants the look you see across the round start, not the cutscene one.
 */
const ICONS: Record<string, { file: string; ja?: string }> = {
  ryu: { file: 'iconA01' },
  luke: { file: 'iconA02' },
  jamie: { file: 'iconA03' },
  chunli: { file: 'iconA04' },
  guile: { file: 'iconA05' },
  kimberly: { file: 'iconA06' },
  juri: { file: 'iconA07' },
  ken: { file: 'iconA08' },
  blanka: { file: 'iconA09' },
  dhalsim: { file: 'iconA10' },
  ehonda: { file: 'iconA11' },
  deejay: { file: 'iconA12' },
  manon: { file: 'iconA13' },
  marisa: { file: 'iconA14' },
  jp: { file: 'iconA15' },
  zangief: { file: 'iconA16' },
  lily: { file: 'iconA17' },
  cammy: { file: 'iconA18' },
  rashid: { file: 'iconA19' },
  aki: { file: 'iconA20' },
  ed: { file: 'iconA21' },
  akuma: { file: 'iconA22en', ja: 'iconA22' },
  mbison: { file: 'iconA23bE', ja: 'iconA23bJ' },
  terry: { file: 'iconA24' },
  mai: { file: 'iconA25' },
  elena: { file: 'iconA26' },
  sagat: { file: 'iconA27' },
  cviper: { file: 'iconA28' },
  alex: { file: 'iconA29' },
  ingrid: { file: 'iconA30' },
  yasmine: { file: 'iconA31' },
}

/** The icon URL for this character, or null if there is none to show. */
export function characterIcon(id: string, locale: string): string | null {
  const entry = ICONS[id]
  if (!entry) return null
  const file = locale === 'ja' && entry.ja ? entry.ja : entry.file
  return `${import.meta.env.BASE_URL}characters/${file}.png`
}

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
 * The fallback for a character with no drawing yet. Two letters, taken from the
 * Latin name rather than the localised one: the tile must not change shape when
 * the reader changes language, or the position they learned stops being worth
 * anything. Hand-picked because the obvious first-two-letters rule collides
 * three ways (Mai / Manon / Marisa).
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
