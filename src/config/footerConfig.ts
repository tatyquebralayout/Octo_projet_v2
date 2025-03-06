export const footerConfig = {
  about: {
    title: 'Sobre a OCTO',
    description: 'A OCTO é uma organização dedicada a promover inclusão, capacitação e visibilidade para pessoas com deficiências ocultas, neurodivergências e diversidade, atuando em frentes sociais, culturais e profissionais.',
    contact: {
      title: 'Fale com a OCTO',
      email: 'contato@octodiversidade.com.br'
    }
  },
  navigation: {
    somosOcto: {
      title: 'Somos OCTO',
      id: 'menu-somos-octo',
      items: [
        { to: '/somos-octo/quem-somos', label: 'Quem somos?' },
        { to: '/somos-octo/deficiencias-ocultas', label: 'Deficiências Ocultas' },
        { to: '/somos-octo/neurodivergencias', label: 'Neurodivergências' },
        { to: '/somos-octo/diversidade', label: 'Diversidade' }
      ]
    },
    cartilhas: {
      title: 'Cartilhas e Manuais',
      id: 'menu-cartilhas',
      items: [
        { to: '/cartilhas', label: 'Materiais Educativos' }
      ]
    },
    octoFaz: {
      title: 'OCTO Faz',
      id: 'menu-octo-faz',
      items: [
        { to: '/octo-faz/capacita-pcd', label: 'Capacita PcD' },
        { to: '/octo-faz/cuida-pcd', label: 'Cuida PcD' },
        { to: '/octo-faz/orienta-pcd', label: 'Orienta PcD' },
        { to: '/octo-faz/capacita-empresas', label: 'Capacita Empresas' },
        { to: '/octo-faz/octo-cultura', label: 'OCTO Cultura' }
      ]
    },
    octoComVoce: {
      title: 'OCTO com você',
      id: 'menu-octo-com-voce',
      items: [
        { to: '/octo-com-voce/coluna', label: 'Coluna OCTO com você' },
        { to: '/octo-com-voce/selo', label: 'Selo OCTO' }
      ]
    },
    noticias: {
      title: 'OCTO Notícias',
      id: 'menu-noticias',
      items: [
        { to: '/noticias', label: 'Últimas Notícias' }
      ]
    }
  },
  social: {
    links: [
      {
        url: 'https://instagram.com/octo',
        icon: 'instagram' as const,
        label: 'Siga-nos no Instagram'
      },
      {
        url: 'https://linkedin.com/company/octo',
        icon: 'linkedin' as const,
        label: 'Siga-nos no LinkedIn'
      }
    ]
  },
  logo: {
    url: 'https://iili.io/2pYE6Xe.png',
    alt: 'OCTO Logo'
  },
  copyright: '© 2025 OCTO. Todos os direitos reservados.'
}; 