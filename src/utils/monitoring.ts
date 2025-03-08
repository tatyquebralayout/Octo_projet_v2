import * as Sentry from '@sentry/react';
import { BrowserTracing, Replay } from '@sentry/react';
import { Metric, onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Tipos para Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        non_interaction?: boolean;
        [key: string]: any;
      }
    ) => void;
  }
}

/**
 * Status do serviço de monitoramento
 */
export enum MonitoringStatus {
  NOT_INITIALIZED = 'not_initialized',
  INITIALIZED = 'initialized',
  INITIALIZATION_FAILED = 'initialization_failed',
  DISABLED = 'disabled',
}

/**
 * Configuração para monitoramento
 */
export interface MonitoringConfig {
  /** Ativar Sentry */
  enableSentry?: boolean;
  /** Ativar Web Vitals */
  enableWebVitals?: boolean;
  /** Ativar Google Analytics */
  enableGoogleAnalytics?: boolean;
  /** Habilitar logs no console */
  enableConsoleLogging?: boolean;
  /** Taxa de amostragem de traces (Sentry) */
  tracesSampleRate?: number;
  /** Taxa de amostragem de sessões replay (Sentry) */
  replaysSessionSampleRate?: number;
  /** Taxa de amostragem de erros replay (Sentry) */
  replaysOnErrorSampleRate?: number;
}

/**
 * Resultado da inicialização do monitoramento
 */
export interface MonitoringResult {
  /** Status do Sentry */
  sentryStatus: MonitoringStatus;
  /** Status do Web Vitals */
  webVitalsStatus: MonitoringStatus;
  /** Status do Google Analytics */
  gaStatus: MonitoringStatus;
  /** Logs/erros para depuração */
  logs: string[];
}

/**
 * Status global do monitoramento
 */
let monitoringStatus: MonitoringResult = {
  sentryStatus: MonitoringStatus.NOT_INITIALIZED,
  webVitalsStatus: MonitoringStatus.NOT_INITIALIZED,
  gaStatus: MonitoringStatus.NOT_INITIALIZED,
  logs: [],
};

/**
 * Configuração padrão do monitoramento
 */
const defaultConfig: MonitoringConfig = {
  enableSentry: true,
  enableWebVitals: true,
  enableGoogleAnalytics: true,
  enableConsoleLogging: true,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
};

/**
 * Adiciona log ao estado de monitoramento
 */
function addLog(message: string): void {
  monitoringStatus.logs.push(`[${new Date().toISOString()}] ${message}`);
  if (defaultConfig.enableConsoleLogging) {
    console.info(`[Monitoramento] ${message}`);
  }
}

/**
 * Inicializa o Sentry para monitoramento de erros
 */
function initializeSentry(): boolean {
  try {
    // Apenas inicializa se o DSN do Sentry existir
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!dsn) {
      addLog('Sentry não inicializado: VITE_SENTRY_DSN não definido');
      monitoringStatus.sentryStatus = MonitoringStatus.DISABLED;
      return false;
    }

    // Configuração do Sentry
    Sentry.init({
      dsn: dsn,
      integrations: [
        new BrowserTracing(),
        new Replay(),
      ],
      // Configurações de performance e sampling
      tracesSampleRate: defaultConfig.tracesSampleRate || 0.2,
      replaysSessionSampleRate: defaultConfig.replaysSessionSampleRate || 0.1,
      replaysOnErrorSampleRate: defaultConfig.replaysOnErrorSampleRate || 1.0,
      // Ambiente e release
      environment: import.meta.env.MODE || 'development',
      release: import.meta.env.VITE_APP_VERSION || '0.0.0',
      // Filtros de mensagens (ignora erros de CORS e outros problemas comuns)
      ignoreErrors: [
        'top.GLOBALS',
        'ResizeObserver loop limit exceeded',
        'Network Error',
        'Failed to fetch',
        /^Unhandled error/,
        /^ChunkLoadError/,
        /^Loading chunk/,
      ],
      // Habilitar somente em produção
      enabled: import.meta.env.PROD,
      // Retorno com contexto dos erros
      beforeSend(event) {
        // Filtra eventos para não enviar dados sensíveis ou de desenvolvimento
        if (event.exception && import.meta.env.DEV) {
          addLog(`Erro detectado (não enviado em DEV): ${event.message}`);
          return null;
        }
        return event;
      },
    });

    addLog('Sentry inicializado com sucesso');
    monitoringStatus.sentryStatus = MonitoringStatus.INITIALIZED;
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    addLog(`Erro ao inicializar Sentry: ${errorMessage}`);
    monitoringStatus.sentryStatus = MonitoringStatus.INITIALIZATION_FAILED;
    return false;
  }
}

