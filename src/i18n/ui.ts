import type { Locale } from '~/data/schema'

/**
 * Interface strings. The shape is declared once and each locale must satisfy
 * it in full, so a forgotten translation fails `tsc` instead of silently
 * falling back to English.
 *
 * Content strings (situations, options, outcomes) do NOT live here — they are
 * embedded per entry as `I18nText`, because those are three phrasings of one
 * piece of knowledge and splitting them across locale files is how they drift.
 */
export interface UiStrings {
  appName: string
  tagline: string
  skipToContent: string

  nav: { situations: string; characters: string; glossary: string; quickRef: string }
  search: { placeholder: string; label: string }

  side: { label: string; defense: string; offense: string }
  sideHint: { defense: string; offense: string }

  theme: {
    label: string
    system: string
    light: string
    dark: string
    clickToSwitch: string
  }
  localeLabel: string
  refraction: { label: string; on: string; off: string; unsupported: string }

  table: {
    option: string
    cost: string
    risk: string
    reward: string
    followUp: string
    hpLoss: string
    difficulty: string
    mix: string
    expandAll: string
    collapseAll: string
    detailHint: string
    sortDefault: string
    sortAsc: string
    sortDesc: string
  }
  followUpShort: { combo: string; pressure: string; neutral: string; none: string }
  situation: { showFull: string; hideFull: string }
  browse: { groups: string; situations: string; notWritten: string; coverage: string }

  risk: { label: string; safe: string; low: string; medium: string; high: string; extreme: string }
  reward: {
    label: string
    none: string
    low: string
    medium: string
    high: string
    extreme: string
  }
  verified: { estimated: string; sourced: string; estimatedHint: string; sourcedHint: string }

  option: {
    input: string
    cost: string
    driveBars: string
    onSuccess: string
    onFail: string
    followUp: string
    hpLoss: string
    counteredBy: string
    difficulty: string
    mixRatio: string
    noCost: string
  }
  followUp: { combo: string; pressure: string; neutral: string; none: string }
  position: { midscreen: string; nearCorner: string; cornered: string }

  roadmap: { heading: string; done: string; inProgress: string; planned: string }
  footer: { disclaimer: string; trademark: string; source: string; policy: string }
}

const zhHant: UiStrings = {
  appName: 'SF6 情境對策',
  tagline: '每個情境、每個選擇 —— 風險、回報，以及能不能延續。',
  skipToContent: '跳至主要內容',

  nav: { situations: '情境', characters: '角色', glossary: '術語', quickRef: '速查' },
  search: { placeholder: '搜尋情境、選項、術語…', label: '搜尋' },

  side: { label: '視角', defense: '我在防守', offense: '我在進攻' },
  sideHint: {
    defense: '我被壓制 —— 我有哪些選擇，各自賠多少',
    offense: '我打倒了對手 —— 依位置與倒地類型我能做什麼',
  },

  theme: {
    label: '主題',
    system: '跟隨系統',
    light: '淺色',
    dark: '深色',
    clickToSwitch: '點擊切換為',
  },
  localeLabel: '語言',
  refraction: {
    label: '玻璃折射',
    on: '開啟',
    off: '關閉',
    unsupported: '此瀏覽器不支援（僅 Chromium）',
  },

  table: {
    option: '選項',
    cost: '消耗',
    risk: '風險',
    reward: '回報',
    followUp: '成功後',
    hpLoss: '失敗扣血',
    difficulty: '難度 /5',
    mix: '建議比例',
    expandAll: '全部展開',
    collapseAll: '全部收合',
    detailHint: '點任一列看完整說明',
    sortDefault: '建議順序',
    sortAsc: '由低到高',
    sortDesc: '由高到低',
  },
  followUpShort: { combo: '連段', pressure: '續攻', neutral: '中立', none: '讓出' },
  situation: { showFull: '完整說明', hideFull: '收起說明' },
  browse: {
    groups: '情境群組',
    situations: '情境',
    notWritten: '尚未撰寫',
    coverage: '已完成',
  },

  risk: { label: '風險', safe: '安全', low: '低', medium: '中', high: '高', extreme: '極高' },
  reward: { label: '回報', none: '無', low: '低', medium: '中', high: '高', extreme: '極高' },
  verified: {
    estimated: '概念判斷',
    sourced: '已查證',
    estimatedHint: '定性判斷，未逐項查證 frame data 或精確傷害。用來理解決策方向，不要當精確數據引用。',
    sourcedHint: '已對照外部資料來源並標註遊戲版本。',
  },

  option: {
    input: '指令',
    cost: '消耗',
    driveBars: 'Drive 格',
    onSuccess: '成功',
    onFail: '失敗',
    followUp: '後續',
    hpLoss: '失敗扣血',
    counteredBy: '被什麼打敗',
    difficulty: '操作難度',
    mixRatio: '建議比例',
    noCost: '無消耗',
  },
  followUp: {
    combo: '可接連段',
    pressure: '保住主導權',
    neutral: '回到中立',
    none: '逃掉但讓出主導權',
  },
  position: { midscreen: '場中', nearCorner: '靠角', cornered: '完全角落' },

  roadmap: { heading: '建置進度', done: '完成', inProgress: '進行中', planned: '待做' },
  footer: {
    disclaimer: '非官方同人攻略，與 CAPCOM 無關聯，也未經其授權或背書。',
    trademark: 'Street Fighter 6 © CAPCOM。商標與著作權歸原權利人所有。',
    source: '原始碼',
    policy: 'Capcom Video Policy',
  },
}

