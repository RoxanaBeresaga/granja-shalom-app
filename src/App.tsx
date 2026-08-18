import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react'

/* Granja Shalom — interactive prototype */

/* ---------------------------------- data ---------------------------------- */

type Item = { emoji: string; name: string }

type Box = {
  id: string
  name: string
  tagline: string
  price: number
  count: number
  image: string
  accent: string
  popular?: boolean
  contents: Item[]
}

const BOXES: Box[] = [
  {
    id: 'semilla',
    name: 'Caja Semilla',
    tagline: 'Para arrancar la semana con lo justo y fresco.',
    price: 30000,
    count: 5,
    image:
      'https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?w=900&h=900&fit=crop&auto=format',
    accent: '#7cc043',
    contents: [
      { emoji: '🥬', name: 'Lechuga mantecosa' },
      { emoji: '🍅', name: 'Tomates perita' },
      { emoji: '🥕', name: 'Zanahorias' },
      { emoji: '🧅', name: 'Cebolla morada' },
      { emoji: '🎃', name: 'Zapallo anco' },
    ],
  },
  {
    id: 'cosecha',
    name: 'Caja Cosecha',
    tagline: 'La más elegida: variedad para toda la familia.',
    price: 40000,
    count: 9,
    image:
      'https://images.unsplash.com/photo-1624668430039-0175a0fbf006?w=900&h=900&fit=crop&auto=format',
    accent: '#1f7a3f',
    popular: true,
    contents: [
      { emoji: '🥬', name: 'Lechuga mantecosa' },
      { emoji: '🍅', name: 'Tomates perita' },
      { emoji: '🥕', name: 'Zanahorias' },
      { emoji: '🧅', name: 'Cebolla morada' },
      { emoji: '🎃', name: 'Zapallo anco' },
      { emoji: '🥔', name: 'Papas negras' },
      { emoji: '🫑', name: 'Morrón verde' },
      { emoji: '🌽', name: 'Choclo' },
      { emoji: '🥬', name: 'Acelga' },
    ],
  },
  {
    id: 'abundancia',
    name: 'Caja Abundancia',
    tagline: 'Alacena completa de estación, sin salir de casa.',
    price: 50000,
    count: 13,
    image:
      'https://images.unsplash.com/photo-1635341083777-5f93a755e916?w=900&h=900&fit=crop&auto=format',
    accent: '#e2662f',
    contents: [
      { emoji: '🥬', name: 'Lechuga mantecosa' },
      { emoji: '🍅', name: 'Tomates perita' },
      { emoji: '🥕', name: 'Zanahorias' },
      { emoji: '🧅', name: 'Cebolla morada' },
      { emoji: '🎃', name: 'Zapallo anco' },
      { emoji: '🥔', name: 'Papas negras' },
      { emoji: '🫑', name: 'Morrón verde' },
      { emoji: '🌽', name: 'Choclo' },
      { emoji: '🥬', name: 'Acelga' },
      { emoji: '🍆', name: 'Berenjenas' },
      { emoji: '🥦', name: 'Brócoli' },
      { emoji: '🌿', name: 'Rúcula' },
      { emoji: '🧄', name: 'Ajo' },
    ],
  },
]

const HERO =
  'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=1200&h=1400&fit=crop&auto=format'

const WA_NUMBER = '+54 9 291 555-0142'
const WA_LINK = 'https://wa.me/5492915550142'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.6 4.4 1.8 6.3L4 29l8-2.1c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9C30 8.3 24.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.7 1.2 1.3-4.6-.3-.4a9.7 9.7 0 01-1.5-5.3c0-5.4 4.5-9.8 10.6-9.8s10.6 4.4 10.6 9.8-4.5 9.8-10.6 9.8zm5.8-7.3c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.9-.9-3.1-1.7-4.4-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.8 2 .8 2.7.9 3.7.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}

function WhatsAppFab({ bottom }: { bottom: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ bottom }}
      className="absolute right-4 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-300"
    >
      {open && (
        <div className="animate-pop w-60 rounded-2xl rounded-br-md bg-white p-4 shadow-xl ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-2">
            <span className="font-display text-sm font-bold text-shalom-forest">
              Granja Shalom
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="-mr-1 -mt-1 text-shalom-ink/40 transition-colors hover:text-shalom-ink"
            >
              ✕
            </button>
          </div>
          <p className="mt-1 text-sm leading-snug text-shalom-ink/75">
            ¿Tenés dudas sobre tu caja? Escribinos y te ayudamos. 🥬
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1eb457]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {WA_NUMBER}
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contactar por WhatsApp"
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.7)] ring-1 ring-black/5 transition-all hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className={`h-8 w-8 transition-transform ${open ? 'rotate-6' : ''}`} />
      </button>
    </div>
  )
}

