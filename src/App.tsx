import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartProvider'
import Home from './pages/Home'
import ProductPage from './pages/Product'
import Shop from './pages/Shop'
import AuthPage from './pages/Auth'
import CheckoutPage from './pages/Checkout'

function AnimatedRouteContainer() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<div className="py-24 text-center text-sm text-white/70">Page not found.</div>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const onOpenCart = () => setCartOpen(true)
    window.addEventListener('cart:open', onOpenCart as EventListener)
    return () => window.removeEventListener('cart:open', onOpenCart as EventListener)
  }, [])

  // Optional: close drawer when navigating pages
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <main className="pt-24">
          <AnimatedRouteContainer />
          <Footer />
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}
