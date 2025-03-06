import React from 'react';

interface SubMenuItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  name,
  href,
  onClick
}) => {
  return (
    <li>
      <a
        href={href}
        className="block px-4 py-2 text-sm font-bold text-[#972ae6] hover:bg-gray-50 hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] focus:bg-gray-50"
        onClick={onClick}
      >
        {name}
      </a>
    </li>
  );
}; 