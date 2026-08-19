import BoxCard from '../components/BoxCard'
import { BOXES } from '../data/products'

export default function CatalogScreen({
  onOpen,
}: {
  onOpen: (id: string) => void
  onShop: () => void
}) {
  return (
    <div className="animate-rise mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <p className="mb-4 text-sm leading-relaxed text-shalom-ink/70">
        Elegí tu caja según cuántos sean en casa. Todas llegan con verdura de
        estación recién cosechada.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {BOXES.map((b) => (
          <BoxCard key={b.id} box={b} onOpen={() => onOpen(b.id)} />
        ))}
      </div>
    </div>
  )
}
