import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
}

interface FooterNavProps {
  items: NavItem[];
  ariaLabelledby?: string;
}

const FooterNav: React.FC<FooterNavProps> = ({ items, ariaLabelledby }) => {
  return (
    <ul className="space-y-2" aria-labelledby={ariaLabelledby}>
      {items.map((item) => (
        <li key={item.to}>
          <Link 
            to={item.to} 
            className="text-body-small text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterNav; 