/**
 * Serviço de mock para desenvolvimento
 * Simula respostas da API para testes e desenvolvimento
 */
import { 
  MOCK_USERS, 
  MOCK_AUTH, 
  MOCK_ARTICLES, 
  MOCK_COURSES, 
  MOCK_NEWSLETTERS,
  MOCK_GUIDES,
  MOCK_TOOLS, 
  MOCK_VIDEOS,
  MOCK_NEWS,
  MOCK_CONTACT_RESPONSE,
  createPaginatedResponse,
  createApiResponse,
  randomDelay,
  shouldSimulateError
} from './mockData';
import { ENDPOINTS } from './config';
import { 
  ApiResponse, 
  AuthRequest, 
  AuthResponse, 
  PaginatedResponse, 
  QueryParams, 
  ContactFormData, 
  ContactFormResponse,
  ProfileUpdateRequest,
  User,
  UserProfile,
  Guide,
  News
} from './types';

// Classes de erro para simular erros da API
class MockApiError extends Error {
  status: number;
  code: string;
  
  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'MockApiError';
    this.status = status;
    this.code = code;
  }
}

// Serviço de mock para autenticação
export const authMockService = {
  login: async (data: AuthRequest): Promise<ApiResponse<AuthResponse>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao processar a requisição', 500, 'SERVER_ERROR');
    }
    
    const { email, password } = data;
    
    // Simula validação de credenciais
    if (email !== 'admin@octo.org.br' || password !== 'octo123') {
      throw new MockApiError('Credenciais inválidas', 401, 'AUTH_INVALID_CREDENTIALS');
    }
    
    return createApiResponse(MOCK_AUTH, 'Login realizado com sucesso');
  },
  
  register: async (data: any): Promise<ApiResponse<AuthResponse>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao processar a requisição', 500, 'SERVER_ERROR');
    }
    
    // Validação de campos
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      throw new MockApiError('Todos os campos são obrigatórios', 400, 'VALIDATION_ERROR');
    }
    
    // Validação de e-mail já existente
    if (data.email === 'admin@octo.org.br') {
      throw new MockApiError('E-mail já cadastrado', 400, 'EMAIL_ALREADY_EXISTS');
    }
    
    // Validação de senha e confirmação
    if (data.password !== data.confirmPassword) {
      throw new MockApiError('As senhas não correspondem', 400, 'PASSWORD_MISMATCH');
    }
    
    // Validação de termos
    if (!data.termsAccepted) {
      throw new MockApiError('Você deve aceitar os termos de uso', 400, 'TERMS_NOT_ACCEPTED');
    }
    
    // Simula criação de usuário
    const mockUser = {
      ...MOCK_USERS[1],
      id: 'new-' + Date.now(),
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString()
    };
    
    return createApiResponse({
      user: mockUser,
      token: {
        accessToken: 'new-token-' + Date.now(),
        refreshToken: 'new-refresh-token-' + Date.now(),
        expiresIn: 3600,
        tokenType: 'Bearer'
      }
    }, 'Cadastro realizado com sucesso');
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao processar a requisição', 500, 'SERVER_ERROR');
    }
    
    return createApiResponse(null, 'Logout realizado com sucesso');
  },
  
  refresh: async (): Promise<ApiResponse<{ accessToken: string, expiresIn: number }>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao processar a requisição', 500, 'SERVER_ERROR');
    }
    
    return createApiResponse({
      accessToken: 'novo-token-' + Date.now(),
      expiresIn: 3600
    }, 'Token atualizado com sucesso');
  },
  
  changePassword: async (data: { currentPassword: string, newPassword: string, confirmPassword: string }): Promise<ApiResponse<null>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao processar a requisição', 500, 'SERVER_ERROR');
    }
    
    // Validação de senha atual
    if (data.currentPassword !== 'octo123') {
      throw new MockApiError('Senha atual incorreta', 400, 'INVALID_CURRENT_PASSWORD');
    }
    
    // Validação de nova senha e confirmação
    if (data.newPassword !== data.confirmPassword) {
      throw new MockApiError('As senhas não correspondem', 400, 'PASSWORD_MISMATCH');
    }
    
    return createApiResponse(null, 'Senha alterada com sucesso');
  }
};

