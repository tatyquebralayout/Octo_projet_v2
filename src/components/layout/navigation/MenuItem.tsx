import React, { useState, useCallback, type AnchorHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/animations.css';

interface MenuItemProps {
  name: string;
  href: string;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  href,
  hasSubmenu,
  isSubmenuOpen,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

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
    role: hasSubmenu ? 'button' : undefined,
    'aria-expanded': hasSubmenu ? isSubmenuOpen : undefined,
    'aria-haspopup': hasSubmenu ? 'menu' : undefined,
    tabIndex: 0
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