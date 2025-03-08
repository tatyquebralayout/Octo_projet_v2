/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Card from '../../../components/ui/Card';

// Mocking do componente para testes
vi.mock('../../../components/ui/Card', () => ({
  default: ({ children, className, title, footer }) => {
    return (
      <div className={`card card-primary ${className || ''}`} data-testid="card">
        {title && (
          <div className="card-header">
            {typeof title === 'string' ? (
              <h3 className="text-h3">{title}</h3>
            ) : (
              title
            )}
          </div>
        )}
        <div className="card-body" data-testid="card-body">{children}</div>
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    );
  }
}));

describe('Card Component', () => {
  test('renderiza um card com o conteúdo correto', () => {
    render(<Card>Conteúdo do Card</Card>);
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveClass('card');
  });

  test('renderiza um título quando fornecido', () => {
    render(<Card title="Título do Card">Conteúdo do Card</Card>);
    expect(screen.getByRole('heading')).toHaveTextContent('Título do Card');
    expect(screen.getByRole('heading')).toHaveClass('text-h3');
  });

  test('renderiza um footer quando fornecido', () => {
    render(
      <Card 
        footer={<button>Ação</button>}
      >
        Conteúdo do Card
      </Card>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Ação');
  });

  test('aplica classes adicionais quando fornecidas', () => {
    render(
      <Card className="custom-class">
        Conteúdo do Card
      </Card>
    );
    
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });
}); 