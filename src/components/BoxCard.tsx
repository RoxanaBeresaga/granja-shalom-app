import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import type { Box } from '../types'
import { formatCurrency as ars } from '../utils/currency'

export default function BoxCard({
  box,
  featured,
  onOpen,
}: {
  box: Box
  featured?: boolean
  onOpen: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({
      rx: (0.5 - py) * 9,
      ry: (px - 0.5) * 11,
      gx: px * 100,
      gy: py * 100,
      active: true,
    })
  }
  const reset = () => setTilt((t) => ({ ...t, rx: 0, ry: 0, active: false }))

  const style: CSSProperties = {
    transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${
      tilt.active ? -6 : 0
    }px)`,
    transition: tilt.active
      ? 'transform 0.08s linear'
      : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
  }

  return (
    <button
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={onOpen}
      style={style}
      className="group relative block w-full overflow-hidden rounded-3xl bg-white text-left shadow-[0_18px_40px_-24px_rgba(15,61,36,0.55)] ring-1 ring-black/5 will-change-transform"
    >
      {/* spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.35), transparent 60%)`,
        }}
      />
      <div className="relative overflow-hidden">
        <img
          src={box.image}
          alt={`Foto de ${box.name}`}
          className={`w-full bg-shalom-mist object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 ${
            featured ? 'h-44 md:h-52' : 'h-52 md:h-56'
          }`}
        />
        {/* shine sweep on hover — the signature wow moment */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        >
          <span className="absolute -inset-y-4 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:animate-[shalom-shine_0.9s_ease-out] group-hover:opacity-100" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm"
          style={{ backgroundColor: box.accent }}
        >
          {box.count} productos
        </span>
        {box.popular && (
          <span className="animate-badge-in absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-shalom-clay px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
            <span className="transition-transform duration-500 group-hover:rotate-[18deg]">
              ⭐
            </span>
            Más elegida
          </span>
        )}
        <span className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-white/95 px-3 py-1 font-display text-sm font-bold text-shalom-forest opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {ars(box.price)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-shalom-forest">
          {box.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-shalom-ink/70">
          {box.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-shalom-leaf">
            {ars(box.price)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-shalom-mist px-3 py-1.5 text-sm font-semibold text-shalom-forest transition-colors group-hover:bg-shalom-lime">
            Ver caja →
          </span>
        </div>
      </div>
    </button>
  )
}

/* -------------------------------- primitives ------------------------------ */
