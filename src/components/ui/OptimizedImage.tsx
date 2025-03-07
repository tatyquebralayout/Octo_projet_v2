import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Componente de imagem otimizado para performance
 * - Inclui width e height para prevenir layout shifts (CLS)
 * - Implementa lazy loading por padrão
 * - Permite priorização para imagens above-the-fold
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
};

export default OptimizedImage; 