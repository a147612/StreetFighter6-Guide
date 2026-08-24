/**
 * The health cost of being wrong, as a bar.
 *
 * "25-40%" against "35-50%" is a comparison you have to stop and do in your
 * head; two bars of different length is one you do not. The band is drawn as a
 * band — solid to the low end, hatched across the uncertainty — because the
 * underlying data is a range and a single-value bar would overstate it.
 */

/** Severity from the upper bound: what it costs when it goes badly, not on
 *  average. Reuses the risk ramp so the colour means the same thing here. */
function severity(hi: number): string {
  if (hi >= 45) return 'extreme'
  if (hi >= 35) return 'high'
  if (hi >= 20) return 'medium'
  if (hi >= 10) return 'low'
  return 'safe'
}

export function HpLossBar({ value }: { value: string }) {
  const numbers = value.match(/\d+(?:\.\d+)?/g)
  if (!numbers || numbers.length === 0) {
    return <span className="mono small">{value}</span>
  }

  const lo = Math.min(100, Number(numbers[0]))
  const hi = Math.min(100, Number(numbers[numbers.length - 1]))
  const tier = severity(hi)

  return (
    <span className="hploss" style={{ ['--hploss-color' as string]: `var(--risk-${tier})` }}>
      <span className="hploss__track" role="img" aria-label={value}>
        <span className="hploss__solid" style={{ width: `${lo}%` }} />
        {hi > lo && (
          <span className="hploss__range" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
        )}
      </span>
      <span className="hploss__text mono">{value}</span>
    </span>
  )
}