const en: UiStrings = {
  appName: 'SF6 Situations',
  tagline: 'Every situation, every option — risk, reward, and whether your turn continues.',
  skipToContent: 'Skip to main content',

  nav: { situations: 'Situations', characters: 'Characters', glossary: 'Glossary', quickRef: 'Quick ref' },
  search: { placeholder: 'Search situations, options, terms…', label: 'Search' },

  side: { label: 'View', defense: "I'm defending", offense: "I'm attacking" },
  sideHint: {
    defense: 'Under pressure — what I can do, and what each one costs',
    offense: 'I knocked them down — what I get, by position and knockdown type',
  },

  theme: {
    label: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    clickToSwitch: 'Click to switch to',
  },
  localeLabel: 'Language',
  refraction: {
    label: 'Glass refraction',
    on: 'On',
    off: 'Off',
    unsupported: 'Not supported in this browser (Chromium only)',
  },

  table: {
    option: 'Option',
    cost: 'Cost',
    risk: 'Risk',
    reward: 'Reward',
    followUp: 'If it works',
    hpLoss: 'Health cost',
    difficulty: 'Exec /5',
    mix: 'Suggested mix',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    detailHint: 'Select any row for the full read',
    sortDefault: 'Suggested order',
    sortAsc: 'Low to high',
    sortDesc: 'High to low',
  },
  followUpShort: { combo: 'Combo', pressure: 'Keep turn', neutral: 'Neutral', none: 'Give turn' },
  situation: { showFull: 'Full read', hideFull: 'Hide' },
  browse: {
    groups: 'Groups',
    situations: 'Situations',
    notWritten: 'Not written yet',
    coverage: 'Written',
  },

  risk: { label: 'Risk', safe: 'Safe', low: 'Low', medium: 'Medium', high: 'High', extreme: 'Extreme' },
  reward: { label: 'Reward', none: 'None', low: 'Low', medium: 'Medium', high: 'High', extreme: 'Extreme' },
  verified: {
    estimated: 'Estimated',
    sourced: 'Sourced',
    estimatedHint:
      'A qualitative read, not verified against frame data or exact damage. Use it to understand the decision, not to quote numbers.',
    sourcedHint: 'Checked against an external source and tagged with the game version.',
  },

  option: {
    input: 'Input',
    cost: 'Cost',
    driveBars: 'Drive bars',
    onSuccess: 'If it works',
    onFail: 'If it fails',
    followUp: 'Follow-up',
    hpLoss: 'Health cost on failure',
    counteredBy: 'Beaten by',
    difficulty: 'Execution',
    mixRatio: 'Suggested mix',
    noCost: 'Free',
  },
  followUp: {
    combo: 'Full combo',
    pressure: 'Your turn continues',
    neutral: 'Back to neutral',
    none: 'Escapes, but hands over the turn',
  },
  position: { midscreen: 'Midscreen', nearCorner: 'Near corner', cornered: 'Cornered' },

  roadmap: { heading: 'Build progress', done: 'Done', inProgress: 'In progress', planned: 'Planned' },
  footer: {
    disclaimer: 'Unofficial fan-made guide. Not affiliated with, authorised by, or endorsed by CAPCOM.',
    trademark: 'Street Fighter 6 © CAPCOM. Trademarks and copyrights belong to their respective owners.',
    source: 'Source',
    policy: 'Capcom Video Policy',
  },
}

