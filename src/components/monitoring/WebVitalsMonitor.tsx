import React, { useEffect, useState } from 'react';
import { getWebVitalsValues, getMonitoringStatus, MonitoringStatus } from '../../utils/monitoring';

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
  
  // Formata o valor da métrica para exibição
  const formatMetricValue = (metric: string, value: number): string => {
    if (value < 0) return showUnknown ? '-' : 'N/A';
    
    switch (metric) {
      case 'CLS':
        return value.toFixed(3);
      case 'LCP':
      case 'FID':
      case 'FCP':
      case 'TTFB':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
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
          {loading ? 'Atualizando...' : 'Atualizar'}
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
                  {formatMetricValue(metric, value)}
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
      
      <style jsx>{`
        .web-vitals-monitor {
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 8px;
          padding: 16px;
          background-color: var(--color-surface, white);
          max-width: 600px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .web-vitals-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .web-vitals-services {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
          font-size: 0.85rem;
          padding: 8px;
          background-color: var(--color-surface-variant, #f8fafc);
          border-radius: 6px;
        }
        
        .service-status {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .service-label {
          font-weight: 500;
        }
        
        .web-vitals-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
        }
        
        .web-vitals-table th, 
        .web-vitals-table td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid var(--color-border-light, #f1f5f9);
        }
        
        .web-vitals-table th {
          font-weight: 600;
          background-color: var(--color-surface-variant, #f8fafc);
        }
        
        .status-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 6px;
        }
        
        .good .status-indicator {
          background-color: var(--color-success, #10b981);
        }
        
        .needs-improvement .status-indicator {
          background-color: var(--color-warning, #f59e0b);
        }
        
        .poor .status-indicator {
          background-color: var(--color-error, #ef4444);
        }
        
        .unknown .status-indicator {
          background-color: var(--color-disabled, #94a3b8);
        }
        
        .web-vitals-legend {
          display: flex;
          gap: 16px;
          font-size: 0.75rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .legend-item::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .legend-item.good::before {
          background-color: var(--color-success, #10b981);
        }
        
        .legend-item.needs-improvement::before {
          background-color: var(--color-warning, #f59e0b);
        }
        
        .legend-item.poor::before {
          background-color: var(--color-error, #ef4444);
        }
      `}</style>
    </div>
  );
};

export default WebVitalsMonitor; 