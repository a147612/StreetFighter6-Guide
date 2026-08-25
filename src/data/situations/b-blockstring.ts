import type { Situation } from '../schema'

/**
 * Group B — under a blockstring, by position.
 *
 * The distinction from group A that matters: you are in blockstun, so the
 * options that need you to be free do not exist here. Reversals are a wakeup
 * tool and grade terribly; Drive Reversal is the escape, and it is the only
 * option in the game that only exists in this situation.
 *
 * Everything is `estimated`.
 */
export const GROUP_B: Situation[] = [
  {
    id: 'b1-midscreen-pressure',
    side: 'defense',
    group: 'B',
    name: {
      'zh-Hant': '場中被壓',
      en: 'Pressured midscreen',
      ja: '画面中央で攻められている',
    },
    position: ['midscreen'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'low-overhead-mix', 'bait-block', 'drive-impact'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '連防全部擋下。對手打得越久，他的動力槽掉得越多，你只是在等他停。',
            en: 'You block the whole string. The longer they press, the more Drive they spend — you are just waiting for them to stop.',
            ja: '連係を全てガードする。相手が長く攻めるほどドライブを失う。止まるのを待っているだけでよい。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是上下二擇猜錯。傷害不高，但主導權還在對手手上。',
            en: 'Thrown, or you guessed wrong on the high-low. Low damage, but the turn stays theirs.',
            ja: '投げられるか中下段を読み違える。ダメージは軽いが攻め番は相手のまま。',
          },
          hpLoss: '12-18%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'even' },
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦本身會消耗動力槽，所以「一直擋」不是零成本 —— 擋太久你會先 Burnout。',
          en: 'Blocking itself drains Drive, so "just keep blocking" is not free — hold it too long and you burn out first.',
          ja: 'ガード自体がドライブを削るため「ずっとガード」は無料ではない。長く受け続ければ先にバーンアウトする。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先被擋下，摔投還來得及解。連防的空隙裡這是最安全的一手。',
            en: 'The strike is blocked first and a throw still breaks. In the gaps of a string this is the safest input.',
            ja: '打撃は先にガードでき、投げには間に合う。連係の隙間ではこれが最も安全。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手把打擊延到你的解摔輸入上，counter hit 接完整連段。',
            en: 'They delayed the strike onto your tech input — counter hit into a full combo.',
            ja: '打撃を投げ抜けの入力に合わせられ、カウンターヒットからフルコンボ。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
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
            'zh-Hant': '摔投被解開，連防被打斷一次。',
            en: 'The throw breaks and the string is interrupted once.',
            ja: '投げを抜けて連係を一度断ち切る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，解摔動作的硬直被抓 —— 完整懲罰。',
            en: 'They did not throw, and the tech recovery gets caught — a full punish.',
            ja: '相手は投げず、投げ抜けの硬直を狩られてフルコンボ。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-20%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08 查閱',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08 查閱',
            note: '解摔輸入為 LP+LK；SF6 解摔成功的一方回復一格動力槽。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下連防並回動力槽，等於把對手的壓制轉成你的資源。時機準就是完美撥擋反打。',
            en: 'Blocks the string and returns Drive, turning their pressure into your resource. A tight one is a Perfect Parry into a punish.',
            ja: '連係を受け止めつつドライブを回復し、相手の攻めを自分の資源に変える。決まればパーフェクトパリィから反撃。',
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
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '20-30%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '把對手推開，強制結束他的回合，雙方回到中距離。',
            en: 'Shoves them off, ends their turn by force, and resets both of you to range.',
            ja: '相手を押し返して強制的にターンを終わらせ、中距離に戻す。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手看穿了就直接防禦，動力反攻被擋後硬直很長 —— 花了兩格還吃一套。',
            en: 'Read and simply blocked, it recovers slowly: two bars spent and a full punish taken.',
            ja: '読まれてガードされると硬直が長い。2ゲージを失ったうえでフルコンボを受ける。',
          },
          hpLoss: '20-30%',
          driveLoss: 2,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08 查閱',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08 查閱',
            note: '確認起身動力反攻確實存在，並說明用小技＋SA 的 OS 可以釣它',
          },
        ],
        notes: {
          'zh-Hant': '防禦硬直中發生 20F，起身時 18F —— 起身也用得出來，這點常被誤會。兩格很貴，但在角落它買的是位置。',
          en: 'Only available from blockstun, not on wakeup. Two bars is expensive, but in the corner what it buys is position.',
          ja: 'ガード中専用で起き上がりには使えない。2ゲージは高いが、画面端では「位置」を買っている。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下連防的下一段並反擊。靠牆就是撞牆接完整連段，一次把壓制反過來。',
            en: 'Armour eats the next hit of the string and answers. Near a wall that is a wall splat into a full combo, flipping the pressure outright.',
            ja: 'アーマーで連係の次の一撃を受け止めて反撃する。壁が近ければ壁やられからフルコンボで攻守が入れ替わる。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08 查閱',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在連防真的有空隙時才打得進去。',
            en: 'Only gets in if the string genuinely has a gap.',
            ja: '連係に本当に隙間がある場合にしか入らない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，你的輕攻擊被吃掉 —— counter hit 接完整連段。',
            en: 'The string has no gap, so your light is eaten — counter hit into a full combo.',
            ja: '隙間がなければ弱攻撃は潰され、カウンターヒットからフルコンボ。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦中亂按的代價比起身時更高，因為對手的連段已經開始了。要打斷請用動力撥擋或動力反攻。',
          en: 'Mashing costs more here than on wakeup, because their sequence is already running. Use Parry or Drive Reversal to interrupt instead.',
          ja: 'ガード中の暴れは起き上がりより代償が大きい。相手の連係は既に始まっている。割り込むならパリィかリバーサルを使う。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手的連防真的斷掉時才出得來。',
            en: 'Only comes out if their string actually breaks.',
            ja: '相手の連係が実際に途切れた場合にしか出ない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，無敵技出不來就被下一段打中，或是出來被防死 —— punish counter。',
            en: 'With no gap it never starts, or starts and gets blocked — punish counter either way.',
            ja: '隙間がなければ発生せず次の一撃を受けるか、出てもガードされる。いずれもパニッシュカウンター。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'blockstring',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '連防沒有空隙，無敵技根本出不來 —— 它是起身用的，不是防禦中用的。這是最常見的送分方式之一。',
              en: 'A gapless string leaves no frame for it: reversals are a wakeup tool, not a blockstun one. One of the most common ways to donate a round.',
              ja: '隙間のない連係では出す余地がない。無敵技は起き上がり用であり、ガード中の択ではない。最もよくある献上の一つ。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        verified: 'estimated',
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '在連防的空隙後退拉開，逼對手重新接近。',
            en: 'Slips out through a gap and makes them re-approach.',
            ja: '隙間で下がって距離を取り、相手に近づき直させる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '沒有無敵、收招長，被延遲打擊或下一段抓到就是 counter hit。',
            en: 'No invincibility and slow recovery: a delayed attack or the next hit catches it as a counter hit.',
            ja: '無敵はなく硬直も長い。遅らせ打撃や次の一撃にカウンターヒットで狩られる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },
  {
    id: 'b2-near-corner-pressure',
    side: 'defense',
    group: 'B',
    name: {
      'zh-Hant': '靠角被壓',
      en: 'Pressured near the corner',
      ja: '画面端寄りで攻められている',
    },
    position: ['nearCorner'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'low-overhead-mix', 'bait-block', 'drive-impact'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '連防全部擋下。對手打得越久，他的動力槽掉得越多，你只是在等他停。',
            en: 'You block the whole string. The longer they press, the more Drive they spend — you are just waiting for them to stop.',
            ja: '連係を全てガードする。相手が長く攻めるほどドライブを失う。止まるのを待っているだけでよい。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是上下二擇猜錯。傷害不高，但主導權還在對手手上。',
            en: 'Thrown, or you guessed wrong on the high-low. Low damage, but the turn stays theirs.',
            ja: '投げられるか中下段を読み違える。ダメージは軽いが攻め番は相手のまま。',
          },
          hpLoss: '12-18%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'even' },
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦本身會消耗動力槽，所以「一直擋」不是零成本 —— 擋太久你會先 Burnout。',
          en: 'Blocking itself drains Drive, so "just keep blocking" is not free — hold it too long and you burn out first.',
          ja: 'ガード自体がドライブを削るため「ずっとガード」は無料ではない。長く受け続ければ先にバーンアウトする。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先被擋下，摔投還來得及解。連防的空隙裡這是最安全的一手。',
            en: 'The strike is blocked first and a throw still breaks. In the gaps of a string this is the safest input.',
            ja: '打撃は先にガードでき、投げには間に合う。連係の隙間ではこれが最も安全。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手把打擊延到你的解摔輸入上，counter hit 接完整連段。',
            en: 'They delayed the strike onto your tech input — counter hit into a full combo.',
            ja: '打撃を投げ抜けの入力に合わせられ、カウンターヒットからフルコンボ。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
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
            'zh-Hant': '摔投被解開，連防被打斷一次。',
            en: 'The throw breaks and the string is interrupted once.',
            ja: '投げを抜けて連係を一度断ち切る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，解摔動作的硬直被抓 —— 完整懲罰。',
            en: 'They did not throw, and the tech recovery gets caught — a full punish.',
            ja: '相手は投げず、投げ抜けの硬直を狩られてフルコンボ。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-20%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08 查閱',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08 查閱',
            note: '解摔輸入為 LP+LK；SF6 解摔成功的一方回復一格動力槽。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下連防並回動力槽，等於把對手的壓制轉成你的資源。時機準就是完美撥擋反打。',
            en: 'Blocks the string and returns Drive, turning their pressure into your resource. A tight one is a Perfect Parry into a punish.',
            ja: '連係を受け止めつつドライブを回復し、相手の攻めを自分の資源に変える。決まればパーフェクトパリィから反撃。',
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
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '20-30%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '把對手推開，強制結束他的回合，雙方回到中距離。',
            en: 'Shoves them off, ends their turn by force, and resets both of you to range.',
            ja: '相手を押し返して強制的にターンを終わらせ、中距離に戻す。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手看穿了就直接防禦，動力反攻被擋後硬直很長 —— 花了兩格還吃一套。',
            en: 'Read and simply blocked, it recovers slowly: two bars spent and a full punish taken.',
            ja: '読まれてガードされると硬直が長い。2ゲージを失ったうえでフルコンボを受ける。',
          },
          hpLoss: '20-30%',
          driveLoss: 2,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08 查閱',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08 查閱',
            note: '確認起身動力反攻確實存在，並說明用小技＋SA 的 OS 可以釣它',
          },
        ],
        notes: {
          'zh-Hant': '防禦硬直中發生 20F，起身時 18F —— 起身也用得出來，這點常被誤會。兩格很貴，但在角落它買的是位置。',
          en: 'Only available from blockstun, not on wakeup. Two bars is expensive, but in the corner what it buys is position.',
          ja: 'ガード中専用で起き上がりには使えない。2ゲージは高いが、画面端では「位置」を買っている。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下連防的下一段並反擊。靠牆就是撞牆接完整連段，一次把壓制反過來。',
            en: 'Armour eats the next hit of the string and answers. Near a wall that is a wall splat into a full combo, flipping the pressure outright.',
            ja: 'アーマーで連係の次の一撃を受け止めて反撃する。壁が近ければ壁やられからフルコンボで攻守が入れ替わる。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08 查閱',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在連防真的有空隙時才打得進去。',
            en: 'Only gets in if the string genuinely has a gap.',
            ja: '連係に本当に隙間がある場合にしか入らない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，你的輕攻擊被吃掉 —— counter hit 接完整連段。',
            en: 'The string has no gap, so your light is eaten — counter hit into a full combo.',
            ja: '隙間がなければ弱攻撃は潰され、カウンターヒットからフルコンボ。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦中亂按的代價比起身時更高，因為對手的連段已經開始了。要打斷請用動力撥擋或動力反攻。',
          en: 'Mashing costs more here than on wakeup, because their sequence is already running. Use Parry or Drive Reversal to interrupt instead.',
          ja: 'ガード中の暴れは起き上がりより代償が大きい。相手の連係は既に始まっている。割り込むならパリィかリバーサルを使う。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手的連防真的斷掉時才出得來。',
            en: 'Only comes out if their string actually breaks.',
            ja: '相手の連係が実際に途切れた場合にしか出ない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，無敵技出不來就被下一段打中，或是出來被防死 —— punish counter。',
            en: 'With no gap it never starts, or starts and gets blocked — punish counter either way.',
            ja: '隙間がなければ発生せず次の一撃を受けるか、出てもガードされる。いずれもパニッシュカウンター。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'blockstring',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '連防沒有空隙，無敵技根本出不來 —— 它是起身用的，不是防禦中用的。這是最常見的送分方式之一。',
              en: 'A gapless string leaves no frame for it: reversals are a wakeup tool, not a blockstun one. One of the most common ways to donate a round.',
              ja: '隙間のない連係では出す余地がない。無敵技は起き上がり用であり、ガード中の択ではない。最もよくある献上の一つ。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        verified: 'estimated',
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '在連防的空隙後退拉開，逼對手重新接近。',
            en: 'Slips out through a gap and makes them re-approach.',
            ja: '隙間で下がって距離を取り、相手に近づき直させる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '沒有無敵、收招長，被延遲打擊或下一段抓到就是 counter hit。',
            en: 'No invincibility and slow recovery: a delayed attack or the next hit catches it as a counter hit.',
            ja: '無敵はなく硬直も長い。遅らせ打撃や次の一撃にカウンターヒットで狩られる。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },
  {
    id: 'b3-cornered-pressure',
    side: 'defense',
    group: 'B',
    name: {
      'zh-Hant': '角落被壓',
      en: 'Pressured in the corner',
      ja: '画面端で攻められている',
    },
    position: ['cornered'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'low-overhead-mix', 'bait-block', 'drive-impact'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '連防全部擋下。對手打得越久，他的動力槽掉得越多，你只是在等他停。',
            en: 'You block the whole string. The longer they press, the more Drive they spend — you are just waiting for them to stop.',
            ja: '連係を全てガードする。相手が長く攻めるほどドライブを失う。止まるのを待っているだけでよい。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔，或是上下二擇猜錯。傷害不高，但主導權還在對手手上。',
            en: 'Thrown, or you guessed wrong on the high-low. Low damage, but the turn stays theirs.',
            ja: '投げられるか中下段を読み違える。ダメージは軽いが攻め番は相手のまま。',
          },
          hpLoss: '12-18%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'even' },
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦本身會消耗動力槽，所以「一直擋」不是零成本 —— 擋太久你會先 Burnout。',
          en: 'Blocking itself drains Drive, so "just keep blocking" is not free — hold it too long and you burn out first.',
          ja: 'ガード自体がドライブを削るため「ずっとガード」は無料ではない。長く受け続ければ先にバーンアウトする。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先被擋下，摔投還來得及解。連防的空隙裡這是最安全的一手。',
            en: 'The strike is blocked first and a throw still breaks. In the gaps of a string this is the safest input.',
            ja: '打撃は先にガードでき、投げには間に合う。連係の隙間ではこれが最も安全。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手把打擊延到你的解摔輸入上，counter hit 接完整連段。',
            en: 'They delayed the strike onto your tech input — counter hit into a full combo.',
            ja: '打撃を投げ抜けの入力に合わせられ、カウンターヒットからフルコンボ。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
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
            'zh-Hant': '摔投被解開，連防被打斷一次。',
            en: 'The throw breaks and the string is interrupted once.',
            ja: '投げを抜けて連係を一度断ち切る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，解摔動作的硬直被抓 —— 完整懲罰。',
            en: 'They did not throw, and the tech recovery gets caught — a full punish.',
            ja: '相手は投げず、投げ抜けの硬直を狩られてフルコンボ。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-20%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08 查閱',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08 查閱',
            note: '解摔輸入為 LP+LK；SF6 解摔成功的一方回復一格動力槽。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下連防並回動力槽，等於把對手的壓制轉成你的資源。時機準就是完美撥擋反打。',
            en: 'Blocks the string and returns Drive, turning their pressure into your resource. A tight one is a Perfect Parry into a punish.',
            ja: '連係を受け止めつつドライブを回復し、相手の攻めを自分の資源に変える。決まればパーフェクトパリィから反撃。',
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
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'drive-impact', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '20-30%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08 查閱',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '把對手推開並脫離角落 —— 這是被壓在角落時少數真的能改變位置的手段。',
            en: 'Shoves them off and gets you out of the corner — one of the few things that actually changes the position from under pressure.',
            ja: '相手を押し返して画面端から脱出できる。攻められている状態で位置を変えられる数少ない手段。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手看穿了就直接防禦，動力反攻被擋後硬直很長 —— 花了兩格還吃一套。',
            en: 'Read and simply blocked, it recovers slowly: two bars spent and a full punish taken.',
            ja: '読まれてガードされると硬直が長い。2ゲージを失ったうえでフルコンボを受ける。',
          },
          hpLoss: '20-30%',
          driveLoss: 2,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08 查閱',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08 查閱',
            note: '確認起身動力反攻確實存在，並說明用小技＋SA 的 OS 可以釣它',
          },
        ],
        notes: {
          'zh-Hant': '防禦硬直中發生 20F，起身時 18F —— 起身也用得出來，這點常被誤會。兩格很貴，但在角落它買的是位置。',
          en: 'Only available from blockstun, not on wakeup. Two bars is expensive, but in the corner what it buys is position.',
          ja: 'ガード中専用で起き上がりには使えない。2ゲージは高いが、画面端では「位置」を買っている。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下連防的下一段並反擊。靠牆就是撞牆接完整連段，一次把壓制反過來。',
            en: 'Armour eats the next hit of the string and answers. Near a wall that is a wall splat into a full combo, flipping the pressure outright.',
            ja: 'アーマーで連係の次の一撃を受け止めて反撃する。壁が近ければ壁やられからフルコンボで攻守が入れ替わる。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'blockstring', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08 查閱',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在連防真的有空隙時才打得進去。',
            en: 'Only gets in if the string genuinely has a gap.',
            ja: '連係に本当に隙間がある場合にしか入らない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，你的輕攻擊被吃掉 —— counter hit 接完整連段。',
            en: 'The string has no gap, so your light is eaten — counter hit into a full combo.',
            ja: '隙間がなければ弱攻撃は潰され、カウンターヒットからフルコンボ。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'blockstring', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
        ],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '防禦中亂按的代價比起身時更高，因為對手的連段已經開始了。要打斷請用動力撥擋或動力反攻。',
          en: 'Mashing costs more here than on wakeup, because their sequence is already running. Use Parry or Drive Reversal to interrupt instead.',
          ja: 'ガード中の暴れは起き上がりより代償が大きい。相手の連係は既に始まっている。割り込むならパリィかリバーサルを使う。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手的連防真的斷掉時才出得來。',
            en: 'Only comes out if their string actually breaks.',
            ja: '相手の連係が実際に途切れた場合にしか出ない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '連防沒有空隙，無敵技出不來就被下一段打中，或是出來被防死 —— punish counter。',
            en: 'With no gap it never starts, or starts and gets blocked — punish counter either way.',
            ja: '隙間がなければ発生せず次の一撃を受けるか、出てもガードされる。いずれもパニッシュカウンター。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'blockstring',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '連防沒有空隙，無敵技根本出不來 —— 它是起身用的，不是防禦中用的。這是最常見的送分方式之一。',
              en: 'A gapless string leaves no frame for it: reversals are a wakeup tool, not a blockstun one. One of the most common ways to donate a round.',
              ja: '隙間のない連係では出す余地がない。無敵技は起き上がり用であり、ガード中の択ではない。最もよくある献上の一つ。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
        ],
        verified: 'estimated',
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
    ],
  },
]
