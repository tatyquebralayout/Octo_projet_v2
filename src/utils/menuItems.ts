import { MenuItem } from './types';
import { ROUTES } from './constants';

export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: ROUTES.HOME,
  },
  {
    name: 'Somos OCTO',
    href: ROUTES.SOMOS_OCTO.BASE,
    submenu: [
      { name: 'Quem somos?', href: ROUTES.SOMOS_OCTO.QUEM_SOMOS },
      { name: 'Deficiências Ocultas', href: ROUTES.SOMOS_OCTO.DEFICIENCIAS },
      { name: 'Neurodivergências', href: ROUTES.SOMOS_OCTO.NEURODIVERGENCIAS },
      { name: 'Diversidade', href: ROUTES.SOMOS_OCTO.DIVERSIDADE },
    ],
  },
  {
    name: 'OCTO Faz',
    href: ROUTES.OCTO_FAZ.BASE,
    submenu: [
      { name: 'Capacita PcD', href: ROUTES.OCTO_FAZ.CAPACITA_PCD },
      { name: 'Cuida PcD', href: ROUTES.OCTO_FAZ.CUIDA_PCD },
      { name: 'Orienta PcD', href: ROUTES.OCTO_FAZ.ORIENTA_PCD },
      { name: 'Capacita Empresas', href: ROUTES.OCTO_FAZ.CAPACITA_EMPRESAS },
      { name: 'OCTO Cultura', href: ROUTES.OCTO_FAZ.OCTO_CULTURA },
    ],
  },
  {
    name: 'OCTO com você',
    href: ROUTES.OCTO_COM_VOCE.BASE,
    submenu: [
      { name: 'Coluna OCTO com você', href: ROUTES.OCTO_COM_VOCE.COLUNA },
      { name: 'Selo OCTO', href: ROUTES.OCTO_COM_VOCE.SELO },
    ],
  },
  { name: 'OCTO Notícias', href: ROUTES.NOTICIAS },
  { name: 'Cartilhas e Manuais', href: ROUTES.CARTILHAS },
  { name: 'Fale com a OCTO', href: ROUTES.CONTATO },
];