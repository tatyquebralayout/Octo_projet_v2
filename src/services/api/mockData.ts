/**
 * Dados de mock para o desenvolvimento
 * Estes dados são usados apenas durante o desenvolvimento
 */
import { 
  User, 
  UserRole, 
  ApiResponse, 
  PaginatedResponse, 
  AuthResponse,
  UserProfile,
  Guide,
  News,
  ContactFormResponse 
} from './types';
import { API_ENV } from './config';

// Função simuladora de atraso dinâmico
export const randomDelay = async (): Promise<void> => {
  const min = API_ENV.MOCK_DELAY?.MIN || 200;
  const max = API_ENV.MOCK_DELAY?.MAX || 1000;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise(resolve => setTimeout(resolve, delay));
};

// Função para simular probabilidade de erro
export const shouldSimulateError = (endpoint?: string): boolean => {
  // Em modo de desenvolvimento, verificar se há um controle manual de erros
  const isDevelopment = import.meta.env.MODE === 'development';
  
  if (isDevelopment) {
    // Permitir sobrescrever comportamento de erros via localStorage
    const mockControl = localStorage.getItem('octo_mock_control');
    if (mockControl) {
      try {
        const config = JSON.parse(mockControl);
        
        // Verificar se há configuração específica para este endpoint
        if (endpoint && config.endpoints && config.endpoints[endpoint] !== undefined) {
          return config.endpoints[endpoint].errorRate > Math.random();
        }
        
        // Verificar se há uma taxa global configurada
        if (config.globalErrorRate !== undefined) {
          return config.globalErrorRate > Math.random();
        }
      } catch (e) {
        console.warn('Erro ao ler configuração de mock do localStorage', e);
      }
    }
    
    // Para endpoints de guias, implementamos uma estratégia especial
    if (endpoint && endpoint.includes('guides')) {
      // Verificar se já tivemos erros recentes para este endpoint
      const guidesErrorKey = `mock_guides_error_${endpoint}`;
      const storedError = localStorage.getItem(guidesErrorKey);
      
      if (storedError) {
        // Já temos um erro persistente, não gerar novo erro
        // isso evita ciclos de falha constantes
        return false;
      }
      
      // Taxa reduzida de erro para guides (1%)
      return Math.random() < 0.01;
    }
  }
  
  // Comportamento padrão baseado na configuração global
  return Math.random() < (API_ENV.MOCK_ERROR_RATE || 0.05);
};