const ja: UiStrings = {
  appName: 'SF6 状況別対策',
  tagline: 'あらゆる状況、あらゆる選択肢 —— リスク、リターン、そして継続できるか。',
  skipToContent: 'メインコンテンツへ',

  nav: { situations: '状況', characters: 'キャラ', glossary: '用語', quickRef: '早見表' },
  search: { placeholder: '状況・選択肢・用語を検索…', label: '検索' },

  side: { label: '視点', defense: '守り側', offense: '攻め側' },
  sideHint: {
    defense: '攻められている —— 選択肢と、それぞれの代償',
    offense: 'ダウンを取った —— 位置とダウン種別ごとにできること',
  },

  theme: {
    label: 'テーマ',
    system: 'システム設定',
    light: 'ライト',
    dark: 'ダーク',
    clickToSwitch: 'クリックで切替:',
  },
  localeLabel: '言語',
  refraction: {
    label: 'ガラス屈折',
    on: 'オン',
    off: 'オフ',
    unsupported: 'このブラウザでは非対応（Chromium のみ）',
  },

  table: {
    option: '選択肢',
    cost: '消費',
    risk: 'リスク',
    reward: 'リターン',
    followUp: '成功時',
    hpLoss: '被ダメージ',
    difficulty: '難易度 /5',
    mix: '推奨割合',
    expandAll: 'すべて展開',
    collapseAll: 'すべて折りたたむ',
    detailHint: '行を選ぶと詳細が開きます',
    sortDefault: '推奨順',
    sortAsc: '低い順',
    sortDesc: '高い順',
  },
  followUpShort: { combo: 'コンボ', pressure: '継続', neutral: '五分', none: '明け渡す' },
  situation: { showFull: '詳細を読む', hideFull: '閉じる' },
  browse: {
    groups: 'グループ',
    situations: '状況',
    notWritten: '未執筆',
    coverage: '執筆済み',
  },

  risk: { label: 'リスク', safe: '安全', low: '低', medium: '中', high: '高', extreme: '極大' },
  reward: { label: 'リターン', none: 'なし', low: '低', medium: '中', high: '高', extreme: '極大' },
  verified: {
    estimated: '定性判断',
    sourced: '出典あり',
    estimatedHint:
      'フレームデータや正確なダメージ値は未検証の定性的な判断です。判断の方向性を掴む用途で、数値として引用しないでください。',
    sourcedHint: '外部の出典と照合し、ゲームバージョンを明記しています。',
  },

  option: {
    input: 'コマンド',
    cost: '消費',
    driveBars: 'ドライブゲージ',
    onSuccess: '成功時',
    onFail: '失敗時',
    followUp: '継続',
    hpLoss: '失敗時の被ダメージ',
    counteredBy: '負ける相手',
    difficulty: '難易度',
    mixRatio: '推奨割合',
    noCost: '消費なし',
  },
  followUp: {
    combo: 'コンボ可',
    pressure: '攻めを継続できる',
    neutral: 'ニュートラルに戻る',
    none: '逃げられるが攻めを渡す',
  },
  position: { midscreen: '画面中央', nearCorner: '画面端寄り', cornered: '画面端' },

  roadmap: { heading: '進捗', done: '完了', inProgress: '進行中', planned: '未着手' },
  footer: {
    disclaimer: '非公式のファン制作ガイドです。CAPCOM とは無関係で、許諾も承認も受けていません。',
    trademark: 'Street Fighter 6 © CAPCOM。商標および著作権は各権利者に帰属します。',
    source: 'ソースコード',
    policy: 'Capcom Video Policy',
  },
}

export const UI: Record<Locale, UiStrings> = { 'zh-Hant': zhHant, en, ja }
