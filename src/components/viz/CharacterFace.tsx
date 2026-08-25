import type { ReactNode } from 'react'
import { characterColor, characterMonogram, OWN_PORTRAITS } from '~/data/characters/portraits'

/**
 * Thirty-one drawn character tiles.
 *
 * Self-authored, because Capcom's policy permits derivative art you make
 * yourself and forbids redistributing extracted in-game elements — and because
 * a repo that ships thirty-one lifted portraits is a repo with a takedown in
 * its future. These are not official art and are not trying to pass for it.
 *
 * What a tile has to do is be picked out of a grid of thirty-one in one glance,
 * and at 56 pixels almost none of that work is done by the face. It is done by
 * the silhouette above it: Zangief's mohawk, Chun-Li's buns, Guile's flat-top,
 * Sagat's eyepatch, Bison's cap, Honda's topknot, Blanka's orange mane. So the
 * chassis below is identical for everyone — background, shoulders, neck, head,
 * eyes — and every character supplies only what makes their outline theirs.
 */

interface Face {
  skin: string
  hair: string
  /** Shoulders: the costume colour, which carries as much as the hair does. */
  wear: string
  /** Behind the head — long hair, buns, headgear volume. */
  back?: ReactNode
  /** Over the head — hairline, fringe, cap, headband. */
  front?: ReactNode
  /** Anything on the face itself — paint, eyepatch, glasses, a monocle. */
  extra?: ReactNode
  eyes?: 'normal' | 'hidden' | 'glow'
}

const SKIN = {
  light: '#f2cdac',
  mid: '#e0ab84',
  tan: '#c9905f',
  brown: '#a86f45',
  deep: '#7f4e2d',
} as const

/** The standard short hairline: a cap over the top of the head. */
function cap(fill: string) {
  return <path d="M19 26 Q19 10 32 10 Q45 10 45 26 Q43 16.5 32 16.5 Q21 16.5 19 26 Z" fill={fill} />
}

/** A mass of hair behind the head, for anyone whose hair passes the jaw. */
function mane(fill: string, width = 17) {
  return <path d={`M${32 - width} 27 Q${32 - width} 8 32 8 Q${32 + width} 8 ${32 + width} 27 L${32 + width} 56 L${32 - width} 56 Z`} fill={fill} />
}

