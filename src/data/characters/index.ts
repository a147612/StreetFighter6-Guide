import type { CharacterOverlay } from '../schema'

/**
 * Character overlays.
 *
 * Mostly subtraction. The single most useful thing here is that four of these
 * eight have no fully invincible OD reversal at all — JP, Zangief, Ingrid and
 * Manon — so picking them takes that row off every table rather than leaving a
 * reader budgeting for a button they cannot press.
 *
 * Move properties are read from Ultimate Frame Data, linked per character. The
 * data is not copied here: only the few facts these tables need.
 */
export const CHARACTERS: CharacterOverlay[] = [
  {
    id: 'ken',
    name: {
      'zh-Hant': 'Ken',
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
          'zh-Hant': '僅對空無敵 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible only — loses to a properly timed meaty',
          ja: '対空無敵のみ。正確に重ねられた打撃には負ける',
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
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'cammy',
    name: {
      'zh-Hant': 'Cammy',
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
          'zh-Hant': '僅對空無敵 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible only — loses to a properly timed meaty',
          ja: '対空無敵のみ。正確に重ねられた打撃には負ける',
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
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'akuma',
    name: {
      'zh-Hant': 'Akuma',
      en: 'Akuma',
      ja: '豪鬼',
    },
    health: 9000,
    backdashFrames: 23,
    overrides: {
      'do-nothing': {
        risk: 'medium',
        notes: {
          'zh-Hant': 'Akuma 只有 9,000 血（多數角色 10,000）。表格裡所有「失敗扣血」的百分比對他都要再乘 1.11 —— 純防禦被磨死的速度比別人快一成。',
          en: 'Akuma has 9,000 health where most of the cast has 10,000. Every health-cost percentage in these tables is about 11% worse for him, so chipping and throw damage grind him down faster.',
          ja: '豪鬼の体力は9,000で、多くのキャラの10,000より低い。表中の被ダメージ割合は約11%重くなり、削りや投げで押し切られる速度も速い。',
        },
      },
    },
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
          'zh-Hant': '僅對空無敵 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible only — loses to a properly timed meaty',
          ja: '対空無敵のみ。正確に重ねられた打撃には負ける',
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
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'luke',
    name: {
      'zh-Hant': 'Luke',
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
          'zh-Hant': '僅對空無敵 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible only — loses to a properly timed meaty',
          ja: '対空無敵のみ。正確に重ねられた打撃には負ける',
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
      { move: 'Fatal Shot (OD Sand Blast followup)', type: 'hard', advantage: '+48' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/luke',
        patch: '2026-08 查閱',
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
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能靠無敵 SA —— 這代表沒有 SA 槽的時候，你的起身防禦完全沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup means spending Super gauge, so with no meter your wakeup defence has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するには無敵SAしかなく、SAゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
          'zh-Hant': '傳送本身 6-20 幀無敵，但不是起身反擊手段',
          en: 'The teleport is invincible on frames 6-20, but it is not a wakeup reversal',
          ja: 'テレポート自体は6-20F無敵だが、起き上がりの切り返し手段ではない',
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
      { move: 'Forward + Heavy Kick (Bylina)', type: 'hard', advantage: '+38' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/jp',
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'zangief',
    name: {
      'zh-Hant': 'Zangief',
      en: 'Zangief',
      ja: 'ザンギエフ',
    },
    health: 11000,
    backdashFrames: 25,
    removesOptions: ['reversal'],
    overrides: {
      'do-nothing': {
        notes: {
          'zh-Hant': 'Zangief 有 11,000 血（多數角色 10,000）。表格裡的「失敗扣血」百分比對他要乘 0.91 —— 他撐得住的猜錯次數比別人多一次。',
          en: 'Zangief has 11,000 health against the cast standard of 10,000, so every health-cost percentage here is about 9% lighter for him. He can afford one more wrong guess than most.',
          ja: 'ザンギエフの体力は11,000で標準の10,000より高い。表中の被ダメージ割合は約9%軽くなり、読み違いを一回多く許容できる。',
        },
      },
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能靠無敵 SA —— 這代表沒有 SA 槽的時候，你的起身防禦完全沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup means spending Super gauge, so with no meter your wakeup defence has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するには無敵SAしかなく、SAゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
          'zh-Hant': '僅投射物與對空無敵，不能當起身反擊',
          en: 'Projectile and anti-air invincible only; not a wakeup reversal',
          ja: '飛び道具・対空無敵のみで、起き上がりの切り返しにはならない',
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
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'ingrid',
    name: {
      'zh-Hant': 'Ingrid',
      en: 'Ingrid',
      ja: 'イングリッド',
    },
    health: 10000,
    backdashFrames: 23,
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能靠無敵 SA —— 這代表沒有 SA 槽的時候，你的起身防禦完全沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup means spending Super gauge, so with no meter your wakeup defence has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するには無敵SAしかなく、SAゲージがなければ「一手で覆す」択が存在しない。',
        },
      },
    },
    reversals: [
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
        input: '236 K',
        invincibility: {
          'zh-Hant': '僅對空無敵 —— 打不贏算好時間點的壓起身',
          en: 'Anti-air invincible only — loses to a properly timed meaty',
          ja: '対空無敵のみ。正確に重ねられた打撃には負ける',
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
          'zh-Hant': '完全沒有無敵',
          en: 'No invincibility at all',
          ja: '無敵は一切なし',
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
      { move: 'Back + MK, HP (Glowing Touch)', type: 'hard', advantage: '+44' },
      { move: 'Forward + Heavy Punch (Halo Flight)', type: 'hard', advantage: '+38' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/ingrid',
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
  {
    id: 'manon',
    name: {
      'zh-Hant': 'Manon',
      en: 'Manon',
      ja: 'マノン',
    },
    health: 10000,
    backdashFrames: 25,
    removesOptions: ['reversal'],
    overrides: {
      'super-reversal': {
        notes: {
          'zh-Hant': '這隻角色沒有完全無敵的 OD 升龍類招式。起身要打穿打擊和摔投，只能靠無敵 SA —— 這代表沒有 SA 槽的時候，你的起身防禦完全沒有「一次翻盤」的選項。',
          en: 'This character has no fully invincible OD reversal. Going through a strike and a throw on wakeup means spending Super gauge, so with no meter your wakeup defence has no reversal button at all.',
          ja: 'このキャラは完全無敵のOD昇龍系を持たない。起き上がりで打撃と投げを貫通するには無敵SAしかなく、SAゲージがなければ「一手で覆す」択が存在しない。',
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
      { move: 'Crouching Heavy Kick', type: 'hard', advantage: '+29' },
      { move: 'Manège Doré (command grab)', type: 'throw', advantage: '+19' },
    ],
    coverage: 'partial',
    sources: [
      {
        url: 'https://ultimateframedata.com/sf6/manon',
        patch: '2026-08 查閱',
        note: '無敵幀數、倒地有利格數與角色數值；來源未標註遊戲版本',
      },
    ],
  },
]

const BY_ID = new Map(CHARACTERS.map((c) => [c.id, c]))

export function getCharacter(id: string): CharacterOverlay | undefined {
  return BY_ID.get(id)
}