// Usuários mock
export const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    name: 'Admin OCTO',
    email: 'admin@octo.org.br',
    role: UserRole.ADMIN,
    profilePicture: 'https://i.pravatar.cc/150?u=admin',
    phone: '+55 11 98765-4321',
    createdAt: '2024-01-15T08:30:00Z',
    lastLogin: '2025-02-28T14:22:10Z',
    bio: 'Administrador do portal OCTO, focado em acessibilidade e inclusão digital.',
    company: 'OCTO Brasil',
    position: 'Coordenador de Tecnologia',
    location: 'São Paulo, SP',
    website: 'https://octo.org.br',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/adminocto',
      github: 'https://github.com/adminocto',
      twitter: 'https://twitter.com/adminocto'
    },
    interests: ['Acessibilidade', 'Inclusão', 'Neurodiversidade', 'Desenvolvimento Web'],
    skills: ['Gestão de Projetos', 'Desenvolvimento Frontend', 'UX/UI', 'Acessibilidade Digital'],
    preferences: {
      theme: 'light',
      notifications: true,
      newsletter: true,
      language: 'pt-BR'
    }
  },
  {
    id: '2',
    name: 'Usuário Teste',
    email: 'usuario@teste.com',
    role: UserRole.USER,
    profilePicture: 'https://i.pravatar.cc/150?u=user',
    phone: '+55 21 99876-5432',
    createdAt: '2024-02-20T10:15:00Z',
    lastLogin: '2025-02-25T09:45:32Z',
    bio: 'Estudante de pedagogia interessado em neurodiversidade e educação inclusiva.',
    location: 'Rio de Janeiro, RJ',
    interests: ['Educação Inclusiva', 'TDAH', 'Autismo'],
    preferences: {
      theme: 'system',
      notifications: false,
      newsletter: true,
      language: 'pt-BR'
    }
  },
  {
    id: '3',
    name: 'Profissional OCTO',
    email: 'profissional@octo.org.br',
    role: UserRole.PROFESSIONAL,
    profilePicture: 'https://i.pravatar.cc/150?u=pro',
    phone: '+55 31 98765-1234',
    createdAt: '2024-01-10T14:20:00Z',
    lastLogin: '2025-02-27T16:30:15Z',
    bio: 'Psicóloga especializada em neurodiversidade, com foco em TDAH e TEA.',
    company: 'Clínica Neurodivers',
    position: 'Psicóloga Clínica',
    location: 'Belo Horizonte, MG',
    website: 'https://clinicaneurodivers.com.br',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/psicologa',
      instagram: 'https://instagram.com/psicologa_neuro'
    },
    interests: ['TDAH', 'TEA', 'Neurodiversidade', 'Psicologia'],
    skills: ['Avaliação Neuropsicológica', 'Terapia Cognitivo-Comportamental', 'Intervenção Precoce'],
    preferences: {
      theme: 'dark',
      notifications: true,
      newsletter: true,
      language: 'pt-BR'
    }
  },
  {
    id: '4',
    name: 'Empresa Parceira',
    email: 'empresa@parceira.com.br',
    role: UserRole.COMPANY,
    profilePicture: 'https://i.pravatar.cc/150?u=company',
    phone: '+55 11 3456-7890',
    createdAt: '2024-01-05T09:00:00Z',
    lastLogin: '2025-02-26T11:20:45Z',
    bio: 'Empresa dedicada a criar ambientes de trabalho inclusivos para pessoas neurodiversas.',
    company: 'Inclusão Corporativa Ltda',
    position: 'Representante Legal',
    location: 'São Paulo, SP',
    website: 'https://inclusaocorporativa.com.br',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/inclusaocorp',
      facebook: 'https://facebook.com/inclusaocorp'
    },
    interests: ['Diversidade e Inclusão', 'Contratação Inclusiva', 'Acessibilidade'],
    skills: ['Recrutamento Inclusivo', 'Acomodações Razoáveis', 'Cultura Organizacional'],
    preferences: {
      theme: 'light',
      notifications: true,
      newsletter: false,
      language: 'pt-BR'
    }
  }
];

// Resposta de login mock
export const MOCK_AUTH: AuthResponse = {
  user: MOCK_USERS[0],
  token: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIE9DVE8iLCJpYXQiOjE2NDYzMjM2MjJ9',
    refreshToken: 'refresh-token-mock-9d321',
    expiresIn: 3600,
    tokenType: 'Bearer'
  }
};

// Artigos mock
export const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Entendendo TDAH no ambiente de trabalho',
    summary: 'Um guia para entender e acomodar pessoas com TDAH no ambiente corporativo',
    content: 'Conteúdo completo do artigo sobre TDAH...',
    author: 'Dra. Ana Silva',
    publishedAt: '2025-02-15T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1596541784961-8fc4b7cda094',
    tags: ['TDAH', 'Trabalho', 'Neurodiversidade']
  },
  {
    id: '2',
    title: 'TEA e Acessibilidade Digital',
    summary: 'Como criar interfaces digitais acessíveis para pessoas no espectro autista',
    content: 'Conteúdo completo do artigo sobre TEA e desenvolvimento web...',
    author: 'Carlos Mendes',
    publishedAt: '2025-02-10T14:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1581276879432-f2444e50357b',
    tags: ['TEA', 'Autismo', 'Acessibilidade', 'Desenvolvimento Web']
  },
  {
    id: '3',
    title: 'Dislexia: Estratégias para o ambiente educacional',
    summary: 'Técnicas efetivas para apoiar estudantes com dislexia',
    content: 'Conteúdo completo do artigo sobre dislexia em ambientes educacionais...',
    author: 'Profª. Márcia Oliveira',
    publishedAt: '2025-02-05T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    tags: ['Dislexia', 'Educação', 'Aprendizagem']
  }
];

