/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import { MenuProvider } from '../../../contexts/MenuContext';
import React from 'react';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <MenuProvider>
          <Header />
        </MenuProvider>
      </BrowserRouter>
    );
  });

  test('renders logo', () => {
    const logo = screen.getByAltText(/OCTO Logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation', () => {
    const navigation = screen.getByRole('navigation', { name: /menu principal/i });
    expect(navigation).toBeInTheDocument();
  });

  test('toggles mobile menu on button click', () => {
    // Find mobile menu button
    const menuButton = screen.getByLabelText(/abrir menu/i);
    expect(menuButton).toBeInTheDocument();
    
    // Click the menu button
    fireEvent.click(menuButton);
    
    // Check that mobile menu is visible
    const mobileMenu = screen.getByRole('navigation', { name: /menu mobile/i });
    expect(mobileMenu).toBeInTheDocument();
  });

  test('displays all main menu items', () => {
    // Encontrar a navegação principal primeiro
    const mainNav = screen.getByRole('navigation', { name: /menu principal/i });
    
    // Procurar pelos textos dentro da navegação principal
    const homeLink = within(mainNav).getByText('Home');
    const somosOctoLink = within(mainNav).getByText('Somos OCTO');
    const octoFazLink = within(mainNav).getByText('OCTO Faz');
    const octoComVoceLink = within(mainNav).getByText('OCTO com você');
    const octoNoticiasLink = within(mainNav).getByText('OCTO Notícias');

    expect(homeLink).toBeInTheDocument();
    expect(somosOctoLink).toBeInTheDocument();
    expect(octoFazLink).toBeInTheDocument();
    expect(octoComVoceLink).toBeInTheDocument();
    expect(octoNoticiasLink).toBeInTheDocument();
  });
}); 