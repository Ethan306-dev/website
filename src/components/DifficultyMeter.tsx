type DifficultyMeterProps = {
  value: number
  max?: number
  interactive?: boolean
  onChange?: (value: number) => void
  label?: string
}

export function DifficultyMeter({
  value,
  max = 5,
  interactive = false,
  onChange,
  label = 'Difficulty',
}: DifficultyMeterProps) {
  const levels = Array.from({ length: max }, (_, index) => index + 1)

  return (
    <div
      className={`difficulty-meter${interactive ? ' is-interactive' : ''}`}
      role={interactive ? 'group' : 'img'}
      aria-label={`${label}: ${value} of ${max}`}
    >
      <div className="difficulty-arcs" aria-hidden="true">
        {levels.map((level) => {
          const active = level <= value
          if (interactive) {
            return (
              <button
                key={level}
                type="button"
                className={`difficulty-arc${active ? ' is-active' : ''}`}
                aria-label={`${label} ${level}`}
                aria-pressed={active && level === value}
                onClick={() => onChange?.(level)}
              >
                <span />
              </button>
            )
          }

          return (
            <span
              key={level}
              className={`difficulty-arc${active ? ' is-active' : ''}`}
            >
              <span />
            </span>
          )
        })}
      </div>
      <span className="difficulty-caption">
        {label} {value}/{max}
      </span>
    </div>
  )
}
