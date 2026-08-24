import { useT } from '~/i18n/useT'
import { InputNotation } from './viz/InputNotation'
import { VerifiedTag } from './viz/VerifiedTag'
import { RewardPips } from './viz/Tier'
import { OutcomeCell } from './viz/OutcomeCell'
import { getOption, type OptionRow } from '~/data'
import { counteredBy } from '~/data/schema'

/**
 * Everything the table row leaves out, plus everything a narrow screen had to
 * drop from it. The detail is the complete record — nothing lives only in the
 * table — so a phone reader loses nothing to the hidden columns.
 */
export function OptionDetail({ row }: { row: OptionRow }) {
  const { t, text } = useT()
  const { def, evaluation } = row
  const { cost } = def

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
      {/* The names are jargon by necessity; this makes them learnable in place
          rather than sending the reader to a glossary mid-lookup. */}
      {(def.origin || def.hint) && (
        <p className="detail__hint">
          {def.origin && <span className="detail__origin">{def.origin}</span>}
          {def.hint && text(def.hint)}
        </p>
      )}

      <dl className="detail__meta">
        {/* Only where the motion actually varies by character. Everyone reading
            this already knows how to tech a throw. */}
        {def.showInput && (
          <div>
            <dt>{t.option.input}</dt>
            <dd>
              <InputNotation input={def.input} />
            </dd>
          </div>
        )}
        <div>
          <dt>{t.option.cost}</dt>
          <dd className="mono">{costLabel}</dd>
        </div>
        <div>
          <dt>{t.table.reward}</dt>
          <dd>
            <RewardPips tier={evaluation.reward} />
          </dd>
        </div>
        <div>
          <dt>{t.option.followUp}</dt>
          <dd>
            <span className={`follow follow--${evaluation.onSuccess.followUp}`}>
              {t.followUpShort[evaluation.onSuccess.followUp]}
            </span>
          </dd>
        </div>
        <div>
          <dt>{t.option.difficulty}</dt>
          <dd className="mono" aria-label={`${def.difficulty} / 5`}>
            {'●'.repeat(def.difficulty)}
            <span className="faint">{'○'.repeat(5 - def.difficulty)}</span>
          </dd>
        </div>
        {evaluation.mixRatio && (
          <div>
            <dt>{t.option.mixRatio}</dt>
            <dd className="mono">{evaluation.mixRatio}</dd>
          </div>
        )}
      </dl>

      <VerifiedTag verified={evaluation.verified} />

      <div className="detail__outcomes">
        <section className="outcome outcome--success">
          <h4>
            {t.option.onSuccess}
            <span className="outcome__tag">{t.followUp[evaluation.onSuccess.followUp]}</span>
            {evaluation.onSuccess.damageBand && (
              <span className="outcome__tag mono">{evaluation.onSuccess.damageBand}</span>
            )}
          </h4>
          <p>{text(evaluation.onSuccess.text)}</p>
        </section>

        <section className="outcome outcome--fail">
          <h4>
            {t.option.onFail}
            <span className="outcome__tag outcome__tag--cost mono">
              {t.option.hpLoss} {evaluation.onFail.hpLoss}
            </span>
            {evaluation.onFail.driveLoss > 0 && (
              <span className="outcome__tag mono">
                −{evaluation.onFail.driveLoss} {t.option.driveBars}
              </span>
            )}
          </h4>
          <p>{text(evaluation.onFail.text)}</p>
          {evaluation.onFail.positionLoss && (
            <p className="small muted">→ {text(evaluation.onFail.positionLoss)}</p>
          )}
        </section>
      </div>

      {evaluation.notes && <p className="detail__notes small">{text(evaluation.notes)}</p>}

      {evaluation.versus.length > 0 && (
        <div className="detail__versus">
          <p className="option__label">{t.outcome.header}</p>
          <ul className="versus-list">
            {evaluation.versus.map((entry) => {
              const opponent = getOption(entry.vs)
              const name = opponent ? text(opponent.name) : entry.vs
              return (
                <li
                  key={entry.vs}
                  className="versus-list__item"
                  title={opponent?.hint ? text(opponent.hint) : name}
                >
                  <OutcomeCell outcome={entry.outcome} opponentName={name} labelled={false} />
                  <span className="versus-list__name">{name}</span>
                  <span className={`versus-list__verdict oc-text oc-text--${entry.outcome}`}>
                    {t.outcome[entry.outcome]}
                  </span>
                  {entry.note && <span className="versus-list__note muted">{text(entry.note)}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Derived from the outcomes above, so the two can never disagree. */}
      {counteredBy(evaluation).length > 0 && (
        <p className="detail__countered small">
          <span className="option__label">{t.option.counteredBy}</span>
          {counteredBy(evaluation).map((id) => {
            const other = getOption(id)
            return (
              <span key={id} className="counter-chip">
                {other ? text(other.name) : id}
              </span>
            )
          })}
        </p>
      )}

      {evaluation.sources && evaluation.sources.length > 0 && (
        <p className="detail__sources small">
          {evaluation.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener">
              {source.url} ({source.patch})
            </a>
          ))}
        </p>
      )}
    </div>
  )
}
