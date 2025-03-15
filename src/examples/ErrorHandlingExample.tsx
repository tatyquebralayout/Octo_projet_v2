/**
 * Exemplos de uso do sistema de tratamento de erros
 */
import React, { useState } from 'react';
import { 
  ErrorBoundary, 
  ErrorAlert, 
  RetryableError, 
  ErrorType 
} from '../utils/errors';
import { useErrorHandling } from '../hooks/useErrorHandling';
import { apiService } from '../services/api/apiService';
import { Loading, Error as ErrorComponent } from '../design-system/components/ui';

// Componente que propositalmente causa erro
function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);
  
  if (shouldThrow) {
    throw new Error('Este é um erro de componente proposital!');
  }
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-4">Componente com potencial erro</h3>
      <button 
        onClick={() => setShouldThrow(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Causar erro
      </button>
    </div>
  );
}

// Exemplo de tela com muitos tratamentos de erro
export default function ErrorHandlingExample() {
  // Hook para tratamento de erros
  const {
    isError,
    errorMessage,
    errorType,
    isLoading,
    isRetrying,
    setError,
    clearError,
    executeWithErrorHandling,
    executeWithRetry
  } = useErrorHandling({
    onError: (error) => {
      console.log('Erro capturado pelo hook:', error);
    }
  });
  
  // Estado para mensagem temporária de sucesso
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Exemplo de operação simples com erro
  const handleRegularOperation = async () => {
    const result = await executeWithErrorHandling(async () => {
      // Simulação de uma operação que pode falhar
      const random = Math.random();
      
      // Simulação de tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação de erro aleatório
      if (random < 0.5) {
        throw new Error('Falha na operação regular');
      }
      
      return { success: true, data: 'Operação completada com sucesso!' };
    });
    
    if (result) {
      setSuccessMessage(result.data);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };
  
  // Exemplo de operação com retry
  const handleRetryableOperation = async () => {
    const result = await executeWithRetry(async () => {
      // Simulação de chamada de API com alta chance de falha
      const random = Math.random();
      
      // Simulação de tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Alta chance de falha (80%)
      if (random < 0.8) {
        const error = new Error('Falha na operação retryable');
        // Definindo propriedades para simular um ApiError
        Object.assign(error, {
          status: 500,
          code: 'SIMULATED_ERROR',
          retryable: true
        });
        throw error;
      }
      
      return { success: true, data: 'Operação retryable completada com sucesso após tentativas!' };
    }, {
      maxRetries: 3,
      delayMs: 1000,
      backoffFactor: 1.5,
      onRetry: (error, attempt) => {
        console.log(`Tentativa ${attempt} após erro:`, error);
      }
    });
    
    if (result) {
      setSuccessMessage(result.data);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };
  
  // Exemplo de chamada de API com retry
  const handleApiCall = async () => {
    try {
      // Usar o retry nativo do apiService
      const response = await apiService.get('/users/profile', undefined, true);
      setSuccessMessage(`API retornou: ${response.data.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError('Falha ao carregar perfil do usuário', ErrorType.SERVER);
    }
  };
  
  // Componente de erro manual para fins de demonstração
  const handleManualError = () => {
    setError('Este é um erro definido manualmente', ErrorType.CLIENT);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Exemplos de Tratamento de Erro</h1>
      
      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          {successMessage}
        </div>
      )}
      
      {/* Exibir erro atual */}
      {isError && (
        <div className="mb-6">
          <ErrorComponent 
            title="Erro na operação"
            message={errorMessage} 
            variant="card"
          />
          {/* Botão separado para fechar o erro */}
          <button 
            onClick={clearError}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
      )}
      
      {/* Bloco para erros retryables */}
      {isError && errorType === ErrorType.SERVER && (
        <div className="mb-6">
          <ErrorComponent
            title="Erro recuperável"
            message="Esta operação falhou mas pode ser tentada novamente."
            variant="card"
            retryText={isRetrying ? "Tentando novamente..." : "Tentar novamente"}
            onRetry={handleRetryableOperation}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Operação regular */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Operação Regular</h2>
          <p className="mb-4 text-gray-600">
            Operação simples com 50% de chance de falha.
          </p>
          <button
            onClick={handleRegularOperation}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loading size="sm" variant="spinner" className="mr-2" color="currentColor" />
                Carregando...
              </span>
            ) : 'Executar Operação'}
          </button>
        </div>
        
        {/* Operação com retry */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Operação com Retry</h2>
          <p className="mb-4 text-gray-600">
            Operação com 80% de chance de falha, mas com retry automático.
          </p>
          <button
            onClick={handleRetryableOperation}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {isRetrying ? (
              <span className="flex items-center">
                <Loading size="sm" variant="spinner" className="mr-2" color="currentColor" />
                Tentando novamente...
              </span>
            ) : isLoading ? (
              <span className="flex items-center">
                <Loading size="sm" variant="spinner" className="mr-2" color="currentColor" />
                Carregando...
              </span>
            ) : 'Executar com Retry'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Chamada de API */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Chamada de API</h2>
          <p className="mb-4 text-gray-600">
            Demonstração de chamada de API com retry integrado.
          </p>
          <button
            onClick={handleApiCall}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loading size="sm" variant="spinner" className="mr-2" color="currentColor" />
                Carregando...
              </span>
            ) : 'Chamar API'}
          </button>
        </div>
        
        {/* Erro manual */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Erro Manual</h2>
          <p className="mb-4 text-gray-600">
            Criar um erro manualmente para fins de demonstração.
          </p>
          <button
            onClick={handleManualError}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Gerar Erro Manual
          </button>
        </div>
      </div>
      
      {/* Demonstração do ErrorBoundary */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Demonstração do ErrorBoundary</h2>
        <p className="mb-4 text-gray-600">
          Este componente está envolvido por um ErrorBoundary e continuará funcionando mesmo se o componente abaixo falhar.
        </p>
        
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </div>
    </div>
  );
} 