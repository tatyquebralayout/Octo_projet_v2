import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { axe } from 'jest-axe';
import Header from '../components/layout/Header';
import { MenuProvider } from '../contexts/MenuContext';

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
  it('não deve ter violações de acessibilidade', async () => {
    const { container } = renderHeader();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('deve abrir o menu mobile ao clicar no botão', async () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    await userEvent.click(menuButton);
    expect(screen.getByRole('navigation', { name: /menu mobile/i })).toBeInTheDocument();
  });

  it('deve navegar pelo menu usando teclado', async () => {
    renderHeader();
    const menuItems = screen.getAllByRole('menuitem');
    
    // Foca no primeiro item do menu
    await userEvent.tab();
    expect(menuItems[0]).toHaveFocus();

    // Navega para o próximo item
    await userEvent.tab();
    expect(menuItems[1]).toHaveFocus();
  });

  it('deve abrir submenu ao pressionar Enter em item com submenu', async () => {
    renderHeader();
    const menuItemWithSubmenu = screen.getByRole('menuitem', { expanded: false });
    
    await userEvent.tab();
    expect(menuItemWithSubmenu).toHaveFocus();
    
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(menuItemWithSubmenu).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('deve fechar menu mobile ao pressionar Escape', async () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /abrir menu/i });
    
    await userEvent.click(menuButton);
    expect(screen.getByRole('navigation', { name: /menu mobile/i })).toBeInTheDocument();
    
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: /menu mobile/i })).not.toBeInTheDocument();
    });
  });
}); 