import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { MenuProvider } from '../../../contexts/MenuContext';

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <MenuProvider>
        <Header />
      </MenuProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('renderiza o logo corretamente', () => {
    renderHeader();
    expect(screen.getByAltText('OCTO Logo')).toBeInTheDocument();
  });

  it('renderiza o menu mobile quando o botão é clicado', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation', { name: /menu mobile/i })).toBeInTheDocument();
  });

  it('fecha o menu mobile quando o botão é clicado novamente', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    expect(screen.queryByRole('navigation', { name: /menu mobile/i })).not.toBeInTheDocument();
  });

  it('renderiza os links de redes sociais', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: /siga-nos no instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /siga-nos no twitter/i })).toBeInTheDocument();
  });

  it('renderiza todos os itens do menu principal', () => {
    renderHeader();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Somos OCTO')).toBeInTheDocument();
    expect(screen.getByText('OCTO Faz')).toBeInTheDocument();
    expect(screen.getByText('OCTO com você')).toBeInTheDocument();
    expect(screen.getByText('OCTO Notícias')).toBeInTheDocument();
    expect(screen.getByText('Cartilhas e Manuais')).toBeInTheDocument();
    expect(screen.getByText('Fale com a OCTO')).toBeInTheDocument();
  });
}); 