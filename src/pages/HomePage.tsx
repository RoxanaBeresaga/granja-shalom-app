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
    <div className="animate-rise pb-10 lg:pb-16">
      {/* hero */}
      <section className="relative lg:mx-auto lg:mt-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:overflow-hidden lg:rounded-[2rem] lg:bg-shalom-forest">
        <img
          src={HERO}
          alt="Verduras agroecológicas recién cosechadas"
          className="h-[420px] w-full bg-shalom-mist object-cover lg:col-start-2 lg:h-[560px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shalom-forest via-shalom-forest/30 to-transparent lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:static lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-16">
          <span className="inline-block rounded-full bg-shalom-lime/95 px-3 py-1 text-xs font-bold text-shalom-forest">
            Bahía Blanca · Agroecológico
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] lg:text-6xl">
            Del surco a tu
            <br />
            mesa, sin escalas.
          </h1>
          <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-white/85 lg:max-w-lg lg:text-base">
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
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-4 py-6 sm:grid-cols-3 md:gap-4 lg:px-8 lg:py-10">
        {[
          { icon: '🌿', t: 'Agroecológico', d: 'Sin agrotóxicos' },
          { icon: '📍', t: 'Local', d: 'Productores de la zona' },
          { icon: '⛅', t: 'De estación', d: 'Cosecha fresca' },
        ].map((v) => (
          <div
            key={v.t}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/5 sm:block sm:text-center md:p-5"
          >
            <div className="text-2xl">{v.icon}</div>
            <div>
            <div className="mt-1 font-display text-sm font-bold text-shalom-forest">
              {v.t}
            </div>
            <div className="text-[11px] leading-tight text-shalom-ink/60">
              {v.d}
            </div>
            </div>
          </div>
        ))}
      </section>

      {/* featured */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BOXES.map((b) => (
            <BoxCard key={b.id} box={b} featured onOpen={() => onOpen(b.id)} />
          ))}
        </div>
      </section>

      <section className="mx-4 mt-8 rounded-3xl bg-shalom-forest p-6 text-white md:mx-auto md:max-w-4xl lg:max-w-7xl lg:p-8">
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
