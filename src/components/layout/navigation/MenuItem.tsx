import React, { useState, useCallback, type AnchorHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
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
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (hasSubmenu) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        onClick?.();
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  }, [hasSubmenu, onClick]);

  const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    href,
    className: `
      flex items-center py-2 text-sm font-bold text-[#972ae6] rounded-md
      transition-all duration-200 ease-in-out
      hover:text-[#e8b624] 
      focus:outline-none focus:ring-2 focus:ring-[#972ae6] focus:ring-offset-2
      ${isFocused ? 'menu-item-focus' : ''}
      ${isPressed ? 'menu-item-active' : ''}
      ripple
    `,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyDown: handleKeyDown,
    role,
    'aria-haspopup': hasSubmenu ? 'menu' : ariaHaspopup,
    'aria-expanded': hasSubmenu ? isSubmenuOpen : ariaExpanded,
    tabIndex: 0,
    ...props
  };

  return (
    <a {...linkProps}>
      <span className="relative z-10">{name}</span>
      {hasSubmenu && (
        <ChevronDown 
          className={`
            ml-1 h-4 w-4 menu-icon
            ${isSubmenuOpen ? 'menu-icon-open' : ''}
          `}
          aria-hidden="true"
        />
      )}
    </a>
  );
}; 