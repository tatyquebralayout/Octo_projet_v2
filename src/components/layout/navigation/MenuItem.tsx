import React, { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import '../styles/animations.css';

interface MenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  name: string;
  href: string;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  'aria-haspopup'?: boolean;
  'aria-expanded'?: boolean;
  role?: string;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  href,
  hasSubmenu,
  isSubmenuOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
  role = 'menuitem',
  'aria-haspopup': ariaHaspopup,
  'aria-expanded': ariaExpanded,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsPressed(false);
  }, []);
  
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);
  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
    onMouseLeave?.();
  }, [onMouseLeave]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (hasSubmenu) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        onClick?.();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        // Focar no último item do submenu anterior se existir
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        // Abrir submenu se existir
        onClick?.();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        // Fechar submenu se estiver aberto
        if (isSubmenuOpen) {
          onClick?.();
        }
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  }, [hasSubmenu, isSubmenuOpen, onClick]);

  return (
    <a
      href={href}
      className={cn(
        "group relative flex items-center gap-1 px-4 py-2 text-sm font-bold rounded-md",
        "transition-all duration-300 ease-in-out",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#972ae6] focus-visible:ring-offset-2",
        isPressed && "transform scale-95",
        isFocused && "bg-gray-50",
        isSubmenuOpen && "text-[#972ae6]",
        "hover:text-[#972ae6]",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      role={role}
      aria-haspopup={hasSubmenu ? 'menu' : ariaHaspopup}
      aria-expanded={hasSubmenu ? isSubmenuOpen : ariaExpanded}
      tabIndex={0}
      {...props}
    >
      <span className="relative">
        {name}
        <span 
          className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 bg-[#972ae6] transform origin-left scale-x-0 transition-transform duration-300",
            (isSubmenuOpen || isFocused) && "scale-x-100"
          )} 
        />
      </span>
      
      {hasSubmenu && (
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isSubmenuOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      )}
    </a>
  );
}; 