import { useT } from '~/i18n/useT'
import type { RewardTier, RiskTier } from '~/data/schema'

const RISK_INDEX: Record<RiskTier, number> = {
  safe: 1,
  low: 2,
  medium: 3,
  high: 4,
  extreme: 5,
}

// 'none' is genuinely zero, so it fills nothing — a pip beside the word "none"
// reads as a contradiction. Risk's 'safe' keeps one pip on purpose: no defensive
// option in this game is truly free.
const REWARD_INDEX: Record<RewardTier, number> = {
  none: 0,
  low: 2,
  medium: 3,
  high: 4,
  extreme: 5,
}

/**
 * Five filled/empty pips plus a word.
 *
 * The pip count is the point: colour alone would fail in greyscale, on a
 * projector, and for a red-green colour-blind reader — all three of which
 * describe someone checking this between matches.
 */
function Pips({ level, color }: { level: number; color: string }) {
  return (
    <span className="pips" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className="pip"
          style={n <= level ? { background: color, borderColor: color } : undefined}
        />
      ))}
    </span>
  )
}

export function RiskBadge({ tier }: { tier: RiskTier }) {
  const { t } = useT()
  return (
    <span
      className="tier-badge"
      style={{
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ['--tier-fg' as string]: `var(--risk-${tier})`,
        ['--tier-bg' as string]: `var(--risk-${tier}-soft)`,
      }}
    >
      <span className="tier-badge__label">{t.risk.label}</span>
      <Pips level={RISK_INDEX[tier]} color={`var(--risk-${tier})`} />
      <span className="tier-badge__value">{t.risk[tier]}</span>
    </span>
  )
}

export function RewardBadge({ tier }: { tier: RewardTier }) {
  const { t } = useT()
  return (
    <span
      className="tier-badge"
      style={{
        ['--tier-fg' as string]: `var(--reward-${tier})`,
        ['--tier-bg' as string]: `var(--reward-${tier}-soft)`,
      }}
    >
      <span className="tier-badge__label">{t.reward.label}</span>
      <Pips level={REWARD_INDEX[tier]} color={`var(--reward-${tier})`} />
      <span className="tier-badge__value">{t.reward[tier]}</span>
    </span>
  )
}
