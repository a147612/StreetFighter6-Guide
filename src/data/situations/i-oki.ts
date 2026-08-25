import type { Situation } from '../schema'

/**
 * Group I — oki, by how the knockdown happened.
 *
 * The axis is the knockdown type rather than position, because that is what
 * decides whether your spacing is guaranteed: a hard knockdown disallows the
 * back rise, so they stand up exactly where you left them, and everything
 * downstream follows. Not timing — SF6 has no delayed wakeup, so the moment
 * they stand up was never in question.
 *
 * The columns are the defender's options from group A. This is the same
 * relation read from the other side.
 */
export const GROUP_I: Situation[] = [
  {
    id: 'i1-after-throw',
    side: 'offense',
    group: 'I',
    name: {
      'zh-Hant': '摔投倒地後',
      en: 'After a throw',
      ja: '投げでダウンを取った後',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'theyAreDown',
    opponentOptions: ['do-nothing', 'delayed-tech', 'drive-parry', 'mash-light', 'reversal', 'backdash', 'drive-reversal'],
    evaluations: [
      {
        optionId: 'meaty',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '把打擊疊在他起身上，擋到也是你有利，繼續壓。',
            en: 'Puts the strike on their wakeup; even blocked you stay plus and keep pressing.',
            ja: '起き上がりに打撃を重ねる。ガードされてもこちらが有利で攻めを継続できる。',
          },
          followUp: 'pressure',
          damageBand: '10-15%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用無敵技打穿你的打擊，你吃一整套而且失去角落壓制。',
            en: 'They reverse through it, you eat a full combo and lose the corner pressure you had.',
            ja: '無敵技で貫通され、フルコンボを受けたうえ築いた攻めも失う。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          {
            vs: 'drive-reversal',
            outcome: 'even',
            note: {
              'zh-Hant': '硬直短的招壓起身（詐欺重ね）來得及擋下 18 幀的起身動力反攻；壓一招收招長的就會被無敵打斷。壓什麼決定這一格是輸是贏。',
              en: 'A low-recovery meaty — a safe meaty — recovers in time to block an 18-frame wakeup Drive Reversal; a long one gets blown through by the invincibility. Which button you meaty with decides this cell.',
              ja: '硬直の短い技で重ねる（詐欺重ね）なら発生18Fの起き上がりドライブリバーサルをガードで間に合わせられるが、硬直の長い技だと無敵で割られる。何を重ねるかでこのマスの勝敗が決まる。',
            },
          },
        ],
        mixRatio: '20-27%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '壓起身是用招式較後段的判定幀命中，換到比正常命中更多的有利幀；各招的發生與判定幀見各角色頁',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F 且發生中全程無敵 —— 用硬直短的招壓起身（詐欺重ね）才來得及擋下它。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '摔投打穿防禦和撥擋。傷害不高，但你再拿一次倒地，起攻可以繼續循環。',
            en: 'The throw goes through blocking and parry. Modest damage, but you take another knockdown and the loop continues.',
            ja: '投げはガードもパリィも貫通する。ダメージは小さいが再びダウンを奪え、ループが続く。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束；被速點或無敵技打斷更慘。',
            en: 'Teched, you separate and the turn ends; interrupted by a mash or a reversal, worse.',
            ja: '抜けられれば距離が離れてターン終了。暴れや無敵技に潰されればさらに悪い。',
          },
          hpLoss: '12-18%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'bigWin' },
          {
            vs: 'delayed-tech',
            outcome: 'loss',
            note: {
              'zh-Hant': '被解掉不是零成本 —— SF6 解摔成功的一方回復一格動力槽。摔猜錯是在補對手的資源。',
              en: 'Getting teched is not free: in SF6 the player who escapes gets a Drive bar back. A wrong throw pays their gauge.',
              ja: '投げ抜けされるのはノーリスクではない。SF6では抜けた側が1ゲージ回復するため、外した投げは相手の資源を増やす。',
            },
          },
          { vs: 'drive-parry', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'loss',
            note: {
              'zh-Hant': '起身動力反攻發生時全程無敵，摔投抓不到 —— 摔會直接穿過去，然後你被打倒。',
              en: 'The wakeup Drive Reversal is invincible through its startup, so the throw simply whiffs through it and you get knocked down.',
              ja: '起き上がりドライブリバーサルは発生中ずっと無敵で、投げは素通りして空振りし、そのまま倒される。',
            },
          },
        ],
        mixRatio: '17-23%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害（血量基準 10,000）、命中 +17 —— 起攻的有利就是這個數字',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '被解摔的一方什麼也沒拿到，解摔成功的一方還回復一格動力槽。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '對付純防禦和撥擋的答案。他越是不按，摔投的比例就該越高。',
          en: 'The answer to blocking and to parry. The less they press, the higher this share should be.',
          ja: 'ガード択とパリィへの回答。相手が押してこないほど、この比率を上げるべきである。',
        },
      },
      {
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他按解摔，他的解摔硬直落空，你打一整套。這是對付「一直解摔」的處刑手段。',
            en: 'Walk back, bait the tech, and punish the whiffed tech animation with a full combo. The execution for someone who techs on autopilot.',
            ja: '下がって投げ抜けを誘い、空振りの硬直にフルコンボを入れる。投げ抜け一択の相手への処刑手段。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒按解摔，而是直接按了鍵。退開的那段抓不到他的速點，換你吃一下。',
            en: 'They did not tech, they just pressed. Walking back does not reach their mash, and you eat it instead.',
            ja: '相手が投げ抜けではなくボタンを押した場合、下がった分だけ暴れに届かず、こちらが食らう側になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康是它的天敵。兩格的無敵技打了個空，收招又長 —— 這是全場最貴的一次空揮。',
              en: 'A shimmy is what it is worst against. Two bars of invincibility whiffing into nothing, with a long recovery: the most expensive whiff on the screen.',
              ja: 'シミーが最大の天敵。2ゲージの無敵技が空振りし、しかも硬直が長い。画面上で最も高くつく空振りになる。',
            },
          },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17；退康之所以成立，是因為對手要解摔就得自己出一次摔，而空掉的摔投收招很長',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投，因此走出距離就能讓那個輸入變成空摔並確反。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '故意慢一拍出招，正好打在他按解摔的那一格 —— counter hit 接完整連段。',
            en: 'Hit late, landing exactly on their tech input — counter hit into a full combo.',
            ja: 'わざと遅らせて出し、投げ抜けの入力に重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手單純防禦，你延遲的打擊只是被擋，而且比正常疊招更不利。',
            en: 'They simply blocked, so the delayed strike is just blocked — and less plus than a properly timed meaty.',
            ja: '相手が素直にガードすれば、遅らせた打撃はガードされるだけで、通常の重ねより有利が減る。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投 —— 延遲打擊之所以能抓延遲解摔，就是打在那個輸入上；命中為 counter hit',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Rush',
            patch: '2026-08',
            note: '動力箭步後的下一招多 4 幀有利，本來有空隙的壓制會變成沒有空隙 —— 延遲打擊留下的空隙大小是可以用資源買掉的。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '同時懲罰「延遲解摔」和「速點」兩個最常見的防守選項，是起攻裡覆蓋面最大的一手。',
          en: 'Punishes delayed tech and mashing at once — the two most common defensive picks — which makes it the broadest single oki option.',
          ja: '遅らせ投げ抜けと暴れという最も多い二つの守り択を同時に狩れる、起き攻めで最も広い一手。',
        },
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中段和下段的二擇，逼他猜站防還是蹲防。猜錯就是完整連段。',
            en: 'An overhead-versus-low guess: stand block or crouch block. Wrong is a full combo.',
            ja: '中段と下段の二択。立ちガードかしゃがみガードかを迫り、外せばフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手擋對了，而且多數中段起動慢又不利，被確反。',
            en: 'They guessed right — and most overheads are slow and minus, so you get punished.',
            ja: '読まれれば、多くの中段は発生が遅く不利なため確反を受ける。',
          },
          hpLoss: '20-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-17%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色中段技的發生幀數見各角色頁；中段普遍慢到看得到，靠的是對手蹲防的慣性而不是速度',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生 —— 上下段之所以成立，是因為它跟摔投共用同一個「對手在防哪裡」的猜測',
          },
        ],
      },
      {
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '什麼都不做，防好等他的無敵技或速點落空 —— 然後打最大懲罰。',
            en: 'Do nothing and block, waiting for their reversal or mash to whiff. Then take the maximum punish.',
            ja: '何もせずガードし、無敵技や暴れの空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也什麼都不做，你放棄了這次起攻，雙方回到中立。',
            en: 'They did nothing either: you gave up the oki and both of you return to neutral.',
            ja: '相手も何もせず、起き攻めを一度放棄してニュートラルに戻る。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦是最乾淨的解。動力反攻被擋是 −6，你確定反擊，而且對手兩格已經花掉了。',
              en: 'Just blocking is the clean answer: a blocked Drive Reversal is -6, you get a guaranteed punish, and their two bars are already gone.',
              ja: 'ガードするだけで十分。ガードされたドライブリバーサルは−6で確定反撃が入り、相手の2ゲージはすでに消えている。',
            },
          },
        ],
        mixRatio: '7-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻被擋是 −6，確定被反擊；起身動力反攻空揮的整體動作很長，足以吃到跳入連段。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊被擋後的硬直見各角色頁 —— 純防禦之所以是最乾淨的解，是因為擋下來的懲罰時間是確定的',
          },
        ],
        notes: {
          'zh-Hant': '對手用過一次無敵技之後，這一手的期望值最高。它幾乎不會賠，只會浪費一次機會。',
          en: 'Highest expected value right after they have shown you a reversal. It almost never loses; the worst case is a wasted opportunity.',
          ja: '相手が一度無敵技を見せた直後に最も期待値が高い。ほぼ損をせず、最悪でも機会を一度失うだけ。',
        },
      },
      {
        optionId: 'empty-jump',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過去但不出招，落地直接摔或打下段。對手的對空和防禦都會落空。',
            en: 'Jump in without attacking and throw or go low on landing. Their anti-air and their block both whiff.',
            ja: '技を出さずに跳び込み、着地から投げか下段を通す。相手の対空もガードも空振りする。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手對空抓到你，或是落地被速點打斷。',
            en: 'They anti-air you anyway, or a mash catches you on landing.',
            ja: '対空されるか、着地を暴れに狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '3-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '空中無法防禦，所以對空打中就是確定的；各角色對空技與空中普通技的發生幀數見各角色頁。摔投抓不到空中的人 —— 這是跳起來唯一換到的東西。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '壓制中留 9 幀以上的空隙，防守方就跳得出去 —— 跳能不能成立取決於空隙大小，不是取決於膽量。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'reset-neutral',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '不進攻，退回中距離。對手準備好的所有防守選項全部白費。',
            en: 'Decline the oki and back off. Every defensive option they prepared goes to waste.',
            ja: '攻めずに下がる。相手が用意した守りの択が全て無駄になる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '放棄了一次免費的進攻機會，對手也回復了節奏。',
            en: 'You gave up a free offensive opportunity and let them reset their rhythm too.',
            ja: '無償の攻撃機会を放棄し、相手にも立て直す時間を与える。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          { vs: 'drive-reversal', outcome: 'win' },
        ],
        mixRatio: '3-7%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手每次都無敵技的時候，退開比空防更安全 —— 空防還是有被 SA 打到的風險。',
          en: 'Against someone reversing every time, backing off is safer than blocking: a block can still be beaten by an invincible Super.',
          ja: '毎回無敵技を振る相手には、ガードより下がる方が安全。ガードでも無敵SAには通される可能性がある。',
        },
      },
    ],
  },
  {
    id: 'i2-after-hard-knockdown',
    side: 'offense',
    group: 'I',
    name: {
      'zh-Hant': '強制倒地後',
      en: 'After a hard knockdown',
      ja: 'ハードダウンを取った後',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'theyAreDown',
    opponentOptions: ['do-nothing', 'delayed-tech', 'drive-parry', 'mash-light', 'reversal', 'backdash', 'drive-reversal'],
    evaluations: [
      {
        optionId: 'meaty',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '時間點固定，打擊一定疊在他起身的第一格 —— 他不可能靠早起晚起躲掉。',
            en: 'The timing is fixed, so the strike lands on the first frame they can act — no rise choice escapes it.',
            ja: 'タイミングが固定されるため、起き上がりの1F目に必ず重なる。受身の選択では避けられない。',
          },
          followUp: 'pressure',
          damageBand: '10-15%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用無敵技打穿你的打擊，你吃一整套而且失去角落壓制。',
            en: 'They reverse through it, you eat a full combo and lose the corner pressure you had.',
            ja: '無敵技で貫通され、フルコンボを受けたうえ築いた攻めも失う。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          {
            vs: 'drive-reversal',
            outcome: 'even',
            note: {
              'zh-Hant': '硬直短的招壓起身（詐欺重ね）來得及擋下 18 幀的起身動力反攻；壓一招收招長的就會被無敵打斷。壓什麼決定這一格是輸是贏。',
              en: 'A low-recovery meaty — a safe meaty — recovers in time to block an 18-frame wakeup Drive Reversal; a long one gets blown through by the invincibility. Which button you meaty with decides this cell.',
              ja: '硬直の短い技で重ねる（詐欺重ね）なら発生18Fの起き上がりドライブリバーサルをガードで間に合わせられるが、硬直の長い技だと無敵で割られる。何を重ねるかでこのマスの勝敗が決まる。',
            },
          },
        ],
        mixRatio: '20-27%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '壓起身是用招式較後段的判定幀命中，換到比正常命中更多的有利幀；各招的發生與判定幀見各角色頁',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F 且發生中全程無敵 —— 用硬直短的招壓起身（詐欺重ね）才來得及擋下它。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '強制倒地是你能拿到的最好起攻 —— 對手不能後受身，所以他一定在你算好的那個位置起來。保證的是距離，不是時間點：起身時間本來就是固定的。',
          en: 'A hard knockdown is the best oki you can get: no back rise, so they stand up in exactly the spot you set for. What it guarantees is the spacing, not the timing — the timing was never variable.',
          ja: 'ハードダウンは最良の起き攻め。後ろ受け身が取れないため、相手は狙った位置で必ず起き上がる。保証されるのは位置であってタイミングではない ——タイミングは元から固定である。',
        },
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '摔投打穿防禦和撥擋。傷害不高，但你再拿一次倒地，起攻可以繼續循環。',
            en: 'The throw goes through blocking and parry. Modest damage, but you take another knockdown and the loop continues.',
            ja: '投げはガードもパリィも貫通する。ダメージは小さいが再びダウンを奪え、ループが続く。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束；被速點或無敵技打斷更慘。',
            en: 'Teched, you separate and the turn ends; interrupted by a mash or a reversal, worse.',
            ja: '抜けられれば距離が離れてターン終了。暴れや無敵技に潰されればさらに悪い。',
          },
          hpLoss: '12-18%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'bigWin' },
          {
            vs: 'delayed-tech',
            outcome: 'loss',
            note: {
              'zh-Hant': '被解掉不是零成本 —— SF6 解摔成功的一方回復一格動力槽。摔猜錯是在補對手的資源。',
              en: 'Getting teched is not free: in SF6 the player who escapes gets a Drive bar back. A wrong throw pays their gauge.',
              ja: '投げ抜けされるのはノーリスクではない。SF6では抜けた側が1ゲージ回復するため、外した投げは相手の資源を増やす。',
            },
          },
          { vs: 'drive-parry', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'loss',
            note: {
              'zh-Hant': '起身動力反攻發生時全程無敵，摔投抓不到 —— 摔會直接穿過去，然後你被打倒。',
              en: 'The wakeup Drive Reversal is invincible through its startup, so the throw simply whiffs through it and you get knocked down.',
              ja: '起き上がりドライブリバーサルは発生中ずっと無敵で、投げは素通りして空振りし、そのまま倒される。',
            },
          },
        ],
        mixRatio: '17-23%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害（血量基準 10,000）、命中 +17 —— 起攻的有利就是這個數字',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '被解摔的一方什麼也沒拿到，解摔成功的一方還回復一格動力槽。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '對付純防禦和撥擋的答案。他越是不按，摔投的比例就該越高。',
          en: 'The answer to blocking and to parry. The less they press, the higher this share should be.',
          ja: 'ガード択とパリィへの回答。相手が押してこないほど、この比率を上げるべきである。',
        },
      },
      {
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他按解摔，他的解摔硬直落空，你打一整套。這是對付「一直解摔」的處刑手段。',
            en: 'Walk back, bait the tech, and punish the whiffed tech animation with a full combo. The execution for someone who techs on autopilot.',
            ja: '下がって投げ抜けを誘い、空振りの硬直にフルコンボを入れる。投げ抜け一択の相手への処刑手段。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒按解摔，而是直接按了鍵。退開的那段抓不到他的速點，換你吃一下。',
            en: 'They did not tech, they just pressed. Walking back does not reach their mash, and you eat it instead.',
            ja: '相手が投げ抜けではなくボタンを押した場合、下がった分だけ暴れに届かず、こちらが食らう側になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康是它的天敵。兩格的無敵技打了個空，收招又長 —— 這是全場最貴的一次空揮。',
              en: 'A shimmy is what it is worst against. Two bars of invincibility whiffing into nothing, with a long recovery: the most expensive whiff on the screen.',
              ja: 'シミーが最大の天敵。2ゲージの無敵技が空振りし、しかも硬直が長い。画面上で最も高くつく空振りになる。',
            },
          },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17；退康之所以成立，是因為對手要解摔就得自己出一次摔，而空掉的摔投收招很長',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投，因此走出距離就能讓那個輸入變成空摔並確反。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '故意慢一拍出招，正好打在他按解摔的那一格 —— counter hit 接完整連段。',
            en: 'Hit late, landing exactly on their tech input — counter hit into a full combo.',
            ja: 'わざと遅らせて出し、投げ抜けの入力に重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手單純防禦，你延遲的打擊只是被擋，而且比正常疊招更不利。',
            en: 'They simply blocked, so the delayed strike is just blocked — and less plus than a properly timed meaty.',
            ja: '相手が素直にガードすれば、遅らせた打撃はガードされるだけで、通常の重ねより有利が減る。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投 —— 延遲打擊之所以能抓延遲解摔，就是打在那個輸入上；命中為 counter hit',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Rush',
            patch: '2026-08',
            note: '動力箭步後的下一招多 4 幀有利，本來有空隙的壓制會變成沒有空隙 —— 延遲打擊留下的空隙大小是可以用資源買掉的。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '同時懲罰「延遲解摔」和「速點」兩個最常見的防守選項，是起攻裡覆蓋面最大的一手。',
          en: 'Punishes delayed tech and mashing at once — the two most common defensive picks — which makes it the broadest single oki option.',
          ja: '遅らせ投げ抜けと暴れという最も多い二つの守り択を同時に狩れる、起き攻めで最も広い一手。',
        },
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中段和下段的二擇，逼他猜站防還是蹲防。猜錯就是完整連段。',
            en: 'An overhead-versus-low guess: stand block or crouch block. Wrong is a full combo.',
            ja: '中段と下段の二択。立ちガードかしゃがみガードかを迫り、外せばフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手擋對了，而且多數中段起動慢又不利，被確反。',
            en: 'They guessed right — and most overheads are slow and minus, so you get punished.',
            ja: '読まれれば、多くの中段は発生が遅く不利なため確反を受ける。',
          },
          hpLoss: '20-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-17%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色中段技的發生幀數見各角色頁；中段普遍慢到看得到，靠的是對手蹲防的慣性而不是速度',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生 —— 上下段之所以成立，是因為它跟摔投共用同一個「對手在防哪裡」的猜測',
          },
        ],
      },
      {
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '什麼都不做，防好等他的無敵技或速點落空 —— 然後打最大懲罰。',
            en: 'Do nothing and block, waiting for their reversal or mash to whiff. Then take the maximum punish.',
            ja: '何もせずガードし、無敵技や暴れの空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也什麼都不做，你放棄了這次起攻，雙方回到中立。',
            en: 'They did nothing either: you gave up the oki and both of you return to neutral.',
            ja: '相手も何もせず、起き攻めを一度放棄してニュートラルに戻る。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦是最乾淨的解。動力反攻被擋是 −6，你確定反擊，而且對手兩格已經花掉了。',
              en: 'Just blocking is the clean answer: a blocked Drive Reversal is -6, you get a guaranteed punish, and their two bars are already gone.',
              ja: 'ガードするだけで十分。ガードされたドライブリバーサルは−6で確定反撃が入り、相手の2ゲージはすでに消えている。',
            },
          },
        ],
        mixRatio: '7-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻被擋是 −6，確定被反擊；起身動力反攻空揮的整體動作很長，足以吃到跳入連段。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊被擋後的硬直見各角色頁 —— 純防禦之所以是最乾淨的解，是因為擋下來的懲罰時間是確定的',
          },
        ],
        notes: {
          'zh-Hant': '對手用過一次無敵技之後，這一手的期望值最高。它幾乎不會賠，只會浪費一次機會。',
          en: 'Highest expected value right after they have shown you a reversal. It almost never loses; the worst case is a wasted opportunity.',
          ja: '相手が一度無敵技を見せた直後に最も期待値が高い。ほぼ損をせず、最悪でも機会を一度失うだけ。',
        },
      },
      {
        optionId: 'empty-jump',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過去但不出招，落地直接摔或打下段。對手的對空和防禦都會落空。',
            en: 'Jump in without attacking and throw or go low on landing. Their anti-air and their block both whiff.',
            ja: '技を出さずに跳び込み、着地から投げか下段を通す。相手の対空もガードも空振りする。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手對空抓到你，或是落地被速點打斷。',
            en: 'They anti-air you anyway, or a mash catches you on landing.',
            ja: '対空されるか、着地を暴れに狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '3-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '空中無法防禦，所以對空打中就是確定的；各角色對空技與空中普通技的發生幀數見各角色頁。摔投抓不到空中的人 —— 這是跳起來唯一換到的東西。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '壓制中留 9 幀以上的空隙，防守方就跳得出去 —— 跳能不能成立取決於空隙大小，不是取決於膽量。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'reset-neutral',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '不進攻，退回中距離。對手準備好的所有防守選項全部白費。',
            en: 'Decline the oki and back off. Every defensive option they prepared goes to waste.',
            ja: '攻めずに下がる。相手が用意した守りの択が全て無駄になる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '放棄了一次免費的進攻機會，對手也回復了節奏。',
            en: 'You gave up a free offensive opportunity and let them reset their rhythm too.',
            ja: '無償の攻撃機会を放棄し、相手にも立て直す時間を与える。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          { vs: 'drive-reversal', outcome: 'win' },
        ],
        mixRatio: '3-7%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手每次都無敵技的時候，退開比空防更安全 —— 空防還是有被 SA 打到的風險。',
          en: 'Against someone reversing every time, backing off is safer than blocking: a block can still be beaten by an invincible Super.',
          ja: '毎回無敵技を振る相手には、ガードより下がる方が安全。ガードでも無敵SAには通される可能性がある。',
        },
      },
    ],
  },
  {
    id: 'i3-after-soft-knockdown',
    side: 'offense',
    group: 'I',
    name: {
      'zh-Hant': '軟倒地後（對手可受身）',
      en: 'After a soft knockdown',
      ja: '通常ダウンを取った後',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'theyAreDown',
    opponentOptions: ['do-nothing', 'delayed-tech', 'drive-parry', 'mash-light', 'reversal', 'backdash', 'drive-reversal'],
    evaluations: [
      {
        optionId: 'meaty',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '把打擊疊在他起身上。但他可以選擇受身或不受身，時間點不保證對得準。',
            en: 'Puts the strike on their wakeup — but they choose when to rise, so the timing is not guaranteed.',
            ja: '起き上がりに打撃を重ねる。ただし相手が受身を選べるためタイミングは保証されない。',
          },
          followUp: 'pressure',
          damageBand: '10-15%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用無敵技打穿你的打擊，你吃一整套而且失去角落壓制。',
            en: 'They reverse through it, you eat a full combo and lose the corner pressure you had.',
            ja: '無敵技で貫通され、フルコンボを受けたうえ築いた攻めも失う。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          {
            vs: 'drive-reversal',
            outcome: 'even',
            note: {
              'zh-Hant': '硬直短的招壓起身（詐欺重ね）來得及擋下 18 幀的起身動力反攻；壓一招收招長的就會被無敵打斷。壓什麼決定這一格是輸是贏。',
              en: 'A low-recovery meaty — a safe meaty — recovers in time to block an 18-frame wakeup Drive Reversal; a long one gets blown through by the invincibility. Which button you meaty with decides this cell.',
              ja: '硬直の短い技で重ねる（詐欺重ね）なら発生18Fの起き上がりドライブリバーサルをガードで間に合わせられるが、硬直の長い技だと無敵で割られる。何を重ねるかでこのマスの勝敗が決まる。',
            },
          },
        ],
        mixRatio: '20-27%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '壓起身是用招式較後段的判定幀命中，換到比正常命中更多的有利幀；各招的發生與判定幀見各角色頁',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F 且發生中全程無敵 —— 用硬直短的招壓起身（詐欺重ね）才來得及擋下它。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '軟倒地的變數不是時間點 —— 起身時間是固定的 —— 而是位置：對手可以後受身，在更後面起來，你照倒地位置設好的距離就構不到。想要位置也穩定，先拿強制倒地，那個不能後受身。',
          en: 'What a soft knockdown costs you is not timing — the rise timing is fixed — it is spacing: they can back rise and stand up further away, so a meaty spaced for where they fell no longer reaches. If you want the spacing guaranteed too, take a hard knockdown, which allows no back rise.',
          ja: 'ソフトダウンで揺れるのはタイミングではなく——起き上がりの時間は固定である——位置のほう。相手は後ろ受け身でより後方から起き上がれるため、倒れた位置に合わせた重ねは届かなくなる。位置まで安定させたいなら、後ろ受け身のできないハードダウンを取る。',
        },
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '摔投打穿防禦和撥擋。傷害不高，但你再拿一次倒地，起攻可以繼續循環。',
            en: 'The throw goes through blocking and parry. Modest damage, but you take another knockdown and the loop continues.',
            ja: '投げはガードもパリィも貫通する。ダメージは小さいが再びダウンを奪え、ループが続く。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束；被速點或無敵技打斷更慘。',
            en: 'Teched, you separate and the turn ends; interrupted by a mash or a reversal, worse.',
            ja: '抜けられれば距離が離れてターン終了。暴れや無敵技に潰されればさらに悪い。',
          },
          hpLoss: '12-18%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'bigWin' },
          {
            vs: 'delayed-tech',
            outcome: 'loss',
            note: {
              'zh-Hant': '被解掉不是零成本 —— SF6 解摔成功的一方回復一格動力槽。摔猜錯是在補對手的資源。',
              en: 'Getting teched is not free: in SF6 the player who escapes gets a Drive bar back. A wrong throw pays their gauge.',
              ja: '投げ抜けされるのはノーリスクではない。SF6では抜けた側が1ゲージ回復するため、外した投げは相手の資源を増やす。',
            },
          },
          { vs: 'drive-parry', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'loss',
            note: {
              'zh-Hant': '起身動力反攻發生時全程無敵，摔投抓不到 —— 摔會直接穿過去，然後你被打倒。',
              en: 'The wakeup Drive Reversal is invincible through its startup, so the throw simply whiffs through it and you get knocked down.',
              ja: '起き上がりドライブリバーサルは発生中ずっと無敵で、投げは素通りして空振りし、そのまま倒される。',
            },
          },
        ],
        mixRatio: '17-23%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害（血量基準 10,000）、命中 +17 —— 起攻的有利就是這個數字',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '被解摔的一方什麼也沒拿到，解摔成功的一方還回復一格動力槽。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '對付純防禦和撥擋的答案。他越是不按，摔投的比例就該越高。',
          en: 'The answer to blocking and to parry. The less they press, the higher this share should be.',
          ja: 'ガード択とパリィへの回答。相手が押してこないほど、この比率を上げるべきである。',
        },
      },
      {
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他按解摔，他的解摔硬直落空，你打一整套。這是對付「一直解摔」的處刑手段。',
            en: 'Walk back, bait the tech, and punish the whiffed tech animation with a full combo. The execution for someone who techs on autopilot.',
            ja: '下がって投げ抜けを誘い、空振りの硬直にフルコンボを入れる。投げ抜け一択の相手への処刑手段。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒按解摔，而是直接按了鍵。退開的那段抓不到他的速點，換你吃一下。',
            en: 'They did not tech, they just pressed. Walking back does not reach their mash, and you eat it instead.',
            ja: '相手が投げ抜けではなくボタンを押した場合、下がった分だけ暴れに届かず、こちらが食らう側になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'backdash', outcome: 'loss' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康是它的天敵。兩格的無敵技打了個空，收招又長 —— 這是全場最貴的一次空揮。',
              en: 'A shimmy is what it is worst against. Two bars of invincibility whiffing into nothing, with a long recovery: the most expensive whiff on the screen.',
              ja: 'シミーが最大の天敵。2ゲージの無敵技が空振りし、しかも硬直が長い。画面上で最も高くつく空振りになる。',
            },
          },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17；退康之所以成立，是因為對手要解摔就得自己出一次摔，而空掉的摔投收招很長',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投，因此走出距離就能讓那個輸入變成空摔並確反。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '故意慢一拍出招，正好打在他按解摔的那一格 —— counter hit 接完整連段。',
            en: 'Hit late, landing exactly on their tech input — counter hit into a full combo.',
            ja: 'わざと遅らせて出し、投げ抜けの入力に重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手單純防禦，你延遲的打擊只是被擋，而且比正常疊招更不利。',
            en: 'They simply blocked, so the delayed strike is just blocked — and less plus than a properly timed meaty.',
            ja: '相手が素直にガードすれば、遅らせた打撃はガードされるだけで、通常の重ねより有利が減る。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'backdash', outcome: 'win' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔為 9 幀窗口且必須輸入摔投 —— 延遲打擊之所以能抓延遲解摔，就是打在那個輸入上；命中為 counter hit',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Rush',
            patch: '2026-08',
            note: '動力箭步後的下一招多 4 幀有利，本來有空隙的壓制會變成沒有空隙 —— 延遲打擊留下的空隙大小是可以用資源買掉的。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '同時懲罰「延遲解摔」和「速點」兩個最常見的防守選項，是起攻裡覆蓋面最大的一手。',
          en: 'Punishes delayed tech and mashing at once — the two most common defensive picks — which makes it the broadest single oki option.',
          ja: '遅らせ投げ抜けと暴れという最も多い二つの守り択を同時に狩れる、起き攻めで最も広い一手。',
        },
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中段和下段的二擇，逼他猜站防還是蹲防。猜錯就是完整連段。',
            en: 'An overhead-versus-low guess: stand block or crouch block. Wrong is a full combo.',
            ja: '中段と下段の二択。立ちガードかしゃがみガードかを迫り、外せばフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手擋對了，而且多數中段起動慢又不利，被確反。',
            en: 'They guessed right — and most overheads are slow and minus, so you get punished.',
            ja: '読まれれば、多くの中段は発生が遅く不利なため確反を受ける。',
          },
          hpLoss: '20-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '10-17%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色中段技的發生幀數見各角色頁；中段普遍慢到看得到，靠的是對手蹲防的慣性而不是速度',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生 —— 上下段之所以成立，是因為它跟摔投共用同一個「對手在防哪裡」的猜測',
          },
        ],
      },
      {
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '什麼都不做，防好等他的無敵技或速點落空 —— 然後打最大懲罰。',
            en: 'Do nothing and block, waiting for their reversal or mash to whiff. Then take the maximum punish.',
            ja: '何もせずガードし、無敵技や暴れの空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也什麼都不做，你放棄了這次起攻，雙方回到中立。',
            en: 'They did nothing either: you gave up the oki and both of you return to neutral.',
            ja: '相手も何もせず、起き攻めを一度放棄してニュートラルに戻る。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          {
            vs: 'drive-reversal',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦是最乾淨的解。動力反攻被擋是 −6，你確定反擊，而且對手兩格已經花掉了。',
              en: 'Just blocking is the clean answer: a blocked Drive Reversal is -6, you get a guaranteed punish, and their two bars are already gone.',
              ja: 'ガードするだけで十分。ガードされたドライブリバーサルは−6で確定反撃が入り、相手の2ゲージはすでに消えている。',
            },
          },
        ],
        mixRatio: '7-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻被擋是 −6，確定被反擊；起身動力反攻空揮的整體動作很長，足以吃到跳入連段。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊被擋後的硬直見各角色頁 —— 純防禦之所以是最乾淨的解，是因為擋下來的懲罰時間是確定的',
          },
        ],
        notes: {
          'zh-Hant': '對手用過一次無敵技之後，這一手的期望值最高。它幾乎不會賠，只會浪費一次機會。',
          en: 'Highest expected value right after they have shown you a reversal. It almost never loses; the worst case is a wasted opportunity.',
          ja: '相手が一度無敵技を見せた直後に最も期待値が高い。ほぼ損をせず、最悪でも機会を一度失うだけ。',
        },
      },
      {
        optionId: 'empty-jump',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '跳過去但不出招，落地直接摔或打下段。對手的對空和防禦都會落空。',
            en: 'Jump in without attacking and throw or go low on landing. Their anti-air and their block both whiff.',
            ja: '技を出さずに跳び込み、着地から投げか下段を通す。相手の対空もガードも空振りする。',
          },
          followUp: 'combo',
          damageBand: '20-30%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手對空抓到你，或是落地被速點打斷。',
            en: 'They anti-air you anyway, or a mash catches you on landing.',
            ja: '対空されるか、着地を暴れに狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
        ],
        mixRatio: '3-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '空中無法防禦，所以對空打中就是確定的；各角色對空技與空中普通技的發生幀數見各角色頁。摔投抓不到空中的人 —— 這是跳起來唯一換到的東西。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '壓制中留 9 幀以上的空隙，防守方就跳得出去 —— 跳能不能成立取決於空隙大小，不是取決於膽量。來源未標註遊戲版本',
          },
        ],
      },
      {
        optionId: 'reset-neutral',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '不進攻，退回中距離。對手準備好的所有防守選項全部白費。',
            en: 'Decline the oki and back off. Every defensive option they prepared goes to waste.',
            ja: '攻めずに下がる。相手が用意した守りの択が全て無駄になる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '放棄了一次免費的進攻機會，對手也回復了節奏。',
            en: 'You gave up a free offensive opportunity and let them reset their rhythm too.',
            ja: '無償の攻撃機会を放棄し、相手にも立て直す時間を与える。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'win' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'backdash', outcome: 'even' },
          { vs: 'drive-reversal', outcome: 'win' },
        ],
        mixRatio: '3-7%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手每次都無敵技的時候，退開比空防更安全 —— 空防還是有被 SA 打到的風險。',
          en: 'Against someone reversing every time, backing off is safer than blocking: a block can still be beaten by an invincible Super.',
          ja: '毎回無敵技を振る相手には、ガードより下がる方が安全。ガードでも無敵SAには通される可能性がある。',
        },
      },
    ],
  },
]
