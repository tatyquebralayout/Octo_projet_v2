import React, { useRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuItem } from './navigation/MenuItem';
import { SubMenuItem } from './navigation/SubMenuItem';
import { SocialIcons } from './navigation/SocialIcons';
import { useMenuContext } from '../../hooks/useMenuContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { menuItems } from '../../config/menuItems';
import { MenuButton } from './navigation/MenuButton';
import logo from '../../assets/icons/logo.svg';
import './styles/animations.css';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Header: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const submenuRefs = useRef<Record<string, React.RefObject<HTMLUListElement>>>({});
  const timeoutRef = useRef<NodeJS.Timeout>();
  
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

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    openSubmenu(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      closeSubmenu();
    }, 150); // Pequeno delay para dar tempo de mover o mouse para o submenu
  };

  return (
    <header 
      className={cn(
        "bg-white border-b border-gray-200 shadow-sm",
        "fixed w-full top-0 z-50",
        "h-14 md:h-16" // Altura menor no mobile
      )} 
      role="banner"
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#972ae6] rounded-md"
            aria-label="Ir para página inicial"
          >
            <img src={logo} alt="OCTO Logo" className="h-6 md:h-8 w-auto" />
          </Link>

          {/* Menu Desktop */}
          <nav 
            className="hidden lg:flex items-center gap-8"
            role="navigation"
            aria-label="Menu principal"
          >
            <ul 
              className="flex items-center gap-6" 
              role="menubar"
              aria-label="Menu principal"
            >
              {memoizedMenuItems.map((item) => (
                <li
                  key={item.name}
                  className="relative"
                  role="none"
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <MenuItem
                    name={item.name}
                    href={item.href}
                    hasSubmenu={!!item.submenu}
                    isSubmenuOpen={isSubmenuOpen(item.name)}
                    role="menuitem"
                    aria-haspopup={!!item.submenu}
                    aria-expanded={isSubmenuOpen(item.name)}
                    className="ripple text-gray-700 hover:text-[#972ae6] transition-colors duration-300"
                  />
                  
                  {item.submenu && (
                    <div 
                      className="absolute left-0 top-full pt-2 w-64"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <CSSTransition
                        in={isSubmenuOpen(item.name)}
                        timeout={300}
                        classNames="submenu"
                        unmountOnExit
                        nodeRef={submenuRefs.current[item.name]}
                      >
                        <ul 
                          ref={submenuRefs.current[item.name]}
                          className={cn(
                            "bg-white border border-gray-100 rounded-lg shadow-lg",
                            "py-2 z-[60]"
                          )}
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
                              aria-label={subItem.name}
                              className="ripple text-gray-700 hover:text-[#972ae6]"
                            />
                          ))}
                        </ul>
                      </CSSTransition>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <SocialIcons />
          </nav>

          {/* Botão Menu Mobile */}
          <MenuButton 
            isOpen={isMenuOpen}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="menu-icon text-gray-700 hover:text-[#972ae6]"
          />
        </div>

        {/* Menu Mobile */}
        <CSSTransition
          in={isMenuOpen}
          timeout={300}
          classNames="menu"
          unmountOnExit
          nodeRef={menuRef}
        >
          <nav 
            id="mobile-menu"
            className="lg:hidden py-4 bg-white border-t border-gray-100 shadow-lg"
            ref={menuRef}
            role="navigation" 
            aria-label="Menu mobile"
          >
            <ul 
              className="flex flex-col gap-2" 
              role="menubar"
              aria-label="Menu mobile"
            >
              {memoizedMenuItems.map((item) => (
                <li key={item.name} className="flex flex-col" role="none">
                  <MenuItem
                    name={item.name}
                    href={item.href}
                    hasSubmenu={!!item.submenu}
                    isSubmenuOpen={isSubmenuOpen(item.name)}
                    onClick={() => {
                      if (!item.submenu) {
                        closeMenu();
                      } else {
                        isSubmenuOpen(item.name) ? closeSubmenu() : openSubmenu(item.name);
                      }
                    }}
                    role="menuitem"
                    aria-haspopup={!!item.submenu}
                    aria-expanded={isSubmenuOpen(item.name)}
                    className="ripple text-gray-700 hover:text-[#972ae6] px-4"
                  />
                  
                  {item.submenu && (
                    <CSSTransition
                      in={isSubmenuOpen(item.name)}
                      timeout={300}
                      classNames="submenu-mobile"
                      unmountOnExit
                    >
                      <ul
                        className="pl-4 py-2 bg-gray-50"
                        role="menu"
                        aria-label={`Submenu ${item.name}`}
                      >
                        {item.submenu.map((subItem) => (
                          <SubMenuItem
                            key={subItem.name}
                            name={subItem.name}
                            href={subItem.href}
                            onClick={closeMenu}
                            aria-label={subItem.name}
                            className="ripple text-gray-700 hover:text-[#972ae6]"
                          />
                        ))}
                      </ul>
                    </CSSTransition>
                  )}
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