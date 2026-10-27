'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  border?: boolean;
  className?: string;
}

const roundedStyles = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

const elevationStyles = {
  none: '',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export function Card({
  children,
  interactive = false,
  rounded = '2xl',
  elevation = 'xs',
  border = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-[#1c1c21] overflow-hidden transition-all duration-200 ${
        roundedStyles[rounded]
      } ${elevationStyles[elevation]} ${
        border ? 'border border-neutral-200/80 dark:border-neutral-800' : ''
      } ${
        interactive
          ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 group'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
