import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  return (
    <div className="min-h-screen">
      <motion.section
        className="mx-auto w-full max-w-6xl px-5 pt-28 pb-14"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Shop
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Choose your size. Add to cart. Keep it moving. No clutter, just clean essentials.
            </p>
          </div>
          <div className="text-xs text-white/50">Hover to preview the weave.</div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>
    </div>
  )
}

