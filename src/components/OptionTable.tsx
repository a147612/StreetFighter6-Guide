import { useMemo, useState } from 'react'
import { OptionDetail } from './OptionDetail'
import { HpLossBar } from './viz/HpLossBar'
import { RewardPips, RiskPips } from './viz/Tier'
import { useT } from '~/i18n/useT'
import type { OptionRow } from '~/data'
import type { RewardTier, RiskTier } from '~/data/schema'

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
function hpLossValue(row: OptionRow): number {
  const numbers = row.evaluation.onFail.hpLoss.match(/\d+(?:\.\d+)?/g)
  return numbers ? Number(numbers[numbers.length - 1]) : 0
}

type SortKey = 'risk' | 'reward' | 'hpLoss' | 'difficulty'
type SortState = { key: SortKey; dir: 'asc' | 'desc' } | null

const SORTERS: Record<SortKey, (row: OptionRow) => number> = {
  risk: (r) => RISK_ORDER[r.evaluation.risk],
  reward: (r) => REWARD_ORDER[r.evaluation.reward],
  hpLoss: hpLossValue,
  difficulty: (r) => r.def.difficulty,
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
export function OptionTable({ rows: input }: { rows: OptionRow[] }) {
  const { t, text } = useT()
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const [sort, setSort] = useState<SortState>(null)

  const rows = useMemo(() => {
    if (!sort) return input
    const get = SORTERS[sort.key]
    const sign = sort.dir === 'asc' ? 1 : -1
    return [...input].sort((a, b) => sign * (get(a) - get(b)))
  }, [input, sort])

  const allOpen = open.size === input.length

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
            onClick={() => setOpen(allOpen ? new Set() : new Set(input.map((r) => r.def.id)))}
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
            {rows.map(({ def, evaluation }) => {
              const isOpen = open.has(def.id)
              const detailId = `detail-${def.id}`
              return [
                <tr
                  key={def.id}
                  className={`opt-row ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggle(def.id)}
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
                        toggle(def.id)
                      }}
                    >
                      <span className="opt-row__chevron" aria-hidden="true">
                        ▸
                      </span>
                      <span>{text(def.name)}</span>
                      {def.characterSpecific && (
                        <span className="opt-row__flag" aria-hidden="true">
                          ★
                        </span>
                      )}
                    </button>
                  </th>
                  <td className="col--lg mono">
                    {def.cost.drive === 0 && def.cost.sa === 0
                      ? '—'
                      : [
                          def.cost.drive > 0 ? `${def.cost.drive}D` : null,
                          def.cost.sa > 0 ? `SA${def.cost.sa}` : null,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                  </td>
                  <td>
                    <RiskPips tier={evaluation.risk} />
                  </td>
                  <td>
                    <RewardPips tier={evaluation.reward} />
                  </td>
                  <td className="col--md">
                    <span className={`follow follow--${evaluation.onSuccess.followUp}`}>
                      {t.followUpShort[evaluation.onSuccess.followUp]}
                    </span>
                  </td>
                  <td className="opt-row__hp">
                    <HpLossBar value={evaluation.onFail.hpLoss} />
                  </td>
                  <td className="col--lg mono">{def.difficulty}</td>
                  <td className="col--lg mono">{evaluation.mixRatio ?? '—'}</td>
                </tr>,
                isOpen ? (
                  <tr key={`${def.id}-detail`} className="opt-detail-row">
                    <td colSpan={8} id={detailId}>
                      <OptionDetail row={{ def, evaluation }} />
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
