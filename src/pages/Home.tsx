import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import brandLogo from '../assets/brand/logo.png'
import heroImage from '../assets/brand/hero_new.png'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <motion.section
        className="relative flex min-h-[100svh] items-end justify-center overflow-hidden border-b border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <div className="relative w-full max-w-6xl px-5 pb-16 sm:pb-20">
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
              Premium street basics
              <span className="h-1 w-1 rounded-full bg-accent-300" aria-hidden="true" />
            </div>

            <img src={brandLogo} alt="Griitx logo" className="mt-6 h-12 w-auto opacity-95 sm:h-14" />

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Built from Grit.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Quiet design. Heavywear comfort. Five tees, one mindset.
            </p>

            <div className="mt-8">
              <Button onClick={() => navigate('/shop')}>Shop Now</Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-white/90">Featured Tees</h2>
            <p className="mt-2 text-sm text-white/60">
              Minimal fits. Subtle details. Built to move.
            </p>
          </div>

          <div className="text-xs text-white/50">All five styles below.</div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

