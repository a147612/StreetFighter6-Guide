import type { Situation } from '../schema'

/**
 * Group D — burnt out, by position.
 *
 * What makes Burnout expensive is not the chip: it is that every Drive option
 * disappears at once. Parry, Impact, Reversal and Rush all leave the list, so
 * the rows here are what is left after removing an entire layer of defence.
 *
 * Everything is `estimated`.
 */
export const GROUP_D: Situation[] = [
  {
    id: 'd1-burnout-midscreen',
    side: 'defense',
    group: 'D',
    name: {
      'zh-Hant': 'Burnout・場中',
      en: 'Burnt out, midscreen',
      ja: 'バーンアウト・画面中央',
    },
    position: ['midscreen'],
    opponentOptions: ['meaty', 'blockstring', 'throw', 'low-overhead-mix', 'drive-impact', 'bait-block'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'medium',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '全部擋下來，等動力槽恢復。Burnout 的時候唯一的目標是活到恢復，不是贏這一回合。',
            en: 'Block everything and wait for the gauge to come back. While burnt out the only goal is surviving to recovery, not winning the exchange.',
            ja: '全てガードしてゲージの回復を待つ。バーンアウト中の目的は攻防に勝つことではなく回復まで生き延びること。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是被必殺技的削減血量打到見底 —— Burnout 期間削血可以直接把你打死。',
            en: 'Thrown, or chipped out: while burnt out, chip damage from specials can kill you outright.',
            ja: '投げられるか削り殺される。バーンアウト中は必殺技の削りで直接倒される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '40-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': 'Burnout 期間所有動力技能都不能用 —— 撥擋、衝擊、反攻、箭步全部消失。這才是 Burnout 真正的代價，不是那點血。',
          en: 'Every Drive move is gone during Burnout: parry, impact, reversal and rush all disappear. That, not the chip, is what Burnout actually costs.',
          ja: 'バーンアウト中はドライブ技が全て使えない。パリィ、インパクト、リバーサル、ラッシュが消える。削りではなくこれこそがバーンアウトの本当の代償。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先擋下，摔投還解得掉。少了動力技能之後，這是剩下最泛用的一手。',
            en: 'Strike blocked, throw still teched. With the Drive options gone this is the broadest thing left.',
            ja: '打撃はガードし投げには間に合う。ドライブ択を失った状態で最も汎用性が高い。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手延遲打擊抓到解摔輸入。Burnout 的防禦硬直更長，所以他的空隙比平常更好抓。',
            en: 'A delayed attack catches the tech input, and longer Burnout blockstun makes those windows easier for them to find.',
            ja: '遅らせ打撃に投げ抜けを狩られる。バーンアウト中はガード硬直が長く、相手は隙間を作りやすい。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投被解開，爭取到恢復動力槽的時間。',
            en: 'The throw breaks, buying time toward recovery.',
            ja: '投げを抜け、ゲージ回復までの時間を稼ぐ。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，解摔硬直被抓。Burnout 沒有動力技能可以救場，這一套會很痛。',
            en: 'They did not throw and the tech recovery is caught. With no Drive options to bail you out, the combo hurts.',
            ja: '投げられず投げ抜けの硬直を狩られる。ドライブ択で助けられないため被害が大きい。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手真的留了空隙時才有用。',
            en: 'Only useful if they genuinely left a gap.',
            ja: '相手が本当に隙間を作った場合にのみ機能する。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': 'Burnout 的防禦硬直更長，連防更密，你的輕攻擊幾乎不可能插得進去。',
            en: 'Longer Burnout blockstun closes the gaps: your light almost never fits.',
            ja: 'バーンアウト中はガード硬直が長く連係が密になり、弱攻撃はほぼ入らない。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigLoss' },
          { vs: 'blockstring', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': 'Burnout 的時候亂按是最快輸掉的方式。你少了一整層防禦工具，對手卻沒有。',
          en: 'Mashing while burnt out is the fastest way to lose. You are missing an entire layer of defence and they are not.',
          ja: 'バーンアウト中の暴れは最も早い負け方。こちらは防御の一層を失っており、相手は失っていない。',
        },
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '拉開距離，逼對手重新接近，多爭取一點恢復時間。',
            en: 'Buys distance and makes them re-approach, which is more recovery time.',
            ja: '距離を取って相手に近づき直させ、回復時間を稼ぐ。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '被看到就是確定懲罰，而且你沒有動力技能可以補救。',
            en: 'Seen, it is a guaranteed punish, and you have no Drive option to bail out with.',
            ja: '見られれば確定で狩られ、ドライブ択で挽回することもできない。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'loss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投。Burnout 的時候這是唯一還能一次翻轉局面的東西。',
            en: 'Goes through the strike and the throw. Burnt out, this is the only thing left that can flip the exchange in one action.',
            ja: '打撃も投げも貫通する。バーンアウト中に一手で状況を覆せる唯一の手段。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手防好等你。Burnout 加上一次 punish counter，通常就是這一局的結果。',
            en: 'They blocked and waited. Burnout plus one punish counter is usually the round.',
            ja: 'ガードして待たれる。バーンアウトとパニッシュカウンターが重なれば、それでラウンドが決まることが多い。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手知道你在 Burnout，所以他更會選擇防好等你。這一手的成功率比平常更低。',
          en: 'They know you are burnt out, which makes blocking and waiting their obvious pick. This connects less often than usual.',
          ja: 'バーンアウトは相手にも見えているため、ガードして待つのが自然な選択になる。通常より通りにくい。',
        },
      },
    ],
  },
  {
    id: 'd2-burnout-cornered',
    side: 'defense',
    group: 'D',
    name: {
      'zh-Hant': 'Burnout・角落',
      en: 'Burnt out, cornered',
      ja: 'バーンアウト・画面端',
    },
    position: ['cornered'],
    opponentOptions: ['meaty', 'blockstring', 'throw', 'low-overhead-mix', 'drive-impact', 'bait-block'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'medium',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '全部擋下來，等動力槽恢復。Burnout 的時候唯一的目標是活到恢復，不是贏這一回合。',
            en: 'Block everything and wait for the gauge to come back. While burnt out the only goal is surviving to recovery, not winning the exchange.',
            ja: '全てガードしてゲージの回復を待つ。バーンアウト中の目的は攻防に勝つことではなく回復まで生き延びること。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是被必殺技的削減血量打到見底 —— Burnout 期間削血可以直接把你打死。',
            en: 'Thrown, or chipped out: while burnt out, chip damage from specials can kill you outright.',
            ja: '投げられるか削り殺される。バーンアウト中は必殺技の削りで直接倒される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          {
            vs: 'drive-impact',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '角落 + Burnout + 對手的動力衝擊 = 撞牆確定，接完整連段。這是遊戲裡最貴的單一情境。',
              en: 'Cornered, burnt out, and their Drive Impact: a guaranteed wall splat into a full combo. The single most expensive spot in the game.',
              ja: '画面端かつバーンアウト状態で相手のドライブインパクト。壁やられが確定しフルコンボに繋がる。ゲーム中で最も代償の大きい状況。',
            },
          },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '40-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': 'Burnout 期間所有動力技能都不能用 —— 撥擋、衝擊、反攻、箭步全部消失。這才是 Burnout 真正的代價，不是那點血。',
          en: 'Every Drive move is gone during Burnout: parry, impact, reversal and rush all disappear. That, not the chip, is what Burnout actually costs.',
          ja: 'バーンアウト中はドライブ技が全て使えない。パリィ、インパクト、リバーサル、ラッシュが消える。削りではなくこれこそがバーンアウトの本当の代償。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先擋下，摔投還解得掉。少了動力技能之後，這是剩下最泛用的一手。',
            en: 'Strike blocked, throw still teched. With the Drive options gone this is the broadest thing left.',
            ja: '打撃はガードし投げには間に合う。ドライブ択を失った状態で最も汎用性が高い。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手延遲打擊抓到解摔輸入。Burnout 的防禦硬直更長，所以他的空隙比平常更好抓。',
            en: 'A delayed attack catches the tech input, and longer Burnout blockstun makes those windows easier for them to find.',
            ja: '遅らせ打撃に投げ抜けを狩られる。バーンアウト中はガード硬直が長く、相手は隙間を作りやすい。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投被解開，爭取到恢復動力槽的時間。',
            en: 'The throw breaks, buying time toward recovery.',
            ja: '投げを抜け、ゲージ回復までの時間を稼ぐ。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，解摔硬直被抓。Burnout 沒有動力技能可以救場，這一套會很痛。',
            en: 'They did not throw and the tech recovery is caught. With no Drive options to bail you out, the combo hurts.',
            ja: '投げられず投げ抜けの硬直を狩られる。ドライブ択で助けられないため被害が大きい。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手真的留了空隙時才有用。',
            en: 'Only useful if they genuinely left a gap.',
            ja: '相手が本当に隙間を作った場合にのみ機能する。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': 'Burnout 的防禦硬直更長，連防更密，你的輕攻擊幾乎不可能插得進去。',
            en: 'Longer Burnout blockstun closes the gaps: your light almost never fits.',
            ja: 'バーンアウト中はガード硬直が長く連係が密になり、弱攻撃はほぼ入らない。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigLoss' },
          { vs: 'blockstring', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': 'Burnout 的時候亂按是最快輸掉的方式。你少了一整層防禦工具，對手卻沒有。',
          en: 'Mashing while burnt out is the fastest way to lose. You are missing an entire layer of defence and they are not.',
          ja: 'バーンアウト中の暴れは最も早い負け方。こちらは防御の一層を失っており、相手は失っていない。',
        },
      },
      {
        optionId: 'jump-back',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '躲過摔投。角落沒有空間，但至少讓對手的壓持續落空一次。',
            en: 'Avoids the throw. There is no ground to gain in the corner, but it does make one timed attack whiff.',
            ja: '投げを避けられる。画面端では距離は稼げないが、重ねを一度空振りさせられる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '被看到就是確定懲罰，而且你沒有動力技能可以補救。',
            en: 'Seen, it is a guaranteed punish, and you have no Drive option to bail out with.',
            ja: '見られれば確定で狩られ、ドライブ択で挽回することもできない。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'bigLoss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投。Burnout 的時候這是唯一還能一次翻轉局面的東西。',
            en: 'Goes through the strike and the throw. Burnt out, this is the only thing left that can flip the exchange in one action.',
            ja: '打撃も投げも貫通する。バーンアウト中に一手で状況を覆せる唯一の手段。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手防好等你。Burnout 加上一次 punish counter，通常就是這一局的結果。',
            en: 'They blocked and waited. Burnout plus one punish counter is usually the round.',
            ja: 'ガードして待たれる。バーンアウトとパニッシュカウンターが重なれば、それでラウンドが決まることが多い。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手知道你在 Burnout，所以他更會選擇防好等你。這一手的成功率比平常更低。',
          en: 'They know you are burnt out, which makes blocking and waiting their obvious pick. This connects less often than usual.',
          ja: 'バーンアウトは相手にも見えているため、ガードして待つのが自然な選択になる。通常より通りにくい。',
        },
      },
      {
        optionId: 'super-reversal',
        risk: 'extreme',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '無敵 SA 是 Burnout 期間唯一不受影響的資源 —— SA 槽跟動力槽是分開的。',
            en: 'An invincible Super Art is the one resource Burnout does not touch: the Super gauge is separate from Drive.',
            ja: '無敵SAはバーンアウトの影響を受けない唯一の資源。SAゲージはドライブとは別枠である。',
          },
          followUp: 'neutral',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '一樣被防好等你，而且你把整條 SA 槽也賠進去了。',
            en: 'Blocked and waited on all the same, and now the whole Super gauge is gone too.',
            ja: '同様にガードして待たれ、SAゲージまで失う。',
          },
          hpLoss: '45-60%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '如果你有 SA 槽，這是 Burnout 角落最後的逃生口。沒有的話，就只能靠純防禦撐到恢復。',
          en: 'With Super gauge, this is the last exit from a cornered Burnout. Without it, blocking to recovery is the whole plan.',
          ja: 'SAゲージがあれば、画面端バーンアウトからの最後の脱出口。なければガードして回復を待つしかない。',
        },
      },
    ],
  },
]
