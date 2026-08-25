import { useMemo, useState } from 'react'
import { Topbar } from './components/Topbar'
import { OptionTable } from './components/OptionTable'
import { DefaultMix } from './components/viz/DefaultMix'
import { SituationNav } from './components/SituationNav'
import { GlassPanel } from './components/glass/GlassPanel'
import { Segmented } from './components/Segmented'
import { useT } from './i18n/useT'
import { GROUPS, SITUATIONS, getSituation, resolveRows, situationsInGroup } from './data'
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
      'zh-Hant': '設計系統、主題切換、三語骨架、部署管線、資料模型',
      en: 'Design system, theming, trilingual shell, deploy pipeline, data model',
      ja: 'デザインシステム、テーマ切替、三言語の基盤、デプロイ、データモデル',
    },
  },
  {
    state: 'done',
    label: {
      'zh-Hant':
        '防守情境 A–H 全部完成：18 個情境、134 筆評價、相剋矩陣與預設打法（倒地起身、防禦中被壓、貼身對峙、Burnout、立回、對空、動力衝擊、血量門檻）',
      en: 'Defensive groups A–H complete: 18 situations, 134 evaluations, relation matrix and default mix (wakeup, pressure, close quarters, Burnout, neutral, anti-air, Drive Impact, life thresholds)',
      ja: '守り側 A〜H 完了：18状況・134評価・相性表と基本の配分（起き上がり、ガード中、至近距離、バーンアウト、立ち回り、対空、DI、体力ライン）',
    },
  },
  {
    state: 'done',
    label: {
      'zh-Hant':
        '進攻情境 I–K 完成：8 個情境、59 筆評價（起攻依倒地類型、壓制依對手資源、接近依距離）。矩陣的欄位就是防守方的選項 —— 同一份關係的另一個讀法',
      en: 'Offensive groups I–K complete: 8 situations, 59 evaluations (oki by knockdown type, pressure by their Drive, approach by distance). The columns are the defender’s options — the same relation read from the other side',
      ja: '攻め側 I〜K 完了：8状況・59評価（ダウン種別の起き攻め、相手ゲージ別の攻め、距離別の接近）。列は守り側の選択肢であり、同じ関係を逆から読んだもの',
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
      'zh-Hant': '搜尋、速查模式、術語表',
      en: 'Search, quick-reference mode, glossary',
      ja: '検索、早見表モード、用語集',
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

  /** Switching seat has to move the group too — the defensive groups do not
   *  exist on the offensive side and vice versa. */
  function pickSide(next: Side): void {
    setSide(next)
    const firstGroup = GROUPS.find((g) => g.side === next && situationsInGroup(g.id).length > 0)
    if (firstGroup) pickGroup(firstGroup.id)
  }

  return (
    <div className="liquid-glass-backdrop app" id="top">
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>

      <Topbar />

      <main id="main" className="shell app__main">
        <div className="browse">
          <Segmented<Side>
            label={t.side.label}
            value={side}
            onChange={pickSide}
            options={[
              { value: 'defense', label: t.side.defense },
              { value: 'offense', label: t.side.offense },
            ]}
          />
          {(
            <SituationNav
              side={side}
              groupId={groupId}
              situationId={situationId}
              onPickGroup={pickGroup}
              onPickSituation={setSituationId}
            />
          )}
        </div>

        {situation ? (
          <section className="stack" aria-labelledby="situation-heading">
            <div className="sithead">
              <h2 id="situation-heading">{text(situation.name)}</h2>
              <span className="sithead__where mono">
                {situation.position.map((p) => t.position[p]).join(' / ')}
              </span>
            </div>

            <DefaultMix rows={rows} />

            <OptionTable
              key={situation.id}
              rows={rows}
              opponentOptions={situation.opponentOptions}
            />
          </section>
        ) : null}

        {/* Meta, not product — collapsed so it does not compete with the table. */}
        <details className="disclosure disclosure--foot">
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
