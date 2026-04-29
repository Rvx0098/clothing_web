import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useCart } from '../context/useCart'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const { items, total, getProductById, incItem, decItem, removeItem } = useCart()

  const itemCount = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <div className="text-sm font-semibold tracking-wide text-white/90">Cart</div>
                <div className="text-xs text-white/60">{itemCount} item{itemCount === 1 ? '' : 's'}</div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                aria-label="Close cart"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="mt-10 text-center">
                  <div className="text-sm font-semibold text-white/90">Your cart is empty.</div>
                  <div className="mt-2 text-xs text-white/60">Add a tee and get moving.</div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId)
                    if (!product) return null

                    return (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-surface-1 p-3"
                      >
                        <div className="h-20 w-16 overflow-hidden rounded-xl bg-black">
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-xs font-semibold text-white/90">{product.name}</div>
                              <div className="mt-1 text-[11px] text-white/60">Size {item.size}</div>
                            </div>
                            <div className="shrink-0 text-xs font-semibold text-white/90">
                              ${(product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-2 py-1">
                              <button
                                type="button"
                                onClick={() => decItem(item.key)}
                                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <div className="w-8 text-center text-xs font-semibold text-white/90">
                                {item.quantity}
                              </div>
                              <button
                                type="button"
                                onClick={() => incItem(item.key)}
                                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="text-xs text-white/60 transition hover:text-white/90"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-white/90">Total</div>
                <div className="text-sm font-semibold text-white/90">${total.toFixed(2)}</div>
              </div>
              <div className="mt-3 text-xs text-white/60">
                Checkout is not enabled (static demo).
              </div>

              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      onClose()
                      navigate('/checkout')
                    }}
                  >
                    Go to Checkout
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

