import type { CharacterOverlay } from '../schema'

/**
 * Character overlays for the full roster.
 *
 * Mostly subtraction, and the headline number is why: 13 of the 31 characters
 * have no fully invincible OD reversal at all, so on wakeup they cannot go
 * through a strike and a throw without spending Super gauge. Picking one of
 * them removes that row from every table rather than leaving a reader
 * budgeting for a button they cannot press.
 *
 * Two traps the raw data catches that a summary would not: most LP/MP/HP DPs
 * are anti-air invincible only and lose to a meaty, and invincibility that
 * starts late (Kimberly's Hidden Variable, frames 19-26) is not a reversal
 * however fully invincible it eventually becomes.
 *
 * Names: the English name doubles as the zh-Hant label, because Traditional
 * Chinese naming for this cast is not settled and inventing one would be worse
 * than showing the name people actually type.
 *
 * Move properties are read from Ultimate Frame Data, linked per character. The
 * data is not copied here: only the few facts these tables need.
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Dragonlash Flame (SA1)',
        input: '214214 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike/throw invincible frames 1-10',
          ja: '1-10F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Spin Drive Smasher (SA1)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    health: 9000,
    backdashFrames: 23,
    reversals: [
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Vulcan Blast (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-6 幀',
          en: 'Strike/throw invincible frames 1-6',
          ja: '1-6F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Shinku Hadoken (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊無敵 1-6 幀（防不住摔投）',
          en: 'Strike invincible frames 1-6 (throws still get you)',
          ja: '1-6F打撃無敵（投げは通る）',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 25,
    reversals: [
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
        move: 'Kikosho (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-7 幀',
          en: 'Strike/throw invincible frames 1-7',
          ja: '1-7F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Sonic Hurricane (SA1)',
        input: '[4]64 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike/throw invincible frames 1-10',
          ja: '1-10F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Sakkai Fuhazan (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-8 幀',
          en: 'Strike/throw invincible frames 1-8',
          ja: '1-8F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Tiger Cannon (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-13 幀',
          en: 'Strike/throw invincible frames 1-13',
          ja: '1-13F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Buster Wolf (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-8 幀',
          en: 'Strike/throw invincible frames 1-8',
          ja: '1-8F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Psycho Uppercut (LP/MP)',
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
        move: 'Psycho Storm (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-? 幀',
          en: 'Strike/throw invincible frames 1-?',
          ja: '1-?F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
    backdashFrames: 23,
    reversals: [
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
    backdashFrames: 25,
    reversals: [
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
        move: 'Breakin\' (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Shout of Earth (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-9 幀',
          en: 'Strike/throw invincible frames 1-9',
          ja: '1-9F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 25,
    reversals: [
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
        move: 'Super Rashid Kick (SA1)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-15 幀',
          en: 'Strike/throw invincible frames 1-15',
          ja: '1-15F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
        move: 'Kagerou no Mai (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '僅對空無敵 1-8 幀 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible frames 1-8 — loses to a properly timed meaty',
          ja: '1-8F対空無敵のみ。正確に重ねられた打撃には負ける',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    reversals: [
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
      {
        move: 'Hiwa ng Kalangitan (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊無敵 1-9 幀（防不住摔投）',
          en: 'Strike invincible frames 1-9 (throws still get you)',
          ja: '1-9F打撃無敵（投げは通る）',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
      reversal: {
        notes: {
          'zh-Hant': 'JP 的起身反擊是當身（Amnesia）而不是無敵技。OD 版從第 1 幀就同時涵蓋打擊與摔投，而且 20 幀的窗口比一般無敵技的 10 幀寬得多 —— 對延遲打擊特別有效。',
          en: 'JP\'s wakeup answer is a counter, not an invincible reversal. The OD version covers strikes and throws from frame 1, and its 20-frame window is far wider than a typical reversal\'s 10 — which makes it unusually good against delayed attacks.',
          ja: 'JPの切り返しは無敵技ではなく当て身（Amnesia）。OD版は1F目から打撃と投げの両方をカバーし、20Fの受付は通常の無敵技の10Fよりはるかに広いため、遅らせ打撃に特に強い。',
        },
      },
    },
    reversals: [
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
        move: 'Chornobog (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike/throw invincible frames 1-10',
          ja: '1-10F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
        move: 'Aerial Russian Slam (SA1)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '完全無敵 1-17 幀',
          en: 'Fully invincible frames 1-17',
          ja: '1-17F完全無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    backdashFrames: 23,
    overrides: {
      reversal: {
        notes: {
          'zh-Hant': 'Ingrid 的起身反擊是吸收型當身（Sun Veil）而不是無敵技。只有 OD 版從第 1 幀起同時吃打擊與摔投；一般版第 6 幀才開始，而且不吃摔投。',
          en: 'Ingrid\'s wakeup answer is an absorbing counter, not an invincible reversal. Only the OD version covers strikes and throws from frame 1; the normal version starts on frame 6 and does not cover throws at all.',
          ja: 'イングリッドの切り返しは吸収型の当て身（Sun Veil）で無敵技ではない。1F目から打撃と投げの両方をカバーするのはOD版のみで、通常版は6F開始かつ投げには対応しない。',
        },
      },
    },
    reversals: [
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
        move: 'Shining Sun (SA1)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Arabesque (SA1)',
        input: '236236 K',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-13 幀',
          en: 'Strike/throw invincible frames 1-13',
          ja: '1-13F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Deadly Implication (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-12 幀',
          en: 'Strike/throw invincible frames 1-12',
          ja: '1-12F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Raging Spear (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
        move: 'Limit Decoupler (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
        move: 'Yoga Inferno (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '沒有無敵',
          en: 'No invincibility',
          ja: '無敵なし',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Show of Force (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-7 幀',
          en: 'Strike/throw invincible frames 1-7',
          ja: '1-7F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Bushin Beats (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-10 幀',
          en: 'Strike/throw invincible frames 1-10',
          ja: '1-10F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
        move: 'Breezing Hawk (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-14 幀',
          en: 'Strike/throw invincible frames 1-14',
          ja: '1-14F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
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
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Knee Press Nightmare (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '打擊／投擲無敵 1-11 幀',
          en: 'Strike/throw invincible frames 1-11',
          ja: '1-11F打撃・投げ無敵',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能花 SA 槽 —— 沒有 SA 的時候，你的起身防禦沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup costs Super gauge, so with no meter the wakeup has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するにはSAゲージが必要で、ゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
      {
        move: 'Javelin of Marisa (SA1)',
        input: '236236 P',
        invincibility: {
          'zh-Hant': '全身霸體兩下，2-23 幀。吃得下壓起身，但霸體防不住摔投',
          en: 'Two hits of full-body armor, frames 2-23. Eats a meaty, but armor does not stop a throw',
          ja: '全身アーマー2発、2-23F。重ねは受け止められるが、アーマーは投げを防げない',
        },
        cost: {
          'zh-Hant': 'SA1',
          en: 'SA1',
          ja: 'SA1',
        },
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
