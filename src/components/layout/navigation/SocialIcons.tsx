import React, { lazy, Suspense } from 'react';

const Instagram = lazy(() => import('lucide-react').then(mod => ({ default: mod.Instagram })));
const Twitter = lazy(() => import('lucide-react').then(mod => ({ default: mod.Twitter })));

const IconFallback = () => (
  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
);

export const SocialIcons: React.FC = () => {
  return (
    <div 
      className="flex items-center space-x-4"
      aria-label="Redes sociais"
    >
      <a 
        href="https://instagram.com" 
        className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Siga-nos no Instagram"
      >
        <Suspense fallback={<IconFallback />}>
          <Instagram className="h-5 w-5" aria-hidden="true" />
        </Suspense>
      </a>
      <a 
        href="https://twitter.com" 
        className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Siga-nos no Twitter"
      >
        <Suspense fallback={<IconFallback />}>
          <Twitter className="h-5 w-5" aria-hidden="true" />
        </Suspense>
      </a>
    </div>
  );
}; 