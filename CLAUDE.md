# CLAUDE.md — working notes for this repo

A situational decision guide for Street Fighter 6. Not a frame-data site: it
answers "what should I press here", where the frame-data sites answer "what does
this move do". Trilingual (繁體中文 / English / 日本語), deployed to GitHub Pages.

Live: https://a147612.github.io/StreetFighter6-Guide/

## The three rules the data model exists to enforce

**1. A situation is classified on exactly one axis.**
Position, or distance, or frame advantage, or whose resource is low — never a
mix. Group A is position (midscreen / near corner / cornered); group C is
advantage; group E is distance; group J is the opponent's Drive. Mixing axes
inside a group is the single most common way this guide became unscannable, and
it has been fixed twice.

**What the opponent favours is never a situation.** "They keep shimmying" is a
*column* of the matrix — read down 退康 in the situation you are already in
rather than switching pages.

**2. Options are written once; situations grade them.**
`OptionDef` is identity (name, input, cost, category). `OptionEval` is judgment
(risk, reward, outcomes, versus) and hangs off the situation, because the grade
is a property of the situation: back jump is reasonable midscreen and close to
indefensible cornered, and that difference *is* the content.

**3. Offence and defence are one relation read two ways.**
`versus` on a defensive evaluation names the attacker's options; the offensive
groups (I–K) use the defenders' options as their columns. `counteredBy` is
derived from `versus`, never authored, so the two cannot disagree.

## Content rules

- **Every string is trilingual.** `I18nText` is a total Record, so a missing
  locale is a compile error. Blank-but-present strings (`'   '`) are caught by
  `npm run validate`, not by tsc.
- **`estimated` vs `sourced` is load-bearing.** `sourced` means the grade names
  the published mechanic that decides it and links where that is written down —
  not that every number has been re-measured. All 195 evaluations are there now.
  A new row starts `estimated`, which is the honest answer while the grade is
  still a feeling, and moves once you can say *why*.
  None of the sources state a game version, so `patch` records the **date it was
  read** and the source `note` says so. Do not invent a patch number.
- **Health percentages assume 10,000.** Health runs 9,000 (Akuma) to 11,000
  (Zangief). The ScaleNote component says this; keep it true.
- **Terminology follows the community, not translation.** 壓起身 (meaty), 退康
  (shimmy), 解摔, 速點, 強制倒地, and the game's own zh-TW names for the Drive
  system (動力撥擋 / 動力衝擊 / 動力反攻 / 動力箭步). Every option also carries
  `origin` (the English term) and `hint` (one plain sentence), because the
  vocabulary travels as loanwords and "meaty" often identifies the thing faster
  than any translation.
- **Diagrams are self-authored SVG.** Capcom's policy forbids redistributing
  extracted in-game elements and permits self-made derivative art, so nothing
  here fetches or reproduces official art on its own initiative.
- **The character icons in `public/characters/` are the owner's files**, placed
  there deliberately, and they ship. `ICONS` in `data/characters/portraits.ts`
  maps every id to one; two ids carry a second variant because the name is
  burned into the art (豪鬼/GOUKI, 維加/VEGA), and every non-English locale gets
  that one — along with a `latin` override on the character so the label reads
  Gouki/Vega rather than contradicting the picture. **They are WebP at 160px**:
  drop a new PNG in and run `npm run icons`, which converts and replaces it.
  400×400 PNGs made the picker a 2.8 MB download for a 64px tile.
- **`CharacterFace.tsx` is the fallback, not the current tier.** Thirty-one
  hand-drawn SVG faces, then a monogram. Nothing reaches them today because all
  31 characters have an icon; they exist so a roster addition renders as a face
  rather than as a hole. Delete them only if you also decide what a 32nd
  character without an icon should look like.

## Commands

```bash
npm run dev       # http://localhost:5173/StreetFighter6-Guide/
npm run build     # tsc -b && vite build
npm run validate  # referential integrity; run before committing data
npm run frames    # diff every frame number against UFD (--fetch to re-download)
```

