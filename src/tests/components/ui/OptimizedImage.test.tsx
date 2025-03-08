/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import OptimizedImage from '../../../components/ui/OptimizedImage';

describe('OptimizedImage Component', () => {
  test('renderiza uma imagem com atributos básicos', () => {
    render(<OptimizedImage src="/imagem.jpg" alt="Descrição da imagem" />);
    
    const imagem = screen.getByAltText('Descrição da imagem');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', '/imagem.jpg');
  });

  test('aplica lazy loading por padrão', () => {
    render(<OptimizedImage src="/imagem.jpg" alt="Imagem com lazy loading" />);
    
    const imagem = screen.getByAltText('Imagem com lazy loading');
    expect(imagem).toHaveAttribute('loading', 'lazy');
    expect(imagem).toHaveAttribute('fetchpriority', 'auto');
  });

  test('aplica carregamento prioritário quando priority=true', () => {
    render(
      <OptimizedImage 
        src="/imagem.jpg" 
        alt="Imagem prioritária" 
        priority={true} 
      />
    );
    
    const imagem = screen.getByAltText('Imagem prioritária');
    expect(imagem).toHaveAttribute('loading', 'eager');
    expect(imagem).toHaveAttribute('fetchpriority', 'high');
  });

  test('aplica classes CSS quando fornecidas', () => {
    render(
      <OptimizedImage 
        src="/imagem.jpg" 
        alt="Imagem com classes" 
        className="rounded-lg shadow-md" 
      />
    );
    
    const imagem = screen.getByAltText('Imagem com classes');
    expect(imagem).toHaveClass('rounded-lg');
    expect(imagem).toHaveClass('shadow-md');
  });

  test('define width e height quando fornecidos', () => {
    render(
      <OptimizedImage 
        src="/imagem.jpg" 
        alt="Imagem com dimensões" 
        width={300}
        height={200}
      />
    );
    
    const imagem = screen.getByAltText('Imagem com dimensões');
    expect(imagem).toHaveAttribute('width', '300');
    expect(imagem).toHaveAttribute('height', '200');
  });

  test('define o atributo decoding como async', () => {
    render(<OptimizedImage src="/imagem.jpg" alt="Imagem com decoding" />);
    
    const imagem = screen.getByAltText('Imagem com decoding');
    expect(imagem).toHaveAttribute('decoding', 'async');
  });
}); 