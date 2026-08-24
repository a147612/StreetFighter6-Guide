import type { Situation } from '../schema'

/**
 * Group H — life thresholds.
 *
 * Nothing mechanical changes here; the arithmetic does. The same option keeps
 * the same risk and the same reward, but the value of variance flips with the
 * life bars: gambling is correct when losing slowly still loses, and wrong when
 * you have already won and only have to not give it back.
 *
 * Everything is `estimated`.
 */
export const GROUP_H: Situation[] = [
  {
    id: 'h1-i-am-low',
    side: 'defense',
    group: 'H',
    name: {
      'zh-Hant': '我剩一套的血',
      en: 'One combo kills me',
      ja: 'こちらがコンボ一発圏内',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['meaty', 'throw', 'blockstring', 'bait-block', 'drive-impact'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋住，什麼都不賭。血量落後的時候，低變異的選項價值是平常的好幾倍。',
            en: 'Block and gamble on nothing. Behind on life, low-variance options are worth several times their usual value.',
            ja: 'ガードして一切賭けない。体力で劣勢の時、低分散の択の価値は普段の数倍になる。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是被削減血量削死 —— 血量危險的時候，連削血都是致命的。',
            en: 'Thrown, or chipped out: at this life total even chip damage is lethal.',
            ja: '投げられるか削り殺される。この体力ではチップダメージすら致命傷になる。',
          },
          hpLoss: '12-18%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'even' },
        ],
        mixRatio: '45-60%',
        verified: 'estimated',
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '同時覆蓋打擊和摔投，是血量危險時最不會賠的猜法。',
            en: 'Covers the strike and the throw at once — the guess that loses least while your life is thin.',
            ja: '打撃と投げを同時にカバーする。体力が薄い時に最も損の少ない読み方。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手延遲打擊抓到解摔輸入。這個血量下，一次 counter hit 就結束了。',
            en: 'A delayed attack catches the tech. At this life total one counter hit ends it.',
            ja: '遅らせ打撃に投げ抜けを狩られる。この体力ではカウンターヒット一回で終わる。',
          },
          hpLoss: '100% (致命)',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'blockstring', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '低風險高回報：擋下打擊、回動力槽，完美撥擋還能直接反打。血量落後時最划算的一手。',
            en: 'Low risk, high payoff: absorb the strike, get Drive back, and a Perfect Parry converts. The best value on the list when behind.',
            ja: '低リスク高リターン。打撃を受け止めドライブを回復し、パーフェクトパリィなら反撃まで繋がる。劣勢時に最も割の良い択。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '撥擋防不住摔投，而且在撥擋的動作與收招中被摔是「懲罰反擊摔投」—— 不能解、傷害多七成、再扣一格動力槽，還是強制倒地。這比一般被摔貴得多。',
            en: 'Parry does not stop throws, and being thrown during the parry or its recovery is a Punish Counter throw: untechable, 70% extra damage, another bar of Drive gone, and a hard knockdown. Far more expensive than an ordinary throw.',
            ja: 'パリィは投げを防げず、パリィ中および硬直中に投げられるとパニッシュカウンター投げになる。抜けられず、ダメージ70%増、ドライブをさらに1本失い、ハードダウンまで付く。通常の投げよりはるかに高くつく。',
          },
          hpLoss: '18-25%',
          driveLoss: 2,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '這是唯一一個「失敗代價低、成功回報高」的選項。血量危險時，它應該是你的主力。',
          en: 'The only option whose downside is small and whose upside is large. Behind on life, this should be your staple.',
          ja: '失敗時の代償が小さく成功時の見返りが大きい唯一の択。劣勢ならこれを主軸にすべきである。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃打擊接反擊。血量落後的時候，一次撞牆連段可能就把差距追回來。',
            en: 'Armour through and answer. Behind on life, one wall splat can close the whole gap.',
            ja: 'アーマーで受けて反撃する。劣勢なら壁やられ一回で差を詰め切れることもある。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手摔你，或用自己的動力衝擊撞回來。這個血量下，賭錯就是結束。',
            en: 'They throw, or impact you back. At this life total, a wrong gamble is the end.',
            ja: '投げられるか、DIで撞き返される。この体力では読み違いがそのまま終わりになる。',
          },
          hpLoss: '100% (致命)',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投。你已經在對手一套的射程內，所以「現在不賭就沒機會了」是成立的。',
            en: 'Goes through the strike and the throw. You are already inside one combo of dying, so "now or never" is a real argument here.',
            ja: '打撃も投げも貫通する。既にコンボ一発圏内であり、「今しかない」という理屈が実際に成立する。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手防好等你。這個血量下，落空就是輸掉這一局。',
            en: 'They blocked and waited. At this life total a whiff is the round.',
            ja: 'ガードして待たれる。この体力では空振りがそのまま敗北になる。',
          },
          hpLoss: '100% (致命)',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'blockstring', outcome: 'loss' },
        ],
        mixRatio: '10-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '血量危險時無敵技的使用率該上升，不是下降 —— 因為「慢慢輸」也是輸。但對手也知道這件事。',
          en: 'Your reversal rate should go up when the life is thin, not down: losing slowly is still losing. But they know that too.',
          ja: '体力が薄い時こそ無敵技の頻度は上げるべきで、下げるべきではない。ゆっくり負けるのも負けだからである。ただし相手もそれを知っている。',
        },
      },
    ],
  },
  {
    id: 'h2-they-are-low',
    side: 'defense',
    group: 'H',
    name: {
      'zh-Hant': '對手剩一套的血',
      en: 'One combo kills them',
      ja: '相手がコンボ一発圏内',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['meaty', 'throw', 'blockstring', 'bait-block', 'drive-impact'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋住不貪。對手快死了，你不需要冒險 —— 時間站在你這邊。',
            en: 'Block and stay ungreedy. They are nearly dead; you do not need risk, because time is on your side.',
            ja: 'ガードして欲張らない。相手は瀕死であり、リスクを取る必要はない。時間はこちらの味方である。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，主導權還在對手手上，他多拿一次翻盤的機會。',
            en: 'Thrown, the turn stays theirs, and they get one more chance to turn it around.',
            ja: '投げられて攻め番は相手のまま。逆転の機会をもう一度与えることになる。',
          },
          hpLoss: '20-30%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'even' },
        ],
        mixRatio: '25-30%',
        verified: 'estimated',
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '同時覆蓋打擊和摔投，是血量危險時最不會賠的猜法。',
            en: 'Covers the strike and the throw at once — the guess that loses least while your life is thin.',
            ja: '打撃と投げを同時にカバーする。体力が薄い時に最も損の少ない読み方。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手延遲打擊抓到解摔輸入，吃一套之後優勢被追回一大半。',
            en: 'A delayed attack catches the tech, and the combo claws most of your lead back.',
            ja: '遅らせ打撃に投げ抜けを狩られ、コンボでリードの大半を返される。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'blockstring', outcome: 'even' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '低風險高回報：擋下打擊、回動力槽，完美撥擋還能直接反打。血量落後時最划算的一手。',
            en: 'Low risk, high payoff: absorb the strike, get Drive back, and a Perfect Parry converts. The best value on the list when behind.',
            ja: '低リスク高リターン。打撃を受け止めドライブを回復し、パーフェクトパリィなら反撃まで繋がる。劣勢時に最も割の良い択。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '撥擋防不住摔投，而且在撥擋的動作與收招中被摔是「懲罰反擊摔投」—— 不能解、傷害多七成、再扣一格動力槽，還是強制倒地。這比一般被摔貴得多。',
            en: 'Parry does not stop throws, and being thrown during the parry or its recovery is a Punish Counter throw: untechable, 70% extra damage, another bar of Drive gone, and a hard knockdown. Far more expensive than an ordinary throw.',
            ja: 'パリィは投げを防げず、パリィ中および硬直中に投げられるとパニッシュカウンター投げになる。抜けられず、ダメージ70%増、ドライブをさらに1本失い、ハードダウンまで付く。通常の投げよりはるかに高くつく。',
          },
          hpLoss: '18-25%',
          driveLoss: 2,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '這是唯一一個「失敗代價低、成功回報高」的選項。血量危險時，它應該是你的主力。',
          en: 'The only option whose downside is small and whose upside is large. Behind on life, this should be your staple.',
          ja: '失敗時の代償が小さく成功時の見返りが大きい唯一の択。劣勢ならこれを主軸にすべきである。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃打擊接反擊，通常足以直接收掉這一局。',
            en: 'Armour through and answer — usually enough to close the round outright.',
            ja: 'アーマーで受けて反撃する。多くの場合そのままラウンドを取り切れる。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手摔你或撞回來，你把已經拿到的優勢賠掉一大半。',
            en: 'They throw or impact back, and most of the lead you already had is gone.',
            ja: '投げられるか撞き返され、既に得ていたリードの大半を失う。',
          },
          hpLoss: '30-45%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手快死的時候不要開始賭 —— 你已經贏了，動力衝擊猜錯是把贏面交回去最快的方式。',
          en: 'Do not start gambling when they are nearly dead. You have already won; a wrong Impact is the fastest way to hand it back.',
          ja: '相手が瀕死の時に賭け始めてはいけない。既に勝っている。DIの読み違いは勝ちを返す最短の道である。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投，把對手推開。',
            en: 'Goes through the strike and the throw and pushes them off.',
            ja: '打撃も投げも貫通して相手を押し返す。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手防好等你 —— 你在領先的時候把整場優勢交了出去。',
            en: 'They blocked and waited, and you handed over the whole lead while ahead.',
            ja: 'ガードして待たれ、リードしている状態で優位を丸ごと差し出すことになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'blockstring', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '領先時這一手幾乎不該用。你不需要它，而它的失敗代價正好是你的全部優勢。',
          en: 'Almost never correct while ahead. You do not need it, and its failure cost is exactly the lead you hold.',
          ja: 'リード時にはほぼ不要。必要ないうえ、失敗時の代償が今持っているリードそのものである。',
        },
      },
    ],
  },
]
