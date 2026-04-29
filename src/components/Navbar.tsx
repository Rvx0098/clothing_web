import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/useCart'
import brandLogo from '../assets/brand/logo.png'

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const { items } = useCart()
  const count = items.reduce((sum, it) => sum + it.quantity, 0)

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 backdrop-blur bg-black/60 border-b border-white/10">
        <NavLink to="/" className="group inline-flex items-center gap-3">
          <img
            src={brandLogo}
            alt="Griitx logo"
            className="h-8 w-auto opacity-90 transition group-hover:opacity-100 sm:h-9"
          />
          <span className="hidden text-xs text-white/50 sm:inline">Streetwear essentials</span>
        </NavLink>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `transition ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `transition ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
            }
          >
            Login
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          aria-label="Open cart"
        >
          <span className="text-white/80">Cart</span>
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs text-white/90"
          >
            {count}
          </motion.span>
        </button>
      </div>
    </header>
  )
}

