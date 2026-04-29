import { motion, type MotionProps } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>

type ButtonProps = NativeButtonProps & {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  motionProps?: MotionProps
}

export default function Button({
  children,
  variant = 'primary',
  className,
  motionProps,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-0'

  const styles =
    variant === 'ghost'
      ? 'bg-transparent text-white/90 hover:bg-white/5'
      : 'bg-white text-black shadow-glow hover:bg-white/90'

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${base} ${styles} ${className ?? ''}`}
      {...rest}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

