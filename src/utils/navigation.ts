import type { Screen } from '../types'

export const screenTitle = (s: Screen) => ({ home: 'Granja Shalom', catalog: 'Nuestras cajas', detail: 'Detalle', cart: 'Tu carrito', checkout: 'Datos de entrega', payment: 'Pago', confirmation: 'Pedido confirmado' })[s]

export const screenFromPath = (path: string): Screen => {
  if (path === '/') return 'home'
  if (path === '/productos') return 'catalog'
  if (path.startsWith('/productos/')) return 'detail'
  if (path === '/carrito') return 'cart'
  if (path === '/checkout') return 'checkout'
  if (path === '/checkout/pago') return 'payment'
  if (path.startsWith('/pedido/')) return 'confirmation'
  return 'home'
}

export const backPath = (screen: Screen) => ({
  home: '/',
  catalog: '/',
  detail: '/productos',
  cart: '/productos',
  checkout: '/carrito',
  payment: '/checkout',
  confirmation: '/',
})[screen]
