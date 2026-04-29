/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f3e8ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea',
          600: '#7e22ce',
        },
        surface: {
          0: '#000000',
          1: '#0b0b0f',
          2: '#111118',
          3: '#1a1a24',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(168, 85, 247, 0.25), 0 10px 25px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}