// Cursos mock
export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Introdução à Neurodiversidade',
    description: 'Entenda o básico sobre neurodiversidade e como ela se manifesta',
    instructor: 'Dr. Roberto Campos',
    duration: '4 horas',
    level: 'Iniciante',
    imageUrl: 'https://images.unsplash.com/photo-1607275913055-a976a440dce3'
  },
  {
    id: '2',
    title: 'Inclusão no Ambiente de Trabalho',
    description: 'Práticas para criar um ambiente de trabalho inclusivo e acolhedor',
    instructor: 'Juliana Martins',
    duration: '6 horas',
    level: 'Intermediário',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
  }
];

// Newsletters mock
export const MOCK_NEWSLETTERS = [
  {
    id: '1',
    title: 'OCTO Newsletter - Fevereiro 2025',
    content: 'Novidades do mês de fevereiro...',
    sentAt: '2025-02-28T10:00:00Z'
  },
  {
    id: '2',
    title: 'OCTO Newsletter - Janeiro 2025',
    content: 'Novidades do mês de janeiro...',
    sentAt: '2025-01-31T10:00:00Z'
  }
];

// Cartilhas/Guias mock
export const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Guia para Inclusão de Pessoas com TDAH',
    description: 'Guia completo para empresas sobre como incluir pessoas com TDAH no ambiente corporativo. Inclui estratégias, recomendações e casos de sucesso.',
    category: 'Inclusão Corporativa',
    tags: ['TDAH', 'Trabalho', 'Inclusão', 'RH'],
    coverImage: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1',
    downloadUrl: '/mock-files/guia-tdah.pdf',
    fileSize: '2.4 MB',
    pageCount: 32,
    author: 'Equipe OCTO',
    publishedAt: '2025-01-15T00:00:00Z',
    lastUpdated: '2025-02-01T00:00:00Z',
    featuredContent: true
  },
  {
    id: '2',
    title: 'Cartilha sobre Deficiências Ocultas',
    description: 'Tudo o que você precisa saber sobre deficiências não aparentes e como identificar e apoiar pessoas que as possuem.',
    category: 'Conscientização',
    tags: ['Deficiências Ocultas', 'Awareness', 'Educação'],
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42',
    downloadUrl: '/mock-files/cartilha-deficiencias-ocultas.pdf',
    fileSize: '1.8 MB',
    pageCount: 24,
    author: 'Dra. Paula Mendes',
    publishedAt: '2024-11-20T00:00:00Z',
    featuredContent: false
  },
  {
    id: '3',
    title: 'Manual de Acessibilidade Digital',
    description: 'Guia prático para desenvolvedores e designers sobre como criar produtos digitais acessíveis para todos os usuários.',
    category: 'Acessibilidade Digital',
    tags: ['Acessibilidade', 'Design', 'Desenvolvimento', 'UX'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    downloadUrl: '/mock-files/manual-acessibilidade-digital.pdf',
    fileSize: '3.5 MB',
    pageCount: 48,
    author: 'Carlos Silva e Amanda Torres',
    publishedAt: '2025-01-05T00:00:00Z',
    lastUpdated: '2025-02-10T00:00:00Z',
    featuredContent: true
  },
  {
    id: '4',
    title: 'Guia para Pais de Crianças Neurodiversas',
    description: 'Um guia completo para ajudar pais a entender e apoiar o desenvolvimento de crianças neurodiversas.',
    category: 'Família',
    tags: ['Pais', 'Família', 'Crianças', 'Desenvolvimento'],
    coverImage: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e',
    downloadUrl: '/mock-files/guia-pais-neurodiversos.pdf',
    fileSize: '2.2 MB',
    pageCount: 36,
    author: 'Dra. Mariana Costa',
    publishedAt: '2024-12-10T00:00:00Z',
    featuredContent: false
  },
  {
    id: '5',
    title: 'Cartilha sobre Dislexia em Ambientes Educacionais',
    description: 'Material informativo para educadores sobre como identificar e apoiar alunos com dislexia.',
    category: 'Educação',
    tags: ['Dislexia', 'Educação', 'Professores'],
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    downloadUrl: '/mock-files/cartilha-dislexia-educacao.pdf',
    fileSize: '2.0 MB',
    pageCount: 28,
    author: 'Prof. Ricardo Almeida',
    publishedAt: '2024-10-15T00:00:00Z',
    lastUpdated: '2024-11-20T00:00:00Z',
    featuredContent: false
  }
];

