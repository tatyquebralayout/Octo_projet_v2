import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './App.tsx';
import { registerServiceWorker } from './utils/pwa';
import { reportWebVitals } from './utils/webVitals';
import ProfilerWrapper from './utils/performance/ProfilerWrapper';
import './index.postcss';

// Inicializa o Sentry para monitoramento
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

// Registra o service worker para PWA
registerServiceWorker();

// Renderiza o aplicativo
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ProfilerWrapper id="App">
      <App />
    </ProfilerWrapper>
  </StrictMode>
);

// Monitora métricas de performance
reportWebVitals(metric => {
  // Enviar para Analytics em produção
  if (import.meta.env.PROD) {
    // Exemplo de envio para Google Analytics (se estiver configurado)
    // window.gtag('event', name, {
    //   event_category: 'Web Vitals',
    //   event_label: id,
    //   value: Math.round(value * 100) / 100,
    //   non_interaction: true,
    // });
    
    console.log(`Web Vital: ${metric.name} = ${metric.value}`);
  }
});