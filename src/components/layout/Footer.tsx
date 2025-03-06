import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#972ae6] text-white py-8" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Primeira Coluna - Texto OCTO */}
          <div>
            <h3 className="text-[10px] font-bold mb-2">Sobre a OCTO</h3>
            <p className="text-[9px] text-white/90">
              A OCTO é uma organização dedicada a promover inclusão, capacitação e visibilidade para pessoas com deficiências ocultas, neurodivergências e diversidade, atuando em frentes sociais, culturais e profissionais.
            </p>
            <h3 className="text-[10px] font-bold mt-4 mb-2">Fale com a OCTO</h3>
            <a 
              href="mailto:contato@octodiversidade.com.br" 
              className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
              aria-label="Enviar e-mail para contato@octodiversidade.com.br"
            >
              contato@octodiversidade.com.br
            </a>
          </div>

          {/* Segunda Coluna */}
          <div>
            <nav aria-label="Menu Somos OCTO">
              <h3 className="text-[10px] font-bold mb-2" id="menu-somos-octo">Somos OCTO</h3>
              <ul className="space-y-1" aria-labelledby="menu-somos-octo">
                <li>
                  <Link 
                    to="/somos-octo/quem-somos" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Quem somos?
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/somos-octo/deficiencias-ocultas" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Deficiências Ocultas
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/somos-octo/neurodivergencias" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Neurodivergências
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/somos-octo/diversidade" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Diversidade
                  </Link>
                </li>
              </ul>

              <h3 className="text-[10px] font-bold mt-4 mb-2" id="menu-cartilhas">Cartilhas e Manuais</h3>
              <ul className="space-y-1" aria-labelledby="menu-cartilhas">
                <li>
                  <Link 
                    to="/cartilhas" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Materiais Educativos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Terceira Coluna */}
          <div>
            <nav aria-label="Menu OCTO Faz">
              <h3 className="text-[10px] font-bold mb-2" id="menu-octo-faz">OCTO Faz</h3>
              <ul className="space-y-1" aria-labelledby="menu-octo-faz">
                <li>
                  <Link 
                    to="/octo-faz/capacita-pcd" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Capacita PcD
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/octo-faz/cuida-pcd" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Cuida PcD
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/octo-faz/orienta-pcd" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Orienta PcD
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/octo-faz/capacita-empresas" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Capacita Empresas
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/octo-faz/octo-cultura" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    OCTO Cultura
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Quarta Coluna */}
          <div>
            <nav aria-label="Menu OCTO com você">
              <h3 className="text-[10px] font-bold mb-2" id="menu-octo-com-voce">OCTO com você</h3>
              <ul className="space-y-1" aria-labelledby="menu-octo-com-voce">
                <li>
                  <Link 
                    to="/octo-com-voce/coluna" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Coluna OCTO com você
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/octo-com-voce/selo" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Selo OCTO
                  </Link>
                </li>
              </ul>

              <h3 className="text-[10px] font-bold mt-4 mb-2" id="menu-noticias">OCTO Notícias</h3>
              <ul className="space-y-1" aria-labelledby="menu-noticias">
                <li>
                  <Link 
                    to="/noticias" 
                    className="text-[9px] text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md inline-block"
                  >
                    Últimas Notícias
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Logo e Social Links */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-4 gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              aria-label="OCTO - Página Inicial"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded-md"
            >
              <img 
                src="https://iili.io/2pYE6Xe.png" 
                alt="OCTO Logo" 
                className="h-3 w-auto"
              />
            </Link>
            <div 
              className="flex gap-2"
              aria-label="Redes sociais"
            >
              <a 
                href="https://instagram.com/octo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Siga-nos no Instagram"
              >
                <Instagram className="w-2.5 h-2.5" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com/company/octo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Siga-nos no LinkedIn"
              >
                <Linkedin className="w-2.5 h-2.5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="text-[8px] text-white/60">
            <span>© 2025 OCTO. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;