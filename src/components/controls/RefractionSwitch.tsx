import { refractionStore, useRefractionEnabled } from '~/lib/prefs'
import { isRefractionSupported } from '../glass/refraction'
import { useT } from '~/i18n/useT'

/**
 * Renders nothing where refraction cannot run. A disabled control that can
 * never be enabled is just an unanswered question in the toolbar — outside
 * Chromium the CSS glass is the whole effect and there is nothing to toggle.
 */
export function RefractionSwitch() {
  const enabled = useRefractionEnabled()
  const { t } = useT()

  if (!isRefractionSupported()) return null

  return (
    <label className="control control--switch" title={t.refraction.label}>
      <input
        type="checkbox"
        role="switch"
        checked={enabled}
        onChange={(event) => refractionStore.set(event.target.checked)}
      />
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
      <span className="control__text">{t.refraction.label}</span>
    </label>
  )
}
