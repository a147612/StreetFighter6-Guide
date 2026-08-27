import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { OptionDetail } from './OptionDetail'
import { HpLossBar } from './viz/HpLossBar'
import { OutcomeCell, OutcomeLegend } from './viz/OutcomeCell'
import { ScaleNote } from './ScaleNote'
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
  openOptionId,
}: {
  rows: OptionRow[]
  opponentOptions: string[]
  /** Arrived here from a search hit naming this row; open and reveal it. */
  openOptionId?: string | undefined
}) {
  const { t, text } = useT()
  const [open, setOpen] = useState<ReadonlySet<string>>(() =>
    openOptionId ? new Set([openOptionId]) : new Set(),
  )
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
  // One name cell, the opponent columns, then risk and hp-loss. It was 2 + N + 2,
  // which spanned a column that does not exist — invisible on screen, but it
  // corrupts the table's column model for anything reading it structurally.
  const colSpan = 1 + columns.length + 2

  /**
   * The detail row lives inside the horizontally scrolling table, so its cell is
   * as wide as the whole matrix — which pushed the prose off the right edge on a
   * phone and made it readable only by scrolling sideways. Publish the
   * scrollport's width so the panel can pin itself to exactly the visible area.
   */
  const scroller = useRef<HTMLDivElement | null>(null)
  const tableRef = useRef<HTMLTableElement | null>(null)
  const headRow = useRef<HTMLTableRowElement | null>(null)
  const ghost = useRef<HTMLDivElement | null>(null)
  const ghostRow = useRef<HTMLTableRowElement | null>(null)
  const [stuck, setStuck] = useState(false)

  // Deliberately no dependency array: republish on every commit, so expanding a
  // row is itself a correction. A ResizeObserver alone was not enough — its
  // callback can be missed while the tab is hidden, and the stale width then
  // survives until the next resize, leaving the panel sized for the wrong
  // viewport. Measuring on commit plus on resize cannot go stale unobserved.
  useLayoutEffect(() => {
    const node = scroller.current
    if (!node) return
    node.style.setProperty('--scroller-w', `${node.clientWidth}px`)
  })

  useLayoutEffect(() => {
    const node = scroller.current
    if (!node) return
    const publish = (): void => {
      node.style.setProperty('--scroller-w', `${node.clientWidth}px`)
    }
    window.addEventListener('resize', publish, { passive: true })
    document.addEventListener('visibilitychange', publish)
    const observer = new ResizeObserver(publish)
    observer.observe(node)
    return () => {
      window.removeEventListener('resize', publish)
      document.removeEventListener('visibilitychange', publish)
      observer.disconnect()
    }
  }, [])

  /**
   * A pinned copy of the header row.
   *
   * `position: sticky` cannot do this. The matrix scrolls sideways in its own
   * box, and `overflow-x: auto` forces `overflow-y` to compute to `auto` as
   * well — so that box becomes the nearest scrollport, and a sticky `top`
   * resolves against a container that never scrolls vertically. Measured, not
   * assumed: with `top: 4.5rem` the row simply sat 72px below the top of the
   * scroller and rode off-screen with the rest of it.
   *
   * So the row is drawn twice and the copy is pinned with `position: fixed`.
   * Horizontal sync is a `scrollLeft` copy rather than a transform, because that
   * keeps the copy a scroll container too — which makes the option-name column
   * pin itself to the left edge inside the copy with the same rule that already
   * does it in the real table, instead of a second implementation.
   */
  useLayoutEffect(() => {
    const scrollerNode = scroller.current
    const ghostNode = ghost.current
    const headNode = headRow.current
    const tableNode = tableRef.current
    if (!scrollerNode || !ghostNode || !headNode || !tableNode) return

    /** Below the topbar, measured rather than recomputed from the tokens it is
     *  built from — it wraps to two rows on a narrow phone. */
    function pinLine(): number {
      const bar = document.querySelector('.topbar')
      return (bar ? bar.getBoundingClientRect().bottom : 0) + 8
    }

    const sync = (): void => {
      const pin = pinLine()
      const head = headNode.getBoundingClientRect()
      const body = tableNode.getBoundingClientRect()
      // Show it only while the real header is above the line and there is still
      // table left below it; otherwise it hangs over the next section.
      const show = head.bottom < pin && body.bottom > pin + head.height
      setStuck(show)
      if (!show) {
        // Clear the measured geometry. It is `position: fixed`, so a stale
        // pixel width left over from a wider layout is a box the page can be
        // scrolled sideways to reach — invisible, but it widens the document.
        ghostNode.style.top = ''
        ghostNode.style.left = ''
        ghostNode.style.width = ''
        return
      }
      const box = scrollerNode.getBoundingClientRect()
      ghostNode.style.top = `${pin}px`
      ghostNode.style.left = `${box.left}px`
      ghostNode.style.width = `${box.width}px`
      ghostNode.scrollLeft = scrollerNode.scrollLeft
    }

    const followX = (): void => {
      ghostNode.scrollLeft = scrollerNode.scrollLeft
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync, { passive: true })
    // Layout can change while the tab is hidden — a rotation, a window resize —
    // and neither event fires here, so re-measure on the way back in.
    document.addEventListener('visibilitychange', sync)
    scrollerNode.addEventListener('scroll', followX, { passive: true })
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      document.removeEventListener('visibilitychange', sync)
      scrollerNode.removeEventListener('scroll', followX)
    }
  }, [])

  /**
   * Column widths, copied from the real header.
   *
   * No dependency array, for the same reason as `--scroller-w` above: a column
   * can change width from anything — a different situation, a longer name in
   * another locale, a row opening and widening a cell — and a copy that is a few
   * pixels off is worse than no copy at all, because the reader trusts it.
   */
  useLayoutEffect(() => {
    if (!stuck) return
    const headNode = headRow.current
    const ghostNode = ghostRow.current
    const tableNode = tableRef.current
    if (!headNode || !ghostNode || !tableNode) return
    const ghostTable = ghostNode.closest('table')
    if (ghostTable instanceof HTMLTableElement) {
      ghostTable.style.width = `${tableNode.offsetWidth}px`
    }
    const source = headNode.children
    const target = ghostNode.children
    for (let i = 0; i < target.length; i += 1) {
      const from = source[i]
      const to = target[i]
      if (!(from instanceof HTMLElement) || !(to instanceof HTMLElement)) continue
      to.style.width = `${from.getBoundingClientRect().width}px`
    }
  })

  function toggle(id: string): void {
    setOpen((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  // A search hit lands on a row that may be well down a long table, so open it
  // and bring it into view rather than leaving the reader to hunt for it.
  useEffect(() => {
    if (!openOptionId) return
    setOpen((previous) => new Set(previous).add(openOptionId))
    const node = document.getElementById(`row-${openOptionId}`)
    node?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [openOptionId])

  /** asc -> desc -> back to the grouped, authored order. */
  function cycleSort(key: SortKey): void {
    setSort((previous) => {
      if (previous?.key !== key) return { key, dir: 'asc' }
      if (previous.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  function sortHeader(sortKey: SortKey, label: string, first: boolean, isGhost: boolean) {
    const active = sort?.key === sortKey
    return (
      <th
        key={sortKey}
        scope="col"
        className={`opt-table__agg ${first ? 'opt-table__agg--first' : ''}`}
        aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button
          type="button"
          className={`th-sort ${active ? 'is-active' : ''}`}
          onClick={() => cycleSort(sortKey)}
          title={active && sort.dir === 'asc' ? t.table.sortAsc : t.table.sortDesc}
          // The pinned copy is a second set of the same controls. It stays
          // clickable — sorting is exactly what you want when you are deep in a
          // long table — but out of the tab order and out of the accessibility
          // tree, so it is never announced or reached twice.
          tabIndex={isGhost ? -1 : undefined}
        >
          {label}
          <span className="th-sort__arrow" aria-hidden="true">
            {active ? (sort.dir === 'asc' ? '▲' : '▼') : '·'}
          </span>
        </button>
      </th>
    )
  }

  /** One source for the header, drawn twice: in the table, and in the pinned
   *  copy. Two literals would have drifted the first time a column changed. */
  function headerRow(isGhost: boolean) {
    return (
      <tr ref={isGhost ? ghostRow : headRow}>
        <th scope="col" className="opt-table__name">
          {t.outcome.myAxis}
        </th>
        {columns.map(({ id, def }) => (
          <th
            key={id}
            scope="col"
            className="opt-table__vs"
            title={def!.hint ? text(def!.hint) : text(def!.name)}
          >
            {/* The English term rides along with the translation: for a lot of
                readers "meaty" identifies the thing faster than any Chinese
                rendering of it does. */}
            <span className="opt-table__vsname">{text(def!.short ?? def!.name)}</span>
            {def!.origin && <span className="opt-table__vsorigin">{def!.origin}</span>}
          </th>
        ))}
        {sortHeader('risk', t.table.risk, true, isGhost)}
        {sortHeader('hpLoss', t.table.hpLoss, false, isGhost)}
      </tr>
    )
  }

  return (
    <div className="table-block">
      <div className="table-block__bar">
        <OutcomeLegend />
        <div className="table-block__actions small">
          <ScaleNote />
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

      <div className="scroll-x card" ref={scroller}>
        <table className="opt-table" ref={tableRef}>
          <thead>{headerRow(false)}</thead>

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
              {section.rows.map((row) => {
                const { def, evaluation } = row
                const isOpen = open.has(def.id)
                const detailId = `detail-${def.id}`
                const outcomes = new Map(evaluation.versus.map((v) => [v.vs, v.outcome]))
                return (
                  <Fragment key={def.id}>
                    <tr
                      id={`row-${def.id}`}
                      className={`opt-row ${isOpen ? 'is-open' : ''}`}
                      onClick={() => toggle(def.id)}
                    >
                      <th scope="row" className="opt-row__name opt-table__name">
                        <button
                          type="button"
                          className="opt-row__toggle"
                          aria-expanded={isOpen}
                          aria-controls={detailId}
                          title={def.hint ? text(def.hint) : undefined}
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
                          {/* This row reads differently against the opponent
                              you picked. Marked here because the reason is in
                              the detail panel, and nothing else on the closed
                              row would tell you there was one to open. */}
                          {/* Startup only. The rest needs the detail panel, but
                              "how fast is it" is the one number worth scanning
                              a whole column of. */}
                          {/* Only when the option is one button. A count of
                              how many buttons there are is not a fact about
                              the option, and startup is not one number once
                              there are several. Stored as UFD writes it, which
                              can be "3 (1)" or "16...32" — the badge wants the
                              number you would say out loud. */}
                          {row.frames?.length === 1 && row.frames[0]?.startup && (
                            <span className="opt-row__frames mono">
                              {row.frames[0].startup.match(/\d+/)?.[0] ?? row.frames[0].startup}F
                            </span>
                          )}
                          {row.opponentNotes && row.opponentNotes.length > 0 && (
                            <span
                              className="opt-row__matchup"
                              title={row.opponentNotes.map((n) => text(n.trait)).join(' · ')}
                              aria-hidden="true"
                            >
                              ◆
                            </span>
                          )}
                        </button>
                      </th>
                      {columns.map(({ id, def: opponent }) => (
                        // The outcome rides on the cell so the phone layout can
                        // sort the chips best-to-worst with `order`, without a
                        // second pass over the data or a second component.
                        <td
                          key={id}
                          className={`opt-table__vs opt-table__vs--${outcomes.get(id) ?? 'na'}`}
                        >
                          <OutcomeCell
                            outcome={outcomes.get(id)}
                            opponentName={text(opponent!.name)}
                            shortName={text(opponent!.short ?? opponent!.name)}
                          />
                        </td>
                      ))}
                      <td className="opt-table__agg opt-table__agg--first">
                        <RiskPips tier={evaluation.risk} />
                      </td>
                      <td className="opt-table__agg opt-row__hp">
                        <HpLossBar value={evaluation.onFail.hpLoss} />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="opt-detail-row">
                        <td colSpan={colSpan} id={detailId}>
                          {/* Pass the row through rather than rebuilding it —
                              reassembling it here silently dropped the character
                              note the overlay had just attached. */}
                          <OptionDetail row={row} />
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

      {/* Always mounted, only revealed: it has to be measurable to be placed. */}
      <div
        className={`opt-stickyhead ${stuck ? 'is-on' : ''}`}
        ref={ghost}
        aria-hidden="true"
      >
        <table className="opt-table opt-table--ghost">
          <thead>{headerRow(true)}</thead>
        </table>
      </div>

      <p className="small faint">{t.table.detailHint}</p>
    </div>
  )
}

