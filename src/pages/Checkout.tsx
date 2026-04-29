import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useCart } from '../context/useCart'

export default function CheckoutPage() {
  const { items, getProductById, total } = useCart()

  const summaryRows = useMemo(
    () =>
      items.map((item) => {
        const product = getProductById(item.productId)
        if (!product) return null
        return {
          key: item.key,
          name: product.name,
          size: item.size,
          qty: item.quantity,
          lineTotal: product.price * item.quantity,
        }
      }),
    [items, getProductById],
  ).filter(Boolean) as { key: string; name: string; size: string; qty: number; lineTotal: number }[]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.1),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_60%)]">
      <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] lg:items-start">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6 rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Checkout</div>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Order details
              </h1>
              <p className="mt-2 text-xs text-white/60 sm:text-sm">
                We keep it lightweight. Just confirm where this grit is headed.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <label className="text-xs font-medium text-white/70">Full name</label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="Jai from Griitx"
                />
              </div>
              <div className="space-y-2 text-sm">
                <label className="text-xs font-medium text-white/70">Email</label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="you@griitx.com"
                />
              </div>
              <div className="space-y-2 text-sm md:col-span-2">
                <label className="text-xs font-medium text-white/70">Shipping address</label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="Street, city, country"
                />
              </div>
              <div className="space-y-2 text-sm">
                <label className="text-xs font-medium text-white/70">City</label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="Delhi"
                />
              </div>
              <div className="space-y-2 text-sm">
                <label className="text-xs font-medium text-white/70">Postal code</label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="000000"
                />
              </div>
            </div>

            <div className="pt-3 text-[10px] text-white/45">
              This is a visual checkout only. No real payment will be processed.
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative rounded-3xl border border-white/10 bg-black/80 p-6 shadow-2xl shadow-black/70 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Order summary
                </div>
                <div className="mt-2 text-sm text-white/70">{summaryRows.length} item(s)</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {summaryRows.length === 0 ? (
                <div className="text-xs text-white/60">
                  Your cart is empty. Add a tee and come back to lock the look.
                </div>
              ) : (
                summaryRows.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/80"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">{row.name}</div>
                      <div className="mt-1 text-[11px] text-white/60">
                        Size {row.size} · Qty {row.qty}
                      </div>
                    </div>
                    <div className="shrink-0 text-right font-semibold">
                      ${row.lineTotal.toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-2 text-xs text-white/60">
              <div className="flex items-center justify-between gap-4">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Shipping</span>
                <span className="text-white/50">Calculated at dispatch</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white">
              <span>Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black shadow-glow transition hover:bg-white/90"
            >
              Place order (demo)
            </button>

            <div className="mt-3 text-[10px] text-white/45">
              For a production build you’d connect this step to your payment provider.
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}

