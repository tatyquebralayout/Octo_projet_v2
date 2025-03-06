import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full mx-auto p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ops! Algo deu errado
          </h2>
          
          <p className="text-gray-600 mb-6">
            Desculpe pelo inconveniente. Ocorreu um erro inesperado.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <pre className="text-left bg-gray-100 p-4 rounded-md mb-6 overflow-auto text-sm">
              {error.message}
            </pre>
          )}
          
          <button
            onClick={resetErrorBoundary}
            className="bg-[#972ae6] text-white px-6 py-2 rounded-full hover:bg-[#7d23c2] 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#972ae6]"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}