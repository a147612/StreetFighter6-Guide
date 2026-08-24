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
    opponentOptions: ['throw', 'shimmy', 'low-overhead-mix', 'poke', 'bait-block', 'dash-in'],
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
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
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
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '最被忽略的防摔手段。它不像解摔那樣有硬直，失敗時只是被打到而不是被重罰。',
          en: 'The most overlooked answer to a throw. Unlike a tech it has no recovery to punish, so being wrong costs a hit rather than a full punish.',
          ja: '最も見落とされている投げ対策。投げ抜けと違い硬直がなく、外しても重い反撃ではなく被弾で済む。',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
            'zh-Hant': '撥擋防不住摔投，而且動力槽在你按住的時候一直掉。',
            en: 'Parry does not stop throws, and Drive drains the whole time you hold it.',
            ja: 'パリィは投げを防げず、押している間ドライブを消費し続ける。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'dash-in', outcome: 'win' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手有利的時候按最快的招也還是慢 —— 這裡的速點只該用來嚇阻，不是用來贏。',
          en: 'While they are plus even your fastest button is late. Mashing here is a deterrent, not a way to win.',
          ja: '相手有利の状況では最速の技でも遅い。ここでの暴れは抑止であって勝ち筋ではない。',
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
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
    opponentOptions: ['throw', 'shimmy', 'low-overhead-mix', 'poke', 'bait-block', 'dash-in'],
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
        ],
        mixRatio: '20-25%',
        verified: 'estimated',
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
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'low-overhead-mix', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '最被忽略的防摔手段。它不像解摔那樣有硬直，失敗時只是被打到而不是被重罰。',
          en: 'The most overlooked answer to a throw. Unlike a tech it has no recovery to punish, so being wrong costs a hit rather than a full punish.',
          ja: '最も見落とされている投げ対策。投げ抜けと違い硬直がなく、外しても重い反撃ではなく被弾で済む。',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
            'zh-Hant': '撥擋防不住摔投，而且動力槽在你按住的時候一直掉。',
            en: 'Parry does not stop throws, and Drive drains the whole time you hold it.',
            ja: 'パリィは投げを防げず、押している間ドライブを消費し続ける。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'poke', outcome: 'win' },
          { vs: 'low-overhead-mix', outcome: 'even' },
          { vs: 'dash-in', outcome: 'win' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
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
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
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
          { vs: 'dash-in', outcome: 'loss' },
          { vs: 'bait-block', outcome: 'even' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '要求你認得對手的招的距離與收招長度。難度高，但它是唯一「不冒險就有大回報」的選項。',
          en: 'Demands knowing the range and recovery of their buttons. Hard, but the only option that pays big without gambling.',
          ja: '相手の技の間合いと硬直を覚えている必要がある。難しいが、賭けずに大きな見返りを得られる唯一の択。',
        },
      },
    ],
  },
]
