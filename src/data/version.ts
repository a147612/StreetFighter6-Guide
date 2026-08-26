/**
 * What the data was read against.
 *
 * None of the sources state a game version — Ultimate Frame Data publishes
 * numbers without one — which is why every `Source.patch` in this repo records
 * the *date it was read* rather than a patch number. That is honest but not
 * quite enough for a reader deciding whether to trust a number today, so the
 * game's balance state at that date is recorded here, from Capcom's own
 * release schedule rather than from the frame-data sources.
 *
 * Hand-maintained on purpose: nothing here can detect a balance patch, and a
 * version that updated itself would claim a verification that never happened.
 * When one lands, run `npm run frames -- --fetch`, fix what moved, and change
 * these three lines in the same commit.
 */
export const GAME_VERSION = 'Season 4'

/** The balance update this reflects. */
export const GAME_VERSION_DATE = '2026-08-03'

/** When the frame and mechanic sources were last read end to end. */
export const DATA_READ = '2026-08'
