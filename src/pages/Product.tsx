import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products, type Product, type ProductSize } from '../data/products'
import { useCart } from '../context/useCart'
import Button from '../components/Button'

export default function ProductPage() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<ProductSize>('S')

  const product: Product | undefined = useMemo(() => {
    if (!productId) return undefined
    const decoded = decodeURIComponent(productId)
    return products.find((p) => p.id === decoded)
  }, [productId])

  const sizes = product?.sizes ?? []

  return (
    <div className="min-h-screen">
      <motion.section
        className="mx-auto w-full max-w-6xl px-5 pt-28 pb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {!product ? (
          <div className="mt-10 text-center">
            <div className="text-sm font-semibold text-white/90">Product not found.</div>
            <div className="mt-2 text-xs text-white/60">Return to the shop and try another tee.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div className="rounded-3xl border border-white/10 bg-surface-1 p-4">
              <div className="overflow-hidden rounded-2xl bg-black">
                <motion.img
                  key={product.image}
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
                Griitx Essentials
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 text-xl font-semibold text-white/90">${product.price.toFixed(2)}</div>

              <div className="mt-8">
                <div className="text-sm font-semibold tracking-wide text-white/90">Select size</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {sizes.map((size) => {
                    const active = size === selectedSize
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 ${
                          active
                            ? 'border-accent-300 bg-accent-300/15 text-white'
                            : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={() => {
                    addItem(product.id, selectedSize)
                    window.dispatchEvent(new CustomEvent('cart:open'))
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    // Keep it simple: size selection is local; users can add again anytime.
                    setSelectedSize(product.sizes[0] ?? 'S')
                  }}
                >
                  Reset size
                </Button>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-sm font-semibold text-white/90">Fit notes</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Clean silhouette with comfortable drape. Built for everyday grit.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  )
}

