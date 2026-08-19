export const formatCurrency = (n: number) =>
  '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 0 })

