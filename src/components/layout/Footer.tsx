import { footerConfig } from '../../config/footerConfig';
import FooterColumn from './navigation/FooterColumn';
import FooterNav from './navigation/FooterNav';
import FooterSocial from './navigation/FooterSocial';
import FooterLogo from './navigation/FooterLogo';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Coluna Sobre */}
          <FooterColumn title={footerConfig.about.title}>
            <p className="footer-text">
              {footerConfig.about.description}
            </p>
            <h3 className="footer-title mt-4">
              {footerConfig.about.contact.title}
            </h3>
            <a 
              href={`mailto:${footerConfig.about.contact.email}`} 
              className="footer-link"
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
              <h3 className="footer-title mt-4" id={footerConfig.navigation.cartilhas.id}>
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
              <h3 className="footer-title mt-4" id={footerConfig.navigation.noticias.id}>
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
        <div className="footer-bottom">
          <div className="flex items-center gap-4">
            <FooterLogo 
              logoUrl={footerConfig.logo.url}
              altText={footerConfig.logo.alt}
            />
            <FooterSocial links={footerConfig.social.links} />
          </div>
          <div className="footer-copyright">
            <span>{footerConfig.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;