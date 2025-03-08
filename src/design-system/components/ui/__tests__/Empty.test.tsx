import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Empty } from '../Empty';

describe('Componente Empty', () => {
  test('renderiza corretamente com props padrão', () => {
    const emptyMessage = 'Nenhum resultado encontrado';
    render(<Empty message={emptyMessage} />);
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });

  test('renderiza com título personalizado', () => {
    const customTitle = 'Lista Vazia';
    const emptyMessage = 'Sua lista de favoritos está vazia';
    render(<Empty title={customTitle} message={emptyMessage} />);
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });

  test('renderiza com botão de ação primária', () => {
    const actionText = 'Explorar catálogo';
    const mockAction = jest.fn();
    
    render(
      <Empty 
        message="Nenhum item favorito" 
        action={
          <button onClick={mockAction}>
            {actionText}
          </button>
        }
      />
    );
    
    const actionButton = screen.getByText(actionText);
    expect(actionButton).toBeInTheDocument();
    
    fireEvent.click(actionButton);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('renderiza com botões de ação primária e secundária', () => {
    const primaryActionText = 'Limpar filtros';
    const secondaryActionText = 'Ver todos';
    
    render(
      <Empty 
        message="Nenhum filtro corresponde à sua busca" 
        action={<button>{primaryActionText}</button>}
        secondaryAction={<button>{secondaryActionText}</button>}
      />
    );
    
    expect(screen.getByText(primaryActionText)).toBeInTheDocument();
    expect(screen.getByText(secondaryActionText)).toBeInTheDocument();
  });

  test('renderiza com variante card', () => {
    render(<Empty message="Sem dados" variant="card" />);
    const emptyContainer = screen.getByText('Sem dados').closest('div');
    expect(emptyContainer?.parentElement).toHaveClass('bg-white border');
  });

  test('renderiza com variante page', () => {
    render(<Empty message="Página vazia" variant="page" />);
    const emptyContainer = screen.getByText('Página vazia').closest('div');
    expect(emptyContainer?.parentElement).toHaveClass('min-h-[400px]');
  });

  test('renderiza com tamanho personalizado', () => {
    render(<Empty message="Sem resultados" size="lg" />);
    const emptyContainer = screen.getByText('Sem resultados').closest('div');
    expect(emptyContainer?.parentElement).toHaveClass('p-6 text-lg');
  });

  test('aceita e aplica className personalizada', () => {
    render(<Empty message="Lista vazia" className="test-custom-class" />);
    const emptyContainer = screen.getByText('Lista vazia').closest('div');
    expect(emptyContainer?.parentElement).toHaveClass('test-custom-class');
  });

  test('renderiza ícone personalizado quando fornecido', () => {
    const customIcon = <div data-testid="custom-icon">📭</div>;
    render(<Empty message="Caixa vazia" icon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
}); 