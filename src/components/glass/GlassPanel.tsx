import { useLayoutEffect } from 'react'
import type { ElementType, MutableRefObject, ReactNode } from 'react'
import { useLiquidGlass } from './useLiquidGlass'
import type { LiquidGlassConfig } from './refraction'

interface GlassPanelProps {
  children: ReactNode
  /** Rendered element; defaults to a plain div. */
  as?: ElementType
  className?: string
  /** Adds the modal tier's frost layer over the tint. */
  modal?: boolean
  /** Lifts and brightens on pointer hover. */
  hover?: boolean
  config?: Partial<LiquidGlassConfig>
  /**
   * A second handle on the rendered element, for callers that need to measure
   * or search inside it.
   *
   * It has to be a named prop rather than `ref`. The panel already owns a ref —
   * refraction bakes its displacement map from it — and `...rest` is spread
   * after it, so a `ref` passed in would land in `rest`, overwrite the internal
   * one, and turn the glass off with nothing failing loudly enough to notice.
   */
  panelRef?: MutableRefObject<HTMLElement | null>
  [key: string]: unknown
}

/**
 * The full glass tier: CSS tint and rim plus baked refraction.
 *
 * Reserve it for chrome — the topbar, switchers, popover shells, dialogs.
 * Content that gets read (matrices, option tables, frame timelines) belongs on
 * an opaque `.card`; see the note at the top of styles/tokens.css.
 *
 * Children must paint no surface of their own — no background, no border, no
 * second radius. The panel supplies all three, and an opaque child fill paints
 * over the refracted backdrop, which is the entire effect.
 */
export function GlassPanel({
  children,
  as: Tag = 'div',
  className = '',
  modal = false,
  hover = false,
  config,
  panelRef,
  ...rest
}: GlassPanelProps) {
  const ref = useLiquidGlass<HTMLElement>(config)
  const classes = [
    'liquid-glass',
    modal ? 'liquid-glass--modal' : '',
    hover ? 'liquid-glass--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Copy, rather than attaching a second ref to the element. A callback ref
  // here would be a fresh function identity every render, so React would detach
  // and re-attach on each one — and the ref it would be replacing is the one
  // refraction bakes its filter from. Layout effect, so the parent's own effects
  // (which is where this handle gets used) see it populated.
  useLayoutEffect(() => {
    if (panelRef) panelRef.current = ref.current
  })

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
