import { motion } from 'framer-motion'
import { useState } from 'react'

type Mode = 'login' | 'signup'

async function authRequest(mode: Mode, email: string, password: string) {
  const res = await fetch(`/api/auth/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error ?? 'Something went wrong')
  }
  return json as { token: string; email: string }
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const title = mode === 'login' ? 'Welcome back' : 'Create your account'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(55,65,81,0.55),_transparent_55%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-5 pt-24 pb-16">
        <motion.div
          className="relative w-full max-w-xl"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="rounded-3xl border border-white/10 bg-black/70 px-8 py-10 shadow-2xl shadow-black/60 backdrop-blur-xl"
            initial={{ rotateX: 8, rotateY: -8, opacity: 0.9 }}
            animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">Griitx</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-2 text-xs text-white/60 sm:text-sm">
                  {mode === 'login'
                    ? 'Sign in to access your saved fits and faster checkout.'
                    : 'Sign up to keep your Griitx essentials in sync.'}
                </p>
              </div>

              <div className="hidden text-right text-xs text-white/50 sm:block">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Mode
                </div>
                <div className="mt-1 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                  <button
                    type="button"
                    className={`mr-1 text-[11px] ${mode === 'login' ? 'text-white' : 'text-white/50'}`}
                    onClick={() => {
                      setMode('login')
                      setError(null)
                      setSuccess(null)
                    }}
                  >
                    Login
                  </button>
                  <span className="mx-1 text-white/30">/</span>
                  <button
                    type="button"
                    className={`ml-1 text-[11px] ${mode === 'signup' ? 'text-white' : 'text-white/50'}`}
                    onClick={() => {
                      setMode('signup')
                      setError(null)
                      setSuccess(null)
                    }}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                setSuccess(null)
                setLoading(true)
                try {
                  const result = await authRequest(mode, email, password)
                  localStorage.setItem('griitxToken', result.token)
                  localStorage.setItem('griitxEmail', result.email)
                  setSuccess(mode === 'login' ? 'Logged in.' : 'Account created.')
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Something went wrong')
                } finally {
                  setLoading(false)
                }
              }}
            >
              <div className="space-y-2 text-sm">
                <label htmlFor="email" className="text-xs font-medium text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="you@griitx.com"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label htmlFor="password" className="text-xs font-medium text-white/70">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-300"
                  placeholder="Minimum 6 characters"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black shadow-glow transition hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/60"
              >
                {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 text-center text-[10px] text-white/40">
              This is a demo auth flow using an in-memory backend. Do not use real credentials.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

