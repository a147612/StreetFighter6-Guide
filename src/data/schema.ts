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

/** How far apart the two of you are. Drives the stage diagram. */
export type Distance = 'pointBlank' | 'close' | 'mid' | 'long'

/** Who is on the floor, which is what the diagram draws differently. */
export type Stance = 'iAmDown' | 'theyAreDown' | 'neutral'

/**
 * What kind of answer this is. Drives grouping in the table: a reader comparing
 * "should I tech or delay-tech" wants those two adjacent, not separated by a
 * jump and a reversal because that is the order they were written in.
 */
export type Category =
  | 'timing'
  | 'block'
  | 'tech'
  | 'drive'
  | 'movement'
  | 'contest'
  | 'strike'
  | 'throw'
  | 'bait'

/** Reading order for category groups within a situation. */
export const CATEGORY_ORDER: readonly Category[] = [
  'timing',
  'block',
  'tech',
  'drive',
  'movement',
  'contest',
  'strike',
  'throw',
  'bait',
]

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

/**
 * What an option *is* — written once, referenced by id from everywhere.
 *
 * Deliberately does not carry risk, reward or outcomes: those depend on the
 * situation, not the option. "Back jump" is a reasonable midscreen answer and
 * close to indefensible fully cornered, and that difference is the content.
 */
export interface OptionDef {
  id: string
  /** 'both' for things usable from either seat, e.g. Drive Impact. */
  side: Side | 'both'
  name: I18nText
  /**
   * Column header in the relation matrix, where a full name does not fit.
   * "Shimmy (walk back to bait the tech)" wraps to three lines in a 3rem
   * column and stops being readable; "Shimmy" does not. Falls back to `name`.
   */
  short?: I18nText
  /**
   * The community's English term. Fighting-game vocabulary travels as English
   * and Japanese loanwords, so for a lot of readers "meaty" identifies the
   * thing faster than any translation of it does. Shown alongside the name,
   * not instead of it.
   */
  origin?: string
  /**
   * One plain sentence saying what the option actually is. The names are jargon
   * by necessity — this is what makes them learnable in place, without sending
   * the reader off to a glossary mid-lookup.
   */
  hint?: I18nText
  /** Community aliases, per locale, so search finds 暴れ / mash / abare alike. */
  aka?: Partial<Record<Locale, string[]>>
  /** Numpad + button notation, e.g. "6 + LP+LK". */
  input: string
  cost: Cost
  difficulty: Difficulty
  /** True when the option only exists on some characters (reversals, etc.). */
  characterSpecific: boolean
  category: Category
  /**
   * Show the notation in the detail panel.
   *
   * Off by default, for two separate reasons. Anyone reading a situational
   * guide already knows how to tech a throw, so LP+LK is noise; and for a
   * `characterSpecific` option there is no universal notation to print at all —
   * "623 PP" is wrong for JP's Amnesia and Ingrid's 22K, and printing it made
   * the guide state something false. Those options carry `input: ''`; the real
   * motion is per character, and the character panel is where it belongs.
   */
  showInput?: boolean
}

/** What happens when this option meets one specific opponent choice. */
export interface Versus {
  /** Opponent option id; must be one of the situation's `opponentOptions`. */
  vs: string
  /** Stated from *your* side: 'bigWin' means you come out well ahead. */
  outcome: Outcome
  note?: I18nText
  /**
   * This pairing legitimately resolves differently depending on who committed
   * first, so the cross-seat sign check must not compare it.
   *
   * Explicit, and deliberately not inferred from `note`. The check used to
   * exempt any cell that carried one, which meant writing an explanation
   * silently switched the check off — and it hid a real contradiction:
   * `command-grab` was graded as losing to Drive Impact in one place while
   * twelve others said a throw beats armour. Six cells need this. Everything
   * else is compared.
   */
  orderDependent?: true
}

/**
 * How one option grades in one situation. This is where the guide's actual
 * judgment lives, which is why it hangs off the situation and not the option.
 */
/**
 * Every evaluation is `sourced`. That is not the same as "every number is
 * checked" — it means each grade names the published mechanic that decides it,
 * and the `sources` on it point at where that mechanic is written down.
 *
 * `estimated` still exists and a new row should start there. It is the honest
 * answer while the grade is a feeling; it stops being the honest answer once
 * you can say *why*. The last thirteen to move were `walk-back`, `whiff-punish`,
 * `poke` and `reset-neutral`, which I had held back as "spacing reads" while
 * sourcing `meaty` on late active frames and `bait-block` on a blocked reversal
 * being −6. Those are the same kind of claim: a whiff punish is recovery frames,
 * walking back is throw range plus the fact that holding back is blocking. The
 * line was drawn in the wrong place, not too strictly.
 */
