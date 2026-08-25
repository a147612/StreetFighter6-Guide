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
    distance: 'mid',
    stance: 'neutral',
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
          { vs: 'empty-jump', outcome: 'win' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '35-43%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色對空技的發生與無敵幀數見各角色頁：LP/MP/HP 版升龍多半正是「對空無敵」，這也是它們打得掉跳入卻打不掉壓起身的原因。空中無法防禦，所以打中就是確定的。來源未標註遊戲版本',
          },
        ],
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
        mixRatio: '13-17%',
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
        mixRatio: '17-22%',
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
          {
            vs: 'empty-jump',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '13-17%',
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
        mixRatio: '9-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
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
    distance: 'close',
    stance: 'neutral',
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
          { vs: 'empty-jump', outcome: 'win' },
          { vs: 'air-throw', outcome: 'win' },
        ],
        mixRatio: '22-31%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://ultimateframedata.com/sf6/',
            patch: '2026-08',
            note: '各角色對空技的發生與無敵幀數見各角色頁：LP/MP/HP 版升龍多半正是「對空無敵」，這也是它們打得掉跳入卻打不掉壓起身的原因。空中無法防禦，所以打中就是確定的。來源未標註遊戲版本',
          },
        ],
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
        mixRatio: '22-31%',
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
        mixRatio: '18-22%',
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
          {
            vs: 'empty-jump',
            outcome: 'bigWin',
            note: {
              'zh-Hant': '解摔成功不只是沒被摔 —— SF6 會退你一格動力槽，所以這一手是唯一「猜對還賺資源」的防守選擇。',
              en: 'Teching is not just damage avoided: SF6 refunds one Drive bar on a successful escape, which makes it the one defensive guess that pays you back.',
              ja: '投げ抜けは被弾を防ぐだけではない。SF6では成功すると1ゲージ回復するため、当てて資源が増える唯一の防御択になる。',
            },
          },
          { vs: 'jump-in', outcome: 'bigLoss' },
          { vs: 'air-throw', outcome: 'loss' },
        ],
        mixRatio: '13-18%',
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
        mixRatio: '9-13%',
        verified: 'sourced',
        sources: [
          {
            url: 'https://streetfighter.fandom.com/wiki/Drive_Impact',
            patch: '2026-08',
            note: '26F 發生、1F 起兩次霸體、擋住 −3 且防禦方進入踉蹌無法動力反攻；六格空隙可被摔、九格空隙可被跳掉；霸體吸收的是可回復傷害但仍會 KO。來源未標註遊戲版本，patch 欄位記錄的是查閱日期',
          },
        ],
      },
    ],
  },
]