const DELIVERY_ZONES = [
  { id: 'centro', label: 'Centro', cost: 0 },
  { id: 'norte', label: 'Zona Norte', cost: 2500 },
  { id: 'universitaria', label: 'Universitaria / Palihue', cost: 3500 },
  { id: 'ingeniero', label: 'Ingeniero White', cost: 4500 },
]

const ars = (n: number) =>
  '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 })

type Screen =
  | 'home'
  | 'catalog'
  | 'detail'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'confirmation'

type CartLine = { boxId: string; qty: number }

/* ------------------------------- box card wow ----------------------------- */

function BoxCard({
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
            featured ? 'h-44' : 'h-52'
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

function Header({
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

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-shalom-leaf px-6 py-4 font-display text-base font-bold text-white shadow-[0_12px_24px_-10px_rgba(31,122,63,0.9)] transition-all hover:bg-shalom-forest active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-shalom-forest">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-shalom-ink outline-none transition-all placeholder:text-shalom-ink/35 focus:border-shalom-leaf focus:ring-2 focus:ring-shalom-lime/40"
      />
    </label>
  )
}

/* ---------------------------------- app ----------------------------------- */

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedId, setSelectedId] = useState<string>('cosecha')
  const [cart, setCart] = useState<CartLine[]>([])
  const [detailQty, setDetailQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' })
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup')
  const [zone, setZone] = useState(DELIVERY_ZONES[0].id)
  const [payment, setPayment] = useState<'mp' | 'transfer'>('mp')
  const [receipt, setReceipt] = useState<string | null>(null)
  const [confirmedOrder, setConfirmedOrder] = useState<{
    lines: { box: Box; qty: number }[]
    total: number
  } | null>(null)
  const [orderId] = useState(() =>
    'GS-' + Math.floor(1000 + Math.random() * 9000),
  )

  const box = BOXES.find((b) => b.id === selectedId)!
  const cartCount = cart.reduce((n, l) => n + l.qty, 0)

  const lines = useMemo(
    () =>
      cart
        .map((l) => ({ box: BOXES.find((b) => b.id === l.boxId)!, qty: l.qty }))
        .filter((l) => l.box),
    [cart],
  )
  const subtotal = lines.reduce((s, l) => s + l.box.price * l.qty, 0)
  const shipping =
    fulfillment === 'delivery'
      ? DELIVERY_ZONES.find((z) => z.id === zone)?.cost ?? 0
      : 0
  const total = subtotal + shipping

  const goDetail = (id: string) => {
    setSelectedId(id)
    setDetailQty(1)
    setScreen('detail')
    scrollTop()
  }

  const addToCart = (id: string, qty: number) => {
    setCart((prev) => {
      const found = prev.find((l) => l.boxId === id)
      if (found)
        return prev.map((l) => (l.boxId === id ? { ...l, qty: l.qty + qty } : l))
      return [...prev, { boxId: id, qty }]
    })
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1600)
  }

  const setQty = (id: string, qty: number) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.boxId !== id)
        : prev.map((l) => (l.boxId === id ? { ...l, qty } : l)),
    )

  const confirmOrder = () => {
    setConfirmedOrder({ lines, total })
    setCart([])
    setScreen('confirmation')
    scrollTop()
  }

  const scrollRef = useRef<HTMLDivElement>(null)
  function scrollTop() {
    window.requestAnimationFrame(() => scrollRef.current?.scrollTo(0, 0))
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#d9e4cf] p-0 sm:p-6">
      {/* phone frame */}
      <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-shalom-cream shadow-2xl sm:h-[900px] sm:rounded-[2.5rem] sm:ring-8 sm:ring-black/80">
        <Header
          title={screenTitle(screen)}
          onBack={screen === 'home' ? undefined : () => backFrom(screen)}
          cartCount={cartCount}
          onCart={() => {
            setScreen('cart')
            scrollTop()
          }}
        />

        <div
          ref={scrollRef}
          className="scroll-area relative flex-1 overflow-y-auto overscroll-contain"
        >
          {screen === 'home' && <HomeScreen onShop={goCatalog} onOpen={goDetail} />}
          {screen === 'catalog' && (
            <CatalogScreen onOpen={goDetail} onShop={goCatalog} />
          )}
          {screen === 'detail' && (
            <DetailScreen
              box={box}
              qty={detailQty}
              setQty={setDetailQty}
              onAdd={() => {
                addToCart(box.id, detailQty)
                setScreen('cart')
                scrollTop()
              }}
            />
          )}
          {screen === 'cart' && (
            <CartScreen
              lines={lines}
              subtotal={subtotal}
              setQty={setQty}
              onShop={goCatalog}
              onContinue={() => {
                setScreen('checkout')
                scrollTop()
              }}
            />
          )}
          {screen === 'checkout' && (
            <CheckoutScreen
              customer={customer}
              setCustomer={setCustomer}
              fulfillment={fulfillment}
              setFulfillment={setFulfillment}
              zone={zone}
              setZone={setZone}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onContinue={() => {
                setScreen('payment')
                scrollTop()
              }}
            />
          )}
          {screen === 'payment' && (
            <PaymentScreen
              payment={payment}
              setPayment={setPayment}
              total={total}
              receipt={receipt}
              setReceipt={setReceipt}
              onPay={confirmOrder}
            />
          )}
          {screen === 'confirmation' && confirmedOrder && (
            <ConfirmationScreen
              orderId={orderId}
              lines={confirmedOrder.lines}
              total={confirmedOrder.total}
              payment={payment}
              fulfillment={fulfillment}
              zone={zone}
              customer={customer}
              onHome={() => {
                setScreen('home')
                scrollTop()
              }}
            />
          )}
        </div>

        {/* add-to-cart toast */}
        {justAdded && (
          <div className="animate-pop pointer-events-none absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-shalom-forest px-5 py-2.5 text-sm font-semibold text-white shadow-xl">
            ✓ Agregado al carrito
          </div>
        )}

        <WhatsAppFab
          bottom={
            screen === 'cart' && cartCount > 0
              ? 232
              : screen === 'detail' ||
                  screen === 'checkout' ||
                  screen === 'payment'
                ? 104
                : 24
          }
        />
      </div>
    </div>
  )

  function goCatalog() {
    setScreen('catalog')
    scrollTop()
  }
  function backFrom(s: Screen) {
    const map: Record<Screen, Screen> = {
      home: 'home',
      catalog: 'home',
      detail: 'catalog',
      cart: 'catalog',
      checkout: 'cart',
      payment: 'checkout',
      confirmation: 'home',
    }
    setScreen(map[s])
    scrollTop()
  }
}

