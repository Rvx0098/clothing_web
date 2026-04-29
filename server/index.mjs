import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// In-memory demo users (email + password in plaintext for simplicity only)
const users = new Map()

// Simple products API mirroring frontend data
const products = [
  {
    id: 'griitx-signature-tee',
    name: 'Griitx Signature Tee',
    price: 49.99,
  },
  {
    id: 'griitx-grit-texture-tee',
    name: 'Griitx Grit Texture Tee',
    price: 54.99,
  },
  {
    id: 'griitx-blackout-tee',
    name: 'Griitx Blackout Tee',
    price: 44.99,
  },
  {
    id: 'griitx-urban-stitch-tee',
    name: 'Griitx Urban Stitch Tee',
    price: 52.0,
  },
  {
    id: 'griitx-nightshift-tee',
    name: 'Griitx Nightshift Tee',
    price: 58.5,
  },
]

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/products', (_req, res) => {
  res.json({ products })
})

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }
  if (users.has(email)) {
    return res.status(409).json({ error: 'User already exists.' })
  }
  users.set(email, { email, password })
  return res.json({ token: 'demo-token', email })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }
  const user = users.get(email)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }
  return res.json({ token: 'demo-token', email })
})

app.listen(port, () => {
  console.log(`Griitx backend running on http://localhost:${port}`)
})

