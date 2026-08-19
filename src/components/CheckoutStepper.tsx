export default function CheckoutStepper({ current }: { current: number }) {
  const steps = ['Datos', 'Entrega', 'Pago']
  return (
    <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex flex-1 items-center gap-1.5 last:flex-none">
            <div className="flex items-center gap-1.5">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  done
                    ? 'bg-shalom-leaf text-white'
                    : active
                      ? 'bg-shalom-clay text-white ring-4 ring-shalom-clay-soft'
                      : 'bg-shalom-mist text-shalom-ink/40'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className={`text-xs font-semibold transition-colors ${
                  active
                    ? 'text-shalom-clay'
                    : done
                      ? 'text-shalom-forest'
                      : 'text-shalom-ink/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  done ? 'bg-shalom-leaf' : 'bg-shalom-mist'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* -------------------------------- screens --------------------------------- */

