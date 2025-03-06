import React from 'react';

interface SubMenuProps {
  children: React.ReactNode;
  'aria-label'?: string;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  children,
  'aria-label': ariaLabel
}) => {
  return (
    <ul
      role="menu"
      aria-label={ariaLabel}
      className="py-1 rounded-md shadow-lg bg-white"
    >
      {children}
    </ul>
  );
}; 