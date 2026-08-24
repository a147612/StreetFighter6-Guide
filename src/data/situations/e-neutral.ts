import type { Situation } from '../schema'

/**
 * Group E — neutral, by distance.
 *
 * Distance is the axis here in the same way position is in groups A and B: the
 * same tool is correct far out and reckless a step closer. A projectile is the
 * clearest case — a staple at range, and a liability at mid.
 *
 * Everything is `estimated`.
 */
export const GROUP_E: Situation[] = [
  {
    id: 'e1-long-range',
    side: 'defense',
    group: 'E',
    name: {
      'zh-Hant': '遠距離',
      en: 'Long range',
      ja: '遠距離',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['projectile', 'poke', 'dash-in', 'jump-in', 'whiff-punish'],
    evaluations: [
      {
        optionId: 'walk-back',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '讓對手的牽制招和前衝落空，然後他就得再進一次 —— 每一次接近都是一次他要冒的險。',
            en: 'Their pokes and dashes fall short, so they have to come in again. Every approach is a risk they take, not you.',
            ja: '相手の牽制やダッシュを空振りさせ、もう一度近づかせる。接近するたびにリスクを負うのは相手の側。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '一直後退會被推到角落，那是對手真正想要的東西。',
            en: 'Retreating forever walks you into the corner, which is what they actually wanted.',
            ja: '下がり続ければ画面端に追い込まれる。相手が本当に欲しかったのはそれ。',
          },
          hpLoss: '8-12%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'win' },
          { vs: 'dash-in', outcome: 'even' },
          { vs: 'whiff-punish', outcome: 'win' },
          { vs: 'projectile', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'loss' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '立回最基本也最有效的一手，但它有方向性 —— 你退掉的是自己的場地。',
          en: 'The most basic and most effective neutral tool, but it is directional: the ground you give up is your own.',
          ja: '立ち回りで最も基本かつ有効だが、方向性がある。譲っているのは自分の陣地である。',
        },
      },
      {
        optionId: 'projectile',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '逼對手做選擇：擋著讓你推進、跳過來吃對空、或是用動力箭步硬穿花掉資源。',
            en: 'Forces a choice: block it and let you advance, jump and eat an anti-air, or burn Drive to rush through.',
            ja: '相手に選択を強いる。ガードして前進を許すか、跳んで対空を受けるか、ドライブを使って強引に抜けるか。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手跳過來或用動力箭步穿過 —— 投射物的收招很長，被抓到就是完整連段。',
            en: 'They jump it or Drive Rush through. A projectile recovers slowly, so getting caught is a full combo.',
            ja: '跳ばれるかドライブラッシュで抜けられる。飛び道具は硬直が長く、狩られればフルコンボ。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'projectile', outcome: 'even' },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'dash-in', outcome: 'loss' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'whiff-punish',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '等對手的牽制招落空，趁收招打一整套。立回裡傷害最高的一手，而且不用冒險猜。',
            en: 'Wait for their poke to miss and take a full combo off the recovery — the highest damage in neutral, and it involves no guess.',
            ja: '牽制の空振りを待ち、硬直にフルコンボを入れる。立ち回りで最も火力が高く、しかも読み合いを必要としない。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '時機或距離看錯，你的招落空，換成對手確反你。',
            en: 'Misjudge the range or the timing and your own button whiffs, handing them the punish.',
            ja: '間合いかタイミングを誤れば自分の技が空振りし、逆に確反される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'bigWin' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
      {
        optionId: 'anti-air',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '對手跳過來就打下去。空中不能防禦，所以只要出得夠早就是確定的。',
            en: 'Knock them out of the air. They cannot block up there, so an early enough anti-air is guaranteed.',
            ja: '跳んできた相手を撃ち落とす。空中はガードできないため、早めに出せば確定する。',
          },
          followUp: 'combo',
          damageBand: '15-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '太晚出就變成對手的跳入攻擊先打到你，接完整連段。',
            en: 'Too late and their jump attack lands first, into a full combo.',
            ja: '遅れれば相手の飛び込みが先に当たり、フルコンボに繋がる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'even' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對空是立回裡回報最穩定的技能。對手每跳一次你就拿一次傷害，他就會停止跳。',
          en: 'Anti-airing is the most reliably rewarded skill in neutral. Take damage off every jump and the jumps stop.',
          ja: '対空は立ち回りで最も安定して見返りのある技術。跳ぶたびにダメージを取れば相手は跳ばなくなる。',
        },
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下牽制招或投射物並回動力槽，成功後可以接動力箭步直接推進。',
            en: 'Catches a poke or a projectile, returns Drive, and can flow straight into a Drive Rush advance.',
            ja: '牽制や飛び道具を受け止めてドライブを回復し、そのままドライブラッシュで前進できる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '撥擋防不住摔投，也擋不住對手直接衝進來近身。',
            en: 'Parry does not stop a throw, nor them simply dashing into your face.',
            ja: 'パリィは投げを防げず、単純に近づかれることも止められない。',
          },
          hpLoss: '15-25%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付投射物角色的核心工具 —— 撥擋一發等於把對手的牽制轉成你的推進資源。',
          en: 'The core tool against a zoner: one parry converts their keepaway into your advancing resource.',
          ja: '飛び道具キャラ対策の中核。パリィ一回で相手の牽制を自分の前進資源に変えられる。',
        },
      },
      {
        optionId: 'drive-rush-out',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '花三格強行拉近，直接把立回跳過去，進到你想要的貼身距離。',
            en: 'Spend three bars to close the gap outright, skipping neutral and arriving where you want to be.',
            ja: '3ゲージを使って一気に間合いを詰め、立ち回りを飛ばして望む距離に入る。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '被對空或牽制招擋下來，三格就這樣沒了，而且你還在對手面前。',
            en: 'Anti-aired or stuffed by a poke, and three bars are gone with you standing in front of them.',
            ja: '対空や牽制に止められれば3ゲージを失い、しかも相手の目の前に残される。',
          },
          hpLoss: '25-40%',
          driveLoss: 3,
        },
        versus: [
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '三格是全場最貴的一次消費。用來穿過投射物很划算，用來硬進中距離通常不划算。',
          en: 'Three bars is the most expensive purchase in the game. Worth it to cross a fireball, rarely worth it to force your way in at mid range.',
          ja: '3ゲージはゲーム中で最も高い買い物。飛び道具を越えるためなら見合うが、中距離を強引に詰めるためには割に合わないことが多い。',
        },
      },
      {
        optionId: 'jump-forward',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過投射物並接近。落地打中就是一整套。',
            en: 'Jumps the projectile and closes. Landing it clean is a full combo.',
            ja: '飛び道具を跳び越えて接近する。当たればフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手在等你跳。對空是確定命中，而且你在空中沒有任何選擇。',
            en: 'They were waiting for it. The anti-air is guaranteed and you have no options in the air.',
            ja: '跳ぶのを待たれていた。対空は確定し、空中では何もできない。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'projectile', outcome: 'win' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'dash-in', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
    ],
  },
  {
    id: 'e2-mid-range',
    side: 'defense',
    group: 'E',
    name: {
      'zh-Hant': '中距離',
      en: 'Mid range',
      ja: '中距離',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['projectile', 'poke', 'dash-in', 'jump-in', 'whiff-punish'],
    evaluations: [
      {
        optionId: 'walk-back',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '讓對手的牽制招和前衝落空，然後他就得再進一次 —— 每一次接近都是一次他要冒的險。',
            en: 'Their pokes and dashes fall short, so they have to come in again. Every approach is a risk they take, not you.',
            ja: '相手の牽制やダッシュを空振りさせ、もう一度近づかせる。接近するたびにリスクを負うのは相手の側。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '一直後退會被推到角落，那是對手真正想要的東西。',
            en: 'Retreating forever walks you into the corner, which is what they actually wanted.',
            ja: '下がり続ければ画面端に追い込まれる。相手が本当に欲しかったのはそれ。',
          },
          hpLoss: '8-12%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'win' },
          { vs: 'dash-in', outcome: 'even' },
          { vs: 'whiff-punish', outcome: 'win' },
          { vs: 'projectile', outcome: 'even' },
          { vs: 'jump-in', outcome: 'loss' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '立回最基本也最有效的一手，但它有方向性 —— 你退掉的是自己的場地。',
          en: 'The most basic and most effective neutral tool, but it is directional: the ground you give up is your own.',
          ja: '立ち回りで最も基本かつ有効だが、方向性がある。譲っているのは自分の陣地である。',
        },
      },
      {
        optionId: 'projectile',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '逼對手做選擇：擋著讓你推進、跳過來吃對空、或是用動力箭步硬穿花掉資源。',
            en: 'Forces a choice: block it and let you advance, jump and eat an anti-air, or burn Drive to rush through.',
            ja: '相手に選択を強いる。ガードして前進を許すか、跳んで対空を受けるか、ドライブを使って強引に抜けるか。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手跳過來或用動力箭步穿過 —— 投射物的收招很長，被抓到就是完整連段。',
            en: 'They jump it or Drive Rush through. A projectile recovers slowly, so getting caught is a full combo.',
            ja: '跳ばれるかドライブラッシュで抜けられる。飛び道具は硬直が長く、狩られればフルコンボ。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'projectile', outcome: 'even' },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'dash-in', outcome: 'bigLoss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '中距離丟投射物很危險 —— 對手的反應時間夠短，跳過來就直接接連段。這是遠距離的工具。',
          en: 'Throwing one at mid range is dangerous: they have little ground to cover, so a jump converts straight into a combo. This is a long-range tool.',
          ja: '中距離での飛び道具は危険。距離が短いぶん跳ばれればそのままコンボになる。これは遠距離用の道具である。',
        },
      },
      {
        optionId: 'whiff-punish',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '等對手的牽制招落空，趁收招打一整套。立回裡傷害最高的一手，而且不用冒險猜。',
            en: 'Wait for their poke to miss and take a full combo off the recovery — the highest damage in neutral, and it involves no guess.',
            ja: '牽制の空振りを待ち、硬直にフルコンボを入れる。立ち回りで最も火力が高く、しかも読み合いを必要としない。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '時機或距離看錯，你的招落空，換成對手確反你。',
            en: 'Misjudge the range or the timing and your own button whiffs, handing them the punish.',
            ja: '間合いかタイミングを誤れば自分の技が空振りし、逆に確反される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'bigWin' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
      },
      {
        optionId: 'anti-air',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '對手跳過來就打下去。空中不能防禦，所以只要出得夠早就是確定的。',
            en: 'Knock them out of the air. They cannot block up there, so an early enough anti-air is guaranteed.',
            ja: '跳んできた相手を撃ち落とす。空中はガードできないため、早めに出せば確定する。',
          },
          followUp: 'combo',
          damageBand: '15-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '太晚出就變成對手的跳入攻擊先打到你，接完整連段。',
            en: 'Too late and their jump attack lands first, into a full combo.',
            ja: '遅れれば相手の飛び込みが先に当たり、フルコンボに繋がる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'even' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對空是立回裡回報最穩定的技能。對手每跳一次你就拿一次傷害，他就會停止跳。',
          en: 'Anti-airing is the most reliably rewarded skill in neutral. Take damage off every jump and the jumps stop.',
          ja: '対空は立ち回りで最も安定して見返りのある技術。跳ぶたびにダメージを取れば相手は跳ばなくなる。',
        },
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下牽制招或投射物並回動力槽，成功後可以接動力箭步直接推進。',
            en: 'Catches a poke or a projectile, returns Drive, and can flow straight into a Drive Rush advance.',
            ja: '牽制や飛び道具を受け止めてドライブを回復し、そのままドライブラッシュで前進できる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '撥擋防不住摔投，也擋不住對手直接衝進來近身。',
            en: 'Parry does not stop a throw, nor them simply dashing into your face.',
            ja: 'パリィは投げを防げず、単純に近づかれることも止められない。',
          },
          hpLoss: '15-25%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付投射物角色的核心工具 —— 撥擋一發等於把對手的牽制轉成你的推進資源。',
          en: 'The core tool against a zoner: one parry converts their keepaway into your advancing resource.',
          ja: '飛び道具キャラ対策の中核。パリィ一回で相手の牽制を自分の前進資源に変えられる。',
        },
      },
      {
        optionId: 'drive-rush-out',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '花三格強行拉近，直接把立回跳過去，進到你想要的貼身距離。',
            en: 'Spend three bars to close the gap outright, skipping neutral and arriving where you want to be.',
            ja: '3ゲージを使って一気に間合いを詰め、立ち回りを飛ばして望む距離に入る。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '被對空或牽制招擋下來，三格就這樣沒了，而且你還在對手面前。',
            en: 'Anti-aired or stuffed by a poke, and three bars are gone with you standing in front of them.',
            ja: '対空や牽制に止められれば3ゲージを失い、しかも相手の目の前に残される。',
          },
          hpLoss: '25-40%',
          driveLoss: 3,
        },
        versus: [
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'jump-in', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '三格是全場最貴的一次消費。用來穿過投射物很划算，用來硬進中距離通常不划算。',
          en: 'Three bars is the most expensive purchase in the game. Worth it to cross a fireball, rarely worth it to force your way in at mid range.',
          ja: '3ゲージはゲーム中で最も高い買い物。飛び道具を越えるためなら見合うが、中距離を強引に詰めるためには割に合わないことが多い。',
        },
      },
      {
        optionId: 'jump-forward',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過投射物並接近。落地打中就是一整套。',
            en: 'Jumps the projectile and closes. Landing it clean is a full combo.',
            ja: '飛び道具を跳び越えて接近する。当たればフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手在等你跳。對空是確定命中，而且你在空中沒有任何選擇。',
            en: 'They were waiting for it. The anti-air is guaranteed and you have no options in the air.',
            ja: '跳ぶのを待たれていた。対空は確定し、空中では何もできない。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'projectile', outcome: 'win' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'dash-in', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
    ],
  },
]
