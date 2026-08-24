import { useT } from '~/i18n/useT'
import { InputNotation } from './viz/InputNotation'
import { RewardBadge, RiskBadge } from './viz/Tier'
import { VerifiedTag } from './viz/VerifiedTag'
import type { Option } from '~/data/schema'

/**
 * One option, opaque on purpose.
 *
 * The layout answers the same four questions in the same order every time —
 * what do I press, what does it cost, what happens if it works, what happens
 * if it does not — because the point of the page is scanning, and a card that
 * rearranges itself per entry cannot be scanned.
 */
export function OptionCard({ option }: { option: Option }) {
  const { t, text } = useT()
  const { cost } = option

  const costLabel =
    cost.drive === 0 && cost.sa === 0
      ? t.option.noCost
      : [
          cost.drive > 0 ? `${cost.drive} ${t.option.driveBars}` : null,
          cost.sa > 0 ? `SA${cost.sa}` : null,
        ]
          .filter(Boolean)
          .join(' · ')

  return (
    <article className="card option">
      <header className="option__head">
        <div className="option__title">
          <h3>{text(option.name)}</h3>
          {option.characterSpecific && (
            <span className="option__flag small">
              {text({
                'zh-Hant': '角色專屬',
                en: 'Character-specific',
                ja: 'キャラ固有',
              })}
            </span>
          )}
        </div>
        <VerifiedTag verified={option.verified} />
      </header>

      <div className="option__meta">
        <div className="option__field">
          <span className="option__label">{t.option.input}</span>
          <InputNotation input={option.input} />
        </div>
        <div className="option__field">
          <span className="option__label">{t.option.cost}</span>
          <span className="mono">{costLabel}</span>
        </div>
        <div className="option__field">
          <span className="option__label">{t.option.difficulty}</span>
          <span className="mono" aria-label={`${option.difficulty} / 5`}>
            {'●'.repeat(option.difficulty)}
            <span className="faint">{'○'.repeat(5 - option.difficulty)}</span>
          </span>
        </div>
        {option.mixRatio && (
          <div className="option__field">
            <span className="option__label">{t.option.mixRatio}</span>
            <span className="mono">{option.mixRatio}</span>
          </div>
        )}
      </div>

      <div className="option__tiers">
        <RiskBadge tier={option.risk} />
        <RewardBadge tier={option.reward} />
      </div>

      <div className="option__outcomes">
        <section className="outcome outcome--success">
          <h4>
            {t.option.onSuccess}
            <span className="outcome__tag">{t.followUp[option.onSuccess.followUp]}</span>
            {option.onSuccess.damageBand && (
              <span className="outcome__tag mono">{option.onSuccess.damageBand}</span>
            )}
          </h4>
          <p>{text(option.onSuccess.text)}</p>
        </section>

        <section className="outcome outcome--fail">
          <h4>
            {t.option.onFail}
            <span className="outcome__tag outcome__tag--cost mono">
              {t.option.hpLoss} {option.onFail.hpLoss}
            </span>
            {option.onFail.driveLoss > 0 && (
              <span className="outcome__tag mono">
                −{option.onFail.driveLoss} {t.option.driveBars}
              </span>
            )}
          </h4>
          <p>{text(option.onFail.text)}</p>
          {option.onFail.positionLoss && (
            <p className="small muted">→ {text(option.onFail.positionLoss)}</p>
          )}
        </section>
      </div>

      {option.notes && <p className="option__notes small">{text(option.notes)}</p>}

      {option.counteredBy.length > 0 && (
        <footer className="option__countered small">
          <span className="option__label">{t.option.counteredBy}</span>
          <span className="option__countered-list">
            {option.counteredBy.map((id) => (
              <code key={id}>{id}</code>
            ))}
          </span>
        </footer>
      )}
    </article>
  )
}
