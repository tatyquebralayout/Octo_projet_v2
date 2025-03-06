import '@testing-library/jest-dom';
import { AxeResults } from 'jest-axe';

declare global {
  // Tipos para elementos HTML personalizados
  interface HTMLElementEventMap {
    'custom-event': CustomEvent;
  }

  // Tipos para propriedades ARIA
  interface AriaAttributes {
    'aria-expanded'?: boolean;
    'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    'aria-controls'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-selected'?: boolean;
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
    role?: string;
  }

  // Tipos para testes
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): Promise<R>;
      toBeAccessible(): Promise<R>;
    }
  }

  // Tipos para componentes
  interface MenuItemProps {
    name: string;
    href: string;
    hasSubmenu?: boolean;
    'aria-label'?: string;
    role?: string;
    onClick?: () => void;
  }

  interface SubMenuItemProps {
    name: string;
    href: string;
    'aria-label'?: string;
    role?: 'menuitem';
    onClick?: () => void;
  }

  // Tipos para hooks
  interface UseMenuReturn {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
  }

  // Tipos para contexto
  interface MenuContextType {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
  }
} 