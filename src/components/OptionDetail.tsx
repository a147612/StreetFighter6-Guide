import { useT } from '~/i18n/useT'
import { InputNotation } from './viz/InputNotation'
import { VerifiedTag } from './viz/VerifiedTag'
import type { Option } from '~/data/schema'

/**
 * Everything the table row leaves out, plus everything a narrow screen had to
 * drop from it. The detail is the complete record — nothing is only in the
 * table — so a phone reader loses nothing by the columns being hidden.
 */
export function OptionDetail({ option }: { option: Option }) {
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
    <div className="detail">
      <dl className="detail__meta">
        <div>
          <dt>{t.option.input}</dt>
          <dd>
            <InputNotation input={option.input} />
          </dd>
        </div>
        <div>
          <dt>{t.option.cost}</dt>
          <dd className="mono">{costLabel}</dd>
        </div>
        <div>
          <dt>{t.option.difficulty}</dt>
          <dd className="mono" aria-label={`${option.difficulty} / 5`}>
            {'●'.repeat(option.difficulty)}
            <span className="faint">{'○'.repeat(5 - option.difficulty)}</span>
          </dd>
        </div>
        {option.mixRatio && (
          <div>
            <dt>{t.option.mixRatio}</dt>
            <dd className="mono">{option.mixRatio}</dd>
          </div>
        )}
      </dl>

      <VerifiedTag verified={option.verified} />

      <div className="detail__outcomes">
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

      {option.notes && <p className="detail__notes small">{text(option.notes)}</p>}

      {option.counteredBy.length > 0 && (
        <p className="detail__countered small">
          <span className="option__label">{t.option.counteredBy}</span>
          {option.counteredBy.map((id) => (
            <code key={id}>{id}</code>
          ))}
        </p>
      )}

      {option.sources && option.sources.length > 0 && (
        <p className="detail__sources small">
          {option.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener">
              {source.url} ({source.patch})
            </a>
          ))}
        </p>
      )}
    </div>
  )
}
