import type { Situation } from '../schema'

/**
 * Group C — close quarters, by who holds the advantage.
 *
 * Not a position group: at this range the deciding variable is frame advantage.
 * The same button that wins outright at neutral advantage is simply late while
 * they are plus, which is why the two read so differently.
 *
 * Everything is `estimated`.
 */
export const GROUP_C: Situation[] = [
  {
    id: 'c1-they-are-plus',
    side: 'defense',
    group: 'C',
    name: {
      'zh-Hant': '對手有利（你剛防完他的招）',
      en: 'They are plus (you just blocked)',
      ja: '相手が有利（ガード直後）',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'pointBlank',
    stance: 'neutral',
    opponentOptions: ['throw', 'command-grab', 'shimmy', 'low-overhead-mix', 'poke', 'bait-block', 'dash-in'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '打擊全部擋下，退康和牽制招都白費。對手有利的時候，不動是最不會賠的一手。',
            en: 'Every strike is blocked and both shimmy and pokes go nowhere. While they are plus, standing still is what loses least.',
            ja: '打撃は全てガードし、シミーも牽制も無駄になる。相手が有利な間は動かないのが最も損しない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔。傷害低，但對手保住主導權，而且知道你不會按。',
            en: 'Thrown. Low damage, but they keep the turn and now know you will not press.',
            ja: '投げられる。ダメージは軽いが攻め番は相手のままで、押してこないことも知られる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'bigWin' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'dash-in', outcome: 'even' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '21-29%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 1,200 傷害 / 5F 發生 / 命中 +17，血量基準 10,000（Akuma 9,000～Zangief 11,000）',
          },
        ],
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先被擋，摔投還解得掉。對手有利時最泛用的一手。',
            en: 'The strike is blocked first and a throw still breaks — the broadest single answer while they are plus.',
            ja: '打撃は先にガードでき投げにも間に合う。相手有利時に最も汎用性の高い一手。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手把打擊延到你的解摔輸入上，counter hit。',
            en: 'They delayed the strike onto your tech input — counter hit.',
            ja: '打撃を投げ抜けの入力に合わせられカウンターヒット。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'loss' },
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
            'zh-Hant': '摔投被解開，分開一小段，重置。',
            en: 'The throw breaks, you separate slightly, and it resets.',
            ja: '投げを抜けて少し離れ、仕切り直しになる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手在等你按。退康抓到解摔就是完整懲罰。',
            en: 'They were waiting for it. A shimmy that catches a tech is a full punish.',
            ja: '押すのを待たれていた。シミーに投げ抜けを狩られフルコンボ。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
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
        mixRatio: '7-11%',
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
        optionId: 'walk-back',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '退出摔投距離。對手的摔投落空，牽制招也構不到。',
            en: 'Steps out of throw range, so their throw whiffs and their pokes fall short.',
            ja: '投げ間合いから抜ける。投げは空振りし、牽制も届かない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後退的過程沒有防禦，被牽制招或前衝跟上就是 counter hit。',
            en: 'You are not blocking while walking; a poke or a dash-in catches it as a counter hit.',
            ja: '歩いている間はガードしておらず、牽制やダッシュにカウンターヒットで狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '11-14%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生，抓取距離固定 —— 退出那個距離摔就落空，這是後退走位唯一保證做到的事',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '往後走的同時就是在防禦（按住 4），所以退的過程對打擊仍有防禦；代價是牽制招和前衝都能構到你。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '最被忽略的防摔手段。它不像解摔那樣有硬直，失敗時只是被打到而不是被重罰。',
          en: 'The most overlooked answer to a throw. Unlike a tech it has no recovery to punish, so being wrong costs a hit rather than a full punish.',
          ja: '最も見落とされている投げ対策。投げ抜けと違い硬直がなく、外しても重い反撃ではなく被弾で済む。',
        },
      },
          {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投從你腳下落空 —— 起跳的前置幀已經算空中。你有劣勢也一樣成立，只要按得出來。',
            en: 'The throw whiffs under you: the prejump frames already count as airborne. Being minus does not change that, as long as the input comes out.',
            ja: '投げが足元を空振りする——跳び上がりの前置きフレームはすでに空中扱いになっている。不利フレームでも、入力さえ出れば同じこと。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '他有利，所以他可以先按一顆打擊 —— 打擊照地上判定，起跳直接被打斷。貼身被打到空中通常是一整套。',
            en: 'They are plus, so they can put a strike out first — and strikes treat the prejump frames as grounded, so the jump is hit out of the ground. Being hit into the air at point blank is usually a full combo.',
            ja: '相手は有利なので先に打撃を出せる。打撃は前置きフレームを地上として扱うため、跳び上がりはそのまま潰される。密着で浮かされればたいていフルコンボになる。',
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
                '摔投發生 5 幀，而起跳的前置幀投不到 —— 有劣勢也躲得掉，只要你在他的投判定成立之前按得出跳。臨界點是 **+5**：對手 +5 以上，投在你能動之前就判定完了；防到一般普通技是 +1～+4，跳得掉。',
              en: 'A throw starts in 5 frames and the prejump frames cannot be thrown, so this escapes even while you are minus — as long as the jump comes out before the throw becomes active. The threshold is **+5**: past that the throw resolves before you can act at all. Blocking an ordinary normal leaves them at +1 to +4, and the jump gets out.',
              ja: '投げの発生は5Fで、跳び上がりの前置きフレームは投げられない。したがって不利フレームでも、投げが発生する前にジャンプが出れば逃げられる。分岐点は**+5**で、それ以上あると自分が動く前に投げが成立する。通常技をガードした程度なら+1〜+4で、ジャンプは間に合う。',
            },
          },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '一樣投不到，而且他抓空要站 60 幀上下 —— 你落地打得到。指令投角色貼著你的時候，這是唯一「猜對還能拿一套」的選項。',
              en: 'Equally unthrowable, and his whiff leaves him standing for around sixty frames, so you land on it. With a grappler in your face this is the only option that pays you for guessing right.',
              ja: '同じく投げられず、しかも空振りの硬直は60F前後で着地して殴れる。コマ投げキャラに密着されている状況で、読み勝ちにリターンが付く唯一の択。',
            },
          },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/ryu',
            patch: '2026-08',
            note: 'Prejump Frames — 4（桑吉爾夫與莉莉是 5）；普通前摔發生 5 幀。兩個數字相減就是本列的臨界點：對手 +5 以上，投在你能動之前就判定完了。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀。同一頁的普通前摔抓空 30 幀 —— 差距就是落地打不打得到的分界。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant':
            '有劣勢一樣投不到 —— 這一列真正的風險不是投，是他有利、可以先按一顆打擊，而打擊把起跳當地上打。要跳就要賭他選投不選打。',
          en: 'Being minus does not make you throwable — the risk on this row is not the throw, it is that they are plus and can lead with a strike, and a strike treats the jump as grounded. Pressing it is a bet that they picked the throw.',
          ja: '不利フレームでも投げられはしない。この行の本当のリスクは投げではなく、相手が有利で先に打撃を出せること、そして打撃が跳び上がりを地上として扱うことにある。跳ぶなら「相手が投げを選ぶ」方に賭けることになる。',
        },
      },
    {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '一次拉開比走位更多的距離，摔投和大部分近距離招式都構不到。',
            en: 'Gains more ground at once than walking; the throw and most close normals fall short.',
            ja: '歩くより一気に距離を取れ、投げも近距離技も届かなくなる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '沒有無敵，收招長。對手的牽制招或延遲打擊會抓到落地那段。',
            en: 'No invincibility, long recovery: a poke or a delayed attack catches the tail.',
            ja: '無敵なし、硬直が長い。牽制や遅らせ打撃に着地を狩られる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
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
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下牽制招並回動力槽。對手在中距離亂伸手時，撥擋是把他的動作變成你的資源。',
            en: 'Catches the poke and returns Drive. When they keep sticking a limb out, the parry turns their habit into your resource.',
            ja: '牽制を受け止めてドライブを回復する。相手が手を出し続けるなら、その癖を資源に変えられる。',
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
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'dash-in', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '11-14%',
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
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '搶在對手動作之前打中他。五五的時候，最快的招就是最強的招。',
            en: 'Beats them to the punch. When neither side is plus, the fastest button is the strongest one.',
            ja: '相手より先に手を出して当てる。五分の状況では最速の技が最も強い。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手還有利，他的招一定先到 —— counter hit 接完整連段。',
            en: 'They are still plus, so their button lands first — counter hit into a full combo.',
            ja: '相手はまだ有利で技が先に当たる。カウンターヒットからフルコンボ。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'win' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '4 幀的小技比 5 幀的指令投先打到。他延遲一拍，這一手就變成他的確反。',
              en: 'A 4-frame light hits before a 5-frame command grab. Delayed by a beat, the same button becomes their punish.',
              ja: '4Fの弱攻撃は5Fのコマンド投げより先に当たる。一拍遅らされれば同じボタンが相手の確反になる。',
            },
          },
        ],
        mixRatio: '4-7%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '摔投 5F / 輕拳 4F / 同格打擊優先，來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '摔投是 5 frame，多數角色的輕拳是 4 frame，而且同一格相遇時打擊贏摔投 —— 所以對手只有 +1 或更少的時候，速點其實贏得掉他的摔投。+2 以上才是真的來不及。',
          en: 'Throws are 5 frames, most jabs are 4, and a strike beats a throw when they meet on the same frame. So at +1 or less a jab genuinely beats their throw; only from +2 does it stop working.',
          ja: '投げは5F、多くのキャラの弱パンチは4Fで、同フレームで噛み合えば打撃が投げに勝つ。つまり相手が+1以下なら暴れは実際に投げを潰せる。+2以上で初めて間に合わなくなる。',
        },
      },
      {
        optionId: 'whiff-punish',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '等對手的牽制招落空，趁收招打完整連段。這是貼身對峙傷害最高的一手。',
            en: 'Wait for their poke to miss and punish the recovery with a full combo — the highest-damage answer at this range.',
            ja: '牽制の空振りを待ち、硬直にフルコンボを入れる。至近距離で最も火力の高い択。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '看錯時機，你的招在對手還能防的時候出去，被確反。',
            en: 'Mistimed: your button comes out while they can still block, and gets punished.',
            ja: 'タイミングを誤り、相手がまだガードできる時に技を出して確反される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'win' },
          { vs: 'dash-in', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投 60 幀上下，是全遊戲最好確反的東西之一 —— 守住你的距離，等他伸手。',
              en: 'A whiffed command grab is around sixty frames, which makes it one of the most punishable things in the game. Hold your range and let them reach.',
              ja: '空振りしたコマンド投げは60F前後で、ゲーム中でも屈指の確定反撃対象になる。自分の間合いを保って相手が手を出すのを待てばよい。',
            },
          },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色每一招的收招幀數見各角色頁 —— 確反成不成立就是「他的收招比你的發生長多少」，不是感覺問題',
          },
        ],
        notes: {
          'zh-Hant': '要求你認得對手的招的距離與收招長度。難度高，但它是唯一「不冒險就有大回報」的選項。',
          en: 'Demands knowing the range and recovery of their buttons. Hard, but the only option that pays big without gambling.',
          ja: '相手の技の間合いと硬直を覚えている必要がある。難しいが、賭けずに大きな見返りを得られる唯一の択。',
        },
      },
    ],
  },
  {
    id: 'c2-neutral-advantage',
    side: 'defense',
    group: 'C',
    name: {
      'zh-Hant': '五五對峙',
      en: 'Neither side is plus',
      ja: '五分の至近距離',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    distance: 'close',
    stance: 'neutral',
    opponentOptions: ['throw', 'command-grab', 'shimmy', 'low-overhead-mix', 'poke', 'bait-block', 'dash-in'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '打擊全部擋下，退康和牽制招都白費。對手有利的時候，不動是最不會賠的一手。',
            en: 'Every strike is blocked and both shimmy and pokes go nowhere. While they are plus, standing still is what loses least.',
            ja: '打撃は全てガードし、シミーも牽制も無駄になる。相手が有利な間は動かないのが最も損しない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被摔。傷害低，但對手保住主導權，而且知道你不會按。',
            en: 'Thrown. Low damage, but they keep the turn and now know you will not press.',
            ja: '投げられる。ダメージは軽いが攻め番は相手のままで、押してこないことも知られる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'bigWin' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'dash-in', outcome: 'even' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '15-18%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '摔投 1,200 傷害 / 5F 發生 / 命中 +17，血量基準 10,000（Akuma 9,000～Zangief 11,000）',
          },
        ],
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打擊先被擋，摔投還解得掉。對手有利時最泛用的一手。',
            en: 'The strike is blocked first and a throw still breaks — the broadest single answer while they are plus.',
            ja: '打撃は先にガードでき投げにも間に合う。相手有利時に最も汎用性の高い一手。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手把打擊延到你的解摔輸入上，counter hit。',
            en: 'They delayed the strike onto your tech input — counter hit.',
            ja: '打撃を投げ抜けの入力に合わせられカウンターヒット。',
          },
          hpLoss: '22-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'loss' },
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
            'zh-Hant': '摔投被解開，分開一小段，重置。',
            en: 'The throw breaks, you separate slightly, and it resets.',
            ja: '投げを抜けて少し離れ、仕切り直しになる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手在等你按。退康抓到解摔就是完整懲罰。',
            en: 'They were waiting for it. A shimmy that catches a tech is a full punish.',
            ja: '押すのを待たれていた。シミーに投げ抜けを狩られフルコンボ。',
          },
          hpLoss: '22-35%',
          driveLoss: 0,
        },
        versus: [
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
        mixRatio: '7-11%',
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
        optionId: 'walk-back',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '退出摔投距離。對手的摔投落空，牽制招也構不到。',
            en: 'Steps out of throw range, so their throw whiffs and their pokes fall short.',
            ja: '投げ間合いから抜ける。投げは空振りし、牽制も届かない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後退的過程沒有防禦，被牽制招或前衝跟上就是 counter hit。',
            en: 'You are not blocking while walking; a poke or a dash-in catches it as a counter hit.',
            ja: '歩いている間はガードしておらず、牽制やダッシュにカウンターヒットで狩られる。',
          },
          hpLoss: '22-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
          { vs: 'command-grab', outcome: 'win' },
        ],
        mixRatio: '11-15%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/stats',
            patch: '2026-08',
            note: '普通摔投 5F 發生，抓取距離固定 —— 退出那個距離摔就落空，這是後退走位唯一保證做到的事',
          },
          {
            url: 'https://wiki.supercombo.gg/w/Street_Fighter_6/Defense',
            patch: '2026-08',
            note: '往後走的同時就是在防禦（按住 4），所以退的過程對打擊仍有防禦；代價是牽制招和前衝都能構到你。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '最被忽略的防摔手段。它不像解摔那樣有硬直，失敗時只是被打到而不是被重罰。',
          en: 'The most overlooked answer to a throw. Unlike a tech it has no recovery to punish, so being wrong costs a hit rather than a full punish.',
          ja: '最も見落とされている投げ対策。投げ抜けと違い硬直がなく、外しても重い反撃ではなく被弾で済む。',
        },
      },
        {
        optionId: 'jump-neutral',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '摔投從你腳下落空，你原地落回原位。五五的距離下他不一定來得及對空。',
            en: 'The throw whiffs under you and you come straight back down where you were. At even frames they may not have time to anti-air.',
            ja: '投げが足元を空振りし、元の位置にそのまま落ちる。五分の間合いでは相手が対空を間に合わせられるとは限らない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '空中不能防禦。被看到就是對空，而對空通常接得到連段。',
            en: 'You cannot block in the air. Seen, it is an anti-air, and an anti-air usually converts.',
            ja: '空中ではガードできない。見られれば対空され、対空はたいていコンボに繋がる。',
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
                '普通摔投抓空只有 30 幀，你落地時他已經恢復了 —— 躲掉，僅此而已。',
              en: 'A whiffed normal throw is only 30 frames and they have recovered by the time you land. You escaped, and that is all.',
              ja: '通常投げの空振りは30Fしかなく、着地する頃には回復している。避けただけ。',
            },
          },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投是 60 幀上下 —— 你落地他還站在那裡。五五的距離下這是這一頁回報最高的一格。',
              en: 'A whiffed command grab is around sixty frames, so you land while they are still standing in it. At even frames this is the highest-paying cell on the page.',
              ja: '空振りしたコマンド投げは60F前後で、着地したとき相手はまだそこに立っている。五分の状況ではこのページで最もリターンの高いマス。',
            },
          },
          { vs: 'shimmy', outcome: 'loss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'poke', outcome: 'even' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
        ],
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/zangief',
            patch: '2026-08',
            note: 'Screw Piledriver 抓空 61 幀。同一頁的普通前摔抓空 30 幀 —— 差距就是落地打不打得到的分界。來源未標註遊戲版本',
          },
          {
            url: 'https://streetfighter.fandom.com/wiki/Jump',
            patch: '2026-08',
            note: '該頁寫明起跳的前置幀算「空中」、不能被投，但被打擊判定時仍算地上。這是全系列通則頁，不是 SF6 專頁。來源未標註遊戲版本',
          },
          {
            url: 'https://ultimateframedata.com/sf6/ryu',
            patch: '2026-08',
            note: 'Prejump Frames — 4（桑吉爾夫與莉莉是 5）；普通前摔發生 5 幀。來源未標註遊戲版本',
          },
        ],
        notes: {
          'zh-Hant': '五五的時候它才成立 —— 你要跟他同時動，跳才走得掉。這是它跟後衝刺最大的差別：後衝刺從第一幀就有投擲無敵，有劣勢也用得了，垂直跳不行。',
          en: 'It only works at even frames, because the jump has to start with them to leave the ground in time. That is the difference from a backdash, which is throw invincible from frame one and still works while you are minus.',
          ja: '成立するのは五分のときだけで、相手と同時に動かなければ地面を離れるのが間に合わない。ここがバックダッシュとの差で、あちらは1Fから投げ無敵なので不利フレームでも機能する。',
        },
      },
    {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '一次拉開比走位更多的距離，摔投和大部分近距離招式都構不到。',
            en: 'Gains more ground at once than walking; the throw and most close normals fall short.',
            ja: '歩くより一気に距離を取れ、投げも近距離技も届かなくなる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '沒有無敵，收招長。對手的牽制招或延遲打擊會抓到落地那段。',
            en: 'No invincibility, long recovery: a poke or a delayed attack catches the tail.',
            ja: '無敵なし、硬直が長い。牽制や遅らせ打撃に着地を狩られる。',
          },
          hpLoss: '22-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'loss' },
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
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下牽制招並回動力槽。對手在中距離亂伸手時，撥擋是把他的動作變成你的資源。',
            en: 'Catches the poke and returns Drive. When they keep sticking a limb out, the parry turns their habit into your resource.',
            ja: '牽制を受け止めてドライブを回復する。相手が手を出し続けるなら、その癖を資源に変えられる。',
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
          { vs: 'throw', outcome: 'bigLoss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'dash-in', outcome: 'win' },
          { vs: 'command-grab', outcome: 'bigLoss' },
        ],
        mixRatio: '11-15%',
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
        optionId: 'mash-light',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '搶在對手動作之前打中他。五五的時候，最快的招就是最強的招。',
            en: 'Beats them to the punch. When neither side is plus, the fastest button is the strongest one.',
            ja: '相手より先に手を出して当てる。五分の状況では最速の技が最も強い。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手選了防禦或退康，你的招落空被確反。',
            en: 'They blocked or backed off, and your whiffed button gets punished.',
            ja: '相手がガードか後退を選び、空振りを確反される。',
          },
          hpLoss: '22-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'win' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'bait-block', outcome: 'loss' },
          { vs: 'dash-in', outcome: 'win' },
          {
            vs: 'command-grab',
            outcome: 'win',
            note: {
              'zh-Hant':
                '4 幀的小技比 5 幀的指令投先打到。他延遲一拍，這一手就變成他的確反。',
              en: 'A 4-frame light hits before a 5-frame command grab. Delayed by a beat, the same button becomes their punish.',
              ja: '4Fの弱攻撃は5Fのコマンド投げより先に当たる。一拍遅らされれば同じボタンが相手の確反になる。',
            },
          },
        ],
        mixRatio: '11-15%',
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
      },
      {
        optionId: 'whiff-punish',
        risk: 'high',
        reward: 'extreme',
        onSuccess: {
          text: {
            'zh-Hant': '等對手的牽制招落空，趁收招打完整連段。這是貼身對峙傷害最高的一手。',
            en: 'Wait for their poke to miss and punish the recovery with a full combo — the highest-damage answer at this range.',
            ja: '牽制の空振りを待ち、硬直にフルコンボを入れる。至近距離で最も火力の高い択。',
          },
          followUp: 'combo',
          damageBand: '25-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '看錯時機，你的招在對手還能防的時候出去，被確反。',
            en: 'Mistimed: your button comes out while they can still block, and gets punished.',
            ja: 'タイミングを誤り、相手がまだガードできる時に技を出して確反される。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'poke', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'win' },
          { vs: 'dash-in', outcome: 'win' },
          { vs: 'bait-block', outcome: 'even' },
          {
            vs: 'command-grab',
            outcome: 'bigWin',
            note: {
              'zh-Hant':
                '抓空的指令投 60 幀上下，是全遊戲最好確反的東西之一 —— 守住你的距離，等他伸手。',
              en: 'A whiffed command grab is around sixty frames, which makes it one of the most punishable things in the game. Hold your range and let them reach.',
              ja: '空振りしたコマンド投げは60F前後で、ゲーム中でも屈指の確定反撃対象になる。自分の間合いを保って相手が手を出すのを待てばよい。',
            },
          },
        ],
        mixRatio: '7-11%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色每一招的收招幀數見各角色頁 —— 確反成不成立就是「他的收招比你的發生長多少」，不是感覺問題',
          },
        ],
        notes: {
          'zh-Hant': '要求你認得對手的招的距離與收招長度。難度高，但它是唯一「不冒險就有大回報」的選項。',
          en: 'Demands knowing the range and recovery of their buttons. Hard, but the only option that pays big without gambling.',
          ja: '相手の技の間合いと硬直を覚えている必要がある。難しいが、賭けずに大きな見返りを得られる唯一の択。',
        },
      },
    ],
  },
]