export interface OptionEval {
  optionId: string
  risk: RiskTier
  reward: RewardTier
  onSuccess: SuccessOutcome
  onFail: FailureOutcome
  /**
   * Outcome against each of the situation's opponent options — the row of the
   * relation matrix. "What does this beat" is the question the aggregate risk
   * and reward tiers cannot answer, and it is usually the one being asked.
   *
   * `counteredBy` used to be authored separately and is now derived from this
   * (everything that grades a loss), so the two cannot disagree.
   */
  versus: Versus[]
  /** Suggested share of a mixup, e.g. "30-40%". Omit where it is situational. */
  mixRatio?: string
  notes?: I18nText
  verified: Verification
  sources?: Source[]
}

export interface Screenshot {
  /** Path under /public, e.g. "shots/corner-wakeup.webp". */
  src: string
  caption: I18nText
}

/**
 * A situation is a position and a game state, never an opponent tendency.
 *
 * "They keep shimmying" was a situation here once, and it should not have been:
 * it is a column of the matrix. Knowing what they favour means reading down
 * that column, not switching to a different page. Keeping the situation axis
 * purely positional is what makes the list scannable.
 */
export interface Situation {
  id: string
  side: Side
  /** Group letter: A-H defense, I-K offense. */
  group: string
  name: I18nText
  position: Position[]
  /** For the stage diagram; defaults to point blank and both standing. */
  distance?: Distance
  stance?: Stance
  /** Offensive situations only. */
  knockdownType?: KnockdownType
  /** Your own drive bands where this situation reads differently. */
  myDrive?: DriveBand[]
  opponentDrive?: DriveBand[]
  /**
   * Your Drive Gauge is empty here, so nothing costing Drive is an option.
   *
   * Burnout is the case, and it needs saying in the data rather than being left
   * to whoever writes the next situation: an OD reversal was authored into both
   * Burnout tables and graded as the one thing that could still turn the round
   * around, which it cannot, because it costs two bars of a gauge that is empty.
   * `npm run validate` rejects any row costing Drive in a situation flagged
   * here. The columns are unaffected — the *opponent* is not in Burnout.
   */
  noDrive?: boolean
  /**
   * The *opponent's* Drive Gauge is empty, so no column may cost Drive.
   *
   * The mirror of `noDrive`, and it needed its own flag: the first version of
   * that rule checked rows only, on the reasoning that the opponent is never
   * the one in Burnout — which is false for J3, where attacking a burnt-out
   * defender is the entire situation. It was offering them an OD reversal.
   */
  opponentNoDrive?: boolean
  /**
   * Opponent options that form the columns of this situation's matrix, in
   * display order. Every evaluation grades every one of them.
   */
  opponentOptions: string[]
  /** Ordered; the order is the recommended reading order. */
  evaluations: OptionEval[]
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

/** One of the character's invincible escape options, as documented. */
export interface Reversal {
  move: string
  input: string
  /** What it is actually invincible to, and when. The distinction that matters:
   *  most LP/MP/HP DPs are anti-air invincible only and lose to a meaty. */
  invincibility: I18nText
  cost: I18nText
}

export interface CharacterKnockdown {
  move: string
  type: KnockdownType
  /** Frame advantage on hit, e.g. "+40". */
  advantage?: string
  note?: I18nText
}

/**
 * What changes about the universal tables when you pick a character.
 *
 * Mostly subtraction rather than addition: four of the eight characters covered
 * have no OD invincible reversal at all, and the useful thing the overlay does
 * is take that row off the table instead of leaving a reader planning around an
 * option they do not have.
 */
/**
 * One move's frame data, as Ultimate Frame Data states it.
 *
 * Every field is stored **verbatim from the source**, including its ellipses
 * and its ranges: `-7...` stays `-7...` rather than becoming "-7 or better".
 * That is what makes `npm run frames` able to diff the whole layer against the
 * site by exact string match — a paraphrase here would have to be re-checked by
 * a human forever, and this is the one part of the guide that goes stale on its
 * own. The prettying happens at render time.
 *
 * `move` is UFD's own name for it, and is the join key.
 */
export interface MoveFrames {
  /**
   * UFD's own name for the move, verbatim. This is the join key `npm run
   * frames` matches on, so it stays English and stays exactly as published
   * even when `name` gives the reader something better to read.
   */
  move: string
  /**
   * The move's name in each language, when it has one worth showing. Falls
   * back to `move`.
   *
   * Normals and throws are derived from their notation — "Standing Medium
   * Punch" is a description rather than a name, and 站中拳 and 立ち中P are
   * simply how the other two languages write the same thing.
   *
   * Special-move names come from the 1cc move lists
   * (https://scrapbox.io/1cc/招式表), which are translated from Capcom's own
   * per-character command lists and match what the game shows. Every one was
   * matched to UFD's English by *input*, not by resemblance — which is what
   * caught four of my own guesses: Sonic Boom is 音速爆擊 rather than 音速手刀,
   * Tiger Uppercut is 猛虎上勾拳 rather than 虎昇拳, Vertical Rolling Attack is
   * 垂直旋轉突擊, and 瑜珈火焰 is not Yoga Fire at all — it is Yoga Flame, a
   * different move on a different motion.
   *
   * A name is absent where that source has no entry to match, and then all
   * three locales show UFD's original. Japanese is filled only where the page
   * annotated it, where the kanji are shared, or where the katakana is not in
   * doubt; otherwise it shows the English, which is no worse than before.
   */
  name?: I18nText
  /** Numpad notation. Authored, not from UFD, which writes inputs as prose. */
  input?: string
  startup: string
  /**
   * UFD's active frames. Authored only where the late-meaty arithmetic matters,
   * because that is the only place it is worth a column: a meaty timed on the
   * last active frame gains `active - 1` over the listed on-block, and that
   * derived number is the actual answer to "if they block my meaty, whose turn
   * is it". Derived at render time rather than stored, so it cannot disagree
   * with the two numbers it comes from.
   */
  active?: string
  /**
   * What *this move* costs, when that differs from the option's own cost.
   *
   * The option can only carry one price, and "meaty" is free — right up until
   * the meaty is an OD fireball, which is two bars. The choice of button is
   * often a choice of what to spend, so the price belongs beside the frames
   * rather than above them.
   */
  cost?: Cost
  /** Absent for a throw, which cannot be blocked. */
  onBlock?: string
  onHit?: string
  /** UFD's total frames — what the move costs you when it whiffs. */
  total?: string
  note?: I18nText
}

export interface CharacterOverlay {
  id: string
  name: I18nText
  /**
   * The Latin spelling shown beside a localised name, when it is not the
   * English one. Two characters need it: Chinese and Japanese both call Akuma
   * 豪鬼/Gouki and M. Bison 維加/Vega, and the icon art has those spellings
   * burned in, so pairing 豪鬼 with "Akuma" would contradict the picture.
   * Defaults to `name.en`.
   */
  latin?: string
  /** From the character's own stats. The percentage bands assume 10,000. */
  health: number
  backdashFrames?: number
  /**
   * Options this character does not have.
   *
   * Seat-neutral, and read from both seats: as *your* character it removes
   * rows, and as the *opponent* it removes columns — along with every outcome
   * authored against them. So this list is the whole matchup layer, which is
   * also why an entry missing from it is invisible rather than wrong-looking:
   * `air-throw` was listed by nobody for as long as nothing read it as a
   * column, and the four-character list in its hint should have named nine.
   */
  removesOptions?: string[]
  /**
   * Adjustments applied to an option wherever it appears.
   *
   * `note` is *added* beside the universal one, not swapped for it. A character
   * rarely makes the general explanation wrong — it makes it incomplete.
   * Manon's command grab does everything the universal row says and also builds
   * her Medal level, which changes her throw damage for the rest of the round;
   * replacing the text would have deleted the half that is still true, and
   * duplicating it would have set up two copies to drift apart.
   */
  overrides?: Record<
    string,
    Partial<Pick<OptionEval, 'risk' | 'reward' | 'mixRatio'>> & {
      note?: I18nText
      /**
       * The motion *this* character uses for the option.
       *
       * `OptionDef.input` is one string shown to everyone, so it carried "236 P"
       * for the fireball row and told Guile, Chun-Li and Dee Jay something false
       * — quietly, because `showInput` is off everywhere and nothing rendered
       * it. Filled in here it becomes the opposite: a notation that is only ever
       * shown once a character is picked, and is therefore always true.
       */
      input?: string
    }
  >
  /**
   * Frame data, keyed by the option each move plays the part of.
   *
   * A list, because most options are a choice of button rather than one button:
   * "meaty" for Ken is 2MP at ±0 on block, or 5HP at -2, or an OD fireball at
   * -2 — three different bets, and the numbers are the whole difference between
   * them. The option row can only say "press something meaty"; this says which,
   * and what each one leaves you at.
   *
   * Only ever shown once a character is picked. There is deliberately no
   * universal tier: an averaged frame number is true of nobody, and the reason
   * to look a number up is that it is *yours*.
   */
  frames?: Record<string, MoveFrames[]>
  reversals?: Reversal[]
  knockdowns?: CharacterKnockdown[]
  /** Author-facing completeness, surfaced in the UI. */
  coverage: 'stub' | 'partial' | 'complete'
  sources?: Source[]
}

/** Losses, derived — never authored alongside `versus`. */
export function counteredBy(evaluation: OptionEval): string[] {
  return evaluation.versus
    .filter((entry) => entry.outcome === 'loss' || entry.outcome === 'bigLoss')
    .map((entry) => entry.vs)
}

export const RISK_TIERS: readonly RiskTier[] = ['safe', 'low', 'medium', 'high', 'extreme']
export const REWARD_TIERS: readonly RewardTier[] = ['none', 'low', 'medium', 'high', 'extreme']
