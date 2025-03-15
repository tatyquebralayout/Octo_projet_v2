/**
 * Tipos centralizados para configurações do sistema
 * Parte do plano de refatoração estrutural para melhorar a consistência de tipos
 */

// Ambiente da aplicação
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

// Configurações gerais da aplicação
export interface AppConfig {
  environment: Environment;
  apiUrl: string;
  sentryDsn?: string;
  analyticsId?: string;
  version: string;
  buildNumber?: string;
  features: FeatureFlags;
  mockApi: boolean;
  debug: boolean;
}

// Flags para recursos que podem ser ativados/desativados
export interface FeatureFlags {
  enablePwa: boolean;
  enableNotifications: boolean;
  enableOfflineMode: boolean;
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  useReducedMotion: boolean | 'system';
  enableExperimentalFeatures: boolean;
  darkMode: 'light' | 'dark' | 'system';
}

// Configurações de tema
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  reducedMotion: boolean | 'system';
  spacing: 'normal' | 'compact' | 'comfortable';
  cornerRadius: 'normal' | 'rounded' | 'sharp';
  fontFamily: 'default' | 'sans-serif' | 'serif';
}

// Configurações de cache
export interface CacheConfig {
  apiCache: {
    enabled: boolean;
    maxAge: number; // Em milissegundos
    staleWhileRevalidate: boolean;
  };
  assets: {
    cacheControl: string;
    maxAge: number; // Em segundos
  };
  localStorage: {
    prefix: string;
    version: string;
  };
}

// Configurações de performance
export interface PerformanceConfig {
  webVitalsThresholds: {
    LCP: number; // Em milissegundos
    FID: number; // Em milissegundos
    CLS: number; // Valor adimensional
    TTFB: number; // Em milissegundos
    FCP: number; // Em milissegundos
  };
  lazyLoadImages: boolean;
  lazyLoadComponents: boolean;
  prefetchRoutes: boolean;
  prefetchTimeout: number; // Em milissegundos
  imageOptimization: boolean;
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
}

// Configurações de PWA
export interface PwaConfig {
  enabled: boolean;
  installPrompt: boolean;
  updatePrompt: boolean;
  offlineMode: boolean;
  cacheStrategy: 'network-first' | 'cache-first' | 'stale-while-revalidate';
  cacheDuration: number; // Em milissegundos
  staticAssets: string[];
  dynamicAssets: string[];
  apiRoutes: string[];
} 