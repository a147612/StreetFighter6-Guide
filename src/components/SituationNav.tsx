import { GROUPS, situationsInGroup, type Side, type Situation } from '~/data'
import { useT } from '~/i18n/useT'

interface SituationNavProps {
  side: Side
  groupId: string
  situationId: string
  onPickGroup: (id: string) => void
  onPickSituation: (id: string) => void
}

/**
 * Two levels: group, then situation within it.
 *
 * Empty groups stay visible and disabled rather than being hidden. The set of
 * situations this guide intends to cover is itself useful information — a
 * reader should be able to tell "not written yet" from "not a thing".
 */
export function SituationNav({
  side,
  groupId,
  situationId,
  onPickGroup,
  onPickSituation,
}: SituationNavProps) {
  const { t, text } = useT()
  const groups = GROUPS.filter((group) => group.side === side)
  const situations: Situation[] = situationsInGroup(groupId)

  return (
    <nav className="sitnav" aria-label={t.browse.situations}>
      <div className="sitnav__row scroll-x" role="tablist" aria-label={t.browse.groups}>
        {groups.map((group) => {
          const count = situationsInGroup(group.id).length
          const empty = count === 0
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={group.id === groupId}
              disabled={empty}
              className={`sitnav__group ${group.id === groupId ? 'is-active' : ''}`}
              onClick={() => onPickGroup(group.id)}
              title={empty ? t.browse.notWritten : undefined}
            >
              <span className="sitnav__letter mono">{group.id}</span>
              <span>{text(group.name)}</span>
              <span className="sitnav__count mono">{empty ? '—' : count}</span>
            </button>
          )
        })}
      </div>

      {situations.length > 0 && (
        <div className="sitnav__row sitnav__row--situations scroll-x">
          {situations.map((situation) => (
            <button
              key={situation.id}
              type="button"
              className={`sitnav__situation ${situation.id === situationId ? 'is-active' : ''}`}
              onClick={() => onPickSituation(situation.id)}
            >
              {text(situation.name)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
