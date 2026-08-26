import type { CharacterOverlay, I18nText, Source } from './schema'

/**
 * What the opponent's character changes about *your* options.
 *
 * The alternative was per-matchup authoring, and the arithmetic kills it:
 * thirty-one characters against thirty-one is 961 configurations, and the same
 * sentence about a five-frame command grab would have been copied into five of
 * them to drift apart at leisure. A trait is written once and points at the
 * characters that have it, so 961 matchups cost seven paragraphs.
 *
 * Traits describe *them*; every note advises *you*. That direction is the whole
 * discipline here — "they have no invincible reversal" is a fact about their
 * character, and "so meaty with your best button, not your safest" is the only
 * part worth printing.
 *
 * This layer annotates. It never re-grades: the risk and reward tiers stay the
 * situation's, because a grade that moved per matchup would be 970 cells times
 * 961 matchups of claims nobody has verified.
 */
export interface OpponentTrait {
  id: string
  name: I18nText
  /** One sentence naming the mechanic, for the chip's tooltip. */
  hint: I18nText
  /** Keyed by *your* option id. Two short sentences, about what you press. */
  affects: Record<string, I18nText>
  sources: Source[]
}

interface TraitDef extends OpponentTrait {
  /**
   * Who has it.
   *
   * Derived from the overlay wherever the overlay already knows — a hand-typed
   * roster beside `removesOptions` is a second copy of the same fact, and the
   * second copy is the one that goes stale. Only the traits the overlay cannot
   * express are listed by id.
   */
  has: (character: CharacterOverlay) => boolean
}

const ufd = (slug: string): Source => ({
  url: `https://ultimateframedata.com/sf6/${slug}`,
  patch: '2026-08',
})

const roster = (...ids: string[]): ((character: CharacterOverlay) => boolean) => {
  const set = new Set(ids)
  return (character) => set.has(character.id)
}

const lacks =
  (optionId: string) =>
  (character: CharacterOverlay): boolean =>
    character.removesOptions?.includes(optionId) ?? false

const owns =
  (optionId: string) =>
  (character: CharacterOverlay): boolean =>
    !(character.removesOptions?.includes(optionId) ?? false)

