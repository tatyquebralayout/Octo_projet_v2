/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Button from '../../../components/ui/Button';

describe('Button Component', () => {
  test('renderiza um botão padrão', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-primary');
  });

  test('aplica classes de variante corretamente', () => {
    // Testar variante primary
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
    
    // Testar variante secondary
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
    
    // Testar variante outline
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-outline');
    
    // Testar variante ghost
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  test('aplica classes de tamanho corretamente', () => {
    // Testar tamanho small
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');
    
    // Testar tamanho medium (padrão)
    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
    
    // Testar tamanho large
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  test('aplica classe fullWidth quando especificado', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  test('exibe estado de loading quando isLoading=true', () => {
    render(<Button isLoading>Carregando</Button>);
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('mostra texto de loading quando isLoading=true e loadingText é fornecido', () => {
    render(<Button isLoading loadingText="Aguarde...">Carregando</Button>);
    expect(screen.getByText('Aguarde...')).toBeInTheDocument();
  });

  test('renderiza um link interno com o React Router', () => {
    render(
      <BrowserRouter>
        <Button href="/pagina">Link Interno</Button>
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link', { name: /link interno/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pagina');
  });

  test('renderiza um link externo', () => {
    render(<Button href="https://example.com" external>Link Externo</Button>);
    
    const link = screen.getByRole('link', { name: /link externo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('dispara evento de clique quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique Aqui</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 