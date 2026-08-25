/**
 * Character icons: 400×400 PNG in, 160×160 WebP out.
 *
 * They render at 4rem — 128 device pixels on a 2× screen — so 400 was a 3×
 * oversample, and 35 of them at ~80 kB each made the picker 2.8 MB of the
 * download. 160 leaves headroom for a 3× screen and lands the set around 200 kB.
 *
 * Re-run after adding a character: drop the PNG in `public/characters/`, run
 * `npm run icons`, and the source PNG is replaced by the WebP that ships.
 */
import { readdir, readFile, writeFile, unlink, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const DIR = 'public/characters'
const EDGE = 160
const QUALITY = 82

const files = (await readdir(DIR)).filter((f) => extname(f).toLowerCase() === '.png')
if (files.length === 0) {
  console.log('convert-icons: no PNGs to convert')
  process.exit(0)
}

let before = 0
let after = 0
for (const file of files) {
  const from = join(DIR, file)
  const to = join(DIR, `${basename(file, extname(file))}.webp`)
  before += (await stat(from)).size
  const out = await sharp(await readFile(from))
    .resize(EDGE, EDGE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer()
  await writeFile(to, out)
  await unlink(from)
  after += out.length
}

const kb = (n) => `${(n / 1024).toFixed(0)} kB`
console.log(
  `convert-icons: ${files.length} icons, ${kb(before)} → ${kb(after)} ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
)