export const OPPONENT_TRAITS: TraitDef[] = [
  {
    id: 'no-od-reversal',
    has: lacks('reversal'),
    name: {
      'zh-Hant': '沒有無敵起身技',
      en: 'No invincible reversal',
      ja: '無敵切り返しなし',
    },
    hint: {
      'zh-Hant':
        '起身沒有一手同時吃下打擊和摔投。動力反攻和無敵 SA 還在，但那是兩格槽或一條 SA 的價錢。',
      en: 'Nothing on their wakeup covers a strike and a throw at once. Drive Reversal and an invincible Super still exist, at two bars or a Super stock.',
      ja: '起き上がりに打撃と投げを同時に受けきる手が無い。リバーサルと無敵SAは残るが、2ゲージかSA1本の値段になる。',
    },
    affects: {
      meaty: {
        'zh-Hant': '不用挑安全的壓招 —— 沒有東西會從裡面打出來。用你最好的那顆，不是最安全的那顆。',
        en: 'You do not need a safe meaty: nothing is coming through it. Use your best button rather than your safest one.',
        ja: '安全な重ねを選ぶ必要がない。割り込まれる手が無いので、安全な技ではなく一番強い技を重ねてよい。',
      },
      throw: {
        'zh-Hant': '這裡的摔起身是純粹賭他解不解，沒有「賭他按無敵技」那一層。',
        en: 'The throw is purely a bet on whether they tech. The layer where they might have mashed a reversal is not there.',
        ja: 'ここでの投げは抜けるか抜けないかの読み合いだけになる。無敵技を押される層が存在しない。',
      },
      shimmy: {
        'zh-Hant': '退康本來同時釣無敵技和解摔，這裡只剩釣解摔那一半 —— 價值減半，但沒有消失。',
        en: 'A shimmy baits a reversal and a tech; here only the tech half is left. Worth half as much, not worthless.',
        ja: 'シミーは無敵技と投げ抜けの両方を釣るが、ここでは投げ抜けの半分しか残らない。価値は半減、ただしゼロではない。',
      },
      'bait-block': {
        'zh-Hant': '這一項存在的理由就是釣無敵技，而他沒有。除了釣他亂動以外，等於白讓一次進攻機會。',
        en: 'This option exists to bait a reversal and they have none. Unless you are baiting a mash, it hands back a turn for nothing.',
        ja: 'この択は無敵技を釣るために存在し、相手はそれを持たない。暴れ読み以外では、攻めのターンをただ返すだけになる。',
      },
      blockstring: {
        'zh-Hant': '連段的縫隙不用怕被無敵技打斷，只要防他亂點。可以壓得比平常長。',
        en: 'The gaps do not have to survive a reversal, only a mash. You can string longer than usual.',
        ja: '連係の隙間が無敵技を耐える必要はなく、暴れだけ見ればよい。普段より長く押しつけられる。',
      },
      'low-overhead-mix': {
        'zh-Hant': '上下二擇最大的風險是被無敵技從中間打斷，這裡沒有。剩下的只有猜錯被擋。',
        en: 'The real risk in a high-low is a reversal through the middle of it, and that risk is absent. What is left is guessing wrong and being blocked.',
        ja: '中下段択の最大のリスクは無敵技での割り込みで、それが無い。残るのは読み負けてガードされることだけ。',
      },
    },
    sources: [ufd('zangief'), ufd('ehonda'), ufd('jp')],
  },

  {
    id: 'fast-command-grab',
    has: roster('zangief', 'lily', 'kimberly', 'manon', 'alex', 'ehonda', 'jamie'),
    name: {
      'zh-Hant': '反應不了的指令投',
      en: 'Unreactable command grab',
      ja: '反応できないコマ投げ',
    },
    hint: {
      'zh-Hant':
        '解不掉，而且快到看不見：桑吉爾夫、莉莉、金伯莉、瑪濃（重手）、艾力克斯（重手／OD）5 幀，E.本田 6 幀，傑米 8 幀。',
      en: 'Untechable and too fast to see: Zangief, Lily, Kimberly, Manon (HP) and Alex (HP or OD) at 5 frames, E. Honda at 6, Jamie at 8.',
      ja: '抜けられず、しかも見えない速さ。ザンギエフ・リリー・キンバリー・マノン（強）・アレックス（強／OD）が5F、E.本田6F、ジェイミー8F。',
    },
    affects: {
      'throw-tech': {
        'zh-Hant': '解不掉 —— 指令投沒有解摔判定。這一項對它完全無效。',
        en: 'It cannot be teched — a command grab has no tech window at all. This option does nothing against it.',
        ja: '抜けられない。コマ投げに投げ抜け判定は無く、この択は完全に無効。',
      },
      'delayed-tech': {
        'zh-Hant': '一樣解不掉，而且延遲解摔多出來的那段站立時間反而更好抓。',
        en: 'Also untechable, and the extra standing frames a delay tech spends are extra frames to be grabbed in.',
        ja: '同様に抜けられず、遅らせ投げ抜けで増える立ち時間はそのまま掴まれる時間になる。',
      },
      'do-nothing': {
        'zh-Hant': '純防禦擋不住投。他貼上來的時候蹲著不動，等於站在那裡讓他抓。',
        en: 'Blocking does not stop a throw. Sitting still while they are on top of you is standing there to be grabbed.',
        ja: 'ガードでは投げを止められない。密着で固まるのは掴まれに行くのと同じ。',
      },
      'drive-parry': {
        'zh-Hant': '動力撥擋擋打擊、不擋投。對這隻角色按撥擋是最容易被抓的一個選擇。',
        en: 'Drive Parry stops strikes, not throws. Against this character it is the easiest button to be grabbed on.',
        ja: 'パリィは打撃を受けるが投げは受けない。このキャラ相手には最も掴まれやすい択になる。',
      },
      backdash: {
        'zh-Hant': '這是真的躲得掉的一個 —— 後衝刺的無敵幀吃得下指令投。代價是猜錯會被確反。',
        en: 'This one genuinely escapes: a backdash is invincible through the grab. The price is a full punish when you guess wrong.',
        ja: 'これは本当に逃げられる択で、バックダッシュの無敵が投げを回避する。代償は読み負けたときの確定反撃。',
      },
      'mash-light': {
        'zh-Hant': '速點跟 5 幀的指令投是純比快，你不會贏。要躲就跳或後衝刺。',
        en: 'Mashing a light against a 5-frame grab is a race you lose. If you are escaping, jump or backdash.',
        ja: '5Fのコマ投げに暴れで勝つ速度勝負は成立しない。逃げるならジャンプかバックダッシュ。',
      },
    },
    sources: [ufd('zangief'), ufd('ehonda'), ufd('jamie')],
  },

  {
    id: 'setup-command-grab',
    has: roster('cammy', 'aki'),
    name: {
      'zh-Hant': '要先出招的指令投',
      en: 'Command grab off a setup',
      ja: '前置き技からのコマ投げ',
    },
    hint: {
      'zh-Hant':
        '解不掉，但不能直接出：嘉米要先 Hooligan，A.K.I. 要先滑行。看到那一招才需要開始怕。',
      en: 'Untechable, but it cannot come out raw: Cammy needs Hooligan, A.K.I. needs the slide. The setup move is your cue.',
      ja: '抜けられないが単発では出せない。キャミィはフーリガン、A.K.I.はスライド経由。前置き技が合図になる。',
    },
    affects: {
      'throw-tech': {
        'zh-Hant': '解不掉，但它要先出前置招。沒看到那一招之前，照常解摔就好。',
        en: 'Untechable, but it needs its setup first. Until you see that move, tech normally.',
        ja: '抜けられないが前置き技が要る。その技を見るまでは通常どおり投げ抜けでよい。',
      },
      'do-nothing': {
        'zh-Hant': '純防禦對投無效，不過前置招本身可以確反 —— 問題在打那一招，不在守投。',
        en: 'Blocking does not answer the throw, but the setup itself is punishable. The answer is hitting that move, not defending the grab.',
        ja: 'ガードでは投げに対応できないが、前置き技自体には確定反撃がある。守るのではなく前置きを潰すのが答え。',
      },
      'mash-light': {
        'zh-Hant': '前置招有起始幀可以打，速點在這裡是有意義的 —— 跟純 5 幀的指令投不一樣。',
        en: 'The setup has startup you can hit, so a light actually does something here — unlike against a raw 5-frame grab.',
        ja: '前置き技には潰せる発生があるため、ここでの暴れには意味がある。生の5Fコマ投げとは別物。',
      },
    },
    sources: [ufd('cammy'), ufd('aki')],
  },

  {
    id: 'slow-command-grab',
    has: roster('jp', 'blanka'),
    name: {
      'zh-Hant': '看得見的指令投',
      en: 'Reactable command grab',
      ja: '見えるコマ投げ',
    },
    hint: {
      'zh-Hant':
        'JP 的 Embrace 25 幀起、布蘭卡的 Wild Hunt 32-45 幀。解不掉，但慢到看得到 —— 全場唯二可以反應的指令投。',
      en: "JP's Embrace from 25 frames, Blanka's Wild Hunt at 32-45. Untechable, but slow enough to see — the only two on the roster you can react to.",
      ja: 'JPのエンブレイスは25F以上、ブランカのワイルドハントは32-45F。抜けられないが見える速さで、反応できるのはロスターでこの2キャラだけ。',
    },
    affects: {
      'throw-tech': {
        'zh-Hant': '一樣解不掉，但你不需要解 —— 看到動作再跳或後衝刺就好。',
        en: 'Still untechable, but you do not need to tech it. See the animation, then jump or backdash.',
        ja: '同じく抜けられないが、抜ける必要が無い。動作を見てからジャンプかバックダッシュで間に合う。',
      },
      'do-nothing': {
        'zh-Hant': '純防禦擋不住，可是它慢到你來得及改。守著，看到再動。',
        en: 'Blocking does not stop it, but it is slow enough to change your mind. Hold the block and react.',
        ja: 'ガードでは止まらないが、見てから変えられる遅さ。ガードしたまま反応すればよい。',
      },
      'mash-light': {
        'zh-Hant': '速點打得穿 —— 25 幀以上的前置足夠你先出手。',
        en: 'A light beats it outright: 25-plus frames of startup is plenty of room to hit first.',
        ja: '暴れが普通に勝つ。25F以上の発生は先に手を出すのに十分。',
      },
    },
    sources: [ufd('jp'), ufd('blanka')],
  },

  {
    id: 'no-projectile',
    has: lacks('projectile'),
    name: { 'zh-Hant': '沒有發波', en: 'No projectile', ja: '飛び道具なし' },
    hint: {
      'zh-Hant': '這隻角色沒有彈幕。距離拉開對他沒有好處，遠距離的對峙規則整個不一樣。',
      en: 'No fireball anywhere in the kit. Distance does not pay for them, so the long-range read is a different game.',
      ja: '飛び道具を一切持たない。距離を取っても得をしないため、遠距離の読み合いが根本から変わる。',
    },
    affects: {
      'drive-parry': {
        'zh-Hant': '沒有波可以撥，遠距離按撥擋等於白站著。貼身用它擋打擊還是有用。',
        en: 'There is no fireball to parry, so parrying at range is standing still for nothing. Up close, against strikes, it still works.',
        ja: 'パリィする飛び道具が無いので、遠距離のパリィはただ止まっているだけ。密着で打撃を受ける用途は生きている。',
      },
      'walk-back': {
        'zh-Hant': '後退在這裡是安全的 —— 退開不會換來一發波。這是對付這隻角色最便宜的一手。',
        en: 'Walking back is free here: giving up ground does not buy you a fireball to the face. It is the cheapest answer they have no reply to.',
        ja: 'ここでの後退は安全で、距離を譲っても飛び道具は飛んでこない。相手に返し手が無い最も安いプレッシャー回避。',
      },
      'jump-forward': {
        'zh-Hant': '跳不再是讀波了。這裡跳過去就只是跳過去，對空會照常打到你。',
        en: 'The jump is no longer a fireball read. Here it is just a jump, and the anti-air is waiting exactly as it would be.',
        ja: 'ジャンプが波読みでなくなる。ここでは単なるジャンプで、対空は普通に待っている。',
      },
      'whiff-punish': {
        'zh-Hant': '他要碰到你就得走進來，所以打空的機會比對彈幕角多。守住你的確反距離。',
        en: 'They have to walk in to touch you, so whiffs come more often than against a zoner. Hold your punish range.',
        ja: '触るには歩いて入るしかないため、空振りは弾幕キャラ相手より多く出る。自分の確反間合いを保つこと。',
      },
      'drive-rush-out': {
        'zh-Hant': '不用花動力衝過彈幕 —— 他沒有彈幕。把那格留給壓制。',
        en: 'No Drive spent getting through a fireball, because there is no fireball. Keep the bar for pressure.',
        ja: '飛び道具を抜けるためのドライブが不要になる。そのゲージは攻めに残しておける。',
      },
      'dash-in': {
        'zh-Hant': '前衝接近不用挑波的縫隙，只要處理他的牽制招。',
        en: 'Dashing in does not have to find a gap between fireballs, only to beat a poke.',
        ja: '前ダッシュで飛び道具の隙間を探す必要は無く、牽制だけ処理すればよい。',
      },
    },
    sources: [ufd('zangief'), ufd('marisa'), ufd('cammy')],
  },

  {
    id: 'air-throw',
    has: owns('air-throw'),
    name: { 'zh-Hant': '有空中投', en: 'Has an air throw', ja: '空中投げ持ち' },
    hint: {
      'zh-Hant':
        '空中可以抓你。嘉米、春麗、凱爾、蛛俐、艾蓮娜、拉希德、E.本田是 5 幀的專用空中投，桑吉爾夫和金伯莉各有自己的一招。',
      en: 'They can grab you in the air. Cammy, Chun-Li, Guile, Juri, Elena, Rashid and E. Honda have the standard 5-frame air throw; Zangief and Kimberly have their own.',
      ja: '空中で掴まれる。キャミィ・春麗・ガイル・ジュリ・エレナ・ラシード・E.本田は5Fの通常空中投げ、ザンギエフとキンバリーは固有技。',
    },
    affects: {
      'air-to-air': {
        'zh-Hant': '空對空在這裡會輸給空中投 —— 5 幀，而且贏過任何空中普通技。寧可落地出對空。',
        en: 'Contesting in the air loses to the throw: five frames, and it beats any air normal. Prefer to land and anti-air from the ground.',
        ja: '空中での差し合いは空中投げに負ける。5Fで、どの空中通常技よりも速い。着地して地上対空を選ぶほうがよい。',
      },
      'jump-forward': {
        'zh-Hant': '跳過去有可能直接被空中抓，這是跳一般角色不會有的風險。',
        en: 'The jump can simply be grabbed out of the air — a risk that is not there against most of the roster.',
        ja: '飛び込みがそのまま空中で掴まれる可能性がある。大半のキャラ相手には存在しないリスク。',
      },
      'anti-air': {
        'zh-Hant': '用跳的去對空對這隻角色特別差。留在地上出對空技。',
        en: 'Anti-airing by jumping is at its worst against this character. Stay grounded and use the anti-air button.',
        ja: 'ジャンプで対空するのがこのキャラ相手には最も悪い。地上に残って対空技を出すこと。',
      },
      'empty-jump': {
        'zh-Hant': '空跳下來的路上也可能被抓 —— 不出招不代表安全。',
        en: 'An empty jump can be grabbed on the way down. Pressing nothing is not the same as being safe.',
        ja: '空ジャンプも落下中に掴まれる。技を出さないことは安全を意味しない。',
      },
      'jump-in': {
        'zh-Hant': '跳入前先看他有沒有在等你 —— 他的空中投贏過你的跳入攻擊。',
        en: 'Check whether they are waiting before you jump in: their air throw beats your jump attack.',
        ja: '飛び込む前に待たれていないか確認する。相手の空中投げは飛び込み攻撃に勝つ。',
      },
    },
    sources: [ufd('guile'), ufd('zangief'), ufd('kimberly')],
  },

  {
    id: 'charge',
    has: roster('chunli', 'guile', 'deejay', 'blanka', 'ehonda'),
    name: { 'zh-Hant': '蓄力角色', en: 'Charge character', ja: '溜めキャラ' },
    hint: {
      'zh-Hant':
        '必殺技要先蓄 —— UFD 寫成 Back Charge／Down Charge。躺著或後退的時候蓄滿，往前走或前衝的瞬間清空。',
      en: 'Their specials need a held charge — UFD writes it as Back Charge / Down Charge. It fills while they lie down or walk back, and empties the moment they walk or dash forward.',
      ja: '必殺技に溜めが要る（UFD表記は Back Charge／Down Charge）。ダウン中や後退中に溜まり、前進や前ダッシュの瞬間に消える。',
    },
    affects: {
      'jump-forward': {
        'zh-Hant': '他剛前衝或前走的時候沒有下蓄，那個瞬間跳過去只會遇到普通技對空。',
        en: 'Right after they dash or walk forward there is no down charge, so a jump then meets a normal, not a Flash Kick.',
        ja: '前ダッシュや前歩きの直後は下溜めが無く、その瞬間のジャンプは通常技対空にしか当たらない。',
      },
      'jump-in': {
        'zh-Hant': '同樣看他前一秒在做什麼 —— 但他起身時通常壓著下後，起身的下蓄是滿的。別把兩件事搞混。',
        en: 'Same read on what they just did — but they hold down-back while getting up, so the wakeup charge is full. Do not confuse the two.',
        ja: '直前の行動を見るのは同じ。ただし起き上がりは下後ろを押しているため溜めは満タン。この二つを混同しないこと。',
      },
      'dash-in': {
        'zh-Hant': '你衝進去的時候他要放波必須先有後蓄。他剛往前追過你，就沒有。',
        en: 'For them to fireball as you come in, the back charge has to already be there. If they just walked forward at you, it is not.',
        ja: 'こちらが入る瞬間に飛び道具を出すには後ろ溜めが必要。直前に前へ出ていたなら溜まっていない。',
      },
      'drive-rush-pressure': {
        'zh-Hant': '動力衝步壓上去的時候，他的反擊技如果是蓄力技，能不能出要看他前一秒在做什麼。',
        en: 'When you Drive Rush in, whether their counter-poke is available depends on what they were doing a second ago, if it is a charge move.',
        ja: 'ドライブラッシュで踏み込むとき、相手の返し技が溜め技なら、出せるかどうかは直前の行動次第。',
      },
    },
    sources: [ufd('guile'), ufd('chunli'), ufd('ehonda')],
  },
]

/** The opponent's traits, in authored order. Empty with no opponent picked. */
export function traitsFor(character?: CharacterOverlay): OpponentTrait[] {
  if (!character) return []
  return OPPONENT_TRAITS.filter((trait) => trait.has(character))
}
