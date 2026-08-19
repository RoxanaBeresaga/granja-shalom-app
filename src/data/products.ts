import type { Box } from '../types'

export const BOXES: Box[] = [
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

export const HERO =
  'https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=1200&h=1400&fit=crop&auto=format'

