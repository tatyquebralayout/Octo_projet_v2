import React, { useEffect, useState } from 'react';
import { getWebVitalsValues, getMonitoringStatus, MonitoringStatus } from '../../utils/monitoring';
import { Loading } from '../../design-system/components/ui';

// Adicionar importação dos utilitários de formatação
import { formatNumber, roundNumber, formatMetricValue } from '../../utils/formatters';

interface WebVitalsMonitorProps {
  /** Mostrar estado dos serviços de monitoramento */
  showServiceStatus?: boolean;
  /** Atualização automática (em ms, 0 para desativar) */
  autoRefresh?: number;
  /** Mostrar valores de métricas desconhecidas como "-" */
  showUnknown?: boolean;
  /** Estilo personalizado para o componente */
  className?: string;
}

/**
 * Componente para monitorar e exibir as métricas Core Web Vitals
 * Útil para desenvolvimento, debug e painéis de administração
 */
const WebVitalsMonitor: React.FC<WebVitalsMonitorProps> = ({
  showServiceStatus = true,
  autoRefresh = 0,
  showUnknown = true,
  className = '',
}) => {
  // Estado para métricas Web Vitals
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  // Estado para status dos serviços de monitoramento
  const [services, setServices] = useState(getMonitoringStatus());
  // Flag para atualização em andamento
  const [loading, setLoading] = useState(false);
  
  // Função para atualizar as métricas Web Vitals
  const updateMetrics = async () => {
    setLoading(true);
    try {
      const values = await getWebVitalsValues();
      setMetrics(values);
      setServices(getMonitoringStatus());
    } catch (error) {
      console.error('Erro ao atualizar métricas Web Vitals:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Atualização inicial e configuração de intervalo se necessário
  useEffect(() => {
    updateMetrics();
    
    let intervalId: number | undefined;
    if (autoRefresh > 0) {
      intervalId = window.setInterval(updateMetrics, autoRefresh);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh]);
  
  // Função para classificar a métrica em bom, médio ou ruim
  const getRatingClass = (metric: string, value: number): string => {
    if (value < 0) return 'unknown';
    
    switch (metric) {
      case 'LCP': // Largest Contentful Paint (ms)
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'FID': // First Input Delay (ms)
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'CLS': // Cumulative Layout Shift (score)
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'FCP': // First Contentful Paint (ms)
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'TTFB': // Time to First Byte (ms)
        return value <= 500 ? 'good' : value <= 1000 ? 'needs-improvement' : 'poor';
      default:
        return 'unknown';
    }
  };
  
  // Retorna o nome completo da métrica
  const getMetricName = (metric: string): string => {
    switch (metric) {
      case 'LCP': return 'Largest Contentful Paint';
      case 'FID': return 'First Input Delay';
      case 'CLS': return 'Cumulative Layout Shift';
      case 'FCP': return 'First Contentful Paint';
      case 'TTFB': return 'Time to First Byte';
      default: return metric;
    }
  };
  
  // Retorna um ícone com base no status
  const getStatusIcon = (status: MonitoringStatus): string => {
    switch (status) {
      case MonitoringStatus.INITIALIZED: return '✅';
      case MonitoringStatus.DISABLED: return '⛔';
      case MonitoringStatus.INITIALIZATION_FAILED: return '❌';
      case MonitoringStatus.NOT_INITIALIZED: return '⚠️';
      default: return '❓';
    }
  };
  
  return (
    <div className={`web-vitals-monitor ${className}`}>
      <div className="web-vitals-header">
        <h3 className="text-h4">Métricas Core Web Vitals</h3>
        <button 
          onClick={updateMetrics} 
          disabled={loading}
          className="btn-sm btn-primary"
        >
          {loading ? (
            <span className="flex items-center">
              <Loading size="sm" variant="spinner" className="mr-1" />
              Atualizando...
            </span>
          ) : 'Atualizar'}
        </button>
      </div>
      
      {/* Status dos serviços de monitoramento */}
      {showServiceStatus && (
        <div className="web-vitals-services">
          <div className="service-status">
            <span className="service-label">Sentry:</span>
            <span className="service-value">
              {getStatusIcon(services.sentryStatus)} {services.sentryStatus}
            </span>
          </div>
          <div className="service-status">
            <span className="service-label">Web Vitals:</span>
            <span className="service-value">
              {getStatusIcon(services.webVitalsStatus)} {services.webVitalsStatus}
            </span>
          </div>
          <div className="service-status">
            <span className="service-label">Google Analytics:</span>
            <span className="service-value">
              {getStatusIcon(services.gaStatus)} {services.gaStatus}
            </span>
          </div>
        </div>
      )}
      
      {/* Tabela de métricas Web Vitals */}
      <table className="web-vitals-table">
        <thead>
          <tr>
            <th>Métrica</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].map((metric) => {
            const value = metrics[metric] || -1;
            const rating = getRatingClass(metric, value);
            return (
              <tr key={metric} className={`metric-row ${rating}`}>
                <td title={getMetricName(metric)}>
                  {metric}
                </td>
                <td>
                  {formatMetricValue(metric, value, showUnknown)}
                </td>
                <td>
                  <span className={`status-indicator ${rating}`}></span>
                  {rating !== 'unknown' ? rating : 'desconhecido'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Legenda */}
      <div className="web-vitals-legend">
        <div className="legend-item good">Bom</div>
        <div className="legend-item needs-improvement">Precisa melhorar</div>
        <div className="legend-item poor">Ruim</div>
      </div>
      
      {/* Estilos internos */}
      <style>
        {`
          .metric-value {
            font-variant-numeric: tabular-nums;
          }
          
          .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 6px;
          }
          
          .status-indicator.status-active {
            background-color: var(--color-success, #22c55e);
          }
          
          .status-indicator.status-inactive {
            background-color: var(--color-warning, #f59e0b);
          }
          
          .status-indicator.status-error {
            background-color: var(--color-error, #ef4444);
          }
          
          .rating-good {
            color: var(--color-success, #22c55e);
          }
          
          .rating-needs-improvement {
            color: var(--color-warning, #f59e0b);
          }
          
          .rating-poor {
            color: var(--color-error, #ef4444);
          }
        `}
      </style>
    </div>
  );
};

export default WebVitalsMonitor; 