const FACES: Record<string, Face> = {
  ryu: {
    skin: SKIN.light, hair: '#3b2b22', wear: '#e9e6dd',
    front: (
      <>
        {cap('#3b2b22')}
        <path d="M18.5 17.5 h27 v5 h-27 Z" fill="#cf3f36" />
        <path d="M19 19 L9 23 L10.5 26.5 L19.5 22.5 Z" fill="#cf3f36" />
      </>
    ),
  },
  ken: {
    skin: SKIN.light, hair: '#f0c445', wear: '#c8362a',
    front: <path d="M18 26 L21 9 L25.5 19 L28.5 6 L32.5 18 L36.5 7 L39.5 19 L44 10 L46 26 Q42 16.5 32 16.5 Q22 16.5 18 26 Z" fill="#f0c445" />,
  },
  chunli: {
    skin: SKIN.light, hair: '#4a3226', wear: '#2f63c4',
    back: (
      <>
        <circle cx="12" cy="19" r="8.5" fill="#4a3226" />
        <circle cx="52" cy="19" r="8.5" fill="#4a3226" />
        <circle cx="12" cy="19" r="8.5" fill="none" stroke="#f4f1ea" strokeWidth="3.4" />
        <circle cx="52" cy="19" r="8.5" fill="none" stroke="#f4f1ea" strokeWidth="3.4" />
      </>
    ),
    front: cap('#4a3226'),
  },
  guile: {
    skin: SKIN.light, hair: '#e5c94f', wear: '#78894a',
    front: <path d="M18.5 25 L18.5 6 L45.5 6 L45.5 25 Q42 16 32 16 Q22 16 18.5 25 Z" fill="#e5c94f" />,
  },
  cammy: {
    skin: SKIN.light, hair: '#efc95c', wear: '#4f9c6b',
    back: (
      <>
        <path d="M15 20 Q8 34 11 58 L19 58 Q15 34 21 23 Z" fill="#efc95c" />
        <path d="M49 20 Q56 34 53 58 L45 58 Q49 34 43 23 Z" fill="#efc95c" />
      </>
    ),
    front: (
      <>
        {cap('#efc95c')}
        <path d="M18 18 Q19 7 32 7.5 Q46 8 46 18 Z" fill="#c8362a" />
      </>
    ),
  },
  akuma: {
    skin: SKIN.tan, hair: '#d4442a', wear: '#2a2529', eyes: 'glow',
    front: <path d="M17 27 L20 8 L25 18 L28 4 L33 17 L37 5 L41 18 L45 8 L47 27 Q42 16 32 16 Q22 16 17 27 Z" fill="#d4442a" />,
    extra: <path d="M20 40 Q32 46 44 40" fill="none" stroke="#efe6d8" strokeWidth="2.4" strokeLinecap="round" />,
  },
  luke: {
    skin: SKIN.light, hair: '#e8c455', wear: '#e0b23a',
    front: (
      <>
        <path d="M19.5 26 Q20 11 32 11 Q44 11 44.5 26 Q43 17 32 17 Q21 17 19.5 26 Z" fill="#e8c455" />
        <path d="M22 12 L27 5 L31 12 L36 5.5 L41 13 Z" fill="#e8c455" />
      </>
    ),
    extra: <path d="M23 45 L32 52 L41 45 L43 64 L21 64 Z" fill="#2f4f8c" />,
  },
  jamie: {
    skin: SKIN.mid, hair: '#241f22', wear: '#2f8fbf',
    front: (
      <>
        {cap('#241f22')}
        <path d="M28 10.5 Q33 12 34 21 L30 21 Q29 13 27 11 Z" fill="#3fa9e0" />
      </>
    ),
    extra: <path d="M20 27 h24 v4.5 h-24 Z M31 28.5 h2 v2 h-2 Z" fill="#1b1a1f" />,
  },
  kimberly: {
    skin: SKIN.brown, hair: '#2a2024', wear: '#a855c9',
    back: (
      <>
        <circle cx="13" cy="18" r="9.5" fill="#2a2024" />
        <circle cx="51" cy="18" r="9.5" fill="#2a2024" />
      </>
    ),
    front: (
      <>
        {cap('#2a2024')}
        <path d="M23 11 Q26 5 32 6.5 Q39 4.5 42 11 Z" fill="#efc040" />
      </>
    ),
  },
  juri: {
    skin: SKIN.light, hair: '#231d24', wear: '#c73b96',
    back: mane('#231d24', 15),
    front: (
      <>
        {cap('#231d24')}
        <path d="M40 9 l4 -4 l4 4 l-4 4 Z" fill="#b03fd0" />
        <path d="M20 30 Q17 40 21 46 L25 44 Q22 38 24 31 Z" fill="#231d24" />
      </>
    ),
  },
  marisa: {
    skin: SKIN.mid, hair: '#2e241f', wear: '#b03535',
    back: mane('#2e241f', 16),
    front: (
      <>
        {cap('#2e241f')}
        <path d="M18.5 17 Q32 10 45.5 17 L45.5 21 Q32 14.5 18.5 21 Z" fill="#e3bf59" />
      </>
    ),
  },
  lily: {
    skin: SKIN.tan, hair: '#3a2820', wear: '#cf7a45',
    back: (
      <>
        <path d="M32 10 L27 -2 L32 4 L37 -2 Z" fill="#e8dccb" />
        <path d="M24 12 L15 2 L22 6 L23 0 Z" fill="#d7c3a6" />
        <path d="M40 12 L49 2 L42 6 L41 0 Z" fill="#d7c3a6" />
        {mane('#3a2820', 15)}
      </>
    ),
    front: (
      <>
        {cap('#3a2820')}
        <path d="M18.5 17 h27 v4.5 h-27 Z" fill="#c9503c" />
      </>
    ),
    extra: (
      <>
        <path d="M22 31 h4 v6 h-4 Z" fill="#c9503c" opacity="0.75" />
        <path d="M38 31 h4 v6 h-4 Z" fill="#c9503c" opacity="0.75" />
      </>
    ),
  },
  jp: {
    skin: SKIN.light, hair: '#dcd8d0', wear: '#3b3f5e',
    front: (
      <>
        <path d="M19 26 Q19 10 32 10 Q45 10 45 26 Q44 15 32 16.5 Q22 18 19 26 Z" fill="#dcd8d0" />
        <path d="M40 11 Q49 15 47 24 Q46 17 39 15 Z" fill="#dcd8d0" />
      </>
    ),
    extra: (
      <>
        <circle cx="37.5" cy="28" r="5" fill="none" stroke="#d8c15f" strokeWidth="1.6" />
        <path d="M42 30 L46 36" stroke="#d8c15f" strokeWidth="1.2" />
      </>
    ),
  },
  manon: {
    skin: SKIN.light, hair: '#e2c377', wear: '#d96fa0',
    back: <circle cx="32" cy="8" r="8" fill="#e2c377" />,
    front: cap('#e2c377'),
  },
  zangief: {
    skin: SKIN.mid, hair: '#b8452e', wear: '#8f3826',
    front: (
      <>
        <path d="M22 16 Q23 4 27 2 L28 12 L31 1 L33 12 L36 2 L40 4 Q42 5 42 16 Q37 12 32 12 Q27 12 22 16 Z" fill="#b8452e" />
        <path d="M19.5 26 Q20 17 24 14.5 L25.5 20 Q22 22 21 27 Z" fill="#b8452e" />
        <path d="M44.5 26 Q44 17 40 14.5 L38.5 20 Q42 22 43 27 Z" fill="#b8452e" />
      </>
    ),
    extra: (
      <>
        <path d="M19.5 27 Q21 42 32 43 Q43 42 44.5 27 Q41 37 32 37 Q23 37 19.5 27 Z" fill="#b8452e" />
        <path d="M22 20 L28 24.5" stroke="#c58a6c" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  dhalsim: {
    skin: SKIN.brown, hair: '#a86f45', wear: '#d98a2f',
    extra: (
      <>
        <path d="M24 15 h2.5 v7 h-2.5 Z M30.75 14 h2.5 v8 h-2.5 Z M37.5 15 h2.5 v7 h-2.5 Z" fill="#efe6d8" />
        <circle cx="24" cy="55" r="2.4" fill="#efe6d8" />
        <circle cx="32" cy="57.5" r="2.8" fill="#efe6d8" />
        <circle cx="40" cy="55" r="2.4" fill="#efe6d8" />
      </>
    ),
  },
  blanka: {
    skin: '#6fbf4c', hair: '#e07f2a', wear: '#4f9c39',
    back: mane('#e07f2a', 18),
    front: <path d="M17 27 L21 7 L26 18 L30 5 L34 18 L39 6 L43 18 L47 8 L48 27 Q42 16 32 16 Q22 16 17 27 Z" fill="#e07f2a" />,
  },
  ehonda: {
    skin: SKIN.light, hair: '#241f1c', wear: '#3f5fae',
    back: (
      <>
        <path d="M29 12 h6 v-6 h-6 Z" fill="#241f1c" />
        <ellipse cx="32" cy="4.5" rx="6.5" ry="4" fill="#241f1c" />
      </>
    ),
    front: (
      <>
        <path d="M19 26 Q19 12 32 12 Q45 12 45 26 Q43 19 32 19 Q21 19 19 26 Z" fill="#241f1c" />
        <path d="M22 15 Q32 11 42 15 Q32 13 22 15 Z" fill="#241f1c" />
      </>
    ),
    extra: (
      <>
        <path d="M21 22 h22 v3 h-22 Z" fill="#cf3f36" />
        <path d="M23 34 Q32 39 41 34 L41 38 Q32 43 23 38 Z" fill="#cf3f36" />
      </>
    ),
  },
  deejay: {
    skin: SKIN.deep, hair: '#241d1a', wear: '#d8c22e',
    back: (
      <>
        <path d="M16 20 Q12 36 15 54 L21 54 Q17 34 21 22 Z" fill="#241d1a" />
        <path d="M48 20 Q52 36 49 54 L43 54 Q47 34 43 22 Z" fill="#241d1a" />
      </>
    ),
    front: cap('#241d1a'),
    extra: <path d="M20 26 h24 v5 h-24 Z M31 27 h2 v3 h-2 Z" fill="#1b1a1f" />,
  },
  rashid: {
    skin: SKIN.tan, hair: '#241f22', wear: '#43b6c4',
    front: (
      <>
        {cap('#241f22')}
        <path d="M18.5 14 h27 v5.5 h-27 Z" fill="#e8e4da" />
        <circle cx="25" cy="16.5" r="3.4" fill="#8fd8e2" stroke="#3a3a3a" strokeWidth="1.2" />
        <circle cx="39" cy="16.5" r="3.4" fill="#8fd8e2" stroke="#3a3a3a" strokeWidth="1.2" />
      </>
    ),
  },
  aki: {
    skin: '#e8d6c4', hair: '#1f1a20', wear: '#8e3a6e',
    back: (
      <>
        {mane('#1f1a20', 16)}
        <path d="M22 8 Q32 -3 42 8 Q32 3 22 8 Z" fill="#1f1a20" />
      </>
    ),
    front: (
      <>
        {cap('#1f1a20')}
        <circle cx="42.5" cy="14" r="3.4" fill="#8fd44a" />
      </>
    ),
    extra: <path d="M24 34 Q32 39 40 34" fill="none" stroke="#8fd44a" strokeWidth="1.6" strokeLinecap="round" />,
  },
  ed: {
    skin: SKIN.light, hair: '#e6cf7a', wear: '#566a92',
    front: (
      <>
        {cap('#e6cf7a')}
        <path d="M19 17 Q26 27 32 24 Q40 29 45 17 L45 24 Q38 33 32 29 Q25 33 19 24 Z" fill="#e6cf7a" />
      </>
    ),
  },
  sagat: {
    skin: SKIN.tan, hair: '#3a2a20', wear: '#8a6a38',
    extra: (
      <>
        <path d="M18 24 L44 30" stroke="#231f1d" strokeWidth="2.2" />
        <path d="M34 26 a5 5 0 1 1 8 3 a5 5 0 1 1 -8 -3 Z" fill="#231f1d" />
        <path d="M22 42 L36 56" stroke="#c17f55" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
  terry: {
    skin: SKIN.light, hair: '#e8c455', wear: '#d4403a',
    back: <path d="M18 24 Q16 38 20 48 L26 46 Q22 34 24 24 Z" fill="#e8c455" />,
    front: (
      <>
        {cap('#e8c455')}
        <path d="M18 18 Q19 6 32 6 Q45 6 46 18 Z" fill="#cf3f36" />
        <path d="M44 15 Q54 17 53 21 L44 20 Z" fill="#cf3f36" />
        <path d="M18 18 h28 v3.6 h-28 Z" fill="#efe9de" />
      </>
    ),
  },
  mai: {
    skin: SKIN.light, hair: '#4a3226', wear: '#cc3f5c',
    back: (
      <>
        <path d="M32 8 Q40 -4 46 6 Q52 16 48 30 L42 28 Q46 16 41 9 Z" fill="#4a3226" />
        {mane('#4a3226', 14)}
      </>
    ),
    front: cap('#4a3226'),
  },
  elena: {
    skin: SKIN.deep, hair: '#efe4d2', wear: '#2fa89a',
    front: (
      <>
        {cap('#efe4d2')}
        <path d="M22 11 Q28 3 32 9 Q36 2 42 11 Z" fill="#efe4d2" />
      </>
    ),
  },
  alex: {
    skin: SKIN.light, hair: '#6d4f33', wear: '#e8e6e0',
    front: (
      <>
        {cap('#6d4f33')}
        <path d="M20 20 Q26 13 33 16 Q40 12 44 20 Q38 15.5 32 16 Q25 16.5 20 20 Z" fill="#6d4f33" />
      </>
    ),
  },
  cviper: {
    skin: SKIN.light, hair: '#b8402f', wear: '#2a2733',
    back: <path d="M15 26 Q15 9 32 9 Q49 9 49 26 L49 42 L42 42 L42 24 Q42 16 32 16 Q22 16 22 24 L22 42 L15 42 Z" fill="#b8402f" />,
    front: cap('#b8402f'),
    extra: <path d="M20 26 h24 v5 h-24 Z M31 27 h2 v3 h-2 Z" fill="#1b1a1f" />,
  },
  mbison: {
    skin: SKIN.light, hair: '#241f22', wear: '#9e3336', eyes: 'glow',
    front: (
      <>
        <path d="M17 20 Q18 5 32 5 Q46 5 47 20 Z" fill="#a83a3a" />
        <path d="M14 20 h36 v5 h-36 Z" fill="#7c2a2c" />
        <path d="M32 8 l4.5 4.5 l-4.5 4.5 l-4.5 -4.5 Z" fill="#e3cf8f" />
      </>
    ),
  },
  ingrid: {
    skin: SKIN.light, hair: '#f0d878', wear: '#d4b04f',
    back: mane('#f0d878', 16),
    front: (
      <>
        {cap('#f0d878')}
        <path d="M19 16.5 h26 v4 h-26 Z" fill="#e0c25c" />
        <circle cx="32" cy="18.5" r="3" fill="#efe6d8" />
      </>
    ),
  },
  yasmine: {
    skin: SKIN.tan, hair: '#231d1c', wear: '#6f9c8a',
    front: (
      <>
        <path d="M18 26 Q19 10 32 10 Q45 10 46 26 Q43 16.5 32 16.5 Q21 16.5 18 26 Z" fill="#231d1c" />
        <path d="M30 10 L36 -1 L40 9 L47 3 L46 15 Z" fill="#231d1c" />
      </>
    ),
    extra: <path d="M28 45 L32 52 L36 45 L38 64 L26 64 Z" fill="#e8e4da" />,
  },
}

function Eyes({ mode }: { mode: Face['eyes'] }) {
  if (mode === 'hidden') return null
  const fill = mode === 'glow' ? '#f4e08a' : '#2c2420'
  return (
    <>
      <ellipse cx="26.5" cy="28" rx="1.7" ry="2.3" fill={fill} />
      <ellipse cx="37.5" cy="28" rx="1.7" ry="2.3" fill={fill} />
    </>
  )
}

export function CharacterFace({ id, name }: { id: string; name: string }) {
  const own = OWN_PORTRAITS.includes(id)
  if (own) {
    return <img src={`${import.meta.env.BASE_URL}portraits/${id}.webp`} alt="" loading="lazy" />
  }

  const face = FACES[id]
  if (!face) {
    // Not drawn yet: the monogram is still an identity, just a weaker one.
    return (
      <span className="avatar__mono" style={{ color: characterColor(id) }}>
        {characterMonogram(id, name)}
      </span>
    )
  }

  const bg = characterColor(id)
  const gradient = `face-${id}`
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bg} stopOpacity="0.42" />
          <stop offset="1" stopColor={bg} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${gradient})`} />
      {face.back}
      <path d="M28 33 h8 v13 h-8 Z" fill={face.skin} opacity="0.75" />
      <path d="M8 64 Q9 49 21 45 L43 45 Q55 49 56 64 Z" fill={face.wear} />
      <ellipse cx="32" cy="26" rx="12.5" ry="14" fill={face.skin} />
      <Eyes mode={face.eyes ?? 'normal'} />
      {face.front}
      {face.extra}
    </svg>
  )
}
