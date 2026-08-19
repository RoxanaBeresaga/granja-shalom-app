import type { ReactNode } from 'react'

export default function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-shalom-leaf px-6 py-4 font-display text-base font-bold text-white shadow-[0_12px_24px_-10px_rgba(31,122,63,0.9)] transition-all hover:bg-shalom-forest active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

