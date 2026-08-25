import { OPTIONS } from '~/data'
import { CATEGORY_ORDER, LOCALES, type Category } from '~/data/schema'
import { useT } from '~/i18n/useT'

/**
 * Every term, in all three languages at once.
 *
 * Not a duplicate of the inline hints: the interface shows one locale at a
 * time, so there is nowhere else to see that 重ね, 壓起身 and "meaty" are the
 * same thing. That mapping is what makes a Japanese or English guide readable
 * once you have learned the tables here.
 */
export function GlossaryView() {
  const { t, text } = useT()

  const byCategory = new Map<Category, typeof OPTIONS>()
  for (const option of OPTIONS) {
    const list = byCategory.get(option.category)
    if (list) list.push(option)
    else byCategory.set(option.category, [option])
  }

  return (
    <section className="stack" aria-labelledby="glossary-heading">
      <div className="sithead">
        <div className="sithead__text">
          <h2 id="glossary-heading">{t.nav.glossary}</h2>
          <span className="sithead__where mono">{OPTIONS.length}</span>
        </div>
      </div>

      <p className="small muted">{t.glossary.intro}</p>

      <div className="scroll-x card">
        <table className="opt-table glossary">
          <thead>
            <tr>
              <th scope="col" className="opt-table__name">
                繁體中文
              </th>
              <th scope="col">English</th>
              <th scope="col">日本語</th>
              <th scope="col">{t.glossary.origin}</th>
              <th scope="col" className="glossary__what">
                {t.glossary.what}
              </th>
            </tr>
          </thead>
          {CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => (
            <tbody key={category}>
              <tr className="opt-table__group">
                <th scope="colgroup" colSpan={5}>
                  <span>{t.category[category]}</span>
                </th>
              </tr>
              {byCategory.get(category)!.map((option) => (
                <tr key={option.id} className="glossary__row">
                  {LOCALES.map((code) => (
                    <th
                      key={code}
                      scope={code === 'zh-Hant' ? 'row' : undefined}
                      className={code === 'zh-Hant' ? 'opt-table__name' : 'glossary__name'}
                    >
                      {option.name[code]}
                      {option.aka?.[code] && option.aka[code]!.length > 0 && (
                        <span className="glossary__aka small faint">
                          {option.aka[code]!.join(' / ')}
                        </span>
                      )}
                    </th>
                  ))}
                  <td className="mono small">{option.origin ?? '—'}</td>
                  <td className="glossary__what small muted">
                    {option.hint ? text(option.hint) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="small faint">{t.glossary.note}</p>
    </section>
  )
}
