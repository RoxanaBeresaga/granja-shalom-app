import BoxCard from '../components/BoxCard'
import { BOXES } from '../data/products'

export default function CatalogScreen({
  onOpen,
}: {
  onOpen: (id: string) => void
  onShop: () => void
}) {
  return (
    <div className="animate-rise px-4 py-5">
      <p className="mb-4 text-sm leading-relaxed text-shalom-ink/70">
        Elegí tu caja según cuántos sean en casa. Todas llegan con verdura de
        estación recién cosechada.
      </p>
      <div className="space-y-4">
        {BOXES.map((b) => (
          <BoxCard key={b.id} box={b} onOpen={() => onOpen(b.id)} />
        ))}
      </div>
    </div>
  )
}

