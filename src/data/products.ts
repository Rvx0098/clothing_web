import musicTee from '../assets/products/music_new.png'
import crocTee from '../assets/products/croc_new.png'
import charmTee from '../assets/products/charm_new.png'
import anxietyTee from '../assets/products/anxiety_new.png'
import stoicTee from '../assets/products/stoic_new.png'

export type ProductSize = 'S' | 'M' | 'L' | 'XL'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  imageAlt: string
  imageHover?: string
  sizes: ProductSize[]
}

const sizes: ProductSize[] = ['S', 'M', 'L', 'XL']

export const products: Product[] = [
  {
    id: 'grx-music-tee',
    name: 'GRX Music Tee',
    price: 59.99,
    image: musicTee,
    imageAlt: 'GRX Music Tee',
    imageHover: musicTee,
    sizes,
  },
  {
    id: 'grx-croc-tee',
    name: 'GRX Croc Tee',
    price: 62.0,
    image: crocTee,
    imageAlt: 'GRX Croc Tee',
    imageHover: crocTee,
    sizes,
  },
  {
    id: 'grx-charm-tee',
    name: 'GRX Charm Tee',
    price: 57.5,
    image: charmTee,
    imageAlt: 'GRX Charm Tee',
    imageHover: charmTee,
    sizes,
  },
  {
    id: 'grx-anxiety-tee',
    name: 'GRX Anxiety Tee',
    price: 61.0,
    image: anxietyTee,
    imageAlt: 'GRX Anxiety Tee',
    imageHover: anxietyTee,
    sizes,
  },
  {
    id: 'grx-stoic-tee',
    name: 'GRX Stoic Tee',
    price: 64.99,
    image: stoicTee,
    imageAlt: 'GRX Stoic Tee',
    imageHover: stoicTee,
    sizes,
  },
]

