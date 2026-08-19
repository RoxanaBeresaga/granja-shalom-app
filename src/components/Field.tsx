import type { InputHTMLAttributes } from 'react'

export default function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-shalom-forest">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-shalom-ink outline-none transition-all placeholder:text-shalom-ink/35 focus:border-shalom-leaf focus:ring-2 focus:ring-shalom-lime/40"
      />
    </label>
  )
}

/* ---------------------------------- app ----------------------------------- */

