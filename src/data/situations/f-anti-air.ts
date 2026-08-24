import type { Situation } from '../schema'

/**
 * Group F — answering a jump, by how far it started from.
 *
 * Distance decides whether this is a reaction or a read. From range there is
 * time to see the jump and pick; from up close there is not, which is why
 * letting them jump from point blank is itself the mistake.
 *
 * Everything is `estimated`.
 */
export const GROUP_F: Situation[] = [
  {
    id: 'f1-jump-from-range',
    side: 'defense',
    group: 'F',
    name: {
      'zh-Hant': '對手從遠處跳入',
      en: 'They jump in from range',
      ja: '遠くから飛び込まれる',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['jump-in', 'empty-jump', 'air-throw'],
    evaluations: [
      {
        optionId: 'anti-air',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打落對手。空中無法防禦，所以出得夠早就是確定的，而且多半能接連段。',
            en: 'Knocks them down. They cannot block in the air, so an early enough anti-air is guaranteed and usually converts.',
            ja: '撃ち落とす。空中はガードできないため早めに出せば確定し、多くはコンボに繋がる。',
          },
          followUp: 'combo',
          damageBand: '15-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '出太晚，對手的跳入攻擊先打到你。',
            en: 'Too late, and their jump attack lands first.',
            ja: '遅れれば相手の飛び込みが先に当たる。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'empty-jump', outcome: 'loss' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '40-50%',
        verified: 'estimated',
      },
      {
        optionId: 'air-to-air',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '自己也跳起來，在空中打掉對方。位置會重置，而且不用賭對空的時機。',
            en: 'Jump up and beat them in the air. The positions reset and you avoid gambling on anti-air timing.',
            ja: 'こちらも跳んで空中で潰す。位置がリセットされ、対空のタイミングを賭ける必要もない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '空中互毆輸掉就是你先落地挨打，而且空中沒有防禦可言。',
            en: 'Lose the air exchange and you land first and eat it — there is no blocking up there.',
            ja: '空中戦に負ければ先に着地して被弾する。空中にガードは存在しない。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'win' },
          { vs: 'empty-jump', outcome: 'even' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付「跳過來但你來不及對空」的距離特別有用，因為它不需要精準時機，只需要先跳。',
          en: 'Most useful at the range where you cannot get an anti-air out in time: it needs no precise timing, only to leave first.',
          ja: '対空が間に合わない距離で特に有効。精密なタイミングではなく、先に跳ぶことだけを要求する。',
        },
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋下跳入攻擊。沒有傷害，但也沒有賠 —— 而且空跳想摔你的話，防禦至少不會被抓解摔硬直。',
            en: 'Block the jump-in. No damage taken and none dealt, and if the jump was empty you are at least not caught in a tech animation.',
            ja: '飛び込みをガードする。ダメージはないが損もない。空ジャンプであっても投げ抜けの硬直を晒さずに済む。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空跳落地直接摔你，或是落地打下段。',
            en: 'They land from an empty jump and throw, or go low on landing.',
            ja: '空ジャンプから着地投げ、あるいは着地下段を通される。',
          },
          hpLoss: '15-25%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'even' },
          { vs: 'empty-jump', outcome: 'loss' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'estimated',
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對付空跳落地摔。對手不出招跳過來的目的就是摔你，解掉就是白跳一次。',
            en: 'Answers the empty jump into throw. Jumping without attacking is a setup for the throw; teching it wastes the whole jump.',
            ja: '空ジャンプからの着地投げに対応する。技を出さずに跳ぶ狙いは投げであり、抜ければジャンプごと無駄にできる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手其實有出招，你的解摔輸入被跳入攻擊打中 —— counter hit。',
            en: 'They did attack after all, and the jump-in lands on your tech input — counter hit.',
            ja: '実際には技を出しており、飛び込みが投げ抜けの入力に当たってカウンターヒット。',
          },
          hpLoss: '25-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'empty-jump', outcome: 'bigWin' },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下跳入攻擊並反擊，靠牆就是撞牆接連段。',
            en: 'Armour eats the jump-in and answers; near a wall that is a wall splat into a combo.',
            ja: 'アーマーで飛び込みを受け止めて反撃。壁が近ければ壁やられからコンボ。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空跳落地摔你 —— 霸體防不住摔投，這是動力衝擊永遠的破綻。',
            en: 'They empty-jump into a throw: armour does not stop throws, which is Drive Impact’s permanent hole.',
            ja: '空ジャンプから投げられる。アーマーは投げを防げず、これはDIの恒常的な穴である。',
          },
          hpLoss: '30-45%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'empty-jump', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
    ],
  },
  {
    id: 'f2-close-jump',
    side: 'defense',
    group: 'F',
    name: {
      'zh-Hant': '對手貼身跳',
      en: 'They jump from up close',
      ja: '密着から跳ばれる',
    },
    position: ['midscreen', 'nearCorner', 'cornered'],
    opponentOptions: ['jump-in', 'empty-jump', 'air-throw'],
    evaluations: [
      {
        optionId: 'anti-air',
        risk: 'medium',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '打落對手。空中無法防禦，所以出得夠早就是確定的，而且多半能接連段。',
            en: 'Knocks them down. They cannot block in the air, so an early enough anti-air is guaranteed and usually converts.',
            ja: '撃ち落とす。空中はガードできないため早めに出せば確定し、多くはコンボに繋がる。',
          },
          followUp: 'combo',
          damageBand: '15-25%',
        },
        onFail: {
          text: {
            'zh-Hant': '近距離跳的滯空時間短，你幾乎沒有反應窗口，出晚就是被打。',
            en: 'A close jump spends almost no time in the air, so there is barely a window: late means hit.',
            ja: '近距離のジャンプは滞空時間が短く反応の余地がほとんどない。遅れれば被弾する。',
          },
          hpLoss: '25-40%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'empty-jump', outcome: 'loss' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '近距離跳沒有反應時間，只能預判。這也是為什麼近身讓對手跳起來本身就是失誤。',
          en: 'A close jump gives no reaction time, only a read. Which is why letting them jump from up close is itself the mistake.',
          ja: '近距離のジャンプは反応では取れず読むしかない。密着で跳ばせること自体が既にミスである。',
        },
      },
      {
        optionId: 'air-to-air',
        risk: 'high',
        reward: 'medium',
        onSuccess: {
          text: {
            'zh-Hant': '自己也跳起來，在空中打掉對方。位置會重置，而且不用賭對空的時機。',
            en: 'Jump up and beat them in the air. The positions reset and you avoid gambling on anti-air timing.',
            ja: 'こちらも跳んで空中で潰す。位置がリセットされ、対空のタイミングを賭ける必要もない。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '空中互毆輸掉就是你先落地挨打，而且空中沒有防禦可言。',
            en: 'Lose the air exchange and you land first and eat it — there is no blocking up there.',
            ja: '空中戦に負ければ先に着地して被弾する。空中にガードは存在しない。',
          },
          hpLoss: '20-30%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'win' },
          { vs: 'empty-jump', outcome: 'even' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '25-35%',
        verified: 'estimated',
        notes: {
          'zh-Hant': '對付「跳過來但你來不及對空」的距離特別有用，因為它不需要精準時機，只需要先跳。',
          en: 'Most useful at the range where you cannot get an anti-air out in time: it needs no precise timing, only to leave first.',
          ja: '対空が間に合わない距離で特に有効。精密なタイミングではなく、先に跳ぶことだけを要求する。',
        },
      },
      {
        optionId: 'do-nothing',
        risk: 'low',
        reward: 'none',
        onSuccess: {
          text: {
            'zh-Hant': '擋下跳入攻擊。沒有傷害，但也沒有賠 —— 而且空跳想摔你的話，防禦至少不會被抓解摔硬直。',
            en: 'Block the jump-in. No damage taken and none dealt, and if the jump was empty you are at least not caught in a tech animation.',
            ja: '飛び込みをガードする。ダメージはないが損もない。空ジャンプであっても投げ抜けの硬直を晒さずに済む。',
          },
          followUp: 'none',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空跳落地直接摔你，或是落地打下段。',
            en: 'They land from an empty jump and throw, or go low on landing.',
            ja: '空ジャンプから着地投げ、あるいは着地下段を通される。',
          },
          hpLoss: '15-25%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'jump-in', outcome: 'even' },
          { vs: 'empty-jump', outcome: 'loss' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '20-25%',
        verified: 'estimated',
      },
      {
        optionId: 'throw-tech',
        risk: 'medium',
        reward: 'low',
        onSuccess: {
          text: {
            'zh-Hant': '對付空跳落地摔。對手不出招跳過來的目的就是摔你，解掉就是白跳一次。',
            en: 'Answers the empty jump into throw. Jumping without attacking is a setup for the throw; teching it wastes the whole jump.',
            ja: '空ジャンプからの着地投げに対応する。技を出さずに跳ぶ狙いは投げであり、抜ければジャンプごと無駄にできる。',
          },
          followUp: 'neutral',
        },
        onFail: {
          text: {
            'zh-Hant': '對手其實有出招，你的解摔輸入被跳入攻擊打中 —— counter hit。',
            en: 'They did attack after all, and the jump-in lands on your tech input — counter hit.',
            ja: '実際には技を出しており、飛び込みが投げ抜けの入力に当たってカウンターヒット。',
          },
          hpLoss: '25-35%',
          driveLoss: 0,
        },
        versus: [
          { vs: 'empty-jump', outcome: 'bigWin' },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '15-20%',
        verified: 'estimated',
      },
      {
        optionId: 'drive-impact',
        risk: 'high',
        reward: 'high',
        onSuccess: {
          text: {
            'zh-Hant': '霸體吃下跳入攻擊並反擊，靠牆就是撞牆接連段。',
            en: 'Armour eats the jump-in and answers; near a wall that is a wall splat into a combo.',
            ja: 'アーマーで飛び込みを受け止めて反撃。壁が近ければ壁やられからコンボ。',
          },
          followUp: 'combo',
          damageBand: '20-35%',
        },
        onFail: {
          text: {
            'zh-Hant': '對手空跳落地摔你 —— 霸體防不住摔投，這是動力衝擊永遠的破綻。',
            en: 'They empty-jump into a throw: armour does not stop throws, which is Drive Impact’s permanent hole.',
            ja: '空ジャンプから投げられる。アーマーは投げを防げず、これはDIの恒常的な穴である。',
          },
          hpLoss: '30-45%',
          driveLoss: 1,
        },
        versus: [
          { vs: 'jump-in', outcome: 'bigWin' },
          { vs: 'empty-jump', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '10-15%',
        verified: 'estimated',
      },
    ],
  },
]
