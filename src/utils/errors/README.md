# Sistema de Tratamento de Erros

Este sistema fornece uma solução completa para tratamento de erros no frontend, permitindo capturar, formatar, exibir e registrar erros de forma consistente em toda a aplicação.

## Funcionalidades

- 🛑 **Captura e formatação de erros de API** - Transforma erros da API e do Axios em formato padronizado
- 🔄 **Suporte a retry de operações** - Com backoff exponencial e configurações personalizáveis
- 📊 **Logging centralizado** - Registro detalhado de erros para depuração
- 🔍 **Monitoramento** - Integração com Sentry para monitoramento de erros em produção
- 🎯 **Tipagem de erros** - Classificação de erros por tipo para tratamento específico
- 💬 **Mensagens amigáveis** - Exibição de mensagens de erro adequadas para o usuário
- 🧩 **Componentes React** - Componentes prontos para exibição de erros na interface
- 🔄 **ErrorBoundary melhorado** - Captura de erros em componentes React com suporte a fallback
- ⚙️ **Configuração por ambiente** - Configurações diferentes para dev, test, staging e prod

## Instalação

O sistema já está incluído no projeto OCTO. Não é necessária nenhuma instalação adicional.

## Uso

### Capturando e tratando erros

```typescript
import { errorHandler, ErrorType } from '../utils/errors';

try {
  // Alguma operação que pode falhar
  await fetchData();
} catch (error) {
  // Converte qualquer erro para o formato padronizado
  const appError = errorHandler.handleError(error, {
    context: { operation: 'fetchData' }
  });
  
  // Obter mensagem amigável para o usuário
  const userMessage = errorHandler.getUserFriendlyMessage(appError);
  
  // Exibir mensagem para o usuário...
}
```

### Usando o hook em componentes React

```typescript
import { useErrorHandling } from '../hooks/useErrorHandling';

function MyComponent() {
  const {
    isError,
    errorMessage,
    isLoading,
    executeWithErrorHandling
  } = useErrorHandling();
  
  const handleClick = async () => {
    const result = await executeWithErrorHandling(async () => {
      // Operação que pode falhar
      const response = await fetchData();
      return response.data;
    });
    
    if (result) {
      // Sucesso - fazer algo com o resultado
    }
  };
  
  return (
    <div>
      {isError && <div className="error">{errorMessage}</div>}
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Carregar dados'}
      </button>
    </div>
  );
}
```

### Operações com retry

```typescript
import { withRetry } from '../utils/errors';

const fetchDataWithRetry = async () => {
  return withRetry(
    async () => {
      // Operação que pode falhar e precisa de retry
      return await fetch('/api/data');
    },
    {
      maxRetries: 3,
      delayMs: 1000,
      backoffFactor: 1.5,
      shouldRetry: (error) => error.status === 429 || error.status >= 500,
      onRetry: (error, attempt) => {
        console.log(`Tentativa ${attempt} após erro:`, error);
      }
    }
  );
};
```

### Usando ErrorBoundary

```tsx
import { ErrorBoundary } from '../utils/errors';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Componentes de erro

```tsx
import { ErrorAlert, RetryableError, ErrorType } from '../utils/errors';

function MyComponent() {
  // ...
  
  return (
    <div>
      {/* Erro simples */}
      <ErrorAlert 
        message="Algo deu errado" 
        type={ErrorType.SERVER} 
        onClose={() => {}} 
      />
      
      {/* Erro com retry */}
      <RetryableError
        message="Falha ao carregar dados"
        type={ErrorType.NETWORK}
        isRetrying={isRetrying}
        onRetry={handleRetry}
      />
    </div>
  );
}
```

## Configuração

O sistema é configurado automaticamente com base no ambiente de execução, mas pode ser personalizado:

```typescript
import { configureErrorHandling, ErrorType } from '../utils/errors';

// Personalizar configurações
configureErrorHandling({
  userErrorDetailLevel: 'minimal',
  maxRetries: 5,
  defaultMessages: {
    [ErrorType.NETWORK]: 'Erro na conexão. Verifique sua internet.'
  }
});
```

## Estrutura

```
src/utils/errors/
├── types.ts           # Interfaces e tipos
├── config.ts          # Configurações por ambiente
├── errorHandler.ts    # Core do sistema de tratamento de erros
├── components.tsx     # Componentes React para exibição de erros
├── index.ts           # Exportações e funções de conveniência
└── README.md          # Documentação
```

## Exemplo Completo

Um exemplo completo de uso pode ser encontrado em:

```
src/examples/ErrorHandlingExample.tsx
``` 