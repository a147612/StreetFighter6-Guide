import type { Situation } from '../schema'

/**
 * Group G — living with the Drive Impact threat, by position.
 *
 * The wall is the whole story. Midscreen an Impact that lands is a knockdown;
 * against the wall it is a wall splat into a full combo, which turns a
 * one-bar move into the most expensive single mistake in the game. Every row
 * below grades differently for that one reason.
 *
 * Everything is `estimated`.
 */
export const GROUP_G: Situation[] = [
  {
    id: 'g1-impact-midscreen',
    side: 'defense',
    group: 'G',
    name: {
      'zh-Hant': '場中面對動力衝擊',
      en: 'Impact threat midscreen',
      ja: '画面中央でのDI',
    },
    position: ['midscreen'],
    distance: 'close',
    stance: 'neutral',
    opponentOptions: ['drive-impact', 'blockstring', 'throw', 'poke'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋下動力衝擊。你會被推開一段距離，對手拿到有利，但沒有實質傷害。',
            en: 'Block the Drive Impact. You get pushed back and they keep advantage, but nothing real is lost.',
            ja: 'ドライブインパクトをガードする。押し戻され相手が有利を取るが、実害はない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是防禦動力衝擊消耗掉的動力槽讓你更接近 Burnout。',
            en: 'Thrown, or the Drive spent blocking impacts pushes you closer to Burnout.',
            ja: '投げられるか、DIをガードした分のドライブ消費でバーンアウトに近づく。',
          },
          hpLoss: '12-20%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'even' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '35-45%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '用自己的動力衝擊撞回去。後撞的一方贏，所以反應撞是這個攻防的正解。',
            en: 'Impact them back. The later one wins the exchange, which makes the reactive counter-impact the correct answer here.',
            ja: '自分のDIで撞き返す。後から出した側が勝つため、反応で返すのがこの攻防の正解。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手根本沒撞，你的動力衝擊被擋住後硬直很長，吃完整懲罰。',
            en: 'They never impacted, and yours is blocked with long recovery — a full punish.',
            ja: '相手はDIを出しておらず、ガードされて長い硬直から確定反撃を受ける。',
          },
          hpLoss: '25-35%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '要反應得到。看到閃光才按通常已經來不及，多數人是靠預判 —— 那就變成一個賭。',
          en: 'It has to be a reaction. Pressing on the flash is usually already late, so most of it is a read — which makes it a gamble.',
          ja: '反応で取る必要がある。光ってから押しても遅いことが多く、実際は読みになる。つまり賭けである。',
        },
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '撥擋吃得下動力衝擊，而且會回動力槽 —— 對手花了一格，你賺了一格。',
            en: 'A parry absorbs the Impact and returns Drive: they spent a bar, you gained one.',
            ja: 'パリィはDIを受け止めたうえドライブを回復する。相手は1ゲージ消費し、こちらは回復する。',
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
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '15-20%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '比反撞穩得多：撥擋錯了只是被摔，反撞錯了是吃一整套。',
          en: 'Much steadier than counter-impacting: a wrong parry costs a throw, a wrong impact costs a full combo.',
          ja: '撞き返すよりはるかに安定する。パリィの読み違いは投げ一回、DIの読み違いはフルコンボ一式。',
        },
      },
      {
        optionId: 'multi-hit',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打兩下以上的招會直接打破霸體，動力衝擊的一格就這樣白花。',
            en: 'A move that hits twice or more breaks the armour outright, and their bar is simply gone.',
            ja: '2発以上ヒットする技はアーマーを割る。相手のゲージはそのまま無駄になる。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '多段技通常起動慢，猜錯的時候會被動力衝擊吃下第一下再撞飛。',
            en: 'Multi-hit moves usually start slowly; guess wrong and the Impact armours the first hit and launches you.',
            ja: '多段技は発生が遅いことが多く、読み違えればDIに1発目を耐えられて打ち上げられる。',
          },
          hpLoss: '25-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'blockstring', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '不是每隻角色都有堪用的多段技。有的話，這是對付愛撞動力衝擊的對手最省資源的解法。',
          en: 'Not every character has a usable one. If yours does, it is the cheapest answer to an Impact-happy opponent.',
          ja: '全キャラが使える多段技を持つわけではない。あるなら、DIを振りたがる相手への最も安価な回答になる。',
        },
      },
      {
        optionId: 'super-art',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '多數 SA 起動極快且能穿霸體，是最確定的一種反制。',
            en: 'Most Super Arts start fast and go through armour, making this the most certain counter available.',
            ja: '多くのSAは発生が速くアーマーも貫通する。最も確実な返し方。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '猜錯就是整條 SA 槽白花，而且被擋之後照樣吃懲罰。',
            en: 'Guess wrong and the whole Super gauge is gone, with a punish on top for being blocked.',
            ja: '読み違えればSAゲージを丸ごと失い、そのうえガードされて反撃も受ける。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
      {
        optionId: 'backdash',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '動力衝擊推進距離有限，後衝刺可以直接讓它落空。',
            en: 'A Drive Impact only travels so far; a backdash simply takes you out of its range.',
            ja: 'DIの前進距離は限られており、バックダッシュで単純に空振りさせられる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒撞而是走過來，後衝刺的收招被抓。',
            en: 'They walked in instead of impacting, and the backdash recovery is caught.',
            ja: 'DIではなく歩いて近づかれ、バックダッシュの硬直を狩られる。',
          },
          hpLoss: '25-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'blockstring', outcome: 'loss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '牆邊沒有這個選項 —— 沒有空間可以退，這也是為什麼牆邊的動力衝擊那麼強。',
          en: 'Not available at the wall: there is no ground to give, which is exactly why a cornered Drive Impact is so strong.',
          ja: '画面端では使えない。下がる空間がないことこそ、画面端のDIが強い理由である。',
        },
      },
    ],
  },
  {
    id: 'g2-impact-at-wall',
    side: 'defense',
    group: 'G',
    name: {
      'zh-Hant': '牆邊面對動力衝擊',
      en: 'Impact threat at the wall',
      ja: '画面端でのDI',
    },
    position: ['cornered'],
    distance: 'close',
    stance: 'neutral',
    opponentOptions: ['drive-impact', 'blockstring', 'throw', 'poke'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋下動力衝擊。牆邊擋住的代價只有削血和動力槽，遠比被撞到好太多。',
            en: 'Block the Drive Impact. Cornered, blocking costs only chip and Drive — far better than being hit by it.',
            ja: 'ドライブインパクトをガードする。画面端でも削りとドライブの消費だけで済み、当たるよりはるかに良い。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是防禦動力衝擊消耗掉的動力槽讓你更接近 Burnout。',
            en: 'Thrown, or the Drive spent blocking impacts pushes you closer to Burnout.',
            ja: '投げられるか、DIをガードした分のドライブ消費でバーンアウトに近づく。',
          },
          hpLoss: '12-20%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'even' },
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '35-45%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '牆邊被動力衝擊「撞到」是這個遊戲最貴的單一失誤 —— 撞牆接完整連段。所以在牆邊，擋住就是勝利。唯一的例外是你正在 Burnout：那種情況下擋住一樣會被撞牆暈眩，防禦救不了你。',
          en: 'Being *hit* by a Drive Impact at the wall is the single most expensive mistake available: a wall splat into a full combo. Cornered, blocking it is the win. The one exception is being in Burnout, where the wall splat stuns you on block too and blocking does not save you.',
          ja: '画面端でDIに「当たる」ことはゲーム中最も高くつくミス。壁やられからフルコンボになる。画面端ではガードできた時点で勝ちである。唯一の例外はバーンアウト中で、その場合はガードしても壁やられからスタンするため、ガードでは助からない。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '用自己的動力衝擊撞回去。後撞的一方贏，所以反應撞是這個攻防的正解。',
            en: 'Impact them back. The later one wins the exchange, which makes the reactive counter-impact the correct answer here.',
            ja: '自分のDIで撞き返す。後から出した側が勝つため、反応で返すのがこの攻防の正解。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手根本沒撞，你的動力衝擊被擋 —— 牆邊被確反的代價是這一局。',
            en: 'They never impacted, and yours gets blocked — at the wall, that punish is the round.',
            ja: '相手はDIを出しておらず、こちらのDIをガードされる。画面端ではその反撃でラウンドが決まる。',
          },
          hpLoss: '45-60%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '要反應得到。看到閃光才按通常已經來不及，多數人是靠預判 —— 那就變成一個賭。',
          en: 'It has to be a reaction. Pressing on the flash is usually already late, so most of it is a read — which makes it a gamble.',
          ja: '反応で取る必要がある。光ってから押しても遅いことが多く、実際は読みになる。つまり賭けである。',
        },
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '撥擋吃得下動力衝擊，而且會回動力槽 —— 對手花了一格，你賺了一格。',
            en: 'A parry absorbs the Impact and returns Drive: they spent a bar, you gained one.',
            ja: 'パリィはDIを受け止めたうえドライブを回復する。相手は1ゲージ消費し、こちらは回復する。',
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
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'poke', outcome: 'win' },
        ],
        mixRatio: '15-20%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '比反撞穩得多：撥擋錯了只是被摔，反撞錯了是吃一整套。',
          en: 'Much steadier than counter-impacting: a wrong parry costs a throw, a wrong impact costs a full combo.',
          ja: '撞き返すよりはるかに安定する。パリィの読み違いは投げ一回、DIの読み違いはフルコンボ一式。',
        },
      },
      {
        optionId: 'multi-hit',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打兩下以上的招會直接打破霸體，動力衝擊的一格就這樣白花。',
            en: 'A move that hits twice or more breaks the armour outright, and their bar is simply gone.',
            ja: '2発以上ヒットする技はアーマーを割る。相手のゲージはそのまま無駄になる。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '多段技通常起動慢，猜錯的時候會被動力衝擊吃下第一下再撞飛。',
            en: 'Multi-hit moves usually start slowly; guess wrong and the Impact armours the first hit and launches you.',
            ja: '多段技は発生が遅いことが多く、読み違えればDIに1発目を耐えられて打ち上げられる。',
          },
          hpLoss: '25-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'poke', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'blockstring', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '不是每隻角色都有堪用的多段技。有的話，這是對付愛撞動力衝擊的對手最省資源的解法。',
          en: 'Not every character has a usable one. If yours does, it is the cheapest answer to an Impact-happy opponent.',
          ja: '全キャラが使える多段技を持つわけではない。あるなら、DIを振りたがる相手への最も安価な回答になる。',
        },
      },
      {
        optionId: 'super-art',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '多數 SA 起動極快且能穿霸體，是最確定的一種反制。',
            en: 'Most Super Arts start fast and go through armour, making this the most certain counter available.',
            ja: '多くのSAは発生が速くアーマーも貫通する。最も確実な返し方。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '猜錯就是整條 SA 槽白花，而且被擋之後照樣吃懲罰。',
            en: 'Guess wrong and the whole Super gauge is gone, with a punish on top for being blocked.',
            ja: '読み違えればSAゲージを丸ごと失い、そのうえガードされて反撃も受ける。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },
]
