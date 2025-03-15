import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { registerServiceWorker } from './utils/pwa';
import ProfilerWrapper from './utils/performance/ProfilerWrapper';
import './index.postcss';
import { initializeMonitoring, captureError } from './utils/monitoring';

// Inicializa o sistema de monitoramento
const monitoringResult = initializeMonitoring({
  // Ativa Sentry apenas em produção e se a variável de ambiente existir
  enableSentry: import.meta.env.PROD,
  // Ativa Web Vitals em todos os ambientes
  enableWebVitals: true,
  // Ativa Google Analytics em produção
  enableGoogleAnalytics: import.meta.env.PROD,
  // Ativa logs no console em desenvolvimento
  enableConsoleLogging: import.meta.env.DEV,
  // Configurações de amostragem (sampling) para Sentry
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Log do status de inicialização (apenas em desenvolvimento)
if (import.meta.env.DEV) {
  console.log('Status do monitoramento:', monitoringResult);
}

// Registra o service worker para PWA
try {
  registerServiceWorker();
} catch (error: unknown) {
  console.warn('Falha ao registrar service worker:', error);
  captureError(error instanceof Error ? error : String(error), { 
    context: 'ServiceWorkerRegistration' 
  });
}

// Renderiza o aplicativo
const rootElement = document.getElementById('root');
if (!rootElement) {
  const error = new Error('Failed to find the root element');
  captureError(error, { context: 'AppInitialization' });
  throw error;
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ProfilerWrapper id="App">
      <App />
    </ProfilerWrapper>
  </StrictMode>
);

// Captura erros não tratados
window.addEventListener('error', (event) => {
  captureError(event.error || new Error(event.message), {
    context: 'Window.onError',
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Captura promessas rejeitadas não tratadas
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason instanceof Error 
    ? event.reason 
    : new Error(`Unhandled Promise rejection: ${event.reason}`);
  
  captureError(error, {
    context: 'UnhandledRejection',
    reason: typeof event.reason === 'string' ? event.reason : 'Unknown reason',
  });
});