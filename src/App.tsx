import { useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import WhatsAppFab from './components/WhatsApp'
import { DELIVERY_ZONES } from './data/deliveryZones'
import { BOXES } from './data/products'
import CartScreen from './pages/CartPage'
import CatalogScreen from './pages/CatalogPage'
import CheckoutScreen from './pages/CheckoutPage'
import ConfirmationScreen from './pages/ConfirmationPage'
import HomeScreen from './pages/HomePage'
import PaymentScreen from './pages/PaymentPage'
import DetailScreen from './pages/ProductDetailPage'
import type { CartLine, ConfirmedOrder, Customer, Fulfillment, PaymentMethod, Screen } from './types'
import { previousScreen, screenTitle } from './utils/navigation'
export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedId, setSelectedId] = useState<string>('cosecha')
  const [cart, setCart] = useState<CartLine[]>([])
  const [detailQty, setDetailQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '', email: '' })
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [zone, setZone] = useState(DELIVERY_ZONES[0].id)
  const [payment, setPayment] = useState<PaymentMethod>('mp')
  const [receipt, setReceipt] = useState<string | null>(null)
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null)
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
    setScreen(previousScreen(s))
    scrollTop()
  }
}