// Notícias mock
export const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'OCTO lança novo programa de capacitação para empresas',
    slug: 'octo-lanca-novo-programa-capacitacao-empresas',
    headline: 'Programa vai capacitar RHs de empresas para contratação de pessoas neurodiversas',
    content: 'A OCTO acaba de lançar um programa inovador que visa capacitar profissionais de Recursos Humanos para identificar, contratar e reter talentos neurodiversos. O programa, chamado "Neurodiversidade na Prática", terá início em março de 2025 e contará com módulos online e presenciais.\n\n"Queremos que as empresas entendam que a neurodiversidade não é apenas uma questão de inclusão, mas também de vantagem competitiva", afirma a coordenadora do programa, Dra. Ana Silva.\n\nAs inscrições já estão abertas e podem ser feitas pelo site da OCTO.',
    author: 'Equipe OCTO',
    publishedAt: '2025-02-28T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60',
    tags: ['Capacitação', 'Empresas', 'RH', 'Neurodiversidade'],
    category: 'Institucional',
    readTimeMinutes: 4,
    featured: true
  },
  {
    id: '2',
    title: 'Estudo revela desafios de pessoas com TDAH no mercado de trabalho',
    slug: 'estudo-revela-desafios-tdah-mercado-trabalho',
    headline: 'Pesquisa conduzida pela OCTO mostra que 78% das pessoas com TDAH já sofreram preconceito no ambiente profissional',
    content: 'Um estudo recente conduzido pela OCTO em parceria com a Universidade Federal revelou que 78% das pessoas com TDAH já sofreram algum tipo de preconceito ou discriminação no ambiente de trabalho.\n\nA pesquisa, que entrevistou mais de 500 profissionais com diagnóstico de TDAH, também apontou que apenas 23% das empresas oferecem algum tipo de acomodação ou suporte específico para esses colaboradores.\n\n"Esses números são alarmantes e mostram que ainda temos um longo caminho pela frente", comenta o Dr. Roberto Campos, coordenador da pesquisa.',
    author: 'Dr. Roberto Campos',
    publishedAt: '2025-02-25T14:30:00Z',
    updatedAt: '2025-02-26T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmtpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60',
    tags: ['TDAH', 'Trabalho', 'Pesquisa', 'Discriminação'],
    category: 'Pesquisa',
    readTimeMinutes: 6,
    relatedArticles: ['3', '5'],
    views: 1245
  },
  {
    id: '3',
    title: 'Governo anuncia novas diretrizes para inclusão de pessoas neurodiversas',
    slug: 'governo-anuncia-diretrizes-inclusao-neurodiversos',
    headline: 'Medidas incluem cotas específicas para pessoas com TEA, TDAH e outras condições em concursos públicos',
    content: 'O governo federal anunciou hoje um conjunto de novas diretrizes para promover a inclusão de pessoas neurodiversas no serviço público. Entre as medidas estão a criação de cotas específicas para pessoas com Transtorno do Espectro Autista (TEA), TDAH e outras condições em concursos públicos.\n\nAlém disso, serão implementados programas de capacitação para gestores públicos e adaptações nos ambientes de trabalho. "Esta é uma conquista histórica para a comunidade neurodiversa", celebra Maria Santos, diretora da OCTO.',
    author: 'Maria Santos',
    publishedAt: '2025-02-20T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z292ZXJubWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
    tags: ['Governo', 'Políticas Públicas', 'Inclusão', 'Concursos'],
    category: 'Políticas Públicas',
    readTimeMinutes: 5,
    featured: false
  },
  {
    id: '4',
    title: 'Nova cartilha sobre TEA lançada pela OCTO bate recorde de downloads',
    slug: 'cartilha-tea-octo-recorde-downloads',
    headline: 'Material gratuito sobre Transtorno do Espectro Autista já foi baixado mais de 50 mil vezes em apenas uma semana',
    content: 'A nova cartilha sobre Transtorno do Espectro Autista (TEA) lançada pela OCTO na semana passada já bateu o recorde de downloads, com mais de 50 mil downloads em apenas sete dias.\n\nO material, que aborda desde os sinais de identificação precoce até estratégias para inclusão escolar e profissional, está disponível gratuitamente no site da organização.\n\n"Estamos impressionados com a repercussão. Isso mostra o quanto existe uma demanda por informação de qualidade sobre o tema", comenta Cláudia Rocha, coordenadora de conteúdos da OCTO.',
    author: 'Cláudia Rocha',
    publishedAt: '2025-02-18T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG93bmxvYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60',
    tags: ['TEA', 'Autismo', 'Cartilha', 'Educação'],
    category: 'Publicações',
    readTimeMinutes: 3,
    relatedArticles: ['5'],
    views: 2890
  },
  {
    id: '5',
    title: 'OCTO promoverá curso gratuito sobre dislexia para educadores',
    slug: 'octo-curso-gratuito-dislexia-educadores',
    headline: 'Iniciativa visa capacitar professores para identificar e apoiar alunos com dislexia',
    content: 'A OCTO anunciou hoje que realizará um curso gratuito sobre dislexia voltado para educadores de todo o Brasil. O curso, que será realizado em formato online, tem como objetivo capacitar professores para identificar sinais precoces de dislexia e implementar estratégias pedagógicas adequadas.\n\n"Muitos alunos com dislexia são erroneamente rotulados como desinteressados ou pouco inteligentes, quando na verdade precisam apenas de abordagens pedagógicas diferentes", explica o Prof. Ricardo Almeida, que coordenará o curso.\n\nAs inscrições estarão abertas a partir da próxima semana.',
    author: 'Prof. Ricardo Almeida',
    publishedAt: '2025-02-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGVkdWNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60',
    tags: ['Dislexia', 'Educação', 'Capacitação', 'Professores'],
    category: 'Educação',
    readTimeMinutes: 4,
    featured: false,
    views: 1560
  }
];

