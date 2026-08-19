import type { ConfirmedOrder, Customer, Fulfillment, PaymentMethod } from '../types'
import { supabase } from './supabase'

export async function createOrder(
  orderId: string,
  customer: Customer,
  fulfillment: Fulfillment,
  zone: string,
  payment: PaymentMethod,
  subtotal: number,
  shipping: number,
  total: number,
  lines: ConfirmedOrder['lines']
) {
  // 1. Crear el pedido principal
  const { error: orderError } = await supabase.from('orders').insert([
    {
      id: orderId,
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email,
      fulfillment,
      zone,
      payment,
      subtotal,
      shipping,
      total,
      status: 'pending',
    },
  ])

  if (orderError) {
    throw new Error(`Error al crear pedido: ${orderError.message}`)
  }

  // 2. Crear los items del pedido
  const items = lines.map((line) => ({
    order_id: orderId,
    box_id: line.box.id,
    box_name: line.box.name,
    qty: line.qty,
    price: line.box.price,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(items)

  if (itemsError) {
    throw new Error(`Error al crear items del pedido: ${itemsError.message}`)
  }

  return true
}
