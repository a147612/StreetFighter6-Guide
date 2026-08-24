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
    opponentOptions: ['meaty', 'throw', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'quick-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '比對手預期的早起來，他算好的壓起身會落在你已經能防禦之後。',
            en: 'You are up before they planned for, so their timed meaty lands after you can already block.',
            ja: '相手の想定より早く起き、重ねが自分のガードが間に合った後に来る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手就是照快起的時間點算的，你起來那一格正好吃到最好時機的壓起身或摔投。',
            en: 'They timed it for a quick rise: the frame you stand up is the frame it arrives, at its best timing.',
            ja: '相手は受身のタイミングに合わせており、起き上がった瞬間に最良のタイミングで重なる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '50-70%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '預設選項，交出的資訊最少。強制倒地（掃腿、多數摔投）沒有這個選擇，時間是固定的。',
          en: 'The default; it gives away the least. Hard knockdowns (sweeps, most throws) remove this choice entirely — the timing is fixed.',
          ja: '基本択で、与える情報が最も少ない。ハードダウン（足払いや多くの投げ）ではこの選択自体がなく、タイミングは固定される。',
        },
      },
      {
        optionId: 'delayed-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手照快起的時間點出招，打在空氣上。你起來時他還在收招。',
            en: 'They committed to the quick-rise timing and hit nothing. You stand up while they are still recovering.',
            ja: '相手は受身前提のタイミングで技を出して空振りする。こちらが起きる時、相手はまだ硬直中。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒急著出招，走過來重新站好。你多躺的時間全變成他佈置的時間。',
            en: 'They did not commit; they walked in and reset. Every frame you stayed down became setup time for them.',
            ja: '相手は急がず歩いて位置を取り直す。長く寝ていた時間がそのまま相手の仕込み時間になる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '30-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付「每次都同一個時間點」的對手最有效。對手一旦開始等你，就變成純虧。',
          en: 'Best against someone who runs the same timing every time. The moment they start waiting instead, it is a pure loss.',
          ja: '毎回同じタイミングで重ねる相手に有効。相手が待ち始めた瞬間、損しかしなくなる。',
        },
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
          { vs: 'meaty', outcome: 'win' },
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
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
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
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '15-25%',
        verified: 'estimated',
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
            'zh-Hant': '撥擋防不住摔投。傷害不高，但花掉的動力槽拿不回來，起攻循環繼續。',
            en: 'Parry does not stop throws. Low damage, but the Drive is spent and the loop continues.',
            ja: 'パリィは投げを防げない。ダメージは軽いが消費したドライブは戻らず、ループは続く。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
    opponentOptions: ['meaty', 'throw', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'quick-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '比對手預期的早起來，他算好的壓起身會落在你已經能防禦之後。',
            en: 'You are up before they planned for, so their timed meaty lands after you can already block.',
            ja: '相手の想定より早く起き、重ねが自分のガードが間に合った後に来る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手就是照快起的時間點算的，你起來那一格正好吃到最好時機的壓起身或摔投。',
            en: 'They timed it for a quick rise: the frame you stand up is the frame it arrives, at its best timing.',
            ja: '相手は受身のタイミングに合わせており、起き上がった瞬間に最良のタイミングで重なる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'loss' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '50-70%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '預設選項，交出的資訊最少。強制倒地（掃腿、多數摔投）沒有這個選擇，時間是固定的。',
          en: 'The default; it gives away the least. Hard knockdowns (sweeps, most throws) remove this choice entirely — the timing is fixed.',
          ja: '基本択で、与える情報が最も少ない。ハードダウン（足払いや多くの投げ）ではこの選択自体がなく、タイミングは固定される。',
        },
      },
      {
        optionId: 'delayed-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手照快起的時間點出招，打在空氣上。你起來時他還在收招。',
            en: 'They committed to the quick-rise timing and hit nothing. You stand up while they are still recovering.',
            ja: '相手は受身前提のタイミングで技を出して空振りする。こちらが起きる時、相手はまだ硬直中。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒急著出招，走過來重新站好。你多躺的時間全變成他佈置的時間。',
            en: 'They did not commit; they walked in and reset. Every frame you stayed down became setup time for them.',
            ja: '相手は急がず歩いて位置を取り直す。長く寝ていた時間がそのまま相手の仕込み時間になる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '30-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付「每次都同一個時間點」的對手最有效。對手一旦開始等你，就變成純虧。',
          en: 'Best against someone who runs the same timing every time. The moment they start waiting instead, it is a pure loss.',
          ja: '毎回同じタイミングで重ねる相手に有効。相手が待ち始めた瞬間、損しかしなくなる。',
        },
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
          { vs: 'meaty', outcome: 'win' },
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
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
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
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '15-25%',
        verified: 'estimated',
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
            'zh-Hant': '撥擋防不住摔投。傷害不高，但花掉的動力槽拿不回來，起攻循環繼續。',
            en: 'Parry does not stop throws. Low damage, but the Drive is spent and the loop continues.',
            ja: 'パリィは投げを防げない。ダメージは軽いが消費したドライブは戻らず、ループは続く。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'win' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
    opponentOptions: ['meaty', 'throw', 'shimmy', 'delayed-attack', 'bait-block', 'anti-air'],
    evaluations: [
      {
        optionId: 'quick-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '比對手預期的早起來，他算好的壓起身會落在你已經能防禦之後。',
            en: 'You are up before they planned for, so their timed meaty lands after you can already block.',
            ja: '相手の想定より早く起き、重ねが自分のガードが間に合った後に来る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手就是照快起的時間點算的，你起來那一格正好吃到最好時機的壓起身或摔投。',
            en: 'They timed it for a quick rise: the frame you stand up is the frame it arrives, at its best timing.',
            ja: '相手は受身のタイミングに合わせており、起き上がった瞬間に最良のタイミングで重なる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '50-70%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '預設選項，交出的資訊最少。強制倒地（掃腿、多數摔投）沒有這個選擇，時間是固定的。',
          en: 'The default; it gives away the least. Hard knockdowns (sweeps, most throws) remove this choice entirely — the timing is fixed.',
          ja: '基本択で、与える情報が最も少ない。ハードダウン（足払いや多くの投げ）ではこの選択自体がなく、タイミングは固定される。',
        },
      },
      {
        optionId: 'delayed-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手照快起的時間點出招，打在空氣上。你起來時他還在收招。',
            en: 'They committed to the quick-rise timing and hit nothing. You stand up while they are still recovering.',
            ja: '相手は受身前提のタイミングで技を出して空振りする。こちらが起きる時、相手はまだ硬直中。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒急著出招，走過來重新站好。你多躺的時間全變成他佈置的時間。',
            en: 'They did not commit; they walked in and reset. Every frame you stayed down became setup time for them.',
            ja: '相手は急がず歩いて位置を取り直す。長く寝ていた時間がそのまま相手の仕込み時間になる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '30-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付「每次都同一個時間點」的對手最有效。對手一旦開始等你，就變成純虧。',
          en: 'Best against someone who runs the same timing every time. The moment they start waiting instead, it is a pure loss.',
          ja: '毎回同じタイミングで重ねる相手に有効。相手が待ち始めた瞬間、損しかしなくなる。',
        },
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
          { vs: 'meaty', outcome: 'win' },
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
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '30-40%',
        verified: 'estimated',
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
          { vs: 'throw', outcome: 'win' },
          { vs: 'shimmy', outcome: 'bigLoss' },
          { vs: 'delayed-attack', outcome: 'loss' },
        ],
        mixRatio: '15-25%',
        verified: 'estimated',
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
            'zh-Hant': '撥擋防不住摔投。傷害不高，但花掉的動力槽拿不回來，起攻循環繼續。',
            en: 'Parry does not stop throws. Low damage, but the Drive is spent and the loop continues.',
            ja: 'パリィは投げを防げない。ダメージは軽いが消費したドライブは戻らず、ループは続く。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'meaty', outcome: 'bigWin' },
          { vs: 'throw', outcome: 'loss' },
          { vs: 'shimmy', outcome: 'even' },
          { vs: 'delayed-attack', outcome: 'win' },
        ],
        mixRatio: '20-30%',
        verified: 'estimated',
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
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
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
        ],
        mixRatio: '5%',
        verified: 'estimated',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '回報最高也最容易被讀。最好在對手剛剛壓空一次之後用 —— 那是他最沒準備對空的時候。另外角落被打下來不一定是最差結果：空中互毆換到的有時候等於一次犧牲打，落地後反而拿回一次進攻權。',
          en: 'The highest payoff and the easiest to read. Use it right after a setup of theirs has whiffed, when they are least ready to anti-air. And being knocked out of it is not uniformly the worst case: an air-to-air trade can amount to a sacrifice that hands you back a turn on landing.',
          ja: 'リターンが最も高く、最も読まれやすい。相手の重ねが空振りした直後、対空の準備が最も薄い瞬間に使う。また画面端で撃ち落とされることが常に最悪とは限らない。空中での相打ちは捨て身の一撃となり、着地後にこちらの攻め番が戻ることもある。',
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
        ],
        verified: 'estimated',
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
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
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
          { vs: 'delayed-attack', outcome: 'bigLoss' },
          {
            vs: 'bait-block',
            outcome: 'bigLoss',
            note: {
              'zh-Hant': '對手只要不出手，無敵技就是純虧。這是它唯一的破綻，但很致命。',
              en: 'If they simply do not attack, the reversal is a pure loss. That is its only hole, and it is fatal.',
              ja: '相手が何もしなければ無敵技は損しかしない。唯一の穴だが致命的である。',
            },
          },
        ],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '不是所有角色都有；有些只能靠無敵 SA。低頻使用，價值在於讓對手不敢無腦壓。',
          en: 'Not every character has one; some only get it from an invincible Super Art. Use it rarely — the value is making them hesitate.',
          ja: '全キャラが持つわけではなく、無敵SAでしか出せないキャラもいる。低頻度で、相手を躊躇わせる点に価値がある。',
        },
      },
    ],
  },
]