`validate` bundles `src/data/index.ts` with esbuild and imports the real module
rather than regexing source. It fails on dangling option ids, an option graded
twice in one situation, outcomes against an option that is not one of the
situation's `opponentOptions`, `sourced` with no sources, missing categories,
and character overlays referencing unknown options. It also prints the count of
characters with no OD wakeup escape — a number that must not drift silently.

Deploy is automatic on push to `main`. **Verify a deploy by comparing hashes**,
not by trusting the workflow: `npm run build | grep index-` against
`curl -sS <live URL> | grep -oE 'index-[A-Za-z0-9_-]+\.js'`.

## The frame layer

**Numbers live on the character, never in a situation cell.** `CharacterOverlay.frames`
is keyed by option id and holds a *list* of moves, because most options are a
choice of button: Ken's `meaty` is 2MP at ±0 on block, 5HP at −2, or an OD
fireball at −2. A judgement ("a shimmy beats a delay tech") survives a balance
patch and a measurement ("−6 on block") does not, so storing them together would
mean re-checking every cell the numbers touch instead of a dozen rows per
character.

**Every value is stored exactly as UFD writes it** — `-7...` stays `-7...`, and
a throw's total stays `30 (whiff) / 123 (hit)`. That is what lets `npm run frames`
diff the whole layer by string match. Prettying (real minus signs, `±0`, `…`)
happens in `FrameStrip`, not in the data.

**Move names are the community's, not Capcom's.** `MoveFrames.move` is UFD's
English and is the join key; `name` is what the reader sees. Normals and throws
are derived from notation. Special moves get a name only where the community has
a settled one (波動拳, 螺旋打樁機, 大銀杏投); where it does not, the field is
absent and all three locales show the original, because that is what players say
and an invented translation is worse than the English it replaced.

**There is deliberately no universal tier.** An averaged frame number is true of
nobody, and the reason to look one up is that it is yours; nothing renders until
a character is picked.

**Bind the option to the role, not to the obvious button.** `mash-light` is the
character's *fastest* light — all 31 have a 4-frame one, but it is a standing LP
for most, a standing LK for five, a crouching LP for eight, and for Zangief a
crouching LK that is a Low and ±0 on hit. Binding his standing LP instead put a
correct number on the wrong row and produced a whole paragraph of wrong content.

`src/data/version.ts` records the game's balance state the data was read
against, hand-maintained because nothing here can detect a patch. When one
lands: `npm run frames -- --fetch`, fix what moved, update those constants in
the same commit.

## Gotchas learned the hard way here

- `requestAnimationFrame` does not fire in a hidden tab. Anything scheduled
  through it needs a `visibilitychange` fallback, or it never runs for a page
  opened in a background tab. Same class of problem bit the `--scroller-w`
  measurement, which now republishes on every commit rather than trusting a
  ResizeObserver callback that can be missed.
- A class rule setting `display` outranks the `[hidden]` attribute. Querying
  `el.hidden === true` proves the attribute is set, **not** that it did
  anything. Check the computed style.
- Refraction (`useLiquidGlass`) is Chromium-only and cannot be feature-queried —
  Safari parses `backdrop-filter: url(#…)` and paints nothing, so `@supports`
  reports success. Gate on engine.
- Children of a `.liquid-glass` panel must paint no background or border, or
  they cover the refracted backdrop. Content that gets *read* belongs on an
  opaque `.card`; glass is for chrome only.

## Where to add things

| Adding | File |
|---|---|
| A new action either side can take | `src/data/options.ts` |
| A situation | `src/data/situations/<letter>-<name>.ts`, then wire in `src/data/index.ts` |
| A character | `src/data/characters/index.ts` |
| Interface copy | `src/i18n/ui.ts` (all three locales, or tsc fails) |
| A character icon | `public/characters/`, then `npm run icons` |
| Frame data for a move | `frames` on the character in `src/data/characters/index.ts`, then `npm run frames` |

Content prose should say what is happening on screen, not explain the idea
behind the situation. Two short sentences per outcome. This was rewritten once
for being too essayistic.
