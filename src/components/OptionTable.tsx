import { Fragment, useMemo, useState } from 'react'
import { OptionDetail } from './OptionDetail'
import { HpLossBar } from './viz/HpLossBar'
import { OutcomeCell, OutcomeLegend } from './viz/OutcomeCell'
import { RiskPips } from './viz/Tier'
import { getOption, type OptionRow } from '~/data'
import { CATEGORY_ORDER, type Category, type RewardTier, type RiskTier } from '~/data/schema'
import { useT } from '~/i18n/useT'

const RISK_ORDER: Record<RiskTier, number> = { safe: 0, low: 1, medium: 2, high: 3, extreme: 4 }
const REWARD_ORDER: Record<RewardTier, number> = { none: 0, low: 1, medium: 2, high: 3, extreme: 4 }

/** Upper bound of a band like "25-40%" — what it costs when it goes badly. */
function hpLossValue(row: OptionRow): number {
  const numbers = row.evaluation.onFail.hpLoss.match(/\d+(?:\.\d+)?/g)
  return numbers ? Number(numbers[numbers.length - 1]) : 0
}

type SortKey = 'risk' | 'reward' | 'hpLoss'
type SortState = { key: SortKey; dir: 'asc' | 'desc' } | null

const SORTERS: Record<SortKey, (row: OptionRow) => number> = {
  risk: (r) => RISK_ORDER[r.evaluation.risk],
  reward: (r) => REWARD_ORDER[r.evaluation.reward],
  hpLoss: hpLossValue,
}

/**
 * The relation matrix, as the main table.
 *
 * Aggregate risk and reward answer "how dangerous is this"; they cannot answer
 * "what does it beat", which is usually the actual question. So the opponent's
 * options are the columns and every row states its outcome against each — the
 * rock-paper-scissors chart the situation really is, rather than a flat list
 * with the relationships buried in prose.
 *
 * Rows are grouped by category so like sits with like: comparing "tech or delay
 * tech" should not mean reading past a jump and a reversal. Sorting dissolves
 * the grouping, since a sorted list ranked across all options is the point of
 * asking for one.
 */
export function OptionTable({
  rows: input,
  opponentOptions,
}: {
  rows: OptionRow[]
  opponentOptions: string[]
}) {
  const { t, text } = useT()
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const [sort, setSort] = useState<SortState>(null)

  const columns = useMemo(
    () => opponentOptions.map((id) => ({ id, def: getOption(id) })).filter((c) => c.def),
    [opponentOptions],
  )

  /** Either flat-and-sorted, or grouped by category in authored order. */
  const sections = useMemo(() => {
    if (sort) {
      const get = SORTERS[sort.key]
      const sign = sort.dir === 'asc' ? 1 : -1
      return [{ category: null, rows: [...input].sort((a, b) => sign * (get(a) - get(b))) }]
    }
    const byCategory = new Map<Category, OptionRow[]>()
    for (const row of input) {
      const list = byCategory.get(row.def.category)
      if (list) list.push(row)
      else byCategory.set(row.def.category, [row])
    }
    return CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
      category,
      rows: byCategory.get(category)!,
    }))
  }, [input, sort])

  const allOpen = open.size === input.length
  const colSpan = 2 + columns.length + 2

  function toggle(id: string): void {
    setOpen((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  /** asc -> desc -> back to the grouped, authored order. */
  function cycleSort(key: SortKey): void {
    setSort((previous) => {
      if (previous?.key !== key) return { key, dir: 'asc' }
      if (previous.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  function SortHeader({ sortKey, label }: { sortKey: SortKey; label: string }) {
    const active = sort?.key === sortKey
    return (
      <th
        scope="col"
        className="opt-table__agg"
        aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button
          type="button"
          className={`th-sort ${active ? 'is-active' : ''}`}
          onClick={() => cycleSort(sortKey)}
          title={active && sort.dir === 'asc' ? t.table.sortAsc : t.table.sortDesc}
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
        <OutcomeLegend />
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
            <tr className="opt-table__spanrow">
              <th />
              <th className="opt-table__spanhead" colSpan={columns.length} scope="colgroup">
                {t.outcome.header} →
              </th>
              <th colSpan={2} />
            </tr>
            <tr>
              <th scope="col" className="opt-table__name">
                {t.table.option}
              </th>
              {columns.map(({ id, def }) => (
                <th key={id} scope="col" className="opt-table__vs" title={text(def!.name)}>
                  <span>{text(def!.short ?? def!.name)}</span>
                </th>
              ))}
              <SortHeader sortKey="risk" label={t.table.risk} />
              <SortHeader sortKey="hpLoss" label={t.table.hpLoss} />
            </tr>
          </thead>

          {sections.map((section, sectionIndex) => (
            <tbody key={section.category ?? `sorted-${sectionIndex}`}>
              {section.category && (
                <tr className="opt-table__group">
                  <th scope="colgroup" colSpan={colSpan}>
                    {/* The cell spans the full table, so its text would scroll
                        out of view sideways; pin the label, not the cell. */}
                    <span>{t.category[section.category]}</span>
                  </th>
                </tr>
              )}
              {section.rows.map(({ def, evaluation }) => {
                const isOpen = open.has(def.id)
                const detailId = `detail-${def.id}`
                const outcomes = new Map(evaluation.versus.map((v) => [v.vs, v.outcome]))
                return (
                  <Fragment key={def.id}>
                    <tr
                      className={`opt-row ${isOpen ? 'is-open' : ''}`}
                      onClick={() => toggle(def.id)}
                    >
                      <th scope="row" className="opt-row__name opt-table__name">
                        <button
                          type="button"
                          className="opt-row__toggle"
                          aria-expanded={isOpen}
                          aria-controls={detailId}
                          // The whole row is a target for touch; the button must
                          // not let its click bubble up and undo the toggle.
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
                      {columns.map(({ id, def: opponent }) => (
                        <td key={id} className="opt-table__vs">
                          <OutcomeCell
                            outcome={outcomes.get(id)}
                            opponentName={text(opponent!.name)}
                          />
                        </td>
                      ))}
                      <td className="opt-table__agg">
                        <RiskPips tier={evaluation.risk} />
                      </td>
                      <td className="opt-table__agg opt-row__hp">
                        <HpLossBar value={evaluation.onFail.hpLoss} />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="opt-detail-row">
                        <td colSpan={colSpan} id={detailId}>
                          <OptionDetail row={{ def, evaluation }} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          ))}
        </table>
      </div>
      <p className="small faint">{t.table.detailHint}</p>
    </div>
  )
}

