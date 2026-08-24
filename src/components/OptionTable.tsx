import { useMemo, useState } from 'react'
import { OptionDetail } from './OptionDetail'
import { InputNotation } from './viz/InputNotation'
import { HpLossBar } from './viz/HpLossBar'
import { RewardPips, RiskPips } from './viz/Tier'
import { useT } from '~/i18n/useT'
import type { Option, RewardTier, RiskTier } from '~/data/schema'

const RISK_ORDER: Record<RiskTier, number> = {
  safe: 0,
  low: 1,
  medium: 2,
  high: 3,
  extreme: 4,
}

const REWARD_ORDER: Record<RewardTier, number> = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
  extreme: 4,
}

/** Upper bound of a band like "25-40%" — what it costs when it goes badly. */
function hpLossValue(option: Option): number {
  const numbers = option.onFail.hpLoss.match(/\d+(?:\.\d+)?/g)
  return numbers ? Number(numbers[numbers.length - 1]) : 0
}

type SortKey = 'risk' | 'reward' | 'hpLoss' | 'difficulty'
type SortState = { key: SortKey; dir: 'asc' | 'desc' } | null

const SORTERS: Record<SortKey, (option: Option) => number> = {
  risk: (o) => RISK_ORDER[o.risk],
  reward: (o) => REWARD_ORDER[o.reward],
  hpLoss: hpLossValue,
  difficulty: (o) => o.difficulty,
}

/**
 * The scanning surface: one row per option, everything comparable at a glance,
 * prose behind a disclosure.
 *
 * Column visibility steps down with the viewport, but the detail panel always
 * carries the full record — so a hidden column is relocated, never lost. The
 * authored order is a real state you can return to, because the schema treats
 * it as the recommended reading order rather than an accident of the file.
 */
export function OptionTable({ options }: { options: Option[] }) {
  const { t, text } = useT()
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const [sort, setSort] = useState<SortState>(null)

  const rows = useMemo(() => {
    if (!sort) return options
    const get = SORTERS[sort.key]
    const sign = sort.dir === 'asc' ? 1 : -1
    return [...options].sort((a, b) => sign * (get(a) - get(b)))
  }, [options, sort])

  const allOpen = open.size === options.length

  function toggle(id: string): void {
    setOpen((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  /** asc -> desc -> back to the authored order. */
  function cycleSort(key: SortKey): void {
    setSort((previous) => {
      if (previous?.key !== key) return { key, dir: 'asc' }
      if (previous.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  function SortHeader({
    sortKey,
    label,
    className,
  }: {
    sortKey: SortKey
    label: string
    className?: string
  }) {
    const active = sort?.key === sortKey
    return (
      <th
        scope="col"
        className={className}
        aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button
          type="button"
          className={`th-sort ${active ? 'is-active' : ''}`}
          onClick={() => cycleSort(sortKey)}
          title={
            active
              ? sort.dir === 'asc'
                ? t.table.sortAsc
                : t.table.sortDesc
              : `${label} — ${t.table.sortAsc}`
          }
        >
          {label}
          <span className="th-sort__arrow" aria-hidden="true">
            {active ? (sort.dir === 'asc' ? '▲' : '▼') : '·'}
          </span>
        </button>
      </th>
    )
  }

  return (
    <div className="table-block">
      <div className="table-block__bar">
        <p className="small faint">{t.table.detailHint}</p>
        <div className="table-block__actions small">
          {sort && (
            <button type="button" className="linkish" onClick={() => setSort(null)}>
              {t.table.sortDefault}
            </button>
          )}
          <button
            type="button"
            className="linkish"
            onClick={() => setOpen(allOpen ? new Set() : new Set(options.map((o) => o.id)))}
          >
            {allOpen ? t.table.collapseAll : t.table.expandAll}
          </button>
        </div>
      </div>

      <div className="scroll-x card">
        <table className="opt-table">
          <thead>
            <tr>
              <th scope="col">{t.table.option}</th>
              <th scope="col" className="col--md">
                {t.table.input}
              </th>
              <th scope="col" className="col--lg">
                {t.table.cost}
              </th>
              <SortHeader sortKey="risk" label={t.table.risk} />
              <SortHeader sortKey="reward" label={t.table.reward} />
              <th scope="col" className="col--md">
                {t.table.followUp}
              </th>
              <SortHeader sortKey="hpLoss" label={t.table.hpLoss} />
              <SortHeader sortKey="difficulty" label={t.table.difficulty} className="col--lg" />
              <th scope="col" className="col--lg">
                {t.table.mix}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((option) => {
              const isOpen = open.has(option.id)
              const detailId = `detail-${option.id}`
              return [
                <tr
                  key={option.id}
                  className={`opt-row ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggle(option.id)}
                >
                  <th scope="row" className="opt-row__name">
                    <button
                      type="button"
                      className="opt-row__toggle"
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      // The whole row is a target for touch; the button must not
                      // let its own click bubble up and undo the toggle.
                      onClick={(event) => {
                        event.stopPropagation()
                        toggle(option.id)
                      }}
                    >
                      <span className="opt-row__chevron" aria-hidden="true">
                        ▸
                      </span>
                      <span>{text(option.name)}</span>
                      {option.characterSpecific && (
                        <span className="opt-row__flag" aria-hidden="true">
                          ★
                        </span>
                      )}
                    </button>
                  </th>
                  <td className="col--md">
                    <InputNotation input={option.input} />
                  </td>
                  <td className="col--lg mono">
                    {option.cost.drive === 0 && option.cost.sa === 0
                      ? '—'
                      : [
                          option.cost.drive > 0 ? `${option.cost.drive}D` : null,
                          option.cost.sa > 0 ? `SA${option.cost.sa}` : null,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                  </td>
                  <td>
                    <RiskPips tier={option.risk} />
                  </td>
                  <td>
                    <RewardPips tier={option.reward} />
                  </td>
                  <td className="col--md">
                    <span className={`follow follow--${option.onSuccess.followUp}`}>
                      {t.followUpShort[option.onSuccess.followUp]}
                    </span>
                  </td>
                  <td className="opt-row__hp">
                    <HpLossBar value={option.onFail.hpLoss} />
                  </td>
                  <td className="col--lg mono">{option.difficulty}</td>
                  <td className="col--lg mono">{option.mixRatio ?? '—'}</td>
                </tr>,
                isOpen ? (
                  <tr key={`${option.id}-detail`} className="opt-detail-row">
                    <td colSpan={9} id={detailId}>
                      <OptionDetail option={option} />
                    </td>
                  </tr>
                ) : null,
              ]
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