function screenTitle(s: Screen) {
  const map: Record<Screen, string> = {
    home: 'Granja Shalom',
    catalog: 'Nuestras cajas',
    detail: 'Detalle',
    cart: 'Tu carrito',
    checkout: 'Datos de entrega',
    payment: 'Pago',
    confirmation: 'Pedido confirmado',
  }
  return map[s]
}

function CheckoutStepper({ current }: { current: number }) {
  const steps = ['Datos', 'Entrega', 'Pago']
  return (
    <div className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex flex-1 items-center gap-1.5 last:flex-none">
            <div className="flex items-center gap-1.5">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  done
                    ? 'bg-shalom-leaf text-white'
                    : active
                      ? 'bg-shalom-clay text-white ring-4 ring-shalom-clay-soft'
                      : 'bg-shalom-mist text-shalom-ink/40'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className={`text-xs font-semibold transition-colors ${
                  active
                    ? 'text-shalom-clay'
                    : done
                      ? 'text-shalom-forest'
                      : 'text-shalom-ink/40'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  done ? 'bg-shalom-leaf' : 'bg-shalom-mist'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* -------------------------------- screens --------------------------------- */

function HomeScreen({
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

function CatalogScreen({
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

function DetailScreen({
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

function QtyBtn({
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

function CartScreen({
  lines,
  subtotal,
  setQty,
  onShop,
  onContinue,
}: {
  lines: { box: Box; qty: number }[]
  subtotal: number
  setQty: (id: string, qty: number) => void
  onShop: () => void
  onContinue: () => void
}) {
  if (lines.length === 0)
    return (
      <div className="animate-rise flex h-full flex-col items-center justify-center px-8 text-center">
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
    <div className="animate-rise pb-60">
      <div className="space-y-3 px-4 py-5">
        {lines.map(({ box, qty }) => (
          <div
            key={box.id}
            className="flex gap-3 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5"
          >
            <img
              src={box.image}
              alt={box.name}
              className="h-20 w-20 shrink-0 rounded-2xl bg-shalom-mist object-cover"
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

      <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-black/5 bg-shalom-cream/95 p-4 backdrop-blur-md">
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

function CheckoutScreen({
  customer,
  setCustomer,
  fulfillment,
  setFulfillment,
  zone,
  setZone,
  subtotal,
  shipping,
  total,
  onContinue,
}: {
  customer: { name: string; phone: string; email: string }
  setCustomer: (c: { name: string; phone: string; email: string }) => void
  fulfillment: 'pickup' | 'delivery'
  setFulfillment: (f: 'pickup' | 'delivery') => void
  zone: string
  setZone: (z: string) => void
  subtotal: number
  shipping: number
  total: number
  onContinue: () => void
}) {
  const valid =
    customer.name.trim() && customer.phone.trim() && customer.email.trim()

  return (
    <div className="animate-rise space-y-6 px-4 py-5 pb-40">
      <CheckoutStepper current={valid ? 1 : 0} />

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-shalom-forest">
          Tus datos
        </h2>
        <Field
          label="Nombre y apellido"
          placeholder="Ej.: Malena Ferreyra"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <div>
          <Field
            label="Teléfono / WhatsApp"
            placeholder="Ej.: 291 512-3456"
            inputMode="tel"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-shalom-ink/55">
            <WhatsAppIcon className="h-3.5 w-3.5 text-[#25d366]" />
            Lo usamos para enviarte novedades de tu pedido por WhatsApp.
          </p>
        </div>
        <Field
          label="Email"
          placeholder="Ej.: malena@correo.com"
          inputMode="email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-shalom-forest">
          Entrega
        </h2>
        <button
          onClick={() => setFulfillment('pickup')}
          className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
            fulfillment === 'pickup'
              ? 'border-shalom-leaf bg-white shadow-md'
              : 'border-transparent bg-white/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-shalom-forest">
              🏡 Retiro en la granja
            </span>
            <span className="text-sm font-bold text-shalom-leaf">Sin cargo</span>
          </div>
          <p className="mt-1 text-sm text-shalom-ink/65">
            Charcas 1769 · Martes y viernes de 9 a 18 h
          </p>
        </button>

        <button
          onClick={() => setFulfillment('delivery')}
          className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
            fulfillment === 'delivery'
              ? 'border-shalom-leaf bg-white shadow-md'
              : 'border-transparent bg-white/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-shalom-forest">
              🚲 Envío a domicilio
            </span>
            <span className="text-sm font-bold text-shalom-clay">Según zona</span>
          </div>
          <p className="mt-1 text-sm text-shalom-ink/65">
            Entregas dentro de Bahía Blanca
          </p>
        </button>

        {fulfillment === 'delivery' && (
          <div className="animate-rise grid grid-cols-2 gap-2">
            {DELIVERY_ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setZone(z.id)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                  zone === z.id
                    ? 'border-shalom-leaf bg-shalom-mist font-semibold text-shalom-forest'
                    : 'border-black/10 bg-white text-shalom-ink/70'
                }`}
              >
                <div>{z.label}</div>
                <div className="text-xs text-shalom-ink/50">
                  {z.cost === 0 ? 'Sin cargo' : ars(z.cost)}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <Row label="Subtotal" value={ars(subtotal)} />
        <Row
          label="Envío"
          value={shipping === 0 ? 'Sin cargo' : ars(shipping)}
        />
        <div className="my-2 border-t border-dashed border-black/10" />
        <Row label="Total" value={ars(total)} strong />
      </section>

      <div className="absolute inset-x-0 bottom-0 border-t border-black/5 bg-shalom-cream/95 p-4 backdrop-blur-md">
        <PrimaryButton onClick={onContinue} disabled={!valid}>
          {valid ? 'Ir a pagar' : 'Completá tus datos'}
        </PrimaryButton>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span
        className={
          strong
            ? 'font-display font-bold text-shalom-forest'
            : 'text-sm text-shalom-ink/70'
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? 'font-display text-xl font-extrabold text-shalom-leaf'
            : 'font-medium text-shalom-ink'
        }
      >
        {value}
      </span>
    </div>
  )
}

