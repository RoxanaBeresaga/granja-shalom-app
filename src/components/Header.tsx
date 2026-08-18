export default function Header({
  title,
  onBack,
  cartCount,
  onCart,
}: {
  title: string
  onBack?: () => void
  cartCount: number
  onCart: () => void
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-shalom-cream/85 px-5 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Volver"
            className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-shalom-forest transition-colors hover:bg-shalom-mist"
          >
            ←
          </button>
        ) : (
          <span className="text-xl">🌱</span>
        )}
        <span className="font-display font-bold text-shalom-forest">{title}</span>
      </div>
      <button
        onClick={onCart}
        aria-label="Ver carrito"
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-shalom-forest shadow-sm ring-1 ring-black/5 transition-transform hover:scale-105"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-shalom-clay px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  )
}

