import CheckoutStepper from '../components/CheckoutStepper'
import Field from '../components/Field'
import PrimaryButton from '../components/PrimaryButton'
import Row from '../components/Row'
import { WhatsAppIcon } from '../components/WhatsApp'
import { DELIVERY_ZONES } from '../data/deliveryZones'
import type { Customer, Fulfillment } from '../types'
import { formatCurrency as ars } from '../utils/currency'

export default function CheckoutScreen({
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
  customer: Customer
  setCustomer: (c: Customer) => void
  fulfillment: Fulfillment
  setFulfillment: (f: Fulfillment) => void
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