// Serviço de mock para usuários
export const usersMockService = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar perfil', 500, 'SERVER_ERROR');
    }
    
    return createApiResponse(MOCK_USERS[0], 'Perfil carregado com sucesso');
  },
  
  getAll: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<UserProfile>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar usuários', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_USERS, page, limit),
      'Usuários carregados com sucesso'
    );
  },
  
  getById: async (id: string): Promise<ApiResponse<UserProfile>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar usuário', 500, 'SERVER_ERROR');
    }
    
    const user = MOCK_USERS.find(user => user.id === id);
    
    if (!user) {
      throw new MockApiError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    return createApiResponse(user, 'Usuário carregado com sucesso');
  },
  
  update: async (id: string, data: ProfileUpdateRequest): Promise<ApiResponse<UserProfile>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao atualizar usuário', 500, 'SERVER_ERROR');
    }
    
    const userIndex = MOCK_USERS.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new MockApiError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    // Cria uma cópia atualizada do usuário
    const updatedUser = { ...MOCK_USERS[userIndex], ...data };
    
    // Atualiza campos aninhados como preferências e links sociais
    if (data.preferences) {
      updatedUser.preferences = { ...updatedUser.preferences, ...data.preferences };
    }
    
    if (data.socialLinks) {
      updatedUser.socialLinks = { ...updatedUser.socialLinks, ...data.socialLinks };
    }
    
    return createApiResponse(updatedUser, 'Usuário atualizado com sucesso');
  },
  
  delete: async (id: string): Promise<ApiResponse<null>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao remover usuário', 500, 'SERVER_ERROR');
    }
    
    const userExists = MOCK_USERS.some(user => user.id === id);
    
    if (!userExists) {
      throw new MockApiError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    return createApiResponse(null, 'Usuário removido com sucesso');
  }
};

// Serviço de mock para conteúdo
export const contentMockService = {
  getArticles: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_ARTICLES[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar artigos', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_ARTICLES, page, limit),
      'Artigos carregados com sucesso'
    );
  },
  
  getCourses: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_COURSES[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar cursos', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_COURSES, page, limit),
      'Cursos carregados com sucesso'
    );
  },
  
  getNewsletters: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_NEWSLETTERS[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar newsletters', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_NEWSLETTERS, page, limit),
      'Newsletters carregadas com sucesso'
    );
  }
};

// Serviço de mock para recursos
export const resourcesMockService = {
  getGuides: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_GUIDES[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar guias', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_GUIDES, page, limit),
      'Guias carregados com sucesso'
    );
  },
  
  getTools: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_TOOLS[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar ferramentas', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_TOOLS, page, limit),
      'Ferramentas carregadas com sucesso'
    );
  },
  
  getVideos: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_VIDEOS[0]>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar vídeos', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_VIDEOS, page, limit),
      'Vídeos carregados com sucesso'
    );
  }
};

// Serviço de mock para formulário de contato
export const contactMockService = {
  submitForm: async (data: ContactFormData): Promise<ApiResponse<ContactFormResponse>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao enviar formulário', 500, 'SERVER_ERROR');
    }
    
    // Validação de campos obrigatórios
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new MockApiError('Todos os campos obrigatórios devem ser preenchidos', 400, 'VALIDATION_ERROR');
    }
    
    // Validação simples de e-mail
    if (!data.email.includes('@') || !data.email.includes('.')) {
      throw new MockApiError('E-mail inválido', 400, 'INVALID_EMAIL');
    }
    
    // Validação de termos
    if (!data.termsAccepted) {
      throw new MockApiError('Você deve aceitar os termos de uso', 400, 'TERMS_NOT_ACCEPTED');
    }
    
    // Gera um ID de ticket único
    const ticketId = 'OCT-' + Math.floor(100000 + Math.random() * 900000);
    
    return createApiResponse({
      ticketId,
      estimatedResponseTime: '24 horas'
    }, 'Formulário enviado com sucesso');
  },
  
  subscribe: async (data: { email: string, name?: string }): Promise<ApiResponse<{ subscribed: boolean }>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao realizar inscrição', 500, 'SERVER_ERROR');
    }
    
    // Validação de e-mail
    if (!data.email || !data.email.includes('@') || !data.email.includes('.')) {
      throw new MockApiError('E-mail inválido', 400, 'INVALID_EMAIL');
    }
    
    return createApiResponse({ subscribed: true }, 'Inscrição realizada com sucesso');
  }
};

