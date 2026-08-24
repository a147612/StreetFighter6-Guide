import type { Option, Situation } from './schema'

/**
 * A single authored situation, here to exercise the schema and the layout
 * before the full content layer lands. Everything is `estimated` — qualitative
 * reads of the interaction, not frame data.
 *
 * Replaced wholesale by data/situations/* and data/options.json; nothing else
 * should import from this file.
 */

export const PREVIEW_SITUATION: Situation = {
  id: 'a2-cornered-wakeup',
  side: 'defense',
  group: 'A',
  name: {
    'zh-Hant': '角落倒地，對手貼身',
    en: 'Cornered wakeup, opponent right on top of you',
    ja: '画面端でダウン、相手が密着',
  },
  summary: {
    'zh-Hant':
      '你被打到角落並倒地，對手站在你身上等你起來。沒有退路，所以每個選項的代價都比場中更重 —— 後跳幾乎沒有空間，而失敗的懲罰會把你留在同一個位置再來一次。',
    en: 'You are down in the corner with the opponent standing over you. There is no space behind you, so every option costs more than it would midscreen — backdash and back jump have nowhere to go, and losing the exchange leaves you in the same spot to do it again.',
    ja: '画面端でダウンし、相手が起き上がりを待っている状況。後ろに逃げ場がないため、どの選択肢も画面中央より代償が大きい。バックダッシュもバックジャンプも距離を稼げず、負ければ同じ位置でもう一度同じ択を迫られる。',
  },
  position: ['cornered'],
  myDrive: ['low', 'mid', 'high'],
  options: [
    'throw-tech',
    'delayed-tech',
    'drive-parry',
    'mash-light',
    'back-jump',
    'reversal',
  ],
}

