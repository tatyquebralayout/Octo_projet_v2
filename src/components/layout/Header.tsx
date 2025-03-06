import React, { useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuItem } from './navigation/MenuItem';
import { SubMenuItem } from './navigation/SubMenuItem';
import { SocialIcons } from './navigation/SocialIcons';
import { useMenuContext } from '../../hooks/useMenuContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { menuItems } from '../../config/menuItems';
import { MenuButton } from './navigation/MenuButton';
import './styles/animations.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const submenuRefs = useRef<Record<string, React.RefObject<HTMLUListElement>>>({});
  const {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    openSubmenu,
    closeSubmenu,
    isSubmenuOpen
  } = useMenuContext();

  useClickOutside(menuRef, closeMenu);

  const memoizedMenuItems = useMemo(() => {
    menuItems.forEach(item => {
      if (item.submenu) {
        submenuRefs.current[item.name] = React.createRef<HTMLUListElement>();
      }
    });
    return menuItems;
  }, []);

  return (
    <header className="bg-white shadow-sm" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            aria-label="Ir para página inicial"
          >
            <img src="/logo.svg" alt="OCTO Logo" className="h-8" />
          </Link>

          <nav 
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Menu principal"
          >
            <ul className="flex items-center space-x-8" role="menubar">
              {memoizedMenuItems.map((item) => (
                <li
                  key={item.name}
                  className="relative group"
                  role="none"
                  onMouseEnter={() => item.submenu && openSubmenu(item.name)}
                  onMouseLeave={closeSubmenu}
                >
                  <MenuItem
                    name={item.name}
                    href={item.href}
                    hasSubmenu={!!item.submenu}
                    isSubmenuOpen={isSubmenuOpen(item.name)}
                    role="menuitem"
                    aria-haspopup={!!item.submenu}
                    aria-expanded={isSubmenuOpen(item.name)}
                  />
                  
                  {item.submenu && (
                    <CSSTransition
                      in={isSubmenuOpen(item.name)}
                      timeout={150}
                      classNames="submenu"
                      unmountOnExit
                      nodeRef={submenuRefs.current[item.name]}
                    >
                      <ul 
                        ref={submenuRefs.current[item.name]}
                        className="absolute left-0 mt-0 w-64 bg-white border border-gray-100 rounded-lg shadow-lg py-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-label={`Submenu ${item.name}`}
                        tabIndex={-1}
                      >
                        {item.submenu.map((subItem) => (
                          <SubMenuItem
                            key={subItem.name}
                            name={subItem.name}
                            href={subItem.href}
                            onClick={closeMenu}
                            aria-label={subItem.name}
                            role="menuitem"
                          />
                        ))}
                      </ul>
                    </CSSTransition>
                  )}
                </li>
              ))}
            </ul>

            <SocialIcons />
          </nav>

          <MenuButton 
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          />
        </div>

        <CSSTransition
          in={isMenuOpen}
          timeout={200}
          classNames="menu"
          unmountOnExit
          nodeRef={menuRef}
        >
          <nav 
            id="mobile-menu"
            className="lg:hidden py-4"
            ref={menuRef}
            role="navigation" 
            aria-label="Menu mobile"
          >
            <ul className="flex flex-col space-y-2" role="menubar">
              {memoizedMenuItems.map((item) => (
                <li key={item.name} className="flex flex-col" role="none">
                  <MenuItem
                    name={item.name}
                    href={item.href}
                    hasSubmenu={!!item.submenu}
                    isSubmenuOpen={isSubmenuOpen(item.name)}
                    onClick={() => !item.submenu && closeMenu()}
                    role="menuitem"
                    aria-haspopup={!!item.submenu}
                    aria-expanded={isSubmenuOpen(item.name)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </CSSTransition>
      </div>
    </header>
  );
};

export default Header;