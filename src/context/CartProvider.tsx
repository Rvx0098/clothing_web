import { useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { CartContext, cartReducer, getProductById, initialState, type CartContextValue } from './cart'
import type { Product, ProductSize } from '../data/products'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const items = useMemo(() => Object.values(state.items), [state.items])

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = getProductById(item.productId)
      if (!product) return sum
      return sum + product.price * item.quantity
    }, 0)
  }, [items])

  const value: CartContextValue = {
    items,
    addItem: (productId: Product['id'], size: ProductSize) =>
      dispatch({ type: 'ADD', payload: { productId, size, quantity: 1 } }),
    removeItem: (key: string) => dispatch({ type: 'REMOVE', payload: { key } }),
    incItem: (key: string) => dispatch({ type: 'INC', payload: { key } }),
    decItem: (key: string) => dispatch({ type: 'DEC', payload: { key } }),
    clear: () => dispatch({ type: 'CLEAR' }),
    total,
    getProductById,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

