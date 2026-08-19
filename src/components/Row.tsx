export default function Row({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span
        className={
          strong
            ? 'font-display font-bold text-shalom-forest'
            : 'text-sm text-shalom-ink/70'
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? 'font-display text-xl font-extrabold text-shalom-leaf'
            : 'font-medium text-shalom-ink'
        }
      >
        {value}
      </span>
    </div>
  )
}

