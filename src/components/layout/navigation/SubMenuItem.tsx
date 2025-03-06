import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface SubMenuItemProps {
  name: string;
  href: string;
  onClick?: () => void;
  'aria-label'?: string;
  role?: 'menuitem' | 'none';
  className?: string;
}

// Este componente deve ser usado dentro do componente SubMenu
// Exemplo de uso:
// <SubMenu aria-label="Submenu">
//   <SubMenuItem name="Item 1" href="#" />
//   <SubMenuItem name="Item 2" href="#" />
// </SubMenu>
export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  name,
  href,
  onClick,
  'aria-label': ariaLabel,
  role = 'menuitem',
  className
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
  const handleMouseLeave = useCallback(() => setIsPressed(false), []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      // Focar no item anterior
      event.currentTarget.parentElement?.previousElementSibling?.querySelector('a')?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      // Focar no próximo item
      event.currentTarget.parentElement?.nextElementSibling?.querySelector('a')?.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      // Fechar submenu e focar no item pai
      onClick?.();
    }
  }, [onClick]);

  return (
    <li role="none">
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          "block w-full text-sm font-medium px-4 py-2",
          "transition-all duration-300 ease-in-out",
          "outline-none focus-visible:ring-2 focus-visible:ring-[#972ae6] focus-visible:ring-offset-2",
          isPressed && "transform scale-95",
          isFocused && "bg-gray-50",
          "hover:bg-gray-50 hover:text-[#972ae6]",
          className
        )}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        role={role}
        aria-label={ariaLabel || name}
      >
        <span className="relative">
          {name}
          <span 
            className={cn(
              "absolute bottom-0 left-0 w-full h-0.5 bg-[#972ae6] transform origin-left scale-x-0 transition-transform duration-300",
              isFocused && "scale-x-100"
            )} 
          />
        </span>
      </Link>
    </li>
  );
}; 