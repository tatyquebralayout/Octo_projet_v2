import { footerConfig } from '../../config/footerConfig';
import FooterColumn from './navigation/FooterColumn';
import FooterNav from './navigation/FooterNav';
import FooterSocial from './navigation/FooterSocial';
import FooterLogo from './navigation/FooterLogo';

const Footer = () => {
  return (
    <footer className="bg-[#972ae6] py-16" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Coluna Sobre */}
          <FooterColumn title={footerConfig.about.title}>
            <p className="text-sm text-white/80 leading-relaxed">
              {footerConfig.about.description}
            </p>
            <h3 className="text-base font-bold text-white/90 mt-6 mb-2">
              {footerConfig.about.contact.title}
            </h3>
            <a 
              href={`mailto:${footerConfig.about.contact.email}`} 
              className="text-sm text-white/80 hover:text-white transition-colors duration-200"
              aria-label={`Enviar e-mail para ${footerConfig.about.contact.email}`}
            >
              {footerConfig.about.contact.email}
            </a>
          </FooterColumn>

          {/* Coluna Somos OCTO e Cartilhas */}
          <FooterColumn title={footerConfig.navigation.somosOcto.title}>
            <nav aria-label="Menu Somos OCTO">
              <FooterNav 
                items={footerConfig.navigation.somosOcto.items}
                ariaLabelledby={footerConfig.navigation.somosOcto.id}
              />
              <h3 className="text-base font-bold text-white/90 mt-6 mb-2" id={footerConfig.navigation.cartilhas.id}>
                {footerConfig.navigation.cartilhas.title}
              </h3>
              <FooterNav 
                items={footerConfig.navigation.cartilhas.items}
                ariaLabelledby={footerConfig.navigation.cartilhas.id}
              />
            </nav>
          </FooterColumn>

          {/* Coluna OCTO Faz */}
          <FooterColumn title={footerConfig.navigation.octoFaz.title}>
            <nav aria-label="Menu OCTO Faz">
              <FooterNav 
                items={footerConfig.navigation.octoFaz.items}
                ariaLabelledby={footerConfig.navigation.octoFaz.id}
              />
            </nav>
          </FooterColumn>

          {/* Coluna OCTO com você e Notícias */}
          <FooterColumn title={footerConfig.navigation.octoComVoce.title}>
            <nav aria-label="Menu OCTO com você">
              <FooterNav 
                items={footerConfig.navigation.octoComVoce.items}
                ariaLabelledby={footerConfig.navigation.octoComVoce.id}
              />
              <h3 className="text-base font-bold text-white/90 mt-6 mb-2" id={footerConfig.navigation.noticias.id}>
                {footerConfig.navigation.noticias.title}
              </h3>
              <FooterNav 
                items={footerConfig.navigation.noticias.items}
                ariaLabelledby={footerConfig.navigation.noticias.id}
              />
            </nav>
          </FooterColumn>
        </div>

        {/* Rodapé com Logo e Social */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <FooterLogo 
              logoUrl={footerConfig.logo.url}
              altText={footerConfig.logo.alt}
            />
            <FooterSocial links={footerConfig.social.links} />
          </div>
          <div className="text-caption text-white/60">
            <span>{footerConfig.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;