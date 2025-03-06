import React, { useCallback } from 'react';

interface SubMenuItemProps {
  name: string;
  href: string;
  onClick?: () => void;
  'aria-label'?: string;
  role?: 'menuitem';
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  name,
  href,
  onClick,
  'aria-label': ariaLabel,
  role
}) => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  }, [onClick]);

  return (
    <li role="none">
      <a
        href={href}
        className="block px-4 py-2 text-sm font-bold text-[#972ae6] hover:bg-gray-50 hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] focus:bg-gray-50"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={role}
        aria-label={ariaLabel || name}
        tabIndex={-1}
      >
        {name}
      </a>
    </li>
  );
}; 