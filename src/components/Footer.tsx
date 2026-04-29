import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} <span className="text-white/80">GRIIITX</span>. Built from Grit.
        </div>
        <div className="text-sm text-white/60">
          <Link to="/shop" className="hover:text-white/90 transition">
            Shop the collection
          </Link>
        </div>
      </div>
    </footer>
  )
}