// Serviço de mock para cartilhas/guias
export const guidesMockService = {
  getAllGuides: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Guide>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar cartilhas', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    // Filtrar por categoria se especificado
    let filteredGuides = [...MOCK_GUIDES];
    if (params?.category) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.category.toLowerCase() === params.category?.toString().toLowerCase()
      );
    }
    
    // Filtrar por tag se especificado
    if (params?.tag) {
      const tag = params.tag.toString().toLowerCase();
      filteredGuides = filteredGuides.filter(guide => 
        guide.tags.some(t => t.toLowerCase() === tag)
      );
    }
    
    return createApiResponse(
      createPaginatedResponse(filteredGuides, page, limit),
      'Cartilhas carregadas com sucesso'
    );
  },
  
  getFeaturedGuides: async (): Promise<ApiResponse<Guide[]>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar cartilhas em destaque', 500, 'SERVER_ERROR');
    }
    
    const featured = MOCK_GUIDES.filter(guide => guide.featuredContent);
    
    return createApiResponse(featured, 'Cartilhas em destaque carregadas com sucesso');
  },
  
  getGuideById: async (id: string): Promise<ApiResponse<Guide>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar cartilha', 500, 'SERVER_ERROR');
    }
    
    const guide = MOCK_GUIDES.find(guide => guide.id === id);
    
    if (!guide) {
      throw new MockApiError('Cartilha não encontrada', 404, 'GUIDE_NOT_FOUND');
    }
    
    return createApiResponse(guide, 'Cartilha carregada com sucesso');
  },
  
  getGuidesByCategory: async (category: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Guide>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar cartilhas por categoria', 500, 'SERVER_ERROR');
    }
    
    const filteredGuides = MOCK_GUIDES.filter(guide => 
      guide.category.toLowerCase() === category.toLowerCase()
    );
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(filteredGuides, page, limit),
      'Cartilhas por categoria carregadas com sucesso'
    );
  },
  
  downloadGuide: async (id: string): Promise<ApiResponse<{ downloadUrl: string }>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao gerar link para download', 500, 'SERVER_ERROR');
    }
    
    const guide = MOCK_GUIDES.find(guide => guide.id === id);
    
    if (!guide) {
      throw new MockApiError('Cartilha não encontrada', 404, 'GUIDE_NOT_FOUND');
    }
    
    return createApiResponse({ downloadUrl: guide.downloadUrl }, 'Link de download gerado com sucesso');
  }
};

// Serviço de mock para notícias
export const newsMockService = {
  getAllNews: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<News>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícias', 500, 'SERVER_ERROR');
    }
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    // Filtrar por categoria se especificado
    let filteredNews = [...MOCK_NEWS];
    if (params?.category) {
      filteredNews = filteredNews.filter(news => 
        news.category.toLowerCase() === params.category?.toString().toLowerCase()
      );
    }
    
    // Filtrar por tag se especificado
    if (params?.tag) {
      const tag = params.tag.toString().toLowerCase();
      filteredNews = filteredNews.filter(news => 
        news.tags.some(t => t.toLowerCase() === tag)
      );
    }
    
    return createApiResponse(
      createPaginatedResponse(filteredNews, page, limit),
      'Notícias carregadas com sucesso'
    );
  },
  
  getFeaturedNews: async (): Promise<ApiResponse<News[]>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícias em destaque', 500, 'SERVER_ERROR');
    }
    
    const featured = MOCK_NEWS.filter(news => news.featured);
    
    return createApiResponse(featured, 'Notícias em destaque carregadas com sucesso');
  },
  
  getNewsBySlug: async (slug: string): Promise<ApiResponse<News>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícia', 500, 'SERVER_ERROR');
    }
    
    const news = MOCK_NEWS.find(news => news.slug === slug);
    
    if (!news) {
      throw new MockApiError('Notícia não encontrada', 404, 'NEWS_NOT_FOUND');
    }
    
    // Incrementar visualizações
    if (news.views !== undefined) {
      news.views += 1;
    }
    
    return createApiResponse(news, 'Notícia carregada com sucesso');
  },
  
  getNewsByCategory: async (category: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<News>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícias por categoria', 500, 'SERVER_ERROR');
    }
    
    const filteredNews = MOCK_NEWS.filter(news => 
      news.category.toLowerCase() === category.toLowerCase()
    );
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(filteredNews, page, limit),
      'Notícias por categoria carregadas com sucesso'
    );
  },
  
  getNewsByTag: async (tag: string, params?: QueryParams): Promise<ApiResponse<PaginatedResponse<News>>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícias por tag', 500, 'SERVER_ERROR');
    }
    
    const filteredNews = MOCK_NEWS.filter(news => 
      news.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(filteredNews, page, limit),
      'Notícias por tag carregadas com sucesso'
    );
  },
  
  getRelatedNews: async (id: string): Promise<ApiResponse<News[]>> => {
    await randomDelay();
    
    // Simular erro aleatório
    if (shouldSimulateError()) {
      throw new MockApiError('Erro ao carregar notícias relacionadas', 500, 'SERVER_ERROR');
    }
    
    const news = MOCK_NEWS.find(news => news.id === id);
    
    if (!news) {
      throw new MockApiError('Notícia não encontrada', 404, 'NEWS_NOT_FOUND');
    }
    
    let relatedNews: News[] = [];
    
    // Se a notícia tiver artigos relacionados definidos explicitamente
    if (news.relatedArticles && news.relatedArticles.length > 0) {
      relatedNews = MOCK_NEWS.filter(n => news.relatedArticles?.includes(n.id));
    } else {
      // Caso contrário, relacionar por tags ou categoria
      relatedNews = MOCK_NEWS.filter(n => 
        n.id !== id && (
          n.category === news.category || 
          n.tags.some(tag => news.tags.includes(tag))
        )
      ).slice(0, 3);
    }
    
    return createApiResponse(relatedNews, 'Notícias relacionadas carregadas com sucesso');
  }
};

