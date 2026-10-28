import React from 'react';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: 'main' | 'div' | 'section' | 'article';
  className?: string;
}

/**
 * PageContainer — Universal responsive container wrapper for all Shastraloka pages.
 * Matches the landing page padding standard: max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full.
 * Updating this component updates page content width and horizontal padding app-wide.
 */
export function PageContainer({
  children,
  as: Component = 'div',
  className = '',
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default PageContainer;
