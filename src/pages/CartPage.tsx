import PrimaryButton from '../components/PrimaryButton'
import QtyBtn from '../components/QtyButton'
import type { OrderLine } from '../types'
import { formatCurrency as ars } from '../utils/currency'

export default function CartScreen({
  lines,
  subtotal,
  setQty,
  onShop,
  onContinue,
}: {
  lines: OrderLine[]
  subtotal: number
  setQty: (id: string, qty: number) => void
  onShop: () => void
  onContinue: () => void
}) {
  if (lines.length === 0)
    return (
      <div className="animate-rise flex h-full min-h-[60vh] flex-col items-center justify-center px-8 text-center">
        <div className="text-5xl">🧺</div>
        <h2 className="mt-4 font-display text-xl font-bold text-shalom-forest">
          Tu carrito está vacío
        </h2>
        <p className="mt-1.5 text-sm text-shalom-ink/60">
          Sumá una caja de verdura fresca para empezar.
        </p>
        <div className="mt-6 w-full">
          <PrimaryButton onClick={onShop}>Ver las cajas</PrimaryButton>
        </div>
      </div>
    )

  return (
    <div className="animate-rise pb-60 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8 lg:px-8 lg:py-10 lg:pb-10">
      <div className="space-y-3 px-4 py-5 lg:px-0 lg:py-0">
        {lines.map(({ box, qty }) => (
          <div
            key={box.id}
            className="flex gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 md:gap-5 md:p-4"
          >
            <img
              src={box.image}
              alt={box.name}
              className="h-20 w-20 shrink-0 rounded-2xl bg-shalom-mist object-cover md:h-28 md:w-28"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between">
                <h3 className="font-display font-bold text-shalom-forest">
                  {box.name}
                </h3>
                <button
                  onClick={() => setQty(box.id, 0)}
                  aria-label={`Quitar ${box.name}`}
                  className="text-sm text-shalom-ink/40 transition-colors hover:text-shalom-clay"
                >
                  Quitar
                </button>
              </div>
              <span className="text-xs text-shalom-ink/55">
                {box.count} productos
              </span>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-xl bg-shalom-mist p-0.5">
                  <QtyBtn onClick={() => setQty(box.id, qty - 1)}>–</QtyBtn>
                  <span className="w-6 text-center font-display font-bold text-shalom-forest">
                    {qty}
                  </span>
                  <QtyBtn onClick={() => setQty(box.id, qty + 1)}>+</QtyBtn>
                </div>
                <span className="font-display font-bold text-shalom-leaf">
                  {ars(box.price * qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-black/5 bg-shalom-cream/95 p-4 backdrop-blur-md lg:static lg:rounded-3xl lg:border-0 lg:bg-white lg:p-6 lg:shadow-sm lg:ring-1 lg:ring-black/5 lg:backdrop-blur-none">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-shalom-ink/60">
          <span>🌿 Agroecológico</span>
          <span>📍 Local</span>
          <span>⛅ De estación</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-shalom-ink/70">Subtotal</span>
          <span className="font-display text-xl font-extrabold text-shalom-forest">
            {ars(subtotal)}
          </span>
        </div>
        <PrimaryButton onClick={onContinue}>
          Ir a datos de entrega
        </PrimaryButton>
        <button
          onClick={onShop}
          className="w-full rounded-2xl border border-shalom-leaf/40 bg-transparent px-6 py-3 font-display text-sm font-bold text-shalom-leaf transition-colors hover:bg-shalom-mist"
        >
          ← Seguir comprando
        </button>
      </div>
    </div>
  )
}
