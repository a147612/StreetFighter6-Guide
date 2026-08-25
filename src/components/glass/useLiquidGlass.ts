import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import {
  GLASS_PRESET,
  acquireFilter,
  filterKey,
  isRefractionSupported,
  releaseFilter,
  resolveRadius,
  type LiquidGlassConfig,
} from './refraction'

/**
 * Attach the refraction half of liquid glass to a rounded-rect element. Pair
 * with the `liquid-glass` class, which supplies the tint, the rim, and the
 * plain-blur fallback this hook overwrites where it can do better:
 *
 *   const ref = useLiquidGlass<HTMLDivElement>()
 *   <div ref={ref} className="liquid-glass">…</div>
 *
 * Inert outside Chromium and whenever the user has switched refraction off; in
 * both cases the stylesheet's `backdrop-filter: blur(3px) saturate(125%)`
 * stays in effect, so the panel still reads as glass.
 *
 * Only for the panel and modal tiers. Chips, badges and menus are CSS-only by
 * design — a map is baked per surface, which is the wrong price for something
 * that appears by the dozen.
 */
export function useLiquidGlass<T extends HTMLElement>(
  config?: Partial<LiquidGlassConfig>,
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  // Callers pass inline literals; compare by value so a re-render with an
  // equivalent config does not rebake the map.
  const configKey = JSON.stringify(config ?? {})

  useEffect(() => {
    const host = ref.current
    if (!host) return

    // Engine-gated, not preference-gated. Refraction cannot be feature-queried
    // — Safari parses `backdrop-filter: url(#…)` and paints nothing, so
    // `@supports` reports success — which is why this is a browser check rather
    // than an `@supports` rule, and why there is no switch: where it runs it
    // runs, and where it does not the CSS glass is the whole effect.
    if (!isRefractionSupported()) {
      host.style.backdropFilter = ''
      return
    }

    const cfg: LiquidGlassConfig = {
      ...GLASS_PRESET,
      ...(JSON.parse(configKey) as Partial<LiquidGlassConfig>),
    }

    let currentKey: string | null = null
    let frame = 0
    let debounce: ReturnType<typeof setTimeout> | undefined

    const release = (): void => {
      if (currentKey === null) return
      releaseFilter(currentKey)
      currentKey = null
    }

    const rebuild = (): void => {
      const w = Math.round(host.offsetWidth)
      const h = Math.round(host.offsetHeight)
      if (w < 2 || h < 2) return

      // CSS stays the single source of shape: read the radius back rather than
      // taking it as an input that could drift from the stylesheet.
      const radius = Math.min(
        resolveRadius(getComputedStyle(host).borderTopLeftRadius, w, h),
        Math.min(w, h) / 2,
      )
      // The shader displaces in fractions of the page texture; the live
      // equivalent of that texture is the viewport — which is why a window
      // resize invalidates every map, not just this element's.
      const pageW = window.innerWidth
      const pageH = window.innerHeight

      const key = filterKey(w, h, radius, pageW, pageH, cfg)
      if (key === currentKey) return
      release()
      const entry = acquireFilter(key, w, h, radius, pageW, pageH, cfg)
      currentKey = key
      host.style.backdropFilter = `url(#${entry.id})`
    }

    /** Coalesce resize bursts into one rebuild per frame. */
    const schedule = (): void => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(rebuild)
    }

    /** A viewport resize changes pageW/pageH for every instance at once, so let
     *  a drag-resize settle instead of rebaking every map every frame. */
    const onWindowResize = (): void => {
      clearTimeout(debounce)
      debounce = setTimeout(schedule, 180)
    }

    /** requestAnimationFrame does not fire in a hidden tab, so a page opened in
     *  the background never gets its first bake — and would stay on the plain
     *  blur fallback after the tab is brought forward, until something happened
     *  to resize it. Re-schedule when the page becomes visible. */
    const onVisibilityChange = (): void => {
      if (document.visibilityState === 'visible') schedule()
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(host)
    window.addEventListener('resize', onWindowResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    schedule()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onWindowResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearTimeout(debounce)
      cancelAnimationFrame(frame)
      release()
      host.style.backdropFilter = ''
    }
  }, [configKey])

  return ref
}
