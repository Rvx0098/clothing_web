import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)

  const src = useMemo(() => {
    if (!hovered) return product.image
    return product.imageHover ?? product.image
  }, [hovered, product.image, product.imageHover])

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-1"
    >
      <Link
        to={`/product/${encodeURIComponent(product.id)}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-0"
      >
        <div className="aspect-[4/5] w-full overflow-hidden bg-black">
          <motion.img
            src={src}
            alt={product.imageAlt}
            className="h-full w-full object-cover transition duration-500 will-change-transform"
            animate={{ opacity: hovered ? 1 : 1 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0 opacity-90 transition duration-300 group-hover:opacity-70" />
        </div>

        <div className="flex items-start justify-between gap-6 p-5">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold tracking-wide text-white/90">
              {product.name}
            </h3>
            <p className="mt-2 text-xs text-white/60">Sizes S–XL</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold text-white/90">${product.price.toFixed(2)}</div>
            <div className="mt-2 hidden text-xs text-white/60 sm:block">View</div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

