import React, { lazy, Suspense } from 'react';
import { LucideProps, icons } from 'lucide-react';
import { cn } from '../../utils/cn';

type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  className?: string;
}

const IconFallback = () => (
  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
);

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const LucideIcon = lazy(async () => {
    const module = await import('lucide-react');
    const Icon = module[name];
    return { default: Icon };
  });

  return (
    <Suspense fallback={<IconFallback />}>
      <LucideIcon 
        className={cn("w-5 h-5", className)} 
        aria-hidden="true"
        {...props} 
      />
    </Suspense>
  );
}; 