function PaymentScreen({
  payment,
  setPayment,
  total,
  receipt,
  setReceipt,
  onPay,
}: {
  payment: 'mp' | 'transfer'
  setPayment: (p: 'mp' | 'transfer') => void
  total: number
  receipt: string | null
  setReceipt: (r: string | null) => void
  onPay: () => void
}) {
  const [mpState, setMpState] = useState<'idle' | 'redirecting' | 'success'>(
    'idle',
  )
  const [copied, setCopied] = useState(false)
  const [dragging, setDragging] = useState(false)

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText('granja.shalom.bb')
    } catch {
      /* clipboard puede no estar disponible en el preview */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const takeFile = (file?: File) => {
    if (!file) return
    setReceipt(file.name)
  }

  const startMp = () => {
    setMpState('redirecting')
    window.setTimeout(() => setMpState('success'), 1900)
    window.setTimeout(() => onPay(), 3100)
  }

  if (mpState !== 'idle') {
    return (
      <div className="animate-rise flex h-full flex-col items-center justify-center px-8 text-center">
        {mpState === 'redirecting' ? (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#009ee3] text-2xl text-white shadow-lg">
              💳
            </div>
            <div className="mt-6 h-8 w-8 animate-spin rounded-full border-[3px] border-shalom-mist border-t-shalom-leaf" />
            <h2 className="mt-5 font-display text-lg font-bold text-shalom-forest">
              Redirigiendo a Mercado Pago…
            </h2>
            <p className="mt-1 text-sm text-shalom-ink/60">
              No cierres esta ventana, estamos procesando el pago.
            </p>
          </>
        ) : (
          <>
            <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-shalom-lime text-4xl">
              ✓
            </div>
            <h2 className="mt-5 font-display text-xl font-extrabold text-shalom-forest">
              ¡Pago aprobado!
            </h2>
            <p className="mt-1 text-sm text-shalom-ink/60">
              Estamos generando tu pedido…
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="animate-rise space-y-5 px-4 py-5 pb-40">
      <CheckoutStepper current={2} />

      <div className="rounded-2xl bg-shalom-forest p-4 text-white">
        <span className="text-sm text-white/70">Total a pagar</span>
        <div className="font-display text-3xl font-extrabold">{ars(total)}</div>
      </div>

      <h2 className="font-display text-lg font-bold text-shalom-forest">
        ¿Cómo querés pagar?
      </h2>

      <button
        onClick={() => setPayment('mp')}
        className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
          payment === 'mp'
            ? 'border-shalom-leaf bg-white shadow-md'
            : 'border-transparent bg-white/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#009ee3] text-lg">
            💳
          </span>
          <div>
            <div className="font-display font-bold text-shalom-forest">
              Mercado Pago
            </div>
            <div className="text-sm text-shalom-ink/60">
              Tarjeta, dinero en cuenta o QR
            </div>
          </div>
        </div>
      </button>

      <button
        onClick={() => setPayment('transfer')}
        className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
          payment === 'transfer'
            ? 'border-shalom-leaf bg-white shadow-md'
            : 'border-transparent bg-white/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-shalom-mist text-lg">
            🏦
          </span>
          <div>
            <div className="font-display font-bold text-shalom-forest">
              Transferencia bancaria
            </div>
            <div className="text-sm text-shalom-ink/60">
              Con alias y comprobante
            </div>
          </div>
        </div>
      </button>

      {payment === 'transfer' && (
        <div className="animate-rise space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-shalom-ink/50">
              Alias
            </span>
            <button
              onClick={copyAlias}
              className="mt-1 flex w-full items-center justify-between rounded-xl bg-shalom-mist px-3 py-2.5 transition-colors hover:bg-shalom-lime/40"
            >
              <span className="font-display font-bold text-shalom-forest">
                granja.shalom.bb
              </span>
              <span className="text-xs font-semibold text-shalom-leaf">
                {copied ? '✓ Copiado' : 'Copiar'}
              </span>
            </button>
          </div>
          <p className="text-xs text-shalom-ink/60">
            Titular: Cooperativa Granja Shalom · CBU 000000000000000000000
          </p>
          <label
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              takeFile(e.dataTransfer.files?.[0])
            }}
            className={`block cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
              dragging
                ? 'border-shalom-leaf bg-shalom-lime/20'
                : receipt
                  ? 'border-shalom-leaf/60 bg-shalom-mist/60'
                  : 'border-shalom-leaf/40 bg-shalom-mist/50 hover:bg-shalom-mist'
            }`}
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => takeFile(e.target.files?.[0])}
            />
            <div className="text-2xl">{receipt ? '✅' : '📎'}</div>
            <div className="mt-1 text-sm font-semibold text-shalom-forest">
              {receipt ? receipt : 'Arrastrá tu comprobante acá'}
            </div>
            <div className="text-xs text-shalom-ink/50">
              {receipt
                ? 'Tocá para cambiar el archivo'
                : 'o tocá para elegir · JPG, PNG o PDF (hasta 5 MB)'}
            </div>
          </label>
          <p className="rounded-xl bg-shalom-clay-soft/60 px-3 py-2.5 text-xs leading-relaxed text-shalom-clay">
            ⓘ Verificaremos tu comprobante en las próximas horas.
          </p>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 border-t border-black/5 bg-shalom-cream/95 p-4 backdrop-blur-md">
        <PrimaryButton
          onClick={payment === 'mp' ? startMp : onPay}
          disabled={payment === 'transfer' && !receipt}
        >
          {payment === 'mp'
            ? 'Pagar con Mercado Pago'
            : receipt
              ? 'Confirmar pedido'
              : 'Subí tu comprobante para continuar'}
        </PrimaryButton>
      </div>
    </div>
  )
}

function ConfirmationScreen({
  orderId,
  lines,
  total,
  payment,
  fulfillment,
  zone,
  customer,
  onHome,
}: {
  orderId: string
  lines: { box: Box; qty: number }[]
  total: number
  payment: 'mp' | 'transfer'
  fulfillment: 'pickup' | 'delivery'
  zone: string
  customer: { name: string; phone: string; email: string }
  onHome: () => void
}) {
  const zoneLabel = DELIVERY_ZONES.find((z) => z.id === zone)?.label
  return (
    <div className="animate-rise px-4 py-8 pb-10">
      <div className="flex flex-col items-center text-center">
        <div className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-shalom-lime text-4xl">
          🌱
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-shalom-forest">
          ¡Gracias{customer.name ? `, ${customer.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="mt-1 text-sm text-shalom-ink/65">
          Recibimos tu pedido. Te escribimos al WhatsApp para coordinar.
        </p>
        <div className="mt-4 rounded-full bg-white px-5 py-2 font-display font-bold text-shalom-forest shadow-sm ring-1 ring-black/5">
          Pedido {orderId}
        </div>
        {payment === 'mp' ? (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-shalom-lime/40 px-3 py-1.5 text-sm font-semibold text-shalom-forest">
            ● Pago aprobado
          </span>
        ) : (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-shalom-clay-soft px-3 py-1.5 text-sm font-semibold text-shalom-clay">
            ● Pago pendiente
          </span>
        )}
      </div>

      <div className="mt-7 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <h2 className="font-display font-bold text-shalom-forest">Resumen</h2>
        <div className="mt-3 space-y-2">
          {lines.map(({ box, qty }) => (
            <div
              key={box.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-shalom-ink/80">
                {qty}× {box.name}
              </span>
              <span className="font-semibold text-shalom-ink">
                {ars(box.price * qty)}
              </span>
            </div>
          ))}
        </div>
        <div className="my-3 border-t border-dashed border-black/10" />
        <Row label="Total" value={ars(total)} strong />
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl border-2 border-[#25d366] px-4 py-3 font-display text-sm font-bold text-[#1eb457] transition-colors hover:bg-[#25d366]/10"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar por WhatsApp
        </a>
      </div>

      <div className="mt-4 space-y-2 rounded-3xl bg-shalom-forest p-5 text-sm text-white/85">
        <div className="flex justify-between">
          <span className="text-white/60">Entrega</span>
          <span className="text-right font-semibold text-white">
            {fulfillment === 'pickup'
              ? 'Retiro · Charcas 1769'
              : `Envío · ${zoneLabel}`}
          </span>
        </div>
        {fulfillment === 'pickup' && (
          <div className="flex justify-between">
            <span className="text-white/60">Horario</span>
            <span className="font-semibold text-white">Mar y Vie, 9–18 h</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-white/60">Pago</span>
          <span className="font-semibold text-white">
            {payment === 'mp' ? 'Mercado Pago' : 'Transferencia'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-white/70 px-4 py-3 text-sm leading-relaxed text-shalom-ink/75 ring-1 ring-black/5">
        <span className="text-lg">🤝</span>
        <span>
          {payment === 'mp'
            ? 'Ya coordinamos todo. Te avisaremos por WhatsApp cuando tu caja esté lista.'
            : 'Te avisaremos por WhatsApp apenas confirmemos tu pago. ¡Gracias por elegir producción local!'}
        </span>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={onHome}>Volver al inicio</PrimaryButton>
      </div>
    </div>
  )
}