export const PREVIEW_OPTIONS: Option[] = [
  {
    id: 'throw-tech',
    side: 'defense',
    name: { 'zh-Hant': '解摔', en: 'Throw tech', ja: '投げ抜け' },
    aka: { 'zh-Hant': ['拆投'], en: ['tech', 'throw break'], ja: ['投げ抜け', 'グラップ'] },
    input: '6 LP LK',
    cost: { drive: 0, sa: 0 },
    risk: 'medium',
    reward: 'low',
    onSuccess: {
      text: {
        'zh-Hant': '投擲被解開，雙方分開一小段距離。你還在角落，但重置回中立，對手的起攻循環斷了一次。',
        en: 'The throw is broken and you separate slightly. You are still cornered, but the reset is neutral and their oki loop is interrupted once.',
        ja: '投げを抜けて少し距離が離れる。画面端のままだが状況はニュートラルに戻り、相手の起き攻めループを一度断ち切れる。',
      },
      followUp: 'neutral',
    },
    onFail: {
      text: {
        'zh-Hant': '對手沒有投擲，而是後退看你按 —— 解摔的動作有硬直，你會直接吃到一套完整的懲罰連段。這是角落最貴的失敗。',
        en: 'They did not throw — they walked back and watched you press. The tech animation has recovery, so you eat a full punish combo. This is the most expensive way to be wrong in the corner.',
        ja: '相手は投げずに下がって様子を見ていた。投げ抜けの動作には硬直があるため、フルコンボの反撃を受ける。画面端で最も代償の大きい読み負け。',
      },
      hpLoss: '25-40%',
      driveLoss: 0,
      positionLoss: {
        'zh-Hant': '仍在角落，連段結束後再被起攻一次',
        en: 'Still cornered, and set up for another oki attempt',
        ja: '画面端のまま、コンボ後にもう一度起き攻めを受ける',
      },
    },
    counteredBy: ['shimmy', 'delayed-attack'],
    difficulty: 2,
    mixRatio: '30-40%',
    characterSpecific: false,
    verified: 'estimated',
  },
  {
    id: 'delayed-tech',
    side: 'defense',
    name: { 'zh-Hant': '延遲解摔', en: 'Delayed tech', ja: '遅らせ投げ抜け' },
    aka: { 'zh-Hant': ['延遲拆投'], en: ['delay tech'], ja: ['遅らせグラップ'] },
    input: '6 LP LK',
    cost: { drive: 0, sa: 0 },
    risk: 'medium',
    reward: 'low',
    onSuccess: {
      text: {
        'zh-Hant': '晚一點按，所以疊在你身上的打擊會先打到你的防禦，投擲則還來得及解。同時對付「疊打擊」和「投擲」兩個選項。',
        en: 'Pressing late means a meaty attack lands on your guard first, while a throw still gets teched. It covers the meaty and the throw at once.',
        ja: '入力を遅らせることで、重ねられた打撃はガードで受け、投げには間に合って抜けられる。打撃と投げの両方に同時に対応できる。',
      },
      followUp: 'neutral',
    },
    onFail: {
      text: {
        'zh-Hant': '對手也延遲了打擊，正好打在你按解摔的那一刻 —— counter hit，傷害更高，而且對手能接更長的連段。',
        en: 'They delayed their attack too, and it lands exactly on your tech input — a counter hit, for more damage and a longer combo than usual.',
        ja: '相手も打撃を遅らせており、投げ抜けの入力に合わせて当たる。カウンターヒットとなり、通常より高いダメージと長いコンボを受ける。',
      },
      hpLoss: '30-45%',
      driveLoss: 0,
      positionLoss: {
        'zh-Hant': '仍在角落',
        en: 'Still cornered',
        ja: '画面端のまま',
      },
    },
    counteredBy: ['delayed-attack', 'shimmy'],
    difficulty: 3,
    mixRatio: '20-30%',
    characterSpecific: false,
    verified: 'estimated',
    notes: {
      'zh-Hant': '角落的預設選項之一，因為它同時覆蓋兩個最常見的起攻選擇。代價是被「延遲打擊」針對時特別痛。',
      en: 'One of the default corner answers, because it covers the two most common oki choices at once. The trade is that a deliberately delayed attack punishes it harder than usual.',
      ja: '最も多い起き攻め二択の両方をカバーするため、画面端の基本選択肢のひとつ。ただし意図的に遅らせた打撃には通常より重い代償を払う。',
    },
  },
  {
    id: 'drive-parry',
    side: 'both',
    name: { 'zh-Hant': 'Drive Parry', en: 'Drive Parry', ja: 'ドライブパリィ' },
    aka: { 'zh-Hant': ['彈反', '招架'], en: ['parry'], ja: ['パリィ'] },
    input: 'MP MK hold',
    cost: { drive: 1, sa: 0 },
    risk: 'medium',
    reward: 'medium',
    onSuccess: {
      text: {
        'zh-Hant': '吸收打擊並回復一部分 Drive。時機精準的話會變成 Perfect Parry，對手大幅硬直，你能直接反打一套 —— 這是角落唯一能一次翻轉局勢的低成本選項。',
        en: 'Absorbs the hit and returns some Drive. On a tight enough window it becomes a Perfect Parry, freezing them long enough for a full punish — the one low-cost option that flips the corner outright.',
        ja: '打撃を受け止めてドライブゲージを一部回復する。タイミングが合えばパーフェクトパリィとなり、相手を大きく硬直させてフルコンボで反撃できる。画面端の状況を一度で覆せる唯一の低コスト択。',
      },
      followUp: 'pressure',
    },
    onFail: {
      text: {
        'zh-Hant': 'Parry 防不住投擲。對手直接投你，傷害不高但你回到原點 —— 還在角落，再被起攻一次，而且花掉的 Drive 拿不回來。',
        en: 'Parry does not stop throws. They throw you instead: modest damage, but you are back where you started — cornered, facing oki again, and down the Drive you spent holding it.',
        ja: 'パリィは投げを防げない。投げられればダメージ自体は軽いが、画面端で再び起き攻めを受ける振り出しに戻り、消費したドライブゲージも戻らない。',
      },
      hpLoss: '10-15%',
      driveLoss: 1,
      positionLoss: {
        'zh-Hant': '被投擲後仍在角落，起攻循環繼續',
        en: 'Thrown, still cornered, oki loop continues',
        ja: '投げられて画面端のまま、起き攻めループが継続',
      },
    },
    counteredBy: ['throw', 'shimmy'],
    difficulty: 3,
    mixRatio: '20-30%',
    characterSpecific: false,
    verified: 'estimated',
  },
  {
    id: 'mash-light',
    side: 'defense',
    name: { 'zh-Hant': '速點輕攻擊', en: 'Mash a light attack', ja: '暴れ（弱攻撃）' },
    aka: { 'zh-Hant': ['亂按', '硬凹'], en: ['mash', 'abare'], ja: ['暴れ'] },
    input: '2 LP',
    cost: { drive: 0, sa: 0 },
    risk: 'high',
    reward: 'low',
    onSuccess: {
      text: {
        'zh-Hant': '打斷對手的投擲或還沒發動的 Drive Rush，換到一點傷害和一次分開的機會。回報不高，但你脫離了角落壓制一次。',
        en: 'Interrupts a throw attempt or a Drive Rush that has not started yet, for small damage and a chance to separate. Low payoff, but you are out of the corner sequence for one beat.',
        ja: '相手の投げや発動前のドライブラッシュを潰し、少量のダメージと距離を取る機会を得る。リターンは小さいが、画面端の連係を一度は断てる。',
      },
      followUp: 'neutral',
      damageBand: '5-8%',
    },
    onFail: {
      text: {
        'zh-Hant': '對手疊了打擊，你的輕攻擊還沒出來就被打到 —— counter hit，完整連段，而且角落連段的傷害通常比場中高。',
        en: 'They stuffed a meaty on you and your light never came out — counter hit into a full combo, and corner combos usually hurt more than midscreen ones.',
        ja: '重ねられた打撃に潰され、弱攻撃は出る前にカウンターヒットを受ける。フルコンボに繋がり、画面端のコンボは中央より高いダメージになりやすい。',
      },
      hpLoss: '35-50%',
      driveLoss: 0,
      positionLoss: {
        'zh-Hant': '角落，且對手 Drive 幾乎沒有損耗',
        en: 'Cornered, and they spent almost no Drive to get it',
        ja: '画面端のまま、しかも相手はほとんどドライブを消費していない',
      },
    },
    counteredBy: ['meaty', 'delayed-attack', 'bait-block'],
    difficulty: 1,
    mixRatio: '10%',
    characterSpecific: false,
    verified: 'estimated',
    notes: {
      'zh-Hant': '低頻使用。它的價值不在勝率，而在於讓對手不敢無限延遲 —— 完全不按，對手就能一直用延遲打擊吃掉你所有的解摔。',
      en: 'Keep the rate low. Its value is not the win rate but the threat: if you never press, they can delay forever and eat every tech you have.',
      ja: '使用頻度は低く抑える。価値は勝率ではなく抑止力にある。まったく暴れないと、相手は無限に遅らせてこちらの投げ抜けを全て狩れる。',
    },
  },
  {
    id: 'back-jump',
    side: 'defense',
    name: { 'zh-Hant': '後跳', en: 'Back jump', ja: 'バックジャンプ' },
    input: '7',
    cost: { drive: 0, sa: 0 },
    risk: 'extreme',
    reward: 'none',
    onSuccess: {
      text: {
        'zh-Hant': '躲過投擲和大部分下段。但角落幾乎沒有後退空間，落地後你還在同一個位置 —— 幾乎沒有實質收益。',
        en: 'Avoids the throw and most lows. But there is no room behind you, so you land in the same place — almost no actual gain.',
        ja: '投げとほとんどの下段を避けられる。しかし後方に空間がないため同じ位置に着地し、実質的な利益はほぼない。',
      },
      followUp: 'none',
    },
    onFail: {
      text: {
        'zh-Hant': '對手看到你起跳就直接對空 —— 空中無法防禦，所以是確定命中，而且對空技通常能接連段。角落沒有空間讓你逃掉這一下。',
        en: 'They see the jump and anti-air it. You cannot block in the air, so it is guaranteed, and anti-airs usually convert. The corner gives you no room to escape it.',
        ja: 'ジャンプを見られれば対空を確定で通される。空中はガードできず、対空からコンボに繋がることも多い。画面端では逃げる空間もない。',
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
    difficulty: 1,
    characterSpecific: false,
    verified: 'estimated',
    notes: {
      'zh-Hant': '在場中這是合理選項，在完全角落幾乎不該用 —— 收錄它的目的是說明「同一個選項在不同位置的評價完全不同」。',
      en: 'Reasonable midscreen, close to indefensible fully cornered. It is listed to make the point that position, not the option, decides the grade.',
      ja: '画面中央では妥当な択だが、完全な画面端ではほぼ選ぶべきではない。同じ選択肢でも位置によって評価が全く変わることを示すために収録している。',
    },
  },
  {
    id: 'reversal',
    side: 'defense',
    name: {
      'zh-Hant': '無敵技（角色專屬）',
      en: 'Invincible reversal (character-specific)',
      ja: '無敵技（キャラ固有）',
    },
    aka: { 'zh-Hant': ['升龍', '凹招'], en: ['DP', 'reversal'], ja: ['昇龍', 'ぶっぱ'] },
    input: '623 P',
    cost: { drive: 0, sa: 0 },
    risk: 'extreme',
    reward: 'high',
    onSuccess: {
      text: {
        'zh-Hant': '打穿打擊和投擲，直接把對手打飛並脫離角落。這是唯一能一次解決「位置」問題的選項。',
        en: 'Goes through both the meaty and the throw, launches them, and gets you out of the corner. The only option that solves the position problem in one action.',
        ja: '打撃も投げも貫通して相手を打ち上げ、画面端から脱出できる。位置の問題を一手で解決できる唯一の選択肢。',
      },
      followUp: 'neutral',
      damageBand: '12-18%',
    },
    onFail: {
      text: {
        'zh-Hant': '對手空防或直接不進攻，看著你的無敵技落空 —— punish counter，這是遊戲裡最重的懲罰之一，而且你還在角落。',
        en: 'They blocked, or simply did not attack, and watched it whiff — punish counter, one of the heaviest penalties in the game, and you are still cornered.',
        ja: 'ガードされる、あるいは相手が何もせず空振りを見られる。パニッシュカウンターとなり、ゲーム中でも最も重い代償を受けたうえ、画面端のままとなる。',
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
    difficulty: 2,
    mixRatio: '5-10%',
    characterSpecific: true,
    verified: 'estimated',
    notes: {
      'zh-Hant': '不是所有角色都有。有的角色只能靠 SA2/SA3 取得無敵。低頻使用，價值在於讓對手不敢無腦疊招。',
      en: 'Not every character has one; some only get invincibility from SA2/SA3. Use it rarely — its value is making them hesitate to stack pressure blindly.',
      ja: '全キャラが持つわけではなく、SA2/SA3 でしか無敵を得られないキャラもいる。使用頻度は低く、相手に安易な重ねを躊躇わせる点に価値がある。',
    },
  },
]
