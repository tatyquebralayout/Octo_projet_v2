/**
 * Tipos centralizados para o sistema de notícias
 * Parte do plano de refatoração estrutural para melhorar a consistência de tipos
 */

// Tipo base para notícias
export interface NewsBase {
  id: string;
  title: string;
  slug: string;
  headline: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

// Tipo para listagem de notícias (menor, otimizado)
export interface NewsListItem extends NewsBase {
  thumbnailUrl?: string;
  readTimeMinutes: number;
  featured?: boolean;
}

// Tipo completo com conteúdo detalhado
export interface News extends NewsBase {
  content: string;
  updatedAt?: string;
  thumbnailUrl?: string;
  readTimeMinutes: number;
  relatedArticles?: string[];
  featured?: boolean;
  views?: number;
}

// Parâmetros para filtrar notícias
export interface NewsFilterParams {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  orderBy?: 'date' | 'popularity' | 'relevance';
  orderDirection?: 'asc' | 'desc';
}

// Resposta para operações com notícias
export interface NewsOperationResponse {
  success: boolean;
  message: string;
  newsId?: string;
}

// Estado local para notícias
export interface NewsState {
  news: NewsListItem[];
  featuredNews: NewsListItem[];
  currentNews: News | null;
  isLoading: boolean;
  error: Error | null;
  filters: NewsFilterParams;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Modelo de comentário em notícias
export interface NewsComment {
  id: string;
  newsId: string;
  userId: string;
  userName: string;
  userPicture?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: NewsComment[];
  hasUserLiked?: boolean;
} 