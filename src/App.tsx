import { useMemo, useState } from 'react'
import { Topbar } from './components/Topbar'
import { OptionTable } from './components/OptionTable'
import { SituationNav } from './components/SituationNav'
import { GlassPanel } from './components/glass/GlassPanel'
import { Segmented } from './components/Segmented'
import { useT } from './i18n/useT'
import { SITUATIONS, getSituation, resolveRows, situationsInGroup } from './data'
import type { I18nText, Side } from './data/schema'

const REPO_URL = 'https://github.com/a147612/StreetFighter6-Guide'
const POLICY_URL = 'https://www.capcomusa.com/video-policy/'

interface RoadmapItem {
  state: 'done' | 'active' | 'planned'
  label: I18nText
}

const ROADMAP: RoadmapItem[] = [
  {
    state: 'done',
    label: {
      'zh-Hant': '設計系統、主題切換、三語骨架、部署管線',
      en: 'Design system, theming, trilingual shell, deploy pipeline',
      ja: 'デザインシステム、テーマ切替、三言語の基盤、デプロイ',
    },
  },
  {
    state: 'done',
    label: {
      'zh-Hant': '資料模型（雙向相剋矩陣、倒地類型、查證標記）',
      en: 'Data model (two-way relation matrix, knockdown types, verification flags)',
      ja: 'データモデル（双方向の相性表、ダウン種別、検証フラグ）',
    },
  },
  {
    state: 'done',
    label: {
      'zh-Hant': '情境 A 倒地起身：6 個情境、33 筆評價、相剋矩陣（起身時機、場中、角落、硬倒地、Drive Rush 起攻、Shimmy）',
      en: 'Group A, waking up: 6 situations, 33 evaluations with the relation matrix (rise timing, midscreen, corner, hard knockdown, Drive Rush oki, shimmy)',
      ja: 'グループA 起き上がり：6状況・33評価・相性表（起き上がりのタイミング、中央、画面端、ハードダウン、DR起き攻め、シミー）',
    },
  },
  {
    state: 'active',
    label: {
      'zh-Hant': '防守情境 B–H：防禦被壓、投擲距離、Burnout、中距離、對空、Drive Impact、逆轉判斷',
      en: 'Defensive groups B–H: blockstrings, throw range, Burnout, neutral, anti-air, Drive Impact, comeback reads',
      ja: '守り側 B〜H：連係ガード、投げ間合い、バーンアウト、中距離、対空、ドライブインパクト、逆転判断',
    },
  },
  {
    state: 'planned',
    label: {
      'zh-Hant': '進攻情境 I–K：起攻（依倒地類型與位置）、壓制節奏、連段抉擇',
      en: 'Offensive situations I–K: oki by knockdown type and position, pressure pacing, combo choices',
      ja: '攻め側の状況 I〜K：ダウン種別と位置別の起き攻め、攻めの緩急、コンボ選択',
    },
  },
  {
    state: 'planned',
    label: {
      'zh-Hant': 'SVG 圖解：位置圖、frame 時間軸、決策流程',
      en: 'SVG diagrams: position maps, frame timelines, decision flows',
      ja: 'SVG 図解：位置図、フレーム時間軸、判断フロー',
    },
  },
  {
    state: 'planned',
    label: {
      'zh-Hant': '搜尋、速查模式、術語表、攻/守視角切換',
      en: 'Search, quick-reference mode, glossary, offense/defense view toggle',
      ja: '検索、早見表モード、用語集、攻守の視点切替',
    },
  },
  {
    state: 'planned',
    label: {
      'zh-Hant': '角色層 8 隻，之後補齊全角色',
      en: 'Character layer for 8 characters, then the full roster',
      ja: 'キャラ別レイヤー 8 体、その後に全キャラ',
    },
  },
  {
    state: 'planned',
    label: {
      'zh-Hant': '逐項查證，把 estimated 換成 sourced（附來源與版本號）',
      en: 'Verify entry by entry, turning estimated into sourced with a link and patch version',
      ja: '項目ごとに検証し、estimated を出典とバージョン付きの sourced に置き換える',
    },
  },
]

