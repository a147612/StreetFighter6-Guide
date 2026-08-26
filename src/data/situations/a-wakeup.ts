import type { Situation } from '../schema'

/**
 * Group A — waking up, by position.
 *
 * The situation axis is position and nothing else. What the opponent favours is
 * not a situation: it is a column of the matrix. If you know they keep
 * shimmying, read down the 退康 column here rather than switching pages.
 *
 * Everything is `estimated`: qualitative reads and damage bands, not frame
 * data. Health costs are bands of your own bar assuming a competent punish.
 */
export const GROUP_A: Situation[] = [
  {
    id: 'a1-midscreen-wakeup',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '場中倒地',
      en: 'Midscreen wakeup',
      ja: '画面中央でダウン',
    },
    position: ['midscreen'],
    distance: 'pointBlank',
    stance: 'iAmDown',
    opponentOptions: ['meaty', 'throw', 'command-grab', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'back-rise',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '往後翻一段再起身。對手算好貼身位置的壓起身會構不到，他得重新走進來 —— 走進來的那幾幀就是你的。',
            en: 'You roll back and stand up further away. A meaty spaced for where you fell no longer reaches, and they have to walk in — those walking frames are yours.',
            ja: '後方に転がってから起き上がる。倒れた位置に合わせて重ねた攻撃は届かなくなり、相手は歩いて詰め直すしかない。その数フレームがこちらの時間になる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手的壓起身本來就是照後受身的距離設定的，那你只是換個地方吃同一套。',
            en: 'If their setup was already spaced for a back rise, you have moved to a different spot and eaten the same combo.',
            ja: '相手が最初から後ろ受け身の距離で重ねていた場合、位置が変わっただけで同じコンボを食らう。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '多數壓起身是照倒地位置抓的距離，後受身之後就構不到。',
              en: 'Most meaties are spaced for where you fell and simply do not reach after a back rise.',
              ja: '多くの重ねは倒れた位置基準の間合いで、後ろ受け身後には届かない。',
            },
          },
          { vs: 'throw', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'even' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '指令投的距離比普通摔還短。後受身把你放到他構不到的地方，他得先走回來 —— 走的那幾幀你看得到。',
              en: 'A command grab reaches even less far than a normal throw. A back rise puts you outside it and he has to walk back in, and those walking frames are visible.',
              ja: 'コマンド投げの間合いは通常投げよりさらに短い。後ろ受け身で届かない位置に離れれば、相手は歩いて詰め直すしかなく、その数フレームは見える。',
            },
          },
        ],
        mixRatio: '60-80%',
        notes: {
          'zh-Hant': '起身的時間點是固定的 —— 後受身不會讓你晚起來，它只把你放到更後面。所以它不是時間差的猜拳，是換位置：能換到空間的時候幾乎都該按。',
          en: 'The rise timing is fixed: a back rise does not make you get up later, it puts you further away. So it is not a timing mixup, it is a positional trade — and where there is room to take, it is close to free.',
          ja: '起き上がりのタイミングは固定で、後ろ受け身は遅く起きるのではなく、より後ろに置かれるだけ。つまりタイミングの読み合いではなく位置の取引であり、下がる space がある限りほぼ無料に近い。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'normal-rise',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '在倒下的位置起身。位置不變，對手的起攻設定照他算的走 —— 你放棄的是距離，換到的是不會把自己往牆送。',
            en: 'You get up where you fell. Position unchanged and their setup runs as planned — you give up distance and in exchange you do not feed yourself towards the wall.',
            ja: '倒れた位置で起き上がる。位置は変わらず相手の起き攻めは計算通りに進むが、自ら壁側へ動かずに済む。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手的壓起身就是照這個位置設計的，你等於照著他的劇本起身。',
            en: 'Their meaty is spaced for exactly this position; you have stood up into the script.',
            ja: '相手の重ねはまさにこの位置に合わせてあり、台本通りに起き上がることになる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'even' },
        ],
        mixRatio: '20-40%',
        notes: {
          'zh-Hant': 'SF6 沒有延遲起身 —— 起身時間是固定的，唯一的選擇是原地或往後。所以這一格不是「等他招空」，而是「不換位置」。',
          en: 'There is no delayed wakeup in SF6: the timing is fixed and the only choice is here or further back. So this row is not "wait for their setup to whiff", it is "decline the positional trade".',
          ja: 'SF6に遅起きは存在せず、タイミングは固定で選べるのはその場か後方かだけ。したがってこの択は「相手の重ねを空振らせる」ではなく「位置の取引を断る」である。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '打擊全部擋下，退康和延遲打擊完全落空。沒拿到東西，也沒交出血量。',
            en: 'Every strike is blocked; shimmy and delayed attacks whiff entirely. You gain nothing and lose nothing.',
            ja: '打撃は全てガードし、シミーも遅らせ打撃も空振りする。何も得ず、何も失わない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔。傷害固定且低，但對手保住主導權，而且會開始多摔。',
            en: 'Thrown. Fixed, small damage, but they keep the turn and will start weighting throws higher.',
            ja: '投げられる。ダメージは固定かつ軽いが、相手は攻めを継続し、以降は投げを増やしてくる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          {
            vs: 'shimmy',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康對不出手的人完全沒有威脅。你一停手，他就得改回摔投。',
              en: 'A shimmy threatens nothing against someone who does not press. Stop, and they have to go back to throwing.',
              ja: 'シミーは押してこない相手に何の脅威も与えない。止めれば相手は投げに戻らざるを得ない。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '12-19%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 1,200 傷害 / 5F 發生 / 命中 +17，血量基準 10,000（Akuma 9,000～Zangief 11,000）',
          },
        ],
        notes: {
          'zh-Hant': '最被低估的一手。失敗代價固定又低 —— 對手用摔投磨你，比一套連段慢得多。',
          en: 'The most underrated answer. Its failure cost is fixed and small: grinding you down with throws is far slower than one combo.',
          ja: '最も過小評価されている一手。失敗時の代償が固定かつ小さく、投げで削るのはコンボ一発よりはるかに遅い。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '晚一點按，壓起身先被你擋下，摔投還來得及解。一次覆蓋兩個最常見的選擇。',
            en: 'Teching late means the meaty is blocked first while a throw still breaks. It covers the two most common choices at once.',
            ja: '入力を遅らせることで重ねはガードでき、投げには間に合う。最も多い二択の両方を同時にカバーする。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也把打擊延遲了，正好打在你按解摔的那一刻。counter hit，傷害和連段長度都上一階。',
            en: 'They delayed too, landing on your tech input — a counter hit, raising both damage and combo length a tier.',
            ja: '相手も遅らせており、投げ抜けの入力に重なる。カウンターヒットとなりダメージもコンボも一段上がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '延遲解摔一樣解不掉，而且延遲多出來的那段站立時間正好是他抓的時間。',
              en: 'A delay tech is equally useless, and the extra standing frames the delay spends are exactly the frames he grabs in.',
              ja: '遅らせ投げ抜けも同様に無効で、遅らせた分の立ち時間がそのまま掴まれる時間になる。',
            },
          },
        ],
        mixRatio: '19-25%',
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
            'zh-Hant': '摔投被解開，雙方分開一小段，重置回中立。',
            en: 'The throw is broken, you separate slightly, and the reset is neutral.',
            ja: '投げを抜けて少し距離が離れ、状況はニュートラルに戻る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，而是後退看你按。解摔有硬直，你吃到完整懲罰。',
            en: 'They did not throw; they walked back and watched you press. The tech has recovery, so you eat a full punish.',
            ja: '相手は投げずに下がって見ていた。投げ抜けには硬直があり、フルコンボの反撃を受ける。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投完全不會發生作用 —— 它沒有解摔窗口。這一格是指令投角色跟其他人最大的差別：對別人最划算的防守猜測，對他等於沒按。',
              en: 'The tech input does nothing at all against a command grab, because there is no tech window to hit. This cell is the whole difference between a grappler and everyone else: the defensive guess that pays best against the rest of the cast is a button you did not press.',
              ja: '投げ抜けの入力はコマンド投げに対して一切作用しない。抜ける窓が存在しないからである。このマスがコマ投げキャラとそれ以外の決定的な差で、他キャラ相手に最も得な防御択が、ここでは押していないのと同じになる。',
            },
          },
        ],
        mixRatio: '9-16%',
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
            'zh-Hant': '擋下打擊並回一點動力槽。時機夠準會變成完美撥擋，對手大幅硬直，直接反打一套。',
            en: 'Absorbs the strike and returns some Drive. Tight enough and it becomes a Perfect Parry: a full punish.',
            ja: '打撃を受け止めてドライブを回復する。タイミングが合えばパーフェクトパリィとなりフルコンボが入る。',
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
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '12-19%',
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
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下打擊再反擊。對手被撞飛，靠牆就是撞牆接完整連段。',
            en: 'Armour eats the strike and hits back. They get launched, and near a wall that is a wall splat into a full combo.',
            ja: 'アーマーで打撃を受け止めて反撃する。相手は吹き飛び、壁が近ければ壁やられからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。在牆邊被反撞是最糟的結果。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact. Being counter-impacted near a wall is the worst case.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。画面端で相打ちDIを返されるのが最悪。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '對打擊特別有效，包含用動力箭步衝進來接的那一下 —— 對手花格買到的就是「打擊更快到」，而霸體專門吃打擊。',
              en: 'Especially good against strikes, including one set up by a Drive Rush: what the bar bought is a faster strike, and armour is built to eat strikes.',
              ja: '打撃全般に強く、ドライブラッシュから繋げる打撃にも有効。ゲージで買ったのは「速く届く打撃」であり、アーマーは打撃を食べるためにある。',
            },
          },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體擋打擊，擋不了投 —— 動力衝擊在這裡是被抓的最貴的一種方式。',
              en: 'Armour stops strikes, not throws. Drive Impact here is the most expensive way there is to be grabbed.',
              ja: 'アーマーは打撃を止めるが投げは止めない。ここでのドライブインパクトは最も高くつく掴まれ方になる。',
            },
          },
        ],
        mixRatio: '6-9%',
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
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '無敵起身把對手打倒推開，回合強制結束，兩人回到中距離重來。',
            en: 'An invincible wakeup that knocks them down and shoves them off: their turn ends and you restart from neutral.',
            ja: '無敵の起き上がりで相手を打ち倒して押し返す。相手の攻めは終わり、中距離から仕切り直しになる。',
          },
          followUp: 'neutral',
          damageBand: '5%（白血）',
        },
        onFail: {
          text: {
            'zh-Hant': '對手不出手直接防禦，動力反攻被擋是 −6，確定被反擊 —— 兩格花掉還倒賠一套。',
            en: 'They just block. A blocked Drive Reversal is -6 and gets punished for certain: two bars spent and a combo taken.',
            ja: '相手が手を出さずガードするだけで、ドライブリバーサルは−6の確定反撃。2ゲージを使った上にコンボを食らう。',
          },
          hpLoss: '30-45%',
          driveLoss: 2,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '發生 18 幀全程無敵，壓起身的打擊穿不過去。但正因為慢，對手用硬直短的招壓（詐欺重ね）就來得及擋回來。',
              en: 'Eighteen frames, invincible throughout: a meaty strike cannot get through. But slow is why a low-recovery meaty (a safe meaty) lets them recover and block it.',
              ja: '発生18Fの間ずっと無敵で、重ねた打撃は通らない。ただし遅いぶん、硬直の短い技で重ねられる（いわゆる詐欺重ね）とガードが間に合う。',
            },
          },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '無敵也擋摔投。這是沒有 OD 起身反擊的角色唯一能同時擋掉打擊和摔投的手段。',
              en: 'The invincibility covers throws too. For a character with no OD wakeup escape, this is the only option that answers both the strike and the throw.',
              ja: '無敵は投げにも有効。OD切り返しを持たないキャラにとって、打撃と投げの両方に対応できる唯一の択。',
            },
          },
          {
            vs: 'shimmy',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手退開，動力反攻打空。這招整體動作很長，空揮的懲罰時間夠對手跳進來打一套。',
              en: 'They walk back and it whiffs. The whole motion is long, and a whiffed one leaves enough time for a jump-in combo.',
              ja: '相手が下がって空振り。全体動作が長く、空振り時は飛び込みからコンボを入れられるほどの隙になる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '3-6%',
        notes: {
          'zh-Hant': '常被誤會成「只有防禦中能用」。起身時也出得來，發生還快兩幀（18F）。代價是兩格、被擋 −6，而且傷害是白血 —— 它買的是脫身，不是傷害。',
          en: 'Widely believed to be blockstun-only. It exists on wakeup too, and is two frames faster there (18F). The price is two bars, -6 on block, and white damage only: what it buys is an escape, not damage.',
          ja: 'ガード中専用と誤解されがちだが、起き上がりでも出せて発生は2F速い（18F）。代償は2ゲージ、ガードされて−6、しかも白ダメージ。買えるのは脱出であってダメージではない。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F（防禦硬直中為 20F），發生時全程無敵且破霸體，被擋 −6（對手 Burnout 時 −2），傷害 500 白血無法收頭，消耗兩格。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
            note: '確認起身動力反攻存在，並說明用小技接 SA 的 OS 可以釣它',
          },
        ],
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '躲過摔投和大部分近身打擊，而且真的拉開了距離，回到中距離重新開始。',
            en: 'Dodges the throw and most close attacks, and actually gains ground — back to neutral range.',
            ja: '投げとほとんどの近距離打撃を避けつつ実際に距離を取れ、中距離から再開できる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後衝刺沒有無敵、收招長。壓起身或延遲打擊會抓到你落地那段，通常是 counter hit。',
            en: 'No invincibility, long recovery. A meaty or delayed attack catches the tail of it, usually as a counter hit.',
            ja: '無敵はなく硬直も長い。重ねや遅らせ打撃に着地部分を狩られ、多くはカウンターヒットになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '後衝刺的無敵幀吃得下指令投，而且它距離短 —— 退出去就是空揮。躲得掉，但換不到傷害。',
              en: 'The backdash is invincible through it, and a command grab is short-ranged: leaving the range makes it a whiff. It escapes, and buys nothing else.',
              ja: 'バックダッシュの無敵で回避でき、間合いも短いので離れれば空振りになる。逃げられるが、それ以上の見返りは無い。',
            },
          },
        ],
        mixRatio: '6-9%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://www.hotspawn.com/street-fighter/guide/street-fighter-6-how-to-play-defense',
            patch: '2026-08',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '後衝刺有投擲無敵，而且退開之後對手的退康懲罰也構不到 —— 對付愛用退康的對手，這是場中最有效的一手。角落沒有空間，這個優勢就消失了。',
          en: 'A backdash is throw-invincible and takes you out of range, so a shimmy has nothing left to punish. Against a shimmy-heavy opponent it is the strongest midscreen answer. Cornered there is no ground to gain, and that advantage disappears.',
          ja: 'バックダッシュは投げ無敵を持ち、下がることでシミーの狩りも届かなくなる。シミーを多用する相手には画面中央で最も有効な一手。画面端では下がる空間がなく、その利点は消える。',
        },
      },
      {
        optionId: 'jump-forward',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '跳過對手落到他背後，摔投和下段全部落空，場地位置重置。',
            en: 'Jumps over and lands behind; the throw and every low whiff, and the positions reset.',
            ja: '相手を飛び越えて背後に着地し、投げも下段も空振りして位置がリセットされる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '起跳被看到就是確定對空 —— 空中不能防禦，而且對空通常能接連段。',
            en: 'A jump they see is a guaranteed anti-air: you cannot block in the air, and anti-airs usually convert.',
            ja: 'ジャンプを見られれば対空が確定する。空中はガードできず、対空からコンボにも繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'loss',
            note: {
              'zh-Hant': '對手退康時已經退開並在看你，反而更有餘裕對空。跳過去撞上一個正在觀察的對手，不是好交換。',
              en: 'A shimmying opponent has already stepped back and is watching, which gives them more time to anti-air, not less. Jumping into someone who is observing is a bad trade.',
              ja: 'シミー中の相手は既に下がって様子を見ており、対空する余裕がむしろ増えている。観察している相手に跳び込むのは分の悪い交換。',
            },
          },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '3-6%',
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
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。',
        },
      },
      {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投從你腳下落空，你原地落回他面前 —— 他還在硬直裡，你已經站著了。',
            en: 'The throw passes under you and you come straight back down in front of them: still inside their recovery, and you are already standing.',
            ja: '投げが足元を空振りし、そのまま相手の目の前に落ちる。相手はまだ硬直中で、こちらは既に立っている。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '前置幀投不到，但打擊照地上判定 —— 壓起身直接把起跳打斷。被看到就是確定對空，而對空通常接得到連段。',
            en: 'The prejump frames cannot be thrown, but strikes still treat them as grounded: a meaty hits the jump out of the ground. Seen, it is a guaranteed anti-air, and anti-airs usually convert.',
            ja: '前置きフレームは投げられないが、打撃は地上判定のままなので、重ねはそのまま跳び上がりを潰す。見られれば対空が確定し、対空はたいていコンボに繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '普通摔投抓空只有 30 幀，你落地時他已經恢復了 —— 躲掉，僅此而已。指令投抓空是 60 幀上下，那才是落地還打得到的情況。',
              en: 'A whiffed normal throw is only 30 frames and they have recovered by the time you land — you escaped, and that is all. A whiffed command grab is around 60, and that is the version you land on top of.',
              ja: '通常投げの空振りは30Fしかなく、着地する頃には相手は回復している——避けただけ。コマ投げの空振りは60F前後で、そちらが着地して殴れる側になる。',
            },
          },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投是 60 幀上下的硬直，你落地時他還在裡面 —— 這是全表唯一「躲掉之後還能拿一套」的格子。',
              en: 'A whiffed command grab is around sixty frames of recovery and you land while he is still inside it. This is the one cell on the page where escaping also pays.',
              ja: '空振りしたコマンド投げの硬直は60F前後で、着地したとき相手はまだその中にいる。この表で唯一、避けたうえにリターンまで取れるマス。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀（恢復 54）。瑪濃 Manège Doré 60 幀、E.本田 Oicho 61 幀、傑米 Tenshin 61 幀、艾力克斯 Power Bomb 61 幀、莉莉 Mexican Typhoon 恢復 53 幀。同一頁的普通前摔抓空是 30 幀 —— 兩倍的差距就是垂直跳落地還打得到的原因。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/ryu',
            patch: '2026-08',
            note: 'Prejump Frames — 4（桑吉爾夫與莉莉是 5）。這幾幀算空中、投不到，但打擊照地上判定 —— 所以壓起身打得到，摔投打不到。摔投發生 5 幀，起身按著跳的話投永遠慢一步。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '只在讀到摔投的時候用。對面不是指令投角色的話，它比後跳好不了多少 —— 差別全部來自對方抓空要站多久。',
          en: 'Only worth pressing on a throw read. Against anyone without a command grab it is barely better than a back jump — the entire difference is how long their whiff leaves them standing there.',
          ja: '投げを読んだときにだけ出す択。コマ投げを持たない相手には後ろジャンプとほとんど変わらない。差はすべて、相手の空振りが何F立ちっぱなしになるかで決まる。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打斷摔投或還沒發動的動力箭步，換到一點傷害和一次分開。',
            en: 'Interrupts a throw or a Drive Rush that has not started, for small damage and a separation.',
            ja: '投げや発動前のドライブラッシュを潰し、少量のダメージと距離を得る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '被壓起身吃掉，輕攻擊還沒出來就 counter hit 接完整連段。',
            en: 'Stuffed by the meaty; your light never came out — counter hit into a full combo.',
            ja: '重ねに潰され、弱攻撃は出る前にカウンターヒットからフルコンボ。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '壓起身一定比你的輕攻擊先到 —— 這不是機率問題，是順序問題。',
              en: 'The meaty is out before your light by construction. This is not a probability, it is an ordering.',
              ja: '重ねは構造上こちらの弱攻撃より先に出る。確率ではなく順序の問題。',
            },
          },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'even',
            note: {
              'zh-Hant': '要打得到才算。對手退得夠遠，你的輕攻擊就是落空，接著被懲罰。',
              en: 'Only counts if it reaches. Back far enough and your light whiffs, and the punish follows.',
              ja: '届いてこその択。相手が十分下がっていれば弱攻撃は空振りし、そのまま狩られる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 最便宜的答案。但不是每隻都這麼快（桑吉爾夫自己的要 7 幀），選了角色會顯示你的實際數字。而且他只要延遲一拍，你的速點就變成他的確反。',
              en: 'The fastest light is usually 4 or 5 frames and beats a 5-frame command grab, which makes it the cheapest answer there is. Not every character is that fast — Zangief\'s own is 7 — and picking one shows your actual number. Delay the grab by a beat and your mash becomes his punish.',
              ja: '最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。最も安い対策だが、全キャラがその速さではなく（ザンギエフ自身は7F）、キャラを選べば実際の数字が出る。さらに一拍遅らされれば、暴れがそのまま確反の的になる。',
            },
          },
        ],
        mixRatio: '3-6%',
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
          'zh-Hant': '低頻。價值不在勝率，而在於讓對手不敢無限延遲 —— 完全不按的人會被延遲打擊吃掉所有解摔。',
          en: 'Keep it rare. The value is not the win rate but the threat: never pressing lets them delay forever and eat every tech you have.',
          ja: '低頻度で。価値は勝率ではなく抑止力にある。まったく暴れなければ、無限に遅らされて投げ抜けを全て狩られる。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投，把對手打飛。這是唯一能一次解決位置問題的選項。',
            en: 'Goes through both the strike and the throw and launches them — the only option that solves the position in one action.',
            ja: '打撃も投げも貫通して相手を打ち上げる。位置の問題を一手で解決できる唯一の択。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防或乾脆不出手，看著它落空。punish counter，遊戲裡最重的懲罰之一。',
            en: 'They blocked, or simply did not attack, and watched it whiff — punish counter, one of the heaviest penalties in the game.',
            ja: 'ガードされる、あるいは何もされず空振りを見られる。パニッシュカウンターとなり最も重い代償を払う。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigWin' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        mixRatio: '3-6%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '不是所有角色都有；有些只能靠無敵 SA。低頻使用，價值在於讓對手不敢無腦壓。',
          en: 'Not every character has one; some only get it from an invincible Super Art. Use it rarely — the value is making them hesitate.',
          ja: '全キャラが持つわけではなく、無敵SAでしか出せないキャラもいる。低頻度で、相手を躊躇わせる点に価値がある。',
        },
      },
    ],
  },
  {
    id: 'a2-near-corner-wakeup',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '靠角倒地',
      en: 'Near-corner wakeup',
      ja: '画面端寄りでダウン',
    },
    position: ['nearCorner'],
    distance: 'pointBlank',
    stance: 'iAmDown',
    opponentOptions: ['meaty', 'throw', 'command-grab', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'back-rise',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '往後翻，離牆更近但也離對手更遠。多數壓起身的距離會落空，他得重新走進來。',
            en: 'You roll back — closer to the wall, but further from them. Most meaty spacings miss and they have to walk back in.',
            ja: '後方に転がる。壁には近づくが相手からは離れ、多くの重ねの間合いは外れて相手は詰め直すことになる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '往後翻的方向就是牆。距離換到了，但下一次倒地你就是角落起身。',
            en: 'The direction you roll is towards the wall. You bought spacing and paid for it with the corner next time you go down.',
            ja: '転がる方向は壁側。間合いは得られるが、次にダウンしたときは画面端からの起き上がりになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'even' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '指令投的距離比普通摔還短。後受身把你放到他構不到的地方，他得先走回來 —— 走的那幾幀你看得到。',
              en: 'A command grab reaches even less far than a normal throw. A back rise puts you outside it and he has to walk back in, and those walking frames are visible.',
              ja: 'コマンド投げの間合いは通常投げよりさらに短い。後ろ受け身で届かない位置に離れれば、相手は歩いて詰め直すしかなく、その数フレームは見える。',
            },
          },
        ],
        mixRatio: '40-60%',
        notes: {
          'zh-Hant': '這裡的取捨最明顯：後受身換到的距離是真的，但你把自己往牆邊送。想守住位置就原地起身，想斷掉這一次起攻就後受身。',
          en: 'The trade is at its sharpest here. The distance is real, but you are feeding yourself to the wall. Normal rise to hold position, back rise to break this one setup.',
          ja: 'ここが最も分かりやすい取引。距離は本物だが自ら壁に近づく。位置を守るならその場、この起き攻めを切るなら後ろ受け身。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'normal-rise',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '在倒下的位置起身。位置不變，對手的起攻設定照他算的走 —— 你放棄的是距離，換到的是不會把自己往牆送。',
            en: 'You get up where you fell. Position unchanged and their setup runs as planned — you give up distance and in exchange you do not feed yourself towards the wall.',
            ja: '倒れた位置で起き上がる。位置は変わらず相手の起き攻めは計算通りに進むが、自ら壁側へ動かずに済む。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手的壓起身就是照這個位置設計的，你等於照著他的劇本起身。',
            en: 'Their meaty is spaced for exactly this position; you have stood up into the script.',
            ja: '相手の重ねはまさにこの位置に合わせてあり、台本通りに起き上がることになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'even' },
        ],
        mixRatio: '40-60%',
        notes: {
          'zh-Hant': 'SF6 沒有延遲起身 —— 起身時間是固定的，唯一的選擇是原地或往後。所以這一格不是「等他招空」，而是「不換位置」。',
          en: 'There is no delayed wakeup in SF6: the timing is fixed and the only choice is here or further back. So this row is not "wait for their setup to whiff", it is "decline the positional trade".',
          ja: 'SF6に遅起きは存在せず、タイミングは固定で選べるのはその場か後方かだけ。したがってこの択は「相手の重ねを空振らせる」ではなく「位置の取引を断る」である。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '打擊全部擋下，退康和延遲打擊完全落空。沒拿到東西，也沒交出血量。',
            en: 'Every strike is blocked; shimmy and delayed attacks whiff entirely. You gain nothing and lose nothing.',
            ja: '打撃は全てガードし、シミーも遅らせ打撃も空振りする。何も得ず、何も失わない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔。傷害固定且低，但對手保住主導權，而且會開始多摔。',
            en: 'Thrown. Fixed, small damage, but they keep the turn and will start weighting throws higher.',
            ja: '投げられる。ダメージは固定かつ軽いが、相手は攻めを継続し、以降は投げを増やしてくる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          {
            vs: 'shimmy',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康對不出手的人完全沒有威脅。你一停手，他就得改回摔投。',
              en: 'A shimmy threatens nothing against someone who does not press. Stop, and they have to go back to throwing.',
              ja: 'シミーは押してこない相手に何の脅威も与えない。止めれば相手は投げに戻らざるを得ない。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '12-19%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 1,200 傷害 / 5F 發生 / 命中 +17，血量基準 10,000（Akuma 9,000～Zangief 11,000）',
          },
        ],
        notes: {
          'zh-Hant': '最被低估的一手。失敗代價固定又低 —— 對手用摔投磨你，比一套連段慢得多。',
          en: 'The most underrated answer. Its failure cost is fixed and small: grinding you down with throws is far slower than one combo.',
          ja: '最も過小評価されている一手。失敗時の代償が固定かつ小さく、投げで削るのはコンボ一発よりはるかに遅い。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '晚一點按，壓起身先被你擋下，摔投還來得及解。一次覆蓋兩個最常見的選擇。',
            en: 'Teching late means the meaty is blocked first while a throw still breaks. It covers the two most common choices at once.',
            ja: '入力を遅らせることで重ねはガードでき、投げには間に合う。最も多い二択の両方を同時にカバーする。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也把打擊延遲了，正好打在你按解摔的那一刻。counter hit，傷害和連段長度都上一階。',
            en: 'They delayed too, landing on your tech input — a counter hit, raising both damage and combo length a tier.',
            ja: '相手も遅らせており、投げ抜けの入力に重なる。カウンターヒットとなりダメージもコンボも一段上がる。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '延遲解摔一樣解不掉，而且延遲多出來的那段站立時間正好是他抓的時間。',
              en: 'A delay tech is equally useless, and the extra standing frames the delay spends are exactly the frames he grabs in.',
              ja: '遅らせ投げ抜けも同様に無効で、遅らせた分の立ち時間がそのまま掴まれる時間になる。',
            },
          },
        ],
        mixRatio: '19-25%',
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
            'zh-Hant': '摔投被解開，雙方分開一小段，重置回中立。',
            en: 'The throw is broken, you separate slightly, and the reset is neutral.',
            ja: '投げを抜けて少し距離が離れ、状況はニュートラルに戻る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，而是後退看你按。解摔有硬直，你吃到完整懲罰。',
            en: 'They did not throw; they walked back and watched you press. The tech has recovery, so you eat a full punish.',
            ja: '相手は投げずに下がって見ていた。投げ抜けには硬直があり、フルコンボの反撃を受ける。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投完全不會發生作用 —— 它沒有解摔窗口。這一格是指令投角色跟其他人最大的差別：對別人最划算的防守猜測，對他等於沒按。',
              en: 'The tech input does nothing at all against a command grab, because there is no tech window to hit. This cell is the whole difference between a grappler and everyone else: the defensive guess that pays best against the rest of the cast is a button you did not press.',
              ja: '投げ抜けの入力はコマンド投げに対して一切作用しない。抜ける窓が存在しないからである。このマスがコマ投げキャラとそれ以外の決定的な差で、他キャラ相手に最も得な防御択が、ここでは押していないのと同じになる。',
            },
          },
        ],
        mixRatio: '9-16%',
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
            'zh-Hant': '擋下打擊並回一點動力槽。時機夠準會變成完美撥擋，對手大幅硬直，直接反打一套。',
            en: 'Absorbs the strike and returns some Drive. Tight enough and it becomes a Perfect Parry: a full punish.',
            ja: '打撃を受け止めてドライブを回復する。タイミングが合えばパーフェクトパリィとなりフルコンボが入る。',
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
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '12-19%',
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
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下打擊再反擊。對手被撞飛，靠牆就是撞牆接完整連段。',
            en: 'Armour eats the strike and hits back. They get launched, and near a wall that is a wall splat into a full combo.',
            ja: 'アーマーで打撃を受け止めて反撃する。相手は吹き飛び、壁が近ければ壁やられからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。在牆邊被反撞是最糟的結果。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact. Being counter-impacted near a wall is the worst case.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。画面端で相打ちDIを返されるのが最悪。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '對打擊特別有效，包含用動力箭步衝進來接的那一下 —— 對手花格買到的就是「打擊更快到」，而霸體專門吃打擊。',
              en: 'Especially good against strikes, including one set up by a Drive Rush: what the bar bought is a faster strike, and armour is built to eat strikes.',
              ja: '打撃全般に強く、ドライブラッシュから繋げる打撃にも有効。ゲージで買ったのは「速く届く打撃」であり、アーマーは打撃を食べるためにある。',
            },
          },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體擋打擊，擋不了投 —— 動力衝擊在這裡是被抓的最貴的一種方式。',
              en: 'Armour stops strikes, not throws. Drive Impact here is the most expensive way there is to be grabbed.',
              ja: 'アーマーは打撃を止めるが投げは止めない。ここでのドライブインパクトは最も高くつく掴まれ方になる。',
            },
          },
        ],
        mixRatio: '6-9%',
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
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '無敵起身把對手打倒推開，順勢把自己推回場中一些，回合強制結束。',
            en: 'An invincible wakeup that knocks them down and shoves them off, buying back some ground toward midscreen.',
            ja: '無敵の起き上がりで相手を倒して押し返し、画面中央側へ少し戻れる。',
          },
          followUp: 'neutral',
          damageBand: '5%（白血）',
        },
        onFail: {
          text: {
            'zh-Hant': '對手不出手直接防禦，動力反攻被擋是 −6，確定被反擊 —— 兩格花掉還倒賠一套。',
            en: 'They just block. A blocked Drive Reversal is -6 and gets punished for certain: two bars spent and a combo taken.',
            ja: '相手が手を出さずガードするだけで、ドライブリバーサルは−6の確定反撃。2ゲージを使った上にコンボを食らう。',
          },
          hpLoss: '35-50%',
          driveLoss: 2,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '發生 18 幀全程無敵，壓起身的打擊穿不過去。但正因為慢，對手用硬直短的招壓（詐欺重ね）就來得及擋回來。',
              en: 'Eighteen frames, invincible throughout: a meaty strike cannot get through. But slow is why a low-recovery meaty (a safe meaty) lets them recover and block it.',
              ja: '発生18Fの間ずっと無敵で、重ねた打撃は通らない。ただし遅いぶん、硬直の短い技で重ねられる（いわゆる詐欺重ね）とガードが間に合う。',
            },
          },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '無敵也擋摔投。這是沒有 OD 起身反擊的角色唯一能同時擋掉打擊和摔投的手段。',
              en: 'The invincibility covers throws too. For a character with no OD wakeup escape, this is the only option that answers both the strike and the throw.',
              ja: '無敵は投げにも有効。OD切り返しを持たないキャラにとって、打撃と投げの両方に対応できる唯一の択。',
            },
          },
          {
            vs: 'shimmy',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手退開，動力反攻打空。這招整體動作很長，空揮的懲罰時間夠對手跳進來打一套。',
              en: 'They walk back and it whiffs. The whole motion is long, and a whiffed one leaves enough time for a jump-in combo.',
              ja: '相手が下がって空振り。全体動作が長く、空振り時は飛び込みからコンボを入れられるほどの隙になる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '3-7%',
        notes: {
          'zh-Hant': '靠角落的時候它比場中更值：推開的距離就是你離牆的距離。仍然是兩格、被擋 −6、白血傷害。',
          en: 'Worth more near the corner than midscreen: the distance it shoves them is the distance you gain from the wall. Still two bars, still -6 on block, still white damage.',
          ja: '画面端寄りでは中央より価値が高い。押し返した距離がそのまま壁から離れた距離になる。ただし2ゲージ・ガード時−6・白ダメージは変わらない。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F（防禦硬直中為 20F），發生時全程無敵且破霸體，被擋 −6（對手 Burnout 時 −2），傷害 500 白血無法收頭，消耗兩格。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
            note: '確認起身動力反攻存在，並說明用小技接 SA 的 OS 可以釣它',
          },
        ],
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '躲過摔投和大部分近身打擊，而且真的拉開了距離，回到中距離重新開始。',
            en: 'Dodges the throw and most close attacks, and actually gains ground — back to neutral range.',
            ja: '投げとほとんどの近距離打撃を避けつつ実際に距離を取れ、中距離から再開できる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後衝刺沒有無敵、收招長。壓起身或延遲打擊會抓到你落地那段，通常是 counter hit。',
            en: 'No invincibility, long recovery. A meaty or delayed attack catches the tail of it, usually as a counter hit.',
            ja: '無敵はなく硬直も長い。重ねや遅らせ打撃に着地部分を狩られ、多くはカウンターヒットになる。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'win' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '後衝刺的無敵幀吃得下指令投，而且它距離短 —— 退出去就是空揮。躲得掉，但換不到傷害。',
              en: 'The backdash is invincible through it, and a command grab is short-ranged: leaving the range makes it a whiff. It escapes, and buys nothing else.',
              ja: 'バックダッシュの無敵で回避でき、間合いも短いので離れれば空振りになる。逃げられるが、それ以上の見返りは無い。',
            },
          },
        ],
        mixRatio: '6-9%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://www.hotspawn.com/street-fighter/guide/street-fighter-6-how-to-play-defense',
            patch: '2026-08',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '後衝刺有投擲無敵，而且退開之後對手的退康懲罰也構不到 —— 對付愛用退康的對手，這是場中最有效的一手。角落沒有空間，這個優勢就消失了。',
          en: 'A backdash is throw-invincible and takes you out of range, so a shimmy has nothing left to punish. Against a shimmy-heavy opponent it is the strongest midscreen answer. Cornered there is no ground to gain, and that advantage disappears.',
          ja: 'バックダッシュは投げ無敵を持ち、下がることでシミーの狩りも届かなくなる。シミーを多用する相手には画面中央で最も有効な一手。画面端では下がる空間がなく、その利点は消える。',
        },
      },
      {
        optionId: 'jump-forward',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '跳過對手落到他背後，摔投和下段全部落空，場地位置重置。',
            en: 'Jumps over and lands behind; the throw and every low whiff, and the positions reset.',
            ja: '相手を飛び越えて背後に着地し、投げも下段も空振りして位置がリセットされる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '起跳被看到就是確定對空 —— 空中不能防禦，而且對空通常能接連段。',
            en: 'A jump they see is a guaranteed anti-air: you cannot block in the air, and anti-airs usually convert.',
            ja: 'ジャンプを見られれば対空が確定する。空中はガードできず、対空からコンボにも繋がる。',
          },
          hpLoss: '32-48%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'loss',
            note: {
              'zh-Hant': '對手退康時已經退開並在看你，反而更有餘裕對空。跳過去撞上一個正在觀察的對手，不是好交換。',
              en: 'A shimmying opponent has already stepped back and is watching, which gives them more time to anti-air, not less. Jumping into someone who is observing is a bad trade.',
              ja: 'シミー中の相手は既に下がって様子を見ており、対空する余裕がむしろ増えている。観察している相手に跳び込むのは分の悪い交換。',
            },
          },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '3-6%',
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
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。',
        },
      },
      {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投落空，你原地落回他面前。靠角的時候這一點比後跳重要 —— 後跳把你推得更靠近角落，垂直跳不會。',
            en: 'The throw whiffs and you come straight back down in front of them. Near the corner that matters more than it sounds: a back jump pushes you further into it, and this does not.',
            ja: '投げが空振りし、そのまま相手の目の前に落ちる。画面端が近いときはこれが効いてくる——後ろジャンプは端に押し込まれるが、垂直ジャンプはそうならない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '前置幀投不到，但打擊照地上判定 —— 壓起身直接把起跳打斷。被看到就是確定對空，而對空通常接得到連段。',
            en: 'The prejump frames cannot be thrown, but strikes still treat them as grounded: a meaty hits the jump out of the ground. Seen, it is a guaranteed anti-air, and anti-airs usually convert.',
            ja: '前置きフレームは投げられないが、打撃は地上判定のままなので、重ねはそのまま跳び上がりを潰す。見られれば対空が確定し、対空はたいていコンボに繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '普通摔投抓空只有 30 幀，你落地時他已經恢復了 —— 躲掉，僅此而已。指令投抓空是 60 幀上下，那才是落地還打得到的情況。',
              en: 'A whiffed normal throw is only 30 frames and they have recovered by the time you land — you escaped, and that is all. A whiffed command grab is around 60, and that is the version you land on top of.',
              ja: '通常投げの空振りは30Fしかなく、着地する頃には相手は回復している——避けただけ。コマ投げの空振りは60F前後で、そちらが着地して殴れる側になる。',
            },
          },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投是 60 幀上下的硬直，你落地時他還在裡面 —— 這是全表唯一「躲掉之後還能拿一套」的格子。',
              en: 'A whiffed command grab is around sixty frames of recovery and you land while he is still inside it. This is the one cell on the page where escaping also pays.',
              ja: '空振りしたコマンド投げの硬直は60F前後で、着地したとき相手はまだその中にいる。この表で唯一、避けたうえにリターンまで取れるマス。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀（恢復 54）。瑪濃 Manège Doré 60 幀、E.本田 Oicho 61 幀、傑米 Tenshin 61 幀、艾力克斯 Power Bomb 61 幀、莉莉 Mexican Typhoon 恢復 53 幀。同一頁的普通前摔抓空是 30 幀 —— 兩倍的差距就是垂直跳落地還打得到的原因。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/ryu',
            patch: '2026-08',
            note: 'Prejump Frames — 4（桑吉爾夫與莉莉是 5）。這幾幀算空中、投不到，但打擊照地上判定 —— 所以壓起身打得到，摔投打不到。摔投發生 5 幀，起身按著跳的話投永遠慢一步。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '靠角時後跳的成本開始上升，垂直跳的成本不變。同樣是讀摔投，這裡它是比較便宜的那一個。',
          en: 'Near the corner a back jump starts costing you ground and this does not. On the same throw read, this is the cheaper of the two.',
          ja: '画面端が近づくと後ろジャンプは位置を失い始めるが、垂直ジャンプは失わない。同じ投げ読みなら、ここではこちらが安い。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打斷摔投或還沒發動的動力箭步，換到一點傷害和一次分開。',
            en: 'Interrupts a throw or a Drive Rush that has not started, for small damage and a separation.',
            ja: '投げや発動前のドライブラッシュを潰し、少量のダメージと距離を得る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '被壓起身吃掉，輕攻擊還沒出來就 counter hit 接完整連段。',
            en: 'Stuffed by the meaty; your light never came out — counter hit into a full combo.',
            ja: '重ねに潰され、弱攻撃は出る前にカウンターヒットからフルコンボ。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '壓起身一定比你的輕攻擊先到 —— 這不是機率問題，是順序問題。',
              en: 'The meaty is out before your light by construction. This is not a probability, it is an ordering.',
              ja: '重ねは構造上こちらの弱攻撃より先に出る。確率ではなく順序の問題。',
            },
          },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'even',
            note: {
              'zh-Hant': '要打得到才算。對手退得夠遠，你的輕攻擊就是落空，接著被懲罰。',
              en: 'Only counts if it reaches. Back far enough and your light whiffs, and the punish follows.',
              ja: '届いてこその択。相手が十分下がっていれば弱攻撃は空振りし、そのまま狩られる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 最便宜的答案。但不是每隻都這麼快（桑吉爾夫自己的要 7 幀），選了角色會顯示你的實際數字。而且他只要延遲一拍，你的速點就變成他的確反。',
              en: 'The fastest light is usually 4 or 5 frames and beats a 5-frame command grab, which makes it the cheapest answer there is. Not every character is that fast — Zangief\'s own is 7 — and picking one shows your actual number. Delay the grab by a beat and your mash becomes his punish.',
              ja: '最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。最も安い対策だが、全キャラがその速さではなく（ザンギエフ自身は7F）、キャラを選べば実際の数字が出る。さらに一拍遅らされれば、暴れがそのまま確反の的になる。',
            },
          },
        ],
        mixRatio: '3-6%',
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
          'zh-Hant': '低頻。價值不在勝率，而在於讓對手不敢無限延遲 —— 完全不按的人會被延遲打擊吃掉所有解摔。',
          en: 'Keep it rare. The value is not the win rate but the threat: never pressing lets them delay forever and eat every tech you have.',
          ja: '低頻度で。価値は勝率ではなく抑止力にある。まったく暴れなければ、無限に遅らされて投げ抜けを全て狩られる。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投，把對手打飛。這是唯一能一次解決位置問題的選項。',
            en: 'Goes through both the strike and the throw and launches them — the only option that solves the position in one action.',
            ja: '打撃も投げも貫通して相手を打ち上げる。位置の問題を一手で解決できる唯一の択。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防或乾脆不出手，看著它落空。punish counter，遊戲裡最重的懲罰之一。',
            en: 'They blocked, or simply did not attack, and watched it whiff — punish counter, one of the heaviest penalties in the game.',
            ja: 'ガードされる、あるいは何もされず空振りを見られる。パニッシュカウンターとなり最も重い代償を払う。',
          },
          hpLoss: '38-52%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigWin' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        mixRatio: '3-6%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '不是所有角色都有；有些只能靠無敵 SA。低頻使用，價值在於讓對手不敢無腦壓。',
          en: 'Not every character has one; some only get it from an invincible Super Art. Use it rarely — the value is making them hesitate.',
          ja: '全キャラが持つわけではなく、無敵SAでしか出せないキャラもいる。低頻度で、相手を躊躇わせる点に価値がある。',
        },
      },
    ],
  },
  {
    id: 'a3-cornered-wakeup',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '角落倒地',
      en: 'Cornered wakeup',
      ja: '画面端でダウン',
    },
    position: ['cornered'],
    distance: 'pointBlank',
    stance: 'iAmDown',
    opponentOptions: ['meaty', 'throw', 'command-grab', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'back-rise',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '角落沒有往後的空間，翻不出去 —— 起身位置跟原地起身一樣。',
            en: 'There is no back to roll into. You get up in the same place a normal rise would have put you.',
            ja: '画面端では後ろに転がる空間がなく、その場受け身と同じ位置で起き上がる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '以為後受身能換到距離，實際上在角落它什麼都沒換到，對手的壓起身照樣重上來。',
            en: 'Expecting a back rise to buy distance: in the corner it buys nothing, and the meaty lands exactly as planned.',
            ja: '後ろ受け身で距離を稼げると思っても、画面端では何も得られず、重ねはそのまま決まる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'loss',
            note: {
              'zh-Hant': '角落沒有位置可以換，後受身跟原地起身在這裡是同一件事。',
              en: 'With no ground to give, a back rise and a normal rise are the same thing here.',
              ja: '下がる余地が無いため、画面端では後ろ受け身とその場受け身は同じ。',
            },
          },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '指令投的距離比普通摔還短。後受身把你放到他構不到的地方，他得先走回來 —— 走的那幾幀你看得到。',
              en: 'A command grab reaches even less far than a normal throw. A back rise puts you outside it and he has to walk back in, and those walking frames are visible.',
              ja: 'コマンド投げの間合いは通常投げよりさらに短い。後ろ受け身で届かない位置に離れれば、相手は歩いて詰め直すしかなく、その数フレームは見える。',
            },
          },
        ],
        notes: {
          'zh-Hant': '角落是後受身唯一沒有用的地方 —— 沒有空間可以翻。這一格值得記，因為場中養成的習慣在這裡完全不會生效。',
          en: 'The corner is the one place a back rise does nothing: there is no room to roll into. Worth remembering, because the habit built midscreen simply stops working here.',
          ja: '画面端は後ろ受け身が唯一無意味になる場所で、転がる空間が無い。中央で身についた癖がここでは効かないため覚えておく価値がある。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'normal-rise',
        risk: 'safe',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '在倒下的位置起身。位置不變，對手的起攻設定照他算的走 —— 你放棄的是距離，換到的是不會把自己往牆送。',
            en: 'You get up where you fell. Position unchanged and their setup runs as planned — you give up distance and in exchange you do not feed yourself towards the wall.',
            ja: '倒れた位置で起き上がる。位置は変わらず相手の起き攻めは計算通りに進むが、自ら壁側へ動かずに済む。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手的壓起身就是照這個位置設計的，你等於照著他的劇本起身。',
            en: 'Their meaty is spaced for exactly this position; you have stood up into the script.',
            ja: '相手の重ねはまさにこの位置に合わせてあり、台本通りに起き上がることになる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'even' },
        ],
        mixRatio: '100%',
        notes: {
          'zh-Hant': 'SF6 沒有延遲起身 —— 起身時間是固定的，唯一的選擇是原地或往後。所以這一格不是「等他招空」，而是「不換位置」。',
          en: 'There is no delayed wakeup in SF6: the timing is fixed and the only choice is here or further back. So this row is not "wait for their setup to whiff", it is "decline the positional trade".',
          ja: 'SF6に遅起きは存在せず、タイミングは固定で選べるのはその場か後方かだけ。したがってこの択は「相手の重ねを空振らせる」ではなく「位置の取引を断る」である。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: 'SF6 只有「その場受け身（原地）」與「後ろ受け身（後受身，落地瞬間押兩顆以上攻擊鍵）」兩種起身，兩者的倒地有利格數相同 —— 沒有延遲起身這種東西；強制倒地不能後受身。來源未標註遊戲版本',
          },
          {
            url: 'https://nandemo-ziten.com/sf6-ukemi-guide/',
            patch: '2026-08',
            note: '日文解說：後受身在落地瞬間押兩顆以上按鍵成立，起身位置比倒地處更後面；能選的只有その場與後方兩種',
          },
        ],
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '打擊全部擋下，退康和延遲打擊完全落空。沒拿到東西，也沒交出血量。',
            en: 'Every strike is blocked; shimmy and delayed attacks whiff entirely. You gain nothing and lose nothing.',
            ja: '打撃は全てガードし、シミーも遅らせ打撃も空振りする。何も得ず、何も失わない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔。傷害固定且低，但對手保住主導權，而且會開始多摔。',
            en: 'Thrown. Fixed, small damage, but they keep the turn and will start weighting throws higher.',
            ja: '投げられる。ダメージは固定かつ軽いが、相手は攻めを継続し、以降は投げを増やしてくる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'even' },
          { vs: 'throw', outcome: 'loss' },
          {
            vs: 'shimmy',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '退康對不出手的人完全沒有威脅。你一停手，他就得改回摔投。',
              en: 'A shimmy threatens nothing against someone who does not press. Stop, and they have to go back to throwing.',
              ja: 'シミーは押してこない相手に何の脅威も与えない。止めれば相手は投げに戻らざるを得ない。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '13-19%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 1,200 傷害 / 5F 發生 / 命中 +17，血量基準 10,000（Akuma 9,000～Zangief 11,000）',
          },
        ],
        notes: {
          'zh-Hant': '最被低估的一手。失敗代價固定又低 —— 對手用摔投磨你，比一套連段慢得多。',
          en: 'The most underrated answer. Its failure cost is fixed and small: grinding you down with throws is far slower than one combo.',
          ja: '最も過小評価されている一手。失敗時の代償が固定かつ小さく、投げで削るのはコンボ一発よりはるかに遅い。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '晚一點按，壓起身先被你擋下，摔投還來得及解。一次覆蓋兩個最常見的選擇。',
            en: 'Teching late means the meaty is blocked first while a throw still breaks. It covers the two most common choices at once.',
            ja: '入力を遅らせることで重ねはガードでき、投げには間に合う。最も多い二択の両方を同時にカバーする。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也把打擊延遲了，正好打在你按解摔的那一刻。counter hit，傷害和連段長度都上一階。',
            en: 'They delayed too, landing on your tech input — a counter hit, raising both damage and combo length a tier.',
            ja: '相手も遅らせており、投げ抜けの入力に重なる。カウンターヒットとなりダメージもコンボも一段上がる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '延遲解摔一樣解不掉，而且延遲多出來的那段站立時間正好是他抓的時間。',
              en: 'A delay tech is equally useless, and the extra standing frames the delay spends are exactly the frames he grabs in.',
              ja: '遅らせ投げ抜けも同様に無効で、遅らせた分の立ち時間がそのまま掴まれる時間になる。',
            },
          },
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
            'zh-Hant': '摔投被解開，雙方分開一小段，重置回中立。',
            en: 'The throw is broken, you separate slightly, and the reset is neutral.',
            ja: '投げを抜けて少し距離が離れ、状況はニュートラルに戻る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒摔，而是後退看你按。解摔有硬直，你吃到完整懲罰。',
            en: 'They did not throw; they walked back and watched you press. The tech has recovery, so you eat a full punish.',
            ja: '相手は投げずに下がって見ていた。投げ抜けには硬直があり、フルコンボの反撃を受ける。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '解摔的輸入對指令投完全不會發生作用 —— 它沒有解摔窗口。這一格是指令投角色跟其他人最大的差別：對別人最划算的防守猜測，對他等於沒按。',
              en: 'The tech input does nothing at all against a command grab, because there is no tech window to hit. This cell is the whole difference between a grappler and everyone else: the defensive guess that pays best against the rest of the cast is a button you did not press.',
              ja: '投げ抜けの入力はコマンド投げに対して一切作用しない。抜ける窓が存在しないからである。このマスがコマ投げキャラとそれ以外の決定的な差で、他キャラ相手に最も得な防御択が、ここでは押していないのと同じになる。',
            },
          },
        ],
        mixRatio: '10-16%',
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
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '擋下打擊並回一點動力槽。時機夠準會變成完美撥擋，對手大幅硬直，直接反打一套。',
            en: 'Absorbs the strike and returns some Drive. Tight enough and it becomes a Perfect Parry: a full punish.',
            ja: '打撃を受け止めてドライブを回復する。タイミングが合えばパーフェクトパリィとなりフルコンボが入る。',
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
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '13-19%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Parry',
            patch: '2026-08',
            note: '來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '角落唯一評價比場中更高的選項 —— 它的回報是位置，而位置正是你最缺的。',
          en: 'The one option that grades higher cornered than midscreen: its payoff is position, which is exactly what you are short of.',
          ja: '画面端で評価が上がる唯一の択。見返りが「位置」であり、今まさに欠けているものだからである。',
        },
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下打擊再反擊。對手被撞飛，靠牆就是撞牆接完整連段。',
            en: 'Armour eats the strike and hits back. They get launched, and near a wall that is a wall splat into a full combo.',
            ja: 'アーマーで打撃を受け止めて反撃する。相手は吹き飛び、壁が近ければ壁やられからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '霸體防不住摔投；對手也可以用自己的動力衝擊撞回來。在牆邊被反撞是最糟的結果。',
            en: 'Armour does not stop throws, and they can answer with their own Drive Impact. Being counter-impacted near a wall is the worst case.',
            ja: 'アーマーは投げを防げず、相手も自分のDIで返せる。画面端で相打ちDIを返されるのが最悪。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '對打擊特別有效，包含用動力箭步衝進來接的那一下 —— 對手花格買到的就是「打擊更快到」，而霸體專門吃打擊。',
              en: 'Especially good against strikes, including one set up by a Drive Rush: what the bar bought is a faster strike, and armour is built to eat strikes.',
              ja: '打撃全般に強く、ドライブラッシュから繋げる打撃にも有効。ゲージで買ったのは「速く届く打撃」であり、アーマーは打撃を食べるためにある。',
            },
          },
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '霸體擋打擊，擋不了投 —— 動力衝擊在這裡是被抓的最貴的一種方式。',
              en: 'Armour stops strikes, not throws. Drive Impact here is the most expensive way there is to be grabbed.',
              ja: 'アーマーは打撃を止めるが投げは止めない。ここでのドライブインパクトは最も高くつく掴まれ方になる。',
            },
          },
        ],
        mixRatio: '6-10%',
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
        optionId: 'drive-reversal',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '無敵起身把對手打倒並推開 —— 被壓在角落時，這是少數真的能換回位置的手段。',
            en: 'An invincible wakeup that knocks them down and shoves them off — cornered, this is one of the few options that actually buys position back.',
            ja: '無敵の起き上がりで相手を倒して押し返す。画面端では、実際に位置を取り返せる数少ない択。',
          },
          followUp: 'neutral',
          damageBand: '5%（白血）',
        },
        onFail: {
          text: {
            'zh-Hant': '對手不出手直接防禦，動力反攻被擋是 −6，確定被反擊 —— 兩格花掉還倒賠一套。',
            en: 'They just block. A blocked Drive Reversal is -6 and gets punished for certain: two bars spent and a combo taken.',
            ja: '相手が手を出さずガードするだけで、ドライブリバーサルは−6の確定反撃。2ゲージを使った上にコンボを食らう。',
          },
          hpLoss: '45-60%',
          driveLoss: 2,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'win',
            note: {
              'zh-Hant': '發生 18 幀全程無敵，壓起身的打擊穿不過去。但正因為慢，對手用硬直短的招壓（詐欺重ね）就來得及擋回來。',
              en: 'Eighteen frames, invincible throughout: a meaty strike cannot get through. But slow is why a low-recovery meaty (a safe meaty) lets them recover and block it.',
              ja: '発生18Fの間ずっと無敵で、重ねた打撃は通らない。ただし遅いぶん、硬直の短い技で重ねられる（いわゆる詐欺重ね）とガードが間に合う。',
            },
          },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant': '無敵也擋摔投。這是沒有 OD 起身反擊的角色唯一能同時擋掉打擊和摔投的手段。',
              en: 'The invincibility covers throws too. For a character with no OD wakeup escape, this is the only option that answers both the strike and the throw.',
              ja: '無敵は投げにも有効。OD切り返しを持たないキャラにとって、打撃と投げの両方に対応できる唯一の択。',
            },
          },
          {
            vs: 'shimmy',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手退開，動力反攻打空。這招整體動作很長，空揮的懲罰時間夠對手跳進來打一套。',
              en: 'They walk back and it whiffs. The whole motion is long, and a whiffed one leaves enough time for a jump-in combo.',
              ja: '相手が下がって空振り。全体動作が長く、空振り時は飛び込みからコンボを入れられるほどの隙になる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'win' },
          { vs: 'bait-block', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '5-10%',
        notes: {
          'zh-Hant': '角落起身最被忽略的一手，尤其是沒有 OD 起身反擊的角色 —— 那 11 隻角色不是沒有選擇，只是選擇貴而且不能收頭。被擋 −6 在角落等於一整套。',
          en: 'The most overlooked cornered wakeup, especially for a character with no OD escape: those eleven are not without an answer, the answer is just expensive and cannot finish a round. Blocked at -6 in the corner is a full combo.',
          ja: '画面端の起き上がりで最も見落とされている択。特にOD切り返しを持たないキャラにとって、あの11人は選択肢がないわけではなく、高くて詰め切れないだけ。画面端で−6はフルコンボに等しい。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Reversal',
            patch: '2026-08',
            note: '起身動力反攻發生 18F（防禦硬直中為 20F），發生時全程無敵且破霸體，被擋 −6（對手 Burnout 時 −2），傷害 500 白血無法收頭，消耗兩格。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
          {
            url: 'https://www.eventhubs.com/news/2024/oct/24/secret-technique-drive-reversal/',
            patch: '2026-08',
            note: '確認起身動力反攻存在，並說明用小技接 SA 的 OS 可以釣它',
          },
        ],
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '躲過摔投，起始位移也足以讓算好時間的壓起身落空。角落退不了多遠，但「退一點」跟「不退」對壓起身是兩回事。',
            en: 'Avoids the throw, and the initial movement makes a tightly timed meaty whiff. There is barely ground to give, but a little and none are different things to a meaty.',
            ja: '投げを避けられ、初動だけでもタイミングの詰まった重ねを空振りさせられる。下がれる距離は僅かだが、「少し動く」と「動かない」は別物。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後衝刺沒有無敵、收招長。壓起身或延遲打擊會抓到你落地那段，通常是 counter hit。',
            en: 'No invincibility, long recovery. A meaty or delayed attack catches the tail of it, usually as a counter hit.',
            ja: '無敵はなく硬直も長い。重ねや遅らせ打撃に着地部分を狩られ、多くはカウンターヒットになる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '後衝刺的無敵幀吃得下指令投，而且它距離短 —— 退出去就是空揮。躲得掉，但換不到傷害。',
              en: 'The backdash is invincible through it, and a command grab is short-ranged: leaving the range makes it a whiff. It escapes, and buys nothing else.',
              ja: 'バックダッシュの無敵で回避でき、間合いも短いので離れれば空振りになる。逃げられるが、それ以上の見返りは無い。',
            },
          },
        ],
        mixRatio: '3%',
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
        notes: {
          'zh-Hant': '角落只剩「讓壓起身落空」的價值，位移那半等於沒有。對手用動力箭步追就完全失效。',
          en: 'Cornered, only the meaty-whiffing half survives; the movement half does nothing. Chased with Drive Rush it stops working entirely.',
          ja: '画面端では「重ねを空振りさせる」価値しか残らず、移動としては機能しない。DRで追われれば完全に無効。',
        },
      },
      {
        optionId: 'jump-forward',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '跳過對手落到他背後，攻守位置直接對調，換成他背對角落。這是角落唯一「位移真的解決問題」的選項。',
            en: 'Jumps over and lands behind: the positions swap outright and now their back is to the wall. The only option here where movement actually solves the problem.',
            ja: '相手を飛び越えて背後に着地し、攻守の位置が入れ替わる。移動が本当に問題を解決する唯一の択。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '起跳被看到就是確定對空 —— 空中不能防禦，而且對空通常能接連段。',
            en: 'A jump they see is a guaranteed anti-air: you cannot block in the air, and anti-airs usually convert.',
            ja: 'ジャンプを見られれば対空が確定する。空中はガードできず、対空からコンボにも繋がる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'loss',
            note: {
              'zh-Hant': '對手退康時已經退開並在看你，反而更有餘裕對空。跳過去撞上一個正在觀察的對手，不是好交換。',
              en: 'A shimmying opponent has already stepped back and is watching, which gives them more time to anti-air, not less. Jumping into someone who is observing is a bad trade.',
              ja: 'シミー中の相手は既に下がって様子を見ており、対空する余裕がむしろ増えている。観察している相手に跳び込むのは分の悪い交換。',
            },
          },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '3-6%',
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
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。另外角落被打下來不一定是最差結果：空中互毆換到的有時候等於一次犧牲打，落地後反而拿回一次進攻權。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air. And being knocked out of it is not uniformly the worst case: an air-to-air trade can amount to a sacrifice that hands you back a turn on landing.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。また画面端で撃ち落とされることが常に最悪とは限らない。空中での相打ちは捨て身の一撃となり、着地後にこちらの攻め番が戻ることもある。',
        },
      },
      {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投落空，你落回原地。角落沒有拿走它任何東西 —— 它本來就不靠位移。',
            en: 'The throw whiffs and you land where you started. The corner takes nothing away from this one, because it never relied on travelling anywhere.',
            ja: '投げが空振りし、元の位置に着地する。この択は移動に頼っていないので、画面端でも失うものが無い。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '前置幀投不到，但打擊照地上判定 —— 壓起身直接把起跳打斷。被看到就是確定對空，而對空通常接得到連段。',
            en: 'The prejump frames cannot be thrown, but strikes still treat them as grounded: a meaty hits the jump out of the ground. Seen, it is a guaranteed anti-air, and anti-airs usually convert.',
            ja: '前置きフレームは投げられないが、打撃は地上判定のままなので、重ねはそのまま跳び上がりを潰す。見られれば対空が確定し、対空はたいていコンボに繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          {
            vs: 'throw',
            outcome: 'win',
            note: {
              'zh-Hant':
                '普通摔投抓空只有 30 幀，你落地時他已經恢復了 —— 躲掉，僅此而已。指令投抓空是 60 幀上下，那才是落地還打得到的情況。',
              en: 'A whiffed normal throw is only 30 frames and they have recovered by the time you land — you escaped, and that is all. A whiffed command grab is around 60, and that is the version you land on top of.',
              ja: '通常投げの空振りは30Fしかなく、着地する頃には相手は回復している——避けただけ。コマ投げの空振りは60F前後で、そちらが着地して殴れる側になる。',
            },
          },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投是 60 幀上下的硬直，你落地時他還在裡面 —— 這是全表唯一「躲掉之後還能拿一套」的格子。',
              en: 'A whiffed command grab is around sixty frames of recovery and you land while he is still inside it. This is the one cell on the page where escaping also pays.',
              ja: '空振りしたコマンド投げの硬直は60F前後で、着地したとき相手はまだその中にいる。この表で唯一、避けたうえにリターンまで取れるマス。',
            },
          },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀（恢復 54）。瑪濃 Manège Doré 60 幀、E.本田 Oicho 61 幀、傑米 Tenshin 61 幀、艾力克斯 Power Bomb 61 幀、莉莉 Mexican Typhoon 恢復 53 幀。同一頁的普通前摔抓空是 30 幀 —— 兩倍的差距就是垂直跳落地還打得到的原因。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/ryu',
            patch: '2026-08',
            note: 'Prejump Frames — 4（桑吉爾夫與莉莉是 5）。這幾幀算空中、投不到，但打擊照地上判定 —— 所以壓起身打得到，摔投打不到。摔投發生 5 幀，起身按著跳的話投永遠慢一步。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '後跳在角落幾乎不能用，垂直跳的評價完全沒變 —— 決定後跳的是位置，而這一項跟位置無關。對指令投角色來說，角落反而是最該用它的地方：你也沒有別的地方可以去。',
          en: 'A back jump is close to unusable cornered and this grade does not move at all — position is what decides a back jump, and this option does not involve any. Against a grappler the corner is where it matters most, because there is nowhere else left to go.',
          ja: '後ろジャンプは画面端でほぼ使えなくなるが、この択の評価は動かない。後ろジャンプを決めるのは位置であり、これは位置を使わないからである。コマ投げキャラ相手なら、他に行き場が無い画面端こそ最も使うべき場所になる。',
        },
      },
      {
        optionId: 'jump-back',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '躲過摔投和大部分下段。但角落沒有後退空間，落地後還在同一個位置。',
            en: 'Avoids the throw and most lows. But with no room behind you, you land in the same place.',
            ja: '投げとほとんどの下段を避けられるが、後方に空間がなく同じ位置に着地する。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手看到起跳直接對空，確定命中，通常還能接連段。',
            en: 'They see the jump and anti-air it — guaranteed, and it usually converts.',
            ja: 'ジャンプを見られて対空が確定し、コンボにも繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'loss' },
          { vs: 'anti-air', outcome: 'bigLoss' },
          { vs: 'command-grab', outcome: 'win' },
        ],
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
        notes: {
          'zh-Hant': '場中值得混，角落幾乎不該用。決定評價的是位置，不是選項本身。',
          en: 'Worth mixing midscreen, close to indefensible cornered. Position decides the grade, not the option.',
          ja: '中央では混ぜる価値があり、画面端ではほぼ選べない。評価を決めるのは択ではなく位置である。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打斷摔投或還沒發動的動力箭步，換到一點傷害和一次分開。',
            en: 'Interrupts a throw or a Drive Rush that has not started, for small damage and a separation.',
            ja: '投げや発動前のドライブラッシュを潰し、少量のダメージと距離を得る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '被壓起身吃掉，輕攻擊還沒出來就 counter hit 接完整連段。',
            en: 'Stuffed by the meaty; your light never came out — counter hit into a full combo.',
            ja: '重ねに潰され、弱攻撃は出る前にカウンターヒットからフルコンボ。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'meaty',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '壓起身一定比你的輕攻擊先到 —— 這不是機率問題，是順序問題。',
              en: 'The meaty is out before your light by construction. This is not a probability, it is an ordering.',
              ja: '重ねは構造上こちらの弱攻撃より先に出る。確率ではなく順序の問題。',
            },
          },
          { vs: 'throw', outcome: 'win' },
          {
            vs: 'shimmy',
            outcome: 'even',
            note: {
              'zh-Hant': '要打得到才算。對手退得夠遠，你的輕攻擊就是落空，接著被懲罰。',
              en: 'Only counts if it reaches. Back far enough and your light whiffs, and the punish follows.',
              ja: '届いてこその択。相手が十分下がっていれば弱攻撃は空振りし、そのまま狩られる。',
            },
          },
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          { vs: 'bait-block', outcome: 'loss' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 最便宜的答案。但不是每隻都這麼快（桑吉爾夫自己的要 7 幀），選了角色會顯示你的實際數字。而且他只要延遲一拍，你的速點就變成他的確反。',
              en: 'The fastest light is usually 4 or 5 frames and beats a 5-frame command grab, which makes it the cheapest answer there is. Not every character is that fast — Zangief\'s own is 7 — and picking one shows your actual number. Delay the grab by a beat and your mash becomes his punish.',
              ja: '最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。最も安い対策だが、全キャラがその速さではなく（ザンギエフ自身は7F）、キャラを選べば実際の数字が出る。さらに一拍遅らされれば、暴れがそのまま確反の的になる。',
            },
          },
        ],
        mixRatio: '3-6%',
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
          'zh-Hant': '低頻。價值不在勝率，而在於讓對手不敢無限延遲 —— 完全不按的人會被延遲打擊吃掉所有解摔。',
          en: 'Keep it rare. The value is not the win rate but the threat: never pressing lets them delay forever and eat every tech you have.',
          ja: '低頻度で。価値は勝率ではなく抑止力にある。まったく暴れなければ、無限に遅らされて投げ抜けを全て狩られる。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和摔投，把對手打飛。這是唯一能一次解決位置問題的選項。',
            en: 'Goes through both the strike and the throw and launches them — the only option that solves the position in one action.',
            ja: '打撃も投げも貫通して相手を打ち上げる。位置の問題を一手で解決できる唯一の択。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防或乾脆不出手，看著它落空。punish counter，遊戲裡最重的懲罰之一。',
            en: 'They blocked, or simply did not attack, and watched it whiff — punish counter, one of the heaviest penalties in the game.',
            ja: 'ガードされる、あるいは何もされず空振りを見られる。パニッシュカウンターとなり最も重い代償を払う。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'bigWin' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'bigWin' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
          { vs: 'command-grab', outcome: 'bigWin' },
        ],
        mixRatio: '3-6%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色 OD 起身反擊的無敵幀數取自各自的角色頁，並已抄進本站的角色面板；LP/MP/HP 版的升龍通常只有對空無敵，擋不掉算好時間點的壓起身。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '不是所有角色都有；有些只能靠無敵 SA。低頻使用，價值在於讓對手不敢無腦壓。',
          en: 'Not every character has one; some only get it from an invincible Super Art. Use it rarely — the value is making them hesitate.',
          ja: '全キャラが持つわけではなく、無敵SAでしか出せないキャラもいる。低頻度で、相手を躊躇わせる点に価値がある。',
        },
      },
    ],
  },
]
