import type { Situation } from '../schema'

/**
 * Group A — waking up.
 *
 * Ordered so the prerequisite comes first: the rise timing decides which of the
 * opponent's setups can even be timed correctly, so every situation after A1
 * assumes that choice has already been made.
 *
 * Everything here is `estimated`: qualitative reads and damage bands, not frame
 * data. Health costs are bands of your own life bar and assume a competent
 * punish, not an optimal one.
 */
export const GROUP_A: Situation[] = [
  {
    id: 'a1-rise-timing',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '起身時機：受身還是不受身',
      en: 'Rise timing: quick rise or stay down',
      ja: '起き上がりのタイミング：受身するかしないか',
    },
    brief: {
      'zh-Hant': '這是所有起身選擇的前提 —— 你先決定「何時」起來，對手才能決定疊什麼。',
      en: 'The choice every other wakeup option sits on top of: you pick when to get up, and only then can they time anything.',
      ja: '他のすべての起き上がり択の前提。いつ起きるかを先に決めるからこそ、相手は重ねる技を選べる。',
    },
    summary: {
      'zh-Hant':
        '大部分倒地都能選擇馬上受身或不受身晚一點起來。這個選擇本身沒有好壞 —— 它的價值完全來自「對手預期哪一個」。習慣只用一種的人，會被完美時間點的疊招吃掉整場。注意硬倒地（掃腿、特定技、多數投擲）沒有這個選項，時間點是固定的。',
      en: 'Most knockdowns let you rise immediately or stay down and get up later. Neither is better in itself — the value comes entirely from which one they expected. Anyone who always picks the same one gets eaten by perfectly-timed setups all match. Hard knockdowns (sweeps, certain moves, most throws) do not offer the choice; the timing is fixed.',
      ja: 'ほとんどのダウンでは、すぐ受身を取るか、受身せず遅く起きるかを選べる。どちらが優れているわけではなく、価値は「相手がどちらを予想していたか」だけで決まる。片方に偏る人は、完璧なタイミングの重ねに一試合中狩られ続ける。なおハードダウン（足払いや特定技、ほとんどの投げ）ではこの選択肢はなく、タイミングは固定される。',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    evaluations: [
      {
        optionId: 'quick-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '你比對手預期的早起來，他的疊招時間點會落在你已經能防禦之後 —— 攻勢等於空轉一次。',
            en: 'You are up earlier than they planned for, so their setup lands after you can already block — the pressure whiffs a turn.',
            ja: '相手の想定より早く起き上がるため、重ねが自分のガードが間に合った後に来る。攻めが一度空転する。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手就是算著快起的時間點在疊招 —— 你起來的那一格正好吃到打擊或投擲，而且是最佳時機的版本。',
            en: 'They timed the setup for a quick rise exactly. The frame you stand up is the frame their attack or throw arrives, at its best possible timing.',
            ja: '相手は受身のタイミングに合わせて重ねている。起き上がった瞬間に打撃か投げが最良のタイミングで重なる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
        },
        counteredBy: ['meaty', 'throw'],
        mixRatio: '50-70%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '預設選項，因為它交出的資訊最少、也讓對手的準備時間最短。但不能只用這個。',
          en: 'The default, because it gives away the least and leaves them the least time to prepare. Just do not only ever pick it.',
          ja: '与える情報が最も少なく、相手の準備時間も最短なので基本択。ただしこれ一択にはしないこと。',
        },
      },
      {
        optionId: 'delayed-rise',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手照快起的時間點疊了招，結果打在空氣上；你起來時他正在收招，換你先動。',
            en: 'They committed to the quick-rise timing and hit nothing. You stand up while they are still recovering, and the turn is yours.',
            ja: '相手は受身前提のタイミングで技を出し、空振りする。こちらが起きる時に相手は硬直中で、先に動けるのはこちら。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒有急著疊招，而是走過來重新站好 —— 你多躺的那段時間全部變成他佈置的時間，狀況比快起更差。',
            en: 'They did not commit; they walked in and reset their spacing. Every frame you stayed down became setup time for them, leaving you worse off than a quick rise.',
            ja: '相手は重ねを急がず、歩いて位置を取り直す。長く寝ていた時間がそのまま相手の仕込み時間になり、受身より状況が悪くなる。',
          },
          hpLoss: '20-40%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '對手取得完美的距離與時間點',
            en: 'They get the spacing and timing they wanted',
            ja: '相手が望んだ間合いとタイミングを取られる',
          },
        },
        counteredBy: ['walk-fake-throw', 'delayed-attack', 'reset-neutral'],
        mixRatio: '30-50%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對上「每次都疊同一個時間點」的對手最有效。對手一旦開始等你，這個選項就變成純虧。',
          en: 'Best against someone who runs the same timing every knockdown. The moment they start waiting for you instead, it becomes a pure loss.',
          ja: '毎回同じタイミングで重ねてくる相手に最も有効。相手が待つようになった瞬間、この択は損しかしなくなる。',
        },
      },
    ],
  },

  {
    id: 'a2-midscreen-wakeup',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '場中倒地，對手貼身',
      en: 'Midscreen wakeup, opponent right on top of you',
      ja: '画面中央でダウン、相手が密着',
    },
    brief: {
      'zh-Hant': '身後有空間，所以逃跑類選項還算數 —— 這是角落唯一沒有的東西。',
      en: 'There is space behind you, so escape options still count — the one thing the corner does not give you.',
      ja: '後方に空間があるため、逃げる択がまだ機能する。画面端には無いものがこれ。',
    },
    summary: {
      'zh-Hant':
        '對手站在你身上等你起來，但你身後有半個場地。這讓後衝刺與後跳從「幾乎不能用」變成「值得混進去」，也讓你失敗的代價比角落低 —— 因為即使被打到，你不會被直接推進死角。相對地，對手的連段傷害也比角落低，所以雙方的期望值都比較溫和。',
      en: 'They are standing over you, but half a stage sits behind you. That turns backdash and back jump from near-unusable into real parts of the mix, and it makes being wrong cheaper than it is in the corner — getting hit does not immediately put you in the worst place on screen. Their combos also do less here, so both sides are playing for smaller numbers.',
      ja: '相手は起き上がりを待って密着しているが、後方には画面半分の空間がある。これによりバックダッシュとバックジャンプが「ほぼ使えない」から「混ぜる価値がある」に変わり、読み負けの代償も画面端より軽い。被弾しても最悪の位置に直行するわけではない。相手のコンボ火力も画面端より低いため、双方の期待値が穏やかになる。',
    },
    position: ['midscreen'],
    myDrive: ['low', 'mid', 'high'],
    evaluations: [
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '晚一點按，疊上來的打擊先打到你的防禦，投擲還來得及解。一次覆蓋兩個最常見的起攻選擇。',
            en: 'Pressing late lets a meaty land on your guard while a throw still gets teched. It covers the two most common oki choices at once.',
            ja: '入力を遅らせることで、重ねた打撃はガードで受け、投げには間に合う。最も多い二択の両方を同時にカバーできる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也把打擊延遲了，正好打在你按解摔的瞬間 —— counter hit，傷害與連段長度都上一階。',
            en: 'They delayed their attack too and it lands on your tech input — a counter hit, which raises both the damage and the combo length a tier.',
            ja: '相手も打撃を遅らせ、投げ抜けの入力に重なる。カウンターヒットとなり、ダメージもコンボの長さも一段上がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        counteredBy: ['delayed-attack', 'shimmy'],
        mixRatio: '30-40%',
        verified: 'estimated',
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '投擲被解開，雙方分開一小段距離，重置回中立。',
            en: 'The throw is broken, you separate slightly, and the reset is neutral.',
            ja: '投げを抜けて少し距離が離れ、状況はニュートラルに戻る。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手沒有投擲，而是後退看著你按 —— 解摔的動作有硬直，你會吃到一套完整的懲罰。',
            en: 'They did not throw; they walked back and watched you press. The tech animation has recovery, so you eat a full punish.',
            ja: '相手は投げずに下がって様子を見ていた。投げ抜けの動作には硬直があるため、フルコンボの反撃を受ける。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        counteredBy: ['shimmy', 'delayed-attack'],
        mixRatio: '20-30%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '吸收打擊並回一些 Drive。時機夠準會變成 Perfect Parry，對手大幅硬直，你能直接反打一套。',
            en: 'Absorbs the hit and returns some Drive. Tight enough and it becomes a Perfect Parry, freezing them long enough for a full punish.',
            ja: '打撃を受け止めてドライブゲージを一部回復する。タイミングが合えばパーフェクトパリィになり、相手を大きく硬直させてフルコンボで反撃できる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': 'Parry 防不住投擲。傷害不高，但你花掉的 Drive 拿不回來，而且起攻循環繼續。',
            en: 'Parry does not stop throws. The damage is modest, but the Drive you spent holding it is gone and the oki loop continues.',
            ja: 'パリィは投げを防げない。ダメージは軽いが、消費したドライブゲージは戻らず、起き攻めのループが続く。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        counteredBy: ['throw', 'shimmy'],
        mixRatio: '20-30%',
        verified: 'estimated',
      },
      {
        optionId: 'backdash',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '躲開投擲與大部分近身打擊，並且真的拉開了距離 —— 場中才有的收益，回到中距離重新開始。',
            en: 'Dodges the throw and most close attacks, and actually gains ground — a midscreen-only payoff that resets you to neutral range.',
            ja: '投げとほとんどの近距離打撃を避けつつ、実際に距離を取れる。画面中央でのみ得られる成果で、中距離から再開できる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '後衝刺沒有無敵，收招也長。對手疊招或延遲打擊都會抓到你落地的那段 —— 通常是 counter hit。',
            en: 'Backdash has no invincibility and a long recovery. A meaty or a delayed attack catches the tail of it, usually as a counter hit.',
            ja: 'バックダッシュには無敵がなく、硬直も長い。重ねや遅らせ打撃に着地部分を狩られ、多くはカウンターヒットになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        counteredBy: ['delayed-attack', 'meaty', 'drive-rush-pressure'],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '這是這個情境跟角落最大的差別。同一個選項在角落幾乎沒有收益，在場中值得放進混合。',
          en: 'This is the biggest difference between here and the corner. The same option pays almost nothing when cornered and earns a place in the mix midscreen.',
          ja: 'この状況と画面端の最大の違いがこれ。同じ択が画面端ではほぼ無価値で、中央では混ぜる価値がある。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打斷投擲或還沒發動的 Drive Rush，換到一點傷害和一次分開。',
            en: 'Interrupts a throw attempt or a Drive Rush that has not started yet, for small damage and a separation.',
            ja: '投げや発動前のドライブラッシュを潰し、少量のダメージと距離を取る機会を得る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手疊了打擊，你的輕攻擊還沒出來就被打到 —— counter hit 接完整連段。',
            en: 'They stuffed a meaty on you and your light never came out — counter hit into a full combo.',
            ja: '重ねられた打撃に潰され、弱攻撃は出る前にカウンターヒットを受けてフルコンボに繋がる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        counteredBy: ['meaty', 'delayed-attack', 'bait-block'],
        mixRatio: '10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '低頻。價值不在勝率，而在於讓對手不敢無限延遲 —— 完全不按的人會被延遲打擊吃掉所有解摔。',
          en: 'Keep it rare. The value is not the win rate but the threat: never pressing lets them delay forever and eat every tech you have.',
          ja: '低頻度で。価値は勝率ではなく抑止力にある。まったく暴れないと、無限に遅らせて投げ抜けを全て狩られる。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊和投擲，把對手打飛，你重新取得場地中央的主導權。',
            en: 'Goes through both the meaty and the throw, launches them, and hands you the middle of the stage.',
            ja: '打撃も投げも貫通して相手を打ち上げ、画面中央の主導権を取り戻す。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防或乾脆不進攻，看著你的無敵技落空 —— punish counter，遊戲裡最重的懲罰之一。',
            en: 'They blocked, or simply did not attack, and watched it whiff — punish counter, one of the heaviest penalties in the game.',
            ja: 'ガードされる、あるいは相手が何もせず空振りを見られる。パニッシュカウンターとなり、ゲーム中最も重い代償のひとつを払う。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        counteredBy: ['bait-block', 'meaty'],
        mixRatio: '5-10%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '不是所有角色都有。低頻使用，價值在於讓對手不敢無腦疊招 —— 完全不用等於送對手免費的起攻。',
          en: 'Not every character has one. Use it rarely; the value is making them hesitate to stack pressure blindly. Never using it hands them free oki.',
          ja: '全キャラが持つわけではない。低頻度で使い、相手に安易な重ねを躊躇わせる点に価値がある。まったく使わないと起き攻めをタダで通される。',
        },
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '純防禦。打擊全部擋下，Shimmy 與延遲打擊完全落空 —— 你什麼都沒拿到，但也什麼都沒賠。',
            en: 'Pure defence. Every strike is blocked and both shimmy and delayed attacks whiff entirely — you gain nothing and lose nothing.',
            ja: 'ガードのみ。打撃は全て受け止め、シミーも遅らせ打撃も完全に空振りする。何も得られないが何も失わない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手投你。傷害不高，但你被重新起攻，而且對手學到「這個人不按」—— 之後投擲比例只會更高。',
            en: 'They throw you. Low damage, but you are back in oki and they have learned you do not press — the throw rate only goes up from here.',
            ja: '投げられる。ダメージは軽いが再び起き攻めに戻され、しかも「この相手は押してこない」と学習される。以降の投げ比率は上がるだけ。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        counteredBy: ['throw', 'low-overhead-mix'],
        mixRatio: '20-30%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '最被低估的選項。它是唯一「失敗代價固定且很低」的選擇 —— 對手要靠投擲慢慢磨掉你，比一套連段慢得多。',
          en: 'The most underrated option here. It is the only one whose failure cost is both fixed and small: grinding you down with throws is far slower than one combo.',
          ja: '最も過小評価されている択。失敗時の代償が固定かつ小さい唯一の選択肢であり、投げで削り切るのはコンボ一発よりはるかに遅い。',
        },
      },
    ],
  },

  {
    id: 'a3-cornered-wakeup',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '角落倒地，對手貼身',
      en: 'Cornered wakeup, opponent right on top of you',
      ja: '画面端でダウン、相手が密着',
    },
    brief: {
      'zh-Hant': '沒有退路，所以每個選項的代價都比場中更重。',
      en: 'No space behind you, so every option costs more than it would midscreen.',
      ja: '後ろに逃げ場がないため、どの選択肢も画面中央より代償が大きい。',
    },
    summary: {
      'zh-Hant':
        '同一組選項，全部貶值一階。後衝刺與後跳失去意義（沒有空間可退），對手的連段傷害更高，而且失敗之後你會留在同一個位置再被起攻一次 —— 這才是角落真正貴的地方：不是單次傷害，是它會重複發生。相對地，Parry 的價值上升，因為它是唯一能一次改變位置的低成本選項。',
      en: 'The same option list, every entry a tier worse. Backdash and back jump stop meaning anything with no room to use them, their combos hit harder, and losing the exchange leaves you in the same spot to face it again — which is the real cost of the corner: not the single hit, but the repetition. Parry goes up in value in exchange, being the only cheap option that can change the position outright.',
      ja: '同じ選択肢が全て一段階格下げされる。後方に空間がないためバックダッシュとバックジャンプは意味を失い、相手のコンボ火力は上がり、読み負ければ同じ位置でもう一度同じ択を迫られる。画面端の本当の代償は単発のダメージではなく、それが繰り返されること。代わりにパリィの価値が上がる。位置そのものを一手で変えられる唯一の低コスト択だからである。',
    },
    position: ['cornered'],
    myDrive: ['low', 'mid', 'high'],
    evaluations: [
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '同時覆蓋疊打擊與投擲。在角落這仍然是最穩的一手，因為它不需要空間。',
            en: 'Covers the meaty and the throw at once. Still the steadiest answer here, because it needs no space to work.',
            ja: '重ねと投げの両方を同時にカバーする。空間を必要としないため、画面端でも最も安定した一手。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手也延遲了打擊，正好打在你按解摔的那一刻 —— counter hit，而且角落連段的傷害比場中高一截。',
            en: 'They delayed too and it lands on your tech input — counter hit, and corner combos carry noticeably more damage than midscreen ones.',
            ja: '相手も遅らせており、投げ抜けの入力に重なる。カウンターヒットとなり、画面端のコンボは中央よりはっきり高いダメージになる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '仍在角落，連段結束後再被起攻一次',
            en: 'Still cornered, set up for another oki attempt',
            ja: '画面端のまま、コンボ後にもう一度起き攻めを受ける',
          },
        },
        counteredBy: ['delayed-attack', 'shimmy'],
        mixRatio: '30-40%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '吸收打擊、回一些 Drive，時機準的話 Perfect Parry 直接反打一套並把對手推回去 —— 在角落這是唯一低成本的翻身鍵。',
            en: 'Absorbs the hit, returns some Drive, and on a tight window a Perfect Parry buys a full punish that pushes them back — the only cheap way out of the corner.',
            ja: '打撃を受け止めてドライブを一部回復し、タイミングが合えばパーフェクトパリィからフルコンボで押し返せる。画面端で唯一の低コストな逆転手段。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': 'Parry 防不住投擲。傷害不高，但你回到原點 —— 還在角落、再被起攻、Drive 也少了。',
            en: 'Parry does not stop throws. Low damage, but you are back where you started: cornered, facing oki, and down a bar.',
            ja: 'パリィは投げを防げない。ダメージは軽いが振り出しに戻る。画面端のまま、再び起き攻め、ゲージも減っている。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
          positionLoss: {
            'zh-Hant': '被投擲後仍在角落，循環繼續',
            en: 'Thrown, still cornered, the loop continues',
            ja: '投げられて画面端のまま、ループが継続',
          },
        },
        counteredBy: ['throw', 'shimmy'],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '這是角落唯一評價比場中「更高」的選項 —— 因為它的回報是位置，而位置正是你現在最缺的東西。',
          en: 'The one option that grades higher here than midscreen: its payoff is position, and position is exactly what you are short of.',
          ja: '画面中央より評価が上がる唯一の択。見返りが「位置」であり、今まさに欠けているものがそれだからである。',
        },
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '投擲被解開，雙方分開一小段。你還在角落，但對手的起攻循環斷了一次。',
            en: 'The throw is broken and you separate slightly. Still cornered, but their oki loop is interrupted once.',
            ja: '投げを抜けて少し距離が離れる。画面端のままだが、相手の起き攻めループを一度断てる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手後退看著你按解摔 —— 解摔有硬直，你吃到完整懲罰連段。這是角落最貴的失敗。',
            en: 'They walked back and watched you press. The tech has recovery, so you eat a full punish combo — the most expensive way to be wrong here.',
            ja: '相手は下がって様子を見ていた。投げ抜けには硬直があるためフルコンボの反撃を受ける。画面端で最も代償の大きい読み負け。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '仍在角落，連段結束後再被起攻一次',
            en: 'Still cornered, set up for another oki attempt',
            ja: '画面端のまま、コンボ後にもう一度起き攻めを受ける',
          },
        },
        counteredBy: ['shimmy', 'delayed-attack'],
        mixRatio: '15-25%',
        verified: 'estimated',
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '全部擋下。Shimmy 和延遲打擊完全落空，你沒有拿到任何東西，但也沒有交出血量。',
            en: 'Everything is blocked. Shimmy and delayed attacks whiff completely; you take nothing and give nothing.',
            ja: '全てガードする。シミーも遅らせ打撃も完全に空振りし、何も得ないが何も失わない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手投你，你被推進更深的角落，起攻循環從頭再來一次。',
            en: 'They throw you deeper into the corner and the oki loop starts over.',
            ja: '投げられてさらに画面端へ押し込まれ、起き攻めループが最初からやり直しになる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '角落更深，循環重來',
            en: 'Deeper in the corner, loop restarts',
            ja: 'より深い画面端、ループが再開',
          },
        },
        counteredBy: ['throw', 'low-overhead-mix'],
        mixRatio: '20-30%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '角落最被低估的一手。被投掉 10% 血，遠比讀錯一次吃 45% 划算 —— 你在買時間等對手犯錯。',
          en: 'The most underrated answer in the corner. Losing 10% to a throw is far cheaper than losing 45% to one bad read; you are buying time for them to make the mistake instead.',
          ja: '画面端で最も過小評価されている一手。投げで10%失うのは、読み違いで45%失うよりはるかに安い。相手のミスを待つ時間を買っている。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'high',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '打斷投擲或還沒發動的 Drive Rush，換到一點傷害和一次脫離。',
            en: 'Interrupts a throw or a Drive Rush that has not started, for small damage and one beat of freedom.',
            ja: '投げや発動前のドライブラッシュを潰し、少量のダメージと一瞬の解放を得る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '被疊招吃掉 —— counter hit 接角落連段，這是這個情境傷害最高的失敗方式之一。',
            en: 'Stuffed by the meaty — counter hit into a corner combo, one of the highest-damage ways to lose this exchange.',
            ja: '重ねに潰されてカウンターヒットから画面端コンボ。この状況で最も高いダメージを受ける負け方のひとつ。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '角落，且對手幾乎沒消耗 Drive',
            en: 'Cornered, and they spent almost no Drive for it',
            ja: '画面端のまま、しかも相手はほとんどドライブを消費していない',
          },
        },
        counteredBy: ['meaty', 'delayed-attack', 'bait-block'],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
      {
        optionId: 'jump-back',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '躲過投擲和大部分下段。但角落沒有後退空間，落地後你還在同一個位置 —— 幾乎沒有實質收益。',
            en: 'Avoids the throw and most lows. But with no room behind you, you land in the same place — almost no actual gain.',
            ja: '投げとほとんどの下段を避けられる。しかし後方に空間がないため同じ位置に着地し、実質的な利益はほぼない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手看到起跳直接對空 —— 空中不能防禦，確定命中，而且對空通常能接連段。',
            en: 'They see the jump and anti-air it. You cannot block in the air, so it is guaranteed, and anti-airs usually convert.',
            ja: 'ジャンプを見られれば対空が確定する。空中はガードできず、対空からコンボに繋がることも多い。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '落回角落，狀況比之前更差',
            en: 'Lands back in the corner, worse off than before',
            ja: '画面端に着地し、以前より不利な状況になる',
          },
        },
        counteredBy: ['anti-air', 'meaty', 'delayed-attack'],
        verified: 'estimated',
        notes: {
          'zh-Hant': '收錄它是為了對照：同一個選項在場中值得混、在完全角落幾乎不該用。決定評價的是位置，不是選項本身。',
          en: 'Listed for the contrast: the same option earns a place in the midscreen mix and is close to indefensible fully cornered. Position decides the grade, not the option.',
          ja: '対比のために収録している。同じ択が画面中央では混ぜる価値があり、完全な画面端ではほぼ選べない。評価を決めるのは択ではなく位置である。',
        },
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打穿打擊與投擲，把對手打飛並脫離角落。這是唯一能一次解決「位置」問題的選項。',
            en: 'Goes through both the meaty and the throw, launches them, and gets you out of the corner — the only option that solves the position problem in one action.',
            ja: '打撃も投げも貫通して相手を打ち上げ、画面端から脱出できる。位置の問題を一手で解決できる唯一の択。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防看著它落空 —— punish counter，最重的懲罰之一，而且你還在角落。',
            en: 'They block and watch it whiff — punish counter, one of the heaviest penalties in the game, and you are still cornered.',
            ja: 'ガードされて空振りを見られる。パニッシュカウンターとなり、最も重い代償を払ったうえ画面端のまま。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
          positionLoss: {
            'zh-Hant': '仍在角落，且對手取得巨大血量優勢',
            en: 'Still cornered, and they take a large life lead',
            ja: '画面端のまま、相手に大きな体力リードを与える',
          },
        },
        counteredBy: ['bait-block', 'meaty'],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
    ],
  },

  {
    id: 'a4-hard-knockdown',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '硬倒地，對手完美疊招',
      en: 'Hard knockdown, perfectly timed setup',
      ja: 'ハードダウン、完璧に重ねられている',
    },
    brief: {
      'zh-Hant': '起身時間固定，所以 A1 那層混合消失了 —— 你只剩選項層可以打。',
      en: 'The rise timing is fixed, so the A1 layer of mixup is gone — the option layer is all you have left.',
      ja: '起き上がりのタイミングが固定されるため A1 の読み合いが消える。残るのは択のレイヤーだけ。',
    },
    summary: {
      'zh-Hant':
        '掃腿、多數投擲與特定招式造成的硬倒地不能受身，起身時間是固定的。這代表對手可以把打擊疊在你起身的第一格上，時間點不可能出錯 —— 你沒有辦法用「早起或晚起」去干擾他。所以這個情境比 A2/A3 更難：少了一整層混合，你的每個選擇都是純粹的猜拳，而且對手知道確切時間。',
      en: 'Sweeps, most throws and certain moves cause a hard knockdown with no quick rise, so the timing is fixed. That means they can put a strike on the exact frame you stand up and cannot mistime it — and you have no early-or-late option to disturb it. This is harder than A2/A3 for that reason: a whole layer of mixup is missing, so every choice is a bare guess against someone who knows the exact timing.',
      ja: '足払いやほとんどの投げ、特定の技によるハードダウンでは受身が取れず、起き上がりのタイミングが固定される。つまり相手は起き上がりの1フレーム目に打撃を重ねることができ、タイミングを外しようがない。こちらには早起き・遅起きで揺さぶる手段がない。A2/A3 より難しいのはこのためで、読み合いのレイヤーが一段消え、正確なタイミングを知る相手に対する純粋な二択になる。',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    knockdownType: 'hard',
    evaluations: [
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '疊上來的打擊被防住，投擲仍然解得掉。在時間點固定的情況下，這仍是覆蓋面最廣的一手。',
            en: 'The meaty is blocked and the throw is still teched. With the timing fixed, this remains the widest single answer.',
            ja: '重ねられた打撃はガードでき、投げには間に合う。タイミングが固定された状況でも最も広くカバーできる一手。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手知道確切時間，所以他的延遲打擊也可以精準地放在你的解摔輸入上 —— 這裡的 counter hit 比軟倒地更容易被打出來。',
            en: 'They know the exact timing, so their delayed attack can sit precisely on your tech input. Counter hits land more reliably here than off a soft knockdown.',
            ja: '相手は正確なタイミングを知っているため、遅らせ打撃を投げ抜けの入力にぴったり合わせられる。ソフトダウンよりカウンターヒットが安定して決まる。',
          },
          hpLoss: '30-50%',
          driveLoss: 0,
        },
        counteredBy: ['delayed-attack', 'shimmy'],
        mixRatio: '30-40%',
        verified: 'estimated',
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '把所有打擊都擋下來。對手在完美時間點疊的招也只是被防住 —— 他花的準備完全沒有換到東西。',
            en: 'Blocks every strike. Even a perfectly timed meaty is just blocked, and all their setup work buys them nothing.',
            ja: '全ての打撃をガードする。完璧なタイミングの重ねもガードされるだけで、相手の仕込みは何も生まない。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被投。傷害固定且低，但對手保住主導權，而且會開始把投擲比例調高。',
            en: 'Thrown. The damage is fixed and small, but they keep the turn and will start weighting throws higher.',
            ja: '投げられる。ダメージは固定かつ軽いが、相手は攻めを継続し、以降は投げの比率を上げてくる。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        counteredBy: ['throw', 'low-overhead-mix'],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '時間點固定的情境反而讓純防禦更有價值 —— 對手的優勢是「知道何時」，而純防禦完全不在乎何時。',
          en: 'A fixed timing actually raises the value of pure blocking: their edge is knowing when, and blocking does not care when.',
          ja: 'タイミングが固定される状況ではむしろガード択の価値が上がる。相手の優位は「いつか分かること」であり、ガードはいつかを問わない。',
        },
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '對手的時間點固定，代表你的 Perfect Parry 時機也可以練成固定的 —— 這是少數「對手的優勢反過來變成你的優勢」的地方。',
            en: 'Their timing being fixed means your Perfect Parry timing can be drilled to a fixed one too — a rare case where their advantage becomes yours.',
            ja: '相手のタイミングが固定されるということは、こちらのパーフェクトパリィのタイミングも固定して練習できるということ。相手の優位がそのままこちらの優位に変わる稀なケース。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '被投擲，Drive 也白花。對手看穿你在等 Parry 之後，投擲會變成他的主要選擇。',
            en: 'Thrown, and the Drive is spent for nothing. Once they read that you are waiting to parry, the throw becomes their main pick.',
            ja: '投げられ、ドライブゲージも無駄になる。パリィ待ちだと読まれれば、相手の主軸は投げになる。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        counteredBy: ['throw', 'shimmy'],
        mixRatio: '20-30%',
        verified: 'estimated',
      },
      {
        optionId: 'reversal',
        risk: 'extreme',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '對手為了完美疊招通常會提前輸入 —— 這代表他更難臨時改成空防。無敵技在這裡的命中率反而比一般起身高。',
            en: 'Committing to a perfect meaty usually means committing the input early, which makes switching to a block on reaction harder. Reversals actually connect more often here than off a normal wakeup.',
            ja: '完璧な重ねを狙う相手は入力を早めに仕込むことが多く、とっさにガードへ切り替えづらい。無敵技は通常の起き上がりより通りやすい。',
          },
          followUp: 'neutral',
          damageBand: '12-18%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空防等你 —— punish counter，而且硬倒地通常代表你上一次已經輸掉一個回合，血量差距會被拉開得更難追。',
            en: 'They blocked and waited — punish counter, and since a hard knockdown usually means you already lost the last exchange, the life gap becomes much harder to close.',
            ja: 'ガードして待たれる。パニッシュカウンターとなり、ハードダウン自体が前の攻防に負けた結果であることが多いため、体力差はさらに詰めづらくなる。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
        },
        counteredBy: ['bait-block'],
        mixRatio: '5-10%',
        verified: 'estimated',
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '幾乎只有在對手選擇投擲時才會贏。時間點固定代表他的打擊一定比你的輕攻擊先到。',
            en: 'Essentially only wins when they chose to throw. A fixed timing means their strike is always out before your light is.',
            ja: '相手が投げを選んだ時にしか勝てないに等しい。タイミングが固定される以上、相手の打撃は必ずこちらの弱攻撃より先に出る。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '打擊必定先到，counter hit 接完整連段。這是這個情境裡最不該按的一手。',
            en: 'Their strike arrives first by construction — counter hit into a full combo. The worst button to press in this situation.',
            ja: '構造上、相手の打撃が必ず先に当たる。カウンターヒットからフルコンボ。この状況で最も押してはいけないボタン。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
        },
        counteredBy: ['meaty', 'delayed-attack', 'bait-block'],
        verified: 'estimated',
        notes: {
          'zh-Hant': '軟倒地時它是低頻但有價值的威嚇；硬倒地時它基本上是送分。這是同一選項評價落差最大的例子之一。',
          en: 'Off a soft knockdown it is a rare but real threat; off a hard one it is close to donating the round. One of the sharpest grade swings any option has.',
          ja: 'ソフトダウンでは低頻度ながら意味のある抑止だが、ハードダウンではほぼ献上に等しい。同一の択で最も評価が振れる例のひとつ。',
        },
      },
    ],
  },

  {
    id: 'a5-vs-drive-rush-oki',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '對手用 Drive Rush 起攻',
      en: 'They open with Drive Rush oki',
      ja: '相手がドライブラッシュで起き攻めしてくる',
    },
    brief: {
      'zh-Hant': '對手花 Drive 換速度與有利 —— 你的解摔窗口被壓縮，但他的資源也在燒。',
      en: 'They are spending Drive for speed and advantage — your tech window shrinks, but their resources are burning too.',
      ja: '相手はドライブを速度と有利に変換している。こちらの投げ抜け猶予は縮むが、相手の資源も燃えている。',
    },
    summary: {
      'zh-Hant':
        'Drive Rush 讓對手的攻擊更快抵達且更有利，同時把中下二擇的速度提高到很難反應。你的解摔仍然有效，但窗口更窄；而 Drive Impact 在這裡是被低估的答案 —— 它的霸體吃得下 Drive Rush 接的打擊。關鍵是記住對手每次這樣做都在燒 Drive：擋住兩三次，他就會進入 Burnout，攻守立刻互換。',
      en: 'Drive Rush makes their attack arrive faster and more plus, and speeds a low/overhead mix past comfortable reaction time. Your tech still works but through a narrower window. Drive Impact is the underrated answer here: its armour eats the strike that Drive Rush was buying. And remember they are burning Drive every time — block two or three of these and they hit Burnout, which flips the whole exchange.',
      ja: 'ドライブラッシュにより相手の攻撃は速く、より有利な状態で届き、中下段の二択も反応困難な速度になる。投げ抜けは有効だが猶予は狭い。ここで過小評価されている答えがドライブインパクトで、アーマーがドライブラッシュで買った打撃を受け止める。そして相手は毎回ドライブを消費している。二、三回ガードすればバーンアウトし、攻守が一気に入れ替わる。',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentDrive: ['mid', 'high'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '擋下來，讓他繼續燒 Drive。你沒有拿到血，但拿到了資源差 —— 這是對抗 Drive Rush 壓制最穩的長線做法。',
            en: 'Block it and let them keep burning. You take no life, but you take the resource lead — the steadiest long game against Drive Rush pressure.',
            ja: 'ガードして相手にドライブを消費させ続ける。体力は取れないが資源差を取れる。ドライブラッシュ攻めに対する最も安定した長期戦。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '被投，或是被下段/中段猜中。Drive Rush 讓二擇快到很難反應，純防禦在這裡不是零風險。',
            en: 'Thrown, or guessed wrong on the low/overhead. Drive Rush makes the mix fast enough that pure blocking is not risk-free here.',
            ja: '投げられるか、中下段を読み違える。ドライブラッシュにより二択が反応困難な速度になるため、ここではガード択も無リスクではない。',
          },
          hpLoss: '15-30%',
          driveLoss: 1,
        },
        counteredBy: ['throw', 'low-overhead-mix'],
        mixRatio: '35-45%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下 Drive Rush 接的打擊並反擊 —— 對手被撞飛，如果靠牆就是撞牆重擊接完整連段，一次把資源差和血量差全部逆轉。',
            en: 'The armour eats the strike Drive Rush was setting up and hits back. They get launched, and near a wall that is a wall splat into a full combo — one action that flips both the life and the resource lead.',
            ja: 'アーマーがドライブラッシュから繋げる打撃を受け止めて反撃する。相手は吹き飛び、壁が近ければ壁やられからフルコンボ。一手で体力差と資源差の両方を覆せる。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
          opponentDriveLoss: 1,
        },
        onFail: {
          text: {
            'zh-Hant': '對手用自己的 Drive Impact 撞回來，或是直接投你 —— DI 的霸體防不住投擲。被 DI 反撞在角落是最糟的結果。',
            en: 'They answer with their own Drive Impact, or simply throw you — DI armour does not stop throws. Being counter-impacted near a wall is the worst outcome available.',
            ja: '相手が自分のドライブインパクトで返してくるか、単に投げてくる。DIのアーマーは投げを防げない。画面端で相打ちDIを返されるのが最悪の結果。',
          },
          hpLoss: '30-50%',
          driveLoss: 1,
        },
        counteredBy: ['throw', 'drive-impact'],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '在這個情境被低估。對手花 Drive 換來的正是「打擊會更快到」，而霸體專門吃打擊。',
          en: 'Underrated in this specific spot. What they bought with the Drive is precisely a faster strike, and armour is built to eat strikes.',
          ja: 'この状況では過小評価されている。相手がドライブで買ったのはまさに「速く届く打撃」であり、アーマーは打撃を食べるためにある。',
        },
      },
      {
        optionId: 'delayed-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '仍然同時覆蓋打擊與投擲，只是窗口比一般起身窄。',
            en: 'Still covers both the strike and the throw, just through a narrower window than a normal wakeup.',
            ja: '打撃と投げの両方をカバーできる点は同じだが、通常の起き上がりより猶予が狭い。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手用 Drive Rush 的有利去做延遲打擊，counter hit 之後還能再接一次 Drive Rush 延伸 —— 傷害比一般 counter hit 更高。',
            en: 'They use the Drive Rush advantage for a delayed attack, and the counter hit converts into another Drive Rush extension — more damage than a normal counter hit.',
            ja: '相手はドライブラッシュの有利を遅らせ打撃に使い、カウンターヒットからさらにドライブラッシュで伸ばしてくる。通常のカウンターヒットより高いダメージになる。',
          },
          hpLoss: '35-50%',
          driveLoss: 0,
        },
        counteredBy: ['delayed-attack', 'shimmy'],
        mixRatio: '25-35%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'medium',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '擋下 Drive Rush 的打擊並回一點 Drive。Perfect Parry 的話對手等於白花了三格 —— 資源差瞬間拉開。',
            en: 'Catches the Drive Rush strike and returns a little Drive. On a Perfect Parry they spent three bars for nothing, and the resource gap opens immediately.',
            ja: 'ドライブラッシュの打撃を受け止めてドライブを少し回復する。パーフェクトパリィなら相手は3ゲージを無駄にしたことになり、資源差が一気に開く。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '被投擲，而且你也在花 Drive —— 兩邊一起燒的時候，先見底的那個會很慘。',
            en: 'Thrown, and you are spending Drive too. When both sides burn at once, whoever empties first is in real trouble.',
            ja: '投げられ、しかもこちらもドライブを消費している。両者が同時に燃やす展開では、先に尽きた方が非常に苦しくなる。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        counteredBy: ['throw', 'shimmy'],
        mixRatio: '20-25%',
        verified: 'estimated',
      },
      {
        optionId: 'mash-light',
        risk: 'extreme',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手 Drive Rush 之後選擇投擲時才贏得掉。',
            en: 'Only wins if they followed the Drive Rush with a throw.',
            ja: 'ドライブラッシュの後に投げを選んだ場合しか勝てない。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': 'Drive Rush 接的打擊比你的輕攻擊快得多 —— counter hit 接完整連段，而且對手還有 Drive 可以延伸。',
            en: 'The Drive Rush strike is far faster than your light — counter hit into a full combo, with Drive left over to extend it.',
            ja: 'ドライブラッシュから繋がる打撃は弱攻撃よりはるかに速い。カウンターヒットからフルコンボに繋がり、相手にはまだ伸ばすためのドライブが残っている。',
          },
          hpLoss: '40-55%',
          driveLoss: 0,
        },
        counteredBy: ['drive-rush-pressure', 'meaty', 'delayed-attack'],
        verified: 'estimated',
      },
    ],
  },

  {
    id: 'a6-vs-shimmy',
    side: 'defense',
    group: 'A',
    name: {
      'zh-Hant': '對手偏好 Shimmy 與延遲打擊',
      en: 'They favour shimmy and delayed attacks',
      ja: '相手がシミーと遅らせ打撃を多用してくる',
    },
    brief: {
      'zh-Hant': '你的解摔正在餵養對手 —— 這個情境的答案是停止按解摔。',
      en: 'Your tech is feeding them. The answer in this situation is to stop teching.',
      ja: '投げ抜けが相手の餌になっている。この状況の答えは投げ抜けをやめること。',
    },
    summary: {
      'zh-Hant':
        '這不是一個「位置」情境，而是一個「對手已經表現出傾向」的情境 —— 他後退誘你解摔然後懲罰，或是把打擊延遲到你的解摔輸入上。當你認出這個模式，整組選項的評價要重排：解摔從主力掉到最差，純防禦從保守變成最優。Shimmy 的弱點是它完全不威脅純防禦的人，所以只要你停止按，他就必須改回投擲，那時你再把解摔加回來。',
      en: 'This is not a position situation but a read situation — they have shown a tendency. They walk back to bait a tech and punish it, or delay the strike onto your tech input. Once you recognise the pattern the whole option list re-ranks: teching drops from staple to worst, and pure blocking goes from conservative to optimal. Shimmy has one weakness — it threatens nothing against someone who does not press — so the moment you stop, they have to go back to throwing, and that is when the tech comes back in.',
      ja: 'これは位置の状況ではなく、相手の傾向が出た状況である。下がって投げ抜けを誘い狩る、あるいは打撃を投げ抜けの入力に合わせて遅らせてくる。このパターンを認識した時点で択の評価は並べ替わる。投げ抜けは主軸から最悪へ落ち、ガード択は消極的から最善へ変わる。シミーの弱点は、押してこない相手に対して何も脅威を与えられないこと。こちらが押すのをやめれば相手は投げに戻らざるを得ず、その時に投げ抜けを戻せばよい。',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    evaluations: [
      {
        optionId: 'do-nothing',
        risk: 'safe',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': 'Shimmy 完全落空 —— 他後退的那段是無防備的，你甚至可以直接反打。延遲打擊也只是被防住。這是這個情境的正解。',
            en: 'The shimmy whiffs entirely — the walk-back leaves them exposed and you can often punish it outright. The delayed attack is simply blocked. This is the answer here.',
            ja: 'シミーは完全に空振りし、下がっている間は無防備で反撃さえ狙える。遅らせ打撃もガードされるだけ。この状況の正解。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手放棄 Shimmy 改成直接投擲。傷害很低，而且這正是你要的訊號 —— 他被迫改回來了。',
            en: 'They abandon the shimmy and just throw. The damage is tiny, and it is exactly the signal you wanted: they have been forced back.',
            ja: 'シミーをやめて素直に投げてくる。ダメージは軽微で、しかもこれこそ欲しかった合図。相手が戻らざるを得なくなった証拠。',
          },
          hpLoss: '10-15%',
          driveLoss: 0,
        },
        counteredBy: ['throw'],
        mixRatio: '50-60%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-parry',
        risk: 'low',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '延遲打擊正好撞進 Parry。對手把時間點拉長的行為讓 Perfect Parry 反而更好抓 —— 抓到就是一整套反打。',
            en: 'The delayed attack walks straight into the parry. Stretching the timing actually makes a Perfect Parry easier to catch, and catching it is a full punish.',
            ja: '遅らせ打撃がそのままパリィに刺さる。タイミングを引き延ばす行為はむしろパーフェクトパリィを取りやすくし、取れればフルコンボの反撃になる。',
          },
          followUp: 'pressure',
        },
        onFail: {
          text: {
            'zh-Hant': '被投擲。花了 Drive、拿了小傷害，但沒有崩盤 —— 在這個情境 Parry 的下檔風險很低。',
            en: 'Thrown. Drive spent and a little life lost, but nothing collapses — the downside of parrying is small in this specific situation.',
            ja: '投げられる。ドライブを消費し少しダメージを受けるが崩れはしない。この状況ではパリィの下振れは小さい。',
          },
          hpLoss: '10-15%',
          driveLoss: 1,
        },
        counteredBy: ['throw'],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對手越是延遲，Parry 的價值越高 —— 他為了打你的解摔而拉長的時間，正好是你按 Parry 的時間。',
          en: 'The more they delay, the better this gets: the time they added to catch your tech is exactly the time you need to parry.',
          ja: '相手が遅らせるほど価値が上がる。投げ抜けを狩るために足した時間が、そのままパリィを合わせる時間になる。',
        },
      },
      {
        optionId: 'mash-light',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對手後退 Shimmy 的時候是無防備的 —— 如果你的輕攻擊搆得到，這是少數能直接懲罰 Shimmy 的方式。',
            en: 'They are exposed while walking back for the shimmy. If your light reaches, this is one of the few ways to punish a shimmy directly.',
            ja: 'シミーで下がっている間は無防備。弱攻撃が届くなら、シミーを直接狩れる数少ない手段のひとつ。',
          },
          followUp: 'neutral',
          damageBand: '5-8%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手選的是延遲打擊而不是 Shimmy —— 那一下正好打在你的輕攻擊起動上，counter hit。',
            en: 'They picked the delayed attack rather than the shimmy, and it lands on your light’s startup — counter hit.',
            ja: 'シミーではなく遅らせ打撃を選ばれ、弱攻撃の発生に重なる。カウンターヒットになる。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        counteredBy: ['delayed-attack', 'bait-block'],
        mixRatio: '10-15%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '這是唯一一個「速點」評價上升的情境 —— 因為 Shimmy 本身就是把自己暴露出來換取懲罰機會。',
          en: 'The only situation where mashing grades up, because a shimmy is itself an act of exposing yourself to buy a punish.',
          ja: '暴れの評価が上がる唯一の状況。シミーとは、狩る機会と引き換えに自ら無防備になる行為だからである。',
        },
      },
      {
        optionId: 'throw-tech',
        risk: 'extreme',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '只有在對手放棄 Shimmy、真的投擲時才有用。',
            en: 'Only useful on the occasions they give up the shimmy and actually throw.',
            ja: '相手がシミーをやめて実際に投げてきた時にしか機能しない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '這正是對手在等的東西。Shimmy 抓到解摔就是完整懲罰連段，而且他會一直重複到你停下來為止。',
            en: 'This is exactly what they are waiting for. A shimmy that catches a tech is a full punish combo, and they will repeat it until you stop.',
            ja: 'まさに相手が待っているもの。投げ抜けを狩ったシミーはフルコンボに直結し、こちらがやめるまで繰り返される。',
          },
          hpLoss: '30-45%',
          driveLoss: 0,
        },
        counteredBy: ['shimmy', 'delayed-attack'],
        mixRatio: '5%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '在 A2/A3 它是主力，在這裡是最差的一手。認出對手的傾向之後不重排選項，是最常見的失血來源。',
          en: 'A staple in A2/A3 and the worst pick here. Failing to re-rank after spotting the tendency is the most common way people bleed out.',
          ja: 'A2/A3 では主軸だが、ここでは最悪の一手。傾向を見抜いた後に択を並べ替えないことが、最もよくある失血の原因である。',
        },
      },
    ],
  },
]
