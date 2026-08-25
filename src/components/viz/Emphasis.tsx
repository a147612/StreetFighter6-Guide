import type { ReactNode } from 'react'

/**
 * `**bold**` in a content string, rendered.
 *
 * The content layer carries no markup — that rule is what keeps the same string
 * usable in a table cell, a tooltip and a detail panel. But some sentences have
 * one clause that carries the whole point ("it **cannot be teched**"), and a
 * reader skimming between matches needs to find it without reading the sentence.
 * `ScaleNote` already parsed this inline; it is a component now because three
 * places need it and the fourth was printing the asterisks.
 */
export function Emphasis({ text }: { text: string }): ReactNode {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}
