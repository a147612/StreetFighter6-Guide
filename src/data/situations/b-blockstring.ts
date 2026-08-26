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
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'command-grab', 'low-overhead-mix', 'bait-block', 'drive-impact'],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '21-28%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽；槽耗盡即進入 Burnout，屆時無法使用任何動力技能，並會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為該招傷害的 25%，且可以致死；Burnout 中防禦硬直 +4F',
          },
        ],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '18-25%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '解摔輸入 LP+LK，成功的一方回復一格動力槽。來源未標註遊戲版本',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔判定為 9 幀窗口，且該窗口內若輸入了會妨礙站立摔的動作就不成立 —— 這是延遲解摔無法做成 OS 的原因。來源未標註遊戲版本',
          },
        ],
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
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投不會發生作用 —— 它沒有解摔窗口。',
              en: 'The tech input does nothing against a command grab: there is no tech window to hit.',
              ja: '投げ抜けの入力はコマンド投げには作用しない。抜ける窓が存在しない。',
            },
          },
        ],
        mixRatio: '7-14%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '14-21%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08',
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
          {
            vs: 'throw',
            outcome: 'loss',
            orderDependent: true,
            note: {
              'zh-Hant': '這一格看起來跟起攻頁矛盾，其實不是：防禦硬直中的動力反攻要「正在防禦」才出得來。對手收手、走過來摔你，你根本不在硬直裡，這一手不存在。起身版才是打擊和摔投都擋得掉的那個。',
              en: 'This looks like it contradicts the oki page and does not: a Drive Reversal out of blockstun needs you to be in blockstun. If they stop hitting and walk up to throw, you are not in it, and the option does not exist. The wakeup version is the one that covers both.',
              ja: 'このマスは起き攻めのページと矛盾して見えるが違う。ガード硬直中のドライブリバーサルは、実際にガード硬直中でなければ出せない。相手が手を止めて歩いて投げに来れば硬直は無く、この択は存在しない。打撃と投げの両方に対応できるのは起き上がり版のほう。',
            },
          },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
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
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant': '後撞的一方贏 —— 反擊的窗口很寬，可以等到對方動力衝擊快結束才按。這裡是你先撞，所以他有整段時間看到並撞回來；反過來在「對手開了動力衝擊」那頁，先撞的是他，贏的是你。',
              en: 'The later Drive Impact wins — the counter window is wide enough to input yours at the very end of theirs. Here you commit first, so they have the whole animation to see it and hit back. On the "they used Drive Impact" page the order is reversed, and so is the result.',
              ja: '後から撃ったほうが勝つ。返しの受付は広く、相手のDIの終わり際でも間に合う。ここでは自分が先に撃つため、相手には見てから返す時間が丸ごとある。「相手がDIを撃った」ページでは順番が逆になり、結果も逆になる。',
            },
          },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體吃打擊，吃不了投。',
              en: 'Armour eats strikes, not throws.',
              ja: 'アーマーは打撃を吸うが投げは吸わない。',
            },
          },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
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
          { vs: 'low-overhead-mix', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '**每一隻角色都有 4 幀的小技**，比 5 幀的指令投先打到 —— 最便宜的答案。他延遲一拍，同一顆按鈕就變成他的確反。',
              en: '**Every character has a 4-frame light** and it hits before a 5-frame command grab — the cheapest answer there is. Delayed by a beat, the same button becomes their punish.',
              ja: '**全キャラが4Fの弱攻撃を持つ**ため、5Fのコマンド投げより先に当たる。最も安い対策だが、一拍遅らされれば同じボタンが確反の的になる。',
            },
          },
        ],
        mixRatio: '4%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '摔投 5F 發生、輕拳 4F；同一幀打擊優先於摔投，所以在 +1 以內出拳打得贏摔。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 5F 發生 / 1,200 傷害；各角色最快普通技的發生幀數見各角色頁',
          },
        ],
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
          { vs: 'delayed-attack', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
        {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投從你腳下落空，你原地落回他面前 —— 壓制被打斷，回到中立。',
            en: 'The throw whiffs under you and you come back down in front of them: the pressure is broken and you are back at neutral.',
            ja: '投げが足元を空振りし、そのまま目の前に落ちる。攻めが途切れて中立に戻る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '壓制沒有空隙就跳不出去，而起跳幀照地上判定 —— 他繼續壓，你就是站著挨打。',
            en: 'With no gap there is nothing to jump out of, and the prejump frames count as grounded: if they keep the string going, you are simply standing in it.',
            ja: '隙間が無ければ跳ぶこと自体ができず、前置きフレームは地上判定のまま。相手が連係を続ければ、ただ立って食らうだけになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '起跳的前置幀投不到 —— 只要壓制留的空隙夠你按出跳，摔就落空。',
              en: 'The prejump frames cannot be thrown, so as long as the gap is wide enough for the input, the throw whiffs.',
              ja: '跳び上がりの前置きフレームは投げられないため、連係の隙間が入力に足りていれば投げは空振りする。',
            },
          },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '一樣投不到，而且指令投抓空要站 60 幀上下 —— 你落地打得到。壓制中被指令投角色貼著的時候，這是回報最高的一手。',
              en: 'Equally unthrowable, and a whiffed command grab stands there for around sixty frames, so you land on it. Under pressure from a grappler this is the highest-paying option you have.',
              ja: '同じく投げられず、しかもコマ投げの空振りは60F前後立ちっぱなしになるため、着地して殴れる。コマ投げキャラに固められている状況では最もリターンの高い択。',
            },
          },
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定打到起跳幀，而且霸體讓你打不斷它。壓制中最不該跳的時候就是他有槽的時候。',
              en: 'Drive Impact hits the prejump frames as grounded, and the armour means you cannot interrupt it either. The worst moment to jump out is the moment they have the bar for this.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、しかもアーマーでこちらの割り込みも通らない。相手にゲージがある瞬間が、最も跳んではいけない瞬間になる。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上 —— 這一列的兩半都由這一句決定。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀；同一頁的普通前摔抓空 30 幀。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '只在讀到摔的時候用。壓制中跳是七個欄位裡只贏兩個的選擇，而那兩個剛好是你最怕的兩個。',
          en: 'Only on a throw read. Jumping out of pressure beats two of the seven columns — and those two happen to be the two you are most afraid of.',
          ja: '投げを読んだときだけの択。固めからのジャンプは7列のうち2列にしか勝てないが、その2つがちょうど最も怖い2つでもある。',
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
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '4-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://www.hotspawn.com/street-fighter/guide/street-fighter-6-how-to-play-defense',
            patch: '2026-08',
            note: '後衝刺帶投擲無敵並實際拉開距離，因此對退康有效。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '各角色後衝刺總幀數（本站角色面板的 backdashFrames 即來自此）',
          },
        ],
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
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'command-grab', 'low-overhead-mix', 'bait-block', 'drive-impact'],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '21-28%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽；槽耗盡即進入 Burnout，屆時無法使用任何動力技能，並會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為該招傷害的 25%，且可以致死；Burnout 中防禦硬直 +4F',
          },
        ],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '18-25%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '解摔輸入 LP+LK，成功的一方回復一格動力槽。來源未標註遊戲版本',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔判定為 9 幀窗口，且該窗口內若輸入了會妨礙站立摔的動作就不成立 —— 這是延遲解摔無法做成 OS 的原因。來源未標註遊戲版本',
          },
        ],
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
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投不會發生作用 —— 它沒有解摔窗口。',
              en: 'The tech input does nothing against a command grab: there is no tech window to hit.',
              ja: '投げ抜けの入力はコマンド投げには作用しない。抜ける窓が存在しない。',
            },
          },
        ],
        mixRatio: '7-14%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '14-21%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08',
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
          {
            vs: 'throw',
            outcome: 'loss',
            orderDependent: true,
            note: {
              'zh-Hant': '這一格看起來跟起攻頁矛盾，其實不是：防禦硬直中的動力反攻要「正在防禦」才出得來。對手收手、走過來摔你，你根本不在硬直裡，這一手不存在。起身版才是打擊和摔投都擋得掉的那個。',
              en: 'This looks like it contradicts the oki page and does not: a Drive Reversal out of blockstun needs you to be in blockstun. If they stop hitting and walk up to throw, you are not in it, and the option does not exist. The wakeup version is the one that covers both.',
              ja: 'このマスは起き攻めのページと矛盾して見えるが違う。ガード硬直中のドライブリバーサルは、実際にガード硬直中でなければ出せない。相手が手を止めて歩いて投げに来れば硬直は無く、この択は存在しない。打撃と投げの両方に対応できるのは起き上がり版のほう。',
            },
          },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
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
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant': '後撞的一方贏 —— 反擊的窗口很寬，可以等到對方動力衝擊快結束才按。這裡是你先撞，所以他有整段時間看到並撞回來；反過來在「對手開了動力衝擊」那頁，先撞的是他，贏的是你。',
              en: 'The later Drive Impact wins — the counter window is wide enough to input yours at the very end of theirs. Here you commit first, so they have the whole animation to see it and hit back. On the "they used Drive Impact" page the order is reversed, and so is the result.',
              ja: '後から撃ったほうが勝つ。返しの受付は広く、相手のDIの終わり際でも間に合う。ここでは自分が先に撃つため、相手には見てから返す時間が丸ごとある。「相手がDIを撃った」ページでは順番が逆になり、結果も逆になる。',
            },
          },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體吃打擊，吃不了投。',
              en: 'Armour eats strikes, not throws.',
              ja: 'アーマーは打撃を吸うが投げは吸わない。',
            },
          },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
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
          { vs: 'low-overhead-mix', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '**每一隻角色都有 4 幀的小技**，比 5 幀的指令投先打到 —— 最便宜的答案。他延遲一拍，同一顆按鈕就變成他的確反。',
              en: '**Every character has a 4-frame light** and it hits before a 5-frame command grab — the cheapest answer there is. Delayed by a beat, the same button becomes their punish.',
              ja: '**全キャラが4Fの弱攻撃を持つ**ため、5Fのコマンド投げより先に当たる。最も安い対策だが、一拍遅らされれば同じボタンが確反の的になる。',
            },
          },
        ],
        mixRatio: '4%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '摔投 5F 發生、輕拳 4F；同一幀打擊優先於摔投，所以在 +1 以內出拳打得贏摔。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 5F 發生 / 1,200 傷害；各角色最快普通技的發生幀數見各角色頁',
          },
        ],
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
          { vs: 'delayed-attack', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
        {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投落空，你原地落回原位。靠角時這比後跳好 —— 後跳把你推進角落，垂直跳不會。',
            en: 'The throw whiffs and you land where you were. Near the corner that beats a back jump, which would push you further into it.',
            ja: '投げが空振りし、元の位置に落ちる。画面端が近いときは後ろジャンプより良い——あちらは端に押し込まれる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '沒有空隙就跳不出去；起跳幀照地上判定，被打到就是往角落飛。',
            en: 'No gap, no jump; the prejump frames are grounded, and being hit here sends you towards the corner.',
            ja: '隙間が無ければ跳べず、前置きフレームは地上判定。ここで食らえば端へ運ばれる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '起跳的前置幀投不到 —— 只要壓制留的空隙夠你按出跳，摔就落空。',
              en: 'The prejump frames cannot be thrown, so as long as the gap is wide enough for the input, the throw whiffs.',
              ja: '跳び上がりの前置きフレームは投げられないため、連係の隙間が入力に足りていれば投げは空振りする。',
            },
          },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '一樣投不到，而且指令投抓空要站 60 幀上下 —— 你落地打得到。壓制中被指令投角色貼著的時候，這是回報最高的一手。',
              en: 'Equally unthrowable, and a whiffed command grab stands there for around sixty frames, so you land on it. Under pressure from a grappler this is the highest-paying option you have.',
              ja: '同じく投げられず、しかもコマ投げの空振りは60F前後立ちっぱなしになるため、着地して殴れる。コマ投げキャラに固められている状況では最もリターンの高い択。',
            },
          },
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定打到起跳幀，而且霸體讓你打不斷它。壓制中最不該跳的時候就是他有槽的時候。',
              en: 'Drive Impact hits the prejump frames as grounded, and the armour means you cannot interrupt it either. The worst moment to jump out is the moment they have the bar for this.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、しかもアーマーでこちらの割り込みも通らない。相手にゲージがある瞬間が、最も跳んではいけない瞬間になる。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上 —— 這一列的兩半都由這一句決定。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀；同一頁的普通前摔抓空 30 幀。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '靠角時後跳開始付出位置成本，垂直跳沒有。同樣是讀摔，這裡它比較便宜。',
          en: 'Near the corner a back jump starts costing position and this does not. On the same throw read it is the cheaper one.',
          ja: '画面端が近づくと後ろジャンプは位置を失い始めるが、こちらは失わない。同じ投げ読みならこちらが安い。',
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
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '4-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://www.hotspawn.com/street-fighter/guide/street-fighter-6-how-to-play-defense',
            patch: '2026-08',
            note: '後衝刺帶投擲無敵並實際拉開距離，因此對退康有效。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '各角色後衝刺總幀數（本站角色面板的 backdashFrames 即來自此）',
          },
        ],
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
    opponentOptions: ['blockstring', 'delayed-attack', 'throw', 'command-grab', 'low-overhead-mix', 'bait-block', 'drive-impact'],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '22-30%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽；槽耗盡即進入 Burnout，屆時無法使用任何動力技能，並會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為該招傷害的 25%，且可以致死；Burnout 中防禦硬直 +4F',
          },
        ],
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '19-26%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
            note: '解摔輸入 LP+LK，成功的一方回復一格動力槽。來源未標註遊戲版本',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '解摔判定為 9 幀窗口，且該窗口內若輸入了會妨礙站立摔的動作就不成立 —— 這是延遲解摔無法做成 OS 的原因。來源未標註遊戲版本',
          },
        ],
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
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投不會發生作用 —— 它沒有解摔窗口。',
              en: 'The tech input does nothing against a command grab: there is no tech window to hit.',
              ja: '投げ抜けの入力はコマンド投げには作用しない。抜ける窓が存在しない。',
            },
          },
        ],
        mixRatio: '7-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、命中 +17，血量基準 10,000',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Technical',
            patch: '2026-08',
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
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '15-22%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08',
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
          {
            vs: 'throw',
            outcome: 'loss',
            orderDependent: true,
            note: {
              'zh-Hant': '這一格看起來跟起攻頁矛盾，其實不是：防禦硬直中的動力反攻要「正在防禦」才出得來。對手收手、走過來摔你，你根本不在硬直裡，這一手不存在。起身版才是打擊和摔投都擋得掉的那個。',
              en: 'This looks like it contradicts the oki page and does not: a Drive Reversal out of blockstun needs you to be in blockstun. If they stop hitting and walk up to throw, you are not in it, and the option does not exist. The wakeup version is the one that covers both.',
              ja: 'このマスは起き攻めのページと矛盾して見えるが違う。ガード硬直中のドライブリバーサルは、実際にガード硬直中でなければ出せない。相手が手を止めて歩いて投げに来れば硬直は無く、この択は存在しない。打撃と投げの両方に対応できるのは起き上がり版のほう。',
            },
          },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'bigWin' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '動力反攻消耗兩格，發生時全程無敵、破霸體；防禦硬直中發生 20F、起身時 18F，被擋 −6（對手 Burnout 時 −2），傷害 500 且為白血無法收頭。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
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
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant': '後撞的一方贏 —— 反擊的窗口很寬，可以等到對方動力衝擊快結束才按。這裡是你先撞，所以他有整段時間看到並撞回來；反過來在「對手開了動力衝擊」那頁，先撞的是他，贏的是你。',
              en: 'The later Drive Impact wins — the counter window is wide enough to input yours at the very end of theirs. Here you commit first, so they have the whole animation to see it and hit back. On the "they used Drive Impact" page the order is reversed, and so is the result.',
              ja: '後から撃ったほうが勝つ。返しの受付は広く、相手のDIの終わり際でも間に合う。ここでは自分が先に撃つため、相手には見てから返す時間が丸ごとある。「相手がDIを撃った」ページでは順番が逆になり、結果も逆になる。',
            },
          },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體吃打擊，吃不了投。',
              en: 'Armour eats strikes, not throws.',
              ja: 'アーマーは打撃を吸うが投げは吸わない。',
            },
          },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
        {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投落空，你落回原地。角落沒有拿走它任何東西 —— 它本來就不靠位移。',
            en: 'The throw whiffs and you land where you started. The corner takes nothing from this one, because it never used any ground.',
            ja: '投げが空振りし、元の位置に着地する。この択は移動を使わないので、画面端でも失うものが無い。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '角落的壓制空隙最少，起跳幀又照地上判定 —— 猜錯就是在角落挨一整套。',
            en: 'The corner is where the gaps are thinnest and the prejump frames are still grounded: guess wrong and you eat a full combo with nowhere to go.',
            ja: '画面端は隙間が最も薄く、前置きフレームは地上判定のまま。読み負ければ逃げ場のないままフルコンボを食らう。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '起跳的前置幀投不到 —— 只要壓制留的空隙夠你按出跳，摔就落空。',
              en: 'The prejump frames cannot be thrown, so as long as the gap is wide enough for the input, the throw whiffs.',
              ja: '跳び上がりの前置きフレームは投げられないため、連係の隙間が入力に足りていれば投げは空振りする。',
            },
          },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '一樣投不到，而且指令投抓空要站 60 幀上下 —— 你落地打得到。壓制中被指令投角色貼著的時候，這是回報最高的一手。',
              en: 'Equally unthrowable, and a whiffed command grab stands there for around sixty frames, so you land on it. Under pressure from a grappler this is the highest-paying option you have.',
              ja: '同じく投げられず、しかもコマ投げの空振りは60F前後立ちっぱなしになるため、着地して殴れる。コマ投げキャラに固められている状況では最もリターンの高い択。',
            },
          },
          { vs: 'blockstring', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'drive-impact',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定打到起跳幀，而且霸體讓你打不斷它。壓制中最不該跳的時候就是他有槽的時候。',
              en: 'Drive Impact hits the prejump frames as grounded, and the armour means you cannot interrupt it either. The worst moment to jump out is the moment they have the bar for this.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、しかもアーマーでこちらの割り込みも通らない。相手にゲージがある瞬間が、最も跳んではいけない瞬間になる。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上 —— 這一列的兩半都由這一句決定。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀；同一頁的普通前摔抓空 30 幀。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '後跳在角落等於不能用，垂直跳的評價完全沒變 —— 角落唯一還在的跳。對指令投角色來說，這裡也是最該用它的地方。',
          en: 'A back jump is unusable cornered and this grade does not move — it is the only jump left. Against a grappler the corner is also where it matters most.',
          ja: '後ろジャンプは画面端で使えなくなるが、この評価は動かない。端に残る唯一のジャンプであり、コマ投げキャラ相手ならここが最も重要な場所でもある。',
        },
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
          { vs: 'low-overhead-mix', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '**每一隻角色都有 4 幀的小技**，比 5 幀的指令投先打到 —— 最便宜的答案。他延遲一拍，同一顆按鈕就變成他的確反。',
              en: '**Every character has a 4-frame light** and it hits before a 5-frame command grab — the cheapest answer there is. Delayed by a beat, the same button becomes their punish.',
              ja: '**全キャラが4Fの弱攻撃を持つ**ため、5Fのコマンド投げより先に当たる。最も安い対策だが、一拍遅らされれば同じボタンが確反の的になる。',
            },
          },
        ],
        mixRatio: '4%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '摔投 5F 發生、輕拳 4F；同一幀打擊優先於摔投，所以在 +1 以內出拳打得贏摔。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 5F 發生 / 1,200 傷害；各角色最快普通技的發生幀數見各角色頁',
          },
        ],
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
          { vs: 'delayed-attack', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '無敵技在防禦中幾乎沒有位置。要脫身請用動力反攻。',
          en: 'The reversal has almost no place inside blockstun. Drive Reversal is the escape tool here.',
          ja: 'ガード中に無敵技の出番はほぼない。抜けたいならドライブリバーサルを使う。',
        },
      },
    ],
  },
]
