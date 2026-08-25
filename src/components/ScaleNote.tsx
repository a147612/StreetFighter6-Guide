import { useT } from '~/i18n/useT'

const UFD_URL = 'https://ultimateframedata.com/sf6/stats'

/**
 * What the percentages actually mean.
 *
 * The health-cost bands were readable as authoritative when they are a band
 * against an assumed 10,000 health bar — and health is not uniform, so the same
 * move is worth about ten percent more to Akuma than to Zangief. Stating the
 * baseline lets a reader check the arithmetic instead of taking the band on
 * trust, which is the same reason the sourced/estimated flag exists.
 */
export function ScaleNote() {
  const { t } = useT()
  // Authored as two paragraphs with **bold** spans; kept as plain text so the
  // content layer never has to carry markup.
  const paragraphs = t.scale.body.split('\n')

  return (
    <details className="disclosure scalenote">
      <summary>{t.scale.heading}</summary>
      <div>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="small muted">
            {paragraph.split(/\*\*(.+?)\*\*/).map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
            )}
          </p>
        ))}
        <p className="small">
          <a href={UFD_URL} target="_blank" rel="noreferrer noopener">
            {t.scale.source}: Ultimate Frame Data
          </a>
        </p>
      </div>
    </details>
  )
}