// Mapeamento de endpoints para serviços mock
// Criando constantes para endpoints com funções
const GUIDE_DOWNLOAD_ENDPOINT = '/guides/:id/download';
const NEWS_BY_SLUG_ENDPOINT = '/news/:slug';
const NEWS_BY_CATEGORY_ENDPOINT = '/news/category/:category';
const NEWS_BY_TAG_ENDPOINT = '/news/tag/:tag';
const NEWS_RELATED_ENDPOINT = '/news/:id/related';

export const mockServices = {
  // Autenticação
  [ENDPOINTS.AUTH.LOGIN]: authMockService.login,
  [ENDPOINTS.AUTH.LOGOUT]: authMockService.logout,
  [ENDPOINTS.AUTH.REFRESH]: authMockService.refresh,
  [ENDPOINTS.AUTH.REGISTER]: authMockService.register,
  [ENDPOINTS.USERS.CHANGE_PASSWORD as string]: authMockService.changePassword,
  
  // Usuários
  [ENDPOINTS.USERS.PROFILE]: usersMockService.getProfile,
  [ENDPOINTS.USERS.UPDATE_PROFILE as string]: usersMockService.update,
  [ENDPOINTS.USERS.BASE]: usersMockService.getAll,
  
  // Conteúdo
  [ENDPOINTS.CONTENT.ARTICLES]: contentMockService.getArticles,
  [ENDPOINTS.CONTENT.COURSES]: contentMockService.getCourses,
  [ENDPOINTS.CONTENT.NEWSLETTERS]: contentMockService.getNewsletters,
  
  // Recursos
  [ENDPOINTS.RESOURCES.GUIDES]: resourcesMockService.getGuides,
  [ENDPOINTS.RESOURCES.TOOLS]: resourcesMockService.getTools,
  [ENDPOINTS.RESOURCES.VIDEOS]: resourcesMockService.getVideos,
  
  // Contato
  [ENDPOINTS.CONTACT.SUBMIT as string]: contactMockService.submitForm,
  [ENDPOINTS.CONTACT.SUBSCRIBE as string]: contactMockService.subscribe,
  
  // Cartilhas
  [ENDPOINTS.GUIDES.BASE as string]: guidesMockService.getAllGuides,
  [ENDPOINTS.GUIDES.FEATURED as string]: guidesMockService.getFeaturedGuides,
  [GUIDE_DOWNLOAD_ENDPOINT]: guidesMockService.downloadGuide,
  
  // Notícias
  [ENDPOINTS.NEWS.BASE as string]: newsMockService.getAllNews,
  [ENDPOINTS.NEWS.FEATURED as string]: newsMockService.getFeaturedNews,
  [NEWS_BY_SLUG_ENDPOINT]: newsMockService.getNewsBySlug,
  [NEWS_BY_CATEGORY_ENDPOINT]: newsMockService.getNewsByCategory,
  [NEWS_BY_TAG_ENDPOINT]: newsMockService.getNewsByTag,
  [NEWS_RELATED_ENDPOINT]: newsMockService.getRelatedNews,
}; 