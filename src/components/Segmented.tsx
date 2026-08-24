interface SegmentedProps<T extends string> {
  label: string
  value: T
  options: { value: T; label: string; title?: string }[]
  onChange: (next: T) => void
  /** Renders label above rather than beside; for narrow contexts. */
  compact?: boolean
}

/**
 * A radio group that looks like a switch. Real radios underneath, so arrow
 * keys, screen readers and the label association all come for free — a row of
 * <button>s would need every one of those hand-rolled.
 */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  compact = false,
}: SegmentedProps<T>) {
  return (
    <fieldset className={`segmented ${compact ? 'segmented--compact' : ''}`}>
      <legend className="segmented__legend">{label}</legend>
      <div className="segmented__track">
        {options.map((option) => (
          <label
            key={option.value}
            className={`segmented__option ${value === option.value ? 'is-active' : ''}`}
            title={option.title}
          >
            <input
              type="radio"
              name={`seg-${label}`}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
