import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  withArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  withArrow = false,
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-brand transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] disabled:border-[#CBD5E1] disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none group select-none active:scale-[0.98] active:translate-y-0 will-change-transform";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5 font-semibold",
    md: "text-sm px-5 py-2.5 gap-2 font-semibold",
    lg: "text-base px-7 py-3.5 gap-2.5 font-bold",
  };

  const variantStyles = {
    // Primary: #38BDF8, text #FFFFFF, border #38BDF8, hover #0EA5E9, hover text #FFFFFF
    primary: "bg-[#38BDF8] text-[#FFFFFF] border border-[#38BDF8] hover:bg-[#0EA5E9] hover:border-[#0EA5E9] hover:text-[#FFFFFF] shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5",
    
    // Secondary: #FFFFFF, text #0284C7, border #BAE6FD, hover bg #E0F2FE, hover text #0369A1
    secondary: "bg-[#FFFFFF] text-[#0284C7] border border-[#BAE6FD] hover:bg-[#E0F2FE] hover:text-[#0369A1] hover:border-[#38BDF8] shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5",
    
    // Outline: #FFFFFF, text #0284C7, border #D6EAF7, hover bg #F0F9FF, hover text #0369A1
    outline: "bg-[#FFFFFF] text-[#0284C7] border border-[#D6EAF7] hover:bg-[#F0F9FF] hover:border-[#38BDF8] hover:text-[#0369A1] shadow-xs hover:shadow-sm hover:scale-[1.02] hover:-translate-y-0.5",
    
    // Ghost: transparent, text #334155, hover text #0284C7, hover bg #F0F9FF
    ghost: "bg-transparent text-[#334155] hover:text-[#0284C7] hover:bg-[#F0F9FF] hover:-translate-y-0.5",
    
    // White: #FFFFFF, text #0284C7, border #BAE6FD, hover bg #E0F2FE, hover text #0369A1
    white: "bg-[#FFFFFF] text-[#0284C7] border border-[#BAE6FD] hover:bg-[#E0F2FE] hover:text-[#0369A1] hover:border-[#38BDF8] shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : null}
      <span>{children}</span>
      {withArrow && !isLoading && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={combinedStyles} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};
