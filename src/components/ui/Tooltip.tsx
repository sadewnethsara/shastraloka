'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
  text?: string;
  content?: React.ReactNode;
  children: React.ReactNode;
  idealDirection?: 'up' | 'down' | 'left' | 'right';
  inline?: boolean;
  className?: string;
}

export function Tooltip({
  text,
  content,
  children,
  idealDirection = 'down',
  inline = true,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const label = content || text;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!label) {
    return <>{children}</>;
  }

  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), 90);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const positionClasses = {
    up: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    down: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[idealDirection];

  const arrowClasses = {
    up: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-[#1c1c21] dark:border-t-[#f4f4f5] border-x-transparent border-b-transparent border-4',
    down: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-[#1c1c21] dark:border-b-[#f4f4f5] border-x-transparent border-t-transparent border-4',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-[#1c1c21] dark:border-l-[#f4f4f5] border-y-transparent border-r-transparent border-4',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-[#1c1c21] dark:border-r-[#f4f4f5] border-y-transparent border-l-transparent border-4',
  }[idealDirection];

  return (
    <span
      className={`relative ${inline ? 'inline-flex' : 'flex'} items-center ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-[110] ${positionClasses} px-2.5 py-1.5 rounded-lg bg-[#1c1c21] dark:bg-[#f4f4f5] text-white dark:text-[#111111] text-[11px] font-semibold leading-tight whitespace-nowrap shadow-lg transition-all duration-150 animate-fade-in`}
        >
          {label}
          <span className={`absolute w-0 h-0 ${arrowClasses}`} />
        </span>
      )}
    </span>
  );
}

export default Tooltip;
