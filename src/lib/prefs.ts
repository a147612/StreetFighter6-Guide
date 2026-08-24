import { useSyncExternalStore } from 'react'

/**
 * Persisted user preferences, held outside React so the pre-paint boot script
 * in index.html and the app agree on one source of truth. Each store applies
 * its own DOM side effect on change (theme -> `data-theme`, locale -> `lang`)
 * rather than leaving that to a component's effect, which would run a frame
 * late and flash.
 */

const PREFIX = 'sf6g:'

function read(key: string): string | null {
  try {
    return localStorage.getItem(PREFIX + key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, value)
  } catch {
    /* private mode / quota — the in-memory value still applies this session */
  }
}

interface Store<T> {
  get(): T
  set(next: T): void
  subscribe(fn: () => void): () => void
  /** Re-notify without a stored-value change; for external triggers such as an
   *  OS theme flip while the choice is 'system'. */
  refresh(): void
}

function createStore<T extends string | boolean>(
  key: string,
  initial: T,
  apply: (value: T) => void,
): Store<T> {
  let value = initial
  const listeners = new Set<() => void>()
  const emit = (): void => {
    for (const fn of listeners) fn()
  }
  apply(value)

  // Arrow properties, not methods: these get passed straight to
  // useSyncExternalStore, where a `this`-dependent method would break.
  return {
    get: () => value,
    set: (next: T) => {
      if (next === value) return
      value = next
      write(key, String(next))
      apply(value)
      emit()
    },
    subscribe: (fn: () => void) => {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },
    refresh: () => {
      apply(value)
      emit()
    },
  }
}

/* ── Theme ────────────────────────────────────────────────────────────
   'system' is a real, storable choice, not the absence of one: the default
   follows the OS and keeps following it as the OS flips. */

export type ThemeChoice = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

const darkQuery =
  typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null

function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  if (choice === 'light' || choice === 'dark') return choice
  return darkQuery?.matches ? 'dark' : 'light'
}

const storedTheme = read('theme')
const initialTheme: ThemeChoice =
  storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
    ? storedTheme
    : 'system'

export const themeStore = createStore<ThemeChoice>('theme', initialTheme, (choice) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = resolveTheme(choice)
  }
})

// While the choice is 'system', an OS flip has to repaint the app too.
darkQuery?.addEventListener('change', () => {
  if (themeStore.get() === 'system') themeStore.refresh()
})

export function useTheme(): {
  choice: ThemeChoice
  resolved: ResolvedTheme
  setChoice: (next: ThemeChoice) => void
} {
  const choice = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.get,
    () => 'system' as ThemeChoice,
  )
  return { choice, resolved: resolveTheme(choice), setChoice: themeStore.set }
}

/* ── Locale ──────────────────────────────────────────────────────────── */

export const LOCALES = ['zh-Hant', 'en', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

function detectLocale(): Locale {
  const stored = read('locale')
  if (isLocale(stored)) return stored
  const tags = (navigator.languages ?? [navigator.language ?? 'en']).join(',')
  if (/\bja\b/i.test(tags)) return 'ja'
  if (/\bzh\b/i.test(tags)) return 'zh-Hant'
  return 'en'
}

export const localeStore = createStore<Locale>('locale', detectLocale(), (locale) => {
  if (typeof document !== 'undefined') document.documentElement.lang = locale
})

export function useLocale(): { locale: Locale; setLocale: (next: Locale) => void } {
  const locale = useSyncExternalStore(
    localeStore.subscribe,
    localeStore.get,
    () => 'en' as Locale,
  )
  return { locale, setLocale: localeStore.set }
}

/* ── Refraction ───────────────────────────────────────────────────────
   The glass CSS stands on its own; refraction is the expensive half (a canvas
   displacement bake per surface) and Chromium-only, so it stays switchable. */

const storedRefraction = read('refraction')
export const refractionStore = createStore<boolean>(
  'refraction',
  storedRefraction === null ? true : storedRefraction === 'true',
  () => {},
)

export function useRefractionEnabled(): boolean {
  return useSyncExternalStore(
    refractionStore.subscribe,
    refractionStore.get,
    () => false,
  )
}
