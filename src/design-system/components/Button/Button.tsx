import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

// Definindo variantes de botão usando class-variance-authority
const buttonVariants = cva(
  // Base styles aplicados a todos os botões
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary-400 text-white hover:bg-primary-300 active:bg-primary-500 shadow-md",
        secondary: "bg-white text-primary-400 hover:bg-accent-400 hover:text-white border border-gray-200 shadow-sm",
        outline: "bg-transparent border-2 border-current text-primary-400 hover:bg-primary-400/10",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        link: "bg-transparent underline-offset-4 hover:underline text-primary-400 hover:text-primary-300 shadow-none p-0",
      },
      size: {
        sm: "text-sm px-4 py-2 h-9",
        md: "text-base px-6 py-3 h-11",
        lg: "text-lg px-8 py-4 h-14",
        icon: "p-2 h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      disabled: false,
    }
  }
);

export interface ButtonProps 
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    children,
    variant,
    size,
    fullWidth,
    leftIcon,
    rightIcon,
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, disabled }), className)}
        ref={ref}
        disabled={disabled === true ? true : undefined}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 