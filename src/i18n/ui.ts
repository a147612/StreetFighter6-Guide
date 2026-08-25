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
  search: { placeholder: string; label: string; open: string; empty: string; hint: string; situations: string; cells: string }

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
  outcome: {
    header: string
    myAxis: string
    legend: string
    notApplicable: string
    bigWin: string
    win: string
    even: string
    loss: string
    bigLoss: string
  }
  category: {
    timing: string
    block: string
    tech: string
    drive: string
    movement: string
    contest: string
    strike: string
    throw: string
    bait: string
  }
  mix: { heading: string; note: string }
  scale: { heading: string; body: string; source: string }
  stage: { me: string; them: string; pointBlank: string; close: string; mid: string; long: string }
  glossary: { intro: string; origin: string; what: string; note: string; open: string }
  character: {
    label: string
    universal: string
    health: string
    reversals: string
    knockdowns: string
    noReversal: string
    coverage: string
    invincibility: string
    cost: string
  }
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
  search: {
    placeholder: '例如「角落 解摔」或「退康」',
    label: '搜尋',
    open: '搜尋',
    empty: '沒有符合的結果',
    hint: '可以同時輸入位置和選項，例如「角落 解摔」會直接跳到那一列',
    situations: '情境',
    cells: '情境中的選項',
  },

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
  outcome: {
    header: '對手的選擇',
    myAxis: '我的選擇',
    legend: '對上對手的選擇，你的結果',
    notApplicable: '不相關',
    bigWin: '大勝',
    win: '小勝',
    even: '平手',
    loss: '小虧',
    bigLoss: '大虧',
  },
  category: {
    timing: '起身時機',
    block: '防禦',
    tech: '解摔',
    drive: 'Drive 系統',
    movement: '位移逃脫',
    contest: '搶攻反擊',
    strike: '打擊',
    throw: '投擲',
    bait: '誘導',
  },
  character: {
    label: '角色',
    universal: '通用（不套用角色）',
    health: '血量',
    reversals: '無敵選項',
    knockdowns: '主要倒地招',
    noReversal: '沒有完全無敵的 OD 升龍類招式',
    coverage: '角色資料完整度',
    invincibility: '無敵',
    cost: '消耗',
  },
  glossary: {
    intro: '三種語言並排，方便對照日文或英文攻略裡的說法。括號裡是同義的別稱。',
    origin: '英文原詞',
    what: '是什麼',
    note: '這裡只收錄本指南實際用到的動作名稱，不是完整的格鬥遊戲術語表。',
    open: '術語表',
  },
  stage: { me: '我', them: '對手', pointBlank: '貼身', close: '近距離', mid: '中距離', long: '遠距離' },
  scale: {
    heading: '數值怎麼讀',
    body:
      '「失敗扣血」是**佔自己血條的百分比**，基準為 10,000 血。角色血量不同（Akuma 9,000、多數角色 10,000、E. Honda 與 Marisa 10,500、Zangief 11,000），所以同一招對不同角色的百分比會差一成左右。換算方式：傷害 ÷ 自己的血量。例如普通摔投 1,200 傷害，對 10,000 血的角色是 12%。\n區間代表的是「對手打出稱職的懲罰」，不是最佳化連段；對手拿到最大傷害時會超出上限。',
    source: '角色數值與 frame data 來源',
  },
  mix: {
    heading: '預設打法',
    note: '建議的混合比例。沒有固定比例的選項不列入。',
  },
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
  search: {
    placeholder: 'Try "corner tech" or "shimmy"',
    label: 'Search',
    open: 'Search',
    empty: 'Nothing matched',
    hint: 'Name a place and an option together — "corner tech" jumps straight to that row',
    situations: 'Situations',
    cells: 'Options in a situation',
  },

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
  outcome: {
    header: 'Their choice',
    myAxis: 'My choice',
    legend: 'Your result against their choice',
    notApplicable: 'Not relevant',
    bigWin: 'Big win',
    win: 'Win',
    even: 'Even',
    loss: 'Loss',
    bigLoss: 'Big loss',
  },
  category: {
    timing: 'Rise timing',
    block: 'Blocking',
    tech: 'Throw tech',
    drive: 'Drive system',
    movement: 'Movement',
    contest: 'Contest it',
    strike: 'Strikes',
    throw: 'Throws',
    bait: 'Baits',
  },
  character: {
    label: 'Character',
    universal: 'Universal (no overlay)',
    health: 'Health',
    reversals: 'Invincible options',
    knockdowns: 'Key knockdowns',
    noReversal: 'No fully invincible OD reversal',
    coverage: 'Character data',
    invincibility: 'Invincibility',
    cost: 'Cost',
  },
  glossary: {
    intro: 'All three languages side by side, so a Japanese or English guide maps onto what you read here. Aliases follow the main name.',
    origin: 'English term',
    what: 'What it is',
    note: 'Only the actions this guide actually uses — not a complete fighting-game glossary.',
    open: 'Glossary',
  },
  stage: { me: 'You', them: 'Them', pointBlank: 'point blank', close: 'close', mid: 'mid range', long: 'long range' },
  scale: {
    heading: 'How to read the numbers',
    body:
      '"Health cost" is a **percentage of your own bar**, based on 10,000 health. Characters differ (Akuma 9,000, most 10,000, E. Honda and Marisa 10,500, Zangief 11,000), so the same move is worth roughly ten percent more or less depending on who you are. To convert: damage ÷ your health. A normal throw does 1,200, which is 12% of a 10,000 bar.\nThe bands assume a competent punish, not an optimised one; a maximised combo goes past the top of the range.',
    source: 'Character stats and frame data source',
  },
  mix: {
    heading: 'Default mix',
    note: 'Suggested proportions. Options without a fixed share are left out.',
  },
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
  search: {
    placeholder: '例：「画面端 投げ抜け」「シミー」',
    label: '検索',
    open: '検索',
    empty: '一致する結果なし',
    hint: '位置と択を一緒に入力できる。「画面端 投げ抜け」でその行に直接移動する',
    situations: '状況',
    cells: '状況内の択',
  },

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
  outcome: {
    header: '相手の選択',
    myAxis: '自分の選択',
    legend: '相手の選択に対する自分の結果',
    notApplicable: '無関係',
    bigWin: '大勝ち',
    win: '勝ち',
    even: '五分',
    loss: '負け',
    bigLoss: '大負け',
  },
  category: {
    timing: '起き上がり',
    block: 'ガード',
    tech: '投げ抜け',
    drive: 'ドライブ',
    movement: '移動',
    contest: '割り込み',
    strike: '打撃',
    throw: '投げ',
    bait: '誘い',
  },
  character: {
    label: 'キャラ',
    universal: '汎用（キャラ未適用）',
    health: '体力',
    reversals: '無敵択',
    knockdowns: '主なダウン技',
    noReversal: '完全無敵のOD昇龍系を持たない',
    coverage: 'キャラデータ',
    invincibility: '無敵',
    cost: '消費',
  },
  glossary: {
    intro: '三言語を並べて表示する。日本語や英語の攻略で使われる呼び方との対応が取れる。括弧内は別称。',
    origin: '英語の原語',
    what: '内容',
    note: '本ガイドで実際に使う行動のみを収録しており、格闘ゲーム用語の網羅的な一覧ではない。',
    open: '用語集',
  },
  stage: { me: '自分', them: '相手', pointBlank: '密着', close: '近距離', mid: '中距離', long: '遠距離' },
  scale: {
    heading: '数値の読み方',
    body:
      '「被ダメージ」は**自分の体力に対する割合**で、体力10,000を基準としている。キャラごとに体力は異なり（豪鬼9,000、多くは10,000、E.本田とマリーザ10,500、ザンギエフ11,000）、同じ技でも割合は一割ほど変わる。換算はダメージ ÷ 自分の体力。通常投げは1,200なので体力10,000なら12%となる。\n区間は「相手が手堅い反撃を入れた場合」を想定しており、最適化されたコンボは上限を超える。',
    source: 'キャラ数値とフレームデータの出典',
  },
  mix: {
    heading: '基本の配分',
    note: '推奨する混ぜ方の目安。固定の割合がない択は除外している。',
  },
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
