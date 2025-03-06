import React from 'react';
import { cn } from '../../utils/cn';
import { colors, typography, spacing } from '../foundations/tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="relative">
      {label && (
        <label
          className={cn(
            'block mb-1',
            'text-sm font-medium',
            'text-gray-700',
            disabled && 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className={cn(
            'absolute top-1/2 transform -translate-y-1/2',
            'text-gray-400 left-3'
          )}>
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 rounded-lg',
            'border transition-all duration-200',
            'text-base font-normal',
            'focus:outline-none focus:ring-2',
            'focus:ring-primary-400 focus:border-primary-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error focus:border-error',
            !error && 'border-gray-300',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          disabled={disabled}
          {...props}
        />

        {rightIcon && (
          <span className={cn(
            'absolute top-1/2 transform -translate-y-1/2',
            'text-gray-400 right-3'
          )}>
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helper) && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-error' : 'text-gray-500'
        )}>
          {error || helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 