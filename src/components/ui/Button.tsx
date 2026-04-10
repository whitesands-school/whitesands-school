'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-bold text-white',
  secondary: 'bg-deep text-white',
  outline:   'border-2 border-deep text-deep bg-transparent',
  ghost:     'bg-transparent text-deep',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' as const }}
      className={[
        'inline-flex items-center justify-center gap-2 font-roboto font-medium rounded cursor-pointer',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </motion.button>
  );
}