// Ferramentas mock
export const MOCK_TOOLS = [
  {
    id: '1',
    name: 'Avaliador de Acessibilidade Digital',
    description: 'Ferramenta para avaliar a acessibilidade de websites',
    url: 'https://ferramentas.octo.org.br/avaliador-acessibilidade'
  },
  {
    id: '2',
    name: 'Checklist de Inclusão',
    description: 'Lista de verificação para avaliar práticas inclusivas em sua organização',
    url: 'https://ferramentas.octo.org.br/checklist-inclusao'
  }
];

// Vídeos mock
export const MOCK_VIDEOS = [
  {
    id: '1',
    title: 'Entendendo a Neurodiversidade',
    description: 'Uma introdução à neurodiversidade e seu impacto na sociedade',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611',
    duration: '12:34'
  },
  {
    id: '2',
    title: 'Depoimento: Minha Jornada com TDAH',
    description: 'História pessoal de superação e adaptação',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a',
    duration: '18:22'
  }
];

// Resposta mock do formulário de contato
export const MOCK_CONTACT_RESPONSE: ContactFormResponse = {
  ticketId: 'OCT-' + Math.floor(100000 + Math.random() * 900000),
  estimatedResponseTime: '24 horas'
};

// Helper para criar uma resposta paginada
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  };
}

// Helper para criar uma resposta API padrão
export function createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    data,
    success: true,
    message
  };
} 