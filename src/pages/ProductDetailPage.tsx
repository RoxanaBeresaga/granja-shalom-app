import PrimaryButton from '../components/PrimaryButton'
import type { Box } from '../types'
import { formatCurrency as ars } from '../utils/currency'

export default function DetailScreen({
  box,
  qty,
  setQty,
  onAdd,
}: {
  box: Box
  qty: number
  setQty: (n: number) => void
  onAdd: () => void
}) {
  return (
    <div className="animate-rise pb-32">
      <div className="relative">
        <img
          src={box.image.replace('w=900&h=900', 'w=1000&h=760')}
          alt={`Foto de ${box.name}`}
          className="h-72 w-full bg-shalom-mist object-cover"
        />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
          style={{ backgroundColor: box.accent }}
        >
          {box.count} productos
        </span>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-shalom-forest">
              {box.name}
            </h1>
            <p className="mt-1 text-sm text-shalom-ink/70">{box.tagline}</p>
          </div>
          <span className="whitespace-nowrap font-display text-2xl font-extrabold text-shalom-leaf">
            {ars(box.price)}
          </span>
        </div>

        <h2 className="mt-6 font-display text-lg font-bold text-shalom-forest">
          Qué trae
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {box.contents.map((c, i) => (
            <div
              key={c.name + i}
              className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-shalom-mist text-lg">
                {c.emoji}
              </span>
              <span className="text-sm font-medium text-shalom-ink">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-xl bg-shalom-clay-soft/60 px-4 py-3 text-xs leading-relaxed text-shalom-clay">
          ⓘ Contenido referencial, puede variar según estación y disponibilidad de
          cosecha.
        </p>
      </div>

      {/* sticky add bar */}
      <div className="absolute inset-x-0 bottom-0 border-t border-black/5 bg-shalom-cream/95 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-[430px] items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/10">
            <QtyBtn onClick={() => setQty(Math.max(1, qty - 1))}>–</QtyBtn>
            <span className="w-8 text-center font-display text-lg font-bold text-shalom-forest">
              {qty}
            </span>
            <QtyBtn onClick={() => setQty(qty + 1)}>+</QtyBtn>
          </div>
          <button
            onClick={onAdd}
            className="flex-1 rounded-2xl bg-shalom-leaf px-4 py-4 font-display font-bold text-white shadow-lg transition-all hover:bg-shalom-forest active:scale-[0.98]"
          >
            Agregar · {ars(box.price * qty)}
          </button>
        </div>
      </div>
    </div>
  )
}