export default function App() {
  const { t, text } = useT()
  const [side, setSide] = useState<Side>('defense')
  const [groupId, setGroupId] = useState('A')
  const [situationId, setSituationId] = useState(SITUATIONS[0]?.id ?? '')

  const situation = getSituation(situationId)
  const rows = useMemo(() => (situation ? resolveRows(situation) : []), [situation])

  /** Picking a group jumps to its first situation; leaving the reader on a
   *  situation from the previous group would be a dead end. */
  function pickGroup(next: string): void {
    setGroupId(next)
    const first = situationsInGroup(next)[0]
    if (first) setSituationId(first.id)
  }

  return (
    <div className="liquid-glass-backdrop app" id="top">
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>

      <Topbar />

      <main id="main" className="shell app__main">
        <section className="hero">
          <h1 className="hero__title">{t.appName}</h1>
          <p className="hero__tagline">{t.tagline}</p>

          <div className="hero__side">
            <Segmented<Side>
              label={t.side.label}
              value={side}
              onChange={setSide}
              options={[
                { value: 'defense', label: t.side.defense },
                { value: 'offense', label: t.side.offense },
              ]}
              compact
            />
          </div>
        </section>

        {side === 'defense' && situation ? (
          <section className="stack" aria-labelledby="situation-heading">
            <SituationNav
              side={side}
              groupId={groupId}
              situationId={situationId}
              onPickGroup={pickGroup}
              onPickSituation={setSituationId}
            />

            <div className="card card--padded situation">
              <span className="situation__group mono">
                {situation.group}
                {' · '}
                {situation.position.map((p) => t.position[p]).join(' / ')}
              </span>
              <h2 id="situation-heading">{text(situation.name)}</h2>
              <p className="situation__brief">{text(situation.brief)}</p>

              <details className="disclosure">
                <summary>{t.situation.showFull}</summary>
                <p className="muted">{text(situation.summary)}</p>
              </details>
            </div>

            <OptionTable
              key={situation.id}
              rows={rows}
              opponentOptions={situation.opponentOptions}
            />
          </section>
        ) : (
          <section className="card card--padded stack">
            <h2>{text({ 'zh-Hant': '進攻情境', en: 'Offensive situations', ja: '攻め側の状況' })}</h2>
            <p className="muted">
              {text({
                'zh-Hant':
                  '進攻層（I–K）的資料模型已就位 —— 起攻依「用什麼招打倒對手」與位置分類，壓制節奏依對手的 Drive 存量分類。內容正在建置中。',
                en: 'The offensive layer (I–K) is modelled: oki keyed on how the knockdown happened plus position, pressure pacing keyed on the opponent\u2019s Drive. Content is being written.',
                ja: '攻め側（I〜K）のデータモデルは構築済み。起き攻めは「どの技でダウンを取ったか」と位置で分類し、攻めの緩急は相手のドライブ残量で分類する。内容は執筆中。',
              })}
            </p>
          </section>
        )}

        {/* Meta, not product — collapsed so it does not compete with the table. */}
        <details className="card card--padded disclosure disclosure--block">
          <summary>{t.roadmap.heading}</summary>
          <ol className="roadmap">
            {ROADMAP.map((item, i) => (
              <li key={i} className={`roadmap__item roadmap__item--${item.state}`}>
                <span className="roadmap__state small">
                  {item.state === 'done'
                    ? t.roadmap.done
                    : item.state === 'active'
                      ? t.roadmap.inProgress
                      : t.roadmap.planned}
                </span>
                <span>{text(item.label)}</span>
              </li>
            ))}
          </ol>
        </details>
      </main>

      <GlassPanel as="footer" className="footer">
        <div className="shell footer__inner small">
          <p>{t.footer.disclaimer}</p>
          <p className="muted">{t.footer.trademark}</p>
          <p className="footer__links">
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
