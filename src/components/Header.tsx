export default function Header({
  title,
  onBack,
  cartCount,
  screen,
  onHome,
  onCatalog,
  onCart,
}: {
  title: string
  onBack?: () => void
  cartCount: number
  screen: string
  onHome: () => void
  onCatalog: () => void
  onCart: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-shalom-cream/85 px-5 py-3.5 backdrop-blur-md lg:rounded-t-[2rem] lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
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
      <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegación principal">
        <button
          onClick={onHome}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${screen === 'home' ? 'bg-shalom-mist text-shalom-forest' : 'text-shalom-ink/65 hover:bg-white'}`}
        >
          Inicio
        </button>
        <button
          onClick={onCatalog}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${screen === 'catalog' || screen === 'detail' ? 'bg-shalom-mist text-shalom-forest' : 'text-shalom-ink/65 hover:bg-white'}`}
        >
          Nuestras cajas
        </button>
      </nav>
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
      </div>
    </header>
  )
}
