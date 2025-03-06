import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

interface SocialLink {
  url: string;
  icon: 'instagram' | 'linkedin';
  label: string;
}

interface FooterSocialProps {
  links: SocialLink[];
}

const FooterSocial: React.FC<FooterSocialProps> = ({ links }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram':
        return <Instagram className="w-2.5 h-2.5" aria-hidden="true" />;
      case 'linkedin':
        return <Linkedin className="w-2.5 h-2.5" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex gap-2"
      aria-label="Redes sociais"
    >
      {links.map((link) => (
        <a 
          key={link.url}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={link.label}
        >
          {getIcon(link.icon)}
        </a>
      ))}
    </div>
  );
};

export default FooterSocial; 