import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Componente Loading', () => {
  test('renderiza corretamente com props padrão', () => {
    render(<Loading />);
    // Verificar se o elemento foi renderizado
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
    
    // Verificar texto de acessibilidade padrão
    expect(loadingElement).toHaveAttribute('aria-label', 'Carregando');
  });

  test('renderiza com tamanho personalizado', () => {
    render(<Loading size="lg" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('lg');
  });

  test('renderiza variante dots', () => {
    render(<Loading variant="dots" />);
    const dotsElements = screen.getAllByTestId('loading-dot');
    expect(dotsElements.length).toBe(3);
  });

  test('renderiza variante pulse', () => {
    render(<Loading variant="pulse" />);
    const pulseElement = screen.getByTestId('loading-pulse');
    expect(pulseElement).toBeInTheDocument();
  });

  test('renderiza com texto de label', () => {
    const labelText = 'Carregando dados...';
    render(<Loading label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  test('renderiza em tela cheia quando fullPage é true', () => {
    render(<Loading fullPage />);
    const fullPageElement = screen.getByTestId('loading-fullpage');
    expect(fullPageElement).toBeInTheDocument();
    expect(fullPageElement).toHaveClass('fixed inset-0');
  });

  test('aceita e aplica className personalizada', () => {
    render(<Loading className="test-custom-class" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('test-custom-class');
  });

  test('renderiza overlay quando especificado', () => {
    render(<Loading overlay />);
    const overlayElement = screen.getByTestId('loading-overlay');
    expect(overlayElement).toBeInTheDocument();
    expect(overlayElement).toHaveClass('bg-black/20');
  });
}); 