/**
 * Inicializa o monitoramento de métricas Web Vitals
 */
function initializeWebVitals(): boolean {
  try {
    if (!defaultConfig.enableWebVitals) {
      monitoringStatus.webVitalsStatus = MonitoringStatus.DISABLED;
      return false;
    }

    // Reportando todas as métricas de Core Web Vitals
    onCLS(handleWebVitalMetric);
    onFID(handleWebVitalMetric);
    onLCP(handleWebVitalMetric);
    onFCP(handleWebVitalMetric);
    onTTFB(handleWebVitalMetric);

    addLog('Web Vitals inicializado com sucesso');
    monitoringStatus.webVitalsStatus = MonitoringStatus.INITIALIZED;
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    addLog(`Erro ao inicializar Web Vitals: ${errorMessage}`);
    monitoringStatus.webVitalsStatus = MonitoringStatus.INITIALIZATION_FAILED;
    return false;
  }
}

/**
 * Processa métricas do Web Vitals
 */
function handleWebVitalMetric(metric: Metric): void {
  try {
    const { name, id, value, rating } = metric;
    
    // Log no console (dev ou se habilitado)
    if (defaultConfig.enableConsoleLogging) {
      console.log(`📊 Web Vital: ${name} = ${value} (${rating})`);
    }
    
    // Envia para o Sentry se ativado
    if (defaultConfig.enableSentry && monitoringStatus.sentryStatus === MonitoringStatus.INITIALIZED) {
      try {
        Sentry.setTag('web_vital', name);
        Sentry.setTag('web_vital_id', id);
        Sentry.setTag('web_vital_rating', rating);
        Sentry.setMeasurement(name, value, name.toLowerCase() === 'cls' ? 'none' : 'millisecond');
        // Apenas capturar mensagem para métricas ruins
        if (rating === 'poor') {
          Sentry.captureMessage(`Poor Web Vital: ${name} = ${value}`);
        }
      } catch (sentryError) {
        addLog(`Erro ao enviar métrica para Sentry: ${sentryError}`);
      }
    }
    
    // Envia para Google Analytics se ativado
    if (defaultConfig.enableGoogleAnalytics && typeof window.gtag === 'function') {
      try {
        window.gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: id,
          value: Math.round(value * 100) / 100,
          non_interaction: true,
          metric_rating: rating,
        });
      } catch (gaError) {
        addLog(`Erro ao enviar métrica para Google Analytics: ${gaError}`);
      }
    }
  } catch (error) {
    addLog(`Erro ao processar métrica Web Vital: ${error}`);
    // Fallback: pelo menos garantir o log em console
    try {
      console.error('Erro ao processar métrica Web Vital:', metric, error);
    } catch { /* Último recurso, ignorar silenciosamente */ }
  }
}

/**
 * Verifica se o Google Analytics está disponível
 */
function checkGoogleAnalytics(): boolean {
  if (!defaultConfig.enableGoogleAnalytics) {
    monitoringStatus.gaStatus = MonitoringStatus.DISABLED;
    return false;
  }
  
  const gaAvailable = typeof window.gtag === 'function';
  monitoringStatus.gaStatus = gaAvailable 
    ? MonitoringStatus.INITIALIZED
    : MonitoringStatus.NOT_INITIALIZED;
    
  if (!gaAvailable) {
    addLog('Google Analytics não está disponível (gtag não encontrado)');
  } else {
    addLog('Google Analytics detectado');
  }
  
  return gaAvailable;
}

/**
 * Captura erro manual e envia para os sistemas de monitoramento
 */
