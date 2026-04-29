import { createContext } from 'react'
import type { Product, ProductSize } from '../data/products'
import { products as allProducts } from '../data/products'

export type CartItem = {
  key: string // productId + size
  productId: Product['id']
  size: ProductSize
  quantity: number
}

export type CartContextValue = {
  items: CartItem[]
  addItem: (productId: Product['id'], size: ProductSize) => void
  removeItem: (key: string) => void
  incItem: (key: string) => void
  decItem: (key: string) => void
  clear: () => void
  total: number
  getProductById: (id: Product['id']) => Product | undefined
}

type CartState = {
  items: Record<string, CartItem>
}

type CartAction =
  | {
      type: 'ADD'
      payload: { productId: Product['id']; size: ProductSize; quantity?: number }
    }
  | {
      type: 'REMOVE'
      payload: { key: string }
    }
  | { type: 'INC'; payload: { key: string } }
  | { type: 'DEC'; payload: { key: string } }
  | { type: 'CLEAR' }

const initialState: CartState = { items: {} }

export function makeCartKey(productId: Product['id'], size: ProductSize) {
  return `${productId}__${size}`
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const { productId, size, quantity = 1 } = action.payload
      const key = makeCartKey(productId, size)

      const existing = state.items[key]
      const nextQty = (existing?.quantity ?? 0) + quantity

      return {
        items: {
          ...state.items,
          [key]: {
            key,
            productId,
            size,
            quantity: nextQty,
          },
        },
      }
    }
    case 'REMOVE': {
      const { key } = action.payload
      if (!state.items[key]) return state
      const nextItems = { ...state.items }
      delete nextItems[key]
      return { items: nextItems }
    }
    case 'INC': {
      const { key } = action.payload
      const item = state.items[key]
      if (!item) return state
      return { items: { ...state.items, [key]: { ...item, quantity: item.quantity + 1 } } }
    }
    case 'DEC': {
      const { key } = action.payload
      const item = state.items[key]
      if (!item) return state

      const nextQty = item.quantity - 1
      if (nextQty <= 0) {
        const nextItems = { ...state.items }
        delete nextItems[key]
        return { items: nextItems }
      }

      return { items: { ...state.items, [key]: { ...item, quantity: nextQty } } }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const CartContext = createContext<CartContextValue | null>(null)

export function getProductById(id: Product['id']) {
  return allProducts.find((p) => p.id === id)
}

export { initialState }

