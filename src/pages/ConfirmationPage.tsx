import PrimaryButton from '../components/PrimaryButton'
import Row from '../components/Row'
import { WhatsAppIcon } from '../components/WhatsApp'
import { WA_LINK } from '../data/contact'
import { DELIVERY_ZONES } from '../data/deliveryZones'
import type { Customer, Fulfillment, OrderLine, PaymentMethod } from '../types'
import { formatCurrency as ars } from '../utils/currency'

export default function ConfirmationScreen({
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
  lines: OrderLine[]
  total: number
  payment: PaymentMethod
  fulfillment: Fulfillment
  zone: string
  customer: Customer
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

