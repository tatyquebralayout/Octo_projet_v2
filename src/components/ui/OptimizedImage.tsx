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
  // Usando atributos personalizados para suportar fetchpriority
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> & { [key: string]: any } = {
    src,
    alt,
    width,
    height,
    className: `${className}`,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: priority ? 'high' : 'auto',
  };

  return <img {...imgProps} />;
};

export default OptimizedImage; 