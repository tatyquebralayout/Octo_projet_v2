import { Metric, onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';
import * as Sentry from "@sentry/react";

type MetricHandler = (metric: Metric) => void;

/**
 * Função que reporta as métricas de Core Web Vitals
 * - LCP (Largest Contentful Paint) - tempo para renderizar o maior elemento visível
 * - FID (First Input Delay) - tempo até a primeira interação
 * - CLS (Cumulative Layout Shift) - mudanças inesperadas de layout
 * - FCP (First Contentful Paint) - primeira renderização de conteúdo
 * - TTFB (Time to First Byte) - tempo até o primeiro byte
 * 
 * @param onPerfEntry Função callback para processar os dados de performance
 */
export function reportWebVitals(onPerfEntry?: MetricHandler): void {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(metric => {
      console.log('CLS:', metric.value);
      onPerfEntry(metric);
      
      // Enviar para Sentry (em produção)
      if (import.meta.env.PROD) {
        Sentry.setTag("web_vital", metric.name);
        Sentry.setTag("web_vital_rating", metric.rating);
        Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`);
      }
    });
    
    onFID(metric => {
      console.log('FID:', metric.value);
      onPerfEntry(metric);
      
      if (import.meta.env.PROD) {
        Sentry.setTag("web_vital", metric.name);
        Sentry.setTag("web_vital_rating", metric.rating);
        Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`);
      }
    });
    
    onLCP(metric => {
      console.log('LCP:', metric.value);
      onPerfEntry(metric);
      
      if (import.meta.env.PROD) {
        Sentry.setTag("web_vital", metric.name);
        Sentry.setTag("web_vital_rating", metric.rating);
        Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`);
      }
    });
    
    onFCP(metric => {
      console.log('FCP:', metric.value);
      onPerfEntry(metric);
      
      if (import.meta.env.PROD) {
        Sentry.setTag("web_vital", metric.name);
        Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`);
      }
    });
    
    onTTFB(metric => {
      console.log('TTFB:', metric.value);
      onPerfEntry(metric);
      
      if (import.meta.env.PROD) {
        Sentry.setTag("web_vital", metric.name);
        Sentry.captureMessage(`Web Vital: ${metric.name} = ${metric.value}`);
      }
    });
  }
}

/**
 * Gera um relatório do status atual dos Core Web Vitals
 * Útil para debugging e monitoramento
 */
export function getWebVitalsStatus(): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    const metrics: Record<string, number> = {};
    
    onCLS(metric => { metrics.CLS = metric.value; checkComplete(); });
    onFID(metric => { metrics.FID = metric.value; checkComplete(); });
    onLCP(metric => { metrics.LCP = metric.value; checkComplete(); });
    onFCP(metric => { metrics.FCP = metric.value; checkComplete(); });
    onTTFB(metric => { metrics.TTFB = metric.value; checkComplete(); });
    
    function checkComplete() {
      if (Object.keys(metrics).length === 5) {
        resolve(metrics);
      }
    }
  });
} 