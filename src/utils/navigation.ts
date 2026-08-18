import type { Screen } from '../types'

export const screenTitle = (s: Screen) => ({ home: 'Granja Shalom', catalog: 'Nuestras cajas', detail: 'Detalle', cart: 'Tu carrito', checkout: 'Datos de entrega', payment: 'Pago', confirmation: 'Pedido confirmado' })[s]

export const previousScreen = (s: Screen): Screen => ({ home: 'home', catalog: 'home', detail: 'catalog', cart: 'catalog', checkout: 'cart', payment: 'checkout', confirmation: 'home' })[s] as Screen

