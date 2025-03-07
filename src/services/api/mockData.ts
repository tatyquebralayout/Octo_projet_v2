/**
 * Dados de mock para o desenvolvimento
 * Estes dados são usados apenas durante o desenvolvimento
 */
import { User, UserRole, ApiResponse, PaginatedResponse, AuthResponse } from './types';

// Usuários mock
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin OCTO',
    email: 'admin@octo.org.br',
    role: UserRole.ADMIN,
    profilePicture: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'Usuário Teste',
    email: 'usuario@teste.com',
    role: UserRole.USER,
    profilePicture: 'https://i.pravatar.cc/150?u=user'
  },
  {
    id: '3',
    name: 'Profissional OCTO',
    email: 'profissional@octo.org.br',
    role: UserRole.PROFESSIONAL,
    profilePicture: 'https://i.pravatar.cc/150?u=pro'
  },
  {
    id: '4',
    name: 'Empresa Parceira',
    email: 'empresa@parceira.com.br',
    role: UserRole.COMPANY,
    profilePicture: 'https://i.pravatar.cc/150?u=company'
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

// Guias mock
export const MOCK_GUIDES = [
  {
    id: '1',
    title: 'Guia para Inclusão de Pessoas com TDAH',
    description: 'Guia completo para empresas sobre como incluir pessoas com TDAH',
    downloadUrl: '/mock-files/guia-tdah.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1'
  },
  {
    id: '2',
    title: 'Cartilha sobre Deficiências Ocultas',
    description: 'Tudo o que você precisa saber sobre deficiências não aparentes',
    downloadUrl: '/mock-files/cartilha-deficiencias-ocultas.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42'
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
    message,
    success: true
  };
} 