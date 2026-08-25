import type { Situation } from '../schema'

/**
 * Group K — closing the gap, by distance.
 *
 * The mirror of group E, and the reason the planned "combo choices" group is
 * not here: during a combo the opponent has no options, and a matrix needs both
 * sides to be choosing. Approaching is a real read; a combo route is a lookup.
 *
 * Everything is `estimated`.
 */
export const GROUP_K: Situation[] = [
  {
    id: 'k1-from-long-range',
    side: 'offense',
    group: 'K',
    name: {
      'zh-Hant': '從遠距離接近',
      en: 'Closing from long range',
      ja: '遠距離から詰める',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'long',
    stance: 'neutral',
    opponentOptions: ['walk-back', 'poke', 'projectile', 'whiff-punish', 'anti-air', 'drive-parry'],
    evaluations: [
      {
        optionId: 'dash-in',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '用衝刺快速縮短距離，把對手推向他不想要的近身戰。',
            en: 'Dash to cut the distance and force him into the close range he did not want.',
            ja: 'ダッシュで距離を詰め、相手が望まない近距離戦を強要する。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '衝刺沒有無敵，被牽制招或對空抓到就是完整懲罰。',
            en: 'A dash has no invincibility: a poke or an anti-air catches it for a full punish.',
            ja: 'ダッシュに無敵はなく、牽制や対空に狩られてフルコンボを受ける。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '最便宜的接近手段，代價是最容易被牽制招擋下來。對手一直伸手的時候換確反比較划算。',
          en: 'The cheapest way in, and the easiest to stuff with a poke. If he keeps sticking a limb out, whiff punishing pays better.',
          ja: '最も安価な接近手段だが、牽制に最も潰されやすい。相手が手を出し続けるなら確反の方が割が良い。',
        },
      },
      {
        optionId: 'drive-rush-pressure',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '花一格穿過中距離，抵達時還帶著有利 —— 這是能直接把立回跳過去的手段。',
            en: 'Spend a bar to cross the gap and arrive still plus — the tool that skips neutral outright.',
            ja: '1ゲージ使って間合いを越え、有利な状態で到達する。立ち回りを飛ばせる手段。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '被對空或牽制招擋下來，一格就這樣沒了，而且你人還留在他面前。',
            en: 'Anti-aired or stuffed by a poke, the bar is gone and you are standing in front of him.',
            ja: '対空や牽制に止められればゲージを失い、しかも相手の目の前に残される。',
          },
          hpLoss: '30-45%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'walk-back', outcome: 'bigWin' },
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'even' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
      },
      {
        optionId: 'jump-in',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '跳過投射物直接接近。打中就是一整套，而且落地還有起攻。',
            en: 'Jump the projectile and close. Landing it is a full combo and oki afterwards.',
            ja: '飛び道具を越えて接近する。当たればフルコンボと起き攻めまで付く。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對空是確定命中，而且你在空中沒有任何選擇。',
            en: 'The anti-air is guaranteed and you have no options in the air.',
            ja: '対空は確定し、空中では何もできない。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手每對空成功一次，跳的價值就下降一階。看到他對空穩之後改用地面接近。',
          en: 'Every anti-air he lands drops the value of jumping a tier. Once he is anti-airing consistently, come in on the ground.',
          ja: '対空を通されるたびに跳ぶ価値は一段下がる。相手の対空が安定してきたら地上から入る。',
        },
      },
      {
        optionId: 'poke',
        risk: 'low',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '用長手招控制他的移動，逼他退或逼他跳。牽制不是為了傷害，是為了限制他的選項。',
            en: 'Control his movement with a long normal, forcing him back or into the air. A poke is not for damage, it is for taking his options away.',
            ja: '長い技で相手の動きを制限し、下がるか跳ぶかを強要する。牽制はダメージではなく択を削るためのもの。',
          },
          followUp: 'neutral',
          damageBand: '6-10%',
        },
        onFail: {
          text: {
            'zh-Hant': '被確反 —— 牽制招落空的收招是這個距離傷害最高的懲罰機會。',
            en: 'Whiff punished: a missed poke is the highest-damage punish opportunity at this range.',
            ja: '確反を受ける。空振りした牽制の硬直は、この間合いで最も火力の高い反撃機会になる。',
          },
          hpLoss: '15-25%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'even' },
          { vs: 'poke', outcome: 'even' },
          { vs: 'projectile', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'bigLoss' },
          { vs: 'drive-parry', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
      },
      {
        optionId: 'projectile',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '逼他做選擇：擋著讓你推進、跳過來吃對空、或花動力槽穿過來。',
            en: 'Force the choice: block it and let you advance, jump and eat an anti-air, or spend Drive to come through.',
            ja: '選択を強要する。ガードして前進を許すか、跳んで対空を受けるか、ドライブを払って抜けるか。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '他跳過來或用動力箭步穿過，投射物的收招被抓就是完整連段。',
            en: 'He jumps it or Drive Rushes through, and the recovery is a full combo.',
            ja: '跳ばれるかドライブラッシュで抜けられ、硬直をフルコンボで狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'anti-air', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'empty-jump',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過去不出招，落地摔或打下段。他的對空會落空，防禦也擋不住摔。',
            en: 'Jump without attacking and throw or go low on landing: his anti-air whiffs and blocking does not stop the throw.',
            ja: '技を出さずに跳び、着地から投げか下段。相手の対空は空振りし、ガードでは投げを防げない。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '他還是對空抓到你，或是落地被牽制招打斷。',
            en: 'He anti-airs you anyway, or a poke catches you on landing.',
            ja: '対空されるか、着地を牽制に潰される。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'anti-air', outcome: 'loss' },
          { vs: 'walk-back', outcome: 'loss' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },
  {
    id: 'k2-from-mid-range',
    side: 'offense',
    group: 'K',
    name: {
      'zh-Hant': '中距離進攻',
      en: 'Attacking at mid range',
      ja: '中距離で攻める',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'mid',
    stance: 'neutral',
    opponentOptions: ['walk-back', 'poke', 'projectile', 'whiff-punish', 'anti-air', 'drive-parry'],
    evaluations: [
      {
        optionId: 'dash-in',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '用衝刺快速縮短距離，把對手推向他不想要的近身戰。',
            en: 'Dash to cut the distance and force him into the close range he did not want.',
            ja: 'ダッシュで距離を詰め、相手が望まない近距離戦を強要する。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '衝刺沒有無敵，被牽制招或對空抓到就是完整懲罰。',
            en: 'A dash has no invincibility: a poke or an anti-air catches it for a full punish.',
            ja: 'ダッシュに無敵はなく、牽制や対空に狩られてフルコンボを受ける。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'projectile', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '最便宜的接近手段，代價是最容易被牽制招擋下來。對手一直伸手的時候換確反比較划算。',
          en: 'The cheapest way in, and the easiest to stuff with a poke. If he keeps sticking a limb out, whiff punishing pays better.',
          ja: '最も安価な接近手段だが、牽制に最も潰されやすい。相手が手を出し続けるなら確反の方が割が良い。',
        },
      },
      {
        optionId: 'drive-rush-pressure',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '花一格穿過中距離，抵達時還帶著有利 —— 這是能直接把立回跳過去的手段。',
            en: 'Spend a bar to cross the gap and arrive still plus — the tool that skips neutral outright.',
            ja: '1ゲージ使って間合いを越え、有利な状態で到達する。立ち回りを飛ばせる手段。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '被對空或牽制招擋下來，一格就這樣沒了，而且你人還留在他面前。',
            en: 'Anti-aired or stuffed by a poke, the bar is gone and you are standing in front of him.',
            ja: '対空や牽制に止められればゲージを失い、しかも相手の目の前に残される。',
          },
          hpLoss: '30-45%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'walk-back', outcome: 'bigWin' },
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'whiff-punish', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'jump-in',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '跳過投射物直接接近。打中就是一整套，而且落地還有起攻。',
            en: 'Jump the projectile and close. Landing it is a full combo and oki afterwards.',
            ja: '飛び道具を越えて接近する。当たればフルコンボと起き攻めまで付く。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對空是確定命中，而且你在空中沒有任何選擇。',
            en: 'The anti-air is guaranteed and you have no options in the air.',
            ja: '対空は確定し、空中では何もできない。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'projectile', outcome: 'bigWin' },
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手每對空成功一次，跳的價值就下降一階。看到他對空穩之後改用地面接近。',
          en: 'Every anti-air he lands drops the value of jumping a tier. Once he is anti-airing consistently, come in on the ground.',
          ja: '対空を通されるたびに跳ぶ価値は一段下がる。相手の対空が安定してきたら地上から入る。',
        },
      },
      {
        optionId: 'poke',
        risk: 'low',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '用長手招控制他的移動，逼他退或逼他跳。牽制不是為了傷害，是為了限制他的選項。',
            en: 'Control his movement with a long normal, forcing him back or into the air. A poke is not for damage, it is for taking his options away.',
            ja: '長い技で相手の動きを制限し、下がるか跳ぶかを強要する。牽制はダメージではなく択を削るためのもの。',
          },
          followUp: 'neutral',
          damageBand: '6-10%',
        },
        onFail: {
          text: {
            'zh-Hant': '被確反 —— 牽制招落空的收招是這個距離傷害最高的懲罰機會。',
            en: 'Whiff punished: a missed poke is the highest-damage punish opportunity at this range.',
            ja: '確反を受ける。空振りした牽制の硬直は、この間合いで最も火力の高い反撃機会になる。',
          },
          hpLoss: '15-25%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'even' },
          { vs: 'poke', outcome: 'even' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'bigLoss' },
          { vs: 'drive-parry', outcome: 'loss' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'projectile',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '逼他做選擇：擋著讓你推進、跳過來吃對空、或花動力槽穿過來。',
            en: 'Force the choice: block it and let you advance, jump and eat an anti-air, or spend Drive to come through.',
            ja: '選択を強要する。ガードして前進を許すか、跳んで対空を受けるか、ドライブを払って抜けるか。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '他跳過來或用動力箭步穿過，投射物的收招被抓就是完整連段。',
            en: 'He jumps it or Drive Rushes through, and the recovery is a full combo.',
            ja: '跳ばれるかドライブラッシュで抜けられ、硬直をフルコンボで狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'walk-back', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
          { vs: 'anti-air', outcome: 'even' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '中距離丟投射物風險高得多 —— 他要跑的距離短，跳過來直接接連段。',
          en: 'Far riskier at mid range: he has less ground to cover, so a jump converts straight into a combo.',
          ja: '中距離での飛び道具はリスクが高い。距離が短いぶん跳ばれればそのままコンボになる。',
        },
      },
      {
        optionId: 'empty-jump',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過去不出招，落地摔或打下段。他的對空會落空，防禦也擋不住摔。',
            en: 'Jump without attacking and throw or go low on landing: his anti-air whiffs and blocking does not stop the throw.',
            ja: '技を出さずに跳び、着地から投げか下段。相手の対空は空振りし、ガードでは投げを防げない。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '他還是對空抓到你，或是落地被牽制招打斷。',
            en: 'He anti-airs you anyway, or a poke catches you on landing.',
            ja: '対空されるか、着地を牽制に潰される。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'anti-air', outcome: 'loss' },
          { vs: 'walk-back', outcome: 'loss' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'projectile', outcome: 'win' },
          { vs: 'whiff-punish', outcome: 'even' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },
]
