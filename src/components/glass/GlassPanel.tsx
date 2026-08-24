import type { ElementType, ReactNode } from 'react'
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

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
