export default function QtyBtn({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold text-shalom-forest transition-colors hover:bg-shalom-mist active:scale-90"
    >
      {children}
    </button>
  )
}

