import React, { useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Instagram, Twitter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const menuItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Somos OCTO',
      href: '/somos-octo',
      submenu: [
        { name: 'Quem somos?', href: '/somos-octo/quem-somos' },
        { name: 'Deficiências Ocultas', href: '/somos-octo/deficiencias-ocultas' },
        { name: 'Neurodivergências', href: '/somos-octo/neurodivergencias' },
        { name: 'Diversidade', href: '/somos-octo/diversidade' },
      ],
    },
    {
      name: 'OCTO Faz',
      href: '/octo-faz',
      submenu: [
        { name: 'Capacita PcD', href: '/octo-faz/capacita-pcd' },
        { name: 'Cuida PcD', href: '/octo-faz/cuida-pcd' },
        { name: 'Orienta PcD', href: '/octo-faz/orienta-pcd' },
        { name: 'Capacita Empresas', href: '/octo-faz/capacita-empresas' },
        { name: 'OCTO Cultura', href: '/octo-faz/octo-cultura' },
      ],
    },
    {
      name: 'OCTO com você',
      href: '/octo-com-voce',
      submenu: [
        { name: 'Coluna OCTO com você', href: '/octo-com-voce/coluna' },
        { name: 'Selo OCTO', href: '/octo-com-voce/selo' },
      ],
    },
    { name: 'OCTO Notícias', href: '/noticias' },
    { name: 'Cartilhas e Manuais', href: '/cartilhas' },
    { name: 'Fale com a OCTO', href: '/contato' },
  ];

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
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center py-2 text-sm font-bold text-[#972ae6] hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] rounded-md"
                  aria-expanded={activeSubmenu === item.name}
                  aria-haspopup={item.submenu ? "true" : undefined}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                  )}
                </a>
                
                {item.submenu && activeSubmenu === item.name && (
                  <div 
                    className="absolute left-0 mt-0 w-64 bg-white border border-gray-100 rounded-lg shadow-lg py-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`${item.name}-menu`}
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm font-bold text-[#972ae6] hover:bg-gray-50 hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] focus:bg-gray-50"
                        role="menuitem"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Social Media Icons */}
            <div 
              className="flex items-center space-x-4 ml-4 pl-4"
              aria-label="Redes sociais"
            >
              <a 
                href="https://instagram.com" 
                className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Siga-nos no Twitter"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#972ae6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#972ae6]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu"
            className="lg:hidden py-4"
            ref={menuRef}
            role="navigation" 
            aria-label="Menu mobile"
          >
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <a
                    href={item.href}
                    className="py-2 font-bold text-[#972ae6] hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] rounded-md"
                    onClick={() => !item.submenu && setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div 
                      className="ml-4 flex flex-col space-y-2 mt-1"
                      role="group"
                      aria-label={`Submenu ${item.name}`}
                    >
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="py-1 text-sm font-bold text-[#972ae6] hover:text-[#e8b624] focus:outline-none focus:ring-2 focus:ring-[#972ae6] rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Social Media Icons */}
              <div 
                className="flex items-center space-x-4 pt-4 mt-4"
                aria-label="Redes sociais"
              >
                <a 
                  href="https://instagram.com" 
                  className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Siga-nos no Instagram"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://twitter.com" 
                  className="text-[#972ae6] hover:text-[#e8b624] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#972ae6]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Siga-nos no Twitter"
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;