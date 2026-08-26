import { useCallback, useEffect, useMemo, useState } from 'react'
import { Topbar } from './components/Topbar'
import { OptionTable } from './components/OptionTable'
import { DefaultMix } from './components/viz/DefaultMix'
import { CharacterPanel } from './components/CharacterPanel'
import { CharacterPicker } from './components/CharacterPicker'
import { MatchupNote } from './components/MatchupNote'
import { StageDiagram } from './components/viz/StageDiagram'
import { SearchOverlay } from './components/SearchOverlay'
import { GlossaryView } from './components/GlossaryView'
import type { SearchHit } from './lib/search'
import { SituationNav } from './components/SituationNav'
import { GlassPanel } from './components/glass/GlassPanel'
import { Segmented } from './components/Segmented'
import { useT } from './i18n/useT'
import { GROUPS, SITUATIONS, getCharacter, getSituation, resolveMatchup, situationsInGroup } from './data'
import { useCharacter, useOpponent } from './lib/prefs'
import type { Side } from './data/schema'

const REPO_URL = 'https://github.com/a147612/StreetFighter6-Guide'
const POLICY_URL = 'https://www.capcomusa.com/video-policy/'

export default function App() {
  const { t, text } = useT()
  const [side, setSide] = useState<Side>('defense')
  const [groupId, setGroupId] = useState('A')
  const [situationId, setSituationId] = useState(SITUATIONS[0]?.id ?? '')

  const [searchOpen, setSearchOpen] = useState(false)
  const [glossary, setGlossary] = useState(false)
  const [targetOption, setTargetOption] = useState<string | undefined>(undefined)
  const characterId = useCharacter()
  const opponentId = useOpponent()
  const situation = getSituation(situationId)
  /** Both seats at once: my character decides the rows, theirs the columns. */
  const matchup = useMemo(
    () =>
      situation
        ? resolveMatchup(situation, getCharacter(characterId), getCharacter(opponentId))
        : { rows: [], opponentOptions: [], removedColumns: [], traits: [] },
    [situation, characterId, opponentId],
  )

  /** Picking a group jumps to its first situation; leaving the reader on a
   *  situation from the previous group would be a dead end. */
  function pickGroup(next: string): void {
    setGroupId(next)
    setTargetOption(undefined)
    const first = situationsInGroup(next)[0]
    if (first) setSituationId(first.id)
  }

  /**
   * Deep links: `#/<situation>` or `#/<situation>/<option>`.
   *
   * The stated use for this thing is looking something up between matches, and
   * a lookup you cannot bookmark is half a lookup — this makes a specific
   * situation a home-screen shortcut.
   */
  const goTo = useCallback((situationTarget: string, optionTarget?: string) => {
    const found = getSituation(situationTarget)
    if (!found) return
    setGlossary(false)
    setSide(found.side)
    setGroupId(found.group)
    setSituationId(found.id)
    setTargetOption(optionTarget)
  }, [])

  useEffect(() => {
    const apply = (): void => {
      const [, situationTarget, optionTarget] = window.location.hash.split('/')
      if (situationTarget === 'glossary') {
        setGlossary(true)
      } else if (situationTarget) {
        setGlossary(false)
        goTo(decodeURIComponent(situationTarget), optionTarget)
      }
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [goTo])

  useEffect(() => {
    if (glossary) {
      if (window.location.hash !== '#/glossary') {
        window.history.replaceState(null, '', '#/glossary')
      }
      return
    }
    if (!situationId) return
    const next = `#/${situationId}${targetOption ? `/${targetOption}` : ''}`
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
  }, [situationId, targetOption, glossary])

  /**
   * The glossary link is in the footer, so the reader is always at the bottom
   * of the page when they press it. Swapping the main content under a viewport
   * that stays where it was drops them into the middle of the new page — and
   * when the new page is shorter than the scroll offset, onto nothing at all.
   */
  const toggleGlossary = useCallback(() => {
    setGlossary((previous) => !previous)
    window.scrollTo({ top: 0 })
  }, [])

  /** `/` and ⌘K are both muscle memory for "find something"; accept either. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      const target = event.target as HTMLElement | null
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if ((event.key === '/' && !typing) || (event.key === 'k' && (event.metaKey || event.ctrlKey))) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** Switching seat has to move the group too — the defensive groups do not
   *  exist on the offensive side and vice versa. */
  function pickSide(next: Side): void {
    setSide(next)
    const firstGroup = GROUPS.find((g) => g.side === next && situationsInGroup(g.id).length > 0)
    if (firstGroup) pickGroup(firstGroup.id)
  }

  return (
    <div className="liquid-glass-backdrop app" id="top">
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={(hit: SearchHit) => goTo(hit.situationId, hit.optionId)}
      />

      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>

      <Topbar onSearch={() => setSearchOpen(true)} />

      <main id="main" className="shell app__main">
        <div className="browse" hidden={glossary}>
          <Segmented<Side>
            label={t.side.label}
            value={side}
            onChange={pickSide}
            options={[
              { value: 'defense', label: t.side.defense },
              { value: 'offense', label: t.side.offense },
            ]}
          />
          {/* One line, two seats. The `vs` is not decoration: with two
              identical-looking pickers side by side, it is the only thing
              saying which way round they are. */}
          <div className="charpick-row">
            <CharacterPicker />
            <span className="charpick-row__vs" aria-hidden="true">
              vs
            </span>
            <CharacterPicker seat="them" />
          </div>
          <SituationNav
            side={side}
            groupId={groupId}
            situationId={situationId}
            onPickGroup={pickGroup}
            onPickSituation={(next) => {
              setSituationId(next)
              setTargetOption(undefined)
            }}
          />
        </div>

        {glossary ? <GlossaryView /> : situation ? (
          <section className="stack" aria-labelledby="situation-heading">
            <div className="sithead">
              <StageDiagram
                position={situation.position}
                distance={situation.distance}
                stance={situation.stance}
              />
              <div className="sithead__text">
                <h2 id="situation-heading">{text(situation.name)}</h2>
                <span className="sithead__where mono">
                  {situation.position.map((p) => t.position[p]).join(' / ')}
                </span>
              </div>
            </div>

            <div className="charpanels">
              <CharacterPanel />
              <CharacterPanel seat="them" />
            </div>

            <DefaultMix rows={matchup.rows} />

            <MatchupNote removed={matchup.removedColumns} traits={matchup.traits} />

            <OptionTable
              key={situation.id}
              rows={matchup.rows}
              opponentOptions={matchup.opponentOptions}
              openOptionId={targetOption}
            />
          </section>
        ) : null}

      </main>

      <GlassPanel as="footer" className="footer">
        <div className="shell footer__inner small">
          <p>{t.footer.disclaimer}</p>
          <p className="muted">{t.footer.trademark}</p>
          <p className="footer__links">
            <button type="button" className="linkish" onClick={toggleGlossary}>
              {glossary ? t.browse.situations : t.glossary.open}
            </button>
            <span aria-hidden="true"> · </span>
            <a href={REPO_URL} target="_blank" rel="noreferrer noopener">
              {t.footer.source}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={POLICY_URL} target="_blank" rel="noreferrer noopener">
              {t.footer.policy}
            </a>
          </p>
        </div>
      </GlassPanel>
    </div>
  )
}