export function captureError(error: Error | string, extras?: Record<string, any>): void {
  try {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    // Log no console
    if (defaultConfig.enableConsoleLogging) {
      console.error('🚨 Erro capturado:', errorObj, extras);
    }
    
    // Enviar para Sentry
    if (defaultConfig.enableSentry && monitoringStatus.sentryStatus === MonitoringStatus.INITIALIZED) {
      try {
        if (extras) {
          Sentry.withScope((scope) => {
            Object.entries(extras).forEach(([key, value]) => {
              scope.setExtra(key, value);
            });
            Sentry.captureException(errorObj);
          });
        } else {
          Sentry.captureException(errorObj);
        }
      } catch (sentryError) {
        console.error('Erro ao enviar para Sentry:', sentryError);
      }
    }
    
    // Enviar para Google Analytics
    if (defaultConfig.enableGoogleAnalytics && monitoringStatus.gaStatus === MonitoringStatus.INITIALIZED) {
      try {
        window.gtag?.('event', 'error', {
          event_category: 'Application Error',
          event_label: errorObj.message,
          non_interaction: true,
          error_stack: errorObj.stack,
          ...extras,
        });
      } catch (gaError) {
        console.error('Erro ao enviar para Google Analytics:', gaError);
      }
    }
  } catch (e) {
    // Último recurso: garantir pelo menos um log no console
    console.error('Falha no sistema de captura de erros:', e, error);
  }
}

/**
 * Inicializa todos os serviços de monitoramento
 */
export function initializeMonitoring(config?: Partial<MonitoringConfig>): MonitoringResult {
  try {
    // Mescla configuração padrão com a configuração personalizada
    Object.assign(defaultConfig, config);
    
    // Inicializa todos os serviços
    if (defaultConfig.enableSentry) {
      initializeSentry();
    } else {
      monitoringStatus.sentryStatus = MonitoringStatus.DISABLED;
    }
    
    if (defaultConfig.enableWebVitals) {
      initializeWebVitals();
    } else {
      monitoringStatus.webVitalsStatus = MonitoringStatus.DISABLED;
    }
    
    if (defaultConfig.enableGoogleAnalytics) {
      checkGoogleAnalytics();
    } else {
      monitoringStatus.gaStatus = MonitoringStatus.DISABLED;
    }
    
    // Log do resultado
    addLog(`Monitoramento inicializado - Sentry: ${monitoringStatus.sentryStatus}, Web Vitals: ${monitoringStatus.webVitalsStatus}, GA: ${monitoringStatus.gaStatus}`);
    
    return { ...monitoringStatus };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    addLog(`Erro geral ao inicializar monitoramento: ${errorMessage}`);
    
    // Melhor esforço para capturar o erro
    console.error('Erro ao inicializar monitoramento:', error);
    
    return { ...monitoringStatus };
  }
}

/**
 * Obtém o status atual do monitoramento
 */
export function getMonitoringStatus(): MonitoringResult {
  return { ...monitoringStatus };
}

/**
 * Obtém os valores atuais das métricas Web Vitals
 */
export function getWebVitalsValues(): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    const metrics: Record<string, number> = {};
    
    // Define uma função para verificar se já temos todas as métricas
    const checkComplete = () => {
      if (Object.keys(metrics).length >= 5) {
        resolve({ ...metrics });
      }
    };
    
    // Configura callbacks para cada métrica
    onCLS((metric) => { metrics.CLS = metric.value; checkComplete(); });
    onFID((metric) => { metrics.FID = metric.value; checkComplete(); });
    onLCP((metric) => { metrics.LCP = metric.value; checkComplete(); });
    onFCP((metric) => { metrics.FCP = metric.value; checkComplete(); });
    onTTFB((metric) => { metrics.TTFB = metric.value; checkComplete(); });
    
    // Define um timeout para resolver a Promise mesmo sem todas as métricas
    setTimeout(() => {
      if (Object.keys(metrics).length > 0) {
        resolve({ ...metrics });
      } else {
        resolve({
          CLS: -1,
          FID: -1,
          LCP: -1,
          FCP: -1,
          TTFB: -1,
        });
      }
    }, 5000);
  });
} 