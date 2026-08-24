/**
 * The data model.
 *
 * Three ideas carry the whole thing:
 *
 *  1. **Options are shared, situations reference them.** A situation is a
 *     position/state/resource combination plus an ordered list of option ids —
 *     not a copy of the options. "Throw tech" is written once.
 *
 *  2. **Offense and defense are two readings of one relation matrix.** A cell
 *     is (offensive option x defensive option -> outcome). The defender's view
 *     reads it by column, the attacker's by row. The relation is never authored
 *     twice, so the two views cannot drift apart.
 *
 *  3. **Every claim is marked `estimated` or `sourced`.** Qualitative tiers and
 *     damage bands come first and cover everything; verified frame data and
 *     exact numbers land later, per entry, with a source and a patch version.
 *     The UI shows which is which, so an estimate is never mistaken for a fact.
 */

export const LOCALES = ['zh-Hant', 'en', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

/** Every reader-facing string. All three locales are required — a missing
 *  translation is a type error, not a runtime fallback to English. */
export type I18nText = Record<Locale, string>

/** Danger of picking this option. Paired with a glyph and pip count in the UI,
 *  never colour alone. */
export type RiskTier = 'safe' | 'low' | 'medium' | 'high' | 'extreme'

/** Payoff when it works. A separate scale from risk, and a separate hue family,
 *  so "big payoff" never reads as "big danger". */
export type RewardTier = 'none' | 'low' | 'medium' | 'high' | 'extreme'

/** 1 = press a button. 5 = needs a just-frame or a hard read. */
export type Difficulty = 1 | 2 | 3 | 4 | 5

export type Verification = 'estimated' | 'sourced'

export type Side = 'defense' | 'offense'

/** What the option buys you when it lands. */
export type FollowUp =
  /** Full combo. */
  | 'combo'
  /** Keeps your turn — pressure continues. */
  | 'pressure'
  /** Resets to neutral; nobody has the turn. */
  | 'neutral'
  /** Escapes, but hands the turn over. */
  | 'none'

export type Position = 'midscreen' | 'nearCorner' | 'cornered'

/** Drive gauge, banded rather than exact: the decision changes at the band
 *  boundaries, not at every bar. */
export type DriveBand = 'burnout' | 'low' | 'mid' | 'high'

/** How the opponent got put on the floor. This is the axis that decides what
 *  oki is available, so it is the primary variable of every offensive
 *  situation. Which moves produce which type is character-layer data. */
export type KnockdownType =
  | 'throw'
  | 'soft'
  | 'hard'
  | 'airCombo'
  | 'wallSplat'
  | 'saEnder'
  | 'driveRushEnder'

/** Result of one (offense, defense) pairing, from the row player's side. */
export type Outcome = 'bigWin' | 'win' | 'even' | 'loss' | 'bigLoss'

export interface Source {
  url: string
  /** Game version the numbers were read at, e.g. "2026.08". Numbers without
   *  one are unverifiable the moment a balance patch lands. */
  patch: string
  note?: string
}

export interface Cost {
  /** Drive bars. */
  drive: number
  /** Super Art level, 0 for none. */
  sa: 0 | 1 | 2 | 3
}

export interface SuccessOutcome {
  text: I18nText
  followUp: FollowUp
  /** Band, not a number: "20-30%". Exact values need `verified: 'sourced'`. */
  damageBand?: string
  opponentDriveLoss?: number
}

export interface FailureOutcome {
  text: I18nText
  /** Band of your own health, e.g. "30-45%" or "40%+ (into the corner)". */
  hpLoss: string
  driveLoss: number
  positionLoss?: I18nText
}

export interface Option {
  id: string
  /** 'both' for things usable from either seat, e.g. Drive Impact. */
  side: Side | 'both'
  name: I18nText
  /** Community aliases, per locale, so search finds 暴れ / mash / abare alike. */
  aka?: Partial<Record<Locale, string[]>>
  /** Numpad + button notation, e.g. "6 + LP+LK". */
  input: string
  cost: Cost
  risk: RiskTier
  reward: RewardTier
  onSuccess: SuccessOutcome
  onFail: FailureOutcome
  /** Option ids on the other side of the matrix that beat this. */
  counteredBy: string[]
  difficulty: Difficulty
  /** Suggested share of a mixup, e.g. "30-40%". Omit where it is situational. */
  mixRatio?: string
  /** True when the option only exists on some characters (reversals, etc.). */
  characterSpecific: boolean
  verified: Verification
  sources?: Source[]
  notes?: I18nText
}

/** Optional, user-supplied annotated capture. Diagrams stand on their own; this
 *  slot exists so screenshots can be added later without touching code. */
export interface Screenshot {
  /** Path under /public, e.g. "shots/corner-wakeup.webp". */
  src: string
  caption: I18nText
}

export interface Situation {
  id: string
  side: Side
  /** Group letter: A-H defense, I-K offense. */
  group: string
  name: I18nText
  summary: I18nText
  position: Position[]
  /** Offensive situations only. */
  knockdownType?: KnockdownType
  /** Your own drive bands where this situation reads differently. */
  myDrive?: DriveBand[]
  opponentDrive?: DriveBand[]
  /** Ordered option ids; the order is the recommended reading order. */
  options: string[]
  screenshots?: Screenshot[]
}

/** One authored relation. Read by column for the defender's view, by row for
 *  the attacker's. `outcome` is always stated from the attacker's side; the
 *  defensive view inverts it for display. */
export interface MatrixCell {
  offense: string
  defense: string
  outcome: Outcome
  note?: I18nText
}

export interface CharacterOverlay {
  id: string
  name: I18nText
  /** Options this character adds (reversals, unique escapes). */
  addsOptions: Option[]
  /** Overrides for universal options, keyed by option id. */
  overrides?: Record<string, Partial<Pick<Option, 'risk' | 'reward' | 'notes' | 'mixRatio'>>>
  /** Which of this character's moves cause which knockdown type. */
  knockdowns?: { move: string; type: KnockdownType; note?: I18nText }[]
  /** Author-facing completeness, surfaced as coverage in the UI. */
  coverage: 'stub' | 'partial' | 'complete'
}

export const RISK_TIERS: readonly RiskTier[] = ['safe', 'low', 'medium', 'high', 'extreme']
export const REWARD_TIERS: readonly RewardTier[] = ['none', 'low', 'medium', 'high', 'extreme']
