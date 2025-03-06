import React, { useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuItem } from './navigation/MenuItem';
import { SubMenuItem } from './navigation/SubMenuItem';
import { SocialIcons } from './navigation/SocialIcons';
import { useMenuContext } from '../../contexts/MenuContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { menuItems } from '../../config/menuItems';
import { MenuButton } from './navigation/MenuButton';
import './styles/animations.css';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" role="banner">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center"
              aria-label="OCTO - Página Inicial"
            >
              <img 
                src="https://iili.io/2pYE6Xe.png" 
                alt="OCTO Logo" 
                className="h-8 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
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
                      >
                        {item.submenu.map((subItem) => (
                          <SubMenuItem
                            key={subItem.name}
                            name={subItem.name}
                            href={subItem.href}
                            onClick={closeMenu}
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

          {/* Mobile Menu Button */}
          <MenuButton 
            isOpen={isMenuOpen}
            onClick={toggleMenu}
          />
        </div>

        {/* Mobile Navigation */}
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
                        className="ml-4 flex flex-col space-y-2 mt-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-label={`Submenu ${item.name}`}
                      >
                        {item.submenu.map((subItem) => (
                          <SubMenuItem
                            key={subItem.name}
                            name={subItem.name}
                            href={subItem.href}
                            onClick={closeMenu}
                          />
                        ))}
                      </ul>
                    </CSSTransition>
                  )}
                </li>
              ))}
              
              <li className="pt-4 mt-4" role="none">
                <SocialIcons />
              </li>
            </ul>
          </nav>
        </CSSTransition>
      </div>
    </header>
  );
};

export default Header;