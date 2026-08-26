import type { Situation } from '../schema'

/**
 * Group J — pressure, by what the defender can still spend.
 *
 * The axis is their Drive, not your position, because that is what removes
 * options from their side of the table. Notice the columns shrink as the group
 * goes on: a defender in Burnout simply does not have Parry, Reversal or Impact
 * to answer with, and the matrix says so by not listing them.
 *
 * Everything is `estimated`.
 */
export const GROUP_J: Situation[] = [
  {
    id: 'j1-they-have-drive',
    side: 'offense',
    group: 'J',
    name: {
      'zh-Hant': '對手動力槽充足',
      en: 'They have Drive to spend',
      ja: '相手のドライブに余裕がある',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['do-nothing', 'delayed-tech', 'drive-parry', 'drive-reversal', 'drive-impact', 'mash-light', 'jump-neutral'],
    evaluations: [
      {
        optionId: 'blockstring',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '接得起來的連段，逼他一直防禦。他每擋一下都在掉動力槽，你是在買他的資源。',
            en: 'A connected string that keeps them blocking. Every block spends their Drive; you are buying their resources.',
            ja: '繋がる連係でガードを強要する。ガードのたびに相手のドライブが減り、資源を削っていることになる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用動力反攻或動力衝擊把你推開，你花的壓制全部歸零還挨一下。',
            en: 'A Drive Reversal or Drive Impact shoves you off: the pressure you built resets and you take a hit.',
            ja: 'ドライブリバーサルかインパクトで押し返され、築いた攻めが消えたうえ被弾する。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'drive-reversal', outcome: 'bigLoss' },
          { vs: 'drive-impact', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'bigWin' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '不留空隙他就跳不出去 —— 起跳幀照地上判定，連段直接把它打斷。跳得掉是空隙的問題，不是膽量的問題。',
              en: 'With no gap there is nothing to jump out of: the prejump frames count as grounded and the string simply hits them out of it. Whether a jump works is a question about your gaps, not about their nerve.',
              ja: '隙間を作らなければ跳ばれない。前置きフレームは地上判定なので、連係がそのまま潰す。跳べるかどうかは隙間の問題であって、相手の度胸の問題ではない。',
            },
          },
        ],
        mixRatio: '18-24%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽，耗盡即進入 Burnout；Burnout 期間會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為原傷害的 25% 且可以致死；Burnout 中每擋一招，攻擊方多得 4 幀有利',
          },
        ],
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '打穿防禦和撥擋，再拿一次倒地繼續循環。',
            en: 'Goes through blocking and parry, takes another knockdown, and the loop continues.',
            ja: 'ガードもパリィも貫通し、再びダウンを奪ってループを続ける。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束。',
            en: 'Teched, you separate and the turn ends.',
            ja: '抜けられれば距離が離れ、ターンが終わる。',
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
          { vs: 'drive-reversal', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'loss' },
          {
            vs: 'jump-neutral',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '起跳幀投不到。普通摔抓空只有 30 幀，他落地時你已經恢復 —— 摔空了，不是被確反。',
              en: 'The prejump frames cannot be thrown. A whiffed normal throw is only 30 frames and you are recovered by the time they land: you missed, you were not punished.',
              ja: '前置きフレームは投げられない。通常投げの空振りは30Fしかなく、相手が着地する頃には回復している。外しただけで確反ではない。',
            },
          },
        ],
        mixRatio: '15-21%',
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
      },
      {
        optionId: 'command-grab',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '抓住防禦的對手。傷害和起攻都遠高於普通摔，而且他沒有解摔這個選項 —— 純防禦、延遲解摔、動力撥擋全部失效。',
            en: 'Grabs them out of blocking. Far more damage and far better oki than a normal throw, and teching is not on the menu — blocking, delay teching and parry are all switched off.',
            ja: 'ガードしている相手を掴む。通常投げよりダメージも起き攻めも遥かに上で、しかも抜けるという選択肢が無い。ガード・遅らせ抜け・パリィがまとめて無効になる。',
          },
          followUp: 'pressure',
          damageBand: '18-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '空揮的指令投硬直很長。對手跳、後衝刺或直接無敵技，你就是站在那邊等著被打一套。',
            en: 'A whiffed command grab recovers slowly. If they jumped, backdashed or reversed, you are standing there waiting to be punished.',
            ja: '空振りしたコマンド投げは硬直が長い。跳ばれ、バックダッシュされ、あるいは無敵技を出されれば、そのまま一式もらう。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'do-nothing',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦對指令投完全無效，而且它不像普通摔那樣有解摔窗口 —— 這是「一直防」唯一沒有答案的東西。',
              en: 'Blocking does nothing, and unlike a normal throw there is no tech window to reach for. This is the one thing pure defence has no answer to.',
              ja: 'ガードは無意味で、通常投げと違って抜ける窓も無い。ガード一辺倒に唯一答えが無いのがこれ。',
            },
          },
          {
            vs: 'delayed-tech',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '延遲解摔是為了解普通摔而按的，指令投解不掉 —— 他按的那個輸入完全不會發生作用。',
              en: 'A delay tech is an input for a normal throw. A command grab has no tech, so the button they are pressing simply does nothing.',
              ja: '遅らせ投げ抜けは通常投げ用の入力であり、コマンド投げには抜けが存在しないため、押しているボタンは何も起こさない。',
            },
          },
          { vs: 'drive-parry', outcome: 'bigWin' },
          { vs: 'drive-reversal', outcome: 'loss' },
          {
            vs: 'drive-impact',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '霸體吃打擊，吃不了投 —— 這是動力衝擊永遠的破口，而指令投是那個洞裡最貴的一顆。這一格原本寫成指令投輸，跟本站其他十二個地方寫的「摔投打穿動力衝擊」互相矛盾。',
              en: 'Armour eats strikes and not throws — Drive Impact\'s permanent hole, and a command grab is the most expensive thing that fits through it. This cell used to say the command grab lost, contradicting the twelve other places here that grade a throw as beating Drive Impact.',
              ja: 'アーマーは打撃を吸うが投げは吸わない。ドライブインパクトの恒久的な穴であり、コマンド投げはその穴を通る最も高い一手になる。このマスは以前コマンド投げが負けると書かれており、本サイトの他12箇所の「投げはドライブインパクトを潰す」という記述と矛盾していた。',
            },
          },
          {
            vs: 'mash-light',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '對面最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 對付指令投最便宜的答案。慢一點的角色（桑吉爾夫自己的小技是 7 幀）就不一定贏得了。',
              en: 'Their fastest light is usually 4 or 5 frames and hits before a 5-frame command grab — the cheapest answer to one there is. A slower character does not necessarily win the race; Zangief\'s own light is 7.',
              ja: '相手の最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。コマンド投げへの最も安い対策。ただし遅いキャラなら勝てるとは限らない（ザンギエフ自身の弱攻撃は7F）。',
            },
          },
          {
            vs: 'jump-neutral',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '起跳幀投不到，所以壓得再準也沒用 —— 抓空 60 幀上下，他落地就是一整套。要嘛先用打擊把跳按死，要嘛延遲指令投去抓他落地。',
              en: 'The prejump frames cannot be thrown, so timing it better does not help: sixty-odd frames of whiff and they land on you for a full combo. Either shut the jump down with a strike first, or delay the grab onto their landing.',
              ja: '前置きフレームは投げられないため、丁寧に重ねても意味が無い。60F前後の空振りに着地からフルコンボが入る。先に打撃でジャンプを潰すか、コマ投げを遅らせて着地を狙うかのどちらか。',
            },
          },
        ],
        notes: {
          'zh-Hant': '只有 11 隻角色有，所以它不在「預設打法」的比例裡 —— 那條是通用的。但對有的角色來說，它不是選項之一，而是整個起攻的核心：對手一旦不能靠防禦解決，你的壓起身和退康才真的有威脅。',
          en: 'Only eleven characters have one, so it stays out of the default-mix bar, which is universal. For the characters who do have one it is not an option among others — it is what the whole offence is built on, because once blocking stops being an answer, the meaty and the shimmy start meaning something.',
          ja: '所持は11キャラのみのため、汎用である「基本の配分」には含めていない。ただし持っているキャラにとっては数ある択の一つではなく攻めの軸そのもので、ガードで解決できなくなって初めて重ねやシミーが機能し始める。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色的指令投見各角色頁的 Special Moves 區段（attacktype 標為 Throw、且有自己的轉圈／半圓輸入）。31 隻中 11 隻有：A.K.I.、Alex、Blanka、Cammy、E.本田、Jamie、JP、金伯莉、莉莉、瑪濃、桑吉爾夫。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、解摔窗口 9 幀；指令投沒有解摔窗口，這就是它跟普通摔最大的差別',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '在連段的空隙延遲出招，正好打中他的解摔或速點 —— counter hit 接完整連段。',
            en: 'Delay into the gap so it lands on their tech or their mash — counter hit into a full combo.',
            ja: '連係の隙間で遅らせて出し、投げ抜けや暴れに重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手純防禦，你的延遲打擊只是被擋，而且比接好的連段更不利。',
            en: 'They just blocked, so the delayed strike is only blocked — and less plus than a clean string.',
            ja: '素直にガードされれば遅らせた打撃はガードされるだけで、繋げた連係より不利になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'drive-reversal', outcome: 'loss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '12-15%',
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
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中下二擇逼他猜。猜錯就是完整連段。',
            en: 'An overhead-or-low guess. Wrong is a full combo.',
            ja: '中下段の二択を迫る。読み違えればフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '猜對就擋下來，而多數中段不利，你被確反。',
            en: 'Guessed right it is blocked, and most overheads are minus, so you get punished.',
            ja: '読まれればガードされ、多くの中段は不利なため確反を受ける。',
          },
          hpLoss: '20-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'drive-reversal', outcome: 'loss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '9-12%',
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
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他解摔，懲罰他落空的解摔硬直。',
            en: 'Walk back to bait the tech and punish its whiffed recovery.',
            ja: '下がって投げ抜けを誘い、空振りの硬直を狩る。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '他沒解摔，你退開時無防備，被速點或無敵技抓到。',
            en: 'They did not tech, they just pressed — walking back does not reach their mash, and you eat it instead.',
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
          { vs: 'drive-reversal', outcome: 'win' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '6-9%',
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
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下他的反抗再撞飛。靠牆就是撞牆接完整連段，尤其他力盡的時候擋住也會暈。',
            en: 'Armour through their answer and launch. Near a wall it is a wall splat into a full combo — and if they are burnt out it stuns even on block.',
            ja: 'アーマーで相手の抵抗を受けて打ち上げる。壁が近ければ壁やられからフルコンボ。相手がバーンアウト中ならガードしてもスタンする。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '他用自己的動力衝擊撞回來，或是直接摔你 —— 霸體防不住摔投。',
            en: 'They impact back, or simply throw you — armour does not stop throws.',
            ja: '相手のDIで返されるか、単に投げられる。アーマーは投げを防げない。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          {
            vs: 'mash-light',
            outcome: 'win',
            note: {
              'zh-Hant': '霸體只有兩次。前兩下小技被吃掉，第三下就破霸體 —— 對手真的連按小拳連段是打得贏的。',
              en: 'The armour is only two hits. It eats the first two lights; a third breaks it, so a genuine light chain does beat this.',
              ja: 'アーマーは2回まで。弱攻撃2発は受け止めるが3発目で割れるため、本気の弱攻撃の連打には負ける。',
            },
          },
          {
            vs: 'drive-reversal',
            outcome: 'loss',
            note: {
              'zh-Hant': '動力反攻是破霸體招，而且發生時全程無敵 —— 霸體吃不下它，會被直接打斷打倒。',
              en: 'A Drive Reversal is an armour break and is invincible through its startup: the armour does not absorb it, it gets broken.',
              ja: 'ドライブリバーサルはアーマーブレイク属性で発生中は無敵。アーマーでは受け止められず、そのまま割られる。',
            },
          },
          {
            vs: 'drive-impact',
            outcome: 'loss',
            orderDependent: true,
          },
          { vs: 'delayed-tech', outcome: 'loss' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定抓到起跳幀，霸體又讓他打不斷 —— 這是壓制中對跳最乾淨的答案。',
              en: 'Drive Impact catches the prejump frames as grounded and the armour means they cannot interrupt it either. It is the cleanest answer to a jump there is in pressure.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、アーマーで割り込みも許さない。固めにおけるジャンプへの最もきれいな回答。',
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
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '停下來防禦，等他的動力反攻、速點或無敵技落空，再打最大懲罰。',
            en: 'Stop and block, waiting for their Drive Reversal, mash or reversal to whiff, then take the maximum punish.',
            ja: '攻めを止めてガードし、リバーサルや暴れ、無敵技の空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '他也什麼都沒做，你放掉了一次壓制機會。',
            en: 'They did nothing either, and you gave up a turn of pressure.',
            ja: '相手も何もせず、攻めのターンを一度手放すことになる。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'drive-reversal', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '6-9%',
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
      },
      {
        optionId: 'drive-rush-pressure',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '花一格用動力箭步把攻擊送得更快更有利，同時逼他繼續消耗動力槽防禦。',
            en: 'Spend a bar to deliver the attack faster and more plus, and keep them spending Drive to block it.',
            ja: '1ゲージ使って攻撃をより速く有利に届け、相手にドライブを消費させ続ける。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '他撥擋成功就回了動力槽，你花的一格反而變成他的資源。',
            en: 'A successful parry returns their Drive: the bar you spent becomes theirs.',
            ja: 'パリィされれば相手のドライブが回復し、消費した1ゲージが相手の資源に変わる。',
          },
          hpLoss: '25-40%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'drive-parry', outcome: 'bigLoss' },
          { vs: 'drive-reversal', outcome: 'loss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '12-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Rush',
            patch: '2026-08',
            note: '生動力箭步一格，從可取消普通技取消（DRC）三格；箭步後的下一招多 4 幀硬直與有利，並讓整套連段多吃 15% 傷害衰減。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '這是資源競賽 —— 你花一格逼他花更多。他動力槽越低，這一手越划算。',
          en: 'This is a resource race: you spend one bar to make them spend more. The lower their gauge, the better the trade.',
          ja: '資源の削り合い。1ゲージ払って相手により多く払わせる。相手のゲージが低いほど割が良い。',
        },
      },
    ],
  },
  {
    id: 'j2-they-are-low',
    side: 'offense',
    group: 'J',
    name: {
      'zh-Hant': '對手動力槽見底',
      en: 'They are nearly out',
      ja: '相手のドライブが残り僅か',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['do-nothing', 'delayed-tech', 'drive-parry', 'mash-light', 'jump-neutral', 'reversal'],
    evaluations: [
      {
        optionId: 'blockstring',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '接得起來的連段，逼他一直防禦。他每擋一下都在掉動力槽，你是在買他的資源。',
            en: 'A connected string that keeps them blocking. Every block spends their Drive; you are buying their resources.',
            ja: '繋がる連係でガードを強要する。ガードのたびに相手のドライブが減り、資源を削っていることになる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用動力反攻或動力衝擊把你推開，你花的壓制全部歸零還挨一下。',
            en: 'A Drive Reversal or Drive Impact shoves you off: the pressure you built resets and you take a hit.',
            ja: 'ドライブリバーサルかインパクトで押し返され、築いた攻めが消えたうえ被弾する。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'reversal', outcome: 'win' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '不留空隙他就跳不出去 —— 起跳幀照地上判定，連段直接把它打斷。跳得掉是空隙的問題，不是膽量的問題。',
              en: 'With no gap there is nothing to jump out of: the prejump frames count as grounded and the string simply hits them out of it. Whether a jump works is a question about your gaps, not about their nerve.',
              ja: '隙間を作らなければ跳ばれない。前置きフレームは地上判定なので、連係がそのまま潰す。跳べるかどうかは隙間の問題であって、相手の度胸の問題ではない。',
            },
          },
        ],
        mixRatio: '18-24%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽，耗盡即進入 Burnout；Burnout 期間會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為原傷害的 25% 且可以致死；Burnout 中每擋一招，攻擊方多得 4 幀有利',
          },
        ],
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '打穿防禦和撥擋，再拿一次倒地繼續循環。',
            en: 'Goes through blocking and parry, takes another knockdown, and the loop continues.',
            ja: 'ガードもパリィも貫通し、再びダウンを奪ってループを続ける。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束。',
            en: 'Teched, you separate and the turn ends.',
            ja: '抜けられれば距離が離れ、ターンが終わる。',
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
          {
            vs: 'jump-neutral',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '起跳幀投不到。普通摔抓空只有 30 幀，他落地時你已經恢復 —— 摔空了，不是被確反。',
              en: 'The prejump frames cannot be thrown. A whiffed normal throw is only 30 frames and you are recovered by the time they land: you missed, you were not punished.',
              ja: '前置きフレームは投げられない。通常投げの空振りは30Fしかなく、相手が着地する頃には回復している。外しただけで確反ではない。',
            },
          },
        ],
        mixRatio: '15-21%',
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
      },
      {
        optionId: 'command-grab',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '抓住防禦的對手。傷害和起攻都遠高於普通摔，而且他沒有解摔這個選項 —— 純防禦、延遲解摔、動力撥擋全部失效。',
            en: 'Grabs them out of blocking. Far more damage and far better oki than a normal throw, and teching is not on the menu — blocking, delay teching and parry are all switched off.',
            ja: 'ガードしている相手を掴む。通常投げよりダメージも起き攻めも遥かに上で、しかも抜けるという選択肢が無い。ガード・遅らせ抜け・パリィがまとめて無効になる。',
          },
          followUp: 'pressure',
          damageBand: '18-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '空揮的指令投硬直很長。對手跳、後衝刺或直接無敵技，你就是站在那邊等著被打一套。',
            en: 'A whiffed command grab recovers slowly. If they jumped, backdashed or reversed, you are standing there waiting to be punished.',
            ja: '空振りしたコマンド投げは硬直が長い。跳ばれ、バックダッシュされ、あるいは無敵技を出されれば、そのまま一式もらう。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'do-nothing',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦對指令投完全無效，而且它不像普通摔那樣有解摔窗口 —— 這是「一直防」唯一沒有答案的東西。',
              en: 'Blocking does nothing, and unlike a normal throw there is no tech window to reach for. This is the one thing pure defence has no answer to.',
              ja: 'ガードは無意味で、通常投げと違って抜ける窓も無い。ガード一辺倒に唯一答えが無いのがこれ。',
            },
          },
          {
            vs: 'delayed-tech',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '延遲解摔是為了解普通摔而按的，指令投解不掉 —— 他按的那個輸入完全不會發生作用。',
              en: 'A delay tech is an input for a normal throw. A command grab has no tech, so the button they are pressing simply does nothing.',
              ja: '遅らせ投げ抜けは通常投げ用の入力であり、コマンド投げには抜けが存在しないため、押しているボタンは何も起こさない。',
            },
          },
          { vs: 'drive-parry', outcome: 'bigWin' },
          {
            vs: 'mash-light',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '對面最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 對付指令投最便宜的答案。慢一點的角色（桑吉爾夫自己的小技是 7 幀）就不一定贏得了。',
              en: 'Their fastest light is usually 4 or 5 frames and hits before a 5-frame command grab — the cheapest answer to one there is. A slower character does not necessarily win the race; Zangief\'s own light is 7.',
              ja: '相手の最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。コマンド投げへの最も安い対策。ただし遅いキャラなら勝てるとは限らない（ザンギエフ自身の弱攻撃は7F）。',
            },
          },
          { vs: 'reversal', outcome: 'bigLoss' },
          {
            vs: 'jump-neutral',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '起跳幀投不到，所以壓得再準也沒用 —— 抓空 60 幀上下，他落地就是一整套。要嘛先用打擊把跳按死，要嘛延遲指令投去抓他落地。',
              en: 'The prejump frames cannot be thrown, so timing it better does not help: sixty-odd frames of whiff and they land on you for a full combo. Either shut the jump down with a strike first, or delay the grab onto their landing.',
              ja: '前置きフレームは投げられないため、丁寧に重ねても意味が無い。60F前後の空振りに着地からフルコンボが入る。先に打撃でジャンプを潰すか、コマ投げを遅らせて着地を狙うかのどちらか。',
            },
          },
        ],
        notes: {
          'zh-Hant': '只有 11 隻角色有，所以它不在「預設打法」的比例裡 —— 那條是通用的。但對有的角色來說，它不是選項之一，而是整個起攻的核心：對手一旦不能靠防禦解決，你的壓起身和退康才真的有威脅。',
          en: 'Only eleven characters have one, so it stays out of the default-mix bar, which is universal. For the characters who do have one it is not an option among others — it is what the whole offence is built on, because once blocking stops being an answer, the meaty and the shimmy start meaning something.',
          ja: '所持は11キャラのみのため、汎用である「基本の配分」には含めていない。ただし持っているキャラにとっては数ある択の一つではなく攻めの軸そのもので、ガードで解決できなくなって初めて重ねやシミーが機能し始める。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色的指令投見各角色頁的 Special Moves 區段（attacktype 標為 Throw、且有自己的轉圈／半圓輸入）。31 隻中 11 隻有：A.K.I.、Alex、Blanka、Cammy、E.本田、Jamie、JP、金伯莉、莉莉、瑪濃、桑吉爾夫。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、解摔窗口 9 幀；指令投沒有解摔窗口，這就是它跟普通摔最大的差別',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '在連段的空隙延遲出招，正好打中他的解摔或速點 —— counter hit 接完整連段。',
            en: 'Delay into the gap so it lands on their tech or their mash — counter hit into a full combo.',
            ja: '連係の隙間で遅らせて出し、投げ抜けや暴れに重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手純防禦，你的延遲打擊只是被擋，而且比接好的連段更不利。',
            en: 'They just blocked, so the delayed strike is only blocked — and less plus than a clean string.',
            ja: '素直にガードされれば遅らせた打撃はガードされるだけで、繋げた連係より不利になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'drive-parry', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '12-15%',
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
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中下二擇逼他猜。猜錯就是完整連段。',
            en: 'An overhead-or-low guess. Wrong is a full combo.',
            ja: '中下段の二択を迫る。読み違えればフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '猜對就擋下來，而多數中段不利，你被確反。',
            en: 'Guessed right it is blocked, and most overheads are minus, so you get punished.',
            ja: '読まれればガードされ、多くの中段は不利なため確反を受ける。',
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
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '9-12%',
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
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他解摔，懲罰他落空的解摔硬直。',
            en: 'Walk back to bait the tech and punish its whiffed recovery.',
            ja: '下がって投げ抜けを誘い、空振りの硬直を狩る。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '他沒解摔，你退開時無防備，被速點或無敵技抓到。',
            en: 'They did not tech, they just pressed — walking back does not reach their mash, and you eat it instead.',
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
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '6-9%',
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
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下他的反抗再撞飛。靠牆就是撞牆接完整連段，尤其他力盡的時候擋住也會暈。',
            en: 'Armour through their answer and launch. Near a wall it is a wall splat into a full combo — and if they are burnt out it stuns even on block.',
            ja: 'アーマーで相手の抵抗を受けて打ち上げる。壁が近ければ壁やられからフルコンボ。相手がバーンアウト中ならガードしてもスタンする。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '他用自己的動力衝擊撞回來，或是直接摔你 —— 霸體防不住摔投。',
            en: 'They impact back, or simply throw you — armour does not stop throws.',
            ja: '相手のDIで返されるか、単に投げられる。アーマーは投げを防げない。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          {
            vs: 'mash-light',
            outcome: 'win',
            note: {
              'zh-Hant': '霸體只有兩次。前兩下小技被吃掉，第三下就破霸體 —— 對手真的連按小拳連段是打得贏的。',
              en: 'The armour is only two hits. It eats the first two lights; a third breaks it, so a genuine light chain does beat this.',
              ja: 'アーマーは2回まで。弱攻撃2発は受け止めるが3発目で割れるため、本気の弱攻撃の連打には負ける。',
            },
          },
          { vs: 'delayed-tech', outcome: 'loss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定抓到起跳幀，霸體又讓他打不斷 —— 這是壓制中對跳最乾淨的答案。',
              en: 'Drive Impact catches the prejump frames as grounded and the armour means they cannot interrupt it either. It is the cleanest answer to a jump there is in pressure.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、アーマーで割り込みも許さない。固めにおけるジャンプへの最もきれいな回答。',
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
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '停下來防禦，等他的動力反攻、速點或無敵技落空，再打最大懲罰。',
            en: 'Stop and block, waiting for their Drive Reversal, mash or reversal to whiff, then take the maximum punish.',
            ja: '攻めを止めてガードし、リバーサルや暴れ、無敵技の空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '他也什麼都沒做，你放掉了一次壓制機會。',
            en: 'They did nothing either, and you gave up a turn of pressure.',
            ja: '相手も何もせず、攻めのターンを一度手放すことになる。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'reversal', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'drive-parry', outcome: 'even' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '6-9%',
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
      },
      {
        optionId: 'drive-rush-pressure',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '花一格用動力箭步把攻擊送得更快更有利，同時逼他繼續消耗動力槽防禦。',
            en: 'Spend a bar to deliver the attack faster and more plus, and keep them spending Drive to block it.',
            ja: '1ゲージ使って攻撃をより速く有利に届け、相手にドライブを消費させ続ける。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '他撥擋成功就回了動力槽，你花的一格反而變成他的資源。',
            en: 'A successful parry returns their Drive: the bar you spent becomes theirs.',
            ja: 'パリィされれば相手のドライブが回復し、消費した1ゲージが相手の資源に変わる。',
          },
          hpLoss: '25-40%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'drive-parry', outcome: 'bigLoss' },
          { vs: 'reversal', outcome: 'bigLoss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '12-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Rush',
            patch: '2026-08',
            note: '生動力箭步一格，從可取消普通技取消（DRC）三格；箭步後的下一招多 4 幀硬直與有利，並讓整套連段多吃 15% 傷害衰減。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '這是資源競賽 —— 你花一格逼他花更多。他動力槽越低，這一手越划算。',
          en: 'This is a resource race: you spend one bar to make them spend more. The lower their gauge, the better the trade.',
          ja: '資源の削り合い。1ゲージ払って相手により多く払わせる。相手のゲージが低いほど割が良い。',
        },
      },
    ],
  },
  {
    id: 'j3-they-are-burnt-out',
    side: 'offense',
    group: 'J',
    name: {
      'zh-Hant': '對手已力盡',
      en: 'They are burnt out',
      ja: '相手がバーンアウト',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentNoDrive: true,
    opponentOptions: ['do-nothing', 'delayed-tech', 'mash-light', 'jump-neutral', 'super-reversal'],
    evaluations: [
      {
        optionId: 'blockstring',
        risk: 'safe',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手擋不掉的連段，逼他一直防禦並消耗動力槽。他已經力盡，防禦硬直每下多 4 frame，你的連係會直接沒有空隙。',
            en: 'A string they cannot escape, forcing them to keep blocking. They are burnt out, so every block adds 4 frames — your strings simply stop having gaps.',
            ja: '抜けられない連係でガードを強要する。相手はバーンアウト中でガード硬直が1回4F増えるため、連係から隙間が消える。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用動力反攻或動力衝擊把你推開，你花的壓制全部歸零還挨一下。',
            en: 'A Drive Reversal or Drive Impact shoves you off: the pressure you built resets and you take a hit.',
            ja: 'ドライブリバーサルかインパクトで押し返され、築いた攻めが消えたうえ被弾する。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'super-reversal', outcome: 'win' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '不留空隙他就跳不出去 —— 起跳幀照地上判定，連段直接把它打斷。跳得掉是空隙的問題，不是膽量的問題。',
              en: 'With no gap there is nothing to jump out of: the prejump frames count as grounded and the string simply hits them out of it. Whether a jump works is a question about your gaps, not about their nerve.',
              ja: '隙間を作らなければ跳ばれない。前置きフレームは地上判定なので、連係がそのまま潰す。跳べるかどうかは隙間の問題であって、相手の度胸の問題ではない。',
            },
          },
        ],
        mixRatio: '26-33%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Burnout',
            patch: '2026-08',
            note: '防禦會消耗動力槽，耗盡即進入 Burnout；Burnout 期間會被必殺技與 SA 削血。來源未標註遊戲版本',
          },
          {
            url: 'https://www.eventhubs.com/news/2023/jun/01/what-to-do-burnout-sf6/',
            patch: '2026-08',
            note: '必殺技削血為原傷害的 25% 且可以致死；Burnout 中每擋一招，攻擊方多得 4 幀有利',
          },
        ],
        notes: {
          'zh-Hant': '力盡的對手擋不掉削血。必殺技與 SA 的削血是原傷害的 25%，血量低的時候光靠連段壓制就能收掉。',
          en: 'A burnt-out defender cannot avoid chip. Blocked specials and Supers deal 25% of their damage, so pressure alone can close a round at low life.',
          ja: 'バーンアウト中の相手は削りを避けられない。必殺技とSAは本来の25%を削るため、体力が低ければ攻めだけで倒し切れる。',
        },
      },
      {
        optionId: 'throw',
        risk: 'low',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '打穿防禦和撥擋，再拿一次倒地繼續循環。',
            en: 'Goes through blocking and parry, takes another knockdown, and the loop continues.',
            ja: 'ガードもパリィも貫通し、再びダウンを奪ってループを続ける。',
          },
          followUp: 'pressure',
          damageBand: '12%',
        },
        onFail: {
          text: {
            'zh-Hant': '被解摔就分開，回合結束。',
            en: 'Teched, you separate and the turn ends.',
            ja: '抜けられれば距離が離れ、ターンが終わる。',
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
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          {
            vs: 'jump-neutral',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '起跳幀投不到。普通摔抓空只有 30 幀，他落地時你已經恢復 —— 摔空了，不是被確反。',
              en: 'The prejump frames cannot be thrown. A whiffed normal throw is only 30 frames and you are recovered by the time they land: you missed, you were not punished.',
              ja: '前置きフレームは投げられない。通常投げの空振りは30Fしかなく、相手が着地する頃には回復している。外しただけで確反ではない。',
            },
          },
        ],
        mixRatio: '16-23%',
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
      },
      {
        optionId: 'command-grab',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '抓住防禦的對手。傷害和起攻都遠高於普通摔，而且他沒有解摔這個選項 —— 純防禦、延遲解摔、動力撥擋全部失效。',
            en: 'Grabs them out of blocking. Far more damage and far better oki than a normal throw, and teching is not on the menu — blocking, delay teching and parry are all switched off.',
            ja: 'ガードしている相手を掴む。通常投げよりダメージも起き攻めも遥かに上で、しかも抜けるという選択肢が無い。ガード・遅らせ抜け・パリィがまとめて無効になる。',
          },
          followUp: 'pressure',
          damageBand: '18-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '空揮的指令投硬直很長。對手跳、後衝刺或直接無敵技，你就是站在那邊等著被打一套。',
            en: 'A whiffed command grab recovers slowly. If they jumped, backdashed or reversed, you are standing there waiting to be punished.',
            ja: '空振りしたコマンド投げは硬直が長い。跳ばれ、バックダッシュされ、あるいは無敵技を出されれば、そのまま一式もらう。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        versus: [
          {
            vs: 'do-nothing',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '純防禦對指令投完全無效，而且它不像普通摔那樣有解摔窗口 —— 這是「一直防」唯一沒有答案的東西。',
              en: 'Blocking does nothing, and unlike a normal throw there is no tech window to reach for. This is the one thing pure defence has no answer to.',
              ja: 'ガードは無意味で、通常投げと違って抜ける窓も無い。ガード一辺倒に唯一答えが無いのがこれ。',
            },
          },
          {
            vs: 'delayed-tech',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '延遲解摔是為了解普通摔而按的，指令投解不掉 —— 他按的那個輸入完全不會發生作用。',
              en: 'A delay tech is an input for a normal throw. A command grab has no tech, so the button they are pressing simply does nothing.',
              ja: '遅らせ投げ抜けは通常投げ用の入力であり、コマンド投げには抜けが存在しないため、押しているボタンは何も起こさない。',
            },
          },
          {
            vs: 'mash-light',
            outcome: 'loss',
            note: {
              'zh-Hant':
                '對面最快的小技多半 4-5 幀，比 5 幀的指令投先打到 —— 對付指令投最便宜的答案。慢一點的角色（桑吉爾夫自己的小技是 7 幀）就不一定贏得了。',
              en: 'Their fastest light is usually 4 or 5 frames and hits before a 5-frame command grab — the cheapest answer to one there is. A slower character does not necessarily win the race; Zangief\'s own light is 7.',
              ja: '相手の最速の弱攻撃はたいてい4〜5Fで、5Fのコマンド投げより先に当たる。コマンド投げへの最も安い対策。ただし遅いキャラなら勝てるとは限らない（ザンギエフ自身の弱攻撃は7F）。',
            },
          },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          {
            vs: 'jump-neutral',
            outcome: 'bigLoss',
            note: {
              'zh-Hant':
                '起跳幀投不到，所以壓得再準也沒用 —— 抓空 60 幀上下，他落地就是一整套。要嘛先用打擊把跳按死，要嘛延遲指令投去抓他落地。',
              en: 'The prejump frames cannot be thrown, so timing it better does not help: sixty-odd frames of whiff and they land on you for a full combo. Either shut the jump down with a strike first, or delay the grab onto their landing.',
              ja: '前置きフレームは投げられないため、丁寧に重ねても意味が無い。60F前後の空振りに着地からフルコンボが入る。先に打撃でジャンプを潰すか、コマ投げを遅らせて着地を狙うかのどちらか。',
            },
          },
        ],
        notes: {
          'zh-Hant': '只有 11 隻角色有，所以它不在「預設打法」的比例裡 —— 那條是通用的。但對有的角色來說，它不是選項之一，而是整個起攻的核心：對手一旦不能靠防禦解決，你的壓起身和退康才真的有威脅。',
          en: 'Only eleven characters have one, so it stays out of the default-mix bar, which is universal. For the characters who do have one it is not an option among others — it is what the whole offence is built on, because once blocking stops being an answer, the meaty and the shimmy start meaning something.',
          ja: '所持は11キャラのみのため、汎用である「基本の配分」には含めていない。ただし持っているキャラにとっては数ある択の一つではなく攻めの軸そのもので、ガードで解決できなくなって初めて重ねやシミーが機能し始める。',
        },
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色的指令投見各角色頁的 Special Moves 區段（attacktype 標為 Throw、且有自己的轉圈／半圓輸入）。31 隻中 11 隻有：A.K.I.、Alex、Blanka、Cammy、E.本田、Jamie、JP、金伯莉、莉莉、瑪濃、桑吉爾夫。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生、1,200 傷害、解摔窗口 9 幀；指令投沒有解摔窗口，這就是它跟普通摔最大的差別',
          },
        ],
      },
      {
        optionId: 'delayed-attack',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '在連段的空隙延遲出招，正好打中他的解摔或速點 —— counter hit 接完整連段。',
            en: 'Delay into the gap so it lands on their tech or their mash — counter hit into a full combo.',
            ja: '連係の隙間で遅らせて出し、投げ抜けや暴れに重ねる。カウンターヒットからフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手純防禦，你的延遲打擊只是被擋，而且比接好的連段更不利。',
            en: 'They just blocked, so the delayed strike is only blocked — and less plus than a clean string.',
            ja: '素直にガードされれば遅らせた打撃はガードされるだけで、繋げた連係より不利になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'loss' },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '13-16%',
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
      },
      {
        optionId: 'low-overhead-mix',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '中下二擇逼他猜。猜錯就是完整連段。',
            en: 'An overhead-or-low guess. Wrong is a full combo.',
            ja: '中下段の二択を迫る。読み違えればフルコンボ。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '猜對就擋下來，而多數中段不利，你被確反。',
            en: 'Guessed right it is blocked, and most overheads are minus, so you get punished.',
            ja: '読まれればガードされ、多くの中段は不利なため確反を受ける。',
          },
          hpLoss: '20-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          { vs: 'delayed-tech', outcome: 'win' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '10-13%',
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
        optionId: 'shimmy',
        risk: 'medium',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '後退誘他解摔，懲罰他落空的解摔硬直。',
            en: 'Walk back to bait the tech and punish its whiffed recovery.',
            ja: '下がって投げ抜けを誘い、空振りの硬直を狩る。',
          },
          followUp: 'combo',
          damageBand: '30-45%',
        },
        onFail: {
          text: {
            'zh-Hant': '他沒解摔，你退開時無防備，被速點或無敵技抓到。',
            en: 'They did not tech, they just pressed — walking back does not reach their mash, and you eat it instead.',
            ja: '相手が投げ抜けではなくボタンを押した場合、下がった分だけ暴れに届かず、こちらが食らう側になる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'delayed-tech', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'mash-light', outcome: 'loss' },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '7-10%',
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
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下他的反抗再撞飛。靠牆就是撞牆接完整連段，尤其他力盡的時候擋住也會暈。',
            en: 'Armour through their answer and launch. Near a wall it is a wall splat into a full combo — and if they are burnt out it stuns even on block.',
            ja: 'アーマーで相手の抵抗を受けて打ち上げる。壁が近ければ壁やられからフルコンボ。相手がバーンアウト中ならガードしてもスタンする。',
          },
          followUp: 'combo',
          damageBand: '25-40%',
        },
        onFail: {
          text: {
            'zh-Hant': '他用自己的動力衝擊撞回來，或是直接摔你 —— 霸體防不住摔投。',
            en: 'They impact back, or simply throw you — armour does not stop throws.',
            ja: '相手のDIで返されるか、単に投げられる。アーマーは投げを防げない。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'do-nothing', outcome: 'win' },
          {
            vs: 'mash-light',
            outcome: 'win',
            note: {
              'zh-Hant': '霸體只有兩次。前兩下小技被吃掉，第三下就破霸體 —— 對手真的連按小拳連段是打得贏的。',
              en: 'The armour is only two hits. It eats the first two lights; a third breaks it, so a genuine light chain does beat this.',
              ja: 'アーマーは2回まで。弱攻撃2発は受け止めるが3発目で割れるため、本気の弱攻撃の連打には負ける。',
            },
          },
          { vs: 'delayed-tech', outcome: 'loss' },
          { vs: 'super-reversal', outcome: 'bigLoss' },
          {
            vs: 'jump-neutral',
            outcome: 'win',
            note: {
              'zh-Hant':
                '動力衝擊照地上判定抓到起跳幀，霸體又讓他打不斷 —— 這是壓制中對跳最乾淨的答案。',
              en: 'Drive Impact catches the prejump frames as grounded and the armour means they cannot interrupt it either. It is the cleanest answer to a jump there is in pressure.',
              ja: 'ドライブインパクトは前置きフレームを地上として捉え、アーマーで割り込みも許さない。固めにおけるジャンプへの最もきれいな回答。',
            },
          },
        ],
        mixRatio: '7-10%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
        notes: {
          'zh-Hant': '對手力盡又在角落的時候，這是全遊戲期望值最高的一手 —— 他擋住也會被撞牆暈眩。',
          en: 'With them burnt out and cornered this is the highest-expectation option in the game: the wall splat stuns them even through a block.',
          ja: '相手がバーンアウトかつ画面端の時、ゲーム中最も期待値の高い一手。ガードしていても壁やられからスタンする。',
        },
      },
      {
        optionId: 'bait-block',
        risk: 'safe',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '停下來防禦，等他的動力反攻、速點或無敵技落空，再打最大懲罰。',
            en: 'Stop and block, waiting for their Drive Reversal, mash or reversal to whiff, then take the maximum punish.',
            ja: '攻めを止めてガードし、リバーサルや暴れ、無敵技の空振りを待って最大反撃を入れる。',
          },
          followUp: 'combo',
          damageBand: '35-55%',
        },
        onFail: {
          text: {
            'zh-Hant': '他也什麼都沒做，你放掉了一次壓制機會。',
            en: 'They did nothing either, and you gave up a turn of pressure.',
            ja: '相手も何もせず、攻めのターンを一度手放すことになる。',
          },
          hpLoss: '5%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'mash-light', outcome: 'bigWin' },
          { vs: 'super-reversal', outcome: 'bigWin' },
          { vs: 'do-nothing', outcome: 'even' },
          { vs: 'delayed-tech', outcome: 'even' },
          { vs: 'jump-neutral', outcome: 'win' },
        ],
        mixRatio: '7-10%',
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
      },
    ],
  },
]
