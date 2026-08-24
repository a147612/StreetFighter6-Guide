import { useT } from '~/i18n/useT'
import type { RewardTier, RiskTier } from '~/data/schema'

// 'none' is genuinely zero, so it fills nothing — a pip beside the word "none"
// reads as a contradiction. Risk's 'safe' keeps one pip on purpose: no
// defensive option in this game is truly free.
const RISK_LEVEL: Record<RiskTier, number> = {
  safe: 1,
  low: 2,
  medium: 3,
  high: 4,
  extreme: 5,
}

const REWARD_LEVEL: Record<RewardTier, number> = {
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
 * describe someone checking this between matches. In the table the word drops
 * out on narrow screens; the pips never do.
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

export function RiskPips({ tier }: { tier: RiskTier }) {
  const { t } = useT()
  return (
    <span className="tier" style={{ ['--tier-fg' as string]: `var(--risk-${tier})` }}>
      <Pips level={RISK_LEVEL[tier]} color={`var(--risk-${tier})`} />
      <span className="tier__word">{t.risk[tier]}</span>
      <span className="visually-hidden">
        {t.risk.label}: {t.risk[tier]}
      </span>
    </span>
  )
}

export function RewardPips({ tier }: { tier: RewardTier }) {
  const { t } = useT()
  return (
    <span className="tier" style={{ ['--tier-fg' as string]: `var(--reward-${tier})` }}>
      <Pips level={REWARD_LEVEL[tier]} color={`var(--reward-${tier})`} />
      <span className="tier__word">{t.reward[tier]}</span>
      <span className="visually-hidden">
        {t.reward.label}: {t.reward[tier]}
      </span>
    </span>
  )
}
