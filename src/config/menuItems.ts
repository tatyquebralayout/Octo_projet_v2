export interface MenuItem {
  name: string;
  href: string;
  submenu?: MenuItem[];
}

export const menuItems: MenuItem[] = [
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