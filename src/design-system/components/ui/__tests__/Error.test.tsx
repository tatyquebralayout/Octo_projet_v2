import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Error } from '../Error';

describe('Componente Error', () => {
  test('renderiza corretamente com props padrão', () => {
    const errorMessage = 'Ocorreu um erro inesperado';
    render(<Error message={errorMessage} />);
    expect(screen.getByText('Ocorreu um erro')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renderiza com título personalizado', () => {
    const customTitle = 'Erro de Conexão';
    const errorMessage = 'Não foi possível conectar ao servidor';
    render(<Error title={customTitle} message={errorMessage} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  test('renderiza botão de retry quando onRetry é fornecido', () => {
    const mockRetry = jest.fn();
    render(
      <Error 
        message="Falha ao carregar recursos" 
        onRetry={mockRetry} 
        retryText="Tentar novamente"
      />
    );
    
    const retryButton = screen.getByText('Tentar novamente');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test('renderiza com variante inline', () => {
    render(<Error message="Email inválido" variant="inline" />);
    const errorContainer = screen.getByText('Email inválido').closest('div');
    expect(errorContainer).toHaveClass('flex items-center');
  });

  test('renderiza com variante card', () => {
    render(<Error message="Erro no servidor" variant="card" />);
    const errorContainer = screen.getByText('Erro no servidor').closest('div');
    expect(errorContainer?.parentElement).toHaveClass('bg-white border');
  });

  test('renderiza com variante banner', () => {
    render(<Error message="Permissão negada" variant="banner" />);
    const errorContainer = screen.getByText('Permissão negada').closest('div');
    expect(errorContainer?.parentElement).toHaveClass('border-l-4 border-red-500');
  });

  test('renderiza com tamanho personalizado', () => {
    render(<Error message="Erro no sistema" size="lg" />);
    // Verificar se o container tem as classes de tamanho grande
    const errorContainer = screen.getByText('Erro no sistema').closest('div');
    expect(errorContainer?.parentElement).toHaveClass('p-6 text-lg');
  });

  test('aceita e aplica className personalizada', () => {
    render(<Error message="Erro de validação" className="test-custom-class" />);
    const errorContainer = screen.getByText('Erro de validação').closest('div');
    expect(errorContainer?.parentElement).toHaveClass('test-custom-class');
  });

  test('renderiza ícone personalizado quando fornecido', () => {
    const customIcon = <div data-testid="custom-icon">⚠️</div>;
    render(<Error message="Aviso importante" icon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
}); 