import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../../ui/OptimizedImage';

interface FooterLogoProps {
  logoUrl: string;
  altText: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ logoUrl, altText }) => {
  return (
    <Link 
      to="/"
      aria-label="OCTO - Página Inicial"
      className="focus:outline-none focus:ring-2 focus:ring-white rounded-md"
    >
      <OptimizedImage 
        src={logoUrl} 
        alt={altText} 
        className="h-6 w-auto"
        width={120}
        height={24}
      />
    </Link>
  );
};

export default FooterLogo; 