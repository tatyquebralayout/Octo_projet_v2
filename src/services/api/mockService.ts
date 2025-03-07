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
  createPaginatedResponse,
  createApiResponse
} from './mockData';
import { ENDPOINTS } from './config';
import { ApiResponse, AuthRequest, AuthResponse, PaginatedResponse, QueryParams } from './types';

// Função para simular atraso de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    await delay(500);
    
    const { email, password } = data;
    
    // Simula validação de credenciais
    if (email !== 'admin@octo.org.br' || password !== 'octo123') {
      throw new MockApiError('Credenciais inválidas', 401, 'AUTH_INVALID_CREDENTIALS');
    }
    
    return createApiResponse(MOCK_AUTH, 'Login realizado com sucesso');
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    await delay(300);
    return createApiResponse(null, 'Logout realizado com sucesso');
  },
  
  refresh: async (): Promise<ApiResponse<{ accessToken: string, expiresIn: number }>> => {
    await delay(300);
    return createApiResponse({
      accessToken: 'novo-token-' + Date.now(),
      expiresIn: 3600
    }, 'Token atualizado com sucesso');
  }
};

// Serviço de mock para usuários
export const usersMockService = {
  getProfile: async (): Promise<ApiResponse<typeof MOCK_USERS[0]>> => {
    await delay(400);
    return createApiResponse(MOCK_USERS[0], 'Perfil carregado com sucesso');
  },
  
  getAll: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_USERS[0]>>> => {
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_USERS, page, limit),
      'Usuários carregados com sucesso'
    );
  },
  
  getById: async (id: string): Promise<ApiResponse<typeof MOCK_USERS[0]>> => {
    await delay(400);
    
    const user = MOCK_USERS.find(user => user.id === id);
    
    if (!user) {
      throw new MockApiError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    return createApiResponse(user, 'Usuário carregado com sucesso');
  },
  
  update: async (id: string, data: Partial<typeof MOCK_USERS[0]>): Promise<ApiResponse<typeof MOCK_USERS[0]>> => {
    await delay(500);
    
    const userIndex = MOCK_USERS.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new MockApiError('Usuário não encontrado', 404, 'USER_NOT_FOUND');
    }
    
    // Cria uma cópia atualizada do usuário
    const updatedUser = { ...MOCK_USERS[userIndex], ...data };
    
    return createApiResponse(updatedUser, 'Usuário atualizado com sucesso');
  },
  
  delete: async (id: string): Promise<ApiResponse<null>> => {
    await delay(500);
    
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
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_ARTICLES, page, limit),
      'Artigos carregados com sucesso'
    );
  },
  
  getCourses: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_COURSES[0]>>> => {
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_COURSES, page, limit),
      'Cursos carregados com sucesso'
    );
  },
  
  getNewsletters: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_NEWSLETTERS[0]>>> => {
    await delay(600);
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
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_GUIDES, page, limit),
      'Guias carregados com sucesso'
    );
  },
  
  getTools: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_TOOLS[0]>>> => {
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_TOOLS, page, limit),
      'Ferramentas carregadas com sucesso'
    );
  },
  
  getVideos: async (params?: QueryParams): Promise<ApiResponse<PaginatedResponse<typeof MOCK_VIDEOS[0]>>> => {
    await delay(600);
    const page = params?.page ? Number(params.page) : 1;
    const limit = params?.limit ? Number(params.limit) : 10;
    
    return createApiResponse(
      createPaginatedResponse(MOCK_VIDEOS, page, limit),
      'Vídeos carregados com sucesso'
    );
  }
};

// Mapeamento de endpoints para serviços mock
export const mockServices = {
  [ENDPOINTS.AUTH.LOGIN]: authMockService.login,
  [ENDPOINTS.AUTH.LOGOUT]: authMockService.logout,
  [ENDPOINTS.AUTH.REFRESH]: authMockService.refresh,
  
  [ENDPOINTS.USERS.PROFILE]: usersMockService.getProfile,
  [ENDPOINTS.USERS.BASE]: usersMockService.getAll,
  
  [ENDPOINTS.CONTENT.ARTICLES]: contentMockService.getArticles,
  [ENDPOINTS.CONTENT.COURSES]: contentMockService.getCourses,
  [ENDPOINTS.CONTENT.NEWSLETTERS]: contentMockService.getNewsletters,
  
  [ENDPOINTS.RESOURCES.GUIDES]: resourcesMockService.getGuides,
  [ENDPOINTS.RESOURCES.TOOLS]: resourcesMockService.getTools,
  [ENDPOINTS.RESOURCES.VIDEOS]: resourcesMockService.getVideos,
}; 