import BoxCard from '../components/BoxCard'
import { BOXES, HERO } from '../data/products'

export default function HomeScreen({
  onShop,
  onOpen,
}: {
  onShop: () => void
  onOpen: (id: string) => void
}) {
  return (
    <div className="animate-rise pb-10">
      {/* hero */}
      <section className="relative">
        <img
          src={HERO}
          alt="Verduras agroecológicas recién cosechadas"
          className="h-[420px] w-full bg-shalom-mist object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shalom-forest via-shalom-forest/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <span className="inline-block rounded-full bg-shalom-lime/95 px-3 py-1 text-xs font-bold text-shalom-forest">
            Bahía Blanca · Agroecológico
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05]">
            Del surco a tu
            <br />
            mesa, sin escalas.
          </h1>
          <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-white/85">
            Cajas de verdura de estación, cultivadas sin agrotóxicos por familias
            productoras de la región.
          </p>
          <div className="mt-5">
            <button
              onClick={onShop}
              className="rounded-2xl bg-shalom-clay px-6 py-3.5 font-display font-bold text-white shadow-lg transition-all hover:bg-shalom-clay/90 active:scale-95"
            >
              Ver las cajas →
            </button>
          </div>
        </div>
      </section>

      {/* value props */}
      <section className="grid grid-cols-3 gap-2 px-4 py-6">
        {[
          { icon: '🌿', t: 'Agroecológico', d: 'Sin agrotóxicos' },
          { icon: '📍', t: 'Local', d: 'Productores de la zona' },
          { icon: '⛅', t: 'De estación', d: 'Cosecha fresca' },
        ].map((v) => (
          <div
            key={v.t}
            className="rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-black/5"
          >
            <div className="text-2xl">{v.icon}</div>
            <div className="mt-1 font-display text-sm font-bold text-shalom-forest">
              {v.t}
            </div>
            <div className="text-[11px] leading-tight text-shalom-ink/60">
              {v.d}
            </div>
          </div>
        ))}
      </section>

      {/* featured */}
      <section className="px-4">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-bold text-shalom-forest">
            Cajas destacadas
          </h2>
          <button
            onClick={onShop}
            className="text-sm font-semibold text-shalom-leaf hover:underline"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-4">
          {BOXES.map((b) => (
            <BoxCard key={b.id} box={b} featured onOpen={() => onOpen(b.id)} />
          ))}
        </div>
      </section>

      <section className="mx-4 mt-8 rounded-3xl bg-shalom-forest p-6 text-white">
        <h3 className="font-display text-lg font-bold">
          Retirás o te lo llevamos 🚲
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/80">
          Retiro en Charcas 1769 los martes y viernes de 9 a 18 h, o envío a
          domicilio según tu zona de Bahía Blanca.
        </p>
      </section>
    </div>
  )
}

