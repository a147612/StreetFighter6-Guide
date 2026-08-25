import type { CharacterOverlay } from '../schema'

/**
 * Character overlays for the full roster.
 *
 * Mostly subtraction, and the headline number is why: 11 of the 31 characters
 * have `reversal` removed — no OD move that covers a strike and a throw at
 * once, so on wakeup they cannot go through both without spending Super gauge
 * or two Drive bars on a Drive Reversal.
 *
 * Do not confuse that with "13 lack a fully invincible OD". Two of the thirteen,
 * JP and Ingrid, answer wakeup with a counter or an absorb instead — a different
 * mechanism doing the same job, which is why they keep the row and carry an
 * override explaining what they actually press. `npm run validate` prints the
 * 11, and this comment has to agree with it.
 */
export const CHARACTERS: CharacterOverlay[] = [
  {
    id: 'ken',
    name: {
      'zh-Hant': '肯',
      en: 'Ken',
      ja: 'ケン',
    },
    health: 10000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Dragonlash Flame (SA1)',
        input: '214 214 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike and throw invincible, frames 1-10',
          ja: '打撃／投げ無敵 1-10F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Shoryuken (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-10 幀',
          en: 'Fully invincible frames 1-10',
          ja: '1-10F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Shoryuken (LP/MP/HP)',
        input: '623 P',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Shinryu Reppa (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-18 幀',
          en: 'Fully invincible frames 1-18',
          ja: '1-18F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
      { move: 'Tatsumaki Senpu-kyaku (LK)', type: 'hard', advantage: '+46' },
      { move: 'Shoryuken (LP)', type: 'hard', advantage: '+33' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ken',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'cammy',
    name: {
      'zh-Hant': '嘉米',
      en: 'Cammy',
      ja: 'キャミィ',
    },
    health: 10000,
    overrides: {
      'command-grab': {
        input: '214 P > LP LK',
        note: {
          'zh-Hant': '嘉米的指令投是 Hooligan 中的 Fatal Leg Twister，而它**蹲防就會落空**。上面說的「解不掉，所以純防禦沒用」對她剛好是反的 —— 蹲著擋就解決了。',
          en: 'Cammy\'s is Fatal Leg Twister out of Hooligan, and it **whiffs on a crouching opponent**. The line above about blocking being useless because there is no tech is exactly inverted for her: crouch-blocking beats it outright.',
          ja: 'キャミィのコマンド投げはフーリガンからのフェイタルレッグツイスターで、**しゃがみには空振りする**。上の「抜けが無いのでガードは無意味」は彼女に限って逆で、しゃがみガードで完封できる。',
        },
      },
    },
    removesOptions: ['projectile'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Spin Drive Smasher (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Cannon Spike (OD)',
        input: '623 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Cannon Spike (LK/MK/HK)',
        input: '623 K',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Delta Red Assault (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-13 幀',
          en: 'Fully invincible frames 1-13',
          ja: '1-13F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Back + Heavy Kick', type: 'hard', advantage: '+54' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+38' },
      { move: 'Spiral Arrow (OD)', type: 'hard', advantage: '+47' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/cammy',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'akuma',
    name: {
      'zh-Hant': '豪鬼',
      en: 'Akuma',
      ja: '豪鬼',
    },
    latin: 'Gouki',
    health: 9000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Messatsu Gohado (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '只有打擊無敵 1-9 幀 —— 擋不掉摔投，起身用會被摔',
          en: 'Strike invincible only, frames 1-9 — it does not stop a throw, so a wakeup use loses to one',
          ja: '打撃無敵のみ 1-9F ——投げは止まらず、起き上がりで使うと投げに負ける',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Gou Shoryuken (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Gou Shoryuken (LP/MP/HP)',
        input: '623 P',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Empyrean\'s End (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Sip of Calamity (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
      { move: 'Tatsumaki Zanku-kyaku (MK)', type: 'hard', advantage: '+41' },
      { move: 'Gou Shoryuken (LP)', type: 'hard', advantage: '+38' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/akuma',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'luke',
    name: {
      'zh-Hant': '呂克',
      en: 'Luke',
      ja: 'ルーク',
    },
    health: 10000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Pale Rider (SA3)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-30 幀 —— 全角色最長的一段無敵，而且破霸體',
          en: 'Fully invincible, frames 1-30 — the longest stretch on the roster, and it breaks armour',
          ja: '完全無敵 1-30F ——ロスター最長の無敵、かつアーマーブレイク',
        },
        cost: { 'zh-Hant': 'SA3', en: 'SA3', ja: 'SA3' },
      },
      {
        move: 'Vulcan Blast (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-6 幀',
          en: 'Strike and throw invincible, frames 1-6',
          ja: '打撃／投げ無敵 1-6F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Rising Uppercut (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-10 幀',
          en: 'Fully invincible frames 1-10',
          ja: '1-10F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Rising Uppercut (LP/MP/HP)',
        input: '623 P',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Eraser (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
    ],
    knockdowns: [
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
      { move: 'Flash Knuckle (HP)', type: 'hard', advantage: '+42' },
      { move: 'Fatal Shot (OD followup)', type: 'hard', advantage: '+48' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/luke',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'ryu',
    name: {
      'zh-Hant': '隆',
      en: 'Ryu',
      ja: 'リュウ',
    },
    health: 10000,
    removesOptions: ['command-grab', 'super-reversal'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Shinku Hadoken (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '只有打擊無敵 1-6 幀 —— 擋不掉摔投，起身用會被摔',
          en: 'Strike invincible only, frames 1-6 — it does not stop a throw, so a wakeup use loses to one',
          ja: '打撃無敵のみ 1-6F ——投げは止まらず、起き上がりで使うと投げに負ける',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Shoryuken (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Shin Hashogeki (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '打擊無敵 1-11 幀（防不住摔投）',
          en: 'Strike invincible frames 1-11 (throws still get you)',
          ja: '1-11F打撃無敵（投げは通る）',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Shin Shoryuken (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊無敵 1-4 幀（防不住摔投）',
          en: 'Strike invincible frames 1-4 (throws still get you)',
          ja: '1-4F打撃無敵（投げは通る）',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'High Blade Kick (HK)', type: 'hard', advantage: '+44' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
      { move: 'High Blade Kick (MK)', type: 'hard', advantage: '+40' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ryu',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'chunli',
    name: {
      'zh-Hant': '春麗',
      en: 'Chun-Li',
      ja: '春麗',
    },
    health: 10000,
    overrides: {
      'anti-air': {
        input: '[2] 8 K',
      },
      'projectile': {
        input: '[4] 6 P',
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 25,
    reversals: [
      {
        move: 'Kikosho (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-7 幀',
          en: 'Strike and throw invincible, frames 1-7',
          ja: '打撃／投げ無敵 1-7F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Tensho Kicks (OD)',
        input: '22 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Hoyoku-sen (SA2)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-10 幀',
          en: 'Fully invincible frames 1-10',
          ja: '1-10F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Soten Ranka (SA3)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Spinning Bird Kick (OD)', type: 'hard', advantage: '+55' },
      { move: 'Hazanshu (OD)', type: 'hard', advantage: '+52' },
      { move: 'Hundred Lightning Kicks (HK)', type: 'hard', advantage: '+50' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/chunli',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'guile',
    name: {
      'zh-Hant': '凱爾',
      en: 'Guile',
      ja: 'ガイル',
    },
    health: 10000,
    overrides: {
      'anti-air': {
        input: '[2] 8 K',
      },
      'projectile': {
        input: '[4] 6 P',
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Sonic Hurricane (SA1)',
        input: '[4] 6 4 6 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀，但只有輕手和中手版本有',
          en: 'Strike and throw invincible, frames 1-10 — Light and Medium versions only',
          ja: '打撃／投げ無敵 1-10F、ただし弱・中版のみ',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Flash Kick (OD)',
        input: '[2]8 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Crossfire Somersault (SA3)',
        input: '[4]646 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-14 幀',
          en: 'Fully invincible frames 1-14',
          ja: '1-14F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Sonic Blade (OD)', type: 'hard', advantage: '+54' },
      { move: 'Sonic Hurricane (SA1)', type: 'hard', advantage: '+41' },
      { move: 'Flash Kick (MK)', type: 'hard', advantage: '+37' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/guile',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'juri',
    name: {
      'zh-Hant': '蛛俐',
      en: 'Juri',
      ja: 'ジュリ',
    },
    health: 10000,
    overrides: {
      'projectile': {
        note: {
          'zh-Hant': '蛛俐的風破腳按住不放會**存一層 Fuha（最多三層）**，放開才發射。所以她「發波」的時候常常不是在發波，是在存資源 —— 那三層會強化風破掌、暗剣殺、豪王殺。對手看到她起手要判斷：這一下是要打出來，還是她在補存量。',
          en: 'Holding the kick on Juri\'s Fuhajin **banks a Fuha stock, up to three**, and only releasing it fires. So when she appears to be throwing a fireball she is often banking resource instead — the stocks power up Saihasho, Ankensatsu and Go Ohsatsu. Reading her means deciding whether this one is coming out or whether she is topping up.',
          ja: 'ジュリの風波刃はキックを押し続けると**風破ストックが1つ溜まる（最大3）**、離して初めて発射される。飛び道具を撃っているように見えて資源を溜めていることが多く、そのストックは砕波掌・暗剣殺・豪王殺を強化する。読むべきは「今出るのか、溜めているだけか」。',
        },
        input: '214 K',
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Sakkai Fuhazan (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-8 幀',
          en: 'Strike and throw invincible, frames 1-8',
          ja: '打撃／投げ無敵 1-8F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Tensenrin (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Tensenrin (MP)',
        input: '623 MP',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-8 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-8 — loses to a properly timed meaty',
          ja: '1-8F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Kaisen Dankai Raku (SA3)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-13 幀',
          en: 'Fully invincible frames 1-13',
          ja: '1-13F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Fuhajin (HK)', type: 'hard', advantage: '+46' },
      { move: 'Fuhajin (OD)', type: 'hard', advantage: '+45' },
      { move: 'Saihasho (OD)', type: 'hard', advantage: '+39' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/juri',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'sagat',
    name: {
      'zh-Hant': '沙加特',
      en: 'Sagat',
      ja: 'サガット',
    },
    health: 10000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Tiger Cannon (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-13 幀',
          en: 'Strike and throw invincible, frames 1-13',
          ja: '打撃／投げ無敵 1-13F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Tiger Uppercut (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Savage Tiger (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-14 幀',
          en: 'Fully invincible frames 1-14',
          ja: '1-14F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Tiger Vanquisher (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-15 幀',
          en: 'Fully invincible frames 1-15',
          ja: '1-15F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'High Tiger Shot (OD)', type: 'hard', advantage: '+63' },
      { move: 'Low Tiger Shot (OD)', type: 'hard', advantage: '+52' },
      { move: 'Tiger Knee Crush (HK)', type: 'hard', advantage: '+41' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/sagat',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'terry',
    name: {
      'zh-Hant': '特瑞',
      en: 'Terry',
      ja: 'テリー',
    },
    health: 10000,
    overrides: {
      'projectile': {
        note: {
          'zh-Hant': '特瑞的 Round Wave **重手版是下段**（29 幀發生）—— 站著擋會中。輕手中手的 Power Wave 和 OD 版才是上段。所以他的波不只是逼你擋，是逼你猜要蹲哪一段。',
          en: 'Terry\'s Round Wave on **Heavy is a low** (29-frame startup) — standing block eats it. Light and Medium Power Wave and the OD version are high. So his fireball is not only asking you to block, it is asking you which way.',
          ja: 'テリーのラウンドウェイブは**強版が下段**（発生29F）で、立ちガードでは食らう。弱・中のパワーウェイブとOD版は中段（上段）。つまり彼の飛び道具は「ガードするか」ではなく「どちらでガードするか」を聞いてくる。',
        },
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Buster Wolf (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-8 幀',
          en: 'Strike and throw invincible, frames 1-8',
          ja: '打撃／投げ無敵 1-8F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Rising Tackle (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-10 幀',
          en: 'Fully invincible frames 1-10',
          ja: '1-10F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Power Geyser (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-17 幀',
          en: 'Fully invincible frames 1-17',
          ja: '1-17F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Rising Fang (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-16 幀',
          en: 'Fully invincible frames 1-16',
          ja: '1-16F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Burning Knuckle (OD)', type: 'hard', advantage: '+60' },
      { move: 'Crack Shoot (HK)', type: 'hard', advantage: '+43' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/terry',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'ed',
    name: {
      'zh-Hant': '艾德',
      en: 'Ed',
      ja: 'エド',
    },
    health: 10000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Psycho Storm (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-? 幀',
          en: 'Strike and throw invincible, frames 1-?',
          ja: '打撃／投げ無敵 1-?F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Psycho Uppercut (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Psycho Uppercut (LP/MP/HP)',
        input: '623 P',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-? 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-? — loses to a properly timed meaty',
          ja: '1-?F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Psycho Chamber (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-? 幀',
          en: 'Fully invincible frames 1-?',
          ja: '1-?F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Psycho Blitz (OD)', type: 'hard', advantage: '+42' },
      { move: 'Psycho Blitz (HP)', type: 'hard', advantage: '+40' },
      { move: 'Psycho Uppercut (MP)', type: 'hard', advantage: '+39' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ed',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'elena',
    name: {
      'zh-Hant': '艾蓮娜',
      en: 'Elena',
      ja: 'エレナ',
    },
    health: 10000,
    overrides: {
      'super-art': {
        note: {
          'zh-Hant': '艾蓮娜的 SA2（Revival Dance）命中後按住下可以**回復 1,600 血，而且連動力槽一起回**。這讓她在 Burnout 和低血量那兩個情境的算式跟別人不一樣 —— 別人花 SA 是買脫身或傷害，她花 SA 可以買回資源本身。',
          en: 'Elena\'s SA2 (Revival Dance) heals **1,600 and refills Drive** if you hold down on hit. That changes the arithmetic in Burnout and at low life for her alone: everyone else spends Super on an escape or on damage, she can spend it on getting the resources back.',
          ja: 'エレナのSA2（Revival Dance）はヒット後に下を押し続けると**1,600回復し、ドライブゲージも回復する**。バーンアウト時と低体力時の計算が彼女だけ変わる。他はSAを脱出かダメージに使うが、彼女は資源そのものを買い戻せる。',
        },
      },
    },
    removesOptions: ['command-grab', 'projectile'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Revival Dance (SA2)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant':
            '完全無敵 1-11 幀。艾蓮娜的 SA1 沒有無敵，所以要起身脫身就是這一招 —— 而且命中後按住下可以回復 1,600 血和動力槽，在 Burnout 或低血量的時候價值遠不只脫身',
          en: 'Fully invincible, frames 1-11. Elena\'s SA1 has none, so this is the wakeup escape — and holding down on hit heals 1,600 and refills Drive, which in Burnout or at low life is worth far more than the escape itself',
          ja: '完全無敵 1-11F。エレナのSA1に無敵は無いため脱出はこれになる。さらにヒット後に下を押し続けると1,600回復＋ドライブ回復があり、バーンアウト時や低体力時には脱出以上の価値がある',
        },
        cost: { 'zh-Hant': 'SA2', en: 'SA2', ja: 'SA2' },
      },
      {
        move: 'Meteor Volley (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '沒有無敵 —— 這一招不能拿來起身脫身',
          en: 'No invincibility — this is not a wakeup escape',
          ja: '無敵なし ——起き上がりの脱出には使えない',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Scratch Wheel (OD)',
        input: '623 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Scratch Wheel (LK/MK)',
        input: '623 K',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-9 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-9 — loses to a properly timed meaty',
          ja: '1-9F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Song of the Grasslands (SA3)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Spinning Scythe (MK)', type: 'hard', advantage: '+42' },
      { move: 'Scratch Wheel (LK)', type: 'hard', advantage: '+36' },
      { move: 'Slide (3HK)', type: 'hard', advantage: '+31' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/elena',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'deejay',
    name: {
      'zh-Hant': '迪·傑',
      en: 'Dee Jay',
      ja: 'ディージェイ',
    },
    health: 10000,
    overrides: {
      'anti-air': {
        input: '[2] 8 K',
      },
      'projectile': {
        input: '[4] 6 P',
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'The Greatest Sobat (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '沒有無敵 —— 這一招不能拿來起身脫身',
          en: 'No invincibility — this is not a wakeup escape',
          ja: '無敵なし ——起き上がりの脱出には使えない',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Jackknife Maximum (OD)',
        input: '[2]8 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Sunrise Festival (SA2)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-16 幀',
          en: 'Fully invincible frames 1-16',
          ja: '1-16F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Weekend Pleasure (SA3)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-13 幀',
          en: 'Fully invincible frames 1-13',
          ja: '1-13F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Machine Gun Upper (OD)', type: 'hard', advantage: '+52' },
      { move: 'Jus Cool > HK', type: 'hard', advantage: '+45' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+33' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/deejay',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'jamie',
    name: {
      'zh-Hant': '傑米',
      en: 'Jamie',
      ja: 'ジェイミー',
    },
    health: 10000,
    overrides: {
      'reset-neutral': {
        note: {
          'zh-Hant': '傑米退開的時候通常不是在重置 —— 是在喝酒。The Devil Inside（22+P）加一層酒，而**喝的整段過程他處於 counter hit 狀態**。酒層是永久的：0 層時他所有招式只有 90% 傷害，每一層加 5%，四層之後部分必殺技還會變招。所以「他退回中距離」對傑米要讀成「他正在把距離換成整局的傷害」—— 這是你唯一能免費打斷他的窗口。',
          en: 'When Jamie backs off he is usually not resetting — he is drinking. The Devil Inside (22+P) grants a Drink, and **he is in a counter-hit state for the whole animation**. Drinks are permanent: at zero his everything does 90% damage, each Drink adds 5%, and past four some specials change outright. So "they reset to neutral" reads differently for Jamie — he is converting distance into damage for the rest of the round, and this is the one window where interrupting him is free.',
          ja: 'ジェイミーが下がるのはリセットではなく酒を飲んでいることが多い。The Devil Inside（22+P）で酒が1杯増え、**その動作中ずっとカウンターヒット状態**になる。酒は永続で、0杯では全ての技が90%ダメージ、1杯ごとに5%上昇し、4杯を超えると一部必殺技が変化する。ジェイミーの「仕切り直し」は「距離をラウンド全体のダメージに変換している」と読むべきで、ここが唯一ノーリスクで割り込める窓になる。',
        },
      },
      'command-grab': {
        input: '41236 K',
      },
    },
    removesOptions: ['projectile'],
    backdashFrames: 25,
    reversals: [
      {
        move: "Breakin' (SA1)",
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Arrow Kick (OD)',
        input: '623 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Arrow Kick (LK/MK)',
        input: '623 K',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-11 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-11 — loses to a properly timed meaty',
          ja: '1-11F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Getsuga Saiho (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Getsuga Saiho (SA3)', type: 'hard', advantage: '+71' },
      { move: 'Down + KK', type: 'hard', advantage: '+53' },
      { move: 'Luminous Dive Kick', type: 'hard', advantage: '+43' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/jamie',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'blanka',
    name: {
      'zh-Hant': '布蘭卡',
      en: 'Blanka',
      ja: 'ブランカ',
    },
    health: 10000,
    overrides: {
      'anti-air': {
        input: '[2] 8 K',
      },
      'projectile': {
        note: {
          'zh-Hant': '布蘭卡的娃娃炸彈**丟出去不會自己爆** —— 它待在地上，要等布蘭卡用電系必殺去引爆。所以你看到他丟娃娃不是「他發了一發波」，是「場上多了一個他之後隨時能引的東西」，那個威脅是持續的。',
          en: 'Blanka\'s Blanka-chan Bomb **does not go off on its own** — it sits on the ground until he detonates it with a lightning special. Seeing him throw one is not a fireball going out, it is a thing appearing on the screen that he can set off later, and the threat persists.',
          ja: 'ブランカのブランカちゃん人形は**投げただけでは爆発しない**。地面に残り、電撃系の必殺技で起爆するまで待機する。人形を投げたのは「飛び道具を撃った」ではなく「後でいつでも起爆できる物が場に増えた」であり、その脅威は継続する。',
        },
        input: '22 P',
      },
      'command-grab': {
        input: '236 K',
        note: {
          'zh-Hant': '布蘭卡的 Wild Hunt 是 **32-45 幀**發生，慢到看得到。它不是壓制裡的一個混合選項，是一次「我賭你會一直擋」的大讀 —— 對他你有充裕的時間跳或按。',
          en: 'Blanka\'s Wild Hunt starts in **32-45 frames** — slow enough to see coming. It is not one option inside a mix, it is a single hard read that you will keep blocking, and you have plenty of time to jump or press.',
          ja: 'ブランカのワイルドハントは発生**32-45F**で、見えるほど遅い。攻めの中の一択ではなく「ガードし続けるだろう」という大きな読み一発であり、こちらには跳ぶなり押すなりの時間が十分ある。',
        },
      },
    },
    backdashFrames: 23,
    reversals: [
      {
        move: 'Shout of Earth (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-9 幀',
          en: 'Strike and throw invincible, frames 1-9',
          ja: '打撃／投げ無敵 1-9F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Coward Crouch',
        input: '2 PP',
        invincibility: {
          'zh-Hant': '第 9 幀起低姿態，可按住最多 148 幀 —— 鑽過中段用的，不是起身反擊',
          en: 'Low profile from frame 9, holdable up to 148 — a tool for ducking overheads, not a wakeup escape',
          ja: '9F目から低姿勢、最大148Fまで持続。中段をかいくぐる用途で、起き上がりの切り返しではない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Vertical Rolling Attack (OD)',
        input: '[2]8 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Ground Shave Cannonball (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Wild Hunt (OD)', type: 'hard', advantage: '+64' },
      { move: 'Rolling Attack (OD)', type: 'hard', advantage: '+57' },
      { move: 'Amazon River Run (3HP)', type: 'hard', advantage: '+29' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/blanka',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'rashid',
    name: {
      'zh-Hant': '拉希德',
      en: 'Rashid',
      ja: 'ラシード',
    },
    health: 10000,
    overrides: {
      'anti-air': {
        input: '236 P',
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 25,
    reversals: [
      {
        move: 'Super Rashid Kick (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-15 幀',
          en: 'Strike and throw invincible, frames 1-15',
          ja: '打撃／投げ無敵 1-15F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Spinning Mixer (OD)',
        input: '236 PP',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Spinning Mixer (MP)',
        input: '236 MP',
        invincibility: {
          'zh-Hant': '僅對空無敵 6-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 6-14 — loses to a properly timed meaty',
          ja: '6-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Altair (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-15 幀',
          en: 'Fully invincible frames 1-15',
          ja: '1-15F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Ysaar (SA2)', type: 'hard', advantage: '+104' },
      { move: 'Eagle Spike (MK)', type: 'hard', advantage: '+56' },
      { move: 'Eagle Spike (HK)', type: 'hard', advantage: '+52' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/rashid',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'mai',
    name: {
      'zh-Hant': '不知火舞',
      en: 'Mai',
      ja: '不知火舞',
    },
    health: 10000,
    overrides: {
      'projectile': {
        note: {
          'zh-Hant': '不知火舞的花蝶扇**不算飛道具** —— 它不會跟對方的波相消，而且可以被普通技打掉。上面那套「逼他擋、跳或花資源穿過」對她不成立：對手可以直接把扇子打下來。要當成真正的波用，得按住蓄力或用 OD 版。',
          en: 'Mai\'s Kachousen is **not technically a projectile** — it does not clash with an opposing fireball and a normal attack can swat it out of the air. The universal line about forcing them to block, jump or spend resources does not hold: they can simply hit it. The charged and OD versions are real projectiles.',
          ja: '不知火舞の花蝶扇は**飛び道具扱いではない** ——相手の弾と相殺せず、通常技で叩き落とせる。「ガードか跳ぶか資源を使うかを強要する」という前提は成立せず、相手は普通に撃ち落とせる。溜め版とOD版は通常の飛び道具として扱われる。',
        },
      },
    },
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Shiranui Ryuu: Enbu Ada Zakura (SA3)',
        input: '214 214 P',
        invincibility: {
          'zh-Hant': '只有打擊無敵 1-11 幀 —— 擋不掉摔投。舞的 SA1 只有對空無敵，所以她能拿來擋摔的只有完全無敵的 SA2',
          en: 'Strike invincible only, frames 1-11 — it does not stop a throw. Mai\'s SA1 is anti-air only, so the fully invincible SA2 is the only one of hers that covers a throw',
          ja: '打撃無敵のみ 1-11F ——投げは止まらない。舞のSA1は対空無敵のみのため、投げをカバーできるのは完全無敵のSA2だけ',
        },
        cost: { 'zh-Hant': 'SA3', en: 'SA3', ja: 'SA3' },
      },
      {
        move: 'Kagerou no Mai (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '只有對空無敵 1-8 幀 —— 起身時打擊和摔投都擋不掉',
          en: 'Anti-air invincible only, frames 1-8 — on wakeup it stops neither the strike nor the throw',
          ja: '対空無敵のみ 1-8F ——起き上がりでは打撃も投げも止まらない',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Hishou Ryuuenjin (OD)',
        input: '623 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Chou Hissatsu Shinobi Bachi (SA2)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
    ],
    knockdowns: [
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+38' },
      { move: 'Ryuuenbu (MP)', type: 'hard', advantage: '+35' },
      { move: 'Hishou Ryuuenjin (MK)', type: 'hard', advantage: '+31' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/mai',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'yasmine',
    name: {
      'zh-Hant': '亞思閔',
      en: 'Yasmine',
      ja: 'ヤスミン',
    },
    health: 10000,
    overrides: {
      'super-art': {
        note: {
          'zh-Hant': '亞思閔的 SA2（Nakatagong Lakas）**不是攻擊，是強化狀態** —— 全角色唯一的 install 型 SA。持續約 35 秒，但每用一次 Bayani 招式就扣掉約 10 秒，而且會開放 Linya ng Liwanag 這招。所以上面說的「確反、收尾、或無敵脫身」三種用途，她的 SA2 一種都不是。',
          en: 'Yasmine\'s SA2 (Nakatagong Lakas) **is not an attack, it is an install** — the only one on the roster. It grants Bayani mode for roughly 35 seconds, each Bayani move burning about ten of them, and it unlocks Linya ng Liwanag. So none of the three uses listed above — punish, finisher, invincible escape — describes it.',
          ja: 'ヤスミンのSA2（Nakatagong Lakas）は**攻撃ではなくインストール**で、ロスター唯一。Bayaniモードを約35秒付与し、Bayani技を使うたびに約10秒消費、さらにLinya ng Liwanagが解禁される。上に挙げた「確反・締め・無敵の脱出」のいずれにも当てはまらない。',
        },
      },
    },
    removesOptions: ['command-grab', 'projectile', 'super-reversal'],
    backdashFrames: 23,
    reversals: [
      {
        move: 'Hiwa ng Kalangitan (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '只有打擊無敵 1-9 幀 —— 擋不掉摔投，起身用會被摔',
          en: 'Strike invincible only, frames 1-9 — it does not stop a throw, so a wakeup use loses to one',
          ja: '打撃無敵のみ 1-9F ——投げは止まらず、起き上がりで使うと投げに負ける',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Lipad ng Agila (OD)',
        input: '623 KK',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Lipad ng Agila (LK)',
        input: '623 LK',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Pamumukadkad ng Sampaguita (SA3)', type: 'hard', advantage: '+42' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+40' },
      { move: 'Back + Heavy Kick', type: 'hard', advantage: '+31' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/yasmine',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'jp',
    name: {
      'zh-Hant': 'JP',
      en: 'JP',
      ja: 'JP',
    },
    health: 10000,
    backdashFrames: 23,
    overrides: {
      'command-grab': {
        input: '214 K',
      },
      'projectile': {
        note: {
          'zh-Hant': 'JP 的遠距離攻擊不是波。Torbalan（幽靈）**中腳版是中段、重腳版是下段**，而且是靠近你之後第 13 幀才出判定，還可以按住取消假動作。所以他的「發波」實際上是從全場外送過來的上下段猜謎，不是逼你擋的壓迫。',
          en: 'JP\'s ranged game is not a fireball. Torbalan\'s **Medium version is an overhead and the Heavy is a low**, the hitbox only activates on frame 13 once the ghost reaches you, and he can hold the button to feint. So what looks like a fireball row is really a high/low guess delivered from full screen.',
          ja: 'JPの遠距離攻撃は飛び道具ではない。トルバラン（幽霊）は**中版が中段、強版が下段**で、判定は幽霊が接近してから13F目に発生し、ボタン長押しでフェイントもできる。つまり「飛び道具」の行は実際には画面端から届く中下段の読み合いである。',
        },
      },
      reversal: {
        note: {
          'zh-Hant': 'JP 的起身反擊是當身（Amnesia）而不是無敵技。OD 版從第 1 幀就同時涵蓋打擊與摔投，而且 20 幀的窗口比一般無敵技的 10 幀寬得多 —— 對延遲打擊特別有效。',
          en: 'JP\'s wakeup answer is a counter, not an invincible reversal. The OD version covers strikes and throws from frame 1, and its 20-frame window is far wider than a typical reversal\'s 10 — which makes it unusually good against delayed attacks.',
          ja: 'JPの切り返しは無敵技ではなく当て身（Amnesia）。OD版は1F目から打撃と投げの両方をカバーし、20Fの受付は通常の無敵技の10Fよりはるかに広いため、遅らせ打撃に特に強い。',
        },
      },
    },
    reversals: [
      {
        move: 'Chornobog (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike and throw invincible, frames 1-10',
          ja: '打撃／投げ無敵 1-10F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Amnesia (OD)',
        input: '22 KK',
        invincibility: {
          'zh-Hant': '反擊打擊與摔投，1-20 幀 —— 窗口長達 20 幀，比無敵技更容易抓到延遲打擊。成功是 +131 的巨大回報',
          en: 'Counters strikes and throws, frames 1-20. A 20-frame window catches delayed attacks far more easily than a DP, and connecting is a huge +131',
          ja: '打撃と投げを1-20Fで返す。20Fの長い受付は遅らせ打撃も拾いやすく、成立時は+131と見返りが非常に大きい',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Amnesia',
        input: '22 K',
        invincibility: {
          'zh-Hant': '只反擊打擊，3-18 幀。防不住摔投，起身第 1-2 幀也沒有覆蓋',
          en: 'Counters strikes only, frames 3-18. Does not stop throws, and the first two frames of wakeup are uncovered',
          ja: '打撃のみを3-18Fで返す。投げは防げず、起き上がり最初の2Fも空く',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Interdiction (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-23 幀',
          en: 'Fully invincible frames 1-23',
          ja: '1-23F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Departure > Window',
        input: '傳送',
        invincibility: {
          'zh-Hant': '無敵從第 6 幀才開始 —— 不能當起身反擊',
          en: 'Invincibility only starts on frame 6 — not a wakeup reversal',
          ja: '無敵は6F目から。起き上がりの切り返しには使えない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Stribog (HP)', type: 'hard', advantage: '+86' },
      { move: 'Triglav (OD)', type: 'hard', advantage: '+53' },
      { move: 'Bylina (6HK)', type: 'hard', advantage: '+38' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/jp',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'zangief',
    name: {
      'zh-Hant': '桑吉爾夫',
      en: 'Zangief',
      ja: 'ザンギエフ',
    },
    health: 11000,
    backdashFrames: 25,
    removesOptions: ['projectile', 'reversal'],
    overrides: {
      'anti-air': {
        input: 'PP',
      },
      'command-grab': {
        input: '360 P',
        note: {
          'zh-Hant': '桑吉爾夫的螺旋打樁機**四種版本全部都是 5 幀發生** —— 跟普通摔一樣快，看到再反應是來不及的。所以上面說的「跳、後衝刺、無敵技都躲得掉」對他要改成「只有事先就決定好才躲得掉」。',
          en: 'Zangief\'s Screw Piledriver is **5 frames on all four versions** — as fast as a normal throw, which means it cannot be reacted to. The line above about jumping, backdashing or reversing out of it holds only if you decided to before he pressed.',
          ja: 'ザンギエフのスクリューパイルドライバーは**4バージョンすべて発生5F** ——通常投げと同速で、見てからでは間に合わない。上の「跳び・バックダッシュ・無敵技で逃げられる」は、押される前に決めていた場合に限る。',
        },
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Aerial Russian Slam (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-17 幀 —— 連飛道具都擋得掉，全場最好的 SA1',
          en: 'Fully invincible, frames 1-17 — projectiles included, the best SA1 on the roster',
          ja: '完全無敵 1-17F ——飛び道具も含む、ロスター最良のSA1',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Tundra Storm',
        input: '22 HK',
        invincibility: {
          'zh-Hant': '只反擊「站立踢擊」（含普通技、必殺技、動力衝擊）—— 範圍極窄，不能當通用起身反擊',
          en: 'Parries standing kick attacks only, including specials and Drive Impacts — far too narrow to be a general wakeup answer',
          ja: '立ちキック攻撃のみを返す（必殺技やDIも対象）。範囲が狭すぎて汎用の切り返しにはならない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Cyclone Lariat (SA2)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-18 幀',
          en: 'Fully invincible frames 1-18',
          ja: '1-18F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Bolshoi Storm Buster (SA3)',
        input: '720 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-7 幀',
          en: 'Fully invincible frames 1-7',
          ja: '1-7F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Double Lariat',
        input: 'PP',
        invincibility: {
          'zh-Hant': '僅投射物與對空無敵',
          en: 'Projectile and anti-air invincible only',
          ja: '飛び道具・対空無敵のみ',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+36' },
      { move: 'Screw Piledriver (LP)', type: 'hard', advantage: '+30' },
      { move: 'Double Lariat', type: 'hard', advantage: '+27' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/zangief',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'ingrid',
    name: {
      'zh-Hant': '英格麗特',
      en: 'Ingrid',
      ja: 'イングリッド',
    },
    health: 10000,
    removesOptions: ['command-grab'],
    backdashFrames: 23,
    overrides: {
      'anti-air': {
        input: '236 K',
      },
      reversal: {
        note: {
          'zh-Hant': 'Ingrid 的起身反擊是吸收型當身（Sun Veil）而不是無敵技。只有 OD 版從第 1 幀起同時吃打擊與摔投；一般版第 6 幀才開始，而且不吃摔投。',
          en: 'Ingrid\'s wakeup answer is an absorbing counter, not an invincible reversal. Only the OD version covers strikes and throws from frame 1; the normal version starts on frame 6 and does not cover throws at all.',
          ja: 'イングリッドの切り返しは吸収型の当て身（Sun Veil）で無敵技ではない。1F目から打撃と投げの両方をカバーするのはOD版のみで、通常版は6F開始かつ投げには対応しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Shining Sun (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Sun Veil (OD)',
        input: '22 KK',
        invincibility: {
          'zh-Hant': '吸收打擊、摔投與投射物，1-20 幀。吸到之後轉為攻擊，命中 +52',
          en: 'Absorbs strikes, throws and projectiles, frames 1-20, then transitions into an attack for +52 on hit',
          ja: '打撃・投げ・飛び道具を1-20Fで吸収し、そのまま攻撃に移行して命中時+52',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Sun Veil',
        input: '22 K',
        invincibility: {
          'zh-Hant': '只吸收打擊與投射物，6-20 幀。防不住摔投，而且第 1-5 幀沒有覆蓋 —— 對算好時間的壓起身來不及',
          en: 'Absorbs strikes and projectiles only, frames 6-20. No throw coverage, and frames 1-5 are uncovered, so a well-timed meaty lands first',
          ja: '打撃と飛び道具のみを6-20Fで吸収。投げは防げず1-5Fも空くため、重ねられた打撃には間に合わない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Sun Rise (LK)',
        input: '236 LK',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-14 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-14 — loses to a properly timed meaty',
          ja: '1-14F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Sun Rise (MK/HK/OD)',
        input: '236 K',
        invincibility: {
          'zh-Hant': '沒有無敵',
          en: 'No invincibility',
          ja: '無敵なし',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Sun Flare (MP/HP)', type: 'hard', advantage: '+47' },
      { move: 'Glowing Touch (4MK,HP)', type: 'hard', advantage: '+44' },
      { move: 'Halo Flight (6HP)', type: 'hard', advantage: '+38' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ingrid',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'manon',
    name: {
      'zh-Hant': '瑪濃',
      en: 'Manon',
      ja: 'マノン',
    },
    health: 10000,
    backdashFrames: 25,
    removesOptions: ['projectile', 'reversal'],
    overrides: {
      'anti-air': {
        input: '236 K',
      },
      'command-grab': {
        input: '41236 P',
        reward: 'extreme',
        note: {
          'zh-Hant':
            'Manège Doré 除了上面說的以外，還會疊一層獎章。獎章等級整局不會掉，會提高她所有摔投的傷害 —— 所以第一次抓到的價值遠不只那一次的傷害，而是把之後每一次摔都變重。這也是為什麼對上瑪濃，「被摔一次」的代價會隨著局勢一路上升。',
          en: 'Manège Doré does everything above and adds a Medal. Medal level does not drop for the rest of the round and raises the damage of every throw she has, so the first one landing is worth far more than its own damage — it makes every later throw heavier. It is also why the cost of being thrown by Manon climbs as the round goes on.',
          ja: 'マネージュ・ドレは上記に加えてメダルを1段階溜める。メダルはラウンド中下がらず、彼女のあらゆる投げのダメージを上げるため、最初の1回はその場のダメージ以上の価値を持つ ——以降の投げがすべて重くなる。マノン相手に「投げられる」代償が試合の進行とともに上がっていくのはこのため。',
        },
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Arabesque (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-13 幀',
          en: 'Strike and throw invincible, frames 1-13',
          ja: '打撃／投げ無敵 1-13F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Étoile (SA2)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-9 幀',
          en: 'Fully invincible frames 1-9',
          ja: '1-9F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Pas de Deux (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Rond-point',
        input: '236 K',
        invincibility: {
          'zh-Hant': '僅上半身對空無敵',
          en: 'Upper-body anti-air invincibility only',
          ja: '上半身の対空無敵のみ',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Rond-point (MK)', type: 'hard', advantage: '+34' },
      { move: 'Rond-point (LK)', type: 'hard', advantage: '+31' },
      { move: 'Manège Doré', type: 'throw', advantage: '+19' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/manon',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'aki',
    name: {
      'zh-Hant': 'A.K.I.',
      en: 'A.K.I.',
      ja: 'A.K.I.',
    },
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['reversal'],
    overrides: {
      'anti-air': {
        input: '236 HP',
      },
      'command-grab': {
        input: '2 PP > LP LK',
      },
      'projectile': {
        input: '214 P',
        note: {
          'zh-Hant': 'A.K.I. 的毒霧 **擋住也會中毒**（2026 年 8 月更新後）—— 唯一不會中毒的擋法是動力撥擋。上面說「擋著讓他推進」在她面前是錯的答案：擋等於吃毒。',
          en: 'A.K.I.\'s poison cloud **poisons on block** as of the August 2026 patch — the one way to take it without the poison is a Drive Parry. Just blocking and letting them walk in is the wrong answer against her: blocking is taking the poison.',
          ja: 'A.K.I.の毒は**ガードしても毒になる**（2026年8月アップデート以降）。毒を受けずに処理できるのはドライブパリィだけ。「ガードして詰めさせる」は彼女相手には誤答で、ガード＝被毒である。',
        },
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Deadly Implication (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-12 幀',
          en: 'Strike and throw invincible, frames 1-12',
          ja: '打撃／投げ無敵 1-12F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Claws of Ya Zi (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Nightshade Pulse (OD)', type: 'hard', advantage: '+45' },
      { move: 'Nightshade Chaser (OD)', type: 'hard', advantage: '+43' },
      { move: 'Venomous Fang', type: 'hard', advantage: '+20' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/aki',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'alex',
    name: {
      'zh-Hant': '艾力克斯',
      en: 'Alex',
      ja: 'アレックス',
    },
    health: 10500,
    backdashFrames: 23,
    removesOptions: ['projectile', 'reversal'],
    overrides: {
      'command-grab': {
        input: '41236 P',
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Raging Spear (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Sledgecross Hammer (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'The Final Prison (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Aerial Knee Smash (LK/MK)',
        input: '623 K',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-10 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-10 — loses to a properly timed meaty',
          ja: '1-10F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Flash Axe (MP)', type: 'hard', advantage: '+39' },
      { move: 'Sweep Combination', type: 'hard', advantage: '+33' },
      { move: 'Hyper Takedown', type: 'throw', advantage: '+32' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/alex',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'cviper',
    name: {
      'zh-Hant': '深紅毒蛇',
      en: 'C. Viper',
      ja: 'C.ヴァイパー',
    },
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['command-grab', 'reversal'],
    overrides: {
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Limit Decoupler (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Focus Force (OD)',
        input: '214 KK',
        invincibility: {
          'zh-Hant': '霸體 3-10 幀（按住可延長到 55 幀）。霸體不是無敵 —— 照樣被摔，也照樣扣血',
          en: 'Armor on frames 3-10, holdable to 55. Armor is not invincibility: throws still get you and the hit still hurts',
          ja: 'アーマー3-10F（押し続けで55Fまで）。アーマーは無敵ではなく投げは通り、ダメージも受ける',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Mission Complete (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-10 幀',
          en: 'Fully invincible frames 1-10',
          ja: '1-10F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Hard Luck Rejector (SA3)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-13 幀',
          en: 'Fully invincible frames 1-13',
          ja: '1-13F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Aerial Burning Kick', type: 'hard', advantage: '+39' },
      { move: 'Burning Kick (OD)', type: 'hard', advantage: '+38' },
      { move: 'Aerial Burning Kick (OD)', type: 'hard', advantage: '+36' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/cviper',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'dhalsim',
    name: {
      'zh-Hant': '達爾西姆',
      en: 'Dhalsim',
      ja: 'ダルシム',
    },
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['command-grab', 'reversal'],
    overrides: {
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Yoga Inferno (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '沒有無敵 —— 這一招不能拿來起身脫身',
          en: 'No invincibility — this is not a wakeup escape',
          ja: '無敵なし ——起き上がりの脱出には使えない',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Yoga Sunburst (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-6 幀',
          en: 'Fully invincible frames 1-6',
          ja: '1-6F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Merciless Yoga (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-14 幀',
          en: 'Fully invincible frames 1-14',
          ja: '1-14F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Yoga Teleport',
        input: '6/4 PPP',
        invincibility: {
          'zh-Hant': '位移用的傳送，沒有起身反擊用的無敵',
          en: 'A movement teleport, not a wakeup escape',
          ja: '移動用のテレポートで、起き上がりの切り返しにはならない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Yoga Flame (OD)', type: 'hard', advantage: '+51' },
      { move: 'Yoga Fire (OD)', type: 'hard', advantage: '+49' },
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+22' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/dhalsim',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'ehonda',
    name: {
      'zh-Hant': 'E.本田',
      en: 'E. Honda',
      ja: 'E.本田',
    },
    health: 10500,
    backdashFrames: 23,
    removesOptions: ['projectile', 'reversal'],
    overrides: {
      'anti-air': {
        input: '[2] 8 K',
      },
      'command-grab': {
        input: '41236 K',
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Sumo Smash (OD)',
        input: '[2] 8 PP',
        invincibility: {
          'zh-Hant':
            '只有摔投無敵，而且是第 5-13 幀才開始 —— 擋得掉摔，擋不掉壓起身。這就是為什麼本田算在「沒有 OD 起身反擊」那 11 隻裡：他有東西可以賭對手要摔，但沒有一手同時吃下打擊和摔投。',
          en: 'Throw invincible only, and not from frame 1 — frames 5-13. It beats a throw and loses to a meaty. That is why Honda counts among the eleven with no OD wakeup escape: he has something to bet on them throwing, but nothing that covers the strike and the throw at once.',
          ja: '投げ無敵のみ、しかも1F目からではなく5-13F。投げには勝つが重ねには負ける。本田が「OD切り返しを持たない」11キャラに数えられるのはこのためで、投げ読みの択はあっても打撃と投げを同時にカバーする一手が無い。',
        },
        cost: { 'zh-Hant': '2 格', en: '2 Drive bars', ja: '2ゲージ' },
      },
      {
        move: 'Show of Force (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-7 幀',
          en: 'Strike and throw invincible, frames 1-7',
          ja: '打撃／投げ無敵 1-7F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Ultimate Killer Head Ram (SA2)',
        input: '[4]646 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-18 幀',
          en: 'Fully invincible frames 1-18',
          ja: '1-18F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'The Final Bout (SA3)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Sumo Smash (OD)',
        input: '[2]8 PP',
        invincibility: {
          'zh-Hant': '僅投擲無敵 5-13 幀，防不住打擊',
          en: 'Throw invincible frames 5-13 only; strikes still hit',
          ja: '5-13F投げ無敵のみ。打撃は通る',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
    ],
    knockdowns: [
      { move: 'Triple Slap (OD)', type: 'hard', advantage: '+45' },
      { move: 'Triple Slap', type: 'hard', advantage: '+42' },
      { move: 'Sumo Headbutt (LP)', type: 'hard', advantage: '+40' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ehonda',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'kimberly',
    name: {
      'zh-Hant': '金伯莉',
      en: 'Kimberly',
      ja: 'キンバリー',
    },
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['reversal'],
    overrides: {
      'anti-air': {
        input: '214 K',
      },
      'projectile': {
        note: {
          'zh-Hant': '金伯莉的手裏劍炸彈是**放在地上的道具，不是波** —— 而且它是消耗品：噴漆罐最多三罐，用完要靠 22+P 補。它的價值不在傷害，在起攻：本站記錄她這一招的倒地有利是 +88，是她全部招式裡最高的。',
          en: 'Kimberly\'s Shuriken Bomb is **a can placed on the ground, not a fireball** — and it is a consumable: three Spray Can charges maximum, refilled with 22+P. Its value is not damage, it is oki. The knockdown advantage recorded for it here is +88, the largest in her whole set.',
          ja: 'キンバリーの手裏剣ボムは**地面に置く道具であって飛び道具ではない**。しかも消耗品で、スプレー缶は最大3個、22+Pで補充する。価値はダメージではなく起き攻めにあり、本サイトが記録している この技のダウン有利は+88で、彼女の全技中で最大。',
        },
        input: '22 P',
      },
      'command-grab': {
        input: '236 P',
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Bushin Beats (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike and throw invincible, frames 1-10',
          ja: '打撃／投げ無敵 1-10F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Bushin Ninjastar Cypher (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-11 幀',
          en: 'Fully invincible frames 1-11',
          ja: '1-11F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Hidden Variable',
        input: '214 P',
        invincibility: {
          'zh-Hant': '無敵從第 19 幀才開始 —— 不能當起身反擊',
          en: 'Invincibility only starts on frame 19 — not a wakeup reversal',
          ja: '無敵は19F目から。起き上がりの切り返しには使えない',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
      {
        move: 'Bushin Senpukyaku (LK)',
        input: '214 LK',
        invincibility: {
          'zh-Hant': '僅對空無敵 5-11 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 5-11 — loses to a properly timed meaty',
          ja: '5-11F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Shuriken Bomb', type: 'hard', advantage: '+88' },
      { move: 'Vagabond Edge (HP)', type: 'hard', advantage: '+56' },
      { move: 'Vagabond Edge (OD)', type: 'hard', advantage: '+56' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/kimberly',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'lily',
    name: {
      'zh-Hant': '莉莉',
      en: 'Lily',
      ja: 'リリー',
    },
    health: 10000,
    backdashFrames: 24,
    removesOptions: ['projectile', 'reversal'],
    overrides: {
      'command-grab': {
        input: '360 P',
        note: {
          'zh-Hant': '莉莉的墨西哥龍捲風也是 **5 幀**，而且**射程是資源**：Condor Wind 存量最多三層，存越多抓得越遠，OD 版射程最長。所以「距離短」對她是浮動的 —— 她剛充完風的那個距離，跟你記得的不一樣。',
          en: 'Lily\'s Mexican Typhoon is also **5 frames**, and its **range is a resource**: Condor Wind stores up to three stocks and each one extends the grab, with the OD version reaching furthest. So the short-range caveat floats for her — the distance right after she charges is not the distance you remember.',
          ja: 'リリーのメキシカンタイフーンも**発生5F**で、しかも**間合いが資源**：コンドルウィンドは最大3ストックまで溜まり、溜まっているほど遠くから掴める（OD版が最長）。「間合いが短い」は彼女に関しては可変で、風を溜めた直後の距離は記憶の距離とは違う。',
        },
      },
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Breezing Hawk (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-14 幀',
          en: 'Strike and throw invincible, frames 1-14',
          ja: '打撃／投げ無敵 1-14F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Tomahawk Buster (OD)',
        input: '623 PP',
        invincibility: {
          'zh-Hant': '對空與「摔投」無敵 1-10 幀 —— 打得贏摔投，但打不贏地面的壓起身',
          en: 'Anti-air and throw invincible frames 1-10 — it beats the throw but not a grounded meaty',
          ja: '対空と投げ無敵1-10F。投げには勝てるが地上の重ねには勝てない',
        },
        cost: {
          'zh-Hant': '2 格動力槽',
          en: '2 Drive bars',
          ja: 'ドライブ2ゲージ',
        },
      },
      {
        move: 'Thunderbird (SA2)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-12 幀',
          en: 'Fully invincible frames 1-12',
          ja: '1-12F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Raging Typhoon (SA3)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-8 幀',
          en: 'Fully invincible frames 1-8',
          ja: '1-8F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
      {
        move: 'Tomahawk Buster (LP)',
        input: '623 LP',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-10 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-10 — loses to a properly timed meaty',
          ja: '1-10F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': '無消耗',
          en: 'Free',
          ja: '消費なし',
        },
      },
    ],
    knockdowns: [
      { move: 'Condor Spire (OD)', type: 'hard', advantage: '+43' },
      { move: 'Thunderbird (SA2)', type: 'hard', advantage: '+42' },
      { move: 'Condor Dive (OD)', type: 'hard', advantage: '+40' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/lily',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'mbison',
    name: {
      'zh-Hant': '維加',
      en: 'M. Bison',
      ja: 'ベガ',
    },
    latin: 'Vega',
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['command-grab', 'reversal'],
    overrides: {
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Knee Press Nightmare (SA1)',
        input: '236 236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike and throw invincible, frames 1-11',
          ja: '打撃／投げ無敵 1-11F',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Psycho Punisher (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-26 幀',
          en: 'Fully invincible frames 1-26',
          ja: '1-26F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Unlimited Psycho Crusher (SA3)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-15 幀',
          en: 'Fully invincible frames 1-15',
          ja: '1-15F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Devil Reverse', type: 'hard', advantage: '+39' },
      { move: 'Psycho Crusher (OD)', type: 'hard', advantage: '+35' },
      { move: 'Devil Reverse (OD)', type: 'hard', advantage: '+35' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/mbison',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'marisa',
    name: {
      'zh-Hant': '瑪麗莎',
      en: 'Marisa',
      ja: 'マリーザ',
    },
    health: 10500,
    backdashFrames: 25,
    removesOptions: ['command-grab', 'projectile', 'reversal'],
    overrides: {
      'super-reversal': {
        note: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Javelin of Marisa (SA1)',
        input: '236 236 P',
        invincibility: {
          'zh-Hant': '沒有無敵 —— 這一招不能拿來起身脫身',
          en: 'No invincibility — this is not a wakeup escape',
          ja: '無敵なし ——起き上がりの脱出には使えない',
        },
        cost: { 'zh-Hant': 'SA1', en: 'SA1', ja: 'SA1' },
      },
      {
        move: 'Meteorite (SA2)',
        input: '214214 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-16 幀',
          en: 'Fully invincible frames 1-16',
          ja: '1-16F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA2',
          en: 'SA2',
          ja: 'SA2',
        },
      },
      {
        move: 'Goddess of the Hunt (SA3)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '完全無敵 1-19 幀',
          en: 'Fully invincible frames 1-19',
          ja: '1-19F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA3',
          en: 'SA3',
          ja: 'SA3',
        },
      },
    ],
    knockdowns: [
      { move: 'Phalanx (OD)', type: 'hard', advantage: '+70' },
      { move: 'Dimachaerus (OD)', type: 'hard', advantage: '+42' },
      { move: 'Phalanx (LP)', type: 'hard', advantage: '+42' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/marisa',
        patch: '2026-08',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
]

const BY_ID = new Map(CHARACTERS.map((c) => [c.id, c]))

export function getCharacter(id: string): CharacterOverlay | undefined {
  return BY_ID.get(id)